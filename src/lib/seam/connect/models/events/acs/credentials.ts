import { z } from 'zod'

import { common_acs_event } from './common.js'

const acs_credential_event = common_acs_event.extend({
  acs_credential_id: z.string().uuid(),
})

export const acs_credential_deleted_event = acs_credential_event
  .extend({
    event_type: z.literal('acs_credential.deleted'),
  })
  .describe('An ACS credential was deleted.')

export type AcsCredentialDeletedEvent = z.infer<
  typeof acs_credential_deleted_event
>

export const acs_credential_events = [acs_credential_deleted_event] as const
