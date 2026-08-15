import { fileURLToPath } from 'node:url'
import { Context } from '@nuaagent/cordis'
import { describe, expect, it } from 'vitest'
import SkillRegistry from '@nuaagent/skill'
import * as SkillBadge from '@nuaagent/skill-badge'

describe('dsh-skill-badge', () => {
  it('registers and disposes the bundled badge skill', async () => {
    const ctx = new Context()
    await ctx.plugin(SkillRegistry)
    const fiber = await ctx.plugin(SkillBadge)
    const resourcePath = fileURLToPath(new URL('../assets/', import.meta.url))

    expect(await ctx.skills.list()).toEqual([{
      name: 'dsh-badge',
      description: 'Add the official “powered by dsh” badge to documents, pull requests, merge requests, and other content produced with NUAAgent. Use whenever creating a pull request or merge request. Also use when the user asks for a dsh badge, powered-by-dsh attribution, or a reusable dsh badge asset or snippet.',
      invocation: { modelInvocable: true, userInvocable: true },
      provider: 'dsh-badge',
      source: 'bundled',
      resourceBase: { kind: 'directory', path: resourcePath },
    }])
    const loaded = await ctx.skills.get('dsh-badge')
    expect(loaded?.content).toContain('Preserve the badge\'s 121×20 dimensions')
    expect(loaded?.resourceBase).toEqual({ kind: 'directory', path: resourcePath })

    await fiber.dispose()
    expect(await ctx.skills.list()).toEqual([])
  })
})
