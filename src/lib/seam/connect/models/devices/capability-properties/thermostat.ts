import { z } from 'zod'

import {
  climate_preset,
  climate_preset_mode,
  climate_setting,
  fan_mode_setting,
  hvac_mode_setting,
  thermostat_daily_program,
  thermostat_schedule,
  thermostat_weekly_program,
} from '../../thermostats/index.js'

export const thermostat_capability_properties = z
  .object({
    temperature_fahrenheit: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Reported temperature in °F.
          `),
    temperature_celsius: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Reported temperature in °C.
          `),
    relative_humidity: z.number().min(0).max(1).describe(`
          ---
          property_group_key: thermostats
          ---
          Reported relative humidity, as a value between 0 and 1, inclusive.
          `),
    available_hvac_mode_settings: z.array(hvac_mode_setting).describe(`
          ---
          property_group_key: thermostats
          ---
          HVAC mode settings that the thermostat supports.
          `),
    available_fan_mode_settings: z.array(fan_mode_setting).describe(`
          ---
          property_group_key: thermostats
          ---
          Fan mode settings that the thermostat supports.
          `),
    available_climate_preset_modes: z.array(climate_preset_mode).describe(`
          ---
          property_group_key: thermostats
          draft: Needs review.
          ---
          Climate preset modes that the thermostat supports, such as "home", "away", "wake", "sleep", "occupied", and "unoccupied".
          `),
    is_heating: z.boolean().describe(`
          ---
          property_group_key: thermostats
          ---
          Indicates whether the connected HVAC system is currently heating, as reported by the thermostat.
          `),
    is_cooling: z.boolean().describe(`
          ---
          property_group_key: thermostats
          ---
          Indicates whether the connected HVAC system is currently cooling, as reported by the thermostat.
          `),
    is_fan_running: z.boolean().describe(`
          ---
          property_group_key: thermostats
          ---
          Indicates whether the fan in the connected HVAC system is currently running, as reported by the thermostat.
          `),
    fan_mode_setting: fan_mode_setting.describe(`
      ---
      deprecated: Use \`current_climate_setting.fan_mode_setting\` instead.
      property_group_key: thermostats
      ---
    `),

    /**
     * this is true if the current thermostat settings differ that what is on seam, and `current_climate_setting.manual_override_allowed: true`
     */
    is_temporary_manual_override_active: z.boolean().describe(`
          ---
          property_group_key: thermostats
          ---
          Indicates whether the current thermostat settings differ from the most recent active program or schedule that Seam activated. For this condition to occur, \`current_climate_setting.manual_override_allowed\` must also be \`true\`.
          `),

    /**
     * can be derived from `fallback_climate_preset_key`, or `active_thermostat_schedule` if one is active
     */
    current_climate_setting: climate_setting.describe(`
          ---
          property_group_key: thermostats
          ---
          Current climate setting.
          `),
    default_climate_setting: climate_setting.describe(`
      ---
      deprecated: use fallback_climate_preset_key to specify a fallback climate preset instead.
      property_group_key: thermostats
      ---
    `),
    available_climate_presets: z.array(climate_preset).describe(`
          ---
          property_group_key: thermostats
          ---
          Available [climate presets](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) for the thermostat.
          `),
    fallback_climate_preset_key: z.string().min(1).nullable().describe(`
          ---
          property_group_key: thermostats
          ---
          Key of the [fallback climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets/setting-the-fallback-climate-preset) for the thermostat.
          `),
    active_thermostat_schedule: thermostat_schedule.nullable().describe(`
          ---
          property_group_key: thermostats
          deprecated: Use \`active_thermostat_schedule_id\` with \`/thermostats/schedules/get\` instead.
          ---
          Active [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules).
          `),
    active_thermostat_schedule_id: z.string().uuid().nullable().describe(`
          ---
          property_group_key: thermostats
          ---
          ID of the active [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules).
          `),
    thermostat_daily_programs: z.array(thermostat_daily_program).optional()
      .describe(`
          ---
          property_group_key: thermostats
          ---
          Configured [daily programs](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-programs) for the thermostat.
          `),
    thermostat_weekly_program: thermostat_weekly_program.nullable().optional()
      .describe(`
          ---
          property_group_key: thermostats
          ---
          Current [weekly program](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-programs) for the thermostat.
          `),
    min_cooling_set_point_celsius: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Minimum [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points#cooling-set-point) in °C.
          `),
    min_cooling_set_point_fahrenheit: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Minimum [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points#cooling-set-point) in °F.
          `),
    max_cooling_set_point_celsius: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Maximum [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points#cooling-set-point) in °C.
          `),
    max_cooling_set_point_fahrenheit: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Maximum [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points#cooling-set-point) in °F.
          `),
    min_heating_set_point_celsius: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Minimum [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points#heating-set-point) in °C.
          `),
    min_heating_set_point_fahrenheit: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Minimum [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points#heating-set-point) in °F.
          `),
    max_heating_set_point_celsius: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Maximum [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points#heating-set-point) in °C.
          `),
    max_heating_set_point_fahrenheit: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Maximum [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points#heating-set-point) in °F.
          `),
    min_heating_cooling_delta_celsius: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Minimum [temperature difference](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points#minimum-heating-cooling-temperature-delta) in °C between the cooling and heating set points when in heat-cool (auto) mode.
          `),
    min_heating_cooling_delta_fahrenheit: z.number().describe(`
          ---
          property_group_key: thermostats
          ---
          Minimum [temperature difference](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points#minimum-heating-cooling-temperature-delta) in °F between the cooling and heating set points when in heat-cool (auto) mode.
          `),
    temperature_threshold: z
      .object({
        lower_limit_celsius: z.number().nullable()
          .describe(`Lower limit in °C within the current [temperature threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds) set for the thermostat.
          `),
        lower_limit_fahrenheit: z.number().nullable()
          .describe(`Lower limit in °F within the current [temperature threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds) set for the thermostat.
          `),
        upper_limit_celsius: z.number().nullable()
          .describe(`Upper limit in °C within the current [temperature threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds) set for the thermostat.
          `),
        upper_limit_fahrenheit: z.number().nullable()
          .describe(`Upper limit in °F within the current [temperature threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds) set for the thermostat.
          `),
      })
      .optional().describe(`
          ---
          property_group_key: thermostats
          ---
          Current [temperature threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds) set for the thermostat.
          `),
    thermostat_daily_program_period_precision_minutes: z.number().optional()
      .describe(`
            ---
            property_group_key: thermostats
            ---
            Precision of the thermostat's period in minutes. For example, if the thermostat supports 15-minute periods, this value is 15. All values are relative to the top of the hour, so for 15 minutes, the periods would be 0, 15, 30, and 45 minutes past the hour.
      `),
    max_unique_climate_presets_per_thermostat_weekly_program: z
      .number()
      .optional().describe(`
            ---
            property_group_key: thermostats
            ---
            Maximum number of climate presets that the thermostat can support for weekly programming.
      `),
    max_thermostat_daily_program_periods_per_day: z.number().optional()
      .describe(`
            ---
            property_group_key: thermostats
            ---
            Maximum number of periods that the thermostat can support per day. For example, if the thermostat supports 4 periods per day, this value is 4.
      `),
  })
  .partial()
