import { z } from 'zod'

import { access_code_events } from './access-codes.js'
import { access_grant_events } from './access-grants.js'
import { access_method_events } from './access-methods.js'
import { acs_events } from './acs/index.js'
import { action_attempt_events } from './action-attempts.js'
import { client_session_events } from './client-sessions.js'
import { connect_webview_events } from './connect-webviews.js'
import { connected_account_events } from './connected-accounts.js'
import { device_events } from './devices.js'
import { enrollment_automation_events } from './enrollment-automations.js'
import { phone_events } from './phones.js'

export const seam_event = z.discriminatedUnion('event_type', [
  ...access_code_events,
  ...access_grant_events,
  ...access_method_events,
  ...acs_events,
  ...client_session_events,
  ...connected_account_events,
  ...action_attempt_events,
  ...connect_webview_events,
  ...device_events,
  ...enrollment_automation_events,
  ...phone_events,
]).describe(`
  ---
  route_path: /events
  ---
`)

export type SeamEvent = z.infer<typeof seam_event>

const event_types = seam_event.options.map(
  (schema) => schema.shape.event_type.value,
)

type HasAtLeastOneElement<T> = T extends Array<infer E> ? [E, ...E[]] : never

export const seam_event_type = z.enum(
  event_types as HasAtLeastOneElement<typeof event_types>,
)

export type SeamEventType = SeamEvent['event_type']
