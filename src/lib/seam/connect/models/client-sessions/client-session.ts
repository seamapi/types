import { z } from 'zod'

export const client_session = z.object({
  client_session_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens).',
    ),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) associated with the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens).',
    ),
  created_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens) was created.',
    ),
  expires_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens) expires.',
    ),
  token: z
    .string()
    .describe(
      'Client session token associated with the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens).',
    ),
  user_identifier_key: z
    .string()
    .nullable()
    .describe(
      'Your user ID for the user associated with the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens).',
    ),
  device_count: z
    .number()
    .describe(
      'Number of devices associated with the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens).',
    ),
  customer_key: z
    .string()
    .optional()
    .describe(
      'Customer key associated with the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens).',
    ),
  connected_account_ids: z
    .array(z.string().uuid())
    .describe(
      'IDs of the [connected accounts](https://docs.seam.co/latest/core-concepts/connected-accounts) associated with the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens).',
    ),
  connect_webview_ids: z
    .array(z.string().uuid())
    .describe(
      'IDs of the [Connect Webviews](https://docs.seam.co/latest/core-concepts/connect-webviews) associated with the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens).',
    ),
  user_identity_ids: z.array(z.string().uuid()).describe(`
    ---
    deprecated: Use \`user_identity_id\` instead.
    ---
    IDs of the [user identities](https://docs.seam.co/latest/capability-guides/mobile-access/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity) associated with the client session.
  `),
  user_identity_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the [user identity](https://docs.seam.co/latest/capability-guides/mobile-access/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity) associated with the client session.',
    ),
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
