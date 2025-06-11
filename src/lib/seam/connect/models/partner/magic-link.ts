import { z } from 'zod'

export const building_block_type = z.enum([
  'connect_accounts',
  'manage_devices',
  'organize_spaces',
  'console',
])

export type BuildingBlockType = z.infer<typeof building_block_type>

export const magic_link = z.object({
  url: z.string().url(),
  building_block_type,
  customer_key: z.string(),
  expires_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
  created_at: z.string().datetime(),
}).describe(`
  ---
  undocumented: Unreleased.
  route_path: /unstable_partner/building_blocks
  ---
  `)

export type MagicLink = z.infer<typeof magic_link>
