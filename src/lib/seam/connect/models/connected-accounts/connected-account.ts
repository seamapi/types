import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'
import { provider_capability } from '../provider-capability.js'

const common_connected_account_error = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the error.'),
  message: z
    .string()
    .describe(
      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
    ),
  is_connected_account_error: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the error is related specifically to the connected account.',
    ),
  is_bridge_error: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the error is related to [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge).',
    ),
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
  message: z
    .string()
    .describe(
      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
    ),
})

export const account_disconnected = common_connected_account_error
  .extend({
    error_code: z
      .literal('account_disconnected')
      .describe(error_code_description),
  })
  .describe('Indicates that the account is disconnected.')

export const bridge_disconnected = common_connected_account_error
  .extend({
    error_code: z
      .literal('bridge_disconnected')
      .describe(error_code_description),
  })
  .describe(
    'Indicates that the Seam API cannot communicate with [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge), for example, if the Seam Bridge executable has stopped or if the computer running the Seam Bridge executable is offline. See also [Troubleshooting Your Access Control System](https://docs.seam.co/latest/capability-guides/access-systems/troubleshooting-your-access-control-system#acs_system.errors.seam_bridge_disconnected).',
  )

export const salto_ks_subscription_limit_exceeded =
  common_connected_account_error
    .extend({
      error_code: z
        .literal('salto_ks_subscription_limit_exceeded')
        .describe(error_code_description),
      salto_ks_metadata: z
        .object({
          sites: z
            .array(
              z
                .object({
                  site_id: z
                    .string()
                    .describe(
                      'ID of a Salto site associated with the connected account that has an error.',
                    ),
                  site_name: z
                    .string()
                    .describe(
                      'Name of a Salto site associated with the connected account that has an error.',
                    ),
                  subscribed_site_user_count: z
                    .number()
                    .int()
                    .min(0)
                    .describe(
                      'Count of subscribed site users for a Salto site associated with the connected account that has an error.',
                    ),
                  site_user_subscription_limit: z
                    .number()
                    .int()
                    .min(0)
                    .describe(
                      'Subscription limit of site users for a Salto site associated with the connected account that has an error.',
                    ),
                })
                .describe(
                  'Salto site associated with the connected account that has an error.',
                ),
            )
            .describe(
              'Salto sites associated with the connected account that has an error.',
            ),
        })
        .describe(
          'Salto KS metadata associated with the connected account that has an error.',
        ),
    })
    .describe(
      'Indicates that the maximum number of users allowed for the site has been reached. This means that new access codes cannot be created. Contact Salto support to increase the user limit.',
    )

export const connected_account_error = z.discriminatedUnion('error_code', [
  account_disconnected,
  bridge_disconnected,
  salto_ks_subscription_limit_exceeded,
])

export type ConnectedAccountError = z.infer<typeof connected_account_error>

export type ConnectedAccountWarning = z.infer<typeof connected_account_warning>

const _connected_account_error_map = z.object({
  account_disconnected: account_disconnected.nullable().optional(),
  bridge_disconnected: bridge_disconnected.nullable().optional(),
  salto_ks_subscription_limit_exceeded: salto_ks_subscription_limit_exceeded
    .nullable()
    .optional(),
})

export type ConnectedAccountErrorMap = z.infer<
  typeof _connected_account_error_map
>

export const unknown_issue_with_connected_account =
  common_connected_account_warning
    .extend({
      warning_code: z
        .literal('unknown_issue_with_connected_account')
        .describe(warning_code_description),
    })
    .describe(
      'Indicates that an unknown issue occurred while syncing the state of the connected account with the provider. This issue may affect the proper functioning of one or more resources in the account.',
    )

const scheduled_maintenance_window = common_connected_account_warning
  .extend({
    warning_code: z
      .literal('scheduled_maintenance_window')
      .describe(warning_code_description),
  })
  .describe(
    'Indicates that scheduled downtime is planned for the connected account.',
  )

const salto_ks_subscription_limit_almost_reached =
  common_connected_account_warning
    .extend({
      warning_code: z
        .literal('salto_ks_subscription_limit_almost_reached')
        .describe(warning_code_description),
      salto_ks_metadata: z
        .object({
          sites: z
            .array(
              z
                .object({
                  site_id: z
                    .string()
                    .describe(
                      'ID of a Salto site associated with the connected account that has a warning.',
                    ),
                  site_name: z
                    .string()
                    .describe(
                      'Name of a Salto site associated with the connected account that has a warning.',
                    ),
                  site_user_subscription_limit: z
                    .number()
                    .int()
                    .min(0)
                    .describe(
                      'Subscription limit of site users for a Salto site associated with the connected account that has a warning.',
                    ),
                  subscribed_site_user_count: z
                    .number()
                    .int()
                    .min(0)
                    .describe(
                      'Count of subscribed site users for a Salto site associated with the connected account that has a warning.',
                    ),
                })
                .describe(
                  'Salto site associated with the connected account that has a warning.',
                ),
            )
            .describe(
              'Salto sites associated with the connected account that has a warning.',
            ),
        })
        .describe(
          'Salto KS metadata associated with the connected account that has a warning.',
        ),
    })
    .describe(
      'Indicates that the Salto KS site has exceeded 80% of the maximum number of allowed users. Increase your subscription limit or delete some users from your site.',
    )

