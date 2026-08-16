# 变更日志

本项目的所有重要变更都记录在此。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 新增

- 仓库标准化：贡献指南、安全策略、行为准则、愿景、第三方声明、AI 代理指引（`AGENTS.md` / `CLAUDE.md`）、`.github/` 议题/PR 模板与 CI 工作流。
- 校外访问一键部署：`easyconnect/` Docker 方案、`docs/easyconnect.md` 图文教程、`scripts/easyconnect-setup.{ps1,sh}` 自动配置脚本。
- README 补充：获取 API Key 与模型选择指引、测试版与活动截止说明、联系与支持。
- 集成社区插件 `dsh-web-ui`（14 个包）：SSH 远程运维、任务看板（定时任务）、右侧预览/文件/变更面板、皮肤中心、梁神模式等，vendor 至 `dsh-adapter/plugins/webui/` 并重命名为 `@nuaagent/*`。
- 集成社区插件 `dsh-TU`I`（终端前端）：vendor 至 `dsh-adapter/plugins/tui/`，模型路由适配为 nuaa provider，新增 `npm run nuaagent:tui` 启动入口（需真实终端 TTY）。

## [0.2.0]

### 新增

- 启动器（`dsh-adapter/launch.mjs`）改为配置**合并**写入，保留用户已有模型列表与默认模型。
- 适配层（`dsh-adapter/nuaa-adapter.mjs`）响应侧新增 5 种零宽字符的流式剥离。

### 修复

- 修复历史上启动器覆盖 `~/.dsh/settings.yaml` 用户配置的问题。

## [0.1.0]

### 新增

- 初始发行：DeepSeek Harness 品牌化移植 + 南航网关适配层（网关内容适配、单并发约束、代理回退）。
