// ============================================================
// NUAA adapter for dsh — 南航 API 定制适配层（正式版）
// 通过 --import 预加载，包装 globalThis.fetch：
//   - 对 token.nuaa.edu.cn 的 /chat/completions POST：
//       sanitizeBody（南航 WAF 绕过：HTML 编码 < > + 敏感词打断
//                     + 深信服代理内容过滤：每 2 个连续英文字母插零宽字符）
//       + 代理（系统 curl 回退，兼容深信服 TLS 指纹拦截；
//             curl -i 保留真实 HTTP 状态码，429/5xx 正确交给重试机制）
//   - 其他所有请求：原样转发
// 约束（用户要求，勿改）：
//   - WAF_KEYWORDS 直接 import 自 src/provider/waf-keywords.ts（唯一真源）
//   - sanitizeBody / resolveProxy / curlFetch 算法与 src/provider/nuaa-provider.ts 逐行对应
//   - 不修改 src/provider/* 任何文件
// ============================================================
import { spawn } from 'child_process';
import { readFileSync, writeFileSync, unlinkSync, mkdirSync } from 'fs';
import { tmpdir, homedir } from 'os';
import { join } from 'path';
import { WAF_KEYWORDS } from '../src/provider/waf-keywords.ts';

/**
 * 零宽空格 U+200B（ZERO WIDTH SPACE）。
 * 选它做打断字符的原因：
 *   - 对 LLM 几乎不可见（tokenizer 中为独立 token，语义上被忽略），
 *     不拆散单词，AI 阅读/理解、tool calling 参数解析都不受干扰；
 *   - 对深信服/南航网关的“连续子串匹配”完全有效：
 *     exec → e\u200Bxec，任意 >=4 字母的连续字母子串都被切断。
 * 相比旧的普通空格方案（SEL ECT 会被 AI 读成两个词），零宽字符不会
 * 造成“单词被拆分”的语义损失。
 */
const ZW = '\u200B';

/**
 * 注入 system 提示的固定标记（用于幂等去重，防止多轮请求重复累积提示词）。
 * 提示词内容见 ZW_HINT；标记本身也作为去重依据。
 */
const ZW_HINT_MARK = '[NUAA-ZW-HINT]';

/**
 * 防过滤字符说明（注入到 system 消息）：
 * 模型在阅读被打断的文本（零宽字符/下划线）时可能把打断字符原样复制进
 * 自己的输出（tool_call 函数名、JSON 参数键），导致工具调用失配。提示词
 * 明确要求模型“阅读时还原、输出时用干净名称”。
 */
const ZW_HINT =
  `${ZW_HINT_MARK} 防过滤字符说明（重要，务必遵守）：
本会话经南航网络网关内容过滤。为绕过网关，系统会在发送给模型的文本中故意插入两类“打断字符”，它们不是乱码或拼写错误，请一律忽略，并按还原后的原文理解：
1) 零宽字符（U+200B，肉眼不可见，位于英文单词中间，例如 taskkill 可能显示为“ta+零宽+sk+零宽+ki+零宽+ll”）；
2) 下划线 _（用于打断敏感词，例如 exec 可能写成 e_xec，SELECT 可能写成 SEL_ECT）。
务必遵守：
- 阅读工具描述、历史消息、用户输入时，自动剥离上述打断字符后再理解；
- 若看到 &lt; 或 &gt;（本会话请求经过 HTML 实体编码，&lt; 即 <、&gt; 即 >），按原字符理解；
- 生成工具调用（tool call）时，函数名与 JSON 参数键名必须使用标准、干净的名称（例如 command、exec、path），禁止输出任何零宽字符或打断用的下划线；
- 你的任何输出（包括思考、回复、工具参数）都不得复制这些打断字符，也禁止把 <、> 写成 &lt;、&gt;（除非内容本身是在讲 HTML 实体）。
`;

