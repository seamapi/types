import { z } from 'zod'

export const acs_access_group_type = z.enum(['pti_unit'])

export type AcsAccessGroupType = z.infer<typeof acs_access_group_type>

export const acs_access_group = z.object({
  acs_access_group_id: z.string().uuid(),
  acs_system_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  name: z.string(),
  access_group_type: acs_access_group_type,
  access_group_type_display_name: z.string(),
  created_at: z.string().datetime(),
})

export type AcsAccessGroup = z.output<typeof acs_access_group>
