import { z } from 'zod'

import {
  access_code_capability_properties,
  access_code_code_constraint,
  time_frame_option,
} from './access-code.js'
import { lock_capability_properties } from './lock.js'
import { thermostat_capability_properties } from './thermostat.js'

export {
  access_code_capability_properties,
  access_code_code_constraint,
  lock_capability_properties,
  thermostat_capability_properties,
  time_frame_option,
}

// todo: discriminate based on capability and remove intersection type
export const capability_properties = z.intersection(
  access_code_capability_properties
    .partial()
    .merge(lock_capability_properties.partial()),
  thermostat_capability_properties,
)

export type { AccessCodeConstraint, TimeFrameOption } from './access-code.js'
