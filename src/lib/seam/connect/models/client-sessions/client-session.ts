import { z } from 'zod'

export const client_session = z.object({
  client_session_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  created_at: z.string().datetime(),
  token: z.string(),
  user_identifier_key: z.string().nullable(),
  device_count: z.number(),
  connected_account_ids: z.array(z.string().uuid()),
  connect_webview_ids: z.array(z.string().uuid()),
  user_identity_ids: z.array(z.string().uuid()),
})

export type ClientSession = z.infer<typeof client_session>
