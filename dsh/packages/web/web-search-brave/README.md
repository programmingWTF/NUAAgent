# @nuaagent/web-search-brave

English | [中文](README.zh.md)

A [Brave Search](https://brave.com/search/api/)-backed `WebSearchProvider` for the harness [web capability seam](../web/README.md) (`ctx.web`). It calls Brave's `GET /res/v1/web/search` endpoint and maps the flat `web.results[]` into the seam's normalized `WebSearchResult`.

This is an **implementation** package: it registers a provider into `ctx.web`, it does not own the `ctx.web` key and it does not register a model-facing tool (that is `@nuaagent/tool-web`). It is a function/namespace plugin (`inject: ['web']`).

## Config

| Key | Default | Meaning |
|---|---|---|
| `apiKey` | `$BRAVE_API_KEY` | Brave Search API key. Empty/absent makes the provider unavailable. |
| `baseURL` | `https://api.search.brave.com` | Endpoint base; `/res/v1/web/search` is appended. An unparseable value makes the provider unavailable. |
| `maxResults` | (unset) | Default result count when a request carries no `maxResults`. Must be a positive integer. |

```yaml
- id: web-search-brave
  name: '@nuaagent/web-search-brave'
  config:
    apiKey: !!js process.env.BRAVE_API_KEY
```

## Mapping

Each entry of Brave's `web.results[]` maps to a `WebSearchSource`: `url` ← `url`, `title` ← `title`, `snippet` ← `description` (blank optional fields are omitted). A request's `maxResults` wins over the configured `maxResults` default and is sent as Brave's `count` query parameter; the final bound is enforced by the seam. Provider failures surface as `WebError` `WEB_PROVIDER_ERROR`; an aborted request surfaces as `WEB_ABORTED`. HTTP redirects are rejected before the `Location` target is contacted.

## Model Experience

Indirectly, through [`dsh-tool-web`](../tool-web/README.md), which retains this provider's `maxResults`-bounded URLs, titles, and `content` snippets, or its `Brave search aborted`, `Brave search request failed: <error>`, and `Brave returned an unprocessable response body: <error>` failures under the consumer's error wrapper.

#### KV Cache effect

No direct invalidation; the named consumer owns any request-prefix changes.

## Known Limitations and Deferred Work

- **Only `maxResults` is exposed** — Brave's other controls (`country`, `search_lang`, `freshness`, `safesearch`) wait on provider-neutral Service Definition fields.
- **Abort classification is error-shape-based** — only a `DOMException` named `AbortError` maps to `WEB_ABORTED`.
