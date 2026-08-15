#!/usr/bin/env node
// ============================================================
// launch.mjs — NUAAgent dsh 启动器
// 用法：
//   node dsh-adapter/launch.mjs web [-- --host 127.0.0.1 --port 3080]
//   node dsh-adapter/launch.mjs headless "任务文本"
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
if (!models.some((m) => modelId(m) === nuaa.model)) models.push({ id: nuaa.model });
doc['llm-pi-ai'].providers['nuaa'] = {
  ...prev,
  apiKeyEnv: 'NUAA_API_KEY',
  api: 'openai-completions',
  baseURL: nuaa.apiBaseUrl,
  models,
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

// ---- 4. 启动 dsh ----
const mode = process.argv[2];
if (mode !== 'web' && mode !== 'headless') {
  fail('用法：node dsh-adapter/launch.mjs <web|headless> [args...]');
}
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
  '--profile', mode,
  ...tailArgs,
];
console.log(`[nuaagent-launch] 启动 dsh（mode=${mode}）…`);
const proc = spawn(process.execPath, cliArgs, {
  cwd: DSH_DIR,
  stdio: 'inherit',
  env: process.env,
});
proc.on('exit', (code) => process.exit(code ?? 0));
proc.on('error', (err) => fail(`启动 dsh 失败：${err.message}`));
