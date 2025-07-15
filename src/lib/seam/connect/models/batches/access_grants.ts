import { z } from 'zod'

import { acs_entrance } from '../acs/index.js'
import { device } from '../devices/index.js'
import { space } from '../spaces/index.js'

export const access_grants_batch = z.object({
  batch_type: z.literal('access_grants'),
  spaces: space.array().optional(),
  devices: device.array().optional(),
  acs_entrances: acs_entrance.array().optional(),
})

export type AccessGrantsBundle = z.infer<typeof access_grants_batch>
