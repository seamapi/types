import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'

export const connect_webview_device_selection_mode = z.enum([
  'none',
  'single',
  'multiple',
])

export const connect_webview = z.object({
  connect_webview_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  created_at: z.string().datetime(),
  connected_account_id: z.string().uuid().nullable(),
  url: z.string().url(),
  device_selection_mode: connect_webview_device_selection_mode,

  // TODO: Use enum value.
  accepted_providers: z.array(z.string()),

  accepted_devices: z.array(z.string()).describe(
    `
      ---
      deprecated: Unused. Will be removed.
      ---
      `,
  ),
  any_device_allowed: z.boolean().describe(
    `
      ---
      deprecated: Unused. Will be removed.
      ---
      `,
  ),

  any_provider_allowed: z.boolean(),
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
