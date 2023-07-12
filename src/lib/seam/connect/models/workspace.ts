import { z } from 'zod'

export const workspace = z.object({
  workspace_id: z.string().uuid(),
})
export type Workspace = z.infer<typeof workspace>
