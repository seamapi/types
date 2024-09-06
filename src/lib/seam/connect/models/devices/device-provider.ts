import { z } from 'zod'

import { device_capability_flags } from './device.js'

export const DEVICE_PROVIDERS = {
  AKUVOX: 'akuvox',
  AUGUST: 'august',
  AVIGILON_ALTA: 'avigilon_alta',
  BRIVO: 'brivo',
  BUTTERFLYMX: 'butterflymx',
  SCHLAGE: 'schlage',
  SMARTTHINGS: 'smartthings',
  YALE: 'yale',
  GENIE: 'genie',
  DOORKING: 'doorking',
  SALTO: 'salto',
  LOCKLY: 'lockly',
  TTLOCK: 'ttlock',
  LINEAR: 'linear',
  NOISEAWARE: 'noiseaware',
  NUKI: 'nuki',
  SEAM_RELAY_ADMIN: 'seam_relay_admin',
  IGLOO: 'igloo',
  KWIKSET: 'kwikset',
  MINUT: 'minut',
  MY_2N: 'my_2n',
  CONTROLBYWEB: 'controlbyweb',
  NEST: 'nest',
  IGLOOHOME: 'igloohome',
  ECOBEE: 'ecobee',
  HUBITAT: 'hubitat',
  FOUR_SUITES: 'four_suites',
  DORMAKABA_ORACODE: 'dormakaba_oracode',
  PTI: 'pti',
  WYZE: 'wyze',
  SEAM_PASSPORT: 'seam_passport',
  VISIONLINE: 'visionline',
  ASSA_ABLOY_CREDENTIAL_SERVICE: 'assa_abloy_credential_service',
  SEAM_BRIDGE: 'seam_bridge',
  TEDEE: 'tedee',
  HONEYWELL_RESIDEO: 'honeywell_resideo',
  LATCH: 'latch',
  AKILES: 'akiles',
} as const

export type DeviceProviderName =
  (typeof DEVICE_PROVIDERS)[keyof typeof DEVICE_PROVIDERS]

export const ALL_DEVICE_PROVIDERS: [
  DeviceProviderName,
  ...DeviceProviderName[],
] = Object.values(DEVICE_PROVIDERS) as any

export type ProviderCategory = keyof typeof PROVIDER_CATEGORY_MAP

export const PROVIDER_CATEGORY_MAP = {
  stable: [
    'august',
    'avigilon_alta',
    'brivo',
    'schlage',
    'smartthings',
    'yale',
    'nuki',
    'salto',
    'controlbyweb',
    'minut',
    'my_2n',
    'kwikset',
    'ttlock',
    'noiseaware',
    'igloohome',
    'ecobee',
    'four_suites',
    'lockly',
    'wyze',
    'nest',
    'tedee',
    'seam_bridge',
    'honeywell_resideo',
    'visionline',
    'assa_abloy_credential_service',
    'latch',
  ],

  consumer_smartlocks: [
    'august',
    'schlage',
    'yale',
    'smartthings',
    'nuki',
    'ttlock',
    'kwikset',
    'igloohome',
    'wyze',
    'lockly',
    'tedee',
  ],

  thermostats: ['ecobee', 'nest'],
  noise_sensors: ['minut', 'noiseaware'],
  access_control_systems: [
    'pti',
    'visionline',
    'assa_abloy_credential_service',
    'latch',
    'salto',
  ],

  internal_beta: ALL_DEVICE_PROVIDERS,
} as const satisfies Record<string, readonly DeviceProviderName[]>

export const PROVIDER_CATEGORIES: [ProviderCategory, ...ProviderCategory[]] =
  Object.keys(PROVIDER_CATEGORY_MAP) as any

export const PUBLIC_PROVIDER_CATEGORIES: typeof PROVIDER_CATEGORIES =
  PROVIDER_CATEGORIES.filter((category) => category !== 'internal_beta') as any

export const device_provider = z
  .object({
    device_provider_name: z.enum(ALL_DEVICE_PROVIDERS),
    display_name: z.string(),
    image_url: z.string(),
    provider_categories: z.array(z.enum(PUBLIC_PROVIDER_CATEGORIES)),
  })
  .extend(device_capability_flags.shape)

export type DeviceProvider = z.infer<typeof device_provider>
