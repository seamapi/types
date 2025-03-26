import { z } from 'zod'

import {
  acs_credential,
  unmanaged_acs_credential,
} from '../acs/acs-credential.js'
import {
  common_action_attempt_errors,
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('ENCODE_CREDENTIAL')
  .describe('Type of action that the action attempt tracks.')

const no_credential_on_encoder_error = z.object({
  type: z.literal('no_credential_on_encoder'),
  message: z.string(),
})

const incompatible_card_format_error = z.object({
  type: z.literal('incompatible_card_format'),
  message: z.string(),
})

const credential_cannot_be_reissued = z.object({
  type: z.literal('credential_cannot_be_reissued'),
  message: z.string(),
})

const error = z.union([
  ...common_action_attempt_errors,
  no_credential_on_encoder_error,
  incompatible_card_format_error,
  credential_cannot_be_reissued,
])

const result = acs_credential
  .or(unmanaged_acs_credential)
  .describe(
    'If an encoding attempt was successful, includes the `acs_credential` data that was encoded onto the card.',
  )

export const encode_credential_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe(
      'Action attempt to track encoding credential data from the physical encoder onto a card.',
    ),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe(
      'Action attempt to indicate that encoding credential data from the physical encoder onto a card succeeded.',
    ),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe(
      'Action attempt to indicate that encoding credential data from the physical encoder onto a card failed.',
    ),
])

export type EncodeCredentialActionAttempt = z.infer<
  typeof encode_credential_action_attempt
>
