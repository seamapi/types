import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('SIMULATE_KEYPAD_CODE_ENTRY')
  .describe(
    'Action attempt to track the status of simulating a keypad code entry.',
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

export const simulate_keypad_code_entry_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Simulating a keypad code entry is pending.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Simulating a keypad code entry succeeded.'),
    common_failed_action_attempt
      .extend({
        action_type,
        error,
      })
      .describe('Simulating a keypad code entry failed.'),
  ],
)
