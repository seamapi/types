import { z } from 'zod'

const common_pending_mutation = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the mutation was created.'),
  message: z.string().describe('Detailed description of the mutation.'),
})

const creating = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('creating')
      .describe(
        'Mutation code to indicate that Seam is in the process of setting an access code on the device.',
      ),
  })
  .describe('Seam is in the process of setting an access code on the device.')

const deleting = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('deleting')
      .describe(
        'Mutation code to indicate that Seam is in the process of removing an access code from the device.',
      ),
  })
  .describe(
    'Seam is in the process of removing an access code from the device.',
  )

const updating_code = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_code')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing an updated PIN code to the device.',
      ),
    from: z
      .object({
        code: z.string().nullable().describe('Previous PIN code.'),
      })
      .describe('Previous code configuration.'),
    to: z
      .object({
        code: z.string().nullable().describe('New PIN code.'),
      })
      .describe('New code configuration.'),
  })
  .describe(
    'Seam is in the process of pushing an updated PIN code to the device.',
  )

const updating_name = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_name')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing an updated access code name to the device.',
      ),
    from: z
      .object({
        name: z.string().nullable().describe('Previous access code name.'),
      })
      .describe('Previous name configuration.'),
    to: z
      .object({
        name: z.string().nullable().describe('New access code name.'),
      })
      .describe('New name configuration.'),
  })
  .describe(
    'Seam is in the process of pushing an updated access code name to the device.',
  )

const updating_time_frame = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_time_frame')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing updated access code time frame to the device.',
      ),
    from: z
      .object({
        starts_at: z
          .string()
          .datetime()
          .nullable()
          .describe('Previous start time for the access code.'),
        ends_at: z
          .string()
          .datetime()
          .nullable()
          .describe('Previous end time for the access code.'),
      })
      .describe('Previous time frame configuration.'),
    to: z
      .object({
        starts_at: z
          .string()
          .datetime()
          .nullable()
          .describe('New start time for the access code.'),
        ends_at: z
          .string()
          .datetime()
          .nullable()
          .describe('New end time for the access code.'),
      })
      .describe('New time frame configuration.'),
  })
  .describe(
    'Seam is in the process of pushing an updated time frame to the device.',
  )

export const access_code_pending_mutations = z.discriminatedUnion(
  'mutation_code',
  [creating, deleting, updating_code, updating_name, updating_time_frame],
)

export type AccessCodePendingMutation = z.infer<
  typeof access_code_pending_mutations
>

// Internal fields stored in the DB but stripped from public API responses.
// Used to track the delete+recreate flow for providers that don't support
// in-place updates (e.g. Schlage, August).
const internal_recreate_fields = z.object({
  must_be_recreated_on_device: z.boolean().optional(),
  is_being_removed: z.boolean().optional(),
  is_being_created: z.boolean().optional(),
})

const _access_code_pending_mutations_map = z.object({
  creating: creating.optional().nullable(),
  deleting: deleting.optional().nullable(),
  updating_code: updating_code
    .merge(internal_recreate_fields)
    .optional()
    .nullable(),
  updating_name: updating_name
    .merge(internal_recreate_fields)
    .optional()
    .nullable(),
  updating_time_frame: updating_time_frame
    .merge(internal_recreate_fields)
    .optional()
    .nullable(),
})

export type AccessCodePendingMutationsMap = z.infer<
  typeof _access_code_pending_mutations_map
>
