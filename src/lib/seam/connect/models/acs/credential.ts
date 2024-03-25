import { z } from 'zod'

// If changed, update seam.acs_credential.external_type generated column
export const acs_credential_external_type = z.enum([
  'pti_card',
  'brivo_credential',
  'hid_credential',
  'visionline_card',
])

export const acs_credential_access_method_type = z.enum([
  'code',
  'card',
  'mobile_key',
])

export type AcsCredentialExternalType = z.infer<
  typeof acs_credential_external_type
>

export const acs_credential_visionline_metadata = z.object({
  joiner_acs_credential_ids: z.array(z.string().uuid()).optional(),
  guest_acs_entrance_ids: z.array(z.string().uuid()).optional(),
  common_acs_entrance_ids: z.array(z.string().uuid()).optional(),
})

export type AcsCredentialVisionlineMetadata = z.infer<
  typeof acs_credential_visionline_metadata
>

export const acs_credential = z.object({
  acs_credential_id: z.string().uuid(),
  acs_user_id: z.string().uuid().optional(),
  acs_credential_pool_id: z.string().uuid().optional(),
  acs_system_id: z.string().uuid(),
  parent_acs_credential_id: z.string().uuid().optional(),
  display_name: z.string().min(1),
  code: z.string().optional().nullable(),
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
  visionline_metadata: acs_credential_visionline_metadata.optional(),
})

export type AcsCredential = z.output<typeof acs_credential>
