import { z } from 'zod'

export const acs_credential_pool_external_type = z.enum(['hid_part_number'])

export type AcsCredentialPoolExternalType = z.infer<
  typeof acs_credential_pool_external_type
>

export const acs_credential_pool = z.object({
  acs_credential_pool_id: z.string().uuid(),
  acs_system_id: z.string().uuid(),
  display_name: z.string().min(1),
  external_type: acs_credential_pool_external_type,
  external_type_display_name: z.string(),
  created_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
})

export type AcsCredentialPool = z.output<typeof acs_credential_pool>
