import { z } from 'zod'

export const user_identity = z.object({
  user_identity_id: z.string().uuid(),
  user_identity_key: z.string().nullish(),
  email_address: z.string().email().nullish(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  display_name: z.string(),
  created_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
})

export type UserIdentity = z.output<typeof user_identity>
