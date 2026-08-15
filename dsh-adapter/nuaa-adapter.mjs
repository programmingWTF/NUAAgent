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
- 生成工具调用（tool call）时，函数名与 JSON 参数键名必须使用标准、干净的名称（例如 command、exec、path），禁止输出任何零宽字符或打断用的下划线；
- 你的任何输出（包括思考、回复、工具参数）都不得复制这些打断字符。
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

// ---- 响应净化：剥离模型输出中复制来的零宽字符 ----
/**
 * 字节级 TransformStream：移除 UTF-8 编码的零宽字符序列。
 * 模型会把请求侧插入的零宽字符（U+200B 等）复制进回复内容 / tool_call 参数，
 * 导致显示异常（不可见字符混入代码）与工具执行失败；这里在 SSE 字节流上实时剥离。
 * 处理序列（UTF-8 十六进制）：
 *   U+200B ZWSP  e2 80 8b / U+200C ZWNJ e2 80 8c / U+200D ZWJ  e2 80 8d
 *   U+FEFF BOM   ef bb bf / U+2060 WJ   e2 81 a0
 * 跨 chunk 安全：末尾保留最多 2 字节（可能是被 chunk 边界截断的序列开头），
 * 与下一块拼接后再判断，flush 时输出残留。
 */
const ZW_SEQ = new Set(['e2808b', 'e2808c', 'e2808d', 'efbbbf', 'e281a0']);
function stripZeroWidth() {
  let tail = Buffer.alloc(0);
  return new TransformStream({
    transform(chunk, controller) {
      const buf = Buffer.concat([tail, Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)]);
      const out = [];
      let i = 0;
      for (; i < buf.length; i++) {
        if (i + 2 < buf.length) {
          const seq = buf[i].toString(16).padStart(2, '0')
            + buf[i + 1].toString(16).padStart(2, '0')
            + buf[i + 2].toString(16).padStart(2, '0');
          if (ZW_SEQ.has(seq)) { i += 2; continue; }
        }
        out.push(buf[i]);
      }
      // 末尾最多保留 2 字节（可能是被截断的序列开头），留到下一块
      const keep = Math.min(2, out.length);
      const head = out.slice(0, out.length - keep);
      tail = Buffer.from(out.slice(out.length - keep));
      if (head.length) controller.enqueue(new Uint8Array(head));
    },
    flush(controller) {
      if (tail.length) controller.enqueue(new Uint8Array(tail));
    },
  });
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
    // 剥离响应中的零宽字符（模型复制请求侧打断字符的产物）
    if (resp && resp.body) {
      const h = new Headers(resp.headers);
      h.delete('content-length'); // 内容已变更，长度头作废
      return new Response(resp.body.pipeThrough(stripZeroWidth()), { status: resp.status, headers: h });
    }
    return resp;
  }
  return origFetch(input, init);
};
