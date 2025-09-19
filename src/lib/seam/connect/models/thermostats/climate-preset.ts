import { z } from 'zod'

import {
  climate_preset_mode,
  fan_mode_setting,
  hvac_mode_setting,
} from './modes.js'

export const climate_preset = z.object({
  climate_preset_key: z
    .string()
    .describe(
      'Unique key to identify the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets).',
    ),
  can_edit: z
    .boolean()
    .describe(
      'Indicates whether the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) key can be edited.',
    ),
  can_delete: z
    .boolean()
    .describe(
      'Indicates whether the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) key can be deleted.',
    ),
  can_use_with_thermostat_daily_programs: z
    .boolean()
    .describe(
      'Indicates whether the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) key can be programmed in a thermostat daily program.',
    ),
  name: z
    .string()
    .nullable()
    .default(null)
    .optional()
    .describe(
      'User-friendly name to identify the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets).',
    ),
  display_name: z
    .string()
    .describe(
      'Display name for the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets).',
    ),
  climate_preset_mode: climate_preset_mode.optional().describe(`
    The climate preset mode for the thermostat, based on the available climate preset modes reported by the device.
  `),
  fan_mode_setting: fan_mode_setting
    .optional()
    .describe(
      'Desired [fan mode setting](https://docs.seam.co/latest/capability-guides/thermostats/configure-current-climate-settings#fan-mode-settings), such as `on`, `auto`, or `circulate`.',
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
    .describe(
      'Temperature to which the thermostat should heat (in °C). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
    ),
  cooling_set_point_fahrenheit: z
    .number()
    .optional()
    .describe(
      'Temperature to which the thermostat should cool (in °F). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
    ),
  heating_set_point_fahrenheit: z
    .number()
    .optional()
    .describe(
      'Temperature to which the thermostat should heat (in °F). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
    ),
  manual_override_allowed: z.boolean().describe(
    `
      ---
      deprecated: Use 'thermostat_schedule.is_override_allowed'
      ---
      Indicates whether a person at the thermostat can change the thermostat's settings. See [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).`,
  ),
  ecobee_metadata: z
    .object({
      climate_ref: z
        .string()
        .describe(`Reference to the Ecobee climate, if applicable.`),
      is_optimized: z
        .boolean()
        .describe(`Indicates if the climate preset is optimized by Ecobee.`),
      owner: z
        .enum(['user', 'system'])
        .describe(
          `Indicates whether the climate preset is owned by the user or the system.`,
        ),
    })
    .optional().describe(`
    Metadata specific to the Ecobee climate, if applicable.
  `),
})

export type ClimatePreset = z.infer<typeof climate_preset>

export const climate_setting = climate_preset.partial()

export type ClimateSetting = z.infer<typeof climate_setting>
