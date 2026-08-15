import { describe, expect, it } from 'vitest'
import { Context } from '@nuaagent/cordis'
import * as SidebarInvariant from '@nuaagent/client-ui-sidebar/invariant'
import InvariantRegistry from '@nuaagent/invariants'

describe('invariant companion', () => {
  it('registers under the package name with an empty installer', async () => {
    const ctx = new Context()
    await ctx.plugin(InvariantRegistry, { enabled: true })
    await expect(ctx.plugin(SidebarInvariant).await()).resolves.toBeDefined()
  })

  it('node-half apply is a no-op host placeholder', async () => {
    const { apply } = await import('@nuaagent/client-ui-sidebar')
    apply()
    expect(true).toBe(true) // reaching here without throw is the contract
  })
})
