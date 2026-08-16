import { afterEach, describe, expect, it, vi } from 'vitest'
import { Context } from '@nuaagent/cordis'
import WebRuntime from '@nuaagent/web'
import { BraveSearchProvider, BRAVE_PROVIDER_ID } from '@nuaagent/web-search-brave'
import * as bravePlugin from '@nuaagent/web-search-brave'
import { mapBraveResponse, mapBraveResult } from '../src/provider.ts'

const options = {
  apiKey: 'brave-key',
  baseURL: 'https://api.search.brave.test',
}

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' }, ...init })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Brave result mapping', () => {
  it('maps a full result entry', () => {
    expect(mapBraveResult({ url: 'https://a.test', title: 'A', description: 'snip' }))
      .toEqual({ url: 'https://a.test', title: 'A', snippet: 'snip' })
  })

  it('omits null/empty optional fields', () => {
    expect(mapBraveResult({ url: 'https://a.test', title: null, description: null }))
      .toEqual({ url: 'https://a.test' })
  })

  it('maps a response to sources and tolerates missing results', () => {
    expect(mapBraveResponse({ web: { results: [{ url: 'https://a.test', description: 'one' }] } }))
      .toEqual({ sources: [{ url: 'https://a.test', snippet: 'one' }], truncated: false })
    expect(mapBraveResponse({})).toEqual({ sources: [], truncated: false })
  })
})

describe('BraveSearchProvider', () => {
  it('is unavailable without a key and available with one', () => {
    expect(new BraveSearchProvider({ ...options, apiKey: '' }).available()).toBe(false)
    expect(new BraveSearchProvider(options).available()).toBe(true)
  })

  it('is misconfigured when the base URL is unparseable', () => {
    expect(new BraveSearchProvider({ ...options, baseURL: 'not a url' }).available()).toBe(false)
  })

  it('sends q + count params and the x-subscription-token header', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ web: { results: [] } }))
    vi.stubGlobal('fetch', fetchMock)
    await new BraveSearchProvider(options).search({ query: 'hello', maxResults: 5 })

    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0] as unknown as [URL, RequestInit]
    expect(url.toString()).toBe('https://api.search.brave.test/res/v1/web/search?q=hello&count=5')
    expect(init).toMatchObject({ method: 'GET', redirect: 'error', headers: expect.objectContaining({ 'x-subscription-token': 'brave-key' }) })
  })

  it('omits count when no maxResults is given', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ web: { results: [] } }))
    vi.stubGlobal('fetch', fetchMock)
    await new BraveSearchProvider(options).search({ query: 'q' })
    const [url] = fetchMock.mock.calls[0] as unknown as [URL]
    expect(url.toString()).toBe('https://api.search.brave.test/res/v1/web/search?q=q')
  })

  it('maps an HTTP error to WEB_PROVIDER_ERROR', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse({ title: 'bad key' }, { status: 401 })))
    await expect(new BraveSearchProvider(options).search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_PROVIDER_ERROR', message: 'bad key' }))
  })

  it('maps a network failure and abort', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('boom'))))
    await expect(new BraveSearchProvider(options).search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_PROVIDER_ERROR' }))
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new DOMException('abort', 'AbortError'))))
    await expect(new BraveSearchProvider(options).search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_ABORTED' }))
  })
})

describe('web-search-brave plugin registration', () => {
  it('registers the provider into ctx.web and disposes (HMR-safe)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse({ web: { results: [] } })))
    const ctx = new Context()
    await ctx.plugin(WebRuntime, { searchProvider: BRAVE_PROVIDER_ID })
    const fiber = await ctx.plugin(bravePlugin, { apiKey: 'brave-key' })
    await expect(ctx.web.search({ query: 'q' })).resolves.toMatchObject({ sources: [], truncated: false })
    await fiber.dispose()
    await expect(ctx.web.search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_PROVIDER_CONFIGURED_MISSING' }))
  })

  it('has no default export and falls back to $BRAVE_API_KEY', async () => {
    expect('default' in bravePlugin).toBe(false)
    const prev = process.env.BRAVE_API_KEY
    process.env.BRAVE_API_KEY = 'env-key'
    try {
      const fetchMock = vi.fn(async () => jsonResponse({ web: { results: [] } }))
      vi.stubGlobal('fetch', fetchMock)
      const ctx = new Context()
      await ctx.plugin(WebRuntime, { searchProvider: BRAVE_PROVIDER_ID })
      const fiber = await ctx.plugin(bravePlugin, {})
      await ctx.web.search({ query: 'q' })
      const [url] = fetchMock.mock.calls[0] as unknown as [URL]
      expect(url.toString()).toBe('https://api.search.brave.com/res/v1/web/search?q=q')
      await fiber.dispose()
    } finally {
      if (prev === undefined) delete process.env.BRAVE_API_KEY
      else process.env.BRAVE_API_KEY = prev
    }
  })
})
