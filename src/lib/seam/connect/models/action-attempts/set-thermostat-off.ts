import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('SET_THERMOSTAT_OFF')

const error = z.object({
  type: z.string(),
  message: z.string(),
})

const result = z.object({})

export const set_thermostat_off_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Turning HVAC off.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Turning HVAC off succeeded.'),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe('Turning HVAC off failed.'),
  ],
)
