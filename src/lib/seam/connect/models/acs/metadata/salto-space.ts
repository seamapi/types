import { z } from 'zod'

export const acs_entrance_salto_space_metadata = z.object({
  door_name: z.string(),
  ext_door_id: z.string(),
  door_description: z.string().optional(),
})

export type AcsEntranceSaltoSpaceMetadata = z.infer<
  typeof acs_entrance_salto_space_metadata
>
