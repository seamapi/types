import { z } from 'zod'

import { hex_color_code } from '../colors.js'

export const workspace = z.object({
  workspace_id: z.string().uuid(),
  name: z.string(),
  company_name: z.string(),
  is_sandbox: z.boolean(),
  connect_webview_customization: z.object({
    primary_button_color: hex_color_code.optional(),
    primary_button_text_color: hex_color_code.optional(),
    success_message: z.string().optional(),
    logo_shape: z.enum(['circle', 'square']).optional(),
    inviter_logo_url: z.string().optional(),
  }),
  is_suspended: z
    .boolean()
    .describe('True if a sandbox workspace has not been accessed in 14 days'),
  connect_partner_name: z
    .string()
    .nullable()
    .describe(
      `
    ---
    deprecated: use company_name
    ---
  `,
    )
    .nullable(),
}).describe(`
  ---
  route_path: /workspaces
  ---
`)

export type Workspace = z.infer<typeof workspace>
