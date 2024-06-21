import { z } from 'zod'

export const acs_entrance_latch_metadata = z.object({
  accessibility_type: z.string(),
  door_name: z.string(),
  door_type: z.string(),
  is_connected: z.boolean(),
})

export type AcsEntranceLatchMetadata = z.infer<
  typeof acs_entrance_latch_metadata
>
