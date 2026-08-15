// ============================================================
// waf.mjs — 南航 API WAF 绕过核心（自 dsh-adapter/nuaa-adapter.mjs 剥离）
//
// 独立于 DSH 的纯函数/流模块，供 nuaa-proxy 后端服务复用：
//   - sanitizeBody: 请求侧三层防拦截（HTML 编码 / WAF 关键词打断 / 每 2 字母插零宽）
//   - stripZeroWidth: 响应侧剥离 5 种零宽字符（流式 TransformStream）
//   - curlStream:    以系统 curl 为底层命令转发（--proxy 可配、-i 解析真实状态码）
//
// 约束（用户要求，勿改）：
//   - 算法与 dsh-adapter/nuaa-adapter.mjs 逐行对应；
//   - WAF_KEYWORDS 与 src/provider/waf-keywords.ts 保持一致（唯一真源）。
// ============================================================
import { spawn } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { PassThrough, Transform } from 'stream';

/**
 * 零宽空格 U+200B（ZERO WIDTH SPACE）。
 * 对 LLM 几乎不可见、不拆散单词；对深信服/南航网关的“连续子串匹配”完全有效：
 * exec → e\u200Bxec，任意 >=3 字母的连续字母子串都被切断。
 */
const ZW = '\u200B';

/** 注入 system 提示的固定标记（用于幂等去重）。 */
const ZW_HINT_MARK = '[NUAA-ZW-HINT]';

/** 防过滤字符说明（注入到 system 消息，提醒模型剥离打断字符、输出干净名称）。 */
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

/** WAF 拦截关键词（与 src/provider/waf-keywords.ts 唯一真源一致）。 */
const WAF_KEYWORDS = [
  // 命令执行
  'exec', 'system', 'eval', 'cmd', 'passthru', 'shell_exec', 'popen', 'proc_open',
  'Runtime', 'getRuntime', 'ProcessBuilder', 'os.system', 'subprocess',
  // SQL 注入
  'SELECT * FROM', 'UNION SELECT', 'INSERT INTO', 'DROP TABLE', 'DELETE FROM',
  'select ', 'union ', 'insert ', 'drop ', 'delete ', 'update ', 'from ', 'where ',
  'information_schema', 'load_file', 'into outfile', 'sleep(', 'benchmark(',
  'xp_cmdshell', "' or", "'--", '1=1',
  // XSS
  'javascript:', 'document.cookie', 'onerror=', 'onload=', 'alert(', 'onmouseover',
  '<script', '<img', '<iframe', '<svg',
  // 文件遍历
  '/etc/passwd', '/windows/win.ini', '../', '..\\',
  // 模板注入/代码混淆
  'String.fromCharCode', '${', 'println', 'eprintln',
  // 文件类型/命令
  'cat ', 'more ', 'type ', '.war ', '.jsp ', '.jspx',
];

/** 幂等注入提示词：合并进现有 system 消息（找不到则新建），已注入过则跳过。
 * 标记文本本身也会被 breakEvery2 打断（如 HINT→HI\u200BNT），因此先剥离零宽/下划线再比对。 */
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
 * 深信服是子串匹配（如 @type 在 xx@typesyy 中也触发），间隔 2 能破坏所有 >=3 字母的连续字母子串。
 */
function breakEvery2(text) {
  return text.replace(/[A-Za-z]{3,}/g, (m) => m.replace(/(.{2})(?=.)/g, `$1${ZW}`));
}

// ---- sanitizeBody（与 dsh-adapter/nuaa-adapter.mjs 逐行对应）----
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
    // 注入防过滤字符说明（幂等）
    injectHint(obj);
    /** WAF 关键词打断（通用）：用指定字符 Z 在关键词约 1/4 处插入，切断子串匹配 */
    function breakWith(text, Z) {
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
      text = breakWith(text, ZW);
      text = breakEvery2(text);
      return text;
    }
    /**
     * 函数名打断：南航 API 对 function.name 有硬性约束（必须匹配 ^[a-zA-Z0-9_-]+$），
     * 零宽字符/空格会被 400 拒绝；因此函数名只用合法字符 `_` 打断，且不做 breakEvery2。
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

// ---- 响应净化：剥离模型输出中复制来的零宽字符 ----
/**
 * 字节级 TransformStream：移除 UTF-8 编码的零宽字符序列。
 * 处理序列（UTF-8 十六进制）：
 *   U+200B ZWSP  e2 80 8b / U+200C ZWNJ e2 80 8c / U+200D ZWJ  e2 80 8d
 *   U+FEFF BOM   ef bb bf / U+2060 WJ   e2 81 a0
 * 跨 chunk 安全：末尾保留最多 2 字节（可能是被 chunk 边界截断的序列开头）。
 */
const ZW_SEQ = new Set(['e2808b', 'e2808c', 'e2808d', 'efbbbf', 'e281a0']);

