import { z } from 'zod'

import { common_acs_event } from './common.js'

const acs_user_event = common_acs_event.extend({
  acs_user_id: z.string().uuid(),
})

export const acs_user_deleted_event = acs_user_event
  .extend({
    event_type: z.literal('acs_user.deleted'),
  })
  .describe('An ACS user was deleted.')

export type AcsUserDeletedEvent = z.infer<typeof acs_user_deleted_event>

export const acs_user_events = [acs_user_deleted_event] as const
