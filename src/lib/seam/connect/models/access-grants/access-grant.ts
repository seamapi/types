import { z } from 'zod'

import { access_method } from './access-method.js'

export const access_grant = z.object({
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'Unique identifier for the Seam workspace associated with the access grant.',
    ),
  access_grant_id: z.string().uuid().describe('ID of the access grant.'),
  user_identity_id: z
    .string()
    .uuid()
    .describe('ID of user identity to which access is being granted.'),
  location_ids: z
    .array(z.string().uuid())
    .describe('IDs of the locations to which access is being given.'),
  access_methods: z
    .array(access_method)
    .describe('Access methods associated with this access grant.'),
  display_name: z.string().describe('Display name of the access grant.'),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the access grant was created.'),
}).describe(`
  ---
  undocumented: Unreleased.
  ---
  `)

export type AccessGrant = z.infer<typeof access_grant>
