import { staticLinked } from '../tsdown.client.ts'

export default staticLinked(
  '@nuaagent/client-web',
  ['lib/types/index.js', 'lib/types/invariant.js'],
)
