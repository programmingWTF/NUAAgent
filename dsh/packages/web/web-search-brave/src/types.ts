/**
 * Wire types for the Brave Search API (`GET https://api.search.brave.com/res/v1/web/search`).
 * Types only — no runtime code. Brave returns a `web.results[]` of flat entries, each with a
 * `title`, `url`, and optional `description` snippet.
 *
 * @module @nuaagent/web-search-brave/types
 */

/** Brave's web search response envelope. */
export interface BraveSearchResponse {
  web?: {
    results?: BraveWebResult[]
  }
}

/** One entry of Brave's flat `web.results[]`. */
export interface BraveWebResult {
  url: string
  title?: string | null
  description?: string | null
}

/** Brave's error response envelope (best-effort; fields vary by failure). */
export interface BraveError {
  title?: string
  detail?: string | { error?: string; message?: string }
  error?: string
  message?: string
}
