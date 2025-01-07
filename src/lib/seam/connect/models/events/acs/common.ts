import { z } from 'zod'

import { common_event } from '../common.js'

export const common_acs_event = common_event.extend({
  connected_account_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
    ),
  acs_system_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [ACS system](https://docs.seam.co/latest/capability-guides/access-systems).',
    ),
})