/** 从 Buffer 中剥离全部零宽字节序列（用于非流式整包响应）。 */
function stripZeroWidthBytes(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  const out = [];
  let i = 0;
  while (i < buf.length) {
    if (i + 2 < buf.length) {
      const seq = buf[i].toString(16).padStart(2, '0')
        + buf[i + 1].toString(16).padStart(2, '0')
        + buf[i + 2].toString(16).padStart(2, '0');
      if (ZW_SEQ.has(seq)) { i += 3; continue; }
    }
    out.push(buf[i]);
    i++;
  }
  return Buffer.from(out);
}

/** 流式零宽剥离 TransformStream（跨 chunk 安全）。 */
function stripZeroWidth() {
  let tail = Buffer.alloc(0);
  return new Transform({
    transform(chunk, encoding, callback) {
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
      if (head.length) this.push(Buffer.from(head));
      callback();
    },
    flush(callback) {
      if (tail.length) this.push(tail);
      callback();
    },
  });
}

/**
 * curlStream — 以系统 curl 为底层命令转发（与 dsh-adapter 的 curlFetch 对应）。
 * 写临时文件 + spawn 系统 curl；`-i` 保留响应头以解析真实 HTTP 状态码（429/5xx 正确透传）。
 * 返回 Promise<{ status, contentType, bodyStream, proc }>；bodyStream 是 Node 可读流（仅 body）。
 */
function curlStream(url, bodyStr, opts = {}) {
  const { proxyUrl, apiKey, signal } = opts;
  const tmpFile = join(tmpdir(), `nuaa-proxy-req-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.json`);
  writeFileSync(tmpFile, bodyStr, 'utf-8');
  const args = [
    '-sS',                    // silent + show errors
    '-i',                     // include response headers（解析真实状态码）
    '--suppress-connect-headers', // 抑制 CONNECT 代理响应头（tinyproxy），避免头泄露进 body
    '--connect-timeout', '15',    // 上游连接超时：快速失败，避免整条链路挂死
    '-H', 'Expect:',              // 禁用 100-continue（大 body 经代理时省 1s 等待）
    '-N',                     // no-buffer (streaming-ready)
    '--max-time', '1200',
    '--connect-timeout', '30',
  ];
  if (proxyUrl) args.push('--proxy', proxyUrl);
  args.push(
    '-X', 'POST',
    '-H', 'Content-Type: application/json',
    '-H', `Authorization: Bearer ${apiKey}`,
    '--data-binary', `@${tmpFile}`,  // read from temp file
    url,
  );

  return new Promise((resolve, reject) => {
    const proc = spawn('curl', args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, LC_ALL: 'C.UTF-8' },
    });
    const cleanup = () => { try { unlinkSync(tmpFile); } catch {} };
    let settled = false;

    let headerBuf = '';
    let bodyStarted = false;
    let stderr = '';
    const hardTimer = setTimeout(() => { if (proc.exitCode === null) proc.kill(); }, 1_200_000);

    // Node 可读流：只输出 body（headers 被消费掉）
    const bodyStream = new PassThrough();

    proc.stderr.on('data', (c) => { stderr += c.toString(); });

    proc.stdout.on('data', (chunk) => {
      if (!bodyStarted) {
        headerBuf += chunk.toString('latin1');
        const sep = headerBuf.indexOf('\r\n\r\n');
        if (sep >= 0) {
          bodyStarted = true;
          const headBlock = headerBuf.slice(0, sep);
          const rest = headerBuf.slice(sep + 4);
          const statusMatch = headBlock.match(/HTTP\/\S+\s+(\d{3})/);
          const status = statusMatch ? parseInt(statusMatch[1], 10) : 502;
          const ct = headBlock.match(/content-type:\s*([^\r\n]+)/i);
          const contentType = ct ? ct[1].trim() : 'text/event-stream';
          if (rest) bodyStream.write(Buffer.from(rest, 'latin1'));
          if (!settled) {
            settled = true;
            resolve({ status, contentType, bodyStream, proc });
          }
        }
        return;
      }
      bodyStream.write(chunk);
    });

    proc.stdout.on('end', () => bodyStream.end());
    proc.stdout.on('error', (err) => { bodyStream.destroy(err); });

    proc.on('error', (err) => {
      if (!settled) { settled = true; reject(new Error(`curl process error: ${err.message}`)); }
      else bodyStream.destroy(err);
    });

    proc.on('close', (code) => {
      clearTimeout(hardTimer);
      cleanup();
      if (!bodyStarted && !settled) {
        settled = true;
        reject(new Error(`curl failed (${code}): ${stderr.slice(0, 200) || 'no output'}`));
      }
    });

    if (signal) {
      const onAbort = () => proc.kill();
      if (signal.aborted) proc.kill();
      else signal.addEventListener('abort', onAbort, { once: true });
      proc.on('close', () => signal.removeEventListener('abort', onAbort));
    }
  });
}

export { sanitizeBody, stripZeroWidth, stripZeroWidthBytes, curlStream, WAF_KEYWORDS, ZW };
