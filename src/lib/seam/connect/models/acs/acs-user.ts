import { z } from 'zod'

import { phone_number } from '../phone-number.js'
import { schedule } from '../schedule.js'

export const acs_user_external_type = z.enum([
  'pti_user',
  'brivo_user',
  'hid_credential_manager_user',
  'salto_site_user',
  'latch_user',
])

export type AcsUserExternalType = z.infer<typeof acs_user_external_type>

const common_acs_user_error = z.object({
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

const acs_users_deleted_externally = common_acs_user_error
  .extend({
    error_code: z.literal('deleted_externally'),
  })
  .describe(
    `Indicates that the ACS user was deleted from the ACS system outside of Seam.`,
  )

const acs_users_salto_ks_subscription_limit_exceeded = common_acs_user_error
  .extend({
    error_code: z.literal('salto_ks_subscription_limit_exceeded'),
  })
  .describe(
    `Indicates that the user could not be subscribed on Salto KS because the subscription limit has been exceeded.`,
  )

const acs_users_failed_to_create_on_acs_system = common_acs_user_error
  .extend({
    error_code: z.literal('failed_to_create_on_acs_system'),
  })
  .describe(
    `Indicates that the user was not created on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.`,
  )

const acs_users_failed_to_update_on_acs_system = common_acs_user_error
  .extend({
    error_code: z.literal('failed_to_update_on_acs_system'),
  })
  .describe(
    `Indicates that the user was not updated on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.`,
  )

const acs_users_failed_to_delete_on_acs_system = common_acs_user_error
  .extend({
    error_code: z.literal('failed_to_delete_on_acs_system'),
  })
  .describe(
    `Indicates that the user was not deleted on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.`,
  )

const acs_user_errors = z
  .union([
    acs_users_deleted_externally,
    acs_users_salto_ks_subscription_limit_exceeded,
    acs_users_failed_to_create_on_acs_system,
    acs_users_failed_to_update_on_acs_system,
    acs_users_failed_to_delete_on_acs_system,
  ])
  .describe('Error associated with the `acs_user`.')

export const acs_users_error_map = z.object({
  deleted_externally: acs_users_deleted_externally.optional().nullable(),
  salto_ks_subscription_limit_exceeded:
    acs_users_salto_ks_subscription_limit_exceeded.optional().nullable(),
  failed_to_create_on_acs_system: acs_users_failed_to_create_on_acs_system
    .optional()
    .nullable(),
  failed_to_update_on_acs_system: acs_users_failed_to_update_on_acs_system
    .optional()
    .nullable(),
  failed_to_delete_on_acs_system: acs_users_failed_to_delete_on_acs_system
    .optional()
    .nullable(),
})

export type AcsUsersErrorMap = z.infer<typeof acs_users_error_map>

const common_acs_user_warning = z.object({
  created_at: z.string().datetime(),
  message: z.string(),
})

const acs_users_being_deleted = common_acs_user_warning
  .extend({
    warning_code: z.literal('being_deleted'),
  })
  .describe(
    `Indicates that the user is being deleted from the ACS system. This is a temporary state, and the user will be deleted shortly.`,
  )

const acs_users_salto_ks_user_not_subscribed = common_acs_user_warning
  .extend({
    warning_code: z.literal('salto_ks_user_not_subscribed'),
  })
  .describe(
    `Indicates that the user is not subscribed on the Salto KS, so they cannot unlock doors or perform any actions. This occur when the their access schedule hasn’t started yet, or if their access schedule has ended, or if the site has reached its limit for active users (subscription slots), or if they have been manually unsubscribed.`,
  )

export const acs_users_warning_map = z.object({
  being_deleted: acs_users_being_deleted.optional().nullable(),
  salto_ks_user_not_subscribed: acs_users_salto_ks_user_not_subscribed
    .optional()
    .nullable(),
})

export const acs_users_warnings = z
  .union([acs_users_being_deleted, acs_users_salto_ks_user_not_subscribed])
  .describe('Warning associated with the `acs_user`.')

export type AcsUsersWarningMap = z.infer<typeof acs_users_warning_map>

const user_fields = z.object({
  full_name: z.string().optional().describe('Full name of the `acs_user`.'),
  email: z.string().email().optional().describe(`
    ---
    deprecated: use email_address.
    ---
    `),
  email_address: z
    .string()
    .email()
    .optional()
    .describe('Email address of the `acs_user`.'),
  phone_number: phone_number
    .optional()
    .describe(
      'Phone number of the `acs_user` in E.164 format (for example, `+15555550100`).',
    ),
})

const common_acs_user = z
  .object({
    acs_user_id: z.string().uuid().describe('ID of the `acs_user`.'),
    acs_system_id: z
      .string()
      .uuid()
      .describe(
        'ID of the access control system that contains the `acs_user`.',
      ),
    hid_acs_system_id: z.string().uuid().optional(),
    workspace_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the `acs_user`.',
      ),
    created_at: z
      .string()
      .datetime()
      .describe('Date and time at which the `acs_user` was created.'),
    display_name: z.string().describe('Display name for the `acs_user`.'),
    external_type: acs_user_external_type
      .optional()
      .describe('Brand-specific terminology for the `acs_user` type.'),
    external_type_display_name: z
      .string()
      .optional()
      .describe(
        'Display name that corresponds to the brand-specific terminology for the `acs_user` type.',
      ),
    is_suspended: z
      .boolean()
      .describe(
        'Indicates whether the `acs_user` is currently [suspended](https://docs.seam.co/latest/capability-guides/access-systems/user-management/suspending-and-unsuspending-users).',
      ),
    access_schedule: schedule
      .optional()
      .describe(
        "`starts_at` and `ends_at` timestamps for the `acs_user`'s access.",
      ),
    user_identity_id: z
      .string()
      .optional()
      .describe('ID of the user identity associated with the `acs_user`.'),
    user_identity_full_name: z
      .string()
      .nullable()
      .optional()
      .describe(
        'Full name of the user identity associated with the `acs_user`.',
      ),
    user_identity_email_address: z
      .string()
      .nullable()
      .optional()
      .describe(
        'Email address of the user identity associated with the `acs_user`.',
      ),
    user_identity_phone_number: z
      .string()
      .nullable()
      .optional()
      .describe(
        'Phone number of the user identity associated with the `acs_user` in E.164 format (for example, `+15555550100`).',
      ),
    latest_desired_state_synced_with_provider_at: z
      .string()
      .datetime()
      .optional().describe(`
      ---
      undocumented: Only used internally.
      ---
      `),
    is_latest_desired_state_synced_with_provider: z.boolean().optional()
      .describe(`
      ---
      undocumented: Only used internally.
      ---
      `),
    warnings: z
      .array(acs_users_warnings)
      .describe('Warnings associated with the `acs_user`.'),
    errors: z
      .array(acs_user_errors)
      .describe('Errors associated with the `acs_user`.'),
  })
  .merge(user_fields)

export const acs_user = common_acs_user.merge(
  z.object({
    is_managed: z.literal(true),
  }),
)

export const unmanaged_acs_user = common_acs_user.merge(
  z.object({
    is_managed: z.literal(false),
  }),
)

export type AcsUser = z.output<typeof acs_user>
export type AcsUnmanagedUser = z.output<typeof unmanaged_acs_user>
