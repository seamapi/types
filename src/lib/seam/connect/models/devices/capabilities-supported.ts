import { z } from 'zod'

export const capabilities = z.enum([
  'access_code',
  'lock',
  'noise_detection',
  'thermostat',
  'battery',
  'phone',
]).describe(`
        Collection of capabilities that the device supports when connected to Seam. **Important:** Superseded by [capability flags](https://docs.seam.co/latest/capability-guides/device-and-system-capabilities#capability-flags).
        `)

export type Capabilities = z.infer<typeof capabilities>
