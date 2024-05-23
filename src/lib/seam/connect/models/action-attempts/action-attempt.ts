import { z } from 'zod'

import { lock_door_action_attempt } from './lock-door.js'
import { reset_sandbox_workspace_action_attempt } from './reset-sandbox-workspace.js'
import { set_cool_action_attempt } from './set-cool.js'
import { set_fan_mode_action_attempt } from './set-fan-mode.js'
import { set_heat_action_attempt } from './set-heat.js'
import { set_heat_cool_action_attempt } from './set-heat-cool.js'
import { set_thermostat_off_action_attempt } from './set-thermostat-off.js'
import { unlock_door_action_attempt } from './unlock-door.js'

export const action_attempt = z.union([
  ...lock_door_action_attempt.options,
  ...unlock_door_action_attempt.options,
  ...reset_sandbox_workspace_action_attempt.options,
  ...set_cool_action_attempt.options,
  ...set_heat_action_attempt.options,
  ...set_heat_cool_action_attempt.options,
  ...set_fan_mode_action_attempt.options,
  ...set_thermostat_off_action_attempt.options,
])

export type ActionAttempt = z.infer<typeof action_attempt>

export type ActionAttemptType = ActionAttempt['action_type']
