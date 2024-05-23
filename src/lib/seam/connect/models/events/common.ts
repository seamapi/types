import { z } from 'zod'

export const common_event = z.object({
  workspace_id: z.string().uuid().describe(`
    ---
    title: Workspace ID
    ---
    The ID of the workspace.
  `),
  created_at: z.string().datetime().describe(`
    ---
    title: Created At
    ---
    The time when the event was created.
  `),
  occurred_at: z.string().datetime().describe(`
    ---
    title: Occurred At
    ---
    The time when the event occurred.
  `),
})
