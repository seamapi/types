import { z } from 'zod'

export const user_identity = z.object({
  user_identity_id: z.string().uuid(),
  user_identity_key: z.string().nonempty().nullable(),
  email_address: z.string().email().nullable(),
  display_name: z.string().nonempty(),
  full_name: z.string().nonempty().nullable(),
  created_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
})

export type UserIdentity = z.output<typeof user_identity>
