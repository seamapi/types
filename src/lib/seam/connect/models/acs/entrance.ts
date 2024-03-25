import { z } from 'zod'

export const acs_entrance_latch_metadata = z.object({
  accessibility_type: z.string(),
  name: z.string(),
  type: z.string(),
  is_connected: z.boolean(),
})

export const acs_entrance = z.object({
  acs_entrance_id: z.string().uuid(),
  display_name: z.string(),
  acs_system_id: z.string().uuid(),
  created_at: z.string().datetime(),
  latch_metadata: acs_entrance_latch_metadata.nullable(),
  visionline_metadata: z
    .object({
      door_name: z.string(),
      door_category: z.enum([
        'entrance',
        'guest',
        'elevator reader',
        'common',
        'common (PMS)',
      ]),
      profiles: z
        .array(
          z.object({
            visionline_door_profile_id: z.string(),
            visionline_door_profile_type: z.enum([
              'BLE',
              'commonDoor',
              'touch',
            ]),
          }),
        )
        .optional(),
    })
    .nullable(),
})
export type AcsEntranceLatchMetadata = z.infer<
  typeof acs_entrance_latch_metadata
>

export type AcsEntrance = z.infer<typeof acs_entrance>
