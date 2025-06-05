import { z } from 'zod'

export const magic_link = z.object({
  url: z.string().url(),
  building_block_type: z.enum([
    'connect_account',
    'manage_devices',
    'organize_spaces',
  ]),
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
