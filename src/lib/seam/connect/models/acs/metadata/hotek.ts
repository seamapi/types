import { z } from 'zod'

export const acs_entrance_hotek_metadata = z
  .object({
    room_number: z.string().describe('Room number of the entrance.'),
    common_area_number: z.string().describe('Display name of the entrance.'),
    common_area_name: z.string().describe('Display name of the entrance.'),
  })
  .partial()
  .describe('Hotek-specific metadata associated with the entrance.')

export type AcsEntranceHotekMetadata = z.infer<
  typeof acs_entrance_hotek_metadata
>
