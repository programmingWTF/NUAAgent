# @nuaagent/web-search-serper

English | [中文](README.zh.md)

A [Serper](https://serper.dev) (Google results)-backed `WebSearchProvider` for the harness [web capability seam](../web/README.md) (`ctx.web`). It calls Serper's `POST /search` endpoint and maps the flat `organic[]` into the seam's normalized `WebSearchResult`.

This is an **implementation** package: it registers a provider into `ctx.web`, it does not own the `ctx.web` key and it does not register a model-facing tool (that is `@nuaagent/tool-web`). It is a function/namespace plugin (`inject: ['web']`).

## Config

| Key | Default | Meaning |
|---|---|---|
| `apiKey` | `$SERPER_API_KEY` | Serper API key. Empty/absent makes the provider unavailable. |
| `baseURL` | `https://google.serper.dev` | Endpoint base; `/search` is appended. An unparseable value makes the provider unavailable. |
| `maxResults` | (unset) | Default result count when a request carries no `maxResults`. Must be a positive integer. |

```yaml
- id: web-search-serper
  name: '@nuaagent/web-search-serper'
  config:
    apiKey: !!js process.env.SERPER_API_KEY
```

## Mapping

Each entry of Serper's `organic[]` maps to a `WebSearchSource`: `url` ← `link`, `title` ← `title`, `snippet` ← `snippet` (blank optional fields are omitted). A request's `maxResults` wins over the configured `maxResults` default and is sent as Serper's `num` body field; the final bound is enforced by the seam. Provider failures surface as `WebError` `WEB_PROVIDER_ERROR`; an aborted request surfaces as `WEB_ABORTED`. HTTP redirects are rejected before the `Location` target is contacted.

## Model Experience

Indirectly, through [`dsh-tool-web`](../tool-web/README.md), which retains this provider's `maxResults`-bounded URLs, titles, and `content` snippets, or its `Serper search aborted`, `Serper search request failed: <error>`, and `Serper returned an unprocessable response body: <error>` failures under the consumer's error wrapper.

#### KV Cache effect

No direct invalidation; the named consumer owns any request-prefix changes.

## Known Limitations and Deferred Work

- **Only `maxResults` is exposed** — Serper's other controls (`gl`, `hl`, `time`, `tbs`, `page`) wait on provider-neutral Service Definition fields.
- **No generated answer** — Serper's `answerBox`/`knowledgeGraph` are not mapped; the provider returns sources only.
- **Abort classification is error-shape-based** — only a `DOMException` named `AbortError` maps to `WEB_ABORTED`.
