import { z } from 'zod'

import { common_event } from './common.js'

const connect_webview_event = common_event.extend({
  connect_webview_id: z
    .string()
    .uuid()
    .describe(
      'ID of the affected [Connect Webview](https://docs.seam.co/latest/ui-components/connect-webviews).',
    ),
})

const connected_account_id = z
  .string()
  .uuid()
  .describe(
    'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) associated with the event.',
  )

export const connect_webview_login_succeeded_event =
  connect_webview_event.extend({
    event_type: z.literal('connect_webview.login_succeeded'),
    connected_account_id,
  }).describe(`
    ---
    route_path: /connect_webviews
    ---
    A [Connect Webview](https://docs.seam.co/latest/ui-components/connect-webviews) login succeeded.
  `)

export type ConnectWebviewLoginSucceededEvent = z.infer<
  typeof connect_webview_login_succeeded_event
>

export const connect_webview_login_failed_event = connect_webview_event.extend({
  event_type: z.literal('connect_webview.login_failed'),
}).describe(`
    ---
    route_path: /connect_webviews
    ---
    A [Connect Webview](https://docs.seam.co/latest/ui-components/connect-webviews) login failed.
  `)

export type ConnectWebviewLoginFailedEvent = z.infer<
  typeof connect_webview_login_failed_event
>

export const connect_webview_events = [
  connect_webview_login_succeeded_event,
  connect_webview_login_failed_event,
] as const
