import { z } from 'zod'

import { custom_metadata } from './custom-metadata.js'

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
  custom_redirect_url: z.string().url().nullable(),
  custom_redirect_failure_url: z.string().url().nullable(),
  custom_metadata,
  automatically_manage_new_devices: z.boolean(),
  wait_for_device_creation: z.boolean(),
  authorized_at: z.string().datetime().nullable(),
  selected_provider: z.string().nullable(),
})

export type ConnectWebview = z.infer<typeof connect_webview>
