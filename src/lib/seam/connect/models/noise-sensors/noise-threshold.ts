import { z } from 'zod'

export const noise_threshold = z.object({
  noise_threshold_id: z
    .string()
    .uuid()
    .describe('Unique identifier for the noise threshold.'),
  device_id: z
    .string()
    .uuid()
    .describe(
      'Unique identifier for the device that contains the noise threshold.',
    ),
  name: z.string().describe('Name of the noise threshold.'),
  noise_threshold_nrs: z
    .number()
    .optional()
    .describe(
      'Noise level in Noiseaware Noise Risk Score (NRS) for the noise threshold. This parameter is only relevant for [Noiseaware sensors](https://docs.seam.co/latest/device-and-system-integration-guides/noiseaware-sensors).',
    ),
  starts_daily_at: z
    .string()
    .describe('Time at which the noise threshold should become active daily.'), // TODO: zoned_time
  ends_daily_at: z
    .string()
    .describe(
      'Time at which the noise threshold should become inactive daily.',
    ), // TODO: zoned_time
  noise_threshold_decibels: z
    .number()
    .describe('Noise level in decibels for the noise threshold.'),
}).describe(`
  ---
  route_path: /noise_sensors/noise_thresholds
  ---
  Represents a [noise threshold](https://docs.seam.co/latest/capability-guides/noise-sensors/configure-noise-threshold-settings) for a [noise sensor](https://docs.seam.co/latest/capability-guides/noise-sensors). Thresholds represent the limits of noise tolerated at a property, which can be customized for each hour of the day. Each device has its own default thresholds, but you can use the Seam API to modify them.
`)

export type NoiseThreshold = z.infer<typeof noise_threshold>
