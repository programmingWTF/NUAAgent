/**
 * `@nuaagent/web-search-serper`: registers a Serper (Google)-backed `WebSearchProvider` with
 * `ctx.web`. A function/namespace plugin (NOT a default-export service): a search provider
 * does not own the `ctx.web` key — it registers INTO the seam's provider registry, exactly as
 * `@nuaagent/web-search-exa` registers into `ctx.web`. The key is owned by `@nuaagent/web`.
 *
 * @module @nuaagent/web-search-serper
 */

import type { Context } from '@nuaagent/cordis'
import { launchEnvironmentOf } from '@nuaagent/launch-environment'
import z from '@nuaagent/schemastery'
import type {} from '@nuaagent/web'
import { SerperSearchProvider, SERPER_DEFAULT_BASE_URL } from './provider.ts'

export { SERPER_DEFAULT_BASE_URL, SERPER_PROVIDER_ID, SerperSearchProvider } from './provider.ts'
export type { SerperSearchProviderOptions } from './provider.ts'

/** Cordis plugin name used by loader diagnostics. */
export const name = 'web-search-serper'

/** The web seam this provider registers into. */
export const inject = ['web']

/** Plugin config (all optional — `apply` fills env-var and constant defaults). */
export interface Config {
  /** Serper API key. Falls back to `$SERPER_API_KEY`. Empty → provider unavailable. */
  apiKey?: string
  /** Endpoint base; `/search` is appended. Defaults to the public API. */
  baseURL?: string
  /** Default result count when a request carries no `maxResults`. Omitted = none. */
  maxResults?: number
}

export const Config: z<Config> = z.object({
  apiKey: z.string(),
  baseURL: z.string(),
  maxResults: z.number().step(1).min(1),
})

/** Register the Serper search provider with `ctx.web`. */
export function apply(ctx: Context, config: Config): void {
  ctx.web.registerSearchProvider(new SerperSearchProvider({
    apiKey: config.apiKey ?? launchEnvironmentOf(ctx).get('SERPER_API_KEY')?.value ?? '',
    baseURL: config.baseURL ?? SERPER_DEFAULT_BASE_URL,
    ...config.maxResults !== undefined ? { maxResults: config.maxResults } : {},
  }))
}
