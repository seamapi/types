import { z } from 'zod'

import { requested_access_method } from './requested-access-method.js'

const common_access_grant_warning = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the warning.'),
  message: z
    .string()
    .describe(
      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
    ),
})

const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const being_deleted = common_access_grant_warning
  .extend({
    warning_code: z.literal('being_deleted').describe(warning_code_description),
  })
  .describe(
    'Indicates that the [access grant](https://docs.seam.co/latest/capability-guides/access-grants) is being deleted.',
  )

const access_grant_warning = z
  .discriminatedUnion('warning_code', [being_deleted])
  .describe(
    'Warning associated with the [access grant](https://docs.seam.co/latest/capability-guides/access-grants).',
  )

const _access_grant_warning_map = z.object({
  being_deleted: being_deleted.optional().nullable(),
})

export type AccessGrantWarningMap = z.infer<typeof _access_grant_warning_map>

export const access_grant = z.object({
  workspace_id: z
    .string()
    .uuid()
    .describe('ID of the Seam workspace associated with the Access Grant.'),
  access_grant_id: z.string().uuid().describe('ID of the Access Grant.'),
  access_grant_key: z
    .string()
    .optional()
    .describe('Unique key for the access grant within the workspace.'),
  reservation_key: z
    .string()
    .optional()
    .describe('Reservation key for the access grant.'),
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
  client_session_token: z
    .string()
    .optional()
    .describe(
      'Client Session Token. Only returned if the Access Grant has a mobile_key access method.',
    ),
  name: z
    .string()
    .nullable()
    .describe(
      'Name of the Access Grant. If not provided, the display name will be computed.',
    ),
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
    .describe('Date and time at which the Access Grant starts.'),
  ends_at: z
    .string()
    .datetime()
    .nullable()
    .describe('Date and time at which the Access Grant ends.'),
  warnings: z
    .array(access_grant_warning)
    .describe(
      'Warnings associated with the [access grant](https://docs.seam.co/latest/capability-guides/access-grants).',
    ),
  customization_profile_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the customization profile associated with the Access Grant.',
    ),
}).describe(`
  ---
  draft: Early access.
  route_path: /access_grants
  ---
  Represents an Access Grant. Access Grants enable you to grant a user identity access to spaces, entrances, and devices through one or more access methods, such as mobile keys, plastic cards, and PIN codes. You can create an Access Grant for an existing user identity, or you can create a new user identity *while* creating the new Access Grant.
  `)

export type AccessGrant = z.infer<typeof access_grant>

// Unmanaged access grant schema - excludes client sessions, instant keys, customization profiles, and keys
export const unmanaged_access_grant = access_grant.omit({
  client_session_token: true,
  instant_key_url: true,
  customization_profile_id: true,
  access_grant_key: true,
}).describe(`
  ---
  draft: Early access.
  route_path: /access_grants/unmanaged
  ---
  Represents an unmanaged Access Grant. Unmanaged Access Grants do not have client sessions, instant keys, customization profiles, or keys.
  `)

export type UnmanagedAccessGrant = z.infer<typeof unmanaged_access_grant>
