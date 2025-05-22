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
      undocumented: Unused. Will be removed.
      deprecated: Unused. Will be removed.
      ---
      `,
  ),
  any_device_allowed: z.boolean().describe(
    `
      ---
      undocumented: Unused. Will be removed.
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
}).describe(`
  ---
  route_path: /connect_webviews
  ---
  Represents a [Connect Webview](https://docs.seam.co/latest/core-concepts/connect-webviews).

  Connect Webviews are fully-embedded client-side components that you add to your app. Your users interact with your embedded Connect Webviews to link their IoT device or system accounts to Seam. That is, Connect Webviews walk your users through the process of logging in to their device or system accounts. Seam handles all the authentication steps, and—once your user has completed the authorization through your app—you can access and control their devices or systems using the Seam API.
  
  Connect Webviews perform credential validation, multifactor authentication (when applicable), and error handling for each brand that Seam supports. Further, Connect Webviews work across all modern browsers and platforms, including Chrome, Safari, and Firefox.
  
  To enable a user to connect their device or system account to Seam through your app, first create a \`connect_webview\`. Once created, this \`connect_webview\` includes a URL that you can use to open an [iframe](https://www.w3schools.com/html/html_iframe.asp) or new window containing the Connect Webview for your user.

  When you create a Connect Webview, specify the desired provider category key in the \`provider_category\` parameter. Alternately, to specify a list of providers explicitly, use the \`accepted_providers\` parameter with a list of device provider keys.

  To list all providers within a category, use \`/devices/list_device_providers\` with the desired \`provider_category\` filter. To list all provider keys, use \`/devices/list_device_providers\` with no filters.
`)

export type ConnectWebview = z.infer<typeof connect_webview>
