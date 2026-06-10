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
    custom_metadata: true,
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
    }).describe(`
    ---
    property_groups:
      locks:
        name: locks
      access_codes:
        name: access codes
      thermostats:
        name: thermostats
      hardware:
        name: hardware
      noise_sensors:
        name: noise sensors
      phones:
        name: phones
      provider_metadata:
        name: provider metadata
    ---
    properties of the device.
  `),
  })
  .merge(device_capability_flags).describe(`
    ---
    route_path: /devices/unmanaged
    property_groups:
      locks:
        name: Locks
      access_codes:
        name: Access Codes
      thermostats:
        name: Thermostats
      hardware:
        name: Hardware
      noise_sensors:
        name: Noise Sensors
      phones:
        name: Phones
      provider_metadata:
        name: Provider Metadata
    ---
    Represents an [unmanaged device](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices). An unmanaged device has a limited set of visible properties and a subset of supported events. You cannot control an unmanaged device. Any [access codes](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/migrating-existing-access-codes) on an unmanaged device are unmanaged. To control an unmanaged device with Seam, [convert it to a managed device](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices#convert-an-unmanaged-device-to-managed).
  `)

export type UnmanagedDevice = z.infer<typeof unmanaged_device>
