import { z } from 'zod'

import { common_acs_event } from './common.js'

const acs_credential_event = common_acs_event.extend({
  acs_credential_id: z
    .string()
    .uuid()
    .describe('ID of the affected credential.'),
})

export const acs_credential_deleted_event = acs_credential_event.extend({
  event_type: z.literal('acs_credential.deleted'),
}).describe(`
    ---
    route_path: /acs/credentials
    ---
    An [access system credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) was deleted.
  `)

export type AcsCredentialDeletedEvent = z.infer<
  typeof acs_credential_deleted_event
>

export const acs_credential_issued = acs_credential_event.extend({
  event_type: z.literal('acs_credential.issued'),
}).describe(`
    ---
    route_path: /acs/credentials
    ---
    An [access system credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) was issued.
  `)

export const acs_credential_reissued = acs_credential_event.extend({
  event_type: z.literal('acs_credential.reissued'),
}).describe(`
  ---
  route_path: /acs/credentials
  ---
  An [access system credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) was reissued.
`)

export const acs_credential_invalidated = acs_credential_event.extend({
  event_type: z.literal('acs_credential.invalidated'),
}).describe(`
  ---
  route_path: /acs/credentials
  ---
  An [access system credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) was invalidated. That is, the credential cannot be used anymore.

`)

export const acs_credential_events = [
  acs_credential_deleted_event,
  acs_credential_issued,
  acs_credential_reissued,
  acs_credential_invalidated,
] as const
