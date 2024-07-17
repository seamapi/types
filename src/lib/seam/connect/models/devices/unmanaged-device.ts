import { z } from 'zod'

import {
  common_device_properties,
  device,
  device_capability_flags,
} from './device.js'

export const unmanaged_device = device
  .pick({
    device_id: true,
    device_type: true,
    connected_account_id: true,
    location: true,
    capabilities_supported: true,
    workspace_id: true,
    errors: true,
    warnings: true,
    created_at: true,
  })
  .extend({
    is_managed: z.literal(false),
    properties: common_device_properties.pick({
      accessory_keypad: true,
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
  .merge(device_capability_flags)

export type UnmanagedDevice = z.infer<typeof unmanaged_device>
