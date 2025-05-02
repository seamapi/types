import { z } from 'zod'

export const thermostat_daily_program_period = z.object({
  starts_at_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .describe(
      'Time at which the thermostat daily program entry starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
    ),
  climate_preset_key: z
    .string()
    .describe(
      'Key of the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) to activate at the starts_at_time.',
    ),
})

export const thermostat_daily_program = z.object({
  thermostat_daily_program_id: z
    .string()
    .uuid()
    .describe('ID of the thermostat daily program.'),
  device_id: z.string().uuid().describe('ID of the desired thermostat device.'),
  name: z
    .string()
    .optional()
    .describe('User-friendly name to identify the thermostat daily program.'),
  periods: z
    .array(thermostat_daily_program_period)
    .describe('Array of thermostat daily program periods.'),
  created_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the thermostat daily program was created.',
    ),
})

export const thermostat_weekly_program = z.object({
  device_id: z
    .string()
    .uuid()
    .describe('ID of the thermostat device the weekly program is for.'),
  monday_program_id: z
    .string()
    .uuid()
    .nullable()
    .describe('ID of the thermostat daily program to run on Mondays.'),
  tuesday_program_id: z
    .string()
    .uuid()
    .nullable()
    .describe('ID of the thermostat daily program to run on Tuesdays.'),
  wednesday_program_id: z
    .string()
    .uuid()
    .nullable()
    .describe('ID of the thermostat daily program to run on Wednesdays.'),
  thursday_program_id: z
    .string()
    .uuid()
    .nullable()
    .describe('ID of the thermostat daily program to run on Thursdays.'),
  friday_program_id: z
    .string()
    .uuid()
    .nullable()
    .describe('ID of the thermostat daily program to run on Fridays.'),
  saturday_program_id: z
    .string()
    .uuid()
    .nullable()
    .describe('ID of the thermostat daily program to run on Saturdays.'),
  sunday_program_id: z
    .string()
    .uuid()
    .nullable()
    .describe('ID of the thermostat daily program to run on Sundays.'),
  created_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the thermostat weekly program was created.',
    ),
})

export type ThermostatDailyProgram = z.infer<typeof thermostat_daily_program>
export type ThermostatDailyProgramPeriod = z.infer<
  typeof thermostat_daily_program_period
>
export type ThermostatWeeklyProgram = z.infer<typeof thermostat_weekly_program>
