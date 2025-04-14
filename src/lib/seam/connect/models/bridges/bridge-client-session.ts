import { z } from 'zod'

const common_bridge_client_session_error = z.object({
  message: z.string(),
  created_at: z.string().datetime(),
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
      .describe('Seam cannot reach the tailscale proxy'),
    is_tailscale_proxy_socks_server_healthy: z
      .boolean()
      .nullable()
      .describe("Tailscale proxy's SOCKS server is unhealthy"),
    can_tailscale_proxy_reach_tailscale_network: z
      .boolean()
      .nullable()
      .describe('Tailscale proxy cannot reach the Tailscale network'),
    can_tailscale_proxy_reach_bridge: z
      .boolean()
      .nullable()
      .describe('Tailscale proxy cannot reach the bridge'),
    is_bridge_socks_server_healthy: z
      .boolean()
      .nullable()
      .describe("Bridge's SOCKS server is unhealthy"),
  })
  .describe("Seam cannot reach the bridge's LAN")

export const no_communication_from_bridge = common_bridge_client_session_error
  .extend({
    error_code: z
      .literal('no_communication_from_bridge')
      .describe(error_code_description),
  })
  .describe('Bridge has stopped communicating with Seam')

export const bridge_client_session_error = z
  .discriminatedUnion('error_code', [
    bridge_lan_unreachable,
    no_communication_from_bridge,
  ])
  .describe('Error associated with the `bridge_client_session`.')

export type BridgeClientSessionError = z.infer<
  typeof bridge_client_session_error
>

const bridge_client_session_error_map = z.object({
  bridge_lan_unreachable: bridge_lan_unreachable.optional().nullable(),
  no_communication_from_bridge: no_communication_from_bridge
    .optional()
    .nullable(),
})

export type BridgeClientSessionErrorMap = z.infer<
  typeof bridge_client_session_error_map
>

export const bridge_client_session = z.object({
  created_at: z.string().datetime(),
  bridge_client_session_id: z.string().uuid(),
  bridge_client_session_token: z.string(),
  pairing_code: z.string().length(6),
  pairing_code_expires_at: z.string().datetime(),
  tailscale_hostname: z.string(),
  tailscale_auth_key: z.string().nullable(),
  bridge_client_name: z.string(),
  bridge_client_time_zone: z.string(),
  bridge_client_machine_identifier_key: z.string(),
  errors: z.array(bridge_client_session_error),
  telemetry_token: z.string().nullable(),
  telemetry_token_expires_at: z.string().datetime().nullable(),
  telemetry_url: z.string().nullable(),
}).describe(`
  ---
  route_path: /seam/bridge/v1/bridge_client_sessions
  undocumented: Seam Bridge Client only.
  ---
`)

export type BridgeClientSession = z.infer<typeof bridge_client_session>
