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

const common_acs_access_group = z.object({
  acs_access_group_id: z.string().uuid().describe('ID of the access group.'),
  acs_system_id: z
    .string()
    .uuid()
    .describe(
      'ID of the access control system that contains the access group.',
    ),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the access group.',
    ),
  name: z.string().describe('Name of the access group.'),
  access_group_type: acs_access_group_external_type.describe(`
    ---
    deprecated: Use \`external_type\`.
    ---
  `),
  access_group_type_display_name: z.string().describe(`
    ---
    deprecated: Use \`external_type_display_name\`.
    ---
    `),
  display_name: z.string(),
  external_type: acs_access_group_external_type.describe(
    'Brand-specific terminology for the access group type.',
  ),
  external_type_display_name: z
    .string()
    .describe(
      'Display name that corresponds to the brand-specific terminology for the access group type.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the access group was created.'),
})

export const acs_access_group = common_acs_access_group.extend({
  is_managed: z.literal(true),
})
  .describe(`Group that defines the entrances to which a set of users has access and, in some cases, the access schedule for these entrances and users.
The \`acs_access_group\` object represents an [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups) within an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).`)
export const unmanaged_acs_access_group = common_acs_access_group.extend({
  is_managed: z.literal(false),
})

export type AcsAccessGroup = z.output<typeof acs_access_group>
export type UnmanagedAcsAccessGroup = z.output<
  typeof unmanaged_acs_access_group
>
