import { z } from 'zod'

export const network = z.object({
  network_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  display_name: z.string(),
  created_at: z.string().datetime(),
})

export type Network = z.infer<typeof network>
