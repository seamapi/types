import { z } from 'zod'

export const bridge_connected_system = z.object({
  bridge_id: z
    .string()
    .uuid()
    .describe('ID of Seam Bridge connected to the access system.'),
  bridge_created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam Bridge was created.'),
  connected_account_id: z
    .string()
    .uuid()
    .describe('ID of the connected account associated with Seam Bridge.'),
  connected_account_created_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the connected account associated with Seam Bridge was created.',
    ),
  acs_system_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [access system](https://docs.seam.co/latest/capability-guides/access-systems) associated with Seam Bridge.',
    ),
  acs_system_display_name: z
    .string()
    .describe(
      'Display name for the [access system](https://docs.seam.co/latest/capability-guides/access-systems) associated with Seam Bridge.',
    ),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) with which Seam Bridge is paired.',
    ),
  workspace_display_name: z
    .string()
    .describe(
      'Display name for the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) with which Seam Bridge is paired.',
    ),
}).describe(`
  ---
  route_path: /seam/bridge/v1/bridge_connected_systems
  undocumented: Seam Bridge client only.
  ---
  Represents an access system connected to [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge).
`)

export type BridgeConnectedSystem = z.infer<typeof bridge_connected_system>
