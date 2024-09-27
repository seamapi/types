import { z } from 'zod'

import { fan_mode_setting, hvac_mode_setting } from './modes.js'

export const climate_preset = z.object({
  climate_preset_key: z.string(),
  can_edit: z.boolean(),
  can_delete: z.boolean(),
  name: z.string().nullable().default(null).optional(),
  display_name: z.string(),
  fan_mode_setting: fan_mode_setting.optional(),
  hvac_mode_setting: hvac_mode_setting.optional(),
  cooling_set_point_celsius: z.number().optional(),
  heating_set_point_celsius: z.number().optional(),
  cooling_set_point_fahrenheit: z.number().optional(),
  heating_set_point_fahrenheit: z.number().optional(),
  manual_override_allowed: z.boolean(),
})

export type ClimatePreset = z.infer<typeof climate_preset>

export const climate_setting = climate_preset.partial()

export type ClimateSetting = z.infer<typeof climate_setting>
