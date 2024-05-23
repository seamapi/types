import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('UNLOCK_DOOR')

const error = z.object({
  type: z.string(),
  message: z.string(),
})

const result = z.object({})

export const unlock_door_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Unlocking door.'),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe('Unlocking door succeeded.'),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe('Unlocking door failed.'),
])

export type UnlockDoorActionAttempt = z.infer<typeof unlock_door_action_attempt>
