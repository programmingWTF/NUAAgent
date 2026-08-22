#!/usr/bin/env node
// ============================================================
// nuaagent init — 生成/更新 ~/.nuaagent/config.json（南航 API 配置唯一真源）
// 用法：
//   node scripts/init-config.mjs           生成或合并更新（已有配置先备份）
//   node scripts/init-config.mjs --print   只打印将写入的内容，不落盘
//   node scripts/init-config.mjs --force   已有配置也按模板重建 models 列表（慎用，会丢 UI 手工加的模型）
// 行为：
//   - 默认模型清单/重试/超时来自 src/config/default-models.json（唯一真源）
//   - apiKey 优先级：已有 config.json > 环境变量 NUAA_API_KEY > 交互输入
//   - 默认重试 10 次（provider 级，视觉模型同样生效）
//   - 不写死任何密钥到仓库
// ============================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEFAULTS = JSON.parse(readFileSync(join(HERE, '..', 'src', 'config', 'default-models.json'), 'utf8'));

const cfgPath = process.env.NUAA_CONFIG_PATH || join(homedir(), '.nuaagent', 'config.json');
const dryRun = process.argv.includes('--print');
const force = process.argv.includes('--force');

function ask(prompt) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question(prompt, (ans) => { rl.close(); resolve(ans.trim()); });
  });
}

let existing = {};
if (existsSync(cfgPath)) {
  try {
    existing = JSON.parse(readFileSync(cfgPath, 'utf8'));
  } catch (e) {
    console.error(`[nuaagent-init] 警告：${cfgPath} 解析失败，按全新配置处理：${e.message}`);
    existing = {};
  }
}

const models = force
  ? JSON.parse(JSON.stringify(DEFAULTS.models))
  : (() => {
      const list = Array.isArray(existing.models) ? [...existing.models] : [];
      const modelId = (m) => (typeof m === 'string' ? m : m?.id);
      for (const m of DEFAULTS.models) {
        if (!list.some((x) => modelId(x) === m.id)) list.push(JSON.parse(JSON.stringify(m)));
      }
      if (!list.some((m) => modelId(m) === DEFAULTS.model)) list.push({ id: DEFAULTS.model });
      return list;
    })();

let apiKey = existing.apiKey;
if (!apiKey && !dryRun) {
  apiKey = process.env.NUAA_API_KEY;
  if (!apiKey) apiKey = await ask('请输入南航 API Key（token.nuaa.edu.cn 我的模型页面获取）：').catch(() => '');
  if (!apiKey) {
    console.error('[nuaagent-init] 未提供 apiKey，中止。可设置环境变量 NUAA_API_KEY 后重试。');
    process.exit(1);
  }
}

const next = {
  apiBaseUrl: existing.apiBaseUrl || DEFAULTS.apiBaseUrl,
  ...(apiKey ? { apiKey } : {}),
  model: existing.model || DEFAULTS.model,
  proxy: existing.proxy || '',
  maxToolRounds: existing.maxToolRounds ?? 10000,
  showReasoning: existing.showReasoning ?? true,
  models,
  // 默认重试策略：已有自定义值则保留；否则写入默认（至少重试 10 次）
  retryPolicy: existing.retryPolicy || DEFAULTS.retryPolicy,
  timeoutMs: existing.timeoutMs ?? DEFAULTS.timeoutMs,
  streamIdleTimeoutMs: existing.streamIdleTimeoutMs ?? DEFAULTS.streamIdleTimeoutMs,
};

const out = JSON.stringify(next, null, 2) + '\n';

if (dryRun) {
  process.stdout.write(out);
  process.exit(0);
}

mkdirSync(dirname(cfgPath), { recursive: true });
if (existsSync(cfgPath)) {
  const bak = `${cfgPath}.bak-${new Date().toISOString().replace(/[:.]/g, '-')}`;
  copyFileSync(cfgPath, bak);
  console.log(`[nuaagent-init] 已备份原配置：${bak}`);
}
writeFileSync(cfgPath, out, { mode: 0o600 });
console.log(`[nuaagent-init] 已写入 ${cfgPath}`);
console.log(`  模型列表（${models.length} 个）：${models.map((m) => (typeof m === 'string' ? m : m.id)).join(', ')}`);
console.log(`  默认模型：${next.model} | 重试策略：${JSON.stringify(next.retryPolicy)}`);
console.log('  代理：' + (next.proxy ? next.proxy : '（校内直连；校外改为 http://127.0.0.1:8899）'));