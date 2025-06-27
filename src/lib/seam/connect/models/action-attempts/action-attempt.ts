import { z } from 'zod'

import { activate_climate_preset_action_attempt } from './activate-climate-preset.js'
import { deprecated_action_attempts } from './deprecated.js'
import { encode_credential_action_attempt } from './encode-credential.js'
import { lock_door_action_attempt } from './lock-door.js'
import { push_thermostat_programs_action_attempt } from './push-thermostat-programs.js'
import { reset_sandbox_workspace_action_attempt } from './reset-sandbox-workspace.js'
import { scan_credential_action_attempt } from './scan-credential.js'
import { set_fan_mode_action_attempt } from './set-fan-mode.js'
import { set_hvac_mode_action_attempt } from './set-hvac-mode.js'
import { simulate_keypad_code_entry_action_attempt } from './simulate-keypad-code-entry.js'
import { simulate_manual_lock_via_keypad_action_attempt } from './simulate-manual-lock-via-keypad.js'
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
  ...simulate_keypad_code_entry_action_attempt.options,
  ...simulate_manual_lock_via_keypad_action_attempt.options,
  ...push_thermostat_programs_action_attempt.options,
  ...deprecated_action_attempts,
]).describe(`
  ---
  route_path: /action_attempts
  ---
  Represents an action attempt that enables you to keep track of the progress of your action that affects a physical device or system.actions against a device. Action attempts are useful because the physical world is intrinsically asynchronous.

  When you request for a device to perform an action, the Seam API immediately returns an action attempt object. In the background, the Seam API performs the action.

  See also [Action Attempts](https://docs.seam.co/latest/core-concepts/action-attempts).
`)

export type ActionAttempt = z.infer<typeof action_attempt>
