import { z } from 'zod'

export const acs_entrance_latch_metadata = z
  .object({
    accessibility_type: z
      .string()
      .optional()
      .describe('Accessibility type in the Latch access system.'),
    door_name: z
      .string()
      .optional()
      .describe('Name of the door in the Latch access system.'),
    door_type: z
      .string()
      .optional()
      .describe('Type of the door in the Latch access system.'),
    is_connected: z
      .boolean()
      .optional()
      .describe('Indicates whether the entrance is connected.'),
  })
  .partial()
  .describe('Latch-specific metadata associated with the entrance.')

export type AcsEntranceLatchMetadata = z.infer<
  typeof acs_entrance_latch_metadata
>
