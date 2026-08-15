# 变更日志

本项目的所有重要变更都记录在此。
格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

## [0.2.0]

### 新增

- 启动器（`dsh-adapter/launch.mjs`）改为配置**合并**写入，保留用户已有模型列表与默认模型。
- 适配层（`dsh-adapter/nuaa-adapter.mjs`）响应侧新增 5 种零宽字符的流式剥离。

### 修复

- 修复历史上启动器覆盖 `~/.dsh/settings.yaml` 用户配置的问题。

## [0.1.0]

### 新增

- 初始发行：DeepSeek Harness 品牌化移植 + 南航网关适配层（WAF 绕过、单并发约束、代理回退）。
