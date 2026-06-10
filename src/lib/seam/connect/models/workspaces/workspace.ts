import { z } from 'zod'

import { hex_color_code } from '../colors.js'

export const workspace = z.object({
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
    ),
  name: z
    .string()
    .describe(
      'Name of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
    ),
  company_name: z
    .string()
    .describe(
      'Company name associated with the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
    ),
  is_sandbox: z
    .boolean()
    .describe(
      'Indicates whether the workspace is a [sandbox workspace](https://docs.seam.co/latest/core-concepts/workspaces#sandbox-workspaces).',
    ),
  connect_webview_customization: z.object({
    primary_button_color: hex_color_code
      .optional()
      .describe(
        'Primary button color for [Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews) in the workspace. See also [Customize the Look and Feel of Your Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews/customizing-connect-webviews#customize-the-look-and-feel-of-your-connect-webviews).',
      ),
    primary_button_text_color: hex_color_code
      .optional()
      .describe(
        'Primary button text color for [Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews) in the workspace. See also [Customize the Look and Feel of Your Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews/customizing-connect-webviews#customize-the-look-and-feel-of-your-connect-webviews).',
      ),
    success_message: z
      .string()
      .optional()
      .describe(
        'Success message for [Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews) in the workspace. See also [Customize the Look and Feel of Your Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews/customizing-connect-webviews#customize-the-look-and-feel-of-your-connect-webviews).',
      ),
    logo_shape: z
      .enum(['circle', 'square'])
      .optional()
      .describe(
        'Logo shape for [Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews) in the workspace. See also [Customize the Look and Feel of Your Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews/customizing-connect-webviews#customize-the-look-and-feel-of-your-connect-webviews).',
      ),
    inviter_logo_url: z
      .string()
      .optional()
      .describe(
        'URL of the inviter logo for [Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews) in the workspace. See also [Customize the Look and Feel of Your Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews/customizing-connect-webviews#customize-the-look-and-feel-of-your-connect-webviews).',
      ),
  }),
  is_suspended: z
    .boolean()
    .describe(
      'Indicates whether the [sandbox workspace](https://docs.seam.co/latest/core-concepts/workspaces#sandbox-workspaces) is suspended. Seam suspends sandbox workspaces that have not been accessed in 14 days.',
    ),
  connect_partner_name: z
    .string()
    .nullable()
    .describe(
      `
    ---
    deprecated: Use \`company_name\` instead.
    ---
  `,
    )
    .nullable(),
  publishable_key: z
    .string()
    .optional()
    .describe(
      'Publishable key for the [workspace](https://docs.seam.co/latest/core-concepts/workspaces). This key is used to identify the workspace in client-side applications.',
    ),
  is_publishable_key_auth_enabled: z
    .boolean()
    .describe(
      'Indicates whether publishable key authentication is enabled for this workspace.',
    ),
}).describe(`
  ---
  route_path: /workspaces
  ---
  Represents a Seam [workspace](https://docs.seam.co/latest/core-concepts/workspaces). A workspace is a top-level entity that encompasses all other resources below it, such as devices, connected accounts, and Connect Webviews. Seam provides two types of workspaces. A [sandbox workspace](https://docs.seam.co/latest/core-concepts/workspaces#sandbox-workspaces) is a special type of workspace designed for testing code. Sandbox workspaces offer test device accounts and virtual devices that you can connect and control. This ability to work with virtual devices is quite handy because it removes the need to own physical devices from multiple brands. To connect real devices and systems to Seam, use a [production workspace](https://docs.seam.co/latest/core-concepts/workspaces#production-workspaces).
`)

export type Workspace = z.infer<typeof workspace>
