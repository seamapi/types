import { z } from 'zod'

export const acs_system_capability_flags = z.object({
  can_automate_enrollment: z.boolean().optional(),
  can_create_acs_access_groups: z.boolean().optional(),
  can_remove_acs_users_from_acs_access_groups: z.boolean().optional(),
  can_add_acs_users_to_acs_access_groups: z.boolean().optional(),
})
