import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('ENCODE_CARD')

const error = z.object({
  type: z.string(), // TODO This should be typed properly with the possible errors
  message: z.string(),
})

const result = z.object({})

export const encode_card_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Encoding card data from physical encoder.'),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe('Encoding card data from physical encoder succeeded.'),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe('Encoding card data from physical encoder failed.'),
])

export type EncodeCardActionAttempt = z.infer<typeof encode_card_action_attempt>
