import { z } from 'zod'

export const acs_system_capability_flags = z.object({
  can_automate_enrollment: z.boolean().optional(),
})
