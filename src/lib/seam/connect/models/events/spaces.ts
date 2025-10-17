import { z } from 'zod'

import { common_event } from './common.js'

const space_event = common_event.extend({
  space_id: z.string().uuid().describe('ID of the affected space.'),
})

export const space_device_membership_changed_event = space_event.extend({
  event_type: z
    .literal('space.device_membership_changed')
    .describe('Type of the event.'),
  space_key: z
    .string()
    .optional()
    .describe('Unique key for the space within the workspace.'),
  device_ids: z
    .array(z.string().uuid())
    .describe('IDs of all devices currently attached to the space.'),
  acs_entrance_ids: z
    .array(z.string().uuid())
    .describe('IDs of all ACS entrances currently attached to the space.'),
}).describe(`
  ---
  route_path: /spaces
  ---
  A device was added or removed from a space.
`)

export type SpaceDeviceMembershipChangedEvent = z.infer<
  typeof space_device_membership_changed_event
>

export const space_events = [space_device_membership_changed_event] as const
