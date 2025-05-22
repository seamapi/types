import { z } from 'zod'

import { phone_number } from '../phone-number.js'

export const user_identity = z.object({
  user_identity_id: z.string().uuid().describe('ID of the user identity.'),
  user_identity_key: z
    .string()
    .min(1)
    .nullable()
    .describe('Unique key for the user identity.'),
  email_address: z
    .string()
    .email()
    .nullable()
    .describe('Unique email address for the user identity.'),
  phone_number: phone_number
    .nullable()
    .describe(
      'Unique phone number for the user identity in [E.164 format](https://www.itu.int/rec/T-REC-E.164/en) (for example, +15555550100).',
    ),
  display_name: z.string().min(1),
  full_name: z.string().min(1).nullable(),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the user identity was created.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the user identity.',
    ),
}).describe(`
  ---
  route_path: /user_identities
  ---
  Represents a [user identity](https://docs.seam.co/latest/capability-guides/mobile-access/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity) associated with an application user account.
`)

export type UserIdentity = z.output<typeof user_identity>
