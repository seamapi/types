import { z } from 'zod'

import { access_method } from '../access-grants/access-method.js'
import {
  common_action_attempt_errors,
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('ENCODE_ACCESS_METHOD')
  .describe(
    'Action attempt to track the status of encoding an access method from the physical encoder onto a card.',
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

const incompatible_card_format_error = z
  .object({
    type: z
      .literal('incompatible_card_format')
      .describe('Error type to indicate an incompatible card format.'),
    message: z
      .string()
      .describe(
        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
      ),
  })
  .describe('Error to indicate an incompatible card format.')

const credential_cannot_be_reissued = z
  .object({
    type: z
      .literal('credential_cannot_be_reissued')
      .describe(
        'Error type to indicate that the affected credential cannot be reissued.',
      ),
    message: z
      .string()
      .describe(
        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
      ),
  })
  .describe(
    'Error to indicate that the affected credential cannot be reissued.',
  )

const error = z.union([
  ...common_action_attempt_errors,
  no_credential_on_encoder_error,
  incompatible_card_format_error,
  credential_cannot_be_reissued,
])

const result = access_method.describe(
  'Result of an encoding attempt. If the attempt was successful, includes the access method data that was encoded onto the card.',
)

export const encode_access_method_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe(
        'Encoding access method data from the physical encoder onto a card is pending.',
      ),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe(
        'Encoding access method data from the physical encoder onto a card succeeded.',
      ),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe(
        'Encoding access method data from the physical encoder onto a card failed.',
      ),
  ],
)

export type EncodeAccessMethodActionAttempt = z.infer<
  typeof encode_access_method_action_attempt
>
