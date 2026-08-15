// ============================================================
// server.mjs — nuaa-proxy 后端服务入口
//
// 将南航 API 的 WAF 绕过逻辑包装成本地 OpenAI 兼容接口：
//   http://localhost:<port>/v1  （默认端口 8899，可自定义）
//
// 用法：
//   node server.mjs [--host 0.0.0.0] [--port 8899]
//                  [--proxy http://localhost:8888] [--upstream https://token.nuaa.edu.cn/v1]
// 也支持环境变量：HOST / PORT / PROXY / UPSTREAM_BASE_URL（CLI 参数优先）
//
// 兼容路径：
//   POST /v1/chat/completions    （OpenAI 标准路径）
//   POST /chat/completions       （省略 /v1 前缀）
//   GET  /v1/models | /models
//   GET  /health
// ============================================================
import { createServer } from 'http';
import { sanitizeBody, stripZeroWidth, stripZeroWidthBytes, curlStream } from './waf.mjs';

// ---- 参数解析：CLI 参数优先，其次环境变量，最后默认值 ----
function getArg(name, def) {
  const i = process.argv.indexOf('--' + name);
  if (i >= 0 && process.argv[i + 1] !== undefined) return process.argv[i + 1];
  const envK = name.toUpperCase().replace(/-/g, '_');
  if (process.env[envK] !== undefined) return process.env[envK];
  return def;
}

const HOST = getArg('host', '0.0.0.0');
const PORT = parseInt(getArg('port', '8899'), 10) || 8899;
const PROXY = getArg('proxy', 'http://localhost:8888'); // 空字符串 = 直连
const UPSTREAM = getArg('upstream', 'https://token.nuaa.edu.cn/v1').replace(/\/+$/, ''); // 去尾部斜杠

const KNOWN_MODELS = [
  { id: 'deepseek-v4-pro-202606', object: 'model', created: 1750000000, owned_by: 'nuaa' },
  { id: 'deepseek-v4-flash-202605', object: 'model', created: 1750000000, owned_by: 'nuaa' },
  { id: 'deepseek-v4-pro', object: 'model', created: 1750000000, owned_by: 'nuaa' },
  { id: 'deepseek-v4-flash', object: 'model', created: 1750000000, owned_by: 'nuaa' },
  { id: 'kimi-k3', object: 'model', created: 1750000000, owned_by: 'nuaa' },
];

function json(rs, status, obj) {
  const b = Buffer.from(JSON.stringify(obj));
  rs.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': b.length,
    'Access-Control-Allow-Origin': '*',
  });
  rs.end(b);
}

function readBody(rq, limit = 256 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    rq.on('data', (c) => {
      size += c.length;
      if (size > limit) { reject(new Error('body too large')); rq.destroy(); return; }
      chunks.push(c);
    });
    rq.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    rq.on('error', reject);
  });
}

