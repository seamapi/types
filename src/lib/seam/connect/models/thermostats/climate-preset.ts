import { z } from 'zod'

import { fan_mode_setting, hvac_mode_setting } from './modes.js'

export const climate_preset = z.object({
  climate_preset_key: z
    .string()
    .describe('Unique key to identify the climate preset.'),
  can_edit: z
    .boolean()
    .describe('Indicates whether this climate preset key can be edited.'),
  can_delete: z
    .boolean()
    .describe('Indicates whether this climate preset key can be deleted.'),
  name: z
    .string()
    .nullable()
    .default(null)
    .optional()
    .describe('User-friendly name to identify the climate preset.'),
  display_name: z.string().describe('Display name for the climate preset.'),
  fan_mode_setting: fan_mode_setting
    .optional()
    .describe(
      'Desired fan mode setting, such as `on`, `auto`, or `circulate`.',
    ),
  hvac_mode_setting: hvac_mode_setting
    .optional()
    .describe(
      'Desired [HVAC mode](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/hvac-mode) setting, such as `heat`, `cool`, `heat_cool`, or `off`.',
    ),
  cooling_set_point_celsius: z
    .number()
    .optional()
    .describe(
      'Temperature to which the thermostat should cool (in °C). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
    ),
  heating_set_point_celsius: z
    .number()
    .optional()
    .describe('Temperature to which the thermostat should heat (in °C).'),
  cooling_set_point_fahrenheit: z
    .number()
    .optional()
    .describe('Temperature to which the thermostat should cool (in °F).'),
  heating_set_point_fahrenheit: z
    .number()
    .optional()
    .describe('Temperature to which the thermostat should heat (in °F).'),
  manual_override_allowed: z.boolean().describe(
    `
      ---
      deprecated: Use 'thermostat_schedule.is_override_allowed'
      ---
      Indicates whether a person at the thermostat can change the thermostat's settings.`,
  ),
})

export type ClimatePreset = z.infer<typeof climate_preset>

export const climate_setting = climate_preset.partial()

export type ClimateSetting = z.infer<typeof climate_setting>
