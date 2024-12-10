import { z } from 'zod'

export const acs_entrance_dormakaba_community_metadata = z.object({
  access_point_name: z.string(),
  common_area_number: z.number().optional(),
  inner_access_points_names: z.array(z.string()).optional(),
})

export type AcsEntranceDormakabaCommunityMetadata = z.infer<
  typeof acs_entrance_dormakaba_community_metadata
>
