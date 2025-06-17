import { z } from 'zod'

export const access_method = z.object({
  workspace_id: z
    .string()
    .uuid()
    .describe('ID of the Seam workspace associated with the access method.'),
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
    .optional()
    .describe('Date and time at which the access method was issued.'),
  instant_key_url: z
    .string()
    .optional()
    .describe('URL of the Instant Key for mobile key access methods.'),
  is_card_encoding_required: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether card encoding is required for plastic card access methods.',
    ),
}).describe(`
  ---
  draft: Early access.
  route_path: /access_methods
  ---
  Represents an access method for an access grant. Access methods describe the modes of access, such as PIN codes, plastic cards, and mobile keys. For a mobile key, the access method also stores the URL for the associated Instant Key.
  `)

export type AccessMethod = z.infer<typeof access_method>
