import { z } from 'zod'

// If changed, update seam.acs_access_group.external_type generated column
export const acs_access_group_external_type = z.enum([
  'pti_unit',
  'pti_access_level',
  'salto_ks_access_group',
  'brivo_group',
  'salto_space_group',
  'dormakaba_community_access_group',
  'dormakaba_ambiance_access_group',
])

export type AcsAccessGroupExternalType = z.infer<
  typeof acs_access_group_external_type
>

const common_acs_access_group_warning = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the warning.'),
  message: z
    .string()
    .describe(
      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
    ),
})

const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

export const unknown_issue_with_acs_access_group =
  common_acs_access_group_warning
    .extend({
      warning_code: z
        .literal('unknown_issue_with_acs_access_group')
        .describe(warning_code_description),
    })
    .describe(
      'An unknown issue occurred while syncing the state of this access group with the provider. This issue may affect the proper functioning of this access group.',
    )

const acs_access_group_being_deleted = common_acs_access_group_warning
  .extend({
    warning_code: z.literal('being_deleted').describe(warning_code_description),
  })
  .describe(
    'Indicates that the access group is being deleted from the access system. This is a temporary state, and the access group will be deleted shortly.',
  )

const acs_access_group_warning = z
  .union([unknown_issue_with_acs_access_group, acs_access_group_being_deleted])
  .describe('Warning associated with the `acs_access_group`.')

const _acs_access_group_warning_map = z.object({
  unknown_issue_with_acs_access_group: unknown_issue_with_acs_access_group
    .optional()
    .nullable(),
  being_deleted: acs_access_group_being_deleted.optional().nullable(),
})

export type AcsAccessGroupWarningMap = z.infer<
  typeof _acs_access_group_warning_map
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
  connected_account_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) that contains the access group.',
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
  warnings: z
    .array(acs_access_group_warning)
    .describe('Warnings associated with the `acs_access_group`.'),
})

export const acs_access_group = common_acs_access_group.extend({
  is_managed: z.literal(true),
}).describe(`
    ---
    route_path: /acs/access_groups
    ---
    Group that defines the entrances to which a set of users has access and, in some cases, the access schedule for these entrances and users.

    Some access control systems use [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups), which are sets of users, combined with sets of permissions. These permissions include both the set of areas or assets that the users can access and the schedule during which the users can access these areas or assets. Instead of assigning access rights individually to each access control system user, which can be time-consuming and error-prone, administrators can assign users to an access group, thereby ensuring that the users inherit all the permissions associated with the access group. Using access groups streamlines the process of managing large numbers of access control system users, especially in bigger organizations or complexes.

    To learn whether your access control system supports access groups, see the corresponding [system integration guide](https://docs.seam.co/latest/device-and-system-integration-guides/overview#access-control-systems).
  `)
export const unmanaged_acs_access_group = common_acs_access_group.extend({
  is_managed: z.literal(false),
}).describe(`
  ---
  route_path: /acs/access_groups/unmanaged
  undocumented: Unreleased.
  ---
`)

export type AcsAccessGroup = z.output<typeof acs_access_group>
export type UnmanagedAcsAccessGroup = z.output<
  typeof unmanaged_acs_access_group
>
