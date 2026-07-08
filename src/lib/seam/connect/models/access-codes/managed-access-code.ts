import { z } from 'zod'

import { device_and_connected_account_error_options } from '../devices/index.js'
import { access_code_pending_mutations } from './pending-mutations.js'

const common_access_code_error = z.object({
  message: z
    .string()
    .describe(
      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
    ),
  is_access_code_error: z
    .literal(true)
    .describe('Indicates that this is an access code error.'),
  created_at: z
    .string()
    .datetime()
    .optional()
    .describe('Date and time at which Seam created the error.'),
})

const error_code_description =
  'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.'

const provider_issue = common_access_code_error.extend({
  error_code: z.literal('provider_issue').describe(error_code_description),
}).describe(`
    ---
    resource_type: access_code
    ---
    Indicates a provider-specific issue that prevents the access code from being set or managed. Check the error message for details.
    `)

const modified_field = z.object({
  field: z
    .string()
    .describe(
      'The name of the field that was changed (e.g. `code`, `starts_at`, `ends_at`).',
    ),
  from: z.string().nullable().describe('The previous value of the field.'),
  to: z.string().nullable().describe('The new value of the field.'),
})

const code_modified_external_to_seam_error = common_access_code_error.extend({
  error_code: z
    .literal('code_modified_external_to_seam')
    .describe(error_code_description),
  change_type: z
    .enum(['modified', 'removed'])
    .optional()
    .describe(
      "Indicates the type of external modification. `modified` means the code's PIN or schedule was changed. `removed` means the code was deleted from the device.",
    ),
  modified_fields: z
    .array(modified_field)
    .optional()
    .describe(
      'List of fields that were changed externally, with their previous and new values.',
    ),
}).describe(`
    ---
    resource_type: access_code
    ---
    Code was modified or removed externally after Seam successfully set it on the device.
    `)

const failed_to_set_on_device = common_access_code_error.extend({
  error_code: z
    .literal('failed_to_set_on_device')
    .describe(error_code_description),
}).describe(`
    ---
    resource_type: access_code
    ---
    Failed to set code on device.
    `)

const failed_to_remove_from_device = common_access_code_error.extend({
  error_code: z
    .literal('failed_to_remove_from_device')
    .describe(error_code_description),
}).describe(`
    ---
    resource_type: access_code
    ---
    Failed to remove code from device.
    `)

const duplicate_code_on_device = common_access_code_error.extend({
  error_code: z
    .literal('duplicate_code_on_device')
    .describe(error_code_description),
  unmanaged_access_code_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the unmanaged access code that conflicts with this managed access code, when Seam can identify it.',
    ),
  managed_access_code_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the managed access code that conflicts with this managed access code, when Seam can identify it.',
    ),
}).describe(`
    ---
    resource_type: access_code
    ---
    Duplicate access code detected on device.
    `)

const duplicate_code_attempt_prevented = common_access_code_error.extend({
  error_code: z
    .literal('duplicate_code_attempt_prevented')
    .describe(error_code_description),
}).describe(`
    ---
    resource_type: access_code
    ---
    An attempt to modify this access code was prevented.
    `)

const no_space_for_access_code_on_device = common_access_code_error.extend({
  error_code: z
    .literal('no_space_for_access_code_on_device')
    .describe(error_code_description),
}).describe(`
    ---
    resource_type: access_code
    ---
    No space for access code on device.
    `)

const access_code_state_unconfirmed = common_access_code_error.extend({
  error_code: z
    .literal('access_code_state_unconfirmed')
    .describe(error_code_description),
}).describe(`
    ---
    resource_type: access_code
    ---
    Indicates that the provider cannot confirm whether the access code was set or removed on the device.
    `)

const insufficient_permissions = common_access_code_error.extend({
  error_code: z
    .literal('insufficient_permissions')
    .describe(error_code_description),
}).describe(`
    ---
    resource_type: access_code
    ---
    Admin role required—insufficient permissions to manage PINs on this device. Please have an admin update your role, or ask them to set the PIN.
    `)

