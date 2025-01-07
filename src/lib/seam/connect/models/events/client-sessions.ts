import { z } from 'zod'

import { common_event } from './common.js'

const client_session_event = common_event.extend({
  client_session_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens).',
    ),
})

export const client_session_deleted_event = client_session_event
  .extend({
    event_type: z.literal('client_session.deleted'),
  })
  .describe(
    'A [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens) was deleted.',
  )

export type ClientSessionDeletedEvent = z.infer<
  typeof client_session_deleted_event
>

export const client_session_events = [client_session_deleted_event] as const
