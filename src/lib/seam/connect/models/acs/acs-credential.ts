import { z } from 'zod'

import { acs_credential_visionline_metadata } from './metadata/index.js'

// If changed, update seam.acs_credential.external_type generated column
export const acs_credential_external_type = z.enum([
  'pti_card',
  'brivo_credential',
  'hid_credential',
  'visionline_card',
  'salto_ks_credential',
])

export const acs_credential_access_method_type = z.enum([
  'code',
  'card',
  'mobile_key',
])

export type AcsCredentialExternalType = z.infer<
  typeof acs_credential_external_type
>

const common_acs_credential = z.object({
  acs_credential_id: z.string().uuid(),
  acs_user_id: z.string().uuid().optional(),
  acs_credential_pool_id: z.string().uuid().optional(),
  acs_system_id: z.string().uuid(),
  parent_acs_credential_id: z.string().uuid().optional(),
  display_name: z.string().min(1),
  code: z.string().optional().nullable(),
  card_number: z.string().optional().nullable(),
  is_issued: z.boolean().optional(),
  issued_at: z.string().datetime().optional().nullable(),
  access_method: acs_credential_access_method_type,
  external_type: acs_credential_external_type.optional(),
  external_type_display_name: z.string().optional(),
  created_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
  starts_at: z.string().optional(),
  ends_at: z.string().optional(),
  errors: z.array(
    z.object({
      error_code: z.string(),
      message: z.string(),
    }),
  ),
  warnings: z.array(
    z.object({
      warning_code: z.string(),
      message: z.string(),
    }),
  ),
  is_multi_phone_sync_credential: z.boolean().optional(),
  is_latest_desired_state_synced_with_provider: z.boolean().optional(),
  latest_desired_state_synced_with_provider_at: z
    .string()
    .datetime()
    .optional(),
  visionline_metadata: acs_credential_visionline_metadata.optional(),
})

export const acs_credential = common_acs_credential.merge(
  z.object({
    is_managed: z.literal(true),
  }),
)

export const unmanaged_acs_credential = common_acs_credential.merge(
  z.object({
    is_managed: z.literal(false),
  }),
)

export const acs_credential_on_encoder = z.object({
  created_at: z
    .string()
    .datetime()
    .nullable()
    .describe('Date and time the credential was created.'),

  is_issued: z.boolean().nullable(),

  starts_at: z
    .string()
    .datetime()
    .nullable()
    .describe('Date and time the credential will become useable.'),
  ends_at: z
    .string()
    .datetime()
    .nullable()
    .describe('Date and time the credential will stop being useable.'),

  card_number: z
    .string()
    .nullable()
    .describe('A number or string that physically identifies this card.'),

  visionline_metadata: z
    .object({
      card_id: z.string(),
      card_function_type: z.enum(['guest', 'staff']), // computed, looks at door ops, and checks is guest op is present.

      cancelled: z.boolean(),
      discarded: z.boolean(),
      expired: z.boolean(),
      overwritten: z.boolean(),
      overridden: z.boolean().optional(),
      pending_auto_update: z.boolean(),

      card_format: z.enum(['TLCode', 'rfid48']),
      card_holder: z.string().optional(),

      number_of_issued_cards: z.number(),

      // guest_acs_entrance_ids: z.array(z.string().uuid()).optional(), // computed
      // common_acs_entrance_ids: z.array(z.string().uuid()).optional(), // computed
    })
    .optional(),
})

export type AcsCredential = z.output<typeof acs_credential>
export type UnmanagedAcsCredential = z.output<typeof unmanaged_acs_credential>
export type AcsCredentialOnEncoder = z.output<typeof acs_credential_on_encoder>
