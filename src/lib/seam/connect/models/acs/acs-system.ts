import { z } from 'zod'

export const acs_system_capability_flags = z.object({
  can_automate_enrollment: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether it is possible to [launch enrollment automations](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#prepare-the-phones-for-a-user-identity-to-start-receiving-mobile-credentials-using-an-enrollment-aut) for the `acs_system`.',
    ),
  can_create_acs_access_groups: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the `acs_system` supports creating [access groups](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups). See also [Access Group-based Access Control Systems](https://docs.seam.co/latest/capability-guides/access-systems/understanding-access-control-system-differences#access-group-based-access-control-systems).',
    ),
  can_remove_acs_users_from_acs_access_groups: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the `acs_system` supports [removing users from access groups](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups#remove-an-acs-user-from-an-access-group). See also [Access Group-based Access Control Systems](https://docs.seam.co/latest/capability-guides/access-systems/understanding-access-control-system-differences#access-group-based-access-control-systems).',
    ),
  can_add_acs_users_to_acs_access_groups: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the `acs_system` supports [adding users to access groups](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups#add-an-acs-user-to-an-access-group). See also [Access Group-based Access Control Systems](https://docs.seam.co/latest/capability-guides/access-systems/understanding-access-control-system-differences#access-group-based-access-control-systems).',
    ),
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
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the error.'),
  message: z
    .string()
    .describe(
      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
    ),
})

const error_code_description =
  'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.'

const seam_bridge_disconnected = common_acs_system_error.extend({
  error_code: z
    .literal('seam_bridge_disconnected')
    .describe(error_code_description),
})
  .describe(`Indicates that the Seam API cannot communicate with the [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge), for example, if the Seam Bridge executable has stopped or if the computer running the Seam Bridge executable is offline.
  This error might also occur if the Seam Bridge is connected to the wrong [workspace](https://docs.seam.co/latest/core-concepts/workspaces).
  See also [Troubleshooting Your Access Control System](https://docs.seam.co/latest/capability-guides/capability-guides/access-systems/troubleshooting-your-access-control-system#acs_system.errors.seam_bridge_disconnected).`)
const visionline_instance_unreachable = common_acs_system_error.extend({
  error_code: z
    .literal('visionline_instance_unreachable')
    .describe(error_code_description),
})
  .describe(`Indicates that the Seam Bridge is functioning correctly and the Seam API can communicate with the Seam Bridge, but the Seam API cannot connect to the on-premises [Visionline access control system](https://docs.seam.co/latest/device-and-system-integration-guides/assa-abloy-visionline-access-control-system).
  For example, the IP address of the on-premises access control system may be set incorrectly within the Seam [workspace](https://docs.seam.co/latest/core-concepts/workspaces).
  See also [Troubleshooting Your Access Control System](https://docs.seam.co/latest/capability-guides/capability-guides/access-systems/troubleshooting-your-access-control-system#acs_system.errors.visionline_instance_unreachable).`)

const salto_site_user_limit_reached = common_acs_system_error.extend({
  error_code: z
    .literal('salto_site_user_limit_reached')
    .describe(
      'You have reached the maximum number of users allowed for your site; Please contact Salto support to increase your user limit.',
    ),
})

const acs_system_error = z
  .union([
    seam_bridge_disconnected,
    visionline_instance_unreachable,
    salto_site_user_limit_reached,
  ])
  .describe('Error associated with the `acs_system`.')

const acs_system_error_map = z.object({
  seam_bridge_disconnected: seam_bridge_disconnected.optional().nullable(),
  visionline_instance_unreachable: visionline_instance_unreachable
    .optional()
    .nullable(),
  salto_site_user_limit_reached: salto_site_user_limit_reached
    .optional()
    .nullable(),
})

export type AcsSystemErrorMap = z.infer<typeof acs_system_error_map>

const common_acs_system_warning = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the warning.'),
  message: z
    .string()
    .describe(
      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
    ),
})

const salto_site_user_limit_almost_reached = common_acs_system_warning.extend({
  warning_code: z
    .literal('salto_site_user_limit_almost_reached')
    .describe(
      'You have reached more than 80% of the maximum number of users allowed for your site; Please contact Salto support to increase your user limit.',
    ),
})

const acs_system_warning =
  // z.union([
  salto_site_user_limit_almost_reached
    // ])
    .describe('Warning associated with the `acs_system`.')

const acs_system_warning_map = z.object({
  salto_site_user_limit_almost_reached: salto_site_user_limit_almost_reached
    .optional()
    .nullable(),
})

export type AcsSystemWarningMap = z.infer<typeof acs_system_warning_map>

export const acs_system = z
  .object({
    acs_system_id: z.string().uuid().describe('ID of the `acs_system`.'),
    external_type: acs_system_external_type
      .describe('Brand-specific terminology for the `acs_system` type.')
      .optional(),
    external_type_display_name: z
      .string()
      .describe(
        'Display name that corresponds to the brand-specific terminology for the `acs_system` type.',
      )
      .optional(),
    visionline_metadata: z
      .object({
        mobile_access_uuid: z.string(),
        system_id: z.string(),
        lan_address: z.string(),
      })
      .optional(),
    system_type: acs_system_external_type
      .describe(
        `
      ---
      deprecated: Use \`external_type\`.
      ---
      `,
      )
      .optional(),
    system_type_display_name: z.string().optional().describe(`
      ---
      deprecated: Use \`external_type_display_name\`.
      ---
      `),
    name: z.string().describe('Name of the `acs_system`.'),
    created_at: z
      .string()
      .datetime()
      .describe('Date and time at which the `acs_system` was created.'),
    workspace_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the `acs_system`.',
      ),
    connected_account_ids: z
      .array(z.string().uuid())
      .describe(
        'IDs of the [connected accounts](https://docs.seam.co/latest/core-concepts/connected-accounts) associated with the `acs_system`.',
      ),
    image_url: z
      .string()
      .describe('URL for the image that represents the `acs_system`.'),
    image_alt_text: z
      .string()
      .describe('Alternative text for the `acs_system` image.'),
    errors: z
      .array(acs_system_error)
      .describe('Errors associated with the `acs_system`.'),
    warnings: z
      .array(acs_system_warning)
      .describe('Warnings associated with the `acs_system`.'),
  })
  .merge(acs_system_capability_flags)
  .describe(
    'Represents an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
  )

export type AcsSystem = z.output<typeof acs_system>
