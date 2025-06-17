import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('SIMULATE_MANUAL_LOCK_VIA_KEYPAD')
  .describe(
    'Action attempt to track the status of simulating a manual lock action using a keypad.',
  )

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

const result = z.object({}).describe('Result of the action.')

export const simulate_manual_lock_via_keypad_action_attempt =
  z.discriminatedUnion('status', [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Simulating a manual lock action using a keypad is pending.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Simulating a manual lock action using a keypad succeeded.'),
    common_failed_action_attempt
      .extend({
        action_type,
        error,
      })
      .describe('Simulating a manual lock action using a keypad failed.'),
  ])
