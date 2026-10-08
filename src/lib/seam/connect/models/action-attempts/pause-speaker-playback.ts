import * as z from 'zod/v3'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('PAUSE_SPEAKER_PLAYBACK')
  .describe(
    'Action attempt to track the status of pausing playback on a speaker.',
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

const result = z
  .object({
    affected_device_ids: z
      .array(z.string().uuid())
      .describe(
        'IDs of the speakers whose playback was paused, including speakers grouped with the requested speaker.',
      ),
  })
  .describe('Result of the action.')

export const pause_speaker_playback_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Pausing playback on the speaker is pending.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Pausing playback on the speaker succeeded.'),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe('Pausing playback on the speaker failed.'),
  ],
)
