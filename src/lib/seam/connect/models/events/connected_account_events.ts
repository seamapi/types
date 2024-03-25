import { z } from 'zod'

const connected_account_connected = z.object({
  event_type: z.literal('connected_account.connected'),
  connected_account_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  connect_webview_id: z.string().uuid(),
})

const connected_account_successful_login = z.object({
  event_type: z.literal('connected_account.successful_login'),
  connected_account_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  connect_webview_id: z.string().uuid(),
})

const connected_account_created = z.object({
  event_type: z.literal('connected_account.created'),
  connected_account_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
})

export const connected_account_event_map = {
  connected_account_connected,
  connected_account_successful_login,
  connected_account_created,
}
