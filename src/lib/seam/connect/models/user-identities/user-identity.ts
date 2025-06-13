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

export const user_identity_error_map = z.object({})

export type UserIdentityErrorMap = z.infer<typeof user_identity_error_map>

const user_identity_warnings = z
  .discriminatedUnion('warning_code', [user_identity_being_deleted])
  .describe('Warnings associated with the user identity.')

export const user_identity_warning_map = z.object({
  user_identity_being_deleted: user_identity_being_deleted
    .optional()
    .nullable(),
})

export type UserIdentityWarningMap = z.infer<typeof user_identity_warning_map>

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
    .array(common_user_identity_error)
    .describe(
      'Array of errors associated with the user identity. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.',
    ),
  warnings: z
    .array(user_identity_warnings)
    .describe(
      'Array of warnings associated with the user identity. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it.',
    ),
}).describe(`
  ---
  route_path: /user_identities
  ---
  Represents a [user identity](https://docs.seam.co/latest/capability-guides/mobile-access/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity) associated with an application user account.
`)

export type UserIdentity = z.output<typeof user_identity>
