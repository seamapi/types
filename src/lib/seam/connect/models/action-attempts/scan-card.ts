import { z } from 'zod'

import {
  acs_credential,
  acs_credential_on_encoder,
  unmanaged_acs_credential,
} from '../acs/acs-credential.js'
import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('SCAN_CARD')

const error = z.object({
  type: z.literal('no_card_on_encoder'),
  message: z.string(),
})

const warning = z.object({
  warning_code: z.literal('acs_credential_on_encoder_out_of_sync'),
  warning_message: z.string(),
})

const acs_credential_on_seam = acs_credential.or(unmanaged_acs_credential)

const result = z.object({
  acs_credential_on_encoder: acs_credential_on_encoder.describe(
    'Snapshot of the card data read from the physical encoder.',
  ),
  acs_credential_on_seam: acs_credential_on_seam
    .nullable()
    .describe('Matching acs_credential currently encoded on this card.'),
  warnings: z.array(warning),
})

export const scan_card_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Reading card data from physical encoder.'),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe('Reading card data from physical encoder succeeded.'),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe('Reading card data from physical encoder failed.'),
])

export type ScanCardActionAttempt = z.infer<typeof scan_card_action_attempt>
