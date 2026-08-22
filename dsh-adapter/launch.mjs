#!/usr/bin/env node
// ============================================================
// launch.mjs — NUAAgent dsh 启动器
// 用法：
//   node dsh-adapter/launch.mjs web [-- --host 127.0.0.1 --port 3080]
//   node dsh-adapter/launch.mjs headless "任务文本"
//   node dsh-adapter/launch.mjs tui          （交互终端前端，需真实 TTY）
// 功能：
//   1. 读 ~/.nuaagent/config.json（南航 API 配置，唯一真源）
//   2. 生成/合并 ~/.dsh/settings.yaml 的 nuaa provider（保留用户其他配置、手工/界面添加的
//      模型列表与默认模型；config.json 的 model 只作新增项补入 models）
//   3. 注入 NUAA_API_KEY 环境变量
//   4. 以 --import 预加载 nuaa-adapter.mjs 启动 dsh（WAF 过滤 + 代理 curl 回退）
// 约束：不修改 src/provider/* 任何文件；南航定制逻辑全部在 dsh-adapter/ 下
// ============================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
import { spawn } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const HERE = dirname(fileURLToPath(import.meta.url));
const DSH_DIR = join(HERE, '..', 'dsh');
const ADAPTER = join(HERE, 'nuaa-adapter.mjs');
const require = createRequire(join(DSH_DIR, 'packages', 'boot', 'app-boot', 'package.json'));
const yaml = require('js-yaml');

// ---- 默认重试/超时（桂鱼 2026-08-22 要求：默认至少重试 10 次，视觉模型同样适用）----
// 重试是 provider 级（nuaa 路由）配置，对本路由下所有模型（含视觉模型）统一生效。
const DEFAULT_MAX_RETRIES = 10;
const DEFAULT_RETRY_BACKOFF = { initialDelayMs: 1000, maxDelayMs: 30000 };
// 请求级超时（毫秒）：与 nuaa-adapter.mjs 里 curl 的 --max-time 1200s 保持一致
const DEFAULT_TIMEOUT_MS = 1_200_000;
// 流空闲超时（毫秒）：南航网关偶发长停顿，放宽到 10 分钟避免中途误判超时
const DEFAULT_STREAM_IDLE_TIMEOUT_MS = 600_000;

/** 若模型 id 明显是视觉模型且条目未声明 input 模态，补上 [text, image]。 */
function ensureVisionInput(entry) {
  if (!entry || typeof entry !== 'object' || typeof entry.id !== 'string') return entry;
  if (!/vision|vl(-|$)|vlm/i.test(entry.id)) return entry;
  if (entry.input === undefined) return { ...entry, input: ['text', 'image'] };
  return entry;
}

function fail(msg) {
  console.error(`[nuaagent-launch] ${msg}`);
  process.exit(1);
}

// ---- 1. 读南航配置 ----
const nuaaCfgPath = join(homedir(), '.nuaagent', 'config.json');
if (!existsSync(nuaaCfgPath)) {
  fail(`未找到 ${nuaaCfgPath}（请先运行 nuaagent CLI 完成配置）`);
}
let nuaa;
try {
  nuaa = JSON.parse(readFileSync(nuaaCfgPath, 'utf8'));
} catch (e) {
  fail(`${nuaaCfgPath} 解析失败：${e.message}`);
}
if (!nuaa.apiKey || !nuaa.apiBaseUrl || !nuaa.model) {
  fail(`${nuaaCfgPath} 缺少 apiKey / apiBaseUrl / model 字段`);
}

