import { z } from 'zod'

export const lock_capability_properties = z.object({
  locked: z.boolean().optional().describe(`
          ---
          property_group_key: locks
          ---
          Indicates whether the lock is locked.
          `),
  keypad_battery: z
    .object({
      level: z.number().describe(`
          Keypad battery charge level.
          `),
    })
    .optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Keypad battery status.
          `),
  door_open: z.boolean().optional().describe(`
          ---
          property_group_key: locks
          ---
          Indicates whether the door is open.
          `),
})
