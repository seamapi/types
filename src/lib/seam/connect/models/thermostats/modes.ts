import { z } from 'zod'

export const hvac_mode_setting = z.enum([
  'off',
  'heat',
  'cool',
  'heat_cool',
  'eco',
])

export type HvacModeSetting = z.infer<typeof hvac_mode_setting>

export const fan_mode_setting = z.enum(['auto', 'on', 'circulate'])

export type FanModeSetting = z.infer<typeof fan_mode_setting>

export const available_fan_mode_settings = z.array(fan_mode_setting)

export type AvailableFanModeSettings = z.infer<
  typeof available_fan_mode_settings
>

export const climate_preset_mode = z.enum([
  'home',
  'away',
  'wake',
  'sleep',
  'occupied',
  'unoccupied',
])

export type ClimatePresetMode = z.infer<typeof climate_preset_mode>
