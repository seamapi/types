import { z } from 'zod'

export const acs_entrance_salto_metadata = z.object({
  door_name: z.string(),
})

export type AcsEntranceSaltoMetadata = z.infer<
  typeof acs_entrance_salto_metadata
>
