import { z } from 'zod'

import { activate_climate_preset_action_attempt } from './activate-climate-preset.js'
import { deprecated_action_attempts } from './deprecated.js'
import { encode_credential_action_attempt } from './encode-credential.js'
import { lock_door_action_attempt } from './lock-door.js'
import { reset_sandbox_workspace_action_attempt } from './reset-sandbox-workspace.js'
import { scan_credential_action_attempt } from './scan-credential.js'
import { set_fan_mode_action_attempt } from './set-fan-mode.js'
import { set_hvac_mode_action_attempt } from './set-hvac-mode.js'
import { unlock_door_action_attempt } from './unlock-door.js'

export const action_attempt = z.union([
  ...lock_door_action_attempt.options,
  ...unlock_door_action_attempt.options,
  ...scan_credential_action_attempt.options,
  ...encode_credential_action_attempt.options,
  ...reset_sandbox_workspace_action_attempt.options,
  ...set_fan_mode_action_attempt.options,
  ...set_hvac_mode_action_attempt.options,
  ...activate_climate_preset_action_attempt.options,
  ...deprecated_action_attempts,
])

export type ActionAttempt = z.infer<typeof action_attempt>
