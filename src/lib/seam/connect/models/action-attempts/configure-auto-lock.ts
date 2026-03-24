import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('CONFIGURE_AUTO_LOCK')
  .describe(
    'Action attempt to track the status of configuring the auto-lock on a lock.',
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

export const configure_auto_lock_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Configuring the auto-lock is pending.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Configuring the auto-lock succeeded.'),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe('Configuring the auto-lock failed.'),
  ],
)
