import * as z from 'zod'

import { action_attempt_events } from 'lib/seam/connect/models/events/action_attempts.js'

import { access_code_events } from './access-codes.js'
import { acs_events } from './acs/index.js'
import { client_session_events } from './client-sessions.js'
import { connected_account_events } from './connected-accounts.js'
import { device_events } from './devices.js'
import { enrollment_automation_events } from './enrollment-automations.js'
import { phone_events } from './phones.js'

export const seam_event = z.discriminatedUnion('event_type', [
  ...access_code_events,
  ...action_attempt_events,
  ...acs_events,
  ...client_session_events,
  ...connected_account_events,
  ...device_events,
  ...enrollment_automation_events,
  ...phone_events,
])

export type SeamEvent = z.infer<typeof seam_event>

export type SeamEventType = SeamEvent['event_type']
