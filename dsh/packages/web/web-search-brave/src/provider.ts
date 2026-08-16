/**
 * Brave search over its `GET /res/v1/web/search` endpoint. Each entry of the flat
 * `web.results[]` maps to a normalized source (`description` → `snippet`). The wire format and
 * native `fetch` client are provider-private and do not use `ctx.llm`.
 * @module @nuaagent/web-search-brave/provider
 */

import { WebError } from '@nuaagent/web'
import type {
  WebSearchProvider,
  WebSearchRequest,
  WebSearchResult,
  WebSearchSource,
} from '@nuaagent/web'
import type { BraveError, BraveSearchResponse, BraveWebResult } from './types.ts'

/** Stable id this provider registers under. */
export const BRAVE_PROVIDER_ID = 'brave'

/** Default Brave Search endpoint base; `/res/v1/web/search` is the operation. */
export const BRAVE_DEFAULT_BASE_URL = 'https://api.search.brave.com'

/** Brave web search operation path, appended to the configured base. */
export const BRAVE_DEFAULT_ENDPOINT = '/res/v1/web/search'

/** Attribution header sent on every request. Bump with the package version. */
const USER_AGENT = 'nuaagent/0.1.0-rc.5'

/** Resolved provider options (the plugin's `apply` supplies env-var and constant defaults). */
export interface BraveSearchProviderOptions {
  /** Brave Search API key. Empty/absent makes the provider unavailable. */
  apiKey: string
  /** Endpoint base; `/res/v1/web/search` is appended. */
  baseURL: string
  /** Default result count when a request carries no `maxResults`. */
  maxResults?: number
}

/**
 * Map one Brave web result to a normalized source.
 *
 * @param result - one entry of the response's `web.results[]`.
 * @returns the normalized source; blank optional fields are omitted rather than set empty.
 */
export function mapBraveResult(result: BraveWebResult): WebSearchSource {
  return {
    url: result.url,
    ...result.title != null && result.title.length > 0 ? { title: result.title } : {},
    ...result.description != null && result.description.length > 0 ? { snippet: result.description } : {},
  }
}

/**
 * Map a Brave response envelope to a normalized search result.
 *
 * @param response - the parsed `GET /res/v1/web/search` response body.
 * @returns the normalized result (sources only; Brave returns no generated answer).
 */
export function mapBraveResponse(response: BraveSearchResponse): WebSearchResult {
  return {
    sources: (response.web?.results ?? []).map(mapBraveResult),
    truncated: false,
  }
}

/** The Brave-backed search provider; HTTP redirects fail as `WEB_PROVIDER_ERROR`. */
export class BraveSearchProvider implements WebSearchProvider {
  readonly id = BRAVE_PROVIDER_ID

  constructor(private readonly options: BraveSearchProviderOptions) {}

  // Availability checks stay beside each provider's distinct config contract; a shared base
  // class would obscure which fields make this backend usable.
  /* jscpd:ignore-start */
  available(): boolean {
    return this.options.apiKey.length > 0
      && URL.canParse(this.options.baseURL)
      && (this.options.maxResults === undefined || isPositiveInteger(this.options.maxResults))
  }
  /* jscpd:ignore-end */

  async search(request: WebSearchRequest, signal?: AbortSignal): Promise<WebSearchResult> {
    const maxResults = request.maxResults ?? this.options.maxResults
    const url = new URL(this.options.baseURL + BRAVE_DEFAULT_ENDPOINT)
    url.searchParams.set('q', request.query)
    if (maxResults !== undefined) url.searchParams.set('count', String(maxResults))

    let response: Response
    try {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'error',
        headers: {
          accept: 'application/json',
          'user-agent': USER_AGENT,
          'x-subscription-token': this.options.apiKey,
        },
        ...signal !== undefined ? { signal } : {},
      })
    } catch (error: unknown) {
      if (isAbortError(error)) throw new WebError('Brave search aborted', 'WEB_ABORTED', { cause: error })
      throw new WebError(`Brave search request failed: ${String(error)}`, 'WEB_PROVIDER_ERROR', { cause: error })
    }

    if (!response.ok) {
      const status = response.status
      let message = `Brave API error (HTTP ${status})`
      try {
        const parsed = await response.json() as BraveError
        const detail = typeof parsed.detail === 'string'
          ? parsed.detail
          : parsed.detail?.error ?? parsed.detail?.message ?? parsed.title ?? parsed.error ?? parsed.message
        if (detail !== undefined && detail.length > 0) message = detail
      } catch (error: unknown) {
        if (isAbortError(error)) throw new WebError('Brave search aborted', 'WEB_ABORTED', { cause: error })
      }
      throw new WebError(message, 'WEB_PROVIDER_ERROR')
    }

    try {
      const payload = await response.json() as BraveSearchResponse
      return mapBraveResponse(payload)
    } catch (error: unknown) {
      if (isAbortError(error)) throw new WebError('Brave search aborted', 'WEB_ABORTED', { cause: error })
      throw new WebError(`Brave returned an unprocessable response body: ${String(error)}`, 'WEB_PROVIDER_ERROR', { cause: error })
    }
  }
}

/* jscpd:ignore-start */
/** True for a fetch/`AbortSignal` abort, surfaced as `WEB_ABORTED`. */
function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

/** True for a request limit that can be sent to Brave (a positive whole number). */
function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0
}
/* jscpd:ignore-end */
