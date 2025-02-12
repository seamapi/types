import { z } from 'zod'

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
}).describe(`
  ---
  route_path: /seam/bridge/v1/bridge_client_sessions
  undocumented: Seam Bridge Client only.
  ---
`)

export type BridgeClientSession = z.infer<typeof bridge_client_session>
