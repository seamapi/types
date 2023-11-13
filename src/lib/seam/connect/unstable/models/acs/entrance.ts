import { z } from 'zod'

export const acs_entrance = z.object({
  acs_entrance_id: z.string().uuid(),
  display_name: z.string(),
  acs_system_id: z.string().uuid(),
  created_at: z.string().datetime(),
})

export type AcsEntrance = z.infer<typeof acs_entrance>
