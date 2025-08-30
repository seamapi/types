import { z } from 'zod'

import { common_event } from './common.js'

const access_method_event = common_event.extend({
  access_method_id: z
    .string()
    .uuid()
    .describe('ID of the affected access method.'),
  access_grant_ids: z
    .array(z.string().uuid())
    .describe('IDs of the access grants associated with this access method.'),
  access_grant_keys: z
    .array(z.string())
    .optional()
    .describe(
      'Keys of the access grants associated with this access method (if present).',
    ),
})

export const access_method_issued_event = access_method_event.extend({
  event_type: z.literal('access_method.issued'),
  code: z
    .string()
    .optional()
    .describe(
      "The actual PIN code for code access methods (only present when mode is 'code').",
    ),
  is_backup_code: z
    .boolean()
    .optional()
    .describe(
      "Indicates whether the code is a backup code (only present when mode is 'code' and a backup code was used).",
    ),
}).describe(`
    ---
    route_path: /access_methods
    ---
    An access method was issued.
  `)

export type AccessMethodIssuedEvent = z.infer<typeof access_method_issued_event>

export const access_method_card_encoding_required_event =
  access_method_event.extend({
    event_type: z.literal('access_method.card_encoding_required'),
  }).describe(`
    ---
    route_path: /access_methods
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
    route_path: /access_methods
    ---
    An access method was revoked.
  `)

export const access_method_deleted_event = access_method_event.extend({
  event_type: z.literal('access_method.deleted'),
}).describe(`
    ---
    route_path: /access_methods
    ---
    An access method was deleted.
  `)

export const access_method_reissued_event = access_method_event.extend({
  event_type: z.literal('access_method.reissued'),
  code: z
    .string()
    .optional()
    .describe(
      "The actual PIN code for code access methods (only present when mode is 'code').",
    ),
  is_backup_code: z
    .boolean()
    .optional()
    .describe(
      "Indicates whether the code is a backup code (only present when mode is 'code' and a backup code was used).",
    ),
}).describe(`
    ---
    route_path: /access_methods
    ---
    An access method was reissued due to an Access Grant update.
  `)

export type AccessMethodRevokedEvent = z.infer<
  typeof access_method_revoked_event
>

export const access_method_events = [
  access_method_issued_event,
  access_method_revoked_event,
  access_method_card_encoding_required_event,
  access_method_deleted_event,
  access_method_reissued_event,
] as const
