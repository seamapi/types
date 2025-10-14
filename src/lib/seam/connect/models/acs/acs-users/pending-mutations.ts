import { z } from 'zod'

import { phone_number } from '../../phone-number.js'

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
        'Mutation code to indicate that Seam is in the process of pushing a user creation to the integrated access system.',
      ),
  })
  .describe(
    'Seam is in the process of pushing a user creation to the integrated access system.',
  )

const deleting = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('deleting')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing a user deletion to the integrated access system.',
      ),
  })
  .describe(
    'Seam is in the process of pushing a user deletion to the integrated access system.',
  )

const deferring_creation = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('deferring_creation')
      .describe(
        'Mutation code to indicate that Seam is intentionally deferring the creation of the user on the access control system until the appropriate time.',
      ),
    scheduled_at: z
      .string()
      .datetime()
      .optional()
      .nullable()
      .describe('Optional: When the user creation is scheduled to occur.'),
  })
  .describe(
    'User exists in Seam but has not been pushed to the provider yet. Will be created when a credential is issued.',
  )

const acs_user_info = z.object({
  email_address: z
    .string()
    .email()
    .nullable()
    .describe('Email address of the access system user.'),
  full_name: z
    .string()
    .nullable()
    .describe('Full name of the access system user.'),
  phone_number: phone_number
    .optional()
    .nullable()
    .describe('Phone number of the access system user.'),
})

export const updating_user_information_mutation =
  common_pending_mutation.extend({
    mutation_code: z
      .literal('updating_user_information')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing updated user information to the integrated access system.',
      ),
    from: acs_user_info
      .partial()
      .describe('Old access system user information.'),
    to: acs_user_info.partial().describe('New access system user information.'),
  })

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
      .describe('Starting time for the access schedule.'),
  })
  .describe('Access schedule involved in the mutation.')

const updating_access_schedule_mutation = common_pending_mutation
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

const updating_suspension_state_mutation = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_suspension_state')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing updated user suspension state information to the integrated access system.',
      ),
    from: z
      .object({ is_suspended: z.boolean() })
      .describe('Old user suspension state information.'),
    to: z
      .object({ is_suspended: z.boolean() })
      .describe('New user suspension state information.'),
  })
  .describe(
    'Seam is in the process of pushing a suspension state update to the integrated access system.',
  )

const updating_group_membership_mutation = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_group_membership')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing updated access group membership information to the integrated access system.',
      ),
    from: z
      .object({
        acs_access_group_id: z
          .string()
          .uuid()
          .nullable()
          .describe('Old access group ID.'),
      })
      .describe('Old access group membership.'),
    to: z
      .object({
        acs_access_group_id: z
          .string()
          .uuid()
          .nullable()
          .describe('New access group ID.'),
      })
      .describe('New access group membership.'),
  })
  .describe(
    'Seam is in the process of pushing an access group membership update to the integrated access system.',
  )

export const acs_user_pending_mutations = z.discriminatedUnion(
  'mutation_code',
  [
    creating,
    deleting,
    deferring_creation,
    updating_user_information_mutation,
    updating_access_schedule_mutation,
    updating_suspension_state_mutation,
    updating_group_membership_mutation,
  ],
)

export type AcsUserPendingMutation = z.infer<typeof acs_user_pending_mutations>

const _acs_user_pending_mutations_map = z.object({
  creating: creating.optional().nullable(),
  deleting: deleting.optional().nullable(),
  deferring_creation: deferring_creation.optional().nullable(),
  updating_access_schedule: updating_access_schedule_mutation
    .optional()
    .nullable(),
  updating_group_membership: z
    .record(z.string().uuid(), updating_group_membership_mutation)
    .optional()
    .nullable(),
  updating_suspension_state: updating_suspension_state_mutation
    .optional()
    .nullable(),
  'updating_user_information.full_name': common_pending_mutation
    .extend({
      mutation_code: z.literal('updating_user_information'),
      from: z.object({
        full_name: z.string().nullable(),
      }),
      to: z.object({
        full_name: z.string().nullable(),
      }),
    })
    .optional()
    .nullable(),
  'updating_user_information.email_address': common_pending_mutation
    .extend({
      mutation_code: z.literal('updating_user_information'),
      from: z.object({
        email_address: z.string().email().nullable(),
      }),
      to: z.object({
        email_address: z.string().email().nullable(),
      }),
    })
    .optional()
    .nullable(),
  'updating_user_information.phone_number': common_pending_mutation
    .extend({
      mutation_code: z.literal('updating_user_information'),
      from: z.object({
        phone_number: phone_number.nullable(),
      }),
      to: z.object({
        phone_number: phone_number.nullable(),
      }),
    })
    .optional()
    .nullable(),
})

export type AcsUserPendingMutationsMap = z.infer<
  typeof _acs_user_pending_mutations_map
>
