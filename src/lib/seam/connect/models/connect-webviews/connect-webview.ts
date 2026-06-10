import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'
import { provider_capability } from '../provider-capability.js'

export const connect_webview_device_selection_mode = z.enum([
  'none',
  'single',
  'multiple',
])

export const connect_webview = z.object({
  connect_webview_id: z.string().uuid().describe('ID of the Connect Webview.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the Connect Webview.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the Connect Webview was created.'),
  connected_account_id: z
    .string()
    .uuid()
    .nullable()
    .describe(
      'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) associated with the Connect Webview.',
    ),
  url: z
    .string()
    .url()
    .describe(
      'URL for the Connect Webview. You use the URL to display the Connect Webview flow to your user.',
    ),
  device_selection_mode: connect_webview_device_selection_mode,

  // TODO: Use enum value.
  accepted_providers: z
    .array(z.string())
    .describe(
      'List of accepted [provider keys](https://docs.seam.co/latest/core-concepts/connect-webviews/customizing-connect-webviews#customize-the-brands-to-display-in-your-connect-webviews).',
    ),

  accepted_capabilities: z
    .array(provider_capability)
    .describe(
      'High-level device capabilities that the Connect Webview can accept. When creating a Connect Webview, you can specify the types of devices that it can connect to Seam. If you do not set custom `accepted_capabilities`, Seam uses a default set of `accepted_capabilities` for each provider. For example, if you create a Connect Webview that accepts SmartThing devices, without specifying `accepted_capabilities`, Seam accepts only SmartThings locks. To connect SmartThings thermostats and locks to Seam, create a Connect Webview and include both `thermostat` and `lock` in the `accepted_capabilities`.',
    ),

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

  any_provider_allowed: z
    .boolean()
    .describe('Indicates whether any provider is allowed.'),
  login_successful: z
    .boolean()
    .describe(
      'Indicates whether the user logged in successfully using the Connect Webview.',
    ),
  status: z
    .enum(['pending', 'failed', 'authorized'])
    .describe(
      'Status of the Connect Webview. `authorized` indicates that the user has successfully logged into their device or system account, thereby completing the Connect Webview.',
    ),
  custom_redirect_url: z
    .string()
    .url()
    .nullable()
    .describe(
      'URL to which the Connect Webview should redirect when the user successfully pairs a device or system. If you do not set the `custom_redirect_failure_url`, the Connect Webview redirects to the `custom_redirect_url` when an unexpected error occurs.',
    ),
  custom_redirect_failure_url: z
    .string()
    .url()
    .nullable()
    .describe(
      'URL to which the Connect Webview should redirect when an unexpected error occurs.',
    ),
  custom_metadata,
  automatically_manage_new_devices: z
    .boolean()
    .describe(
      'Indicates whether Seam should [import all new devices](https://docs.seam.co/latest/core-concepts/connect-webviews/customizing-connect-webviews#automatically_manage_new_devices) for the connected account to make these devices available for use and management by the Seam API.',
    ),
  wait_for_device_creation: z
    .boolean()
    .describe(
      'Indicates whether Seam should [finish syncing all devices](https://docs.seam.co/latest/core-concepts/connect-webviews/customizing-connect-webviews#wait_for_device_creation) in a newly-connected account before completing the associated Connect Webview.',
    ),
  authorized_at: z
    .string()
    .datetime()
    .nullable()
    .describe(
      'Date and time at which the user authorized (through the Connect Webview) the management of their devices.',
    ),
  selected_provider: z
    .string()
    .nullable()
    .describe(
      'Selected provider of the Connect Webview, one of the [provider keys](https://docs.seam.co/latest/core-concepts/connect-webviews/customizing-connect-webviews#customize-the-brands-to-display-in-your-connect-webviews).',
    ),
  customer_key: z
    .string()
    .optional()
    .describe('The customer key associated with this webview, if any.'),
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
