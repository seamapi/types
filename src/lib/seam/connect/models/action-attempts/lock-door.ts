import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('LOCK_DOOR')

const error = z.object({
  type: z.string(),
  message: z.string(),
})

const result = z.object({})

export const lock_door_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Locking door.'),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe('Locking door succeeded.'),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe('Locking door failed.'),
])

export type LockDoorActionAttempt = z.infer<typeof lock_door_action_attempt>