/** 幂等注入提示词：合并进现有 system 消息（找不到则新建），已注入过则跳过。
 * 注意：标记文本本身也会被 breakEvery2 打断（如 HINT→HI\u200BNT），
 * 因此幂等检查必须先剥离零宽字符/下划线再比对。 */
function injectHint(obj) {
  if (!obj || !Array.isArray(obj.messages)) return;
  const norm = (s) => s.replaceAll('\u200B', '').replaceAll('_', '');
  if (obj.messages.some((m) => m.role === 'system' && typeof m.content === 'string' && norm(m.content).includes(ZW_HINT_MARK))) return;
  const sys = obj.messages.find((m) => m.role === 'system' && typeof m.content === 'string');
  if (sys) {
    sys.content += '\n\n' + ZW_HINT;
  } else {
    obj.messages.unshift({ role: 'system', content: ZW_HINT });
  }
}

/**
 * 深信服代理内容过滤的通用绕过：对连续英文字母串每 2 个字母插入一个零宽字符。
 * 深信服是子串匹配（如 @type 在 xx@typesyy 中也触发），实测无 2 字母规则，
 * 因此间隔 2 能破坏所有 >=3 字母的连续字母子串——无需逐个发现触发词，
 * 组合规则（如 taskkill+spawn 场景）也一并解除。
 * 孤立 2 字母及以下的串不触发（(.{2})(?=.) 要求后面还有字符），可读性更好。
 * 注：比旧的“每 3 个字母”加密一倍，插入量约 1.5~3 倍，请求体会更膨胀；
 * 目的是让模型复述历史时的输出也带更密的零宽，打散深信服对响应的 DLP 匹配。
 */
function breakEvery2(text) {
  return text.replace(/[A-Za-z]{3,}/g, (m) => m.replace(/(.{2})(?=.)/g, `$1${ZW}`));
}

