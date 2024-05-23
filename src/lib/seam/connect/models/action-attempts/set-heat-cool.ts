import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('SET_HEAT_COOL')

const error = z.object({
  type: z.string(),
  message: z.string(),
})

const result = z.object({})

export const set_heat_cool_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt
    .extend({
      action_type,
    })
    .describe('Setting HVAC to heat-cool mode.'),
  common_succeeded_action_attempt
    .extend({
      action_type,
      result,
    })
    .describe('Setting HVAC to heat-cool mode succeeded.'),
  common_failed_action_attempt
    .extend({ action_type, error })
    .describe('Setting heat-cool mode failed.'),
])
