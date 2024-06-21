import { z } from 'zod'

export const acs_system_capability_flags = z.object({
  can_automate_enrollment: z.boolean().optional(),
  can_create_acs_access_groups: z.boolean().optional(),
  can_remove_acs_users_from_acs_access_groups: z.boolean().optional(),
  can_add_acs_users_to_acs_access_groups: z.boolean().optional(),
})

// If changed, update seam.acs_system.external_type generated column
export const acs_system_external_type = z.enum([
  'pti_site',
  'alta_org',
  'salto_site',
  'brivo_account',
  'hid_credential_manager_organization',
  'visionline_system',
  'assa_abloy_credential_service',
  'latch_building',
])

export type AcsSystemExternalType = z.infer<typeof acs_system_external_type>

const common_acs_system_error = z.object({
  created_at: z.string().datetime(),
  message: z.string(),
})

const seam_bridge_disconnected = common_acs_system_error.extend({
  error_code: z.literal('seam_bridge_disconnected'),
})
const visionline_instance_unreachable = common_acs_system_error.extend({
  error_code: z.literal('visionline_instance_unreachable'),
})

const acs_system_error = z.union([
  seam_bridge_disconnected,
  visionline_instance_unreachable,
])

const acs_system_error_map = z.object({
  seam_bridge_disconnected: seam_bridge_disconnected.optional().nullable(),
  visionline_instance_unreachable: visionline_instance_unreachable
    .optional()
    .nullable(),
})

export type AcsSystemErrorMap = z.infer<typeof acs_system_error_map>

const acs_system_warning = z.object({})

const acs_system_warning_map = z.object({})

export type AcsSystemWarningMap = z.infer<typeof acs_system_warning_map>

export const acs_system = z
  .object({
    acs_system_id: z.string().uuid(),
    external_type: acs_system_external_type.optional(),
    external_type_display_name: z.string().optional(),
    system_type: acs_system_external_type
      .describe(
        `
      ---
      deprecated: use external_type
      ---
      `,
      )
      .optional(),
    system_type_display_name: z.string().optional().describe(`
      ---
      deprecated: use external_type_display_name
      ---
      `),
    name: z.string(),
    created_at: z.string().datetime(),
    workspace_id: z.string().uuid(),
    connected_account_ids: z.array(z.string().uuid()),
    image_url: z.string(),
    image_alt_text: z.string(),
    errors: z.array(acs_system_error),
    warnings: z.array(acs_system_warning),
  })
  .merge(acs_system_capability_flags)

export type AcsSystem = z.output<typeof acs_system>
