import { z } from 'zod'

import { requested_access_method } from './requested-access-method.js'

export const access_grant = z.object({
  workspace_id: z
    .string()
    .uuid()
    .describe('ID of the Seam workspace associated with the access grant.'),
  access_grant_id: z.string().uuid().describe('ID of the access grant.'),
  user_identity_id: z
    .string()
    .uuid()
    .describe('ID of user identity to which the access grant gives access.'),
  location_ids: z.array(z.string().uuid()).describe(`
    ---
    deprecated: Use \`space_ids\`.
    ---
  `),
  space_ids: z
    .array(z.string().uuid())
    .describe('IDs of the spaces to which the access grant gives access.'),
  requested_access_methods: z
    .array(requested_access_method)
    .describe('Access methods that the user requested for the access grant.'),
  access_method_ids: z
    .array(z.string().uuid())
    .describe('IDs of the access methods created for the access grant.'),
  display_name: z.string().describe('Display name of the access grant.'),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the access grant was created.'),
}).describe(`
  ---
  draft: Early access.
  route_path: /access_grants
  ---
  Represents an access grant. Access grants enable you to grant a user identity access to spaces, entrances, and devices through one or more access methods, such as mobile keys, plastic cards, and PIN codes. You can create an access grant for an existing user identity, or you can create a new user identity *while* creating the new access grant.
  `)

export type AccessGrant = z.infer<typeof access_grant>
