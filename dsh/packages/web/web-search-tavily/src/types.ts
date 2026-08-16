/**
 * Wire types for the Tavily search API (`POST https://api.tavily.com/search`). Types
 * only — no runtime code. Tavily returns an optional generated `answer` plus a flat
 * `results[]`; each entry carries a URL, optional title, a `content` snippet, and an
 * optional `published_date`.
 *
 * @module @nuaagent/web-search-tavily/types
 */

/** Request body sent to Tavily's search endpoint. */
export interface TavilySearchRequest {
  api_key: string
  query: string
  /** Retrieval mode: `basic` or `advanced` (deeper, slower). */
  search_depth: 'basic' | 'advanced'
  /** Result domain: `general` or `news` (recent-event bias). */
  topic: 'general' | 'news'
  /** Whether Tavily should generate a summary `answer`. */
  include_answer: boolean
  /** Result-count control; the seam still enforces the bound on return. */
  max_results?: number
}

/** One entry of Tavily's flat `results[]`. */
export interface TavilyResult {
  url: string
  title?: string | null
  content?: string | null
  published_date?: string | null
}

/** Tavily's search response envelope. */
export interface TavilySearchResponse {
  answer?: string | null
  results?: TavilyResult[]
}

/** Tavily's error response envelope (best-effort; fields vary by failure). */
export interface TavilyError {
  detail?: { error?: string } | string
  error?: string
  message?: string
}
