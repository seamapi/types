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

const action_type = z.literal('ENCODE_CREDENTIAL')

const no_card_on_encoder_error = z.object({
  type: z.literal('no_card_on_encoder'),
  message: z.string(),
})

const incompatible_card_format_error = z.object({
  type: z.literal('incompatible_card_format'),
  message: z.string(),
})

const error = z.union([
  ...common_action_attempt_errors,
  no_card_on_encoder_error,
  incompatible_card_format_error,
])

const result = acs_credential.or(unmanaged_acs_credential)

export const encode_credential_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Encoding credential data from physical encoder.'),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe('Encoding credential data from physical encoder succeeded.'),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe('Encoding credential data from physical encoder failed.'),
])

export type EncodeCredentialActionAttempt = z.infer<
  typeof encode_credential_action_attempt
>
