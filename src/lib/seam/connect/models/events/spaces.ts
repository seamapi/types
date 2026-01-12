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

export const space_created_event = space_event.extend({
  event_type: z.literal('space.created').describe('Type of the event.'),
  space_key: z
    .string()
    .optional()
    .describe('Unique key for the space within the workspace.'),
  device_ids: z
    .array(z.string().uuid())
    .describe('IDs of all devices attached to the space when it was created.'),
  acs_entrance_ids: z
    .array(z.string().uuid())
    .describe(
      'IDs of all ACS entrances attached to the space when it was created.',
    ),
}).describe(`
  ---
  route_path: /spaces
  ---
  A space was created.
`)

export const space_deleted_event = space_event.extend({
  event_type: z.literal('space.deleted').describe('Type of the event.'),
  space_key: z
    .string()
    .optional()
    .describe('Unique key for the space within the workspace.'),
  device_ids: z
    .array(z.string().uuid())
    .describe('IDs of all devices attached to the space when it was deleted.'),
  acs_entrance_ids: z
    .array(z.string().uuid())
    .describe(
      'IDs of all ACS entrances currently attached to the space when it was deleted.',
    ),
}).describe(`
  ---
  route_path: /spaces
  ---
  A space was deleted.
`)

export type SpaceDeviceMembershipChangedEvent = z.infer<
  typeof space_device_membership_changed_event
>

export const space_events = [
  space_device_membership_changed_event,
  space_created_event,
  space_deleted_event,
] as const
