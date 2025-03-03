import { z } from 'zod'

import {
  acs_entrance_assa_abloy_vostio_metadata,
  acs_entrance_dormakaba_community_metadata,
  acs_entrance_latch_metadata,
  acs_entrance_salto_ks_metadata,
  acs_entrance_visionline_metadata,
} from './metadata/index.js'
import { acs_entrance_salto_space_metadata } from './metadata/salto-space.js'

export const acs_entrance = z.object({
  acs_system_id: z
    .string()
    .uuid()
    .describe('ID of the access control system that contains the entrance.'),
  acs_entrance_id: z.string().uuid().describe('ID of the entrance.'),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the entrance was created.'),
  display_name: z.string().describe('Display name for the entrance.'),
  errors: z.array(
    z.object({
      error_code: z.string(),
      message: z.string(),
    }),
  ),
  latch_metadata: acs_entrance_latch_metadata.optional(),
  visionline_metadata: acs_entrance_visionline_metadata.optional(),
  salto_ks_metadata: acs_entrance_salto_ks_metadata.optional(),
  dormakaba_community_metadata:
    acs_entrance_dormakaba_community_metadata.optional(),
  assa_abloy_vostio_metadata:
    acs_entrance_assa_abloy_vostio_metadata.optional(),
  salto_space_metadata: acs_entrance_salto_space_metadata.optional(),
}).describe(`
  ---
  route_path: /acs/entrances
  ---
  Represents an [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details) within an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).
`)

export type AcsEntrance = z.infer<typeof acs_entrance>
