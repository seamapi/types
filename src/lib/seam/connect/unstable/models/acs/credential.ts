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

export const acs_credential = z.object({
  acs_credential_id: z.string().uuid(),
  acs_user_id: z.string().uuid().optional(),
  acs_credential_pool_id: z.string().uuid().optional(),
  acs_system_id: z.string().uuid(),
  display_name: z.string().nonempty(),
  code: z.string().optional().nullable(),
  access_method: acs_credential_access_method_type,
  external_type: acs_credential_external_type.optional(),
  external_type_display_name: z.string().optional(),
  created_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
  starts_at: z.string().optional(),
  ends_at: z.string().optional(),
})

export type AcsCredential = z.output<typeof acs_credential>
