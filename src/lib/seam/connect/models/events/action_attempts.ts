import { z } from 'zod'

import { common_event } from 'lib/seam/connect/models/events/common.js'

const action_attempt_lock_door_failed_event = common_event
  .extend({
    event_type: z.literal('action_attempt.lock_door.failed'),
  })
  .describe('The door could not be locked.')

const action_attempt_lock_door_succeeded_event = common_event
  .extend({
    event_type: z.literal('action_attempt.lock_door.succeeded'),
  })
  .describe('The door was successfully locked.')

export const action_attempt_events = [
  action_attempt_lock_door_failed_event,
  action_attempt_lock_door_succeeded_event,
] as const
