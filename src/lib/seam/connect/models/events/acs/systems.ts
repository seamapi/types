import { z } from 'zod'

import { common_event_error, common_event_warning } from '../common.js'
import { common_acs_event } from './common.js'

const acs_system_event = common_acs_event.extend({})

const acs_system_event_issue_properties = {
  acs_system_errors: z
    .array(common_event_error)
    .describe('Errors associated with the access control system.'),
  acs_system_warnings: z
    .array(common_event_warning)
    .describe('Warnings associated with the access control system.'),
  connected_account_errors: z
    .array(common_event_error)
    .describe('Errors associated with the connected account.'),
  connected_account_warnings: z
    .array(common_event_warning)
    .describe('Warnings associated with the connected account.'),
}

export const acs_system_connected_event = acs_system_event.extend({
  event_type: z.literal('acs_system.connected'),
}).describe(`
    ---
    route_path: /acs/systems
    ---
    An [access system](https://docs.seam.co/latest/capability-guides/access-systems) was connected.
  `)

export type AcsSystemConnectedEvent = z.infer<typeof acs_system_connected_event>

export const acs_system_disconnected_event = acs_system_event
  .extend({
    event_type: z.literal('acs_system.disconnected'),
  })
  .extend(acs_system_event_issue_properties).describe(`
    ---
    route_path: /acs/systems
    ---
    An [access system](https://docs.seam.co/latest/capability-guides/access-systems) was disconnected.
  `)

export type AcsSystemDisconnectedEvent = z.infer<
  typeof acs_system_disconnected_event
>

export const acs_system_added_event = acs_system_event.extend({
  event_type: z.literal('acs_system.added'),
}).describe(`
    ---
    route_path: /acs/systems
    ---
    An [access system](https://docs.seam.co/latest/capability-guides/access-systems) was added.
  `)

export type AcsSystemAddedEvent = z.infer<typeof acs_system_added_event>

export const acs_system_events = [
  acs_system_connected_event,
  acs_system_added_event,
  acs_system_disconnected_event,
] as const
