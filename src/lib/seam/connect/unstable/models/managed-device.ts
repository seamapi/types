import { z } from 'zod'

import { capabilities } from './capabilities-supported.js'
import { any_device_type } from './device-type.js'

export const managed_device = z.object({
  device_id: z.string().uuid(),
  device_type: any_device_type,
  capabilities_supported: z.array(capabilities),
  properties: z
    .object({
      online: z.boolean(),
      name: z.string(),
      model: z.object({
        display_name: z.string(),
      }),
    })
    .and(z.record(z.string(), z.any())),
  // todo: better type
  location: z.any(),
  connected_account_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
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
  created_at: z.string().datetime(),
  is_managed: z.literal(true),
})

export type ManagedDevice = z.infer<typeof managed_device>
