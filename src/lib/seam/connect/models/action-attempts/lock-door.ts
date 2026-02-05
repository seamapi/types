import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('LOCK_DOOR')
  .describe('Action attempt to track the status of locking a door.')

const error = z
  .object({
    type: z.string().describe('Type of the error.'),
    message: z
      .string()
      .describe(
        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
      ),
  })
  .describe('Error associated with the action.')

const result = z
  .object({
    was_confirmed_by_device: z
      .boolean()
      .optional()
      .describe(
        'Indicates whether the device confirmed that the lock action occurred.',
      ),
  })
  .describe('Result of the action.')

export const lock_door_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Locking a door is pending.'),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe('Locking a door succeeded.'),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe('Locking a door failed.'),
])

export type LockDoorActionAttempt = z.infer<typeof lock_door_action_attempt>
