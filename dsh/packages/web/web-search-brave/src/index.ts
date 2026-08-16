/**
 * `@nuaagent/web-search-brave`: registers a Brave-backed `WebSearchProvider` with `ctx.web`. A
 * function/namespace plugin (NOT a default-export service): a search provider does not own the
 * `ctx.web` key — it registers INTO the seam's provider registry, exactly as
 * `@nuaagent/web-search-exa` registers into `ctx.web`. The key is owned by `@nuaagent/web`.
 *
 * @module @nuaagent/web-search-brave
 */

import type { Context } from '@nuaagent/cordis'
import { launchEnvironmentOf } from '@nuaagent/launch-environment'
import z from '@nuaagent/schemastery'
import type {} from '@nuaagent/web'
import { BraveSearchProvider, BRAVE_DEFAULT_BASE_URL } from './provider.ts'

export { BRAVE_DEFAULT_BASE_URL, BRAVE_DEFAULT_ENDPOINT, BRAVE_PROVIDER_ID, BraveSearchProvider } from './provider.ts'
export type { BraveSearchProviderOptions } from './provider.ts'

/** Cordis plugin name used by loader diagnostics. */
export const name = 'web-search-brave'

/** The web seam this provider registers into. */
export const inject = ['web']

/** Plugin config (all optional — `apply` fills env-var and constant defaults). */
export interface Config {
  /** Brave Search API key. Falls back to `$BRAVE_API_KEY`. Empty → provider unavailable. */
  apiKey?: string
  /** Endpoint base; `/res/v1/web/search` is appended. Defaults to the public API. */
  baseURL?: string
  /** Default result count when a request carries no `maxResults`. Omitted = none. */
  maxResults?: number
}

export const Config: z<Config> = z.object({
  apiKey: z.string(),
  baseURL: z.string(),
  maxResults: z.number().step(1).min(1),
})

/** Register the Brave search provider with `ctx.web`. */
export function apply(ctx: Context, config: Config): void {
  ctx.web.registerSearchProvider(new BraveSearchProvider({
    apiKey: config.apiKey ?? launchEnvironmentOf(ctx).get('BRAVE_API_KEY')?.value ?? '',
    baseURL: config.baseURL ?? BRAVE_DEFAULT_BASE_URL,
    ...config.maxResults !== undefined ? { maxResults: config.maxResults } : {},
  }))
}
