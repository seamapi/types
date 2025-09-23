import { z } from 'zod'

import { phone_number } from '../phone-number.js'

const common_user_identity_error = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the error.'),
  message: z
    .string()
    .describe(
      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
    ),
})

const common_user_identity_warning = z.object({
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

const user_identity_being_deleted = common_user_identity_warning
  .extend({
    warning_code: z
      .literal('being_deleted')
      .describe(
        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
      ),
  })
  .describe('Indicates that the user identity is currently being deleted.')

const acs_user_profile_does_not_match_user_identity =
  common_user_identity_warning
    .extend({
      warning_code: z
        .literal('acs_user_profile_does_not_match_user_identity')
        .describe(
          'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
        ),
    })
    .describe(
      "Indicates that the ACS user's profile does not match the user identity's profile",
    )

const user_identity_issue_with_acs_user = common_user_identity_error
  .extend({
    error_code: z
      .literal('issue_with_acs_user')
      .describe(
        'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.',
      ),
    acs_user_id: z
      .string()
      .uuid()
      .describe('ID of the access system user that has an issue.'),
    acs_system_id: z
      .string()
      .uuid()
      .describe(
        'ID of the access system that the user identity is associated with.',
      ),
  })
  .describe(
    'Indicates that there is an issue with an access system user associated with this user identity.',
  )

const _user_identity_error_map = z.object({
  issue_with_acs_user: z
    .record(z.string().uuid(), user_identity_issue_with_acs_user)
    .optional()
    .nullable()
    .describe(
      'Map of access system user IDs to issues with the access system user. The key is the access system user ID, and the value is the issue with the access system user.',
    ),
})

export type UserIdentityErrorMap = z.infer<typeof _user_identity_error_map>

const user_identity_warnings = z
  .discriminatedUnion('warning_code', [
    user_identity_being_deleted,
    acs_user_profile_does_not_match_user_identity,
  ])
  .describe('Warnings associated with the user identity.')

const _user_identity_warning_map = z.object({
  user_identity_being_deleted: user_identity_being_deleted
    .optional()
    .nullable(),
  acs_user_profile_does_not_match_user_identity:
    acs_user_profile_does_not_match_user_identity.optional().nullable(),
})

export type UserIdentityWarningMap = z.infer<typeof _user_identity_warning_map>

const user_identity_errors = z
  .discriminatedUnion('error_code', [user_identity_issue_with_acs_user])
  .describe('Errors associated with the user identity.')

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
  errors: z
    .array(user_identity_errors)
    .describe(
      'Array of errors associated with the user identity. Each error object within the array contains fields like "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.',
    ),
  warnings: z
    .array(user_identity_warnings)
    .describe(
      'Array of warnings associated with the user identity. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it.',
    ),
  acs_user_ids: z
    .array(z.string().uuid())
    .describe(
      'Array of access system user IDs associated with the user identity.',
    ),
}).describe(`
  ---
  route_path: /user_identities
  ---
  Represents a [user identity](https://docs.seam.co/latest/capability-guides/mobile-access/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity) associated with an application user account.
`)

export type UserIdentity = z.output<typeof user_identity>

// Unmanaged user identity schema - excludes keys since unmanaged user identities cannot have keys
export const unmanaged_user_identity = user_identity.omit({
  user_identity_key: true,
}).describe(`
  ---
  draft: Early access.
  route_path: /user_identities/unmanaged
  ---
  Represents an unmanaged user identity. Unmanaged user identities do not have keys.
  `)

export type UnmanagedUserIdentity = z.output<typeof unmanaged_user_identity>