const account_reauthorization_requested = common_connected_account_warning
  .extend({
    warning_code: z
      .literal('account_reauthorization_requested')
      .describe(warning_code_description),
  })
  .describe(
    'Indicates that the Connected Account requires reauthorization using a new Connect Webview. The account is still connected, but cannot access new features. Delaying reauthorization too long will eventually cause the Connected Account to become disconnected.',
  )

const being_deleted = common_connected_account_warning
  .extend({
    warning_code: z.literal('being_deleted').describe(warning_code_description),
  })
  .describe(
    'Indicates that the connected account is currently being deleted. All devices, access codes, and other resources associated with this account are in the process of being removed from Seam.',
  )

const connected_account_warning = z
  .discriminatedUnion('warning_code', [
    scheduled_maintenance_window,
    unknown_issue_with_connected_account,
    salto_ks_subscription_limit_almost_reached,
    account_reauthorization_requested,
    being_deleted,
  ])
  .describe('Warning associated with the connected account.')

const _connected_account_warning_map = z.object({
  scheduled_maintenance_window: scheduled_maintenance_window
    .nullable()
    .optional(),
  unknown_issue_with_connected_account: unknown_issue_with_connected_account
    .nullable()
    .optional(),
  salto_ks_subscription_limit_almost_reached:
    salto_ks_subscription_limit_almost_reached.nullable().optional(),
  account_reauthorization_requested: account_reauthorization_requested
    .nullable()
    .optional(),
  being_deleted: being_deleted.nullable().optional(),
})

export type ConnectedAccountWarningMap = z.infer<
  typeof _connected_account_warning_map
>

export const connected_account = z.object({
  connected_account_id: z
    .string()
    .uuid()
    .describe('ID of the connected account.'),
  created_at: z
    .string()
    .datetime()
    .optional()
    .describe('Date and time at which the connected account was created.'),
  user_identifier: z
    .object({
      username: z
        .string()
        .optional()
        .describe(
          'Username of the user identifier associated with the connected account.',
        ),
      api_url: z
        .string()
        .optional()
        .describe(
          'API URL for the user identifier associated with the connected account.',
        ),
      email: z
        .string()
        .optional()
        .describe(
          'Email address of the user identifier associated with the connected account.',
        ),
      phone: z
        .string()
        .optional()
        .describe(
          'Phone number of the user identifier associated with the connected account.',
        ),
      exclusive: z
        .boolean()
        .optional()
        .describe(
          'Indicates whether the user identifier associated with the connected account is exclusive.',
        ),
    })
    .optional().describe(`
      ---
      deprecated: Use \`display_name\` instead.
      ---
      User identifier associated with the connected account.
    `),
  account_type: z.string().optional().describe('Type of connected account.'),
  account_type_display_name: z
    .string()
    .describe('Display name for the connected account type.'),
  image_url: z
    .string()
    .url()
    .optional()
    .describe('Logo URL for the connected account provider.'),
  display_name: z.string().describe('Display name for the connected account.'),
  errors: z
    .array(connected_account_error)
    .describe('Errors associated with the connected account.'),
  warnings: z
    .array(connected_account_warning)
    .describe('Warnings associated with the connected account.'),
  custom_metadata,
  automatically_manage_new_devices: z
    .boolean()
    .describe(
      'Indicates whether Seam should [import all new devices](https://docs.seam.co/latest/core-concepts/connect-webviews/customizing-connect-webviews#automatically_manage_new_devices) for the connected account to make these devices available for management by the Seam API.',
    ),
  customer_key: z
    .string()
    .optional()
    .describe(
      'Your unique key for the customer associated with this connected account.',
    ),
  accepted_capabilities: z
    .array(provider_capability)
    .describe(
      'List of capabilities that were accepted during the account connection process.',
    ),
}).describe(`
  ---
  route_path: /connected_accounts
  ---
  Represents a [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts). A connected account is an external third-party account to which your user has authorized Seam to get access, for example, an August account with a list of door locks.
`)

export type ConnectedAccount = z.infer<typeof connected_account>
