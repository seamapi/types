import { z } from 'zod'

export const bridge = z.object({
  bridge_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  created_at: z.string().datetime(),
}).describe(`
---
undocumented: Unreleased.
route_path: /bridges
---
`)
export type Bridge = z.infer<typeof bridge>
