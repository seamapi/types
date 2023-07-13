import { z } from 'zod'

export const connect_webview = z.object({
  connect_webview_id: z.string().uuid(),
  connected_account_id: z.string().uuid().optional(),
  url: z.string().url(),
  workspace_id: z.string().uuid(),
  device_selection_mode: z.enum(['none', 'single', 'multiple']),
  accepted_providers: z.array(z.string()),
  accepted_devices: z.array(z.string()),
  any_provider_allowed: z.boolean(),
  any_device_allowed: z.boolean(),
  created_at: z.string().datetime(),
  login_successful: z.boolean(),
  status: z.enum(['pending', 'failed', 'authorized']),
})

export type ConnectWebview = z.infer<typeof connect_webview>
