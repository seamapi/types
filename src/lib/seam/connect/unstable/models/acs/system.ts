import { z } from 'zod'

// If changed, update seam.acs_system.external_type generated column
export const acs_system_external_type = z.enum([
  'pti_site',
  'alta_org',
  'salto_site',
  'brivo_account',
  'hid_credential_manager_organization',
  'visionline_system',
  'assa_abloy_credential_service',
])

export type AcsSystemExternalType = z.infer<typeof acs_system_external_type>

export const acs_system = z.object({
  acs_system_id: z.string().uuid(),
  external_type: acs_system_external_type,
  external_type_display_name: z.string(),
  system_type: acs_system_external_type.describe(
    'deprecated: use external_type',
  ),
  system_type_display_name: z
    .string()
    .describe('deprecated: use external_type_display_name'),
  name: z.string(),
  created_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
  connected_account_ids: z.array(z.string()),
})

export type AcsSystem = z.output<typeof acs_system>
