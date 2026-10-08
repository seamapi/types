import * as z from 'zod/v3'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('PLAY_SPEAKER_CHIME')
  .describe(
    'Action attempt to track the status of playing a chime on a speaker.',
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

export const play_speaker_chime_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Playing a chime on the speaker is pending.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Playing a chime on the speaker succeeded.'),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe('Playing a chime on the speaker failed.'),
  ],
)
