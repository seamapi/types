import { z } from 'zod'

import { common_acs_event } from './common.js'

const acs_system_event = common_acs_event.extend({})

export const acs_system_connected_event = acs_system_event.extend({
  event_type: z.literal('acs_system.connected'),
}).describe(`
    ---
    route_path: /acs/systems
    ---
    An [access system](https://docs.seam.co/latest/capability-guides/access-systems) was connected.
  `)

export type AcsSystemConnectedEvent = z.infer<typeof acs_system_connected_event>

export const acs_system_disconnected_event = acs_system_event.extend({
  event_type: z.literal('acs_system.disconnected'),
}).describe(`
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
