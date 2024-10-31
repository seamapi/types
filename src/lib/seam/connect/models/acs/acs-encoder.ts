import { z } from 'zod'

export const acs_encoder = z.object({
  acs_encoder_id: z.string().uuid().describe('ID of the `acs_encoder`.'),
  acs_system_id: z
    .string()
    .uuid()
    .describe(
      'ID of the access control system that contains the `acs_encoder`.',
    ),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the `acs_system`.',
    ),
  errors: z.array(
    z.object({
      error_code: z.string(),
      message: z.string(),
    }),
  ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the `acs_encoder` was created.'),
  display_name: z.string().describe('Display name for the `acs_encoder`.'),
})

export type AcsEncoder = z.infer<typeof acs_encoder>