/** 主处理：/chat/completions（兼容 /v1 前缀与省略） */
async function handleChat(rq, rs, url) {
  let bodyStr;
  try {
    bodyStr = await readBody(rq);
  } catch (e) {
    return json(rs, 413, { error: { message: 'request body too large', type: 'invalid_request' } });
  }
  if (!bodyStr) return json(rs, 400, { error: { message: 'empty request body', type: 'invalid_request' } });

  // API Key：由客户端自行传入（Authorization: Bearer <key>）
  const auth = rq.headers.authorization || '';
  const apiKey = auth.replace(/^Bearer\s+/i, '').trim();
  if (!apiKey) return json(rs, 401, { error: { message: 'missing Authorization: Bearer <key> header', type: 'authentication_error' } });

  // 解析 stream 标记（客户端在 body 中声明）
  let stream = false;
  try {
    const parsed = JSON.parse(bodyStr);
    stream = parsed.stream === true || parsed.stream === 'true' || parsed.stream === 1;
  } catch {}

  // 请求侧三层防拦截（与 dsh-adapter 完全一致）
  const sanitized = sanitizeBody(bodyStr);

  // 上游真实地址：<upstream>/chat/completions
  const upstreamUrl = UPSTREAM + '/chat/completions';

  // 以系统 curl 为底层命令转发（--proxy 可配，默认 EasyConnect http://localhost:8888）
  let curl;
  try {
    curl = await curlStream(upstreamUrl, sanitized, { proxyUrl: PROXY || undefined, apiKey });
  } catch (e) {
    console.error('[nuaa-proxy] curl failed: ' + e.message);
    return json(rs, 502, { error: { message: 'upstream request failed: ' + e.message, type: 'upstream_error' } });
  }

  const { status, contentType, bodyStream, proc } = curl;

  // 客户端断开 → 杀掉 curl
  const onClose = () => { try { proc.kill(); } catch {} };
  rs.on('close', onClose);
  bodyStream.on('end', () => rs.removeListener('close', onClose));

  // 流式：SSE 原样转发（剥离零宽字符）
  if (stream) {
    rs.writeHead(status, {
      'Content-Type': contentType || 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*',
    });
    const cleanStream = stripZeroWidth();
    const onStreamErr = () => { try { rs.destroy(); } catch {} };
    cleanStream.on('error', onStreamErr);
    bodyStream.on('error', onStreamErr);
    bodyStream.pipe(cleanStream).pipe(rs);
    return;
  }

  // 非流式：整包读取 → 剥离零宽 → 按上游 Content-Type 回传
  const chunks = [];
  bodyStream.on('data', (c) => chunks.push(c));
  bodyStream.on('end', () => {
    const raw = Buffer.concat(chunks);
    const clean = stripZeroWidthBytes(raw);
    rs.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': clean.length,
      'Access-Control-Allow-Origin': '*',
    });
    rs.end(clean);
  });
  bodyStream.on('error', (err) => {
    console.error('[nuaa-proxy] body stream error: ' + err.message);
    if (!rs.writableEnded) rs.end();
  });
}

// ---- 路由 ----
const server = createServer(async (rq, rs) => {
  const url = new URL(rq.url, 'http://' + (rq.headers.host || 'localhost'));
  const path = url.pathname.replace(/\/+$/, '') || '/';

  try {
    if (rq.method === 'POST' && (path === '/v1/chat/completions' || path === '/chat/completions')) {
      return await handleChat(rq, rs, url);
    }
    if (rq.method === 'GET' && (path === '/v1/models' || path === '/models')) {
      return json(rs, 200, { object: 'list', data: KNOWN_MODELS });
    }
    if (rq.method === 'GET' && path === '/health') {
      return json(rs, 200, { ok: true, port: PORT, upstream: UPSTREAM, proxy: PROXY });
    }
    if (rq.method === 'GET' && path === '/') {
      return json(rs, 200, {
        name: 'nuaa-proxy',
        description: '南航 API WAF 绕过代理（OpenAI 兼容）',
        base_url: 'http://localhost:' + PORT + '/v1',
        endpoint: 'POST /v1/chat/completions',
      });
    }
    return json(rs, 404, { error: { message: 'not found: ' + rq.method + ' ' + path, type: 'not_found' } });
  } catch (e) {
    console.error('[nuaa-proxy] unhandled error: ' + (e.stack || e.message));
    try {
      if (!rs.headersSent && !rs.writableEnded) {
        json(rs, 500, { error: { message: 'internal error', type: 'internal_error' } });
      } else if (!rs.writableEnded) {
        rs.end();
      }
    } catch (_) { try { rs.end(); } catch {} }
  }
});

server.on('error', (e) => console.error('[nuaa-proxy] server error: ' + e.message));
server.listen(PORT, HOST, () => {
  console.log('[nuaa-proxy] 已启动：http://' + HOST + ':' + PORT);
  console.log('[nuaa-proxy] Base URL（OpenAI 格式）：http://localhost:' + PORT + '/v1');
  console.log('[nuaa-proxy] 上游：' + UPSTREAM + '/chat/completions');
  console.log('[nuaa-proxy] 上游代理：' + (PROXY || '（直连）'));
});
