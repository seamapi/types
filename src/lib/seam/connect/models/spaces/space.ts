import { z } from 'zod'

export const space = z.object({
  space_id: z.string().uuid().describe('ID of the space.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) associated with the space.',
    ),
  name: z.string().describe('Name of the space.'),
  display_name: z.string().describe('Display name for the space.'),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the space was created.'),
}).describe(`
  ---
  draft: Early access.
  route_path: /spaces
  ---
  Represents a space that is a logical grouping of devices and entrances. You can assign access to an entire space, thereby making granting access more efficient.
  `)

export type Space = z.infer<typeof space>
