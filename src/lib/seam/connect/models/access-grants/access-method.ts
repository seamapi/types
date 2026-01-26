import { z } from 'zod'

const common_access_method_warning = z.object({
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

const being_deleted = common_access_method_warning
  .extend({
    warning_code: z.literal('being_deleted').describe(warning_code_description),
  })
  .describe(
    'Indicates that the [access method](https://docs.seam.co/latest/capability-guides/access-grants/delivering-access-methods) is being deleted.',
  )

const updating_access_times_warning = common_access_method_warning
  .extend({
    warning_code: z
      .literal('updating_access_times')
      .describe(warning_code_description),
  })
  .describe(
    'Indicates that the access times for this [access method](https://docs.seam.co/latest/capability-guides/access-grants/delivering-access-methods) are being updated.',
  )

const access_method_warning = z
  .discriminatedUnion('warning_code', [
    being_deleted,
    updating_access_times_warning,
  ])
  .describe(
    'Warning associated with the [access method](https://docs.seam.co/latest/capability-guides/access-grants/delivering-access-methods).',
  )

const _access_method_warning_map = z.object({
  being_deleted: being_deleted.optional().nullable(),
  updating_access_times: updating_access_times_warning.optional().nullable(),
})

export type AccessMethodWarningMap = z.infer<typeof _access_method_warning_map>

// Pending mutations for access methods
const common_pending_mutation = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the mutation was created.'),
  message: z.string().describe('Detailed description of the mutation.'),
})

const provisioning_access_mutation = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('provisioning_access')
      .describe(
        'Mutation code to indicate that Seam is in the process of provisioning access for this access method on new devices.',
      ),
    from: z
      .object({
        device_ids: z
          .array(z.string().uuid())
          .describe('Previous device IDs where access was provisioned.'),
      })
      .describe('Previous device configuration.'),
    to: z
      .object({
        device_ids: z
          .array(z.string().uuid())
          .describe('New device IDs where access is being provisioned.'),
      })
      .describe('New device configuration.'),
  })
  .describe(
    'Seam is in the process of provisioning access for this access method on new devices.',
  )

const revoking_access_mutation = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('revoking_access')
      .describe(
        'Mutation code to indicate that Seam is in the process of revoking access for this access method from devices.',
      ),
    from: z
      .object({
        device_ids: z
          .array(z.string().uuid())
          .describe('Previous device IDs where access existed.'),
      })
      .describe('Previous device configuration.'),
    to: z
      .object({
        device_ids: z
          .array(z.string().uuid())
          .describe('New device IDs where access should remain.'),
      })
      .describe('New device configuration.'),
  })
  .describe(
    'Seam is in the process of revoking access for this access method from devices.',
  )

const updating_access_times_mutation = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_access_times')
      .describe(
        'Mutation code to indicate that Seam is in the process of updating the access times for this access method.',
      ),
    from: z
      .object({
        starts_at: z
          .string()
          .datetime()
          .nullable()
          .describe('Previous start time for access.'),
        ends_at: z
          .string()
          .datetime()
          .nullable()
          .describe('Previous end time for access.'),
      })
      .describe('Previous access time configuration.'),
    to: z
      .object({
        starts_at: z
          .string()
          .datetime()
          .nullable()
          .describe('New start time for access.'),
        ends_at: z
          .string()
          .datetime()
          .nullable()
          .describe('New end time for access.'),
      })
      .describe('New access time configuration.'),
  })
  .describe(
    'Seam is in the process of updating the access times for this access method.',
  )

export const access_method_pending_mutations = z.discriminatedUnion(
  'mutation_code',
  [
    provisioning_access_mutation,
    revoking_access_mutation,
    updating_access_times_mutation,
  ],
)

export type AccessMethodPendingMutation = z.infer<
  typeof access_method_pending_mutations
>

const _access_method_pending_mutations_map = z.object({
  provisioning_access: provisioning_access_mutation.optional().nullable(),
  revoking_access: revoking_access_mutation.optional().nullable(),
  updating_access_times: updating_access_times_mutation.optional().nullable(),
})

export type AccessMethodPendingMutationsMap = z.infer<
  typeof _access_method_pending_mutations_map
>

export const access_method = z.object({
  workspace_id: z
    .string()
    .uuid()
    .describe('ID of the Seam workspace associated with the access method.'),
  access_method_id: z.string().uuid().describe('ID of the access method.'),
  display_name: z.string().describe('Display name of the access method.'),
  mode: z
    .enum(['code', 'card', 'mobile_key'])
    .describe(
      'Access method mode. Supported values: `code`, `card`, `mobile_key`.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the access method was created.'),
  issued_at: z
    .string()
    .datetime()
    .nullable()
    .describe('Date and time at which the access method was issued.'),
  is_issued: z
    .boolean()
    .describe('Indicates whether the access method has been issued.'),
  instant_key_url: z
    .string()
    .url()
    .optional()
    .describe('URL of the Instant Key for mobile key access methods.'),
  client_session_token: z
    .string()
    .optional()
    .describe('Token of the client session associated with the access method.'),
  is_encoding_required: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether encoding with an card encoder is required to issue or reissue the plastic card associated with the access method.',
    ),
  code: z
    .string()
    .nullable()
    .optional()
    .describe('The actual PIN code for code access methods.'),
  warnings: z
    .array(access_method_warning)
    .describe(
      'Warnings associated with the [access method](https://docs.seam.co/latest/capability-guides/access-grants/delivering-access-methods).',
    ),
  pending_mutations: z
    .array(access_method_pending_mutations)
    .describe(
      'Pending mutations for the [access method](https://docs.seam.co/latest/capability-guides/access-grants/delivering-access-methods). Indicates operations that are in progress.',
    ),
  customization_profile_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the customization profile associated with the access method.',
    ),
}).describe(`
  ---
  draft: Early access.
  route_path: /access_methods
  ---
  Represents an access method for an Access Grant. Access methods describe the modes of access, such as PIN codes, plastic cards, and mobile keys. For a mobile key, the access method also stores the URL for the associated Instant Key.
  `)

export type AccessMethod = z.infer<typeof access_method>

// Unmanaged access method schema - excludes client sessions, instant keys, customization profiles, and keys
export const unmanaged_access_method = access_method.omit({
  instant_key_url: true,
  client_session_token: true,
  customization_profile_id: true,
}).describe(`
  ---
  draft: Early access.
  route_path: /access_methods/unmanaged
  ---
  Represents an unmanaged access method. Unmanaged access methods do not have client sessions, instant keys, customization profiles, or keys.
  `)

export type UnmanagedAccessMethod = z.infer<typeof unmanaged_access_method>
