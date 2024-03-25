import { z } from 'zod'

export const lock_capability_properties = z.object({
  locked: z.boolean().optional(),
  keypad_battery: z
    .object({
      level: z.number(),
    })
    .optional(),
  door_open: z.boolean().optional(),
})
