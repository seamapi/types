import { z } from 'zod'

export const common_event = z.object({
  event_id: z.string().uuid().describe('ID of the event.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Time at which the event was created.'),
  occurred_at: z.string().datetime().describe('Time when the event occurred.'),
})
