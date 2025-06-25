import { z } from 'zod'

export const provider_capability = z.enum([
  'lock',
  'thermostat',
  'noise_sensor',
  'access_control',
]).describe(`
  High-level device capabilities that can be restricted in connect webviews.
  These represent the main device categories that customers can opt into.
`)

export type ProviderCapability = z.infer<typeof provider_capability>
