import { describe, expect, it } from 'vitest'
import { SerperSearchProvider, SERPER_DEFAULT_BASE_URL } from '@nuaagent/web-search-serper'

const apiKey = process.env.SERPER_API_KEY
const describeIf = apiKey ? describe : describe.skip

describeIf('web-search-serper e2e', () => {
  it('searches the real Serper API', async () => {
    const provider = new SerperSearchProvider({ apiKey: apiKey!, baseURL: SERPER_DEFAULT_BASE_URL, maxResults: 3 })
    const result = await provider.search({ query: 'DeepSeek Harness', maxResults: 3 })
    expect(result.sources.length).toBeGreaterThan(0)
    expect(result.sources[0]!.url).toMatch(/^https?:\/\//)
  })
})
