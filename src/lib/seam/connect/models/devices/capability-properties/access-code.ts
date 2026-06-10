import { z } from 'zod'

export const access_code_code_constraint = z
  .object({
    constraint_type: z
      .enum([
        'no_zeros', // Nuki
        'cannot_start_with_12', // Nuki
        'no_triple_consecutive_ints', // Brivo
        'cannot_specify_pin_code', // Dormakaba?
        'pin_code_matches_existing_set', // Salto
        'start_date_in_future', // Kwikset
        'no_ascending_or_descending_sequence', // Tedee, Korelock
        'at_least_three_unique_digits', // Tedee
        'cannot_contain_089', // TTLock
        'cannot_contain_0789', // TTLock (for some cylinder devices only)
        'unique_first_four_digits', // Schlage
        'no_all_same_digits', // Korelock
      ])
      .describe(`Code constraint type for access codes.`),
  })
  .describe(`Code constraint for access codes.`)

export const access_code_name_constraint = z
  .object({
    constraint_type: z.enum(['name_length', 'name_must_be_unique']), // Nuki, Kwikset
    min_length: z
      .number()
      .optional()
      .describe(`Minimum name length constraint for access codes.`),
    max_length: z
      .number()
      .optional()
      .describe(`Maximum name length constraint for access codes.`),
  })
  .describe(`Name constraint for access codes.`)

export const access_code_constraint = z
  .union([access_code_code_constraint, access_code_name_constraint])
  .describe(`Access code constraint.`)

export type AccessCodeConstraint = z.infer<typeof access_code_constraint>

export const access_code_capability_properties = z.object({
  _experimental_supported_code_from_access_codes_lengths: z
    .array(z.number())
    .optional().describe(`
          ---
          undocumented: Marked as experimental.
          ---
          `),
  code_constraints: z.array(access_code_constraint).optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Constraints on access codes for the device. Seam represents each constraint as an object with a \`constraint_type\` property. Depending on the constraint type, there may also be additional properties. Note that some constraints are manufacturer- or device-specific.`),
  supported_code_lengths: z.array(z.number()).optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Supported code lengths for access codes.`),
  max_active_codes_supported: z.number().optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Maximum number of active access codes that the device supports.`),
  supports_backup_access_code_pool: z.boolean().optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Indicates whether the device supports a [backup access code pool](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/backup-access-codes).`),
  has_native_entry_events: z.boolean().optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Indicates whether the device supports native entry events.`),
})
