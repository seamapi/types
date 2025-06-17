import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('SET_FAN_MODE')
  .describe(
    'Action attempt to track the status of setting the fan mode on a thermostat.',
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

export const set_fan_mode_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Setting the fan mode is pending.'),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe('Setting the fan mode succeeded.'),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe('Setting the fan mode failed.'),
])
