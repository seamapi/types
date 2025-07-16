import { z } from 'zod'

import { access_grants_batch } from './access_grants.js'
import { access_methods_batch } from './access_methods.js'
import { spaces_batch } from './spaces.js'

export const batch = z.union([
  spaces_batch,
  access_grants_batch,
  access_methods_batch,
]).describe(`
  ---
  route_path: /
  ---
  Represents a resource batch.
`)

export type Bundle = z.infer<typeof batch>
