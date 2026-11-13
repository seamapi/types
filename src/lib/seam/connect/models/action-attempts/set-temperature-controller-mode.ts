import * as z from 'zod/v3'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const action_type = z.literal('SET_TEMPERATURE_CONTROLLER_MODE').describe(`
    ---
    undocumented: Unreleased.
    ---
    Action attempt to track the status of setting the mode of a temperature controller, such as heating pool or spa water to a set point or turning its heating off. The attempt succeeds only once the controller reports the requested state back.
    `)

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

export const set_temperature_controller_mode_action_attempt =
  z.discriminatedUnion('status', [
    common_pending_action_attempt.extend({
      action_type,
    }).describe(`
    ---
    undocumented: Unreleased.
    ---
    Setting the temperature controller mode is pending. The controller has not yet reported the requested state back.
    `),
    common_succeeded_action_attempt.extend({
      action_type,
      result,
    }).describe(`
    ---
    undocumented: Unreleased.
    ---
    Setting the temperature controller mode succeeded. The controller reported the requested state back.
    `),
    common_failed_action_attempt.extend({ action_type, error }).describe(`
    ---
    undocumented: Unreleased.
    ---
    Setting the temperature controller mode failed.
    `),
  ])
