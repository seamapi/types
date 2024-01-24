import { z } from 'zod'

export const access_code_code_constraint = z.object({
  constraint_type: z.enum([
    'no_zeros', // Nuki
    'cannot_start_with_12', // Nuki
    'no_triple_consecutive_ints', // Brivo
    'cannot_specify_pin_code', // Lockly
    'pin_code_matches_existing_set', // Salto
    'start_date_in_future', // Kwikset
  ]),
})

export const access_code_name_constraint = z.object({
  constraint_type: z.literal('name_length'), // Nuki, Kwikset
  min_length: z.number().optional(),
  max_length: z.number().optional(),
})

export const access_code_constraint = z.union([
  access_code_code_constraint,
  access_code_name_constraint,
])

export type AccessCodeConstraint = z.infer<typeof access_code_constraint>

export const access_code_capability_properties = z.object({
  _experimental_supported_code_from_access_codes_lengths: z
    .array(z.number())
    .optional(),
  code_constraints: z.array(access_code_constraint).optional(),
  supported_code_lengths: z.array(z.number()).optional(),
  max_active_codes_supported: z.number().optional(),
  supports_backup_access_code_pool: z.boolean().optional(),
  has_native_entry_events: z.boolean().optional(),
})
