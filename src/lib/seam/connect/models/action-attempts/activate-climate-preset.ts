import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('ACTIVATE_CLIMATE_PRESET')
  .describe(
    'Action attempt to track the status of a climate preset activation.',
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

export const activate_climate_preset_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Activating a climate preset is pending.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Activating a climate preset succeeded.'),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe('Activating a climate preset failed.'),
  ],
)
