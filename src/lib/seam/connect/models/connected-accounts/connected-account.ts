import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'

const common_connected_account_error = z.object({
  message: z.string(),
  is_connected_account_error: z.literal(true),
})

const error_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const common_connected_account_warning = z.object({
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

export const connected_account_error = z.union([
  account_disconnected,
  invalid_credentials,
])

export type ConnectedAccountError = z.infer<typeof connected_account_error>

export const unknown_issue_with_connected_account =
  common_connected_account_warning
    .extend({
      warning_code: z
        .literal('unknown_issue_with_connected_account')
        .describe(warning_code_description),
    })
    .describe(
      'An unknown issue occurred while syncing the state of this connected account with the provider. ' +
        'This issue may affect the proper functioning of one or more resources in this account.',
    )

const scheduled_maintenance_window = common_connected_account_warning
  .extend({
    warning_code: z
      .literal('scheduled_maintenance_window')
      .describe(warning_code_description),
  })
  .describe('Scheduled downtime for account planned.')

const connected_account_warning = z
  .union([scheduled_maintenance_window, unknown_issue_with_connected_account])
  .describe('Warning associated with the `connected_account`.')

export type ConnectedAccountWarning = z.infer<typeof connected_account_warning>

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
