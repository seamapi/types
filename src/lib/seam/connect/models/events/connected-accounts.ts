import { z } from 'zod'

import { common_event } from './common.js'

const connected_account_event = common_event.extend({
  connected_account_id: z.string().uuid().describe(`
    ---
    title: Connected Account ID
    ---
    ID of the connected account.
  `),
})

const connect_webview_id = z.string().uuid().describe(`
  ---
  title: Connect Webview ID
  ---
  ID of the connect webview.
`)

export const connected_account_connected_event = connected_account_event
  .extend({
    event_type: z.literal('connected_account.connected'),
    connect_webview_id,
  })
  .describe(
    'A connected account was connected for the first time, was reconnected after being disconnected.',
  )

export type ConnectedAccountConnectedEvent = z.infer<
  typeof connected_account_connected_event
>

export const connected_account_created_event = connected_account_event
  .extend({
    event_type: z.literal('connected_account.created'),
    connect_webview_id,
  })
  .describe('A connected account was created.')

export type ConnectedAccountCreatedEvent = z.infer<
  typeof connected_account_created_event
>
/** @deprecated */
export const connected_account_successful_login_event =
  connected_account_event.extend({
    event_type: z.literal('connected_account.successful_login'),
    connect_webview_id,
  }).describe(`
    ---
    deprecated: Use \`connect_webview.login_succeeded\`.
    ---
    A connected account had a successful connect webview login.`)

/** @deprecated Rely on ConnectWebviewLoginSucceededEvent instead */
export type ConnectedAccountSuccessfulLoginEvent = z.infer<
  typeof connected_account_successful_login_event
>

export const connected_account_disconnected_event = connected_account_event
  .extend({
    event_type: z.literal('connected_account.disconnected'),
  })
  .describe('A connected account was disconnected.')

export type ConnectedAccountDisconnectedEvent = z.infer<
  typeof connected_account_disconnected_event
>

export const connected_account_completed_first_sync_event =
  connected_account_event
    .extend({
      event_type: z.literal('connected_account.completed_first_sync'),
    })
    .describe(
      'A connected account completed the first sync with Seam and devices are now available.',
    )

export type ConnectedAccountCompletedFirstSyncEvent = z.infer<
  typeof connected_account_completed_first_sync_event
>

export const connected_account_deleted_event = connected_account_event
  .extend({
    event_type: z.literal('connected_account.deleted'),
  })
  .describe('A connected account was deleted.')

export type ConnectedAccountDeletedEvent = z.infer<
  typeof connected_account_deleted_event
>

export const connected_account_completed_first_sync_after_reconnection_event =
  connected_account_event
    .extend({
      event_type: z.literal(
        'connected_account.completed_first_sync_after_reconnection',
      ),
    })
    .describe(
      'A connected account completed the first sync after reconnection with Seam and devices are now available.',
    )

export type ConnectedAccountCompletedFirstSyncAfterReconnectionEvent = z.infer<
  typeof connected_account_completed_first_sync_after_reconnection_event
>

export const connected_account_events = [
  connected_account_connected_event,
  connected_account_created_event,
  connected_account_successful_login_event,
  connected_account_disconnected_event,
  connected_account_completed_first_sync_event,
  connected_account_deleted_event,
  connected_account_completed_first_sync_after_reconnection_event,
] as const
