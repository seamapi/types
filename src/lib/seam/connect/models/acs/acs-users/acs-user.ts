import { z } from 'zod'

import { phone_number } from '../../phone-number.js'
import { schedule } from '../../schedule.js'
import { acs_user_salto_space_metadata } from '../metadata/salto-space.js'
import { acs_user_pending_mutations } from './pending-mutations.js'

export const acs_user_external_type = z.enum([
  'pti_user',
  'brivo_user',
  'hid_credential_manager_user',
  'salto_site_user',
  'latch_user',
  'dormakaba_community_user',
  'salto_space_user',
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
    `Indicates that the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) was deleted from the [access system](https://docs.seam.co/latest/capability-guides/access-systems) outside of Seam.`,
  )

const acs_users_salto_ks_subscription_limit_exceeded = common_acs_user_error
  .extend({
    error_code: z.literal('salto_ks_subscription_limit_exceeded'),
  })
  .describe(
    `Indicates that the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) could not be subscribed on Salto KS because the subscription limit has been exceeded.`,
  )

const acs_users_failed_to_create_on_acs_system = common_acs_user_error
  .extend({
    error_code: z.literal('failed_to_create_on_acs_system'),
  })
  .describe(
    `Indicates that the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) was not created on the [access system](https://docs.seam.co/latest/capability-guides/access-systems). This is likely due to an internal unexpected error. Contact Seam [support](mailto:support@seam.co).`,
  )

const acs_users_failed_to_update_on_acs_system = common_acs_user_error
  .extend({
    error_code: z.literal('failed_to_update_on_acs_system'),
  })
  .describe(
    `Indicates that the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) was not updated on the [access system](https://docs.seam.co/latest/capability-guides/access-systems). This is likely due to an internal unexpected error. Contact Seam [support](mailto:support@seam.co).`,
  )

const acs_users_failed_to_delete_on_acs_system = common_acs_user_error
  .extend({
    error_code: z.literal('failed_to_delete_on_acs_system'),
  })
  .describe(
    `Indicates that the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) was not deleted on the [access system](https://docs.seam.co/latest/capability-guides/access-systems). This is likely due to an internal unexpected error. Contact Seam [support](mailto:support@seam.co).`,
  )

const acs_users_latch_conflict_with_resident_user = common_acs_user_error
  .extend({
    error_code: z.literal('latch_conflict_with_resident_user'),
  })
  .describe(
    `Indicates that the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) was created from the Seam API but also exists on Mission Control. This is unsupported. Contact Seam [support](mailto:support@seam.co).`,
  )

const acs_user_errors = z
  .discriminatedUnion('error_code', [
    acs_users_deleted_externally,
    acs_users_salto_ks_subscription_limit_exceeded,
    acs_users_failed_to_create_on_acs_system,
    acs_users_failed_to_update_on_acs_system,
    acs_users_failed_to_delete_on_acs_system,
    acs_users_latch_conflict_with_resident_user,
  ])
  .describe(
    'Errors associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
  )

const _acs_users_error_map = z.object({
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
  latch_conflict_with_resident_user: acs_users_latch_conflict_with_resident_user
    .optional()
    .nullable(),
})

export type AcsUsersErrorMap = z.infer<typeof _acs_users_error_map>

const common_acs_user_warning = z.object({
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

const acs_users_being_deleted = common_acs_user_warning
  .extend({
    warning_code: z.literal('being_deleted'),
  })
  .describe(
    'Indicates that the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) is being deleted from the [access system](https://docs.seam.co/latest/capability-guides/access-systems). This is a temporary state, and the access system user will be deleted shortly.',
  )

const acs_users_salto_ks_user_not_subscribed = common_acs_user_warning
  .extend({
    warning_code: z.literal('salto_ks_user_not_subscribed'),
  })
  .describe(
    'Indicates that the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) is not subscribed on Salto KS, so they cannot unlock doors or perform any actions. This occurs when the their access schedule hasn’t started yet, if their access schedule has ended, if the site has reached its limit for active users (subscription slots), or if they have been manually unsubscribed.',
  )

export const unknown_issue_with_acs_user = common_acs_user_warning
  .extend({
    warning_code: z.literal('unknown_issue_with_acs_user'),
  })
  .describe(
    'An unknown issue occurred while syncing the state of this [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) with the provider. This issue may affect the proper functioning of this user.',
  )

export const latch_resident_user = common_acs_user_warning
  .extend({
    warning_code: z.literal('latch_resident_user'),
  })
  .describe(
    'Indicates that the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) was created on Latch Mission Control. Please use the Latch Mission Control to manage this user.',
  )

const _acs_users_warning_map = z.object({
  being_deleted: acs_users_being_deleted.optional().nullable(),
  salto_ks_user_not_subscribed: acs_users_salto_ks_user_not_subscribed
    .optional()
    .nullable(),
  unknown_issue_with_acs_user: unknown_issue_with_acs_user
    .optional()
    .nullable(),
  latch_resident_user: latch_resident_user.optional().nullable(),
})

export const acs_users_warnings = z
  .discriminatedUnion('warning_code', [
    acs_users_being_deleted,
    acs_users_salto_ks_user_not_subscribed,
    unknown_issue_with_acs_user,
    latch_resident_user,
  ])
  .describe(
    'Warnings associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
  )

export type AcsUsersWarningMap = z.infer<typeof _acs_users_warning_map>

const user_fields = z.object({
  full_name: z
    .string()
    .trim()
    .min(1)
    .optional()
    .describe(
      'Full name of the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
    ),
  email: z.string().email().optional().describe(`
    ---
    deprecated: use email_address.
    ---
    `),
  email_address: z
    .string()
    .email()
    .optional()
    .describe(
      'Email address of the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
    ),
  phone_number: phone_number
    .optional()
    .describe(
      'Phone number of the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) in E.164 format (for example, `+15555550100`).',
    ),
})

const common_acs_user = z
  .object({
    acs_user_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
      ),
    acs_system_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [access system](https://docs.seam.co/latest/capability-guides/access-systems) that contains the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
      ),
    hid_acs_system_id: z.string().uuid().optional(),
    workspace_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
      ),
    created_at: z
      .string()
      .datetime()
      .describe(
        'Date and time at which the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) was created.',
      ),
    display_name: z
      .string()
      .describe(
        'Display name for the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
      ),
    external_type: acs_user_external_type
      .optional()
      .describe(
        'Brand-specific terminology for the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) type.',
      ),
    external_type_display_name: z
      .string()
      .optional()
      .describe(
        'Display name that corresponds to the brand-specific terminology for the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) type.',
      ),
    is_suspended: z
      .boolean()
      .optional()
      .describe(
        'Indicates whether the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) is currently [suspended](https://docs.seam.co/latest/capability-guides/access-systems/user-management/suspending-and-unsuspending-users).',
      ),
    access_schedule: schedule
      .optional()
      .describe(
        "`starts_at` and `ends_at` timestamps for the [access system user's](https://docs.seam.co/latest/capability-guides/access-systems/user-management) access.",
      ),
    user_identity_id: z
      .string()
      .optional()
      .describe(
        'ID of the user identity associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
      ),
    user_identity_full_name: z
      .string()
      .nullable()
      .optional()
      .describe(
        'Full name of the user identity associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
      ),
    user_identity_email_address: z
      .string()
      .nullable()
      .optional()
      .describe(
        'Email address of the user identity associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
      ),
    user_identity_phone_number: z
      .string()
      .nullable()
      .optional()
      .describe(
        'Phone number of the user identity associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) in E.164 format (for example, `+15555550100`).',
      ),
    warnings: z
      .array(acs_users_warnings)
      .describe(
        'Warnings associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
      ),
    errors: z
      .array(acs_user_errors)
      .describe(
        'Errors associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
      ),
    pending_mutations: z
      .array(acs_user_pending_mutations)
      .optional()
      .describe(
        'Pending mutations associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management). Seam is in the process of pushing these mutations to the integrated access system.',
      ),
    last_successful_sync_at: z.string().datetime().nullable().describe(`
        ---
        undocumented: Only used internally.
        ---
        The last time an internal sync job completed for this access system user.
      `),
    connected_account_id: z.string().uuid().describe(`
      The ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) that is associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).
    `),
    salto_space_metadata: acs_user_salto_space_metadata
      .optional()
      .describe(
        'Salto Space-specific metadata associated with the [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
      ),
  })
  .merge(user_fields)

export const acs_user = common_acs_user.merge(
  z.object({
    is_managed: z.literal(true),
  }),
).describe(`
  ---
  route_path: /acs/users
  ---
  Represents a [user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) in an [access system](https://docs.seam.co/latest/capability-guides/access-systems).

  An access system user typically refers to an individual who requires access, like an employee or resident. Each user can possess multiple credentials that serve as their keys or identifiers for access. The type of credential can vary widely. For example, in the Salto system, a user can have a PIN code, a mobile app account, and a fob. In other platforms, it is not uncommon for a user to have more than one of the same credential type, such as multiple key cards. Additionally, these credentials can have a schedule or validity period.

  For details about how to configure users in your access system, see the corresponding [system integration guide](https://docs.seam.co/latest/device-and-system-integration-guides/overview#access-control-systems).
`)

export const unmanaged_acs_user = common_acs_user.merge(
  z.object({
    is_managed: z.literal(false),
  }),
).describe(`
  ---
  route_path: /acs/users/unmanaged
  undocumented: Unreleased.
  ---
  Represents an unmanaged [user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) in an [access system](https://docs.seam.co/latest/capability-guides/access-systems).
`)

export type AcsUser = z.output<typeof acs_user>
export type AcsUnmanagedUser = z.output<typeof unmanaged_acs_user>
