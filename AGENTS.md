# AGENTS.md

电报风格，仅根规则。面向在此仓库工作的 AI 编码代理（Claude Code、Cursor、Copilot、OpenClaw 等）。

## 开始

- 仓库：NUAAgent —— 南航校内免费大模型 API 的 AI 编程助手（Web GUI + headless）。
- 引用一律用仓库根相对路径，如 `dsh-adapter/launch.mjs:34`；不用绝对路径、不用 `~/`。
- 先读 `README.md` 与 `CONTRIBUTING.md`。
- 切勿打印任何密钥（`apiKey`、`NUAA_API_KEY` 等）。

## 结构

- `dsh/`：代理 harness 本体（DeepSeek Harness 移植，pnpm 工作区，一切皆插件）。
- `dsh-adapter/`：南航定制适配层（launch / WAF 绕过 / chdir 钩子）。**南航定制只允许放这里。**
- `src/provider/waf-keywords.ts`：WAF 敏感词唯一真源。
- `package.json`：npm 脚本入口（setup / build / nuaaagent:web / nuaaagent:headless）。

## 命令

- 安装：`npm run setup`
- 构建：`npm run build`
- 启动 Web：`npm run nuaaagent:web`
- 一次性任务：`npm run nuaaagent:headless -- "任务"`
- 单元测试：`corepack pnpm -C dsh test`
- 快照测试：`corepack pnpm -C dsh test:snapshot`
- 类型检查：`corepack pnpm -C dsh typecheck`
- Lint：`corepack pnpm -C dsh lint`

## 约定

- 提交风格：`类型(作用域): 描述`（见 CONTRIBUTING.md）。
- 密钥：绝不硬编码，只引用环境变量名（`NUAA_API_KEY`）。
- 修改 `packages/*/src` 或 Web 前端源码后需 `npm run build` 并重启；改 `agent-presets/*.yml` 等运行时配置只需重启。
- 一切皆插件：改行为优先加/改 `cordis*.yml` 插件行，不改 `agent-loop` 主循环。

## 核心约束

- 南航 API 模型并发为 **1**：禁止子代理/并行模型会话（`subagent`、`subagent_fork`、`workflow`、`ralph`）。
- 不要并行开多个会话同时提问，它们共享同一个并发额度。

## 注意事项

- `dsh/` 有自己的 `AGENTS.md`，处理 dsh 子树内改动时以其为准。
- 配置**合并**写入（0.2.0 起），启动器不覆盖用户模型列表与默认模型。
