import { z } from 'zod'

import { requested_access_method } from './requested-access-method.js'

export const access_grant = z.object({
  workspace_id: z
    .string()
    .uuid()
    .describe('ID of the Seam workspace associated with the Access Grant.'),
  access_grant_id: z.string().uuid().describe('ID of the Access Grant.'),
  user_identity_id: z
    .string()
    .uuid()
    .describe('ID of user identity to which the Access Grant gives access.'),
  location_ids: z.array(z.string().uuid()).describe(`
    ---
    deprecated: Use \`space_ids\`.
    ---
  `),
  space_ids: z
    .array(z.string().uuid())
    .describe('IDs of the spaces to which the Access Grant gives access.'),
  requested_access_methods: z
    .array(requested_access_method)
    .describe('Access methods that the user requested for the Access Grant.'),
  access_method_ids: z
    .array(z.string().uuid())
    .describe('IDs of the access methods created for the Access Grant.'),
  display_name: z.string().describe('Display name of the Access Grant.'),
  instant_key_url: z
    .string()
    .url()
    .optional()
    .describe(
      'Instant Key URL. Only returned if the Access Grant has a single mobile_key access_method. ',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the Access Grant was created.'),
  starts_at: z
    .string()
    .datetime()
    .optional()
    .describe('Date and time at which the Access Grant starts.'),
  ends_at: z
    .string()
    .datetime()
    .optional()
    .describe('Date and time at which the Access Grant ends.'),
}).describe(`
  ---
  draft: Early access.
  route_path: /access_grants
  ---
  Represents an Access Grant. Access Grants enable you to grant a user identity access to spaces, entrances, and devices through one or more access methods, such as mobile keys, plastic cards, and PIN codes. You can create an Access Grant for an existing user identity, or you can create a new user identity *while* creating the new Access Grant.
  `)

export type AccessGrant = z.infer<typeof access_grant>
