import { z } from 'zod'

import { access_method } from '../access-grants/access-method.js'
import {
  common_action_attempt_errors,
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('ASSIGN_CREDENTIAL')
  .describe(
    'Action attempt to track the status of assigning a pre-registered card credential to an access method.',
  )

const credential_not_found_error = z
  .object({
    type: z
      .literal('credential_not_found')
      .describe(
        'Error type to indicate that no matching credential was found.',
      ),
    message: z
      .string()
      .describe(
        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
      ),
  })
  .describe('Error to indicate that no matching credential was found.')

const error = z.union([
  ...common_action_attempt_errors,
  credential_not_found_error,
])

const result = access_method.describe(
  'Result of assigning a credential. If successful, includes the updated access method with the assigned credential.',
)

export const assign_credential_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Assigning a credential to an access method is pending.'),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe('Assigning a credential to an access method succeeded.'),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe('Assigning a credential to an access method failed.'),
])

export type AssignCredentialActionAttempt = z.infer<
  typeof assign_credential_action_attempt
>
