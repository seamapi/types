import { z } from 'zod'

import { common_acs_event } from './common.js'

const acs_user_event = common_acs_event
  .extend({
    acs_user_id: z.string().uuid(),
  })
  .describe('ID of the affected access system user.')

export const acs_user_deleted_event = acs_user_event.extend({
  event_type: z.literal('acs_user.deleted'),
}).describe(`
    ---
    route_path: /acs/users
    ---
    An [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) was deleted.
  `)

export type AcsUserDeletedEvent = z.infer<typeof acs_user_deleted_event>

export const acs_user_created_event = acs_user_event.extend({
  event_type: z.literal('acs_user.created'),
}).describe(`
    ---
    route_path: /acs/users
    ---
    An [access system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) was created.
  `)

export type AcsUserCreatedEvent = z.infer<typeof acs_user_created_event>

export const acs_user_events = [
  acs_user_created_event,
  acs_user_deleted_event,
] as const
