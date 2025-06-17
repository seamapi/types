import { z } from 'zod'

export const start_end_schedule = z
  .object({
    starts_at: z
      .string()
      .datetime()
      .describe(
        "Date and time at which the user's access starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.",
      ),
    ends_at: z
      .string()
      .datetime()
      .describe(
        "Date and time at which the user's access ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.",
      )
      .nullable(),
  })
  .describe(
    'Schedule with starting and ending dates and times, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
  )

// export const schedule = z.union([
//   start_end_schedule,
//   daily_schedule,
//   weekly_schedule
// ])
export const schedule = start_end_schedule
