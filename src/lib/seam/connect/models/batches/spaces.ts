import { z } from 'zod'

import { acs_entrance } from '../acs/index.js'
import { device } from '../devices/index.js'
import { space } from '../spaces/index.js'

export const spaces_batch = z
  .object({
    batch_type: z.literal('spaces'),
    spaces: space.array().optional(),
    devices: device.array().optional(),
    acs_entrances: acs_entrance.array().optional(),
  })
  .describe('ID of the affected access system user.')

export type SpacesBundle = z.infer<typeof spaces_batch>
