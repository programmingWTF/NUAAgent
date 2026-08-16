/**
 * Wire types for the Serper (Google) search API (`POST https://google.serper.dev/search`).
 * Types only — no runtime code. Serper returns an `organic[]` of flat entries, each with a
 * `title`, `link`, and optional `snippet`.
 *
 * @module @nuaagent/web-search-serper/types
 */

/** Request body sent to Serper's search endpoint. */
export interface SerperSearchRequest {
  q: string
  num?: number
}

/** Serper's search response envelope. */
export interface SerperSearchResponse {
  organic?: SerperOrganicResult[]
}

/** One entry of Serper's flat `organic[]`. */
export interface SerperOrganicResult {
  link: string
  title?: string | null
  snippet?: string | null
}

/** Serper's error response envelope (best-effort; fields vary by failure). */
export interface SerperError {
  error?: string
  message?: string
}
