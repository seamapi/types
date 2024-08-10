import { z } from 'zod'

import { common_event } from './common.js'

const connect_webview_event = common_event.extend({
  connect_webview_id: z.string().uuid().describe(`
    ---
    title: Connect Webview ID
    ---
    ID of the connect webview.
  `),
})

const connected_account_id = z.string().uuid().describe(`
  ---
  title: Connected Account ID
  ---
  ID of the connected account.
`)

export const connect_webview_login_succeeded_event = connect_webview_event
  .extend({
    event_type: z.literal('connect_webview.login_succeeded'),
    connected_account_id,
  })
  .describe('A connect webview had a successful login.')

export type ConnectWebviewLoginSucceededEvent = z.infer<
  typeof connect_webview_login_succeeded_event
>

export const connect_webview_login_failed_event = connect_webview_event
  .extend({
    event_type: z.literal('connect_webview.login_failed'),
  })
  .describe('A connect webview had a failed login.')

export type ConnectWebviewLoginFailedEvent = z.infer<
  typeof connect_webview_login_failed_event
>

export const connect_webview_events = [
  connect_webview_login_succeeded_event,
  connect_webview_login_failed_event,
] as const
