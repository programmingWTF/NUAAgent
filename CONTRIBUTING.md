# 贡献指南

感谢你对 NUAAgent 的关注！请花一点时间阅读本指南，让你的贡献顺利合入。

## 开始之前

1. Fork 本仓库。
2. 创建特性分支：`git checkout -b feat/你的特性`。
3. 做出改动，并用清晰的提交信息提交。
4. 推送后，针对 `main` 分支发起 Pull Request。

## Pull Request 检查清单

- [ ] PR 描述说明了「做了什么」和「为什么」。
- [ ] 本地测试通过（`corepack pnpm -C dsh test`）。
- [ ] 新行为有测试覆盖（快照：`corepack pnpm -C dsh test:snapshot`）。
- [ ] 若面向用户的行为有变化，文档已同步更新。

## Issue 约定

- 使用 Issue 表单：缺陷报告、功能请求、问题咨询。
- 用对应类型标签（`🐛 缺陷` / `✨ 功能增强` / `📚 文档` / `❓ 问题`）与优先级（`🔴 P0`–`🟢 P3`）标记你的 Issue；完整标签体系见 [LABELS.md](LABELS.md)。

## 提交信息风格

使用带作用域的 Conventional Commits：`类型(作用域): 描述`

常用类型：`feat` `fix` `docs` `chore` `refactor` `test` `ci` `perf`。
作用域 = 你改动的区域（模块、文件或子系统）。

示例：

```
feat(adapter): 新增南航网关 WAF 绕过逻辑
fix(launch): 修复配置合并覆盖用户模型的问题
docs(readme): 补充快速开始说明
chore(ci): 升级 action 版本
```

## 代码风格

沿用项目既有风格（linter 配置已内置）。不确定时，推送前先运行 linter：

```bash
corepack pnpm -C dsh lint
```

## 目录约定

- 南航相关定制**只允许放在 `dsh-adapter/`**，不要给 `dsh/` 子树打上游补丁（便于将来同步上游 DeepSeek Harness）。
- 修改 `packages/*/src` 或 Web 前端源码后需 `npm run build` 并重启；改动 `agent-presets/*.yml` 等运行时配置只需重启。
- 密钥（`apiKey`）**绝不能**硬编码或提交，只通过环境变量 / `~/.nuaaagent/config.json` 引用。

## 有问题？

发起 Discussion，或提一个 `question` 类型的 Issue。欢迎交流！
