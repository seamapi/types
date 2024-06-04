import { z } from 'zod'

export const workspace = z.object({
  workspace_id: z.string().uuid(),
  name: z.string(),
  is_sandbox: z.boolean(),
  connect_partner_name: z.string().nullable(),
})
