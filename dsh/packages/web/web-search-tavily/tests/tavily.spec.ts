import { afterEach, describe, expect, it, vi } from 'vitest'
import { Context } from '@nuaagent/cordis'
import WebRuntime from '@nuaagent/web'
import { TavilySearchProvider, TAVILY_PROVIDER_ID } from '@nuaagent/web-search-tavily'
import * as tavilyPlugin from '@nuaagent/web-search-tavily'
import { mapTavilyResponse, mapTavilyResult } from '../src/provider.ts'

const options = {
  apiKey: 'tvly-key',
  baseURL: 'https://api.tavily.test',
  searchDepth: 'basic' as const,
  topic: 'general' as const,
  includeAnswer: true,
}

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' }, ...init })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Tavily result mapping', () => {
  it('maps a full result entry', () => {
    expect(mapTavilyResult({
      url: 'https://a.test',
      title: 'A',
      content: 'snip',
      published_date: '2026-01-01',
    })).toEqual({ url: 'https://a.test', title: 'A', snippet: 'snip', publishedAt: '2026-01-01' })
  })

  it('omits null/empty optional fields', () => {
    expect(mapTavilyResult({ url: 'https://a.test', title: null, content: null, published_date: null }))
      .toEqual({ url: 'https://a.test' })
  })

  it('maps a response to content + sources', () => {
    expect(mapTavilyResponse({
      answer: 'summary',
      results: [{ url: 'https://a.test', content: 'one' }],
    })).toEqual({
      content: 'summary',
      sources: [{ url: 'https://a.test', snippet: 'one' }],
      truncated: false,
    })
  })

  it('omits an empty answer and tolerates missing results', () => {
    expect(mapTavilyResponse({})).toEqual({ sources: [], truncated: false })
  })
})

describe('TavilySearchProvider availability', () => {
  it('is unavailable without a key', () => {
    expect(new TavilySearchProvider({ ...options, apiKey: '' }).available()).toBe(false)
  })

  it('is available with a key', () => {
    expect(new TavilySearchProvider(options).available()).toBe(true)
  })

  it('is misconfigured when the base URL is unparseable', () => {
    expect(new TavilySearchProvider({ ...options, baseURL: 'not a url' }).available()).toBe(false)
  })

  it('is misconfigured when maxResults is set but not a positive integer', () => {
    expect(new TavilySearchProvider({ ...options, maxResults: 0 }).available()).toBe(false)
  })
})

describe('TavilySearchProvider request mapping', () => {
  it('sends api_key, query, depth, topic, answer and max_results', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ results: [] }))
    vi.stubGlobal('fetch', fetchMock)
    await new TavilySearchProvider(options).search({ query: 'hello', maxResults: 5 })

    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://api.tavily.test/search')
    expect(init).toMatchObject({ method: 'POST', redirect: 'error' })
    expect(JSON.parse(init.body as string)).toEqual({
      api_key: 'tvly-key',
      query: 'hello',
      search_depth: 'basic',
      topic: 'general',
      include_answer: true,
      max_results: 5,
    })
  })

  it('lets a request maxResults win over the configured default and omits when both absent', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ results: [] }))
    vi.stubGlobal('fetch', fetchMock)
    await new TavilySearchProvider({ ...options, maxResults: 7 }).search({ query: 'q', maxResults: 2 })
    const [, init1] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(JSON.parse(init1.body as string)).toMatchObject({ max_results: 2 })

    await new TavilySearchProvider(options).search({ query: 'q' })
    const [, init2] = fetchMock.mock.calls[1] as unknown as [string, RequestInit]
    expect(JSON.parse(init2.body as string)).not.toHaveProperty('max_results')
  })
})

describe('TavilySearchProvider error handling', () => {
  it('maps an HTTP error to WEB_PROVIDER_ERROR', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse({ detail: { error: 'bad key' } }, { status: 401 })))
    await expect(new TavilySearchProvider(options).search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_PROVIDER_ERROR', message: 'bad key' }))
  })

  it('maps a network failure to WEB_PROVIDER_ERROR', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('connection refused'))))
    await expect(new TavilySearchProvider(options).search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_PROVIDER_ERROR' }))
  })

  it('maps an abort to WEB_ABORTED', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new DOMException('aborted', 'AbortError'))))
    await expect(new TavilySearchProvider(options).search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_ABORTED' }))
  })

  it('maps an unparseable success body to WEB_PROVIDER_ERROR', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('not json', { status: 200 })))
    await expect(new TavilySearchProvider(options).search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_PROVIDER_ERROR' }))
  })
})

describe('web-search-tavily plugin registration', () => {
  it('registers the provider into ctx.web (HMR-safe)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse({ results: [] })))
    const ctx = new Context()
    await ctx.plugin(WebRuntime, { searchProvider: TAVILY_PROVIDER_ID })
    const fiber = await ctx.plugin(tavilyPlugin, { apiKey: 'tvly-key' })
    await expect(ctx.web.search({ query: 'q' })).resolves.toMatchObject({ sources: [], truncated: false })
    await fiber.dispose()
    await expect(ctx.web.search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_PROVIDER_CONFIGURED_MISSING' }))
  })

  it('has no default export (namespace plugin export shape)', () => {
    expect('default' in tavilyPlugin).toBe(false)
  })

  it('falls back to $TAVILY_API_KEY and the default base URL when config omits them', async () => {
    const prev = process.env.TAVILY_API_KEY
    process.env.TAVILY_API_KEY = 'env-key'
    try {
      const fetchMock = vi.fn(async () => jsonResponse({ results: [] }))
      vi.stubGlobal('fetch', fetchMock)
      const ctx = new Context()
      await ctx.plugin(WebRuntime, { searchProvider: TAVILY_PROVIDER_ID })
      const fiber = await ctx.plugin(tavilyPlugin, {})
      await ctx.web.search({ query: 'q' })
      const [url] = fetchMock.mock.calls[0] as unknown as [string]
      expect(url).toBe('https://api.tavily.com/search')
      await fiber.dispose()
    } finally {
      if (prev === undefined) delete process.env.TAVILY_API_KEY
      else process.env.TAVILY_API_KEY = prev
    }
  })
})
