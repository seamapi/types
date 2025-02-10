import { z } from 'zod'

export const bridge_client_session = z.object({
  created_at: z.string().datetime(),
  bridge_client_session_id: z.string().uuid(),
  bridge_client_session_token: z.string(),
  bridge_client_name: z.string(),
  bridge_client_time_zone: z.string(),
  bridge_client_machine_identifier_key: z.string(),
  bridge_client_tailscale_hostname: z.string(),
  pairing_code: z.string().length(6),
  pairing_code_expires_at: z.string().datetime(),
  tailscale_auth_key: z.string().nullable(),
}).describe(`
  ---
  route_path: /seam/bridge/v1/bridge_client_sessions
  ---
`)

export type BridgeClientSession = z.infer<typeof bridge_client_session>
