import { z } from 'zod'

export const acs_entrance_salto_ks_metadata = z.object({
  door_name: z.string(),
  locked_state: z.string(),
  lock_type: z.string(),
  online: z.boolean().optional(),
  battery_level: z.string(),
  left_open_alarm: z.boolean().optional(),
  intrusion_alarm: z.boolean().optional(),
  privacy_mode: z.boolean().optional(),
})

export type AcsEntranceSaltoKSMetadata = z.infer<
  typeof acs_entrance_salto_ks_metadata
>
