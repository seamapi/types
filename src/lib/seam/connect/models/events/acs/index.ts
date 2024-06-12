import { acs_credential_events } from './credentials.js'
import { acs_system_events } from './systems.js'
import { acs_user_events } from './users.js'

export const acs_events = [
  ...acs_system_events,
  ...acs_credential_events,
  ...acs_user_events,
] as const