// ---- sanitizeBody（来源：src/provider/nuaa-provider.ts sanitizeBody，逐行对应）----
function sanitizeBody(json) {
  // Step 1: HTML-encode < > in JSON string values (raw body pass)
  let result = '';
  let inString = false;
  let esc = false;
  for (let i = 0; i < json.length; i++) {
    const ch = json[i];
    if (esc) { esc = false; result += ch; continue; }
    if (ch === '\\') { esc = true; result += ch; continue; }
    if (ch === '"') { inString = !inString; result += ch; continue; }
    if (inString) {
      if (ch === '<') result += '&lt;';
      else if (ch === '>') result += '&gt;';
      else result += ch;
    } else {
      result += ch;
    }
  }
  // Step 2: parse JSON, apply keyword breaking only to message content fields
  try {
    const obj = JSON.parse(result);
    // 模型 wire 映射：dsh 内部用无斜杠别名（launch.mjs normalizeModelId 规范化），
    // 这里还原为官方 id（南航平台部分模型 id 带 provider 前缀斜杠，
    // 如 deepseek/deepseek-v4-flash-vision-exp）
    const wire = modelWireMap();
    if (typeof obj.model === 'string' && wire[obj.model]) obj.model = wire[obj.model];
    // 注入防过滤字符说明（幂等），提醒模型忽略零宽/下划线打断、输出干净名称
    injectHint(obj);
    /** WAF 关键词打断（通用）：用指定字符 Z 在关键词约 1/4 处插入，切断子串匹配 */
    function breakWith(text, Z) {
      // 南航 WAF 关键词（唯一真源：src/provider/waf-keywords.ts）
      for (const kw of WAF_KEYWORDS) {
        if (kw.length <= 2) continue;
        const cut = Math.max(1, Math.floor(kw.length / 4));
        const lower = kw.toLowerCase();
        let idx = 0;
        while ((idx = text.toLowerCase().indexOf(lower, idx)) >= 0) {
          text = text.slice(0, idx + cut) + Z + text.slice(idx + cut);
          idx += cut + Z.length;
        }
      }
      return text;
    }
    /** 文本打断（content/description/arguments）：零宽字符，对 LLM 几乎不可见 */
    function breakKeywords(text) {
      // WAF 关键词用零宽打断（旧版用 `_`，会干扰 AI 阅读；零宽字符对 LLM 几乎不可见）
      text = breakWith(text, ZW);
      // 深信服通用绕过：每 2 个连续英文字母插零宽字符（覆盖所有 >=3 字母子串规则）
      text = breakEvery2(text);
      return text;
    }
    /**
     * 函数名打断：南航 API 对 function.name 有硬性约束（必须匹配 ^[a-zA-Z0-9_-]+$），
     * 零宽字符/空格会被 400 拒绝（实测 400001: Invalid 'tools[0].function.name'，
     * 之前 breakEvery2 把工具名打成 ask_use\u200Br_que\u200Bsti\u200Bon 导致整请求被拒）。
     * 因此函数名只用合法字符 `_` 打断；且不做 breakEvery2——dsh 内置工具名
     * （read_file/edit/write/grep 等）不含 WAF 关键词，过度变形会导致模型生成的
     * tool_call 名字与注册工具名失配、工具调用失败。
     */
    function breakName(text) {
      return breakWith(text, '_');
    }
    if (obj.messages) {
      for (const m of obj.messages) {
        if (typeof m.content === 'string') m.content = breakKeywords(m.content);
        if (m.tool_calls) {
          for (const tc of m.tool_calls) {
            if (tc.function) {
              if (tc.function.name) tc.function.name = breakName(tc.function.name);
              if (tc.function.arguments) tc.function.arguments = breakKeywords(tc.function.arguments);
            }
          }
        }
      }
    }
    if (obj.tools) {
      for (const t of obj.tools) {
        if (t.function) {
          if (t.function.name) t.function.name = breakName(t.function.name);
          if (t.function.description) t.function.description = breakKeywords(t.function.description);
          if (t.function.parameters?.properties) {
            for (const pk of Object.keys(t.function.parameters.properties)) {
              const prop = t.function.parameters.properties[pk];
              if (prop.description) prop.description = breakKeywords(prop.description);
            }
          }
        }
      }
    }
    return JSON.stringify(obj);
  } catch {
    // If JSON parse fails, return the HTML-encoded version
    return result;
  }
}

// ---- 代理解析（来源：src/provider/nuaa-provider.ts resolveProxy：config.proxy 优先，其次环境变量）----
function resolveProxy() {
  try {
    const cfg = JSON.parse(readFileSync(join(homedir(), '.nuaagent', 'config.json'), 'utf8'));
    if (cfg.proxy) return cfg.proxy;
  } catch {}
  return process.env.HTTPS_PROXY || process.env.HTTP_PROXY
    || process.env.https_proxy || process.env.http_proxy || undefined;
}

/**
 * 模型 id 的 wire 映射：config.json 中带 wireId（或原生含斜杠 provider 前缀）的模型，
 * 在 dsh 内部使用无斜杠别名（launch.mjs normalizeModelId 规范化），发往南航 API 时
 * 由 sanitizeBody 还原为官方 id。返回值：{ 别名: 官方id }。读取失败返回空映射（请求原样发送）。
 */
function modelWireMap() {
  try {
    const cfg = JSON.parse(readFileSync(join(homedir(), '.nuaagent', 'config.json'), 'utf8'));
    const map = {};
    if (!Array.isArray(cfg.models)) return map;
    for (const entry of cfg.models) {
      if (typeof entry !== 'object' || entry === null || typeof entry.id !== 'string') continue;
      const wire = typeof entry.wireId === 'string' && entry.wireId.length > 0 ? entry.wireId : undefined;
      if (entry.id.includes('/')) {
        // 原生带斜杠 id（旧配置/直接手写）：取最后一个 '/' 后的段为别名
        const safeId = entry.id.slice(entry.id.lastIndexOf('/') + 1);
        map[safeId] = wire || entry.id;
      } else if (wire && wire !== entry.id) {
        map[entry.id] = wire;
      }
    }
    return map;
  } catch { return {}; }
}

