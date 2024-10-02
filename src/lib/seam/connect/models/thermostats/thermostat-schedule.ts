import { z } from 'zod'

export const thermostat_schedule = z.object({
  thermostat_schedule_id: z.string().uuid(),
  device_id: z.string().uuid(),
  name: z.string().optional(),
  climate_preset_key: z.string(),
  max_override_period_minutes: z.number().int().nonnegative(),
  starts_at: z.string().datetime(),
  ends_at: z.string().datetime(),
  created_at: z.string().datetime(),
  errors: z
    .any()
    .describe(
      'Collection of errors associated with the thermostat schedule, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues.',
    ),
})

export type ThermostatSchedule = z.infer<typeof thermostat_schedule>
