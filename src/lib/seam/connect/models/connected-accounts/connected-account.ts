import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'

const common_connected_account_error = z.object({
  message: z.string(),
  is_connected_account_error: z.literal(true),
})

const common_connected_account_warning = z.object({
  message: z.string(),
})

export const connected_account_error = common_connected_account_error.extend({
  error_code: z.string(),
})

export type ConnectedAccountError = z.infer<typeof connected_account_error>

const connected_account_warning = common_connected_account_warning.extend({
  warning_code: z.string(),
})

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
