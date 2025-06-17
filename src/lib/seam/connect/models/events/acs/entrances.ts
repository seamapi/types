import { z } from 'zod'

import { common_acs_event } from './common.js'

const acs_entrance_event = common_acs_event
  .extend({
    acs_entrance_id: z.string().uuid(),
  })
  .describe('ID of the affected entrance.')

export const acs_entrance_added_event = acs_entrance_event.extend({
  event_type: z.literal('acs_entrance.added'),
}).describe(`
    ---
    route_path: /acs/entrances
    ---
    An [access system entrance](https://docs.seam.co/latest/capability-guides/retrieving-entrance-details) was added.
  `)

export const acs_entrance_removed_event = acs_entrance_event.extend({
  event_type: z.literal('acs_entrance.removed'),
}).describe(`
    ---
    route_path: /acs/entrances
    ---
    An [access system entrance](https://docs.seam.co/latest/capability-guides/retrieving-entrance-details) was removed.
  `)

export type AcsUserDeletedEvent = z.infer<typeof acs_entrance_removed_event>

export const acs_entrance_events = [
  acs_entrance_added_event,
  acs_entrance_removed_event,
] as const
