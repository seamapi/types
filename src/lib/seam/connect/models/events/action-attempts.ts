import { z } from 'zod'

import { common_event } from './common.js'

const action_attempt_event = common_event.extend({
  action_attempt_id: z.string().uuid().describe(`
    ---
    title: Action Attempt ID
    ---
    The ID of the action attempt.
  `),
  action_type: z.string().describe(`
    ---
    title: Action Type
    ---
    The type of action.
  `),
  status: z.string().describe(`
    ---
    title: Status
    ---
    The status of the action.
  `),
})

export const action_attempt_lock_door_succeeded_event = action_attempt_event
  .extend({
    event_type: z.literal('action_attempt.lock_door.succeeded'),
  })
  .describe('A lock door action attempt succeeded.')

export const action_attempt_lock_door_failed_event = action_attempt_event
  .extend({
    event_type: z.literal('action_attempt.lock_door.failed'),
  })
  .describe('A lock door action attempt failed.')
