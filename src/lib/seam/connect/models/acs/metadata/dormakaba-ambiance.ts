import { z } from 'zod'

export const acs_entrance_dormakaba_ambiance_metadata = z
  .object({
    access_point_name: z
      .string()
      .describe(
        'Name of the access point in the dormakaba Ambiance access system.',
      ),
  })
  .describe(
    'dormakaba Ambiance-specific metadata associated with the entrance.',
  )

export type AcsEntranceDormakabaAmbianceMetadata = z.infer<
  typeof acs_entrance_dormakaba_ambiance_metadata
>