const access_code_inactive_error = common_access_code_error.extend({
  error_code: z
    .literal('access_code_inactive')
    .describe(error_code_description),
}).describe(`
    ---
    resource_type: access_code
    ---
    Indicates that the access code is disabled or inactive on the device. The code exists but will not grant access until re-enabled.
    `)

const salto_ks_user_not_subscribed = common_access_code_error
  .extend({
    error_code: z
      .literal('salto_ks_user_not_subscribed')
      .describe(error_code_description),
  })
  .describe(
    `
    ---
    resource_type: access_code
    deprecated: Use \`access_code_inactive\` instead.
    ---
    Salto site user is not subscribed.
    `,
  )

const access_code_error = z
  .discriminatedUnion('error_code', [
    provider_issue,
    failed_to_set_on_device,
    failed_to_remove_from_device,
    duplicate_code_on_device,
    duplicate_code_attempt_prevented,
    no_space_for_access_code_on_device,
    access_code_state_unconfirmed,
    code_modified_external_to_seam_error,
    access_code_inactive_error,
    salto_ks_user_not_subscribed,
    insufficient_permissions,
  ])
  .describe(
    'Errors associated with the [access code](https://docs.seam.co/low-level-apis/smart-locks/access-codes).',
  )

export type AccessCodeError = z.infer<typeof access_code_error>

const _access_code_error_map = z.object({
  provider_issue: provider_issue.optional().nullable(),
  failed_to_set_on_device: failed_to_set_on_device.optional().nullable(),
  failed_to_remove_from_device: failed_to_remove_from_device
    .optional()
    .nullable(),
  no_space_for_access_code_on_device: no_space_for_access_code_on_device
    .optional()
    .nullable(),
  duplicate_code_on_device: duplicate_code_on_device.optional().nullable(),
  duplicate_code_attempt_prevented: duplicate_code_attempt_prevented
    .optional()
    .nullable(),
  access_code_state_unconfirmed: access_code_state_unconfirmed
    .optional()
    .nullable(),
  insufficient_permissions: insufficient_permissions.optional().nullable(),
  code_modified_external_to_seam_error: code_modified_external_to_seam_error
    .optional()
    .nullable(),
  access_code_inactive: access_code_inactive_error.optional().nullable(),
  salto_ks_user_not_subscribed: salto_ks_user_not_subscribed
    .optional()
    .nullable(),
})

export type AccessCodeErrorMap = z.infer<typeof _access_code_error_map>

const common_access_code_warning = z.object({
  message: z
    .string()
    .describe(
      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
    ),
  created_at: z
    .string()
    .datetime()
    .optional()
    .describe('Date and time at which Seam created the warning.'),
})

const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const code_modified_external_to_seam_warning = common_access_code_warning
  .extend({
    warning_code: z
      .literal('code_modified_external_to_seam')
      .describe(warning_code_description),
    change_type: z
      .enum(['modified', 'removed'])
      .optional()
      .describe(
        "Indicates the type of external modification. `modified` means the code's PIN or schedule was changed. `removed` means the code was deleted from the device.",
      ),
    modified_fields: z
      .array(modified_field)
      .optional()
      .describe(
        'List of fields that were changed externally, with their previous and new values.',
      ),
  })
  .describe(
    'Code was modified or removed externally after Seam successfully set it on the device.',
  )

const code_rotates_periodically = common_access_code_warning
  .extend({
    warning_code: z
      .literal('code_rotates_periodically')
      .describe(warning_code_description),
  })
  .describe(
    "The access code's PIN rotates periodically when the code is renewed. Retrieve the latest code before each use.",
  )

const schlage_access_code_ambiguous_timezone_dst_risk =
  common_access_code_warning
    .extend({
      warning_code: z
        .literal('schlage_access_code_ambiguous_timezone_dst_risk')
        .describe(warning_code_description),
    })
    .describe(
      "The Schlage device's timezone is ambiguous and this code's schedule crosses a daylight-saving transition in at least one plausible timezone. A 1-hour safety buffer has been applied to the side of the schedule affected by the transition (`ends_at` for spring-forward, `starts_at` for fall-back) so the code stays active through the shift — the code may be usable up to 1 hour beyond your requested window. Set the device's timezone via `/devices/report_provider_metadata` to clear the buffer and guarantee exact DST handling.",
    )

