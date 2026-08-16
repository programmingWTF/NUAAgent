# @nuaagent/web-search-tavily

English | [中文](README.zh.md)

A [Tavily](https://tavily.com)-backed `WebSearchProvider` for the harness [web capability seam](../web/README.md) (`ctx.web`). It calls Tavily's `POST /search` endpoint and maps the generated `answer` to `content` and the flat `results[]` into the seam's normalized `WebSearchResult`.

This is an **implementation** package: it registers a provider into `ctx.web`, it does not own the `ctx.web` key and it does not register a model-facing tool (that is `@nuaagent/tool-web`). It is a function/namespace plugin (`inject: ['web']`) that registers its backend, not a default-export service.

## Config

| Key | Default | Meaning |
|---|---|---|
| `apiKey` | `$TAVILY_API_KEY` | Tavily API key. Empty/absent makes the provider unavailable. |
| `baseURL` | `https://api.tavily.com` | Endpoint base; `/search` is appended. An unparseable value makes the provider unavailable. |
| `searchDepth` | `basic` | Retrieval mode: `basic` or `advanced` (deeper, slower). |
| `topic` | `general` | Result domain: `general` or `news` (recent-event bias). |
| `includeAnswer` | `true` | Whether Tavily generates a summary answer (maps to `content`). |
| `maxResults` | (unset) | Default result count when a request carries no `maxResults`. Must be a positive integer. |

```yaml
- id: web-search-tavily
  name: '@nuaagent/web-search-tavily'
  config:
    apiKeyEnv: TAVILY_API_KEY
```

## Mapping

Tavily returns an optional generated `answer` plus a flat `results[]`. The `answer` maps to `content` (omitted when empty); each result maps to a `WebSearchSource`: `url` ← `url`, `title` ← `title`, `snippet` ← `content`, `publishedAt` ← `published_date` (blank optional fields are omitted). A request's `maxResults` wins over the configured `maxResults` default and is sent as Tavily's `max_results`; the final bound is enforced by the seam. Provider failures surface as `WebError` `WEB_PROVIDER_ERROR`; an aborted request surfaces as `WEB_ABORTED`. HTTP redirects are rejected before the `Location` target is contacted.

## Model Experience

Indirectly, through [`dsh-tool-web`](../tool-web/README.md), which retains this provider's `maxResults`-bounded URLs, titles, `content` snippets, publication dates, and its generated answer text, or its `Tavily search aborted`, `Tavily search request failed: <error>`, and `Tavily returned an unprocessable response body: <error>` failures under the consumer's error wrapper while provider-private fields remain outside context.

#### KV Cache effect

No direct invalidation; the named consumer owns any request-prefix changes.

## Known Limitations and Deferred Work

- **Only `searchDepth`/`topic`/`includeAnswer`/`maxResults` are exposed** — Tavily's other controls (`include_raw_content`, `include_images`, `days`, `max_tokens`, domain include/exclude) wait on provider-neutral Service Definition fields.
- **Abort classification is error-shape-based** — only a `DOMException` named `AbortError` maps to `WEB_ABORTED`; an abort carrying a custom reason surfaces as `WEB_PROVIDER_ERROR`.
