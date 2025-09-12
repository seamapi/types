import { z } from 'zod'

import { access_code, unmanaged_access_code } from './access-codes/index.js'
import { access_grant } from './access-grants/access-grant.js'
import { access_method } from './access-grants/access-method.js'
import {
  acs_access_group,
  unmanaged_acs_access_group,
} from './acs/acs-access-group.js'
import {
  acs_credential,
  unmanaged_acs_credential,
} from './acs/acs-credential.js'
import { acs_encoder } from './acs/acs-encoder.js'
import { acs_user, unmanaged_acs_user } from './acs/acs-users/acs-user.js'
import { acs_entrance, acs_system } from './acs/index.js'
import { action_attempt } from './action-attempts/action-attempt.js'
import { client_session } from './client-sessions/client-session.js'
import { connect_webview } from './connect-webviews/connect-webview.js'
import { connected_account } from './connected-accounts/index.js'
import { customization_profile } from './customization-profiles/index.js'
import { device } from './devices/index.js'
import { unmanaged_device } from './devices/unmanaged-device.js'
import { seam_event } from './events/seam-event.js'
import { instant_key } from './instant-keys/instant-key.js'
import { noise_threshold } from './noise-sensors/noise-threshold.js'
import { space } from './spaces/index.js'
import {
  thermostat_daily_program,
  thermostat_schedule,
} from './thermostats/index.js'
import { user_identity } from './user-identities/index.js'
import { workspace } from './workspaces/index.js'

export const spaces_batch = z
  .object({
    batch_type: z.literal('spaces'),
    spaces: space.array().optional(),
    devices: device.array().optional(),
    acs_entrances: acs_entrance.array().optional(),
    connected_accounts: connected_account.array().optional(),
    acs_systems: acs_system.array().optional(),
  })
  .describe('ID of the affected access system user.')

export const access_grants_batch = z.object({
  batch_type: z.literal('access_grants'),
  spaces: space.array().optional(),
  devices: device.array().optional(),
  acs_entrances: acs_entrance.array().optional(),
  user_identities: user_identity.array().optional(),
  connected_accounts: connected_account.array().optional(),
  acs_systems: acs_system.array().optional(),
  acs_access_groups: acs_access_group.array().optional(),
})

export const access_methods_batch = z.object({
  batch_type: z.literal('access_methods'),
  spaces: space.array().optional(),
  devices: device.array().optional(),
  acs_entrances: acs_entrance.array().optional(),
  access_grants: access_grant.array().optional(),
  access_methods: access_method.array().optional(),
  instant_keys: instant_key.array().optional(),
  client_sessions: client_session.array().optional(),
})

export const workspaces_batch = z
  .object({
    batch_type: z.literal('workspaces'),
    user_identities: user_identity.array().optional(),
    workspaces: workspace.array().optional(),
    spaces: space.array().optional(),
    devices: device.array().optional(),
    acs_entrances: acs_entrance.array().optional(),
    acs_systems: acs_system.array().optional(),
    acs_users: acs_user.array().optional(),
    acs_access_groups: acs_access_group.array().optional(),
    acs_encoders: acs_encoder.array().optional(),
    acs_credentials: acs_credential.array().optional(),
    unmanaged_acs_credentials: unmanaged_acs_credential.array().optional(),
    action_attempts: action_attempt.array().optional(),
    client_sessions: client_session.array().optional(),
    unmanaged_acs_users: unmanaged_acs_user.array().optional(),
    unmanaged_acs_access_groups: unmanaged_acs_access_group.array().optional(),
    unmanaged_devices: unmanaged_device.array().optional(),
    connected_accounts: connected_account.array().optional(),
    connect_webviews: connect_webview.array().optional(),
    access_methods: access_method.array().optional(),
    access_grants: access_grant.array().optional(),
    events: seam_event.array().optional(),
    instant_keys: instant_key.array().optional(),
    access_codes: access_code.array().optional(),
    unmanaged_access_codes: unmanaged_access_code.array().optional(),
    thermostat_daily_programs: thermostat_daily_program.array().optional(),
    thermostat_schedules: thermostat_schedule.array().optional(),
    noise_thresholds: noise_threshold.array().optional(),
    customization_profiles: customization_profile.array().optional(),
  })
  .describe('A batch of workspace resources.')

export const batch = z
  .object({
    batch_type: z.enum([
      'workspaces',
      'spaces',
      'access_grants',
      'access_methods',
    ]),
    user_identities: user_identity.array().optional(),
    workspaces: workspace.array().optional(),
    spaces: space.array().optional(),
    devices: device.array().optional(),
    acs_entrances: acs_entrance.array().optional(),
    acs_systems: acs_system.array().optional(),
    acs_users: acs_user.array().optional(),
    acs_access_groups: acs_access_group.array().optional(),
    acs_encoders: acs_encoder.array().optional(),
    acs_credentials: acs_credential.array().optional(),
    unmanaged_acs_credentials: unmanaged_acs_credential.array().optional(),
    action_attempts: action_attempt.array().optional(),
    client_sessions: client_session.array().optional(),
    unmanaged_acs_users: unmanaged_acs_user.array().optional(),
    unmanaged_acs_access_groups: unmanaged_acs_access_group.array().optional(),
    unmanaged_devices: unmanaged_device.array().optional(),
    connect_webviews: connect_webview.array().optional(),
    access_methods: access_method.array().optional(),
    access_grants: access_grant.array().optional(),
    events: seam_event.array().optional(),
    instant_keys: instant_key.array().optional(),
    access_codes: access_code.array().optional(),
    unmanaged_access_codes: unmanaged_access_code.array().optional(),
    thermostat_daily_programs: thermostat_daily_program.array().optional(),
    thermostat_schedules: thermostat_schedule.array().optional(),
    noise_thresholds: noise_threshold.array().optional(),
    customization_profiles: customization_profile.array().optional(),
  })
  .describe('A batch of workspace resources.')

// TODO: Resolve type issues blocking this approach.
// export const batch = z.discriminatedUnion("batch_type", [
//   spaces_batch,
//   access_grants_batch,
//   access_methods_batch,
//   workspaces_batch,
// ]).describe(`
//   ---
//   route_path: /
//   ---
//   Represents a resource batch.
// `)

export type WorkspacesBatch = z.infer<typeof workspaces_batch>

export type Batch = z.infer<typeof batch>
