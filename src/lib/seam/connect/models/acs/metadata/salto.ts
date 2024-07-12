import { z } from 'zod'

export const acs_entrance_salto_metadata = z.object({})

export type AcsEntranceSaltoMetadata = z.infer<
  typeof acs_entrance_salto_metadata
>
