import { z } from 'zod'

export const thermostat_schedule = z
  .object({
    thermostat_schedule_id: z
      .string()
      .uuid()
      .describe('ID of the thermostat schedule.'),
    device_id: z
      .string()
      .uuid()
      .describe('ID of the desired thermostat device.'),
    name: z
      .string()
      .optional()
      .describe('User-friendly name to identify the thermostat schedule.'),
    climate_preset_key: z
      .string()
      .describe(
        'Key of the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) to use for the thermostat schedule.',
      ),
    max_override_period_minutes: z
      .number()
      .int()
      .nonnegative()
      .describe(
        "Number of minutes for which a person at the thermostat can change the thermostat's settings after the activation of the scheduled climate preset. See also [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).",
      ),
    starts_at: z
      .string()
      .datetime()
      .describe(
        'Date and time at which the thermostat schedule starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
      ),
    unstable_is_override_allowed: z
      .boolean()
      .optional()
      .describe(
        `
        ---
        undocumented: Unstable
        ---
        Indicates whether a person at the thermostat can change the thermostat's settings.`,
      ),
    ends_at: z
      .string()
      .datetime()
      .describe(
        'Date and time at which the thermostat schedule ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
      ),
    created_at: z
      .string()
      .datetime()
      .describe('Date and time at which the thermostat schedule was created.'),
    errors: z
      .any()
      .describe(
        'Array of errors associated with the thermostat schedule. Each error object within the array contains two fields: `error_code` and `message`. `error_code` is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. `message` provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.',
      ),
  })
  .describe(
    'Represents a [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) that activates a configured [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) on a [thermostat](https://docs.seam.co/latest/capability-guides/thermostats) at a specified starting time and deactivates the climate preset at a specified ending time.',
  )

export type ThermostatSchedule = z.infer<typeof thermostat_schedule>
