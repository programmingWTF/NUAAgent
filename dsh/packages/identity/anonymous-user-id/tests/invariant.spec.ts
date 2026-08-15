import { describe, expect, it } from 'vitest'
import { Context } from '@nuaagent/cordis'
import InvariantRegistry from '@nuaagent/invariants'
import * as UserIdInvariant from '@nuaagent/anonymous-user-id/invariant'

describe('invariant companion', () => {
  it('registers the package ownership with an empty installer', async () => {
    const ctx = new Context()
    await ctx.plugin(InvariantRegistry, { enabled: true })
    await expect(ctx.plugin(UserIdInvariant).await()).resolves.toBeDefined()
  })
})
