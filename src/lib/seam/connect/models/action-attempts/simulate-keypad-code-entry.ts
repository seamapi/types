import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('SIMULATE_KEYPAD_CODE_ENTRY')

const error = z.object({
  type: z.string(),
  message: z.string(),
})

const result = z.object({})

export const simulate_keypad_code_entry_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Simulating keypad code entry.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Simulating keypad code entry succeeded.'),
    common_failed_action_attempt
      .extend({
        action_type,
        error,
      })
      .describe('Simulating keypad code entry failed.'),
  ],
)