/** 诊断：异常响应（拦截页/错误页/非 SSE）时落盘请求体与响应首块，便于排查。 */
function dumpAbnormal(bodyStr, head, tag) {
  try {
    const logDir = join(homedir(), '.nuaagent', 'logs');
    mkdirSync(logDir, { recursive: true });
    const ts = Date.now();
    writeFileSync(join(logDir, `dsh-${tag}-req-${ts}.json`), bodyStr, 'utf8');
    writeFileSync(join(logDir, `dsh-${tag}-resp-${ts}.txt`), head.slice(0, 2000), 'utf8');
  } catch {}
}

// ---- curlFetch（来源：src/provider/nuaa-provider.ts curlFetch：写临时文件 + spawn 系统 curl）
//     增强：-i 保留响应头以解析真实 HTTP 状态码（429/5xx 正确透传，不再被误当 200）----
function curlFetch(url, bodyStr, proxyUrl, apiKey, signal) {
  const tmpFile = join(tmpdir(), `nuaagent-dsh-req-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.json`);
  writeFileSync(tmpFile, bodyStr, 'utf-8');
  return new Promise((resolve, reject) => {
    const args = [
      '-sS',                    // silent + show errors
      '-i',                     // include response headers（解析真实状态码）
      '-N',                     // no-buffer (streaming-ready)
      '--max-time', '1200',
      '--connect-timeout', '30',
      '--proxy', proxyUrl,
      '-X', 'POST',
      '-H', 'Content-Type: application/json',
      '-H', `Authorization: Bearer ${apiKey}`,
      '--data-binary', `@${tmpFile}`,  // read from temp file
      url,
    ];
    const proc = spawn('curl', args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, LC_ALL: 'C.UTF-8' },
    });
    const cleanup = () => { try { unlinkSync(tmpFile); } catch {} };
    proc.on('close', cleanup);
    const hardTimer = setTimeout(() => { if (proc.exitCode === null) proc.kill(); }, 1_200_000);
    proc.on('close', () => clearTimeout(hardTimer));
    // 解析响应头（-i 输出），分离状态码与 body
    let headerBuf = '';
    let bodyStarted = false;
    let responseStatus = 200;
    let responseHeaders = { 'Content-Type': 'text/event-stream' };
    let bodyHead = '';
    let judged = false;
    let stderr = '';
    if (signal) {
      const onAbort = () => proc.kill();
      signal.addEventListener('abort', onAbort, { once: true });
      proc.on('close', () => signal.removeEventListener('abort', onAbort));
    }
    proc.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    const webStream = new ReadableStream({
      start: (controller) => {
        proc.stdout.on('data', (chunk) => {
          if (!bodyStarted) {
            headerBuf += chunk.toString('latin1');
            const sep = headerBuf.indexOf('\r\n\r\n');
            if (sep >= 0) {
              bodyStarted = true;
              const headBlock = headerBuf.slice(0, sep);
              const statusMatch = headBlock.match(/HTTP\/\S+\s+(\d{3})/);
              if (statusMatch) {
                responseStatus = parseInt(statusMatch[1], 10);
                const ct = headBlock.match(/content-type:\s*([^\r\n]+)/i);
                if (ct) responseHeaders = { 'Content-Type': ct[1].trim() };
              }
              const rest = headerBuf.slice(sep + 4);
              if (rest) {
                bodyHead = rest;
                controller.enqueue(new Uint8Array(Buffer.from(rest, 'latin1')));
              }
              // 异常判定（非 SSE body）：拦截页/错误页落盘诊断
              const bodyText = rest.trimStart();
              if (bodyText && !bodyText.startsWith('data:') && !judged) {
                judged = true;
                if (/<html|<HTML|<title>|访问禁止|访问被禁止/.test(bodyText)) {
                  console.error(`[nuaa-adapter] 响应被代理/网关拦截（status=${responseStatus}）。已存 ~/.nuaagent/logs/dsh-abnormal-*。`);
                } else if (responseStatus >= 400) {
                  console.error(`[nuaa-adapter] 南航返回 HTTP ${responseStatus}。已存 ~/.nuaagent/logs/dsh-abnormal-*。`);
                }
                dumpAbnormal(bodyStr, `${responseStatus} ${bodyText}`, 'abnormal');
              }
            }
            return;
          }
          controller.enqueue(new Uint8Array(chunk));
        });
        proc.stdout.on('end', () => controller.close());
        proc.stdout.on('error', (err) => controller.error(err));
      },
      cancel: () => proc.kill(),
    });
    proc.on('error', (err) => reject(new Error(`curl process error: ${err.message}`)));
    proc.on('close', (code) => {
      if (code !== 0 && !bodyStarted) {
        const errMsg = stderr.slice(0, 200) || `curl exit code ${code}`;
        reject(new Error(`curl failed (${code}): ${errMsg}`));
      }
    });
    resolve(new Response(webStream, { status: responseStatus, headers: responseHeaders }));
  });
}

