import { z } from 'zod'

export const noise_threshold = z.object({
  noise_threshold_id: z.string().uuid(),
  device_id: z.string().uuid(),
  name: z.string(),
  noise_threshold_nrs: z.number().optional(),
  starts_daily_at: z.string(), // TODO: zoned_time
  ends_daily_at: z.string(), // TODO: zoned_time
  noise_threshold_decibels: z.number(),
})

export type NoiseThreshold = z.infer<typeof noise_threshold>
