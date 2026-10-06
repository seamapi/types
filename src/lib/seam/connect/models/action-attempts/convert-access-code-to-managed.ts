import * as z from 'zod/v3'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('CONVERT_ACCESS_CODE_TO_MANAGED')
  .describe(
    'Action attempt to track the status of converting an unmanaged access code to a managed access code.',
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

export const convert_access_code_to_managed_action_attempt =
  z.discriminatedUnion('status', [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Converting an unmanaged access code to managed is pending.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Converting an unmanaged access code to managed succeeded.'),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe('Converting an unmanaged access code to managed failed.'),
  ])
