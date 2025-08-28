import { z } from 'zod'

export const acs_entrance_hotek_metadata = z
  .object({
    room_number: z.string().describe('Room number of the entrance.'),
    display_name: z.string().describe('Display name of the entrance.'),
    door_type: z.enum(['common_area', 'guest']).describe('Type of door.'),
  })
  .describe('Hotek-specific metadata associated with the entrance.')

export type AcsEntranceHotekMetadata = z.infer<
  typeof acs_entrance_hotek_metadata
>
