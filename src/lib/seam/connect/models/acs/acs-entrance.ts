import { z } from 'zod'

import { acs_entrance_dormakaba_ambiance_metadata } from './metadata/dormakaba-ambiance.js'
import {
  acs_entrance_assa_abloy_vostio_metadata,
  acs_entrance_dormakaba_community_metadata,
  acs_entrance_hotek_metadata,
  acs_entrance_latch_metadata,
  acs_entrance_salto_ks_metadata,
  acs_entrance_visionline_metadata,
} from './metadata/index.js'
import { acs_entrance_salto_space_metadata } from './metadata/salto-space.js'

export const acs_entrance_capability_flags = z.object({
  can_unlock_with_mobile_key: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the ACS entrance can be unlocked with mobile key credentials.',
    ),
  can_unlock_with_card: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the ACS entrance can be unlocked with card credentials.',
    ),
  can_unlock_with_code: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the ACS entrance can be unlocked with pin codes.',
    ),
})

export const acs_entrance = z
  .object({
    acs_system_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) that contains the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    acs_entrance_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    space_ids: z
      .array(z.string().uuid())
      .describe('IDs of the spaces that the entrance is in.'),
    created_at: z
      .string()
      .datetime()
      .describe(
        'Date and time at which the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details) was created.',
      ),
    display_name: z
      .string()
      .describe(
        'Display name for the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    connected_account_id: z
      .string()
      .uuid()
      .describe(
        'ID of the [connected account](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details) associated with the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    errors: z
      .array(
        z.object({
          error_code: z
            .string()
            .describe(
              'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.',
            ),
          message: z
            .string()
            .describe(
              'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
            ),
        }),
      )
      .describe(
        'Errors associated with the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    latch_metadata: acs_entrance_latch_metadata
      .optional()
      .describe(
        'Latch-specific metadata associated with the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    hotek_metadata: acs_entrance_hotek_metadata
      .optional()
      .describe(
        'Hotek-specific metadata associated with the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    visionline_metadata: acs_entrance_visionline_metadata
      .optional()
      .describe(
        'Visionline-specific metadata associated with the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    salto_ks_metadata: acs_entrance_salto_ks_metadata
      .optional()
      .describe(
        'Salto KS-specific metadata associated with the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    dormakaba_community_metadata: acs_entrance_dormakaba_community_metadata
      .optional()
      .describe(
        'dormakaba Community-specific metadata associated with the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    assa_abloy_vostio_metadata: acs_entrance_assa_abloy_vostio_metadata
      .optional()
      .describe(
        'ASSA ABLOY Vostio-specific metadata associated with the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    salto_space_metadata: acs_entrance_salto_space_metadata
      .optional()
      .describe(
        'Salto Space-specific metadata associated with the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
    dormakaba_ambiance_metadata: acs_entrance_dormakaba_ambiance_metadata
      .optional()
      .describe(
        'dormakaba Ambiance-specific metadata associated with the [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
      ),
  })
  .merge(acs_entrance_capability_flags).describe(`
  ---
  route_path: /acs/entrances
  ---
  Represents an [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details) within an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).

  In an access control system, an entrance is a secured door, gate, zone, or other method of entry. You can list details for all the \`acs_entrance\` resources in your workspace or get these details for a specific \`acs_entrance\`. You can also list all entrances associated with a specific credential, and you can list all credentials associated with a specific entrance.
`)

export type AcsEntrance = z.infer<typeof acs_entrance>
