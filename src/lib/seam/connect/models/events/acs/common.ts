import { z } from 'zod'

import { common_event } from '../common.js'

export const common_acs_event = common_event.extend({
  connected_account_id: z.string().uuid().optional().describe(`
    ---
    title: Connected Account ID
    deprecated: Will be removed.
    ---
    ID of the connected account.
  `),
  acs_system_id: z.string().uuid().describe(`
    ---
    title: ACS System ID
    ---
    ID of the ACS system.
  `),
})
