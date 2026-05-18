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
        'Mutation code to indicate that Seam is in the process of pushing a credential creation to the integrated access system.',
      ),
  })
  .describe(
    'Seam is in the process of pushing a credential creation to the integrated access system.',
  )

const deleting = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('deleting')
      .describe(
        'Mutation code to indicate that Seam is in the process of pushing a credential deletion to the integrated access system.',
      ),
  })
  .describe(
    'Seam is in the process of pushing a credential deletion to the integrated access system.',
  )

const updating_user_assignment = common_pending_mutation
  .extend({
    mutation_code: z
      .literal('updating_user_assignment')
      .describe(
        'Mutation code to indicate that Seam is in the process of assigning or unassigning the credential to a user on the integrated access system.',
      ),
    from: z
      .object({
        acs_user_id: z.string().uuid().nullable().describe('Previous user ID.'),
      })
      .describe('Previous user assignment.'),
    to: z
      .object({
        acs_user_id: z.string().uuid().nullable().describe('New user ID.'),
      })
      .describe('New user assignment.'),
  })
  .describe(
    'Seam is in the process of assigning or unassigning the credential to a user on the integrated access system.',
  )

export const acs_credential_pending_mutations = z.discriminatedUnion(
  'mutation_code',
  [creating, deleting, updating_user_assignment],
)

export type AcsCredentialPendingMutation = z.infer<
  typeof acs_credential_pending_mutations
>

const _acs_credential_pending_mutations_map = z.object({
  creating: creating.optional().nullable(),
  deleting: deleting.optional().nullable(),
  updating_user_assignment: updating_user_assignment.optional().nullable(),
})

export type AcsCredentialPendingMutationsMap = z.infer<
  typeof _acs_credential_pending_mutations_map
>
