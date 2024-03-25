import { z } from 'zod'

// If changed, update seam.acs_access_group.external_type generated column
export const acs_access_group_external_type = z.enum([
  'pti_unit',
  'pti_access_level',
  'salto_access_group',
  'brivo_group',
])

export type AcsAccessGroupExternalType = z.infer<
  typeof acs_access_group_external_type
>

export const acs_access_group = z.object({
  acs_access_group_id: z.string().uuid(),
  acs_system_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  name: z.string(),
  access_group_type: acs_access_group_external_type.describe(`
    ---
    deprecated: use external_type
    ---
  `),
  access_group_type_display_name: z.string().describe(`
    ---
    deprecated: use external_type_display_name
    ---
    `),
  external_type: acs_access_group_external_type,
  external_type_display_name: z.string(),
  created_at: z.string().datetime(),
})

export type AcsAccessGroup = z.output<typeof acs_access_group>
