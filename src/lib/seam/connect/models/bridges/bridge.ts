import { z } from 'zod'

import { datetime } from '../datetime.js'

export const bridge = z.object({
  bridge_id: z.string().uuid().describe('ID of Seam Bridge.'),
  workspace_id: z
    .string()
    .uuid()
    .describe('ID of the workspace that contains Seam Bridge.'),
  created_at: datetime.describe(
    'Date and time at which Seam Bridge was created.',
  ),
}).describe(`
---
undocumented: Unreleased.
route_path: /bridges
---
Represents [Seam Bridge](https://docs.seam.co/capability-guides/seam-bridge).
`)
export type Bridge = z.infer<typeof bridge>
