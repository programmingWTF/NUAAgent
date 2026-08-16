import { describe, expect, it } from 'vitest'
import {
  TavilySearchProvider,
  TAVILY_DEFAULT_BASE_URL,
  TAVILY_DEFAULT_INCLUDE_ANSWER,
  TAVILY_DEFAULT_SEARCH_DEPTH,
  TAVILY_DEFAULT_TOPIC,
} from '@nuaagent/web-search-tavily'

const apiKey = process.env.TAVILY_API_KEY
const describeIf = apiKey ? describe : describe.skip

describeIf('web-search-tavily e2e', () => {
  it('searches the real Tavily API', async () => {
    const provider = new TavilySearchProvider({
      apiKey: apiKey!,
      baseURL: TAVILY_DEFAULT_BASE_URL,
      searchDepth: TAVILY_DEFAULT_SEARCH_DEPTH,
      topic: TAVILY_DEFAULT_TOPIC,
      includeAnswer: TAVILY_DEFAULT_INCLUDE_ANSWER,
      maxResults: 3,
    })
    const result = await provider.search({ query: 'DeepSeek Harness', maxResults: 3 })
    expect(result.sources.length).toBeGreaterThan(0)
    expect(result.sources[0]!.url).toMatch(/^https?:\/\//)
  })
})
