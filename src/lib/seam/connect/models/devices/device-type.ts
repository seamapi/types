import { z } from 'zod'

/** Locks */
export const LOCK_DEVICE_TYPE = {
  AKUVOX_LOCK: 'akuvox_lock',
  AUGUST_LOCK: 'august_lock',
  BRIVO_ACCESS_POINT: 'brivo_access_point',
  BUTTERFLYMX_PANEL: 'butterflymx_panel',
  AVIGILON_ALTA_ENTRY: 'avigilon_alta_entry',
  DOORKING_LOCK: 'doorking_lock',
  GENIE_DOOR: 'genie_door',
  IGLOO_LOCK: 'igloo_lock',
  LINEAR_LOCK: 'linear_lock',
  LOCKLY_LOCK: 'lockly_lock',
  KWIKSET_LOCK: 'kwikset_lock',
  NUKI_LOCK: 'nuki_lock',
  SALTO_LOCK: 'salto_lock',
  SCHLAGE_LOCK: 'schlage_lock',
  SEAM_RELAY: 'seam_relay',
  SMARTTHINGS_LOCK: 'smartthings_lock',
  WYZE_LOCK: 'wyze_lock',
  YALE_LOCK: 'yale_lock',
  TWO_N_INTERCOM: 'two_n_intercom',
  CONTROLBYWEB_DEVICE: 'controlbyweb_device',
  TTLOCK_LOCK: 'ttlock_lock',
  IGLOOHOME_LOCK: 'igloohome_lock',
  HUBITAT_LOCK: 'hubitat_lock',
  FOUR_SUITES_DOOR: 'four_suites_door',
  DORMAKABA_ORACODE_DOOR: 'dormakaba_oracode_door',
  TEDEE_LOCK: 'tedee_lock',
  AKILES_LOCK: 'akiles_lock',
  ULTRALOQ_LOCK: 'ultraloq_lock',
} as const

type LockDeviceTypeFromMapping =
  (typeof LOCK_DEVICE_TYPE)[keyof typeof LOCK_DEVICE_TYPE]

export const LOCK_DEVICE_TYPE_LIST = Object.values(
  LOCK_DEVICE_TYPE,
) as LockDeviceTypeFromMapping[]

export const lock_device_type = z.enum(
  Object.values(LOCK_DEVICE_TYPE) as [LockDeviceTypeFromMapping],
).describe(`Device type for smartlocks.
          `)

export type LockDeviceType = z.infer<typeof lock_device_type>

/** Keys */
export const KEY_DEVICE_TYPE = {
  KEYNEST_KEY: 'keynest_key',
} as const

type KeyDeviceTypeFromMapping =
  (typeof KEY_DEVICE_TYPE)[keyof typeof KEY_DEVICE_TYPE]

export const KEY_DEVICE_TYPE_LIST = Object.values(KEY_DEVICE_TYPE)

export const key_device_type = z.enum(
  Object.values(KEY_DEVICE_TYPE) as [KeyDeviceTypeFromMapping],
).describe(`Device type for keys.
          `)

export type KeyDeviceType = z.infer<typeof key_device_type>

/** Noise Sensors */
export const NOISE_SENSOR_DEVICE_TYPE = {
  NOISEAWARE_ACTIVITY_ZONE: 'noiseaware_activity_zone',
  MINUT_SENSOR: 'minut_sensor',
} as const

type NoiseSensorDeviceTypeFromMapping =
  (typeof NOISE_SENSOR_DEVICE_TYPE)[keyof typeof NOISE_SENSOR_DEVICE_TYPE]

export const NOISE_SENSOR_DEVICE_TYPE_LIST = Object.values(
  NOISE_SENSOR_DEVICE_TYPE,
) as NoiseSensorDeviceTypeFromMapping[]

export const noise_sensor_device_type = z.enum(
  Object.values(NOISE_SENSOR_DEVICE_TYPE) as [NoiseSensorDeviceTypeFromMapping],
).describe(`Device type for noise sensors.
          `)

export type NoiseSensorDeviceType = z.infer<typeof noise_sensor_device_type>

/** Thermostats */
export const THERMOSTAT_DEVICE_TYPE = {
  ECOBEE_THERMOSTAT: 'ecobee_thermostat',
  NEST_THERMOSTAT: 'nest_thermostat',
  HONEYWELL_RESIDEO_THERMOSTAT: 'honeywell_resideo_thermostat',
  TADO_THERMOSTAT: 'tado_thermostat',
  SENSI_THERMOSTAT: 'sensi_thermostat',
  SMARTTHINGS_THERMOSTAT: 'smartthings_thermostat',
} as const

type ThermostatDeviceTypeFromMapping =
  (typeof THERMOSTAT_DEVICE_TYPE)[keyof typeof THERMOSTAT_DEVICE_TYPE]

export const THERMOSTAT_DEVICE_TYPE_LIST = Object.values(
  THERMOSTAT_DEVICE_TYPE,
) as ThermostatDeviceTypeFromMapping[]

export const thermostat_device_type = z.enum(
  Object.values(THERMOSTAT_DEVICE_TYPE) as [ThermostatDeviceTypeFromMapping],
).describe(`Device type for thermostats.
          `)

export type ThermostatDeviceType = z.infer<typeof thermostat_device_type>

/** Phones */
export const PHONE_DEVICE_TYPE = {
  IOS_PHONE: 'ios_phone',
  ANDROID_PHONE: 'android_phone',
} as const

type PhoneDeviceTypeFromMapping =
  (typeof PHONE_DEVICE_TYPE)[keyof typeof PHONE_DEVICE_TYPE]

export const PHONE_DEVICE_TYPE_LIST = Object.values(
  PHONE_DEVICE_TYPE,
) as PhoneDeviceTypeFromMapping[]

export const phone_device_type = z.enum(
  Object.values(PHONE_DEVICE_TYPE_LIST) as [PhoneDeviceTypeFromMapping],
).describe(`Device type for phones.
          `)

export type PhoneDeviceType = z.infer<typeof phone_device_type>

export const any_device_type = z.union([
  lock_device_type,
  key_device_type,
  noise_sensor_device_type,
  thermostat_device_type,
  phone_device_type,
])

export type AnyDeviceType = z.infer<typeof any_device_type>
