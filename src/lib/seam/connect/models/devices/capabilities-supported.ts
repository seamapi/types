import { z } from 'zod'

export const capabilities = z.enum([
  'access_code',
  'lock',
  'noise_detection',
  'thermostat',
  'battery',
  'phone',
])

export type Capabilities = z.infer<typeof capabilities>
