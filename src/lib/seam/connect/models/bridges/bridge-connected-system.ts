import { z } from 'zod'

export const bridge_connected_system = z.object({
  bridge_id: z.string().uuid(),
  bridge_created_at: z.string().datetime(),
  connected_account_id: z.string().uuid(),
  connected_account_created_at: z.string().datetime(),
  acs_system_id: z.string().uuid(),
  acs_system_display_name: z.string(),
  workspace_id: z.string().uuid(),
  workspace_display_name: z.string(),
}).describe(`
  ---
  route_path: /seam/bridge/v1/bridge_connected_systems
  undocumented: Seam Bridge Client only.
  ---
`)

export type BridgeConnectedSystem = z.infer<typeof bridge_connected_system>
