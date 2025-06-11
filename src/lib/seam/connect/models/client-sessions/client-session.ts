import { z } from 'zod'

export const client_session = z.object({
  client_session_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  created_at: z.string().datetime(),
  expires_at: z.string().datetime(),
  token: z.string(),
  user_identifier_key: z.string().nullable(),
  device_count: z.number(),
  customer_id: z.string().uuid().optional(),
  connected_account_ids: z.array(z.string().uuid()),
  connect_webview_ids: z.array(z.string().uuid()),
  user_identity_ids: z
    .array(z.string().uuid())
    .describe('deprecated: Use `user_identity_id`.'),
  user_identity_id: z.string().uuid().optional(),
}).describe(`
  ---
  route_path: /client_sessions
  ---
  Represents a [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens). If you want to restrict your users' access to their own devices, use client sessions.

  You create each client session with a custom \`user_identifier_key\`. Normally, the \`user_identifier_key\` is a user ID that your application provides.

  When calling the Seam API from your backend using an API key, you can pass the \`user_identifier_key\` as a parameter to limit results to the associated client session. For example, \`/devices/list?user_identifier_key=123\` only returns devices associated with the client session created with the \`user_identifier_key\` \`123\`.

  A client session has a token that you can use with the Seam JavaScript SDK to make requests from the client (browser) directly to the Seam API. The token restricts the user's access to only the devices that they own.

  See also [Get Started with React](https://docs.seam.co/latest/ui-components/overview/getting-started-with-seam-components/get-started-with-react-components-and-client-session-tokens).
`)

export type ClientSession = z.infer<typeof client_session>
