import { z } from 'zod'

export const acs_credential_external_type = z.enum([
  'pti_card',
  'brivo_credential',
  'hid_credential',
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
  actual_code: z.string().nullable(),
  desired_code: z.string().nullable(),
  external_type: acs_credential_external_type,
  external_type_display_name: z.string(),
  created_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
})

export type AcsCredential = z.output<typeof acs_credential>
