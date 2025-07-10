import { z } from 'zod'

import { common_event } from './common.js'

const access_grant_event = common_event.extend({
  access_grant_id: z
    .string()
    .uuid()
    .describe('ID of the affected Access Grant.'),
})

export const access_grant_created_event = access_grant_event.extend({
  event_type: z.literal('access_grant.created'),
}).describe(`
    ---
    route_path: /access_grants
    ---
    An Access Grant was created.
  `)

export const access_grant_deleted_event = access_grant_event.extend({
  event_type: z.literal('access_grant.deleted'),
}).describe(`
    ---
    route_path: /access_grants
    ---
    An Access Grant was deleted.
  `)

export const access_grant_access_granted_to_all_doors_event =
  access_grant_event.extend({
    event_type: z.literal('access_grant.access_granted_to_all_doors'),
  }).describe(`
    ---
    route_path: /access_grants
    ---
    All access requested for an Access Grant was successfully granted.
  `)

export type AccessGrantAccessGrantedToAllDoorsEvent = z.infer<
  typeof access_grant_access_granted_to_all_doors_event
>

const acs_entrance_id = z
  .string()
  .uuid()
  .describe(
    'ID of the affected [entrance](https://docs.seam.co/latest/capability-guides/retrieving-entrance-details).',
  )

export const access_grant_access_granted_to_door_event =
  access_grant_event.extend({
    event_type: z.literal('access_grant.access_granted_to_door'),
    acs_entrance_id,
  }).describe(`
    ---
    route_path: /access_grants
    ---
    Access requested as part of an Access Grant to a particular door was successfully granted.
  `)

export type AccessGrantAccessGrantedToDoorEvent = z.infer<
  typeof access_grant_access_granted_to_door_event
>

export const access_grant_access_to_door_lost_event = access_grant_event.extend(
  {
    event_type: z.literal('access_grant.access_to_door_lost'),
    acs_entrance_id,
  },
).describe(`
    ---
    route_path: /access_grants
    ---
    Access to a particular door that was requested as part of an Access Grant was lost.
  `)

export type AccessGrantAccessToDoorLostEvent = z.infer<
  typeof access_grant_access_to_door_lost_event
>

export const access_grant_events = [
  access_grant_created_event,
  access_grant_deleted_event,
  access_grant_access_granted_to_all_doors_event,
  access_grant_access_granted_to_door_event,
  access_grant_access_to_door_lost_event,
] as const
