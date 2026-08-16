/**
 * Serper (Google) search over its `POST /search` endpoint. Each entry of the flat
 * `organic[]` maps to a normalized source (`link` → `url`, `snippet` → `snippet`). The wire
 * format and native `fetch` client are provider-private and do not use `ctx.llm`.
 * @module @nuaagent/web-search-serper/provider
 */

import { WebError } from '@nuaagent/web'
import type {
  WebSearchProvider,
  WebSearchRequest,
  WebSearchResult,
  WebSearchSource,
} from '@nuaagent/web'
import type { SerperError, SerperOrganicResult, SerperSearchResponse } from './types.ts'

/** Stable id this provider registers under. */
export const SERPER_PROVIDER_ID = 'serper'

/** Default Serper endpoint base; `/search` is the operation. */
export const SERPER_DEFAULT_BASE_URL = 'https://google.serper.dev'

/** Attribution header sent on every request. Bump with the package version. */
const USER_AGENT = 'nuaagent/0.1.0-rc.5'

/** Resolved provider options (the plugin's `apply` supplies env-var and constant defaults). */
export interface SerperSearchProviderOptions {
  /** Serper API key. Empty/absent makes the provider unavailable. */
  apiKey: string
  /** Endpoint base; `/search` is appended. */
  baseURL: string
  /** Default result count when a request carries no `maxResults`. */
  maxResults?: number
}

/**
 * Map one Serper organic result to a normalized source.
 *
 * @param result - one entry of the response's `organic[]`.
 * @returns the normalized source; blank optional fields are omitted rather than set empty.
 */
export function mapSerperResult(result: SerperOrganicResult): WebSearchSource {
  return {
    url: result.link,
    ...result.title != null && result.title.length > 0 ? { title: result.title } : {},
    ...result.snippet != null && result.snippet.length > 0 ? { snippet: result.snippet } : {},
  }
}

/**
 * Map a Serper response envelope to a normalized search result.
 *
 * @param response - the parsed `POST /search` response body.
 * @returns the normalized result (sources only; Serper returns no generated answer).
 */
export function mapSerperResponse(response: SerperSearchResponse): WebSearchResult {
  return {
    sources: (response.organic ?? []).map(mapSerperResult),
    truncated: false,
  }
}

/** The Serper-backed search provider; HTTP redirects fail as `WEB_PROVIDER_ERROR`. */
export class SerperSearchProvider implements WebSearchProvider {
  readonly id = SERPER_PROVIDER_ID

  constructor(private readonly options: SerperSearchProviderOptions) {}

  /* jscpd:ignore-start */
  available(): boolean {
    return this.options.apiKey.length > 0
      && URL.canParse(this.options.baseURL)
      && (this.options.maxResults === undefined || isPositiveInteger(this.options.maxResults))
  }
  /* jscpd:ignore-end */

  async search(request: WebSearchRequest, signal?: AbortSignal): Promise<WebSearchResult> {
    const maxResults = request.maxResults ?? this.options.maxResults

    let response: Response
    try {
      response = await fetch(`${this.options.baseURL}/search`, {
        method: 'POST',
        redirect: 'error',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          'user-agent': USER_AGENT,
          'x-api-key': this.options.apiKey,
        },
        body: JSON.stringify({
          q: request.query,
          ...maxResults !== undefined ? { num: maxResults } : {},
        }),
        ...signal !== undefined ? { signal } : {},
      })
    } catch (error: unknown) {
      if (isAbortError(error)) throw new WebError('Serper search aborted', 'WEB_ABORTED', { cause: error })
      throw new WebError(`Serper search request failed: ${String(error)}`, 'WEB_PROVIDER_ERROR', { cause: error })
    }

    if (!response.ok) {
      const status = response.status
      let message = `Serper API error (HTTP ${status})`
      try {
        const parsed = await response.json() as SerperError
        const detail = parsed.error ?? parsed.message
        if (detail !== undefined && detail.length > 0) message = detail
      } catch (error: unknown) {
        if (isAbortError(error)) throw new WebError('Serper search aborted', 'WEB_ABORTED', { cause: error })
      }
      throw new WebError(message, 'WEB_PROVIDER_ERROR')
    }

    try {
      const payload = await response.json() as SerperSearchResponse
      return mapSerperResponse(payload)
    } catch (error: unknown) {
      if (isAbortError(error)) throw new WebError('Serper search aborted', 'WEB_ABORTED', { cause: error })
      throw new WebError(`Serper returned an unprocessable response body: ${String(error)}`, 'WEB_PROVIDER_ERROR', { cause: error })
    }
  }
}

/* jscpd:ignore-start */
/** True for a fetch/`AbortSignal` abort, surfaced as `WEB_ABORTED`. */
function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

/** True for a request limit that can be sent to Serper (a positive whole number). */
function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0
}
/* jscpd:ignore-end */
