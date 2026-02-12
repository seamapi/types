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

const action_type = z
  .literal('SCAN_CREDENTIAL')
  .describe('Action attempt to track the status of scanning a credential.')

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

const encoder_not_online_error = z
  .object({
    type: z
      .literal('encoder_not_online')
      .describe('Error type to indicate that the encoder is not online.'),
    message: z
      .string()
      .describe(
        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
      ),
  })
  .describe('Error to indicate that the encoder is not online.')

const error = z.union([
  ...common_action_attempt_errors,
  no_credential_on_encoder_error,
  encoder_not_online_error,
])

const warning = z
  .object({
    warning_code: z
      .union([
        z.literal('acs_credential_on_encoder_out_of_sync'),
        z.literal('acs_credential_on_seam_not_found'),
      ])
      .describe('Indicates a warning related to scanning a credential.'),
    warning_message: z
      .string()
      .describe(
        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
      ),
  })
  .describe('Warning related to scanning a credential.')

const acs_credential_on_seam = acs_credential.or(unmanaged_acs_credential)

const result = z
  .object({
    acs_credential_on_encoder: acs_credential_on_encoder
      .nullable()
      .describe('Snapshot of credential data read from the physical encoder.'),
    acs_credential_on_seam: acs_credential_on_seam
      .nullable()
      .describe(
        'Corresponding credential data as stored on Seam and the access system.',
      ),
    warnings: z
      .array(warning)
      .describe(
        'Warnings related to scanning the credential, such as mismatches between the credential data currently encoded on the card and the corresponding data stored on Seam and the access system.',
      ),
  })
  .describe(
    'Result of scanning a card. If the attempt was successful, includes a snapshot of credential data read from the physical encoder, the corresponding data stored on Seam and the access system, and any associated warnings.',
  )

export const scan_credential_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Reading credential data from the physical encoder is pending.'),
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
