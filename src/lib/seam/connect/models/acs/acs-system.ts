import { z } from 'zod'

export const acs_system_capability_flags = z.object({
  // Access method type capability flags are not publicly exposed for ACS systems
  // They are only available for ACS entrances
})

export const acs_location = z.object({
  time_zone: z
    .string()
    .nullable()
    .describe(
      'Time zone in which the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) is located.',
    ),
})

// If changed, update seam.acs_system.external_type generated column
export const acs_system_external_type = z.enum([
  'pti_site',
  'alta_org',
  'salto_ks_site',
  'salto_space_system',
  'brivo_account',
  'hid_credential_manager_organization',
  'visionline_system',
  'assa_abloy_credential_service',
  'latch_building',
  'dormakaba_community_site',
  'dormakaba_ambiance_site',
  'legic_connect_credential_service',
  'assa_abloy_vostio',
  'assa_abloy_vostio_credential_service',
  'hotek_site',
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
const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const seam_bridge_disconnected = common_acs_system_error.extend({
  error_code: z
    .literal('seam_bridge_disconnected')
    .describe(error_code_description),
})
  .describe(`Indicates that the Seam API cannot communicate with [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge), for example, if Seam Bridge executable has stopped or if the computer running the Seam Bridge executable is offline.
  This error might also occur if Seam Bridge is connected to the wrong [workspace](https://docs.seam.co/latest/core-concepts/workspaces).
  See also [Troubleshooting Your Access Control System](https://docs.seam.co/latest/capability-guides/access-systems/troubleshooting-your-access-control-system#acs_system.errors.seam_bridge_disconnected).`)

const bridge_disconnected = common_acs_system_error.extend({
  error_code: z.literal('bridge_disconnected').describe(error_code_description),
  is_bridge_error: z.boolean().optional(),
})
  .describe(`Indicates that the Seam API cannot communicate with [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge), for example, if Seam Bridge executable has stopped or if the computer running the Seam Bridge executable is offline.
    See also [Troubleshooting Your Access Control System](https://docs.seam.co/latest/capability-guides/access-systems/troubleshooting-your-access-control-system#acs_system.errors.seam_bridge_disconnected).`)

const visionline_instance_unreachable = common_acs_system_error.extend({
  error_code: z
    .literal('visionline_instance_unreachable')
    .describe(error_code_description),
})
  .describe(`Indicates that [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge) is functioning correctly and the Seam API can communicate with Seam Bridge, but the Seam API cannot connect to the on-premises [Visionline access control system](https://docs.seam.co/latest/device-and-system-integration-guides/assa-abloy-visionline-access-control-system).
  For example, the IP address of the on-premises access control system may be set incorrectly within the Seam [workspace](https://docs.seam.co/latest/core-concepts/workspaces).
  See also [Troubleshooting Your Access Control System](https://docs.seam.co/latest/capability-guides/capability-guides/access-systems/troubleshooting-your-access-control-system#acs_system.errors.visionline_instance_unreachable).`)

const salto_ks_subscription_limit_exceeded = common_acs_system_error
  .extend({
    error_code: z
      .literal('salto_ks_subscription_limit_exceeded')
      .describe(error_code_description),
  })
  .describe(
    'Indicates that the maximum number of users allowed for the site has been reached. This means that new access codes cannot be created. Contact Salto support to increase the user limit.',
  )

const acs_system_disconnected = common_acs_system_error
  .extend({
    error_code: z
      .literal('acs_system_disconnected')
      .describe(error_code_description),
  })
  .describe(
    'Indicates that the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) has been disconnected. See [Troubleshooting Your Access Control System](https://docs.seam.co/latest/capability-guides/access-systems/troubleshooting-your-access-control-system) to resolve the issue.',
  )

const account_disconnected = common_acs_system_error
  .extend({
    error_code: z
      .literal('account_disconnected')
      .describe(error_code_description),
  })
  .describe(
    'Indicates that the login credentials are invalid. Reconnect the account using a [Connect Webview](https://docs.seam.co/latest/ui-components/connect-webviews) to restore access.',
  )

const salto_ks_certification_expired = common_acs_system_error
  .extend({
    error_code: z
      .literal('salto_ks_certification_expired')
      .describe(error_code_description),
  })
  .describe(
    'Indicates that the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) has lost its Salto KS certification. Contact [support](mailto:support@seam.co) to regain access.',
  )
const acs_system_error = z
  .discriminatedUnion('error_code', [
    seam_bridge_disconnected,
    bridge_disconnected,
    visionline_instance_unreachable,
    salto_ks_subscription_limit_exceeded,
    acs_system_disconnected,
    account_disconnected,
    salto_ks_certification_expired,
  ])
  .describe(
    'Error associated with the [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
  )

const _acs_system_error_map = z.object({
  seam_bridge_disconnected: seam_bridge_disconnected.optional().nullable(),
  bridge_disconnected: bridge_disconnected.optional().nullable(),
  visionline_instance_unreachable: visionline_instance_unreachable
    .optional()
    .nullable(),
  salto_ks_subscription_limit_exceeded: salto_ks_subscription_limit_exceeded
    .optional()
    .nullable(),
  acs_system_disconnected: acs_system_disconnected.optional().nullable(),
  account_disconnected: account_disconnected.optional().nullable(),
  salto_ks_certification_expired: salto_ks_certification_expired
    .optional()
    .nullable(),
})

export type AcsSystemErrorMap = z.infer<typeof _acs_system_error_map>

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

const salto_ks_subscription_limit_almost_reached = common_acs_system_warning
  .extend({
    warning_code: z
      .literal('salto_ks_subscription_limit_almost_reached')
      .describe(warning_code_description),
  })
  .describe(
    'Indicates that the Salto KS site has exceeded 80% of the maximum number of allowed users. Increase your subscription limit or delete some users from your site to rectify the issue.',
  )

const time_zone_does_not_match_location = common_acs_system_warning
  .extend({
    warning_code: z
      .literal('time_zone_does_not_match_location')
      .describe(warning_code_description),
    misconfigured_acs_entrance_ids: z
      .array(z.string().uuid())
      .optional()
      .describe(
        `
    ---
    deprecated: this field is deprecated.
    ---
    `,
      ),
  })
  .describe(
    'Indicates the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) time zone could not be determined because the reported physical location does not match the time zone configured on the physical [ACS entrances](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
  )

const acs_system_warning = z
  .discriminatedUnion('warning_code', [
    salto_ks_subscription_limit_almost_reached,
    time_zone_does_not_match_location,
  ])
  .describe(
    'Warning associated with the [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
  )

const _acs_system_warning_map = z.object({
  salto_ks_subscription_limit_almost_reached:
    salto_ks_subscription_limit_almost_reached.optional().nullable(),
  time_zone_does_not_match_location: time_zone_does_not_match_location
    .optional()
    .nullable(),
})

export type AcsSystemWarningMap = z.infer<typeof _acs_system_warning_map>

export const acs_system = z
  .object({
    default_credential_manager_acs_system_id: z
      .string()
      .uuid()
      .nullable()
      .optional()
      .describe(
        'ID of the default credential manager `acs_system` for this [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
      ),
    acs_system_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
      ),
    acs_user_count: z.number().optional(),
    acs_access_group_count: z.number().optional(),
    external_type: acs_system_external_type
      .describe(
        'Brand-specific terminology for the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) type.',
      )
      .optional(),
    external_type_display_name: z
      .string()
      .describe(
        'Display name that corresponds to the brand-specific terminology for the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) type.',
      )
      .optional(),
    is_credential_manager: z
      .boolean()
      .describe('Indicates whether the `acs_system` is a credential manager.'),
    visionline_metadata: z
      .object({
        mobile_access_uuid: z
          .string()
          .describe(
            'Keyset loaded into a reader. Mobile keys and reader administration tools securely authenticate only with readers programmed with a matching keyset.',
          ),
        system_id: z
          .string()
          .describe(
            'Unique ID assigned by the ASSA ABLOY licensing team that identifies each hotel in your credential manager.',
          ),
        lan_address: z
          .string()
          .describe(
            'IP address or hostname of the main Visionline server relative to [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge) on the local network.',
          ),
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
    location: acs_location,
    name: z
      .string()
      .describe(
        'Name of the [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
      ),
    created_at: z
      .string()
      .datetime()
      .describe(
        'Date and time at which the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) was created.',
      ),
    workspace_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
      ),
    connected_account_ids: z.array(z.string().uuid()).describe(`
      ---
      deprecated: Use \`connected_account_id\`.
      ---
      IDs of the [connected accounts](https://docs.seam.co/latest/core-concepts/connected-accounts) associated with the [access control system](https://docs.seam.co/latest/capability-guides/access-systems).
      `),
    connected_account_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) associated with the [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
      ),
    image_url: z
      .string()
      .describe(
        'URL for the image that represents the [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
      ),
    image_alt_text: z
      .string()
      .describe(
        'Alternative text for the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) image.',
      ),
    errors: z
      .array(acs_system_error)
      .describe(
        'Errors associated with the [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
      ),
    warnings: z
      .array(acs_system_warning)
      .describe(
        'Warnings associated with the [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
      ),
  })
  .merge(acs_system_capability_flags).describe(`
    ---
    route_path: /acs/systems
    ---
    Represents an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).

    Within an \`acs_system\`, create [\`acs_user\`s](https://docs.seam.co/latest/api/acs/users#acs_user) and [\`acs_credential\`s](https://docs.seam.co/latest/api/acs/credentials#acs_credential) to grant access to the \`acs_user\`s.

    For details about the resources associated with an access control system, see the [access control systems namespace](https://docs.seam.co/latest/api/acs).
  `)

export type AcsSystem = z.output<typeof acs_system>
