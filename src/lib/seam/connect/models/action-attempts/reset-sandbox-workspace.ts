import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('RESET_SANDBOX_WORKSPACE')

const error = z.object({
  type: z.string(),
  message: z.string(),
})

const result = z.object({})

export const reset_sandbox_workspace_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Resetting sandbox workspace.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Resetting sandbox workspace succeeded.'),
    common_failed_action_attempt
      .extend({
        action_type,
        error,
      })
      .describe('Resetting sandbox workspace failed.'),
  ],
)