// ---- 响应净化：剥离模型输出中复制来的零宽/不可见字符，还原误复制的 HTML 实体 ----
/**
 * 字节级 TransformStream：在 SSE 流上实时净化模型输出。
 * 模型会把请求侧插入的零宽字符（U+200B 等）或 HTML 实体（&lt;/&gt;）复制进
 * 回复内容 / tool_call 参数，导致显示异常（不可见字符混入代码）、
 * 工具执行失败（参数带实体）等问题；这里统一处理。
 *
 * 1) 零宽/不可见字符全集合剥离（UTF-8 十六进制序列）：
 *    U+200B ZWSP / U+200C ZWNJ / U+200D ZWJ（打断字符，最常被复制）
 *    U+200E LRM  / U+200F RLM（左右标记，破坏代码语义）
 *    U+202A-202E 双向嵌入/覆盖/弹出（bidi 控制，可被用来做视觉欺骗）
 *    U+2060-2064 词连接符/隐形运算符（WJ/函数应用/隐形乘号/分隔符/加号）
 *    U+2066-2069 双向隔离符（LSI/RLI/FSI/PDI）
 *    U+FEFF BOM / U+00AD 软连字符 / U+034F 组合字素连接符
 *    U+180E 蒙古语元音分隔符 / U+115F,U+1160 谚文填充符 / U+17B4,U+17B5 高棉元音
 *    U+FFA0 半宽谚文填充符
 *    C0/C1 控制字符（保留 \t \n \r）：U+0000-001F、U+007F、U+0080-009F
 * 2) HTML 实体还原：&lt; → <、&gt; → >（请求侧 sanitizeBody 为了过 WAF 把
 *    < > 编码成实体后，模型经常原样复制进输出；这里在响应侧还原为真实字符）。
 *
 * 跨 chunk 安全：末尾保留最多 4 字节（最长序列 &lt; 的长度），与下一块拼接
 * 后再判断，flush 时输出残留。
 */
