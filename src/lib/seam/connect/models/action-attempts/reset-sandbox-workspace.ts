import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('RESET_SANDBOX_WORKSPACE')
  .describe(
    'Action attempt to track the status of resetting a sandbox workspace.',
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

export const reset_sandbox_workspace_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Resetting a sandbox workspace is pending.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Resetting a sandbox workspace succeeded.'),
    common_failed_action_attempt
      .extend({
        action_type,
        error,
      })
      .describe('Resetting a sandbox workspace failed.'),
  ],
)
