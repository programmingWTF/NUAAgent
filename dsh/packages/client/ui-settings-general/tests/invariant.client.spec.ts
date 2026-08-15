import { describe, expect, it } from 'vitest'
import { Context } from '@nuaagent/cordis'
import * as GeneralInvariant from '@nuaagent/client-ui-settings-general/invariant'
import InvariantRegistry from '@nuaagent/invariants'

describe('invariant companion', () => {
  it('registers under the package name with an empty installer', async () => {
    const ctx = new Context()
    await ctx.plugin(InvariantRegistry, { enabled: true })
    await expect(ctx.plugin(GeneralInvariant).await()).resolves.toBeDefined()
  })
})
