import { acs_access_group_events } from './access-groups.js'
import { acs_credential_events } from './credentials.js'
import { acs_encoder_events } from './encoders.js'
import { acs_entrance_events } from './entrances.js'
import { acs_system_events } from './systems.js'
import { acs_user_events } from './users.js'

export const acs_events = [
  ...acs_system_events,
  ...acs_credential_events,
  ...acs_user_events,
  ...acs_encoder_events,
  ...acs_access_group_events,
  ...acs_entrance_events,
] as const
