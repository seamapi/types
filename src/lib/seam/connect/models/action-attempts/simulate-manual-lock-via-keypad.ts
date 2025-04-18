import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('SIMULATE_MANUAL_LOCK_VIA_KEYPAD')

const error = z.object({
  type: z.string(),
  message: z.string(),
})

const result = z.object({})

export const simulate_manual_lock_via_keypad_action_attempt =
  z.discriminatedUnion('status', [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Simulating manual lock via keypad.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Simulating manual lock via keypad succeeded.'),
    common_failed_action_attempt
      .extend({
        action_type,
        error,
      })
      .describe('Simulating manual lock via keypad failed.'),
  ])
