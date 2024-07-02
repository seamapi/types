import { z } from 'zod'

export const hvac_mode_setting = z.enum(['off', 'heat', 'cool', 'heat_cool'])

export type HvacModeSetting = z.infer<typeof hvac_mode_setting>

export const fan_mode_setting = z.enum(['auto', 'on'])

export type FanModeSetting = z.infer<typeof fan_mode_setting>
