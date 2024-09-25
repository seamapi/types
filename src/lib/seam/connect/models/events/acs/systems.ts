import { z } from 'zod'

import { common_acs_event } from './common.js'

const acs_system_event = common_acs_event.extend({})

export const acs_system_connected_event = acs_system_event
  .extend({
    event_type: z.literal('acs_system.connected'),
  })
  .describe('An ACS system was connected.')

export type AcsSystemConnectedEvent = z.infer<typeof acs_system_connected_event>

export const acs_system_added_event = acs_system_event
  .extend({
    event_type: z.literal('acs_system.added'),
  })
  .describe('An ACS system was added.')

export type AcsSystemAddedEvent = z.infer<typeof acs_system_added_event>

export const acs_system_events = [
  acs_system_connected_event,
  acs_system_added_event,
] as const
