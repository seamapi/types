import { z } from 'zod'

import { common_event } from './common.js'

const client_session_event = common_event.extend({
  client_session_id: z.string().uuid().describe(`
    ---
    title: Client Session ID
    ---
    ID of the client session.
  `),
})

export const client_session_deleted_event = client_session_event
  .extend({
    event_type: z.literal('client_session.deleted'),
  })
  .describe('A client session was deleted.')

export type ClientSessionDeletedEvent = z.infer<
  typeof client_session_deleted_event
>

export const client_session_events = [client_session_deleted_event] as const
