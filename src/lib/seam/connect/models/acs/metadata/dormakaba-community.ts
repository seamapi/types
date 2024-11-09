import { z } from 'zod'

export const acs_entrance_dormakaba_community_metadata = z.object({
  access_point_name: z.string(),
})

export type AcsEntranceDormakabaCommunityMetadata = z.infer<
  typeof acs_entrance_dormakaba_community_metadata
>
