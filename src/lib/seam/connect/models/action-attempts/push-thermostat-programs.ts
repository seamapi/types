import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('PUSH_THERMOSTAT_PROGRAMS')
  .describe(
    'Action attempt to track the status of pushing thermostat programs.',
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

export const push_thermostat_programs_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Pushing thermostat weekly programs is pending.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Pushing thermostat weekly programs succeeded.'),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe('Pushing thermostat weekly programs failed.'),
  ],
)
