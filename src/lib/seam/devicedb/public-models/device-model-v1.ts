import { z } from 'zod'

import { image_reference } from './image-reference.js'
import { manufacturer } from './manufacturer.js'

const smartlock = z.object({
  main_category: z.literal('smartlock'),
  physical_properties: z.object({
    lock_type: z.enum([
      'deadbolt',
      'lever',
      'mortise',
      'lockbox',
      'cylinder',
      'padlock',
      'locker',
    ]),
    has_physical_key: z.boolean(),
    has_camera: z.boolean(),
  }),
  software_features: z.object({
    can_remotely_unlock: z.boolean(),
    can_program_access_codes: z.boolean(),
    can_program_access_schedules: z.boolean(),
    can_program_access_codes_offline: z.boolean(),
  }),
})

const sensor = z.object({
  main_category: z.literal('sensor'),
  physical_properties: z.object({
    has_noise_sensor: z.boolean(),
    has_humidity_sensor: z.boolean(),
    has_temperature_sensor: z.boolean(),
    has_occupancy_detection: z.boolean(),
  }),
})

const thermostat = z.object({
  main_category: z.literal('thermostat'),
  physical_properties: z.object({
    available_modes: z.enum(['heat', 'cool', 'fan', 'eco']).array(),
    is_heat_pump_compatible: z.boolean(),
    has_occupancy_detection: z.boolean(),
    supports_demand_response: z.boolean(),
    has_humidity_sensor: z.boolean(),
    has_temperature_sensor: z.boolean(),
    supports_emergency_heating_mode: z.boolean(),
  }),
  software_features: z.object({
    can_program_climate_schedules: z.boolean(),
  }),
})

const relay = z.object({
  main_category: z.literal('relay'),
})

export const device_model_category_specific_properties = z.discriminatedUnion(
  'main_category',
  [smartlock, sensor, thermostat, relay],
)

export const base_device_model_v1 = z.object({
  device_model_id: z.string().uuid(),
  manufacturer,
  is_device_supported: z.boolean(),
  display_name: z.string(),
  description: z.string(),
  product_url: z.string(),
  main_connection_type: z.enum(['wifi', 'zwave', 'zigbee', 'unknown']),
  aesthetic_variants: z
    .object({
      slug: z.string(),
      display_name: z.string(),
      primary_color_hex: z.string().optional(),
      manufacturer_sku: z.string(),
      front_image: image_reference.optional(),
      back_image: image_reference.optional(),
    })
    .array(),
  power_sources: z
    .enum([
      'battery',
      'hardwired',
      'mechanical_harvesting',
      'wireless',
      'ethernet',
    ])
    .array(),
})

export type BaseDeviceModelV1 = z.infer<typeof base_device_model_v1>

export const device_model_v1 = base_device_model_v1.and(
  device_model_category_specific_properties,
)

export type DeviceModelV1 = z.infer<typeof device_model_v1>
