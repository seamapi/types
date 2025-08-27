import { z } from 'zod'

export const acs_entrance_dormakaba_community_metadata = z
  .object({
    access_point_name: z
      .string()
      .describe(
        'Name of the access point in the dormakaba Community access system.',
      ),
    access_point_profile: z
      .string()
      .describe(
        'Type of access point profile in the dormakaba Community access system.',
      ),
  })
  .describe(
    'dormakaba Community-specific metadata associated with the entrance.',
  )

export type AcsEntranceDormakabaCommunityMetadata = z.infer<
  typeof acs_entrance_dormakaba_community_metadata
>
