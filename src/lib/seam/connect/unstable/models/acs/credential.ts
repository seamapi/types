import { z } from 'zod'

export const acs_credential = z.object({
  acs_credential_id: z.string().uuid(),
  acs_user_id: z.string().uuid(),
  acs_system_id: z.string().uuid(),
  code: z.string().nullable(),
  // TODO: credential_type: z.enum([...]) we don't know what enum types we want yet
  created_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
})

export type AcsCredential = z.output<typeof acs_credential>
