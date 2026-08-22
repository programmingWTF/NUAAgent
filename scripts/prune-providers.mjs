// ============================================================
// 清理多余 provider：删除 ~/.dsh/settings.yaml 里 llm-pi-ai.providers 中
// 除 nuaa 外的所有 provider（如 "nuaa (modlens vision)" 等视觉 provider）。
// 用法：node scripts/prune-providers.mjs   （在仓库根目录执行）
// 自动备份原文件后再写回；重启 nuaagent 生效。
// ============================================================
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const HERE = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(HERE, '..', 'dsh', 'packages', 'boot', 'app-boot', 'package.json'));
const yaml = require('js-yaml');

const settingsPath = process.env.DSH_HOME
  ? join(process.env.DSH_HOME, 'settings.yaml')
  : join(homedir(), '.dsh', 'settings.yaml');

if (!existsSync(settingsPath)) {
  console.error(`未找到 ${settingsPath}`);
  process.exit(1);
}

const doc = yaml.load(readFileSync(settingsPath, 'utf8')) || {};
const providers = doc['llm-pi-ai']?.providers ?? {};
const keys = Object.keys(providers);
const extra = keys.filter((k) => k !== 'nuaa');

if (extra.length === 0) {
  console.log('当前只有 nuaa 一个 provider，无需清理。');
  process.exit(0);
}

for (const k of extra) delete providers[k];

const bak = `${settingsPath}.bak-${Date.now()}`;
copyFileSync(settingsPath, bak);
writeFileSync(settingsPath, yaml.dump(doc), 'utf8');

console.log(`已删除 ${extra.length} 个 provider：${extra.join(', ')}`);
console.log(`备份：${bak}`);
console.log('请重启 nuaagent 生效。');