import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('PUSH_THERMOSTAT_PROGRAMS')

const error = z.object({
  type: z.string(),
  message: z.string(),
})

const result = z.object({})

export const push_thermostat_programs_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Pushing thermostat weekly programs.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Pushing thermostat weekly programs succeeded.'),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe('Pushing thermostat weekly programs failed.'),
  ],
)
