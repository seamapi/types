import { z } from 'zod'

export const thermostat_schedule = z.object({
  thermostat_schedule_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules).',
    ),
  device_id: z
    .string()
    .uuid()
    .describe(
      'ID of the desired [thermostat](https://docs.seam.co/latest/capability-guides/thermostats) device.',
    ),
  name: z
    .string()
    .nullable()
    .describe(
      'User-friendly name to identify the [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules).',
    ),
  climate_preset_key: z
    .string()
    .describe(
      'Key of the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) to use for the [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules).',
    ),
  max_override_period_minutes: z
    .number()
    .int()
    .positive()
    .nullable()
    .optional()
    .describe(
      "Number of minutes for which a person at the thermostat can change the thermostat's settings after the activation of the scheduled [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets). See also [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).",
    ),
  starts_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
    ),
  is_override_allowed: z
    .boolean()
    .optional()
    .describe(
      "Indicates whether a person at the thermostat can change the thermostat's settings after the [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) starts.",
    ),
  ends_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
    ),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the thermostat schedule.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) was created.',
    ),
  errors: z
    .array(
      z.object({
        error_code: z
          .string()
          .describe(
            'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.',
          ),
        message: z
          .string()
          .describe(
            'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
          ),
      }),
    )
    .describe(
      'Errors associated with the [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules).',
    ),
}).describe(`
  ---
  route_path: /thermostats/schedules
  ---
  Represents a [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) that activates a configured [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) on a [thermostat](https://docs.seam.co/latest/capability-guides/thermostats) at a specified starting time and deactivates the climate preset at a specified ending time.
`)

export type ThermostatSchedule = z.infer<typeof thermostat_schedule>
