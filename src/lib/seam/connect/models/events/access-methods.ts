import { z } from 'zod'

import { common_event } from './common.js'

const access_method_event = common_event.extend({
  access_method_id: z
    .string()
    .uuid()
    .describe('ID of the affected access method.'),
})

export const access_method_issued_event = access_method_event.extend({
  event_type: z.literal('access_method.issued'),
}).describe(`
    ---
    route_path: /unstable_access_methods
    ---
    An access method was issued.
  `)

export type AccessMethodIssuedEvent = z.infer<typeof access_method_issued_event>

export const access_method_card_encoding_required_event =
  access_method_event.extend({
    event_type: z.literal('access_method.card_encoding_required'),
  }).describe(`
    ---
    route_path: /unstable_access_methods
    ---
    An access method representing a physical card requires encoding.
  `)

export type AccessMethodCardEncodingRequiredEvent = z.infer<
  typeof access_method_card_encoding_required_event
>

export const access_method_revoked_event = access_method_event.extend({
  event_type: z.literal('access_method.revoked'),
}).describe(`
    ---
    route_path: /unstable_access_methods
    ---
    An access method was revoked.
  `)

export const access_method_deleted_event = access_method_event.extend({
  event_type: z.literal('access_method.deleted'),
}).describe(`
    ---
    route_path: /unstable_access_methods
    ---
    An access method was deleted.
  `)

export type AccessMethodRevokedEvent = z.infer<
  typeof access_method_revoked_event
>

export const access_method_events = [
  access_method_issued_event,
  access_method_revoked_event,
  access_method_card_encoding_required_event,
  access_method_deleted_event,
] as const
