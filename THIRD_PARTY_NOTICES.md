# 第三方声明

本项目（NUAAgent）在 DeepSeek Harness（DSH，MIT 许可）基础上做品牌化移植，并适配南航校园网场景。

## 主要第三方组件

| 组件 | 说明 | 许可证 |
|------|------|--------|
| DeepSeek Harness（DSH） | 代理 harness 底座 | MIT |
| Cordis | 插件化运行时框架（vendored） | MIT |
| cosmokit / schemastery | vendored 框架包 | MIT |
| node-pty | 持久化 PTY 后端 | MIT |
| pi-ai | 可选 LLM API 后端（@earendil-works） | 见其许可证 |

完整的第三方清单与许可证见 `dsh/THIRD_PARTY_NOTICES.md`、`dsh/LICENSE` 及各 `packages/*/` 的许可证文件。

## 上游版权

本项目 MIT 许可（见 `LICENSE`），上游版权归 DeepSeek，含 vendored Cordis。
