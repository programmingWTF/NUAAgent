# NUAAgent

[![许可证: MIT](https://img.shields.io/badge/%E8%AE%B8%E5%8F%AF%E8%AF%81-MIT-yellow)](LICENSE)
![版本](https://img.shields.io/badge/%E7%89%88%E6%9C%AC-0.2.0-blue)
![Node](https://img.shields.io/badge/Node-%5E22.19%20%7C%7C%20%3E%3D24-339933)
![CI](https://img.shields.io/github/actions/workflow/status/programmingWTF/NUAAgent/ci.yml?label=CI)
![星标](https://img.shields.io/github/stars/programmingWTF/NUAAgent?label=%E6%98%9F%E6%A0%87)
![问题](https://img.shields.io/github/issues/programmingWTF/NUAAgent?label=%E9%97%AE%E9%A2%98)
![拉取请求](https://img.shields.io/github/issues-pr/programmingWTF/NUAAgent?label=%E6%8B%89%E5%8F%96%E8%AF%B7%E6%B1%82)

> 接入南航（NUAA）校内免费大模型 API 的 AI 编程助手 —— 基于 DeepSeek Harness 品牌化移植，内置深信服网关适配层，开箱即用地提供 Web GUI 与命令行（headless）两种用法。

- 底座：DeepSeek Harness（DSH，MIT 许可）移植版，全面品牌化为 NUAAgent，Cordis 插件化架构，一切皆是插件。
- 适配：`dsh-adapter/` 南航定制适配层，对接南航深信服网关后的免费模型 API（`token.nuaa.edu.cn`），内置 WAF/内容过滤绕过与代理回退。
- 约束：南航免费 API 模型并发量为 **1**，本发行版已在系统提示词中**严格声明绝对不允许启用子代理**（见下文）。

> **📢 重要提示**
>
> - 🖥️ **桌面版正在开发中**，当前请先使用网页版（Web GUI）。
> - 🧪 **当前为测试版**，很多功能极不稳定；遇到问题可换模型重试，详见下方「常见问题」与「联系与支持」。
> - 🗓️ **免费活动截止 2026 年 8 月 31 日**，抓紧时间使用。

## 功能特性

- Web GUI（默认 `http://127.0.0.1:3080`）：流式输出、会话持久化、文件树/编辑器、工具调用可视化、审批弹窗、计划模式、任务列表。
- 丰富工具链：shell（bash/pwsh）、文件读写/检索、Web 搜索、技能（skills）、后台任务、持久化终端等。
- 代理预设（presets）：`standard`（默认）/ `code`（Code Mode）/ `cordis`（可自修改运行时）/ `minimal`（极简固定提示词）。
- 南航 API 一键接入：自动生成/合并 DSH 配置、注入密钥、带适配层启动。
- 配置**合并**写入（0.2.0 起）：你在界面或手工添加的模型列表与默认模型不会被启动器覆盖。

## 目录结构

```
NUAAgent/
├── dsh/                        # 代理 harness 本体（DeepSeek Harness 移植，pnpm 工作区）
│   ├── apps/cli/               # 入口与 profile（web / headless）
│   │   └── config/agent-presets/# 出厂代理预设（standard 等 4 套）
│   ├── apps/web/               # Web 前端（Vite/React；预构建产物在 dist/）
│   ├── packages/               # @nuaagent/* 插件包（core / llm / shell / fs / web / bundle / …）
│   └── docs/, examples/        # 架构文档与可运行示例
├── dsh-adapter/                 # 南航定制适配层（独立于 dsh，不改 dsh 内部文件）
│   ├── launch.mjs               # 启动器：合并配置 → 注入 key → 以 tsx 源码方式启动 dsh
│   ├── nuaa-adapter.mjs         # 全局 fetch 包装：WAF 绕过 + 代理 curl 回退 + 零宽字符处理
│   └── chdir.mjs                # headless 工作区切换钩子（NUAA_WORKSPACE）
├── src/provider/
│   └── waf-keywords.ts          # WAF 敏感词表（适配层直接 import 的唯一真源）
├── package.json                 # npm 脚本入口
├── .gitignore
├── LICENSE                     # MIT（上游版权归 DeepSeek，含 vendored Cordis）
└── README.md
```

## 环境要求

- Node.js `^22.19` 或 `>=24`（推荐 24+，内置 `node:sqlite`）
- Corepack（启用后获得 pnpm 11.7.0）：Node 自带，执行一次 `corepack enable` 即可
- Windows / macOS / Linux（Windows 下代理使用 PowerShell 工具链）

## 校外访问（EasyConnect）

校内可直接访问；**校外需先通过 EasyConnect 接入校园网**。我们提供了一键 Docker 部署方案：

- 📖 图文教程：[docs/easyconnect.md](docs/easyconnect.md)
- ⚡ 自动配置脚本：`scripts/easyconnect-setup.ps1`（Windows）/ `scripts/easyconnect-setup.sh`（macOS / Linux）
- 🐳 手动部署：[easyconnect/docker-compose.yml](easyconnect/docker-compose.yml)

启动 EasyConnect 后，把 `config.json` 的 `proxy` 填为 `http://127.0.0.1:8888` 即可。

## 快速开始

### 0. 获取 API Key 与选择模型

1. 打开 [模型管理](https://agent.nuaa.edu.cn/management/model)，挑选你需要的模型。
   - 目前（2026 年 8 月 31 日前）理论上**所有模型均可使用**；
   - 推荐：`deepseek-v4-pro-202606`、`kimi-k3`。
2. 打开 [我的模型](https://agent.nuaa.edu.cn/resource/mymodel)，获取你的 **API Key** 与 **Base URL**。

> `apiBaseUrl` 填平台给出的 Base URL（通常为 `https://token.nuaa.edu.cn/v1`），`apiKey` 填平台生成的个人密钥，**切勿泄露或提交到仓库**。

### 1. 写入 API 配置（一次性）

配置唯一真源是 `~/.nuaagent/config.json`：

```json
{
  "apiBaseUrl": "https://token.nuaa.edu.cn/v1",
  "apiKey": "sk-…",
  "model": "kimi-k3",
  "proxy": ""
}
```

| 字段 | 说明 |
| --- | --- |
| `apiBaseUrl` | 南航网关端点，通常为 `https://token.nuaa.edu.cn/v1` |
| `apiKey` | 你的南航 API 密钥（**不要提交到任何仓库**） |
| `model` | 默认模型 id（会并`入 provider 模型列表，不覆盖已有模型） |
| `proxy` | 可选。校外访问填 EasyConnect 代理 `http://127.0.0.1:8888`；校内留空直连更稳定 |

### 2. 安装依赖

```bash
npm run setup        # 等价于 corepack pnpm -C dsh install --frozen-lockfile
```

本仓库 `dsh/` 已带预构建产物（各包 `lib/` 与 `apps/web/dist/`），装好依赖即可直接运行；只有修改 `dsh/packages` 或 `apps` 源码后才需要 `npm run build`。

### 3. 启动

```bash
# Web GUI（默认 http://127.0.0.1:3080，浏览器打开即可）
npm run nuaagent:web

# 换端口
npm run nuaagent:web -- --port 3081

# 一次性任务（headless）
npm run nuaagent:headless -- "解释一下当前目录的代码结构"

# headless 指定工作区
NUAA_WORKSPACE=D:\some\project npm run nuaagent:headless -- "修一下这个仓库的 README"
```

### 4. 构建（修改源码后）

```bash
npm run build         # 等价于 corepack pnpm -C dsh build（重建 lib/ 与 apps/web/dist/）
npm run dev:web       # 可选：另开终端跑客户端插件 HMR watcher
```

注意：改动 `agent-presets/*.yml`、`cordis.patch.yml` 这类**运行时配置**（如提示词）无需 build，重启服务生效；改动 `packages/*/src` 或 Web 前端源码必须 build 并重启。

## 启动器行为说明（`dsh-adapter/launch.mjs`）

每次 `npm run nuaagent:web` / `headless` 都会：

1. 读 `~/.nuaagent/config.json`（找不到则报错退出）。
2. **合并**写入 `~/.dsh/settings.yaml`（0.2.0 起，修复了历史上的覆盖问题）：
   - 刷新 `nuaa` provider 的端点、`api` 与 key 环境变量名；
   - **保留**已有 `models` 列表（含你在界面/手工添加的模型），`config.json` 的 `model` 仅以新增项补入；
   - `agent-default-model` **只在缺失时写入**，尊重你已选择的默认模型；
   - 其他 provider 与其他配置原样保留。
3. 注入 `NUAA_API_KEY` 环境变量。
4. 以 `--import tsx/esm` + `--import dsh-adapter/nuaa-adapter.mjs` 启动 `dsh apps/cli`，profile 为 `web` 或 `headless`（`--host/--port/--trusted-host` 等参数透传）。

可选项：`DSH_HOME` 环境变量可改变 `~/.dsh` 目录（多实例隔离/测试用）。

## 核心约束：并发 = 1，绝对禁止子代理

南航免费 API 的模型并发量为 **1**。任何子代理/并行模型会话（`subagent`、`subagent_fork`、`workflow`、`ralph` 及其后台后端）都会产生第二个并发请求——**被拒或直接挂死会话**。

本发行版在系统提示词的 persona 中加入了严格声明（`STRICT CONSTRAINT … NEVER call subagent…`），位置共 5 处：

- `dsh/apps/cli/config/agent-presets/standard/agent.cordis.yml`（Web 默认预设）
- `dsh/apps/cli/config/agent-presets/code/agent.cordis.yml`（Code Mode 预设）
- `dsh/apps/cli/config/agent-presets/cordis/agent.cordis.yml`（自修改预设）
- `dsh/packages/bundle/headless/cordis.patch.yml`（headless persona）
- `dsh/packages/bundle/web-app/cordis.patch.yml`（Web 兜底 persona）

（`minimal` 预设是固定单段提示词且不挂代理工具，天然无此风险。Web 快照 `apps/web/tests/snapshots/fresh-round-trip/` 已同步更新。）

两点补充提醒：

- 提示词声明 ≠ 硬性移除工具。子代理工具仍注册在工具目录（上游功能保留）；如需彻底禁用，把 `standard` 预设中 `delegation` 一组（`tool-subagent`、`tool-subagent-fork`、`tool-workflow`、`tool-ralph` 及对应后端行）加上 `disabled: true`。
- 也别同时开多个会话/窗口同时提问——它们共享同一个并发额度，会互相阻塞报错。

## 南航网关适配层（`dsh-adapter/nuaa-adapter.mjs`）

通过 `--import` 预加载，包装 `globalThis.fetch`，只处理指向 `token.nuaa.edu.cn/chat/completions` 的 POST，其余请求原样放行：

- **请求侧三层防拦截**（顺序固定）：
  1. 尖括号 HTML 实体编码（绕深信服代理对 `<script>` 等标签的拦截）；
  2. WAF 敏感词表（唯一真源 `src/provider/waf-keywords.ts`）：在命中的关键词前 1/4 处插入零宽字符（`exec` → `e␣xec`，`SELECT` → `SE␣LECT`）；
  3. 通用防过滤：对每 2 个连续英文字母插入 `U+200B`，打散深信服 ≥3 字母连续子串匹配（含组合规则）。
- **幂等注入 `[NUAA-ZW-HINT]` 系统提示**：教模型"阅读时自动剥离打断字符、输出时用干净名称"，并对注入标记本身做归一化去重，多轮请求不重复累积。
- **响应侧流式剥离** 5 种零宽字符（ZWSP/ZWNJ/ZWJ/BOM/WJ），清理模型复述时复制的打断字符。
- **代理 curl 回退**：`proxy` 非空时改用系统 `curl`（兼容深信服 TLS 指纹拦截）；`curl -i` 解析真实 HTTP 状态码，429/5xx 正确透传给上游重试机制；`proxy` 为空时走原始 fetch（undici）。
- **异常落盘**：400+ 状态、流式响应头超时、网络错误自动把请求体/响应片段写到 `~/.nuaagent/logs/dsh-abnormal-*.json`，便于事后排查。

## 二次开发指引

- 架构文档：`dsh/docs/architecture.md`、`dsh/AGENTS.md`、`dsh/README.md`（英文）。
- 一切皆插件：改行为优先加/改 `cordis*.yml` 插件行与配置，别改 `agent-loop` 主循环。
- 南航相关定制**只允许放 `dsh-adapter/` 层**，不要给 `dsh/` 子树打上游补丁（便于将来同步上游）。
- 适配层冻结约束（源文件注释已标注）：`WAF_KEYWORDS` 始终 import `src/provider/waf-keywords.ts`；`sanitizeBody`/`resolveProxy`/`curlFetch` 算法为冻结实现，改动需全盘回归。
- 测试：`corepack pnpm -C dsh test`（单元）、`corepack pnpm -C dsh test:snapshot`（免密回放快照）、`corepack pnpm -C dsh typecheck`。

## 数据与日志位置

| 位置 | 内容 |
| --- | --- |
| `~/.nuaagent/config.json` | 南航 API 配置（唯一真源，含密钥） |
| `~/.nuaagent/logs/` | 适配层异常落盘 |
| `~/.dsh/settings.yaml` | provider / 默认模型（启动器自动合并生成） |
| `~/.dsh/cordis.patch.yml` | 用户级插件补丁层（热重载） |
| `~/.dsh/sessions/…` | 会话日志、投影与标题 |
| `~/.dsh/.agent-presets/` | 用户自定义代理预设（出厂预设只读，想改请复制到这里） |

## 常见问题（FAQ）

- **`pi-ai provider "nuaa" has no configured model "X"`**：默认模型不在 provider 的 `models` 列表里。0.2.0 起启动器已改为合并写入，正常不会再出现；若手工改过 `~/.dsh/settings.yaml`，把该模型补进 `models` 即可。
- **某个模型执行到一半报错、且无法继续**：换一个模型试试。如果遇到「重试延迟：xxx ms / 失败原因：Stream ended without finish_reason」这类提示，通常是因为该模型当前请求量较大、短时间内触发了请求量限制，切换到其他模型即可恢复。我们测试时偶尔遇到该问题，正在排查中。
- **429 / 并发限制报错**：并发量为 1。关闭多余的会话窗口与后台任务，稍后重试；不要并行发问。
- **校外访问失败**：`proxy` 填 EasyConnect（`http://127.0.0.1:8888`）；注意 EasyConnect 自带 WAF 对超大请求体有额外拦截，条件许可时校内直连。
- **端口被占用**：`npm run nuaagent:web -- --port 3081` 换端口，或先结束占用进程。
- **改了代码页面没变**：`npm run build` → 重启服务 → 浏览器强刷（运行时配置类改动不需 build）。当前正在运行的 GUI 是从仓库根目录旧副本启动的，本发行版的改动对它不生效。

## 安全与合规

- 默认文件沙箱为 `workspace-write`、审批策略为 `ask`（敏感操作弹窗确认）。放开 `yolo`/全量写权限前请先理解风险。
- 南航 API 为学校提供的免费服务，请遵守学校使用条款；`apiKey` 属个人凭证，**不要**提交 `~/.nuaagent/config.json` 或 `~/.dsh/settings.yaml` 到任何仓库。

## 联系与支持

- 遇到任何问题，欢迎访问我的个人网站 [liguiyu.com](https://liguiyu.com)，页面最下方有联系方式；很乐意为同学解答问题、提供帮助。
- 本项目从七月末做到八月中旬，制作不易；免费活动目前**只到 2026 年 8 月 31 日**，请大家抓紧时间使用。
- 当前为**测试版**，很多功能极不稳定；不过可以充当大家对冲 API 服务涨价的一个途径。

## 许可证与致谢

MIT（见 [LICENSE](LICENSE)，上游版权归 DeepSeek，含 vendored Cordis）。本项目在 DeepSeek Harness 基础上做了品牌化移植与南航校园网场景适配（网关过滤绕过、单并发约束、配置合并启动器）。