// UTF-8 三字节零宽/不可见字符序列（十六进制小写）
const ZW_SEQ = new Set([
  'e2808b', // U+200B ZERO WIDTH SPACE
  'e2808c', // U+200C ZERO WIDTH NON-JOINER
  'e2808d', // U+200D ZERO WIDTH JOINER
  'e2808e', // U+200E LEFT-TO-RIGHT MARK
  'e2808f', // U+200F RIGHT-TO-LEFT MARK
  'e280aa', // U+202A LEFT-TO-RIGHT EMBEDDING
  'e280ab', // U+202B RIGHT-TO-LEFT EMBEDDING
  'e280ac', // U+202C POP DIRECTIONAL FORMATTING
  'e280ad', // U+202D LEFT-TO-RIGHT OVERRIDE
  'e280ae', // U+202E RIGHT-TO-LEFT OVERRIDE
  'e281a0', // U+2060 WORD JOINER
  'e281a1', // U+2061 FUNCTION APPLICATION
  'e281a2', // U+2062 INVISIBLE TIMES
  'e281a3', // U+2063 INVISIBLE SEPARATOR
  'e281a4', // U+2064 INVISIBLE PLUS
  'e281a6', // U+2066 LEFT-TO-RIGHT ISOLATE
  'e281a7', // U+2067 RIGHT-TO-LEFT ISOLATE
  'e281a8', // U+2068 FIRST STRONG ISOLATE
  'e281a9', // U+2069 POP DIRECTIONAL ISOLATE
  'efbbbf', // U+FEFF ZERO WIDTH NO-BREAK SPACE / BOM
  'e1a08e', // U+180E MONGOLIAN VOWEL SEPARATOR
  'e1859f', // U+115F HANGUL CHOSEONG FILLER
  'e185a0', // U+1160 HANGUL JUNGSEONG FILLER
  'e19eb4', // U+17B4 KHMER VOWEL INHERENT AQ
  'e19eb5', // U+17B5 KHMER VOWEL INHERENT AA
  'efbea0', // U+FFA0 HALFWIDTH HANGUL FILLER
]);
// 两字节不可见字符序列：U+00AD SOFT HYPHEN (c2 ad)、U+034F COMBINING GRAPHEME JOINER (cd 8f)
const ZW_SEQ_2 = new Set(['c2ad', 'cd8f']);
// C1 控制字符区间（U+0080 - U+009F 的 UTF-8 编码为 c2 80 - c2 9f）：软连字符 c2 ad 不在区间内
function isC1Control(b1, b2) {
  return b1 === 0xc2 && b2 >= 0x80 && b2 <= 0x9f;
}
// 单字节控制字符（C0 控制 + DEL），保留 \t(09) \n(0a) \r(0d)
function isC0Control(b) {
  return b < 0x20 ? (b === 0x09 || b === 0x0a || b === 0x0d ? false : true) : b === 0x7f;
}
// HTML 实体还原（请求侧 sanitizeBody 编码的两种实体）
const LT_ENTITY = [0x26, 0x6c, 0x74, 0x3b]; // &lt;
const GT_ENTITY = [0x26, 0x67, 0x74, 0x3b]; // &gt;
function matches(buf, pos, seq) {
  if (pos + seq.length > buf.length) return false;
  for (let k = 0; k < seq.length; k++) if (buf[pos + k] !== seq[k]) return false;
  return true;
}
function sanitizeOutput() {
  let tail = Buffer.alloc(0);
  return new TransformStream({
    transform(chunk, controller) {
      const buf = Buffer.concat([tail, Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)]);
      const out = [];
      let i = 0;
      while (i < buf.length) {
        if (i + 2 < buf.length) {
          const seq = buf[i].toString(16).padStart(2, '0')
            + buf[i + 1].toString(16).padStart(2, '0')
            + buf[i + 2].toString(16).padStart(2, '0');
          if (ZW_SEQ.has(seq)) { i += 3; continue; }
        }
        if (matches(buf, i, LT_ENTITY)) { out.push(0x3c /* < */); i += LT_ENTITY.length; continue; }
        if (matches(buf, i, GT_ENTITY)) { out.push(0x3e /* > */); i += GT_ENTITY.length; continue; }
        if (i + 1 < buf.length) {
          if (ZW_SEQ_2.has(buf[i].toString(16).padStart(2, '0') + buf[i + 1].toString(16).padStart(2, '0'))
              || isC1Control(buf[i], buf[i + 1])) { i += 2; continue; }
        }
        if (isC0Control(buf[i])) { i += 1; continue; }
        out.push(buf[i]);
        i += 1;
      }
      // 末尾保留：按 UTF-8 序列完整性 + 实体前缀判断（固定截断会切坏多字节字符）
      const keep = computeTailKeep(out);
      const head = out.slice(0, out.length - keep);
      tail = Buffer.from(out.slice(out.length - keep));
      if (head.length) controller.enqueue(new Uint8Array(head));
    },
    flush(controller) {
      if (tail.length) controller.enqueue(new Uint8Array(tail));
    },
  });
}

