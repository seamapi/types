import { z } from 'zod'

export const space = z.object({
  space_id: z.string().uuid().describe('ID of the space.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) associated with the space.',
    ),
  space_key: z
    .string()
    .optional()
    .describe('Unique key for the space within the workspace.'),
  name: z.string().describe('Name of the space.'),
  display_name: z.string().describe('Display name for the space.'),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the space was created.'),
  device_count: z.number().describe('Number of devices in the space.'),
  acs_entrance_count: z.number().describe('Number of entrances in the space.'),
  parent_space_id: z.string().uuid().optional().describe(`
    ---
    undocumented: Only used internally.
    ---
    `),
  parent_space_key: z.string().optional().describe(`
    ---
    undocumented: Only used internally.
    ---
    `),
}).describe(`
  ---
  draft: Early access.
  route_path: /spaces
  ---
  Represents a space that is a logical grouping of devices and entrances. You can assign access to an entire space, thereby making granting access more efficient.
  `)

export type Space = z.infer<typeof space>
