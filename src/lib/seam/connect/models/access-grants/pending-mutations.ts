import { z } from 'zod'

const common_pending_mutation = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the mutation was created.'),
  message: z.string().describe('Detailed description of the mutation.'),
})

const updating_spaces_mutation = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_spaces')
      .describe(
        'Mutation code to indicate that Seam is in the process of updating the spaces (devices) associated with this access grant.',
      ),
    from: z
      .object({
        device_ids: z
          .array(z.string().uuid())
          .describe('Previous device IDs where access codes existed.'),
      })
      .describe('Previous location configuration.'),
    to: z
      .object({
        device_ids: z
          .array(z.string().uuid())
          .describe('New device IDs where access codes should be created.'),
        common_code_key: z
          .string()
          .nullable()
          .optional()
          .describe('Common code key to ensure PIN code reuse across devices.'),
      })
      .describe('New location configuration.'),
  })
  .describe(
    'Seam is in the process of updating the devices/spaces associated with this access grant.',
  )

const updating_access_times_mutation = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_access_times')
      .describe(
        'Mutation code to indicate that Seam is in the process of updating the access times for this access grant.',
      ),
    access_method_ids: z
      .array(z.string().uuid())
      .describe('IDs of the access methods being updated.'),
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
    'Seam is in the process of updating the access times for this access grant.',
  )

export const access_grant_pending_mutations = z.discriminatedUnion(
  'mutation_code',
  [updating_spaces_mutation, updating_access_times_mutation],
)

export type AccessGrantPendingMutation = z.infer<
  typeof access_grant_pending_mutations
>

const _access_grant_pending_mutations_map = z.object({
  updating_spaces: updating_spaces_mutation.optional().nullable(),
  updating_access_times: updating_access_times_mutation.optional().nullable(),
})

export type AccessGrantPendingMutationsMap = z.infer<
  typeof _access_grant_pending_mutations_map
>