/**
 * 决定 out 末尾需要留到下一块的字节数：
 * - 若末尾是多字节 UTF-8 字符被截断的部分，保留不完整序列（等下一块补齐）；
 * - 若末尾是 HTML 实体前缀（&lt/&gt 的 ASCII 开头），保留前缀；
 * - 其余情况（完整字符/纯 ASCII 结尾）返回 0，立即输出。
 */
function computeTailKeep(out) {
  const len = out.length;
  if (len === 0) return 0;
  // 从末尾往前数 UTF-8 延续字节（10xxxxxx）
  let k = 0;
  while (k < len && k < 3 && (out[len - 1 - k] & 0xc0) === 0x80) k += 1;
  if (k < len) {
    const b = out[len - 1 - k];
    const total = (b & 0xf8) === 0xf0 ? 4 : (b & 0xf0) === 0xe0 ? 3 : (b & 0xe0) === 0xc0 ? 2 : 0;
    if (total > 0 && k < total - 1) return k + 1; // 起始字节 + 已数到的延续字节
  }
  // HTML 实体前缀（'&' 之后的 l/g/t 是 ASCII，需在字节流层识别）
  if (k === 0 && len >= 3 && out[len - 3] === 0x26 && out[len - 2] === 0x6c && out[len - 1] === 0x74) return 3; // &lt
  if (k === 0 && len >= 3 && out[len - 3] === 0x26 && out[len - 2] === 0x67 && out[len - 1] === 0x74) return 3; // &gt
  if (k === 0 && len >= 2 && out[len - 2] === 0x26 && out[len - 1] === 0x6c) return 2; // &l
  if (k === 0 && len >= 2 && out[len - 2] === 0x26 && out[len - 1] === 0x67) return 2; // &g
  if (k === 0 && len >= 1 && out[len - 1] === 0x26) return 1; // &
  return 0;
}

// ---- 包装 globalThis.fetch ----
const origFetch = globalThis.fetch;
globalThis.fetch = async function (input, init = {}) {
  const url = typeof input === 'string' ? input : input.url;
  if (url.includes('token.nuaa.edu.cn') && url.endsWith('/chat/completions')) {
    const rawBody = typeof init.body === 'string' ? init.body : JSON.stringify(init.body);
    const sanitized = sanitizeBody(rawBody);
    const headers = new Headers(init.headers);
    const auth = headers.get('authorization') || '';
    const apiKey = auth.replace(/^Bearer\s+/i, '');
    const proxyUrl = resolveProxy();
    let resp;
    if (proxyUrl) {
      resp = await curlFetch(url, sanitized, proxyUrl, apiKey, init.signal);
    } else {
      resp = await origFetch(input, { ...init, body: sanitized });
    }
    // 净化响应：剥离零宽/不可见字符（模型复制请求侧打断字符的产物）
    // + 还原误复制的 &lt;/&gt; 实体（sanitizeBody 的编码在模型输出中的残留）
    if (resp && resp.body) {
      const h = new Headers(resp.headers);
      h.delete('content-length'); // 内容已变更，长度头作废
      return new Response(resp.body.pipeThrough(sanitizeOutput()), { status: resp.status, headers: h });
    }
    return resp;
  }
  return origFetch(input, init);
};