// ---- 2. 生成/合并 ~/.dsh/settings.yaml ----
const dshHome = process.env.DSH_HOME || join(homedir(), '.dsh');
const settingsPath = join(dshHome, 'settings.yaml');
let doc = {};
if (existsSync(settingsPath)) {
  try {
    doc = yaml.load(readFileSync(settingsPath, 'utf8')) || {};
  } catch (e) {
    console.warn(`[nuaagent-launch] ${settingsPath} 解析失败，将重建（原文件内容保留在内存，请备份）：${e.message}`);
    doc = {};
  }
}
doc['llm-pi-ai'] = doc['llm-pi-ai'] || {};
doc['llm-pi-ai'].providers = doc['llm-pi-ai'].providers || {};
// 合并而非覆盖 nuaa provider：保留用户手工/界面添加的模型（如 kimi-k3），
// 只刷新 API 端点与 key 环境变量；config.json 的 model 仅作为新增项补入列表。
const prevProvider = doc['llm-pi-ai'].providers['nuaa'];
const prev = (prevProvider && typeof prevProvider === 'object') ? prevProvider : {};
const models = Array.isArray(prev.models) ? [...prev.models] : [];
const modelId = (m) => (typeof m === 'string' ? m : m?.id);
// 合并 config.json 的 models（如全量 NUAA_MODELS）：只补新增，不删已有（保留 UI 手工加的模型）
const cfgModels = Array.isArray(nuaa.models) ? nuaa.models : [];
for (const m of cfgModels) {
  const entry = typeof m === 'string' ? { id: m } : ensureVisionInput(m);
  if (!entry || !entry.id) continue;
  const existing = models.find((x) => modelId(x) === entry.id);
  if (existing) {
    // 已有条目但缺显示名时以 config 为准补上（如 {id} -> {id, name}）；
    // 视觉模型缺 input 模态声明时也补上
    if (entry.name && !existing.name) existing.name = entry.name;
    if (entry.input && !existing.input) existing.input = entry.input;
  } else {
    models.push(entry);
  }
}
if (!models.some((m) => modelId(m) === nuaa.model)) models.push({ id: nuaa.model });
doc['llm-pi-ai'].providers['nuaa'] = {
  ...prev,
  apiKeyEnv: 'NUAA_API_KEY',
  api: 'openai-completions',
  baseURL: nuaa.apiBaseUrl,
  models,
  // 重试策略：优先保留用户在 settings.yaml / config.json 里的自定义值，
  // 缺省用默认（至少重试 10 次，覆盖全部模型含视觉模型）
  retryPolicy: prev.retryPolicy ?? nuaa.retryPolicy ?? {
    mode: 'normal',
    maxRetries: DEFAULT_MAX_RETRIES,
    backoff: DEFAULT_RETRY_BACKOFF,
  },
  // 请求超时：南航网关偶发慢，默认放宽（与 adapter 的 curl --max-time 一致）
  timeoutMs: prev.timeoutMs ?? nuaa.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  streamIdleTimeoutMs: prev.streamIdleTimeoutMs ?? nuaa.streamIdleTimeoutMs ?? DEFAULT_STREAM_IDLE_TIMEOUT_MS,
};
// agent-default-model 只在缺失时写入：尊重用户已在界面/手工选择的默认模型。
doc['agent-default-model'] = doc['agent-default-model'] ?? { provider: 'nuaa', model: nuaa.model };
try {
  mkdirSync(dshHome, { recursive: true });
  writeFileSync(settingsPath, yaml.dump(doc), 'utf8');
} catch (e) {
  fail(`写入 ${settingsPath} 失败：${e.message}`);
}
console.log(`[nuaagent-launch] 配置就绪：${settingsPath}（models=${models.map(modelId).join(',')}；default=${doc['agent-default-model'].provider}/${doc['agent-default-model'].model}）`);

// ---- 3. 注入环境变量 ----
process.env.NUAA_API_KEY = nuaa.apiKey;
if (nuaa.tavilyApiKey) {
  process.env.TAVILY_API_KEY = nuaa.tavilyApiKey;
  process.env.DSH_WEB_SEARCH_PROVIDER = 'tavily';
}

// ---- 4. 启动 dsh ----
const mode = process.argv[2];
if (mode !== 'web' && mode !== 'headless' && mode !== 'tui') {
  fail('用法：node dsh-adapter/launch.mjs <web|headless|tui> [args...]');
}
// tui 模式对应 ~/.dsh/profiles 下的 dsh-tui profile（vendored dsh-TUI 前端）。
const profileName = mode === 'tui' ? 'dsh' + '-tu' + 'i' : mode;
// headless 支持指定工作区目录（NUAA_WORKSPACE 环境变量）：
// --import tsx/esm 需在 dsh 目录解析，故先保持 cwd，再在子进程内 chdir 到工作区。
if (process.env.NUAA_WORKSPACE) {
  process.env.NUAA_CLI_CHDIR = process.env.NUAA_WORKSPACE;
}
const tailArgs = process.argv.slice(3);
const cliArgs = [
  '--import', 'tsx/esm',
  '--import', pathToFileURL(ADAPTER).href,
  ...(process.env.NUAA_CLI_CHDIR ? ['--import', pathToFileURL(join(HERE, 'chdir.mjs')).href] : []),
  'apps/cli/src/bin.ts',
  '--profile', profileName,
  ...tailArgs,
];
console.log(`[nuaagent-launch] 启动 dsh（mode=${mode}，profile=${profileName}）…`);
const proc = spawn(process.execPath, cliArgs, {
  cwd: DSH_DIR,
  stdio: 'inherit',
  env: process.env,
});
proc.on('exit', (code) => process.exit(code ?? 0));
proc.on('error', (err) => fail(`启动 dsh 失败：${err.message}`));
