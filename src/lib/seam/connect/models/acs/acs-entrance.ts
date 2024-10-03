import { z } from 'zod'

import {
  acs_entrance_latch_metadata,
  acs_entrance_salto_ks_metadata,
  acs_entrance_visionline_metadata,
} from './metadata/index.js'

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
})

export type AcsEntrance = z.infer<typeof acs_entrance>