const delay_in_setting_on_device = common_access_code_warning
  .extend({
    warning_code: z
      .literal('delay_in_setting_on_device')
      .describe(warning_code_description),
  })
  .describe('Delay in setting code on device.')

const delay_in_removing_from_device = common_access_code_warning
  .extend({
    warning_code: z
      .literal('delay_in_removing_from_device')
      .describe(warning_code_description),
  })
  .describe('Delay in removing code from device.')

const third_party_integration_detected = common_access_code_warning
  .extend({
    warning_code: z
      .literal('third_party_integration_detected')
      .describe(warning_code_description),
  })
  .describe(
    'Third-party integration detected that may cause access codes to fail.',
  )

const igloo_algopin_must_be_used_within_24_hours = common_access_code_warning
  .extend({
    warning_code: z
      .literal('igloo_algopin_must_be_used_within_24_hours')
      .describe(warning_code_description),
  })
  .describe('Algopins must be used within 24 hours.')

const management_transferred = common_access_code_warning
  .extend({
    warning_code: z
      .literal('management_transferred')
      .describe(warning_code_description),
  })
  .describe('Management was transferred to another workspace.')

const using_backup_access_code = common_access_code_warning
  .extend({
    warning_code: z
      .literal('using_backup_access_code')
      .describe(warning_code_description),
  })
  .describe(
    'A backup access code has been pulled and is being used in place of this access code.',
  )

const being_deleted = common_access_code_warning
  .extend({
    warning_code: z.literal('being_deleted').describe(warning_code_description),
  })
  .describe('Access code is being deleted.')

const access_code_warning = z
  .discriminatedUnion('warning_code', [
    code_rotates_periodically,
    schlage_access_code_ambiguous_timezone_dst_risk,
    code_modified_external_to_seam_warning,
    delay_in_setting_on_device,
    delay_in_removing_from_device,
    third_party_integration_detected,
    igloo_algopin_must_be_used_within_24_hours,
    management_transferred,
    using_backup_access_code,
    being_deleted,
  ])
  .describe(
    'Warnings associated with the [access code](https://docs.seam.co/low-level-apis/smart-locks/access-codes).',
  )

export type AccessCodeWarning = z.infer<typeof access_code_warning>

const _access_code_warning_map = z.object({
  code_rotates_periodically: code_rotates_periodically.optional().nullable(),
  schlage_access_code_ambiguous_timezone_dst_risk:
    schlage_access_code_ambiguous_timezone_dst_risk.optional().nullable(),
  code_modified_external_to_seam_warning: code_modified_external_to_seam_warning
    .optional()
    .nullable(),
  delay_in_setting_on_device: delay_in_setting_on_device.optional().nullable(),
  delay_in_removing_from_device: delay_in_removing_from_device
    .optional()
    .nullable(),
  third_party_integration_detected: third_party_integration_detected
    .optional()
    .nullable(),
  igloo_algopin_must_be_used_within_24_hours:
    igloo_algopin_must_be_used_within_24_hours.optional().nullable(),
  management_transferred: management_transferred.optional().nullable(),
  using_backup_access_code: using_backup_access_code.optional().nullable(),
  being_deleted: being_deleted.optional().nullable(),
})

export type AccessCodeWarningMap = z.infer<typeof _access_code_warning_map>

