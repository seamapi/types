import { z } from 'zod'

export const acs_entrance_salto_ks_metadata = z.object({
  door_name: z.string(),
  locked_state: z.string(),
  lock_type: z.string(),
  online: z.boolean(),
  battery_level: z.string(),
  left_open_alarm: z.boolean(),
  intrusion_alarm: z.boolean(),
  privacy_mode: z.boolean(),
})

export type AcsEntranceSaltoKSMetadata = z.infer<
  typeof acs_entrance_salto_ks_metadata
>
