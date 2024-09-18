import { z } from 'zod'

import { device_model_capability_flags } from './device-capability.js'
import { hardware } from './hardware.js'
import { image_reference } from './image-reference.js'
import { manufacturer } from './manufacturer.js'

export const device_category = z.enum([
  'smartlock',
  'sensor',
  'thermostat',
  'relay',
  'intercom',
  'accessory',
])

export type DeviceCategory = z.infer<typeof device_category>

export const device_connection_type = z.enum([
  'wifi',
  'zwave',
  'zigbee',
  'unknown',
])

export type DeviceConnectionType = z.infer<typeof device_connection_type>

const smartlock = z
  .object({
    main_category: z.literal(device_category.enum.smartlock),
    physical_properties: z.object({
      lock_type: z.enum([
        'deadbolt',
        'lever',
        'mortise',
        'lockbox',
        'cylinder',
        'padlock',
        'locker',
        'unknown',
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
  .merge(
    device_model_capability_flags.pick({
      can_remotely_lock: true,
      can_remotely_unlock: true,
      can_program_offline_access_codes: true,
      can_program_online_access_codes: true,
    }),
  )

const sensor = z.object({
  main_category: z.literal(device_category.enum.sensor),
  physical_properties: z.object({
    has_noise_sensor: z.boolean(),
    has_humidity_sensor: z.boolean(),
    has_temperature_sensor: z.boolean(),
    has_occupancy_detection: z.boolean(),
  }),
})

export const thermostat = z
  .object({
    main_category: z.literal(device_category.enum.thermostat),
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
  .merge(
    device_model_capability_flags.pick({
      can_hvac_heat: true,
      can_hvac_cool: true,
      can_hvac_heat_cool: true,
      can_turn_off_hvac: true,
    }),
  )

export type ThermostatProperties = z.infer<typeof thermostat>

const relay = z.object({
  main_category: z.literal(device_category.enum.relay),
})

const intercom = z.object({
  main_category: z.literal(device_category.enum.intercom),
  physical_properties: z.object({
    has_camera: z.boolean(),
    has_rfid_reader: z.boolean().default(false),
    has_nfc_reader: z.boolean().default(false),
    has_wiegand_interface: z.boolean().default(false),
  }),
  software_features: z.object({
    can_remotely_unlock: z.boolean(),
    can_program_access_codes: z.boolean(),
    can_unlock_with_face_recognition: z.boolean().default(false),
    supports_onvif: z.boolean().default(false),
  }),
})

const accessory = z.object({
  main_category: z.literal(device_category.enum.accessory),
})

export const device_model_category_specific_properties = z.discriminatedUnion(
  'main_category',
  [smartlock, sensor, thermostat, relay, intercom, accessory],
)

export const base_device_model_v1 = z.object({
  device_model_id: z.string().uuid(),
  manufacturer: manufacturer.omit({
    device_model_count: true,
  }),
  is_device_supported: z.boolean(),
  display_name: z.string(),
  description: z.string(),
  product_url: z.string().optional(),
  main_connection_type: device_connection_type,
  hardware,
  aesthetic_variants: z
    .object({
      slug: z.string(),
      display_name: z.string(),
      primary_color_hex: z.string().optional(),
      manufacturer_sku: z.string().optional(),
      front_image: image_reference.optional(),
      back_image: image_reference.optional(),
      images: image_reference.array(),
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

export type BaseDeviceModel = z.infer<typeof base_device_model_v1>

export const device_model_v1 = base_device_model_v1.and(
  device_model_category_specific_properties,
)

export type DeviceModel = z.infer<typeof device_model_v1>
