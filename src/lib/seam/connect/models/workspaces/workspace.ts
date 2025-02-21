import { z } from 'zod'

export const workspace = z.object({
  workspace_id: z.string().uuid(),
  name: z.string(),
  company_name: z.string(),
  is_sandbox: z.boolean(),
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
