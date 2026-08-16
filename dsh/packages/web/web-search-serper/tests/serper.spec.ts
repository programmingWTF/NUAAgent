import { afterEach, describe, expect, it, vi } from 'vitest'
import { Context } from '@nuaagent/cordis'
import WebRuntime from '@nuaagent/web'
import { SerperSearchProvider, SERPER_PROVIDER_ID } from '@nuaagent/web-search-serper'
import * as serperPlugin from '@nuaagent/web-search-serper'
import { mapSerperResponse, mapSerperResult } from '../src/provider.ts'

const options = {
  apiKey: 'serper-key',
  baseURL: 'https://google.serper.test',
}

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' }, ...init })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Serper result mapping', () => {
  it('maps a full result entry', () => {
    expect(mapSerperResult({ link: 'https://a.test', title: 'A', snippet: 'snip' }))
      .toEqual({ url: 'https://a.test', title: 'A', snippet: 'snip' })
  })

  it('omits null/empty optional fields', () => {
    expect(mapSerperResult({ link: 'https://a.test', title: null, snippet: null }))
      .toEqual({ url: 'https://a.test' })
  })

  it('maps a response to sources and tolerates missing organic', () => {
    expect(mapSerperResponse({ organic: [{ link: 'https://a.test', snippet: 'one' }] }))
      .toEqual({ sources: [{ url: 'https://a.test', snippet: 'one' }], truncated: false })
    expect(mapSerperResponse({})).toEqual({ sources: [], truncated: false })
  })
})

describe('SerperSearchProvider', () => {
  it('is unavailable without a key and available with one', () => {
    expect(new SerperSearchProvider({ ...options, apiKey: '' }).available()).toBe(false)
    expect(new SerperSearchProvider(options).available()).toBe(true)
  })

  it('is misconfigured when the base URL is unparseable', () => {
    expect(new SerperSearchProvider({ ...options, baseURL: 'not a url' }).available()).toBe(false)
  })

  it('sends q + num body and the x-api-key header', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ organic: [] }))
    vi.stubGlobal('fetch', fetchMock)
    await new SerperSearchProvider(options).search({ query: 'hello', maxResults: 5 })

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://google.serper.test/search')
    expect(init).toMatchObject({ method: 'POST', redirect: 'error', headers: expect.objectContaining({ 'x-api-key': 'serper-key' }) })
    expect(JSON.parse(init.body as string)).toEqual({ q: 'hello', num: 5 })
  })

  it('omits num when no maxResults is given', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({ organic: [] }))
    vi.stubGlobal('fetch', fetchMock)
    await new SerperSearchProvider(options).search({ query: 'q' })
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(JSON.parse(init.body as string)).toEqual({ q: 'q' })
  })

  it('maps an HTTP error and network/abort failures', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse({ error: 'bad key' }, { status: 403 })))
    await expect(new SerperSearchProvider(options).search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_PROVIDER_ERROR', message: 'bad key' }))
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('boom'))))
    await expect(new SerperSearchProvider(options).search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_PROVIDER_ERROR' }))
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new DOMException('abort', 'AbortError'))))
    await expect(new SerperSearchProvider(options).search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_ABORTED' }))
  })
})

describe('web-search-serper plugin registration', () => {
  it('registers the provider into ctx.web and disposes (HMR-safe)', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse({ organic: [] })))
    const ctx = new Context()
    await ctx.plugin(WebRuntime, { searchProvider: SERPER_PROVIDER_ID })
    const fiber = await ctx.plugin(serperPlugin, { apiKey: 'serper-key' })
    await expect(ctx.web.search({ query: 'q' })).resolves.toMatchObject({ sources: [], truncated: false })
    await fiber.dispose()
    await expect(ctx.web.search({ query: 'q' }))
      .rejects.toThrow(expect.objectContaining({ code: 'WEB_PROVIDER_CONFIGURED_MISSING' }))
  })

  it('has no default export and falls back to $SERPER_API_KEY', async () => {
    expect('default' in serperPlugin).toBe(false)
    const prev = process.env.SERPER_API_KEY
    process.env.SERPER_API_KEY = 'env-key'
    try {
      const fetchMock = vi.fn(async () => jsonResponse({ organic: [] }))
      vi.stubGlobal('fetch', fetchMock)
      const ctx = new Context()
      await ctx.plugin(WebRuntime, { searchProvider: SERPER_PROVIDER_ID })
      const fiber = await ctx.plugin(serperPlugin, {})
      await ctx.web.search({ query: 'q' })
      const [url] = fetchMock.mock.calls[0] as unknown as [string]
      expect(url).toBe('https://google.serper.dev/search')
      await fiber.dispose()
    } finally {
      if (prev === undefined) delete process.env.SERPER_API_KEY
      else process.env.SERPER_API_KEY = prev
    }
  })
})
