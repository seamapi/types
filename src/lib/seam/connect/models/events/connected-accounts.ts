import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'
import { common_event } from './common.js'

const connected_account_event = common_event.extend({
  connected_account_id: z
    .string()
    .uuid()
    .describe(
      'ID of the affected [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
    ),
  connected_account_custom_metadata: custom_metadata
    .optional()
    .describe(
      'Custom metadata of the connected account, present when connected_account_id is provided.',
    ),
})

const connect_webview_id = z
  .string()
  .uuid()
  .describe(
    'ID of the [Connect Webview](https://docs.seam.co/latest/core-concepts/connect-webviews) associated with the event.',
  )

export const connected_account_connected_event = connected_account_event.extend(
  {
    event_type: z.literal('connected_account.connected'),
    connect_webview_id: connect_webview_id.optional(),
    customer_key: z
      .string()
      .optional()
      .describe(
        'The customer key associated with this connected account, if any.',
      ),
  },
).describe(`
  ---
  route_path: /connected_accounts
  ---
  A [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) was connected for the first time or was reconnected after being disconnected.
`)

export type ConnectedAccountConnectedEvent = z.infer<
  typeof connected_account_connected_event
>

export const connected_account_created_event = connected_account_event.extend({
  event_type: z.literal('connected_account.created'),
  connect_webview_id,
}).describe(`
  ---
  route_path: /connected_accounts
  ---
  A [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) was created.
`)

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
    route_path: /connected_accounts
    ---
    A [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) had a successful login using a [Connect Webview](https://docs.seam.co/latest/ui-components/connect-webviews).
  `)

/** @deprecated Rely on ConnectWebviewLoginSucceededEvent instead */
export type ConnectedAccountSuccessfulLoginEvent = z.infer<
  typeof connected_account_successful_login_event
>

export const connected_account_disconnected_event =
  connected_account_event.extend({
    event_type: z.literal('connected_account.disconnected'),
  }).describe(`
    ---
    route_path: /connected_accounts
    ---
    A [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) was disconnected.
  `)

export type ConnectedAccountDisconnectedEvent = z.infer<
  typeof connected_account_disconnected_event
>

export const connected_account_completed_first_sync_event =
  connected_account_event.extend({
    event_type: z.literal('connected_account.completed_first_sync'),
  }).describe(`
    ---
    route_path: /connected_accounts
    ---
    A [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) completed the first sync with Seam, and the corresponding devices or systems are now available.
  `)

export type ConnectedAccountCompletedFirstSyncEvent = z.infer<
  typeof connected_account_completed_first_sync_event
>

export const connected_account_deleted_event = connected_account_event.extend({
  event_type: z.literal('connected_account.deleted'),
}).describe(`
  ---
  route_path: /connected_accounts
  ---
  A [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) was deleted.
`)

export type ConnectedAccountDeletedEvent = z.infer<
  typeof connected_account_deleted_event
>

export const connected_account_completed_first_sync_after_reconnection_event =
  connected_account_event.extend({
    event_type: z.literal(
      'connected_account.completed_first_sync_after_reconnection',
    ),
  }).describe(`
    ---
    route_path: /connected_accounts
    ---
    A [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) completed the first sync after reconnection with Seam, and the corresponding devices or systems are now available.
  `)

export type ConnectedAccountCompletedFirstSyncAfterReconnectionEvent = z.infer<
  typeof connected_account_completed_first_sync_after_reconnection_event
>

export const connected_account_reauthorization_requested_event =
  connected_account_event.extend({
    event_type: z.literal('connected_account.reauthorization_requested'),
  }).describe(`
    ---
    route_path: /connected_accounts
    ---
    A [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) requires reauthorization using a new Connect Webview. The account is still connected, but cannot access new features. Delaying reauthorization too long will eventually cause the Connected Account to become disconnected.
  `)

export type ConnectedAccountReauthorizationRequestedEvent = z.infer<
  typeof connected_account_reauthorization_requested_event
>

export const connected_account_events = [
  connected_account_connected_event,
  connected_account_created_event,
  connected_account_successful_login_event,
  connected_account_disconnected_event,
  connected_account_completed_first_sync_event,
  connected_account_deleted_event,
  connected_account_completed_first_sync_after_reconnection_event,
  connected_account_reauthorization_requested_event,
] as const
