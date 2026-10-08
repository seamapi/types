import * as z from 'zod/v3'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z
  .literal('SET_SPEAKER_VOLUME')
  .describe(
    'Action attempt to track the status of setting the volume on a speaker.',
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

export const set_speaker_volume_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Setting the speaker volume is pending.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Setting the speaker volume succeeded.'),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe('Setting the speaker volume failed.'),
  ],
)
