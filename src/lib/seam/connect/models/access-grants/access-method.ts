import { z } from 'zod'

export const access_method = z.object({
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'Unique identifier for the Seam workspace associated with the access grant.',
    ),
  access_method_id: z.string().uuid().describe('ID of the access method.'),
  display_name: z.string().describe('Display name of the access method.'),
  mode: z
    .enum(['code', 'card', 'mobile_key'])
    .describe(
      'Access method mode. Supported values: `code`, `card`, `mobile_key`.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the access method was created.'),
  issued_at: z
    .string()
    .datetime()
    .nullable()
    .describe('Date and time at which the access method was issued.'),
  instant_key_url: z
    .string()
    .optional()
    .describe('URL of instant key for mobile key access methods.'),
}).describe(`
  ---
  undocumented: Unreleased.
  ---
  `)

export type AccessMethod = z.infer<typeof access_method>
