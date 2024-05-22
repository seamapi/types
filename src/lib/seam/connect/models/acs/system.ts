import { z } from 'zod'

import { acs_system_capability_flags } from './acs_system_capability_flags.js'

export const acs_system_external_type_values = [
  'pti_site',
  'alta_org',
  'salto_site',
  'brivo_account',
  'hid_credential_manager_organization',
  'visionline_system',
  'assa_abloy_credential_service',
  'latch_building',
] as const

// If changed, update seam.acs_system.external_type generated column
export const acs_system_external_type = z
  .enum(acs_system_external_type_values)
  .optional()

export type AcsSystemExternalType = z.infer<typeof acs_system_external_type>

export const acs_system = z
  .object({
    acs_system_id: z.string().uuid(),
    external_type: acs_system_external_type,
    external_type_display_name: z.string().optional(),
    system_type: acs_system_external_type.describe(`
      ---
      deprecated: use external_type
      ---
      `),
    system_type_display_name: z.string().optional().describe(`
      ---
      deprecated: use external_type_display_name
      ---
      `),
    name: z.string(),
    created_at: z.string().datetime(),
    workspace_id: z.string().uuid(),
    connected_account_ids: z.array(z.string()),
    image_url: z.string(),
    image_alt_text: z.string(),
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
  })
  .merge(acs_system_capability_flags)

export type AcsSystem = z.output<typeof acs_system>
