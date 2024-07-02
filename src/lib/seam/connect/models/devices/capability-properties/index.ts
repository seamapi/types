import { z } from 'zod'

import {
  access_code_capability_properties,
  access_code_code_constraint,
} from './access-code.js'
import { lock_capability_properties } from './lock.js'
import { thermostat_capability_properties } from './thermostat.js'

export {
  access_code_capability_properties,
  access_code_code_constraint,
  lock_capability_properties,
  thermostat_capability_properties,
}

// todo: discriminate based on capability and remove intersection type
export const capability_properties = z.intersection(
  access_code_capability_properties
    .partial()
    .merge(lock_capability_properties.partial()),
  thermostat_capability_properties,
)

export type { AccessCodeConstraint } from './access-code.js'
