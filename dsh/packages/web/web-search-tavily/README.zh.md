# @nuaagent/web-search-tavily

[English](README.md) | 中文

基 于 [Tavily](https://tavily.com) 的 `WebSearchProvider`，注 册 到 harness 的 [web 能 力 接 缝](../web/README.md)（`ctx.web`）。它 调 用 Tavily 的 `POST /search` 端 点，把 生 成 的 `answer` 映 射 为 `content`、把 扁 平 的 `results[]` 映 射 为 接 缝 的 规 范 化 `WebSearchResult`。

这 是 一 个 **实 现** 包：它 向 `ctx.web` 注 册 提 供 方，不 拥 有 `ctx.web` 键，也 不 注 册 面 向 模 型 的 工 具（那 是 `@nuaagent/tool-web` 的 职 责）。它 是 函 数 / 命 名 空 间 插 件（`inject: ['web']`）。

## 配 置

| 键 | 默 认 值 | 含 义 |
|---|---|---|
| `apiKey` | `$TAVILY_API_KEY` | Tavily API 密 钥。为 空 / 缺 失 时 提 供 方 不 可 用。 |
| `baseURL` | `https://api.tavily.com` | 端 点 基 址；会 追 加 `/search`。无 法 解 析 时 提 供 方 不 可 用。 |
| `searchDepth` | `basic` | 检 索 模 式：`basic` 或 `advanced`（更 深、更 慢）。 |
| `topic` | `general` | 结 果 领 域：`general` 或 `news`（偏 向 近 期 事 件）。 |
| `includeAnswer` | `true` | 是 否 让 Tavily 生 成 摘 要 答 案（映 射 为 `content`）。 |
| `maxResults` | （未 设） | 请 求 未 携 带 `maxResults` 时 的 默 认 结 果 数，须 为 正 整 数。 |

```yaml
- id: web-search-tavily
  name: '@nuaagent/web-search-tavily'
  config:
    apiKeyEnv: TAVILY_API_KEY
```

## 映 射

Tavily 返 回 可 选 的 生 成 答 案 `answer` 加 扁 平 的 `results[]`。`answer` 映 射 为 `content`（为 空 时 省 略）；每 条 结 果 映 射 为 `WebSearchSource`：`url` ← `url`、`title` ← `title`、`snippet` ← `content`、`publishedAt` ← `published_date`（空 的 可 选 字 段 省 略）。请 求 的 `maxResults` 优 先 于 配 置 的 `maxResults` 默 认 值，并 作 为 Tavily 的 `max_results` 发 送；最 终 上 限 由 接 缝 强 制。提 供 方 失 败 表 现 为 `WebError` 的 `WEB_PROVIDER_ERROR`；请 求 被 中 止 表 现 为 `WEB_ABORTED`。HTTP 重 定 向 会 在 接 触 `Location` 目 标 前 被 拒 绝。

## 模 型 体 验

间 接 通 过 [`dsh-tool-web`](../tool-web/README.md)：它 保 留 本 提 供 方 受 `maxResults` 约 束 的 URL、标 题、`content` 摘 要、发 布 日 期 与 生 成 答 案 文 本，或 其 `Tavily search aborted`、`Tavily search request failed: <error>`、`Tavily returned an unprocessable response body: <error>` 失 败 信 息；提 供 方 私 有 字 段 不 进 入 上 下 文。

#### KV 缓 存 影 响

无 直 接 失 效；请 求 前 缀 的 任 何 变 化 由 命 名 的 消 费 方 承 担。

## 已 知 限 制 与 待 办

- **仅 暴 露 `searchDepth`/`topic`/`includeAnswer`/`maxResults`** — Tavily 的 其 他 控 制 项（`include_raw_content`、`include_images`、`days`、`max_tokens`、域 名 包 含 / 排 除）需 等 待 提 供 方 中 立 的 Service Definition 字 段。
- **中 止 分 类 基 于 错 误 形 态** — 仅 `DOMException` 且 名 为 `AbortError` 时 映 射 为 `WEB_ABORTED`；携 带 自 定 义 原 因 的 中 止 表 现 为 `WEB_PROVIDER_ERROR`。
