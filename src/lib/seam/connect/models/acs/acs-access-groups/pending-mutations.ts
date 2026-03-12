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
        'Mutation code to indicate that Seam is in the process of pushing an access group creation to the integrated access system.',
      ),
  })
  .describe(
    'Seam is in the process of pushing an access group creation to the integrated access system.',
  )

const deleting = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('deleting')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing an access group deletion to the integrated access system.',
      ),
  })
  .describe(
    'Seam is in the process of pushing an access group deletion to the integrated access system.',
  )

const acs_access_group_info = z.object({
  name: z.string().nullable().describe('Name of the access group.'),
})

const updating_group_information = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_group_information')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing updated access group information to the integrated access system.',
      ),
    from: acs_access_group_info
      .partial()
      .describe('Old access group information.'),
    to: acs_access_group_info
      .partial()
      .describe('New access group information.'),
  })
  .describe(
    'Seam is in the process of pushing an access group information update to the integrated access system.',
  )

const access_schedule = z
  .object({
    starts_at: z
      .string()
      .datetime()
      .nullable()
      .describe('Starting time for the access schedule.'),
    ends_at: z
      .string()
      .datetime()
      .nullable()
      .describe('Ending time for the access schedule.'),
  })
  .describe('Access schedule involved in the mutation.')

const updating_access_schedule = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_access_schedule')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing updated access schedule information to the integrated access system.',
      ),
    from: access_schedule.describe('Old access schedule information.'),
    to: access_schedule.describe('New access schedule information.'),
  })
  .describe(
    'Seam is in the process of pushing an access schedule update to the integrated access system.',
  )

const updating_user_membership = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_user_membership')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing updated user membership information to the integrated access system.',
      ),
    from: z
      .object({
        acs_user_id: z.string().uuid().nullable().describe('Old user ID.'),
      })
      .describe('Old user membership.'),
    to: z
      .object({
        acs_user_id: z.string().uuid().nullable().describe('New user ID.'),
      })
      .describe('New user membership.'),
  })
  .describe(
    'Seam is in the process of pushing a user membership update to the integrated access system.',
  )

const updating_entrance_membership = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_entrance_membership')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing updated entrance membership information to the integrated access system.',
      ),
    from: z
      .object({
        acs_entrance_id: z
          .string()
          .uuid()
          .nullable()
          .describe('Old entrance ID.'),
      })
      .describe('Old entrance membership.'),
    to: z
      .object({
        acs_entrance_id: z
          .string()
          .uuid()
          .nullable()
          .describe('New entrance ID.'),
      })
      .describe('New entrance membership.'),
  })
  .describe(
    'Seam is in the process of pushing an entrance membership update to the integrated access system.',
  )

const deferring_user_membership_update = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('deferring_user_membership_update')
      .describe(
        'Mutation code to indicate that a scheduled user membership change is pending for this access group.',
      ),
    acs_user_id: z
      .string()
      .uuid()
      .describe('ID of the user involved in the scheduled change.'),
    variant: z
      .enum(['adding', 'removing'])
      .describe(
        'Whether the user is scheduled to be added to or removed from this access group.',
      ),
  })
  .describe(
    'A scheduled user membership change is pending for this access group.',
  )

export const acs_access_group_pending_mutations = z.discriminatedUnion(
  'mutation_code',
  [
    creating,
    deleting,
    updating_group_information,
    updating_access_schedule,
    updating_user_membership,
    updating_entrance_membership,
    deferring_user_membership_update,
  ],
)

export type AcsAccessGroupPendingMutation = z.infer<
  typeof acs_access_group_pending_mutations
>

const _acs_access_group_pending_mutations_map = z.object({
  creating: creating.optional().nullable(),
  deleting: deleting.optional().nullable(),
  updating_name: updating_group_information.optional().nullable(),
  updating_access_schedule: updating_access_schedule.optional().nullable(),
  updating_user_membership: z
    .record(z.string().uuid(), updating_user_membership)
    .optional()
    .nullable(),
  updating_entrance_membership: z
    .record(z.string().uuid(), updating_entrance_membership)
    .optional()
    .nullable(),
  deferring_user_membership_update: z
    .record(z.string().uuid(), deferring_user_membership_update)
    .optional()
    .nullable(),
})

export type AcsAccessGroupPendingMutationsMap = z.infer<
  typeof _acs_access_group_pending_mutations_map
>
