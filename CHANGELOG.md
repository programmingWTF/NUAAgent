# 变更日志

本项目的所有重要变更都记录在此。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 新增

- 默认配置初始化脚本 `scripts/init-config.mjs`（幂等，备份后合并写入 `~/.nuaagent/config.json`，apiKey 取自已有配置/环境变量/交互输入）。
- 默认模型清单真源 `src/config/default-models.json` + 类型化导出 `src/config/schema.ts`；默认清单新增视觉模型 `deepseek/deepseek-v4-flash-vision-exp`（声明 `input: [text, image]`）。
- 默认重试策略：`launch.mjs` 生成 `~/.dsh/settings.yaml` 时写入 `retryPolicy.maxRetries: 10`（provider 级，视觉模型同样生效；已有自定义值则保留）与默认 `timeoutMs` / `streamIdleTimeoutMs`；`config.json` 支持同名可选项透传。

### 修复

- 响应净化扩展：`nuaa-adapter.mjs` 的零宽/不可见字符剥离从 5 种扩至全集合（bidi 控制符、隐形运算符、软连字符、谚文/高棉填充符、C0/C1 控制字符等）。
- 响应修复：模型误复制的 `&lt;` / `&gt;` 实体在流式输出时还原为 `<` / `>`（请求侧 WAF 编码的残留）。
- 修复响应净化流式截断会切开多字节 UTF-8 字符（中文/emoji 出现替换符）的隐患，尾部保留改为按 UTF-8 序列完整性 + 实体前缀判断。
- 修复会话历史加载死循环：`session-persistence-jsonl` 的 `readStableFile` 原为无限重试，若另一进程仍在写同一会话文件（如重启后旧进程残留）会导致历史永远加载不出来；改为最多 8 次重试后接受最后一次读取（torn 尾部由扫描器修复），并补了回归测试。

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
