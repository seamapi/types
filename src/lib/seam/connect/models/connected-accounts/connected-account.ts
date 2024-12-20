import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'

const common_connected_account_error = z.object({
  message: z.string(),
  is_connected_account_error: z.literal(true),
})

const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const common_connected_account_warning = z.object({
  message: z.string(),
})

export const connected_account_error = common_connected_account_error.extend({
  error_code: z.string(),
})

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

const connected_account_warning = z
  .union([
    common_connected_account_warning.extend({
      warning_code: z.string(),
    }),
    unknown_issue_with_connected_account,
  ])
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
})

export type ConnectedAccount = z.infer<typeof connected_account>
