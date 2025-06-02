import { z } from 'zod'

import { common_acs_event } from './common.js'

const acs_access_group_event = common_acs_event.extend({
  acs_access_group_id: z
    .string()
    .uuid()
    .describe('ID of the affected access group.'),
})

export const acs_access_group_deleted_event = acs_access_group_event.extend({
  event_type: z.literal('acs_access_group.deleted'),
}).describe(`
  ---
  route_path: /acs/access_groups
  ---
  An ACS access group was deleted.
`)

export type AcsAccessGroupDeletedEvent = z.infer<
  typeof acs_access_group_deleted_event
>

export const acs_access_group_events = [acs_access_group_deleted_event] as const
