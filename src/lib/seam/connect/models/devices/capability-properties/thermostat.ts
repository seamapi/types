import { z } from 'zod'

import {
  climate_preset,
  climate_setting,
  fan_mode_setting,
  hvac_mode_setting,
  thermostat_schedule,
} from '../../thermostats/index.js'

export const thermostat_capability_properties = z
  .object({
    temperature_fahrenheit: z.number(),
    temperature_celsius: z.number(),
    relative_humidity: z.number().min(0).max(1),
    available_hvac_mode_settings: z.array(hvac_mode_setting),
    available_fan_mode_settings: z.array(fan_mode_setting),
    is_heating: z.boolean(),
    is_cooling: z.boolean(),
    is_fan_running: z.boolean(),
    fan_mode_setting: fan_mode_setting.describe(`
      ---
      deprecated: use current_climate_setting.fan_mode_setting instead.
      ---
    `),

    /**
     * this is true if the current thermostat settings differ that what is on seam, and `current_climate_setting.manual_override_allowed: true`
     */
    is_temporary_manual_override_active: z.boolean(),

    /**
     * can be derived from `fallback_climate_preset_key`, or `active_thermostat_schedule` if one is active
     */
    current_climate_setting: climate_setting,
    default_climate_setting: climate_setting.describe(`
      ---
      deprecated: use fallback_climate_preset_key to specify a fallback climate preset instead.
      ---
    `),
    available_climate_presets: z.array(climate_preset),
    fallback_climate_preset_key: z.string().min(1).nullable().default(null),
    active_thermostat_schedule: thermostat_schedule.nullable().default(null),
    min_cooling_set_point_celsius: z.number(),
    min_cooling_set_point_fahrenheit: z.number(),
    max_cooling_set_point_celsius: z.number(),
    max_cooling_set_point_fahrenheit: z.number(),
    min_heating_set_point_celsius: z.number(),
    min_heating_set_point_fahrenheit: z.number(),
    max_heating_set_point_celsius: z.number(),
    max_heating_set_point_fahrenheit: z.number(),
    min_heating_cooling_delta_celsius: z.number(),
    min_heating_cooling_delta_fahrenheit: z.number(),
  })
  .partial()
