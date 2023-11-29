import { z } from 'zod'

import { managed_device } from './managed-device.js'

export const unmanaged_device = managed_device
  .pick({
    device_id: true,
    device_type: true,
    connected_account_id: true,
    capabilities_supported: true,
    workspace_id: true,
    errors: true,
    warnings: true,
    created_at: true,
  })
  .extend({
    is_managed: z.literal(false),
    // todo: should pick from the managed_device schema instead of re-defining
    properties: z.object({
      name: z.string(),
      online: z.boolean(),
      manufacturer: z.string().optional(),
      image_url: z.string().optional(),
      image_alt_text: z.string().optional(),
      model: z.object({
        display_name: z.string(),
        manufacturer_display_name: z.string(),
      }),
      battery_level: z
        .number()
        .min(0)
        .max(1)
        .optional()
        .describe(
          'Indicates the battery level of the device as a decimal value between 0 and 1, inclusive.',
        ),
    }),
  })

export type UnmanagedDevice = z.infer<typeof unmanaged_device>
