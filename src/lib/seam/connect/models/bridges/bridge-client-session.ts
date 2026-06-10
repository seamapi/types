import { z } from 'zod'

const common_bridge_client_session_error = z.object({
  message: z
    .string()
    .describe(
      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the error.'),
})

const error_code_description =
  'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.'

export const bridge_lan_unreachable = common_bridge_client_session_error
  .extend({
    error_code: z
      .literal('bridge_lan_unreachable')
      .describe(error_code_description),
    is_tailscale_proxy_reachable: z
      .boolean()
      .nullable()
      .describe('Indicates whether Seam can reach the Tailscale proxy.'),
    is_tailscale_proxy_socks_server_healthy: z
      .boolean()
      .nullable()
      .describe(
        "Indicates whether the Tailscale proxy's SOCKS server is healthy.",
      ),
    can_tailscale_proxy_reach_tailscale_network: z
      .boolean()
      .nullable()
      .describe(
        'Indicates whether the Tailscale proxy can reach the Tailscale network.',
      ),
    can_tailscale_proxy_reach_bridge: z
      .boolean()
      .nullable()
      .describe('Indicates whether the Tailscale proxy can reach Seam Bridge.'),
    is_bridge_socks_server_healthy: z
      .boolean()
      .nullable()
      .describe("Indicates whether Seam Bridge's SOCKS server is healthy."),
  })
  .describe("Indicates that Seam cannot reach Seam Bridge's LAN.")

export const no_communication_from_bridge = common_bridge_client_session_error
  .extend({
    error_code: z
      .literal('no_communication_from_bridge')
      .describe(error_code_description),
  })
  .describe('Indicates that Seam Bridge has stopped communicating with Seam.')

export const bridge_client_session_error = z
  .discriminatedUnion('error_code', [
    bridge_lan_unreachable,
    no_communication_from_bridge,
  ])
  .describe(
    'Indicates an error associated with the Seam Bridge client session.',
  )

export type BridgeClientSessionError = z.infer<
  typeof bridge_client_session_error
>

const _bridge_client_session_error_map = z.object({
  bridge_lan_unreachable: bridge_lan_unreachable.optional().nullable(),
  no_communication_from_bridge: no_communication_from_bridge
    .optional()
    .nullable(),
})

export type BridgeClientSessionErrorMap = z.infer<
  typeof _bridge_client_session_error_map
>

export const bridge_client_session = z.object({
  created_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the Seam Bridge client session was created.',
    ),
  bridge_client_session_id: z
    .string()
    .uuid()
    .describe('ID of the Seam Bridge client session.'),
  bridge_client_session_token: z
    .string()
    .describe(
      'Client session token associated with the Seam Bridge client session.',
    ),
  pairing_code: z
    .string()
    .length(6)
    .describe(
      'Pairing code for Seam Bridge. Use this code to pair Seam Bridge with your workspace.',
    ),
  pairing_code_expires_at: z
    .string()
    .datetime()
    .describe('Date and time at which the pairing code expires.'),
  tailscale_hostname: z
    .string()
    .describe('Tailscale hostname for Seam Bridge.'),
  tailscale_auth_key: z
    .string()
    .nullable()
    .describe('Tailscale authorization key for Seam Bridge.'),
  bridge_client_name: z.string().describe('Name of the Seam Bridge client.'),
  bridge_client_time_zone: z
    .string()
    .describe('Time zone for the Seam Bridge client.'),
  bridge_client_machine_identifier_key: z
    .string()
    .describe(
      'Identifier key of the client machine for the Seam Bridge client.',
    ),
  errors: z
    .array(bridge_client_session_error)
    .describe('Errors associated with the Seam Bridge client session.'),
  telemetry_token: z
    .string()
    .nullable()
    .describe('Telemetry token for the Seam Bridge client session.'),
  telemetry_token_expires_at: z
    .string()
    .datetime()
    .nullable()
    .describe(
      'Date and time at which the telemetry token for the Seam Bridge client session expires.',
    ),
  telemetry_url: z
    .string()
    .nullable()
    .describe('Telemetry URL for the Seam Bridge client session.'),
}).describe(`
  ---
  route_path: /seam/bridge/v1/bridge_client_sessions
  undocumented: Seam Bridge client only.
  ---
  Represents a [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge) client session.
`)

export type BridgeClientSession = z.infer<typeof bridge_client_session>
