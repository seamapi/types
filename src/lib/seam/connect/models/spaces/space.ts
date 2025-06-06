import { z } from 'zod'

export const space = z.object({
  space_id: z.string().uuid().describe('Unique identifier for the space.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'Unique identifier for the Seam workspace associated with the space.',
    ),
  name: z.string().describe('Name of the space.'),
  display_name: z.string().describe('Display name of the space.'),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the space object was created.'),
}).describe(`
  ---
  draft: Early access.
  route_path: /spaces
  ---
  `)

export type Space = z.infer<typeof space>
