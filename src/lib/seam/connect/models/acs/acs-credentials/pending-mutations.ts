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

export const acs_credential_pending_mutations = z.discriminatedUnion(
  'mutation_code',
  [creating, deleting],
)

export type AcsCredentialPendingMutation = z.infer<
  typeof acs_credential_pending_mutations
>

const _acs_credential_pending_mutations_map = z.object({
  creating: creating.optional().nullable(),
  deleting: deleting.optional().nullable(),
})

export type AcsCredentialPendingMutationsMap = z.infer<
  typeof _acs_credential_pending_mutations_map
>
