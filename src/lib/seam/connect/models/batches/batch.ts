import type { z } from 'zod'

import { spaces_batch } from './spaces.js'

export const batch = spaces_batch.describe(`
  ---
  route_path: /
  ---
  Represents a resource batch.
`)

export type Bundle = z.infer<typeof batch>
