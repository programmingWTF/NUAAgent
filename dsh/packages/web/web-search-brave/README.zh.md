# @nuaagent/web-search-brave

[English](README.md) | 中文

基 于 [Brave Search](https://brave.com/search/api/) 的 `WebSearchProvider`，注 册 到 harness 的 [web 能 力 接 缝](../web/README.md)（`ctx.web`）。调 用 Brave 的 `GET /res/v1/web/search` 端 点，把 扁 平 的 `web.results[]` 映 射 为 接 缝 的 规 范 化 `WebSearchResult`。

这 是 一 个 **实 现** 包：它 向 `ctx.web` 注 册 提 供 方，不 拥 有 `ctx.web` 键，也 不 注 册 面 向 模 型 的 工 具（那 是 `@nuaagent/tool-web` 的 职 责）。它 是 函 数 / 命 名 空 间 插 件（`inject: ['web']`）。

## 配 置

| 键 | 默 认 值 | 含 义 |
|---|---|---|
| `apiKey` | `$BRAVE_API_KEY` | Brave Search API 密 钥。为 空 / 缺 失 时 提 供 方 不 可 用。 |
| `baseURL` | `https://api.search.brave.com` | 端 点 基 址；会 追 加 `/res/v1/web/search`。无 法 解 析 时 提 供 方 不 可 用。 |
| `maxResults` | （未 设） | 请 求 未 携 带 `maxResults` 时 的 默 认 结 果 数，须 为 正 整 数。 |

## 映 射

`web.results[]` 的 每 条 映 射 为 `WebSearchSource`：`url` ← `url`、`title` ← `title`、`snippet` ← `description`（空 的 可 选 字 段 省 略）。请 求 的 `maxResults` 优 先 于 配 置 的 `maxResults` 默 认 值，并 作 为 Brave 的 `count` 查 询 参 数 发 送；最 终 上 限 由 接 缝 强 制。失 败 表 现 为 `WEB_PROVIDER_ERROR`；中 止 表 现 为 `WEB_ABORTED`。HTTP 重 定 向 会 被 拒 绝。

## 模 型 体 验

间 接 通 过 [`dsh-tool-web`](../tool-web/README.md)：保 留 受 `maxResults` 约 束 的 URL、标 题 与 摘 要，或 `Brave search aborted` / `Brave search request failed: <error>` 失 败 信 息。

#### KV 缓 存 影 响

无 直 接 失 效；请 求 前 缀 的 任 何 变 化 由 命 名 的 消 费 方 承 担。

## 已 知 限 制 与 待 办

- **仅 暴 露 `maxResults`** — Brave 的 其 他 控 制 项（`country`、`search_lang`、`freshness`、`safesearch`）需 等 待 提 供 方 中 立 的 Service Definition 字 段。
- **中 止 分 类 基 于 错 误 形 态** — 仅 `DOMException` 且 名 为 `AbortError` 时 映 射 为 `WEB_ABORTED`。
