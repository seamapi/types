import { z } from 'zod'

import {
  access_code_capability_properties,
  access_code_code_constraint,
} from './access-code.js'
import { lock_capability_properties } from './lock.js'
import {
  climate_setting_schedule,
  thermostat_capability_properties,
} from './thermostat.js'
import { climate_setting, hvac_mode_setting } from './climate-setting.js'

export {
  access_code_capability_properties,
  access_code_code_constraint,
  climate_setting,
  climate_setting_schedule,
  hvac_mode_setting,
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
export type { ClimateSetting, HvacModeSetting } from './climate-setting.js'
