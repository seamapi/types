import { z } from 'zod'

// If changed, update seam.acs_system.system_type check constraint
export const acs_system_type = z.enum(['pti_site', 'alta_org'])

export type AcsSystemType = z.infer<typeof acs_system_type>

export const acs_system = z.object({
  acs_system_id: z.string().uuid(),
  system_type: acs_system_type,
  system_type_display_name: z.string(),
  name: z.string(),
  created_at: z.string().datetime(),
})

export type AcsSystem = z.output<typeof acs_system>
