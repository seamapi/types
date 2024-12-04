import { z } from 'zod'

import {
  acs_credential,
  acs_credential_on_encoder,
  unmanaged_acs_credential,
} from '../acs/acs-credential.js'
import {
  common_action_attempt_errors,
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('SCAN_CREDENTIAL')

const no_card_on_encoder_error = z.object({
  type: z.literal('no_card_on_encoder'),
  message: z.string(),
})

const error = z.union([
  ...common_action_attempt_errors,
  no_card_on_encoder_error,
])

const warning = z.object({
  warning_code: z.union([
    z.literal('acs_credential_on_encoder_out_of_sync'),
    z.literal('acs_credential_on_seam_not_found'),
  ]),
  warning_message: z.string(),
})

const acs_credential_on_seam = acs_credential.or(unmanaged_acs_credential)

const result = z.object({
  acs_credential_on_encoder: acs_credential_on_encoder
    .nullable()
    .describe('Snapshot of credential data read from physical encoder.'),
  acs_credential_on_seam: acs_credential_on_seam
    .nullable()
    .describe('Matching acs_credential currently encoded on this card.'),
  warnings: z.array(warning),
})

export const scan_credential_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Reading credential data from physical encoder.'),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe('Reading credential data from physical encoder succeeded.'),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe('Reading credential data from physical encoder failed.'),
])

export type ScanCredentialActionAttempt = z.infer<
  typeof scan_credential_action_attempt
>
