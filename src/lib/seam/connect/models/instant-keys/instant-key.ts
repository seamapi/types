import { z } from 'zod'

export const instant_key = z.object({
  instant_key_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  created_at: z.string().datetime(),
  instant_key_url: z.string().url(),
  client_session_id: z.string().uuid(),
  user_identity_id: z.string().uuid(),
  expires_at: z.string().datetime(),
}).describe(`
  ---
  route_path: /user_identities
  undocumented: Unreleased.
  ---
`)

export type InstantKey = z.infer<typeof instant_key>
