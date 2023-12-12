import { z } from 'zod'

import { common_device_properties, managed_device } from './managed-device.js'

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
    properties: common_device_properties.pick({
      name: true,
      online: true,
      manufacturer: true,
      image_url: true,
      image_alt_text: true,
      battery_level: true,
      battery: true,
      online_access_codes_enabled: true,
      offline_access_codes_enabled: true,
      model: true,
    }),
  })

export type UnmanagedDevice = z.infer<typeof unmanaged_device>
