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

export const access_method_reissued_event = access_method_issued_event.extend({
  event_type: z.literal('access_method.reissued'),
}).describe(`
    ---
    route_path: /access_methods
    ---
    An access method was reissued.
  `)

export const access_method_created_event = access_method_event.extend({
  event_type: z.literal('access_method.created'),
}).describe(`
    ---
    route_path: /access_methods
    ---
    An access method was created.
  `)

export const access_method_delay_in_issuing_event = access_method_event.extend({
  event_type: z.literal('access_method.delay_in_issuing'),
}).describe(`
    ---
    route_path: /access_methods
    ---
    Seam has not yet issued this access method, even though its access grant is about to begin, so access may not be ready when the recipient arrives. Seam is still attempting to issue it, and the accompanying \`delay_in_issuing\` warning clears automatically once issuance succeeds.
  `)

export const access_method_failed_to_issue_event = access_method_event.extend({
  event_type: z.literal('access_method.failed_to_issue'),
}).describe(`
    ---
    route_path: /access_methods
    ---
    Seam was unable to issue this access method before its access grant started, so the recipient may be unable to access the space. This usually points to a problem that needs attention, such as an offline or disconnected device. Seam keeps retrying, and the accompanying \`failed_to_issue\` error clears automatically if the access method is eventually issued.
  `)

export type AccessMethodCreatedEvent = z.infer<
  typeof access_method_created_event
>

export type AccessMethodRevokedEvent = z.infer<
  typeof access_method_revoked_event
>

export const access_method_events = [
  access_method_issued_event,
  access_method_revoked_event,
  access_method_card_encoding_required_event,
  access_method_deleted_event,
  access_method_reissued_event,
  access_method_created_event,
  access_method_delay_in_issuing_event,
  access_method_failed_to_issue_event,
] as const
