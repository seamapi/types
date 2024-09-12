import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('ACTIVATE_CLIMATE_PRESET')

const error = z.object({
  type: z.string(),
  message: z.string(),
})

const result = z.object({})

export const activate_climate_preset_action_attempt = z.discriminatedUnion(
  'status',
  [
    common_pending_action_attempt
      .extend({
        action_type,
      })
      .describe('Activating climate preset.'),
    common_succeeded_action_attempt
      .extend({
        action_type,
        result,
      })
      .describe('Activating climate preset succeeded.'),
    common_failed_action_attempt
      .extend({ action_type, error })
      .describe('Activating climate preset failed.'),
  ],
)
