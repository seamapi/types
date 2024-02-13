import { z } from 'zod'

export const hardware = z
  .object({
    has_physical_key: z.boolean(),
  })
  .partial()
