import { z } from 'zod'

import { acs_credential } from '../acs/acs-credential.js'
import {
  common_action_attempt_errors,
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('SCAN_TO_ASSIGN_CREDENTIAL')
  .describe(
    'Action attempt to track the status of scanning a physical card and assigning the credential to an ACS user.',
  )

const no_credential_on_encoder_error = z
  .object({
    type: z
      .literal('no_credential_on_encoder')
      .describe(
        'Error type to indicate that there is no credential on the encoder.',
      ),
    message: z
      .string()
      .describe(
        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
      ),
  })
  .describe('Error to indicate that there is no credential on the encoder.')

const error = z.union([
  ...common_action_attempt_errors,
  no_credential_on_encoder_error,
])

const result = acs_credential.describe(
  'Result of a scan to assign attempt. If the attempt was successful, includes the credential data that was scanned and assigned.',
)

export const scan_to_assign_credential_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe(
        'Scanning a physical card and assigning the credential is pending.',
      ),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe(
        'Scanning a physical card and assigning the credential succeeded.',
      ),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe(
        'Scanning a physical card and assigning the credential failed.',
      ),
  ],
)

export type ScanToAssignCredentialActionAttempt = z.infer<
  typeof scan_to_assign_credential_action_attempt
>