export const dormakaba_oracode_access_code_metadata = z
  .object({
    stay_id: z
      .number()
      .describe('Dormakaba Oracode stay ID associated with this access code.'),
    user_level_id: z
      .string()
      .optional()
      .describe(
        'Dormakaba Oracode user level ID associated with this access code.',
      ),
    user_level_name: z
      .string()
      .nullable()
      .describe(
        'Dormakaba Oracode user level name associated with this access code.',
      ),
    site_name: z
      .string()
      .optional()
      .describe(
        'Dormakaba Oracode site name associated with this access code.',
      ),
    is_cancellable: z
      .boolean()
      .optional()
      .describe(
        'Indicates whether the stay can be cancelled via the Dormakaba Oracode API.',
      ),
    is_extendable: z
      .boolean()
      .optional()
      .describe(
        'Indicates whether the stay can be extended via the Dormakaba Oracode API.',
      ),
    is_early_checkin_able: z
      .boolean()
      .optional()
      .describe('Indicates whether early check-in is available for this stay.'),
    is_overridable: z
      .boolean()
      .optional()
      .describe(
        'Indicates whether the access code can be overridden. When false, the maximum number of overrides has been reached.',
      ),
  })
  .describe('Metadata for a dormakaba Oracode access code.')

export const access_code = z.object({
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'Unique identifier for the Seam workspace associated with the access code.',
    ),
  common_code_key: z
    .string()
    .nullable()
    .describe(
      'Unique identifier for a group of access codes that share the same code.',
    ),
  is_scheduled_on_device: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the code is set on the device according to a preconfigured schedule.',
    ),
  type: z
    .enum(['time_bound', 'ongoing'])
    .describe(
      'Type of the access code. `ongoing` access codes are active continuously until deactivated manually. `time_bound` access codes have a specific duration.',
    ),
  is_waiting_for_code_assignment: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the access code is waiting for a code assignment.',
    ),
  access_code_id: z
    .string()
    .uuid()
    .describe('Unique identifier for the access code.'),
  device_id: z
    .string()
    .uuid()
    .describe(
      'Unique identifier for the device associated with the access code.',
    ),
  name: z
    .string()
    .nullable()
    .describe(
      "Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes. Note that the name provided on Seam is used to identify the code on Seam and is not necessarily the name that will appear in the lock provider's app or on the device. This is because lock providers may have constraints on names, such as length, uniqueness, or characters that can be used. In addition, some lock providers may break down names into components such as `first_name` and `last_name`. To provide a consistent experience, Seam identifies the code on Seam by its name but may modify the name that appears on the lock provider's app or on the device. For example, Seam may add additional characters or truncate the name to meet provider constraints. To help your users identify codes set by Seam, Seam provides the name exactly as it appears on the lock provider's app or on the device as a separate property called `appearance`. This is an object with a `name` property and, optionally, `first_name` and `last_name` properties (for providers that break down a name into components).",
    ),
  code: z
    .string()
    .nullable()
    .describe(
      'Code used for access. Typically, a numeric or alphanumeric string.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the access code was created.'),
  errors: z.array(
    z.discriminatedUnion('error_code', [
      ...access_code_error.options,
      ...device_and_connected_account_error_options,
    ]),
  ).describe(`
        ---
        variant_groups:
          locks:
            name: Locks
          access_codes:
            name: Access Codes
          thermostats:
            name: Thermostats
          hardware:
            name: Hardware
          noise_sensors:
            name: Noise Sensors
          phones:
            name: Phones
          provider_metadata:
            name: Provider Metadata
        ---
        Errors associated with the [access code](https://docs.seam.co/low-level-apis/smart-locks/access-codes).
      `),
  warnings: z.array(access_code_warning).describe(`
        ---
        variant_groups:
          locks:
            name: Locks
          access_codes:
            name: Access Codes
          thermostats:
            name: Thermostats
          hardware:
            name: Hardware
          noise_sensors:
            name: Noise Sensors
          phones:
            name: Phones
          provider_metadata:
            name: Provider Metadata
        ---
        Warnings associated with the [access code](https://docs.seam.co/low-level-apis/smart-locks/access-codes).
      `),
  is_managed: z
    .literal(true)
    .describe('Indicates whether Seam manages the access code.'),
  starts_at: z
    .string()
    .datetime()
    .nullable()
    .optional()
    .describe(
      'Date and time at which the time-bound access code becomes active.',
    ),
  ends_at: z
    .string()
    .datetime()
    .nullable()
    .optional()
    .describe(
      'Date and time after which the time-bound access code becomes inactive.',
    ),
  status: z
    .enum(['setting', 'set', 'unset', 'removing', 'unknown'])
    .describe(
      'Current status of the access code within the operational lifecycle. Values are `setting`, a transitional phase that indicates that the code is being configured or activated; `set`, which indicates that the code is active and operational; `unset`, which indicates a deactivated or unused state, either before activation or after deliberate deactivation; `removing`, which indicates a transitional period in which the code is being deleted or made inactive; and `unknown`, which indicates an indeterminate state, due to reasons such as system errors or incomplete data, that highlights a potential need for system review or troubleshooting. See also [Lifecycle of Access Codes](https://docs.seam.co/low-level-apis/smart-locks/access-codes/lifecycle-of-access-codes).',
    ),
  is_backup_access_code_available: z
    .boolean()
    .describe(
      'Indicates whether a backup access code is available for use if the primary access code is lost or compromised.',
    ),
  is_backup: z
    .boolean()
    .optional()
    .describe('Indicates whether the access code is a backup code.'),
  pulled_backup_access_code_id: z
    .string()
    .uuid()
    .nullable()
    .optional()
    .describe(
      'Identifier of the pulled backup access code. Used to associate the pulled backup access code with the original access code.',
    ),
  is_external_modification_allowed: z
    .boolean()
    .describe(
      'Indicates whether changes to the access code from external sources are permitted.',
    ),
  is_one_time_use: z
    .boolean()
    .describe(
      'Indicates whether the access code can only be used once. If `true`, the code becomes invalid after the first use.',
    ),
  is_offline_access_code: z
    .boolean()
    .describe(
      'Indicates whether the access code is intended for use in offline scenarios. If `true`, this code can be created on a device without a network connection.',
    ),
  dormakaba_oracode_metadata: dormakaba_oracode_access_code_metadata
    .nullable()
    .optional()
    .describe(
      'Metadata for a dormakaba Oracode managed access code. Only present for access codes from dormakaba Oracode devices.',
    ),
  pending_mutations: z
    .array(access_code_pending_mutations)
    .describe(
      'Collection of pending mutations for the access code. Indicates changes that Seam is in the process of pushing to the device.',
    ),
}).describe(`
  ---
  route_path: /access_codes
  ---
  Represents a smart lock [access code](https://docs.seam.co/low-level-apis/smart-locks/access-codes).

  An access code is a code used for a keypad or pinpad device. Unlike physical keys, which can easily be lost or duplicated, PIN codes can be customized, tracked, and altered on the fly. Using the Seam Access Code API, you can easily generate access codes on the hundreds of door lock models with which we integrate.

  Seam supports programming two types of access codes: [ongoing](https://docs.seam.co/low-level-apis/smart-locks/access-codes#ongoing-access-codes) and [time-bound](https://docs.seam.co/low-level-apis/smart-locks/access-codes#time-bound-access-codes). To differentiate between the two, refer to the \`type\` property of the access code. Ongoing codes display as \`ongoing\`, whereas time-bound codes are labeled \`time_bound\`. An ongoing access code is active, until it has been removed from the device. To specify an ongoing access code, leave both \`starts_at\` and \`ends_at\` empty. A time-bound access code will be programmed at the \`starts_at\` time and removed at the \`ends_at\` time.

  In addition, for certain devices, Seam also supports [offline access codes](https://docs.seam.co/low-level-apis/smart-locks/access-codes#offline-access-codes). Offline access (PIN) codes are designed for door locks that might not always maintain an internet connection. For this type of access code, the device manufacturer uses encryption keys (tokens) to create server-based registries of algorithmically-generated offline PIN codes. Because the tokens remain synchronized with the managed devices, the locks do not require an active internet connection—and you do not need to be near the locks—to create an offline access code. Then, owners or managers can share these offline codes with users through a variety of mechanisms, such as messaging applications. That is, lock users do not need to install a smartphone application to receive an offline access code.

  For granting a person access to a space, [Access Grants](https://docs.seam.co/use-cases/granting-access) are the default and recommended approach and work across both standalone smart locks and access systems. Use the lower-level Access Codes API directly only when you specifically need to manage individual PIN codes.
`)

export type AccessCode = z.infer<typeof access_code>
