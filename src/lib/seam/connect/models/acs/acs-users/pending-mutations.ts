import { z } from 'zod'

import { phone_number } from '../../phone-number.js'

const common_pending_mutation = z.object({
  created_at: z.string().datetime(),
  message: z.string(),
})

const creating = common_pending_mutation.extend({
  mutation_code: z.literal('creating'),
})

const deleting = common_pending_mutation.extend({
  mutation_code: z.literal('deleting'),
})

const acs_user_info = z.object({
  email_address: z.string().email().nullable(),
  full_name: z.string().nullable(),
  phone_number: phone_number.optional().nullable(),
})

export const updating_user_information_mutation =
  common_pending_mutation.extend({
    mutation_code: z.literal('updating_user_information'),
    from: acs_user_info.partial(),
    to: acs_user_info.partial(),
  })

const access_schedule = z.object({
  starts_at: z.string().datetime().nullable(),
  ends_at: z.string().datetime().nullable(),
})

const updating_access_schedule_mutation = common_pending_mutation.extend({
  mutation_code: z.literal('updating_access_schedule'),
  from: access_schedule,
  to: access_schedule,
})

const updating_suspension_state_mutation = common_pending_mutation.extend({
  mutation_code: z.literal('updating_suspension_state'),
  from: z.object({ is_suspended: z.boolean() }),
  to: z.object({ is_suspended: z.boolean() }),
})

const updating_group_membership_mutation = common_pending_mutation.extend({
  mutation_code: z.literal('updating_group_membership'),
  from: z.object({
    acs_access_group_id: z.string().uuid().nullable(),
  }),
  to: z.object({
    acs_access_group_id: z.string().uuid().nullable(),
  }),
})

export const acs_user_pending_mutations = z.discriminatedUnion(
  'mutation_code',
  [
    creating,
    deleting,
    updating_user_information_mutation,
    updating_access_schedule_mutation,
    updating_suspension_state_mutation,
    updating_group_membership_mutation,
  ],
)

export type AcsUserPendingMutation = z.infer<typeof acs_user_pending_mutations>

export const acs_user_pending_mutations_map = z.object({
  creating: creating.optional().nullable(),
  deleting: deleting.optional().nullable(),
  updating_access_schedule: updating_access_schedule_mutation
    .optional()
    .nullable(),
  updating_group_membership: z
    .map(z.string().uuid(), updating_group_membership_mutation)
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
  typeof acs_user_pending_mutations_map
>
