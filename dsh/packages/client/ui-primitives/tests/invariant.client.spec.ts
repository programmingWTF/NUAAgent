import { describe, expect, it } from 'vitest'
import { Context } from '@nuaagent/cordis'
import * as PrimitivesInvariant from '@nuaagent/client-ui-primitives/invariant'
import InvariantRegistry from '@nuaagent/invariants'

describe('invariant companion', () => {
  it('registers under the package name with an empty installer', async () => {
    const ctx = new Context()
    await ctx.plugin(InvariantRegistry, { enabled: true })
    await expect(ctx.plugin(PrimitivesInvariant).await()).resolves.toBeDefined()
  })
})
