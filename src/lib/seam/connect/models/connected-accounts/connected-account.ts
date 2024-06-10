import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'

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
  errors: z.any(),
  warnings: z.any(),
  custom_metadata,
  automatically_manage_new_devices: z.boolean(),
})
