# 架构说明（ARCHITECTURE.md）

NUAAgent 是 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（MIT）的品牌化移植 + 南航（NUAA）API 定制适配层。整体设计原则：**底座不动、定制外置**——所有南航相关逻辑集中在 `dsh-adapter/` 与 `src/provider/`，不修改 `dsh/` 内部文件。

## 分层结构

```
NUAAgent/
├── dsh/                  # 底座：DeepSeek Harness 移植（pnpm monorepo，包名 @nuaagent/*）
│   ├── apps/cli/         # 入口与 profile（web / headless）
│   ├── apps/web/         # Web 前端（Vite/React）
│   └── packages/         # @nuaagent/* 插件包（core / llm / shell / fs / web / bundle / …）
├── dsh-adapter/          # ★ 南航定制适配层（唯一允许的定制点之一）
│   ├── launch.mjs        # 启动器：读配置 → 合并 settings.yaml → 注入密钥 → 启动 dsh
│   ├── nuaa-adapter.mjs  # 全局 fetch 包装：WAF 绕过 + 代理 curl 回退 + 零宽字符过滤
│   └── chdir.mjs         # headless 工作区切换钩子（NUAA_CLI_CHDIR）
├── src/provider/         # ★ 南航 provider 唯一真源
│   └── waf-keywords.ts   # WAF 敏感词表（nuaa-adapter.mjs 直接 import，勿改）
├── easyconnect/          # 校外访问：深信服 EasyConnect Docker 方案
│   └── docker-compose.yml
├── scripts/              # easyconnect-setup.{ps1,sh} 一键配置
└── docs/easyconnect.md   # 图文教程
```

> `dsh-adapter/` 与 `src/provider/` 是唯二定制点；`dsh/` 内文件一律不改（升级时整体替换）。

## 数据流

```
~/.nuaagent/config.json（南航 API 配置，唯一真源）
        │
        ▼
dsh-adapter/launch.mjs
        │  1. 读取 config.json
        │  2. 合并写入 ~/.dsh/settings.yaml（保留用户已有模型/默认模型）
        │  3. 注入 NUAA_API_KEY 环境变量
        ▼
dsh（--import 预加载 nuaa-adapter.mjs）
        │  包装 globalThis.fetch
        │    ├─ token.nuaa.edu.cn/chat/completions → sanitizeBody（WAF 绕过）
        │    │                                        + 代理 curl 回退（深信服 TLS 指纹）
        │    └─ 其他请求 → 原样转发
        ▼
南航深信服网关 → 免费模型 API（token.nuaa.edu.cn）
```

## 关键约束

- **并发 1**：南航免费 API 模型并发量为 1，系统提示词严格声明**禁止启用子代理**。
- **WAF 绕过**：`<` `>` 做 HTML 编码；敏感词命中即打断；深信服内容过滤用零宽字符（U+200B）切断连续英文字母子串（不破坏 LLM 语义）。
- **代理回退**：`curl -i` 保留真实 HTTP 状态码，429/5xx 正确交给 dsh 重试机制。
- **配置合并**（0.2.0+）：启动器不再覆盖用户已有的模型列表与默认模型。
- **不改底座**：`dsh-adapter/` 内算法与 `src/provider/nuaa-provider.ts` 逐行对应（见文件头注释）。

## 测试与 CI

- 单元测试：`corepack pnpm -C dsh test`（Vitest，全量约 1.3 万用例）。
- CI（`.github/workflows/ci.yml`）：Node 22/24 矩阵 → `pnpm install --frozen-lockfile` → build → test。
- 分支保护：`main` 受 ruleset `protect-default-branch` 保护，必须通过 PR 合并（1 个审批）。
