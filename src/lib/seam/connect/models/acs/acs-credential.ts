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
  is_encoded: z.boolean().optional(),
  encoded_at: z.string().datetime().optional().nullable(),
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

export type AcsCredential = z.output<typeof acs_credential>
export type UnmanagedAcsCredential = z.output<typeof unmanaged_acs_credential>
