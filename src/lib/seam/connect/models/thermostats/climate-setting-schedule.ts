import { z } from 'zod'

import { climate_setting } from './climate-setting.js'

export const climate_setting_schedule = z
  .object({
    climate_setting_schedule_id: z.string().uuid(),
    schedule_type: z.literal('time_bound'),
    device_id: z.string().uuid(),
    name: z.string().optional(),
    schedule_starts_at: z.string(),
    schedule_ends_at: z.string(),
    created_at: z.string().datetime(),
    errors: z
      .any()
      .describe(
        'Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues.',
      ),
  })
  .merge(climate_setting.partial())

export type ClimateSettingSchedule = z.infer<typeof climate_setting_schedule>
