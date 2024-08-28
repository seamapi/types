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

const common_acs_users_warning = z.object({
  created_at: z.string().datetime(),
  message: z.string(),
})

const acs_users_being_deleted = common_acs_users_warning.extend({
  warning_code: z.literal('being_deleted'),
})

export const acs_users_warning_map = z.object({
  being_deleted: acs_users_being_deleted.optional().nullable(),
})

export const acs_users_warning =
  // TODO: once we have more than one warning we should use z.union
  // z.union([
  acs_users_being_deleted
// ])

export type AcsUsersWarningMap = z.infer<typeof acs_users_warning_map>

const user_fields = z.object({
  full_name: z.string().optional(),
  email: z.string().email().optional().describe(`
    ---
    deprecated: use email_address.
    ---
    `),
  email_address: z.string().email().optional(),
  phone_number: phone_number.optional(),
})

const common_acs_user = z
  .object({
    acs_user_id: z.string().uuid(),
    acs_system_id: z.string().uuid(),
    hid_acs_system_id: z.string().uuid().optional(),
    workspace_id: z.string().uuid(),
    created_at: z.string().datetime(),
    display_name: z.string(),
    external_type: acs_user_external_type.optional(),
    external_type_display_name: z.string().optional(),
    is_suspended: z.boolean(),
    access_schedule: schedule.optional(),
    user_identity_id: z.string().optional(),
    user_identity_full_name: z.string().nullable().optional(),
    user_identity_email_address: z.string().nullable().optional(),
    user_identity_phone_number: z.string().nullable().optional(),
    latest_desired_state_synced_with_provider_at: z
      .string()
      .datetime()
      .optional(),
    is_latest_desired_state_synced_with_provider: z.boolean().optional(),
    warnings: z.array(acs_users_warning),
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
