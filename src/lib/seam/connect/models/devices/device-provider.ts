import { z } from 'zod'

import type { ProviderCapability } from '../provider-capability.js'
import { device_capability_flags } from './device.js'

export const DEVICE_PROVIDERS = {
  HOTEK: 'hotek',
  DORMAKABA_COMMUNITY: 'dormakaba_community',
  LEGIC_CONNECT: 'legic_connect',
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
  SALTO_KS: 'salto_ks',
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
  TEDEE: 'tedee',
  HONEYWELL_RESIDEO: 'honeywell_resideo',
  LATCH: 'latch',
  AKILES: 'akiles',
  VOSTIO: 'assa_abloy_vostio',
  ASSA_ABLOY_VOSTIO_CREDENTIAL_SERVICE: 'assa_abloy_vostio_credential_service',
  TADO: 'tado',
  SALTO_SPACE: 'salto_space',
  SENSI: 'sensi',
  KWIKSET2: 'kwikset2',
  KEYNEST: 'keynest',
  DORMAKABA_AMBIANCE: 'dormakaba_ambiance',
  ULTRALOQ: 'ultraloq',
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
    'brivo',
    'schlage',
    'smartthings',
    'yale',
    'nuki',
    'salto_ks',
    'salto_space',
    'minut',
    'my_2n',
    'kwikset',
    'ttlock',
    'noiseaware',
    'igloohome',
    'ecobee',
    'lockly',
    'wyze',
    'nest',
    'tedee',
    'honeywell_resideo',
    'visionline',
    'assa_abloy_credential_service',
    'dormakaba_ambiance',
    'latch',
    'akiles',
    'sensi',
    'assa_abloy_vostio',
    'avigilon_alta',
    'keynest',
  ],

  consumer_smartlocks: [
    'akiles',
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

  thermostats: ['ecobee', 'nest', 'sensi', 'honeywell_resideo'],
  noise_sensors: ['minut', 'noiseaware'],
  access_control_systems: [
    'visionline',
    'assa_abloy_credential_service',
    'latch',
    'salto_ks',
    'assa_abloy_vostio',
    'salto_space',
    'dormakaba_ambiance',
    'dormakaba_community',
    'legic_connect',
    'hotek',
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
  .extend(device_capability_flags.shape).describe(`
    ---
    route_path: /devices
    ---
  `)

export type DeviceProvider = z.infer<typeof device_provider>

export const PROVIDER_CATEGORY_CAPABILITY_MAP: Record<
  ProviderCategory,
  ProviderCapability[]
> = {
  stable: ['lock', 'thermostat', 'noise_sensor', 'access_control'],
  consumer_smartlocks: ['lock'],
  thermostats: ['thermostat'],
  noise_sensors: ['noise_sensor'],
  access_control_systems: ['access_control'],
  internal_beta: ['lock', 'thermostat', 'noise_sensor', 'access_control'],
}
