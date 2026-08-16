import { describe, expect, it } from 'vitest'
import { BraveSearchProvider, BRAVE_DEFAULT_BASE_URL } from '@nuaagent/web-search-brave'

const apiKey = process.env.BRAVE_API_KEY
const describeIf = apiKey ? describe : describe.skip

describeIf('web-search-brave e2e', () => {
  it('searches the real Brave API', async () => {
    const provider = new BraveSearchProvider({ apiKey: apiKey!, baseURL: BRAVE_DEFAULT_BASE_URL, maxResults: 3 })
    const result = await provider.search({ query: 'DeepSeek Harness', maxResults: 3 })
    expect(result.sources.length).toBeGreaterThan(0)
    expect(result.sources[0]!.url).toMatch(/^https?:\/\//)
  })
})
