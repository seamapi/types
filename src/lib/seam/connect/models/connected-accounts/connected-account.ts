import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'

const common_connected_account_error = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the error.'),
  message: z.string(),
  is_connected_account_error: z.boolean().optional(),
  is_bridge_error: z.boolean().optional(),
})

const error_code_description =
  'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.'

const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const common_connected_account_warning = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the warning.'),
  message: z.string(),
})

export const account_disconnected = common_connected_account_error
  .extend({
    error_code: z
      .literal('account_disconnected')
      .describe(error_code_description),
  })
  .describe('Account is disconnected.')

export const invalid_credentials = common_connected_account_error
  .extend({
    error_code: z
      .literal('invalid_credentials')
      .describe(error_code_description),
  })
  .describe('Credentials provided were invalid.')

export const bridge_disconnected = common_connected_account_error.extend({
  error_code: z.literal('bridge_disconnected').describe(error_code_description),
})
  .describe(`Indicates that the Seam API cannot communicate with [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge), for example, if Seam Bridge executable has stopped or if the computer running the Seam Bridge executable is offline.
  See also [Troubleshooting Your Access Control System](https://docs.seam.co/latest/capability-guides/access-systems/troubleshooting-your-access-control-system#acs_system.errors.seam_bridge_disconnected).`)

export const salto_ks_subscription_limit_exceeded =
  common_connected_account_error
    .extend({
      error_code: z
        .literal('salto_ks_subscription_limit_exceeded')
        .describe(error_code_description),
      salto_ks_metadata: z.object({
        sites: z.array(
          z.object({
            site_id: z.string(),
            site_name: z.string(),
            subscribed_site_user_count: z.number().int().min(0),
            site_user_subscription_limit: z.number().int().min(0),
          }),
        ),
      }),
    })
    .describe(
      'Indicates that the maximum number of users allowed for the site has been reached. This means that new access codes cannot be created. Contact Salto support to increase the user limit.',
    )

export const connected_account_error = z.discriminatedUnion('error_code', [
  account_disconnected,
  invalid_credentials,
  bridge_disconnected,
  salto_ks_subscription_limit_exceeded,
])

export type ConnectedAccountError = z.infer<typeof connected_account_error>

export type ConnectedAccountWarning = z.infer<typeof connected_account_warning>

const connected_account_error_map = z.object({
  account_disconnected: account_disconnected.nullable().optional(),
  invalid_credentials: invalid_credentials.nullable().optional(),
  bridge_disconnected: bridge_disconnected.nullable().optional(),
  salto_ks_subscription_limit_exceeded: salto_ks_subscription_limit_exceeded
    .nullable()
    .optional(),
})

export type ConnectedAccountErrorMap = z.infer<
  typeof connected_account_error_map
>

export const unknown_issue_with_connected_account =
  common_connected_account_warning
    .extend({
      warning_code: z
        .literal('unknown_issue_with_connected_account')
        .describe(warning_code_description),
    })
    .describe(
      'An unknown issue occurred while syncing the state of this connected account with the provider. This issue may affect the proper functioning of one or more resources in this account.',
    )

const scheduled_maintenance_window = common_connected_account_warning
  .extend({
    warning_code: z
      .literal('scheduled_maintenance_window')
      .describe(warning_code_description),
  })
  .describe('Scheduled downtime for account planned.')

const salto_ks_subscription_limit_almost_reached =
  common_connected_account_warning
    .extend({
      warning_code: z
        .literal('salto_ks_subscription_limit_almost_reached')
        .describe(warning_code_description),
      salto_ks_metadata: z.object({
        sites: z.array(
          z.object({
            site_id: z.string(),
            site_name: z.string(),
            site_user_subscription_limit: z.number().int().min(0),
            subscribed_site_user_count: z.number().int().min(0),
          }),
        ),
      }),
    })
    .describe(
      'Indicates that the Salto KS site has exceeded 80% of the maximum number of allowed users. Please increase your subscription limit, or delete some users from your site to rectify this.',
    )

const connected_account_warning = z
  .discriminatedUnion('warning_code', [
    scheduled_maintenance_window,
    unknown_issue_with_connected_account,
    salto_ks_subscription_limit_almost_reached,
  ])
  .describe('Warning associated with the `connected_account`.')

const connected_account_warning_map = z.object({
  scheduled_maintenance_window: scheduled_maintenance_window
    .nullable()
    .optional(),
  unknown_issue_with_connected_account: unknown_issue_with_connected_account
    .nullable()
    .optional(),
  salto_ks_subscription_limit_almost_reached:
    salto_ks_subscription_limit_almost_reached.nullable().optional(),
})

export type ConnectedAccountWarningMap = z.infer<
  typeof connected_account_warning_map
>

export const connected_account = z.object({
  connected_account_id: z.string().uuid().optional(),
  created_at: z.string().datetime().optional(),
  user_identifier: z
    .object({
      username: z.string().optional(),
      api_url: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      exclusive: z.boolean().optional(),
    })
    .optional(),
  account_type: z.string().optional(),
  account_type_display_name: z.string(),
  errors: z.array(connected_account_error),
  warnings: z.array(connected_account_warning),
  custom_metadata,
  automatically_manage_new_devices: z.boolean(),
}).describe(`
  ---
  route_path: /connected_accounts
  ---
`)

export type ConnectedAccount = z.infer<typeof connected_account>
