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

const time_frame_option_time_pair = z
  .object({
    display_name: z.string().describe('Label for the start/end time pairing.'),
    start_time: z
      .string()
      .describe(
        "Start time of day as a 24-hour `HH:MM` value, interpreted in the option's `time_zone`.",
      ),
    end_time: z
      .string()
      .describe(
        "End time of day as a 24-hour `HH:MM` value, interpreted in the option's `time_zone`. An `end_time` earlier on the clock than `start_time` means the end falls on a later date.",
      ),
  })
  .describe(
    'Fixed start/end time pairing. The caller picks one whole pairing; the two times cannot be mixed across pairs.',
  )

export const time_frame_option = z
  .object({
    display_name: z
      .string()
      .describe(
        'Label for this option. For a single-option device, the product name (for example, `algoPIN` or `SmartPIN`); for a multi-option device, a label that distinguishes it (for example, `Hourly` or `Fixed start times`).',
      ),
    min_duration: z
      .string()
      .optional()
      .describe(
        'Minimum duration this option covers, as an ISO 8601 duration (for example, `PT1H` or `P29D`). Omitted when there is no minimum.',
      ),
    max_duration: z
      .string()
      .optional()
      .describe(
        'Maximum duration this option covers, as an ISO 8601 duration (for example, `PT672H` or `P367D`). Omitted when there is no maximum.',
      ),
    matching_start_end_time: z
      .literal(true)
      .optional()
      .describe(
        'When `true`, the start and end must fall at the same time of day (the caller picks which). Mutually exclusive with `time_pairs`.',
      ),
    time_pairs: z
      .array(time_frame_option_time_pair)
      .optional()
      .describe(
        'Fixed start/end time pairings the caller chooses from. Mutually exclusive with `matching_start_end_time`.',
      ),
    start_date_recurrence_rule: z
      .string()
      .optional()
      .describe(
        'iCalendar recurrence rule (RRULE) that the start date must fall on (for example, `FREQ=MONTHLY;BYDAY=1MO,3MO`). Constrains which calendar dates are selectable, independent of the time-of-day rules.',
      ),
    end_date_recurrence_rule: z
      .string()
      .optional()
      .describe(
        'iCalendar recurrence rule (RRULE) that the end date must fall on. Constrains which calendar dates are selectable, independent of the time-of-day rules.',
      ),
    time_zone: z
      .string()
      .optional()
      .describe(
        'IANA time zone for interpreting `time_pairs` and the date recurrence rules. Present only when the option fixes times or dates.',
      ),
  })
  .describe(
    'One way to make a code: a duration band plus the time-of-day and date rules that apply within it. Absence of a rule means unrestricted on that axis.',
  )

export type TimeFrameOption = z.infer<typeof time_frame_option>

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
  offline_time_frame_options: z.array(time_frame_option).optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Time frames that may be requested when creating an offline access code, expressed as a list of options. The caller picks one option (by matching the requested duration when the options' duration ranges do not overlap, or by \`display_name\` when they do) and satisfies that one option's rules. When \`undefined\`, any time frame works.`),
  online_time_frame_options: z.array(time_frame_option).optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Time frames that may be requested when creating an online access code, expressed as a list of options. The caller picks one option (by matching the requested duration when the options' duration ranges do not overlap, or by \`display_name\` when they do) and satisfies that one option's rules. When \`undefined\`, any time frame works.`),
  max_active_codes_supported: z.number().optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Maximum number of active access codes that the device supports.`),
  supports_backup_access_code_pool: z.boolean().optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Indicates whether the device supports a [backup access code pool](https://docs.seam.co/low-level-apis/smart-locks/access-codes/backup-access-codes).`),
  backup_access_code_pool_enabled: z.boolean().optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Indicates whether the [backup access code pool](https://docs.seam.co/low-level-apis/smart-locks/access-codes/backup-access-codes) is currently enabled for the device. To disable it, set this to \`false\` using [/devices/update](https://docs.seam.co/api/devices/update).`),
  has_native_entry_events: z.boolean().optional().describe(`
          ---
          property_group_key: access_codes
          ---
          Indicates whether the device supports native entry events.`),
})
