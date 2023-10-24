import type { SetRequired, Simplify } from 'type-fest'
import { z } from 'zod'

import { capabilities } from './capabilities-supported.js'
import { capability_properties } from './capability-properties/index.js'
import { device_metadata } from './device-metadata.js'
import { any_device_type } from './device-type.js'

export const battery_status = z.enum(['critical', 'low', 'good', 'full'])

export type BatteryStatus = z.infer<typeof battery_status>

export const common_device_properties = z.object({
  online: z.boolean(),
  name: z.string(),
  model: z.object({
    display_name: z.string(),
    manufacturer_display_name: z.string(),
  }),
  has_direct_power: z.boolean().optional(),
  battery_level: z.number().min(0).max(1).optional(),
  battery: z
    .object({
      level: z.number().min(0).max(1),
      status: battery_status,
    })
    .optional(),
  // todo: use enum
  manufacturer: z.string().optional(),
  image_url: z.string().url().optional(),
  image_alt_text: z.string().optional(),
  serial_number: z.string().optional(),
  supports_accessory_keypad: z.boolean().optional(),
})

export const managed_device = z.object({
  device_id: z.string().uuid(),
  device_type: any_device_type,
  capabilities_supported: z.array(capabilities),
  properties: common_device_properties
    .and(device_metadata)
    .and(capability_properties),
  location: z
    // todo: optional instead of nullable
    .object({
      location_name: z.string().optional(),
      timezone: z.string().optional(),
    })
    .nullable(),
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

export type ManagedDeviceWithBackendMetadata<
  MetadataKey extends keyof z.infer<typeof device_metadata>,
> = Simplify<
  ManagedDevice & {
    properties: SetRequired<ManagedDevice['properties'], MetadataKey>
  }
>
