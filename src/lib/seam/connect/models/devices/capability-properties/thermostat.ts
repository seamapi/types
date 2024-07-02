import { z } from 'zod'

import {
  climate_setting,
  climate_setting_schedule,
  fan_mode_setting,
  hvac_mode_setting,
} from '../../thermostats/index.js'

const base_thermostat_capability_properties = z.object({
  temperature_fahrenheit: z.number(),
  temperature_celsius: z.number(),
  relative_humidity: z.number().min(0).max(1),
  can_enable_automatic_heating: z.boolean(),
  can_enable_automatic_cooling: z.boolean(),
  available_hvac_mode_settings: z.array(hvac_mode_setting),
  is_heating_available: z.literal(false),
  is_cooling_available: z.literal(false),
  is_heating: z.boolean(),
  is_cooling: z.boolean(),
  is_fan_running: z.boolean(),
  fan_mode_setting,

  /**
   * this is true if the current thermostat settings differ that what is on seam, and `current_climate_setting.manual_override_allowed: true`
   */
  is_temporary_manual_override_active: z.boolean(),

  /**
   * can be derived from `default_climate_setting`, or `active_climate_setting_schedule` if one is active
   */
  current_climate_setting: climate_setting,
  default_climate_setting: climate_setting.optional(),
  is_climate_setting_schedule_active: z.boolean(),
  active_climate_setting_schedule: climate_setting_schedule.optional(),
})

export const cooling_thermostat_capability_properties =
  base_thermostat_capability_properties.merge(
    z.object({
      min_cooling_set_point_celsius: z.number(),
      min_cooling_set_point_fahrenheit: z.number(),
      max_cooling_set_point_celsius: z.number(),
      max_cooling_set_point_fahrenheit: z.number(),
      is_cooling_available: z.literal(true),
    }),
  )

export const heating_thermostat_capability_properties =
  base_thermostat_capability_properties.merge(
    z.object({
      min_heating_set_point_celsius: z.number(),
      min_heating_set_point_fahrenheit: z.number(),
      max_heating_set_point_celsius: z.number(),
      max_heating_set_point_fahrenheit: z.number(),
      is_heating_available: z.literal(true),
    }),
  )

export const heating_cooling_thermostat_capability_properties =
  cooling_thermostat_capability_properties
    .merge(heating_thermostat_capability_properties)
    .merge(
      z.object({
        is_cooling_available: z.literal(true),
        is_heating_available: z.literal(true),
        min_heating_cooling_delta_celsius: z.number(),
        min_heating_cooling_delta_fahrenheit: z.number(),
      }),
    )

export const thermostat_capability_properties = z.union([
  heating_cooling_thermostat_capability_properties.partial(),
  heating_thermostat_capability_properties.partial(),
  cooling_thermostat_capability_properties.partial(),
])
