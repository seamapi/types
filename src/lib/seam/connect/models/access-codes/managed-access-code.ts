import { z } from 'zod'

import { device_and_connected_account_error_options } from '../devices/index.js'

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

const smartthings_failed_to_set_access_code_error = common_access_code_error
  .extend({
    error_code: z
      .literal('smartthings_failed_to_set_access_code')
      .describe(error_code_description),
  })
  .describe('Failed to set code on SmartThings device.')

const smartthings_failed_to_set_after_multiple_retries =
  common_access_code_error
    .extend({
      error_code: z
        .literal('smartthings_failed_to_set_after_multiple_retries')
        .describe(error_code_description),
    })
    .describe('Failed to set code after multiple retries.')

const code_modified_external_to_seam_error = common_access_code_error
  .extend({
    error_code: z
      .literal('code_modified_external_to_seam')
      .describe(error_code_description),
  })
  .describe(
    'Code was modified or removed externally after Seam successfully set it on the device.',
  )

const failed_to_set_on_device = common_access_code_error
  .extend({
    error_code: z
      .literal('failed_to_set_on_device')
      .describe(error_code_description),
  })
  .describe('Failed to set code on device.')

const failed_to_remove_from_device = common_access_code_error
  .extend({
    error_code: z
      .literal('failed_to_remove_from_device')
      .describe(error_code_description),
  })
  .describe('Failed to remove code from device.')

const duplicate_code_on_device = common_access_code_error
  .extend({
    error_code: z
      .literal('duplicate_code_on_device')
      .describe(error_code_description),
  })
  .describe('Duplicate access code detected on device.')

const duplicate_code_attempt_prevented = common_access_code_error
  .extend({
    error_code: z
      .literal('duplicate_code_attempt_prevented')
      .describe(error_code_description),
  })
  .describe('An attempt to modify this access code was prevented.')

const no_space_for_access_code_on_device = common_access_code_error
  .extend({
    error_code: z
      .literal('no_space_for_access_code_on_device')
      .describe(error_code_description),
  })
  .describe('No space for access code on device.')

const igloohome_bridge_too_many_pending_jobs = common_access_code_error
  .extend({
    error_code: z
      .literal('igloohome_bridge_too_many_pending_jobs')
      .describe(error_code_description),
  })
  .describe('Igloohome bridge has too many pending jobs in the queue.')

const igloohome_bridge_offline = common_access_code_error
  .extend({
    error_code: z
      .literal('igloohome_bridge_offline')
      .describe(error_code_description),
  })
  .describe('Igloohome bridge is offline.')

const kwikset_unable_to_confirm_code = common_access_code_error
  .extend({
    error_code: z
      .literal('kwikset_unable_to_confirm_code')
      .describe(error_code_description),
  })
  .describe('Unable to confirm that the access code is set on Kwikset device.')

const kwikset_unable_to_confirm_deletion = common_access_code_error
  .extend({
    error_code: z
      .literal('kwikset_unable_to_confirm_deletion')
      .describe(error_code_description),
  })
  .describe(
    'Unable to confirm the deletion of the access code on Kwikset device.',
  )

const kwikset_insufficient_permissions = common_access_code_error
  .extend({
    error_code: z
      .literal('kwikset_insufficient_permissions')
      .describe(error_code_description),
  })
  .describe(
    'Admin role required—insufficient permissions to manage PINs on this Kwikset device. Please have a Home Admin update your role in the Kwikset app, or ask them to set the PIN.',
  )

const august_lock_invalid_code_length = common_access_code_error
  .extend({
    error_code: z
      .literal('august_lock_invalid_code_length')
      .describe(error_code_description),
  })
  .describe('Invalid code length for August lock.')

const august_device_programming_delay_error = common_access_code_error
  .extend({
    error_code: z
      .literal('august_device_programming_delay')
      .describe(error_code_description),
  })
  .describe('Access code has not yet been fully moved to the device.')

const august_lock_temporarily_offline_error = common_access_code_error
  .extend({
    error_code: z
      .literal('august_lock_temporarily_offline')
      .describe(error_code_description),
  })
  .describe('August lock is temporarily offline.')

const august_lock_missing_keypad = common_access_code_error
  .extend({
    error_code: z
      .literal('august_lock_missing_keypad')
      .describe(error_code_description),
  })
  .describe('August lock is missing a keypad.')

const salto_ks_user_not_subscribed = common_access_code_error
  .extend({
    error_code: z
      .literal('salto_ks_user_not_subscribed')
      .describe(error_code_description),
  })
  .describe('Salto site user is not subscribed.')

const hubitat_device_programming_delay = common_access_code_error
  .extend({
    error_code: z
      .literal('hubitat_device_programming_delay')
      .describe(error_code_description),
  })
  .describe('Access code has not yet been fully moved to the device.')

const hubitat_no_free_positions_available = common_access_code_error
  .extend({
    error_code: z
      .literal('hubitat_no_free_positions_available')
      .describe(error_code_description),
  })
  .describe('No free positions available on the device.')

const smartthings_no_free_slots_available = common_access_code_error
  .extend({
    error_code: z
      .literal('smartthings_no_free_slots_available')
      .describe(error_code_description),
  })
  .describe('No free slots available on the device.')

const wyze_duplicate_code_name = common_access_code_error
  .extend({
    error_code: z
      .literal('wyze_duplicate_code_name')
      .describe(error_code_description),
  })
  .describe('Duplicate access code name detected.')

const wyze_potential_duplicate_code = common_access_code_error
  .extend({
    error_code: z
      .literal('wyze_potential_duplicate_code')
      .describe(error_code_description),
  })
  .describe('Potential duplicate access code detected.')

const dormakaba_oracode_invalid_time_range = common_access_code_error
  .extend({
    error_code: z
      .literal('dormakaba_oracode_invalid_time_range')
      .describe(error_code_description),
  })
  .describe(
    'No Dormakaba Oracode user levels configured for the requested time range.',
  )

const keynest_unsupported_third_party_locker = common_access_code_error
  .extend({
    error_code: z
      .literal('keynest_unsupported_third_party_locker')
      .describe(error_code_description),
  })
  .describe('KeyNest locker is not supported.')

const access_code_error = z
  .discriminatedUnion('error_code', [
    smartthings_failed_to_set_access_code_error,
    smartthings_failed_to_set_after_multiple_retries,
    smartthings_no_free_slots_available,
    failed_to_set_on_device,
    failed_to_remove_from_device,
    duplicate_code_on_device,
    duplicate_code_attempt_prevented,
    no_space_for_access_code_on_device,
    igloohome_bridge_too_many_pending_jobs,
    igloohome_bridge_offline,
    kwikset_unable_to_confirm_code,
    kwikset_unable_to_confirm_deletion,
    code_modified_external_to_seam_error,
    august_lock_invalid_code_length,
    august_device_programming_delay_error,
    august_lock_missing_keypad,
    august_lock_temporarily_offline_error,
    salto_ks_user_not_subscribed,
    hubitat_device_programming_delay,
    hubitat_no_free_positions_available,
    wyze_duplicate_code_name,
    wyze_potential_duplicate_code,
    dormakaba_oracode_invalid_time_range,
    kwikset_insufficient_permissions,
    keynest_unsupported_third_party_locker,
  ])
  .describe(
    'Errors associated with the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes).',
  )

export type AccessCodeError = z.infer<typeof access_code_error>

const _access_code_error_map = z.object({
  smartthings_failed_to_set_access_code:
    smartthings_failed_to_set_access_code_error.optional().nullable(),
  smartthings_failed_to_set_after_multiple_retries:
    smartthings_failed_to_set_after_multiple_retries.optional().nullable(),
  smartthings_no_free_slots_available: smartthings_no_free_slots_available
    .optional()
    .nullable(),
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
  igloohome_bridge_too_many_pending_jobs: igloohome_bridge_too_many_pending_jobs
    .optional()
    .nullable(),
  igloohome_bridge_offline: igloohome_bridge_offline.optional().nullable(),
  kwikset_unable_to_confirm_code: kwikset_unable_to_confirm_code
    .optional()
    .nullable(),
  kwikset_unable_to_confirm_deletion: kwikset_unable_to_confirm_deletion
    .optional()
    .nullable(),
  kwikset_insufficient_permissions: kwikset_insufficient_permissions
    .optional()
    .nullable(),
  code_modified_external_to_seam_error: code_modified_external_to_seam_error
    .optional()
    .nullable(),
  august_lock_invalid_code_length: august_lock_invalid_code_length
    .optional()
    .nullable(),
  august_device_programming_delay: august_device_programming_delay_error
    .optional()
    .nullable(),
  august_lock_temporarily_offline: august_lock_temporarily_offline_error
    .optional()
    .nullable(),
  august_lock_missing_keypad: august_lock_missing_keypad.optional().nullable(),
  salto_ks_user_not_subscribed: salto_ks_user_not_subscribed
    .optional()
    .nullable(),
  hubitat_device_programming_delay: hubitat_device_programming_delay
    .optional()
    .nullable(),
  hubitat_no_free_positions_available: hubitat_no_free_positions_available
    .optional()
    .nullable(),
  wyze_duplicate_code_name: wyze_duplicate_code_name.optional().nullable(),
  wyze_potential_duplicate_code: wyze_potential_duplicate_code
    .optional()
    .nullable(),
  dormakaba_oracode_invalid_time_range: dormakaba_oracode_invalid_time_range
    .optional()
    .nullable(),
  keynest_unsupported_third_party_locker: keynest_unsupported_third_party_locker
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

const smartthings_failed_to_set_access_code_warning = common_access_code_warning
  .extend({
    warning_code: z
      .literal('smartthings_failed_to_set_access_code')
      .describe(warning_code_description),
  })
  .describe('Failed to set code on SmartThings device.')

const august_device_programming_delay_warning = common_access_code_warning
  .extend({
    warning_code: z
      .literal('august_device_programming_delay')
      .describe(warning_code_description),
  })
  .describe('Access code has not yet been fully moved to the device.')

const august_lock_temporarily_offline_warning = common_access_code_warning
  .extend({
    warning_code: z
      .literal('august_lock_temporarily_offline')
      .describe(error_code_description),
  })
  .describe('August lock is temporarily offline.')

const code_modified_external_to_seam_warning = common_access_code_warning
  .extend({
    warning_code: z
      .literal('code_modified_external_to_seam')
      .describe(warning_code_description),
  })
  .describe(
    'Code was modified or removed externally after Seam successfully set it on the device.',
  )

const schlage_detected_duplicate = common_access_code_warning
  .extend({
    warning_code: z
      .literal('schlage_detected_duplicate')
      .describe(warning_code_description),
  })
  .describe('Duplicate access code detected.')

const schlage_creation_outage = common_access_code_warning
  .extend({
    warning_code: z
      .literal('schlage_creation_outage')
      .describe(warning_code_description),
  })
  .describe('Received an error when attempting to create this code.')

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

const kwikset_unable_to_confirm_code_warning = common_access_code_warning
  .extend({
    warning_code: z
      .literal('kwikset_unable_to_confirm_code')
      .describe(warning_code_description),
  })
  .describe('Unable to confirm that the access code is set on Kwikset device.')

const ultraloq_access_code_disabled = common_access_code_warning
  .extend({
    warning_code: z
      .literal('ultraloq_access_code_disabled')
      .describe(warning_code_description),
  })
  .describe(
    'Access code is disabled on Ultraloq device. Re-enable through the Ultraloq mobile app.',
  )

const access_code_warning = z
  .discriminatedUnion('warning_code', [
    smartthings_failed_to_set_access_code_warning,
    schlage_detected_duplicate,
    schlage_creation_outage,
    code_modified_external_to_seam_warning,
    delay_in_setting_on_device,
    delay_in_removing_from_device,
    third_party_integration_detected,
    august_device_programming_delay_warning,
    august_lock_temporarily_offline_warning,
    igloo_algopin_must_be_used_within_24_hours,
    management_transferred,
    kwikset_unable_to_confirm_code_warning,
    ultraloq_access_code_disabled,
  ])
  .describe(
    'Warnings associated with the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes).',
  )

export type AccessCodeWarning = z.infer<typeof access_code_warning>

const _access_code_warning_map = z.object({
  smartthings_failed_to_set_access_code:
    smartthings_failed_to_set_access_code_warning.optional().nullable(),
  schlage_detected_duplicate: schlage_detected_duplicate.optional().nullable(),
  schlage_creation_outage: schlage_creation_outage.optional().nullable(),
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
  august_device_programming_delay: august_device_programming_delay_warning
    .optional()
    .nullable(),
  august_lock_temporarily_offline: august_lock_temporarily_offline_warning
    .optional()
    .nullable(),
  igloo_algopin_must_be_used_within_24_hours:
    igloo_algopin_must_be_used_within_24_hours.optional().nullable(),
  management_transferred: management_transferred.optional().nullable(),
  kwikset_unable_to_confirm_code_warning: kwikset_unable_to_confirm_code_warning
    .optional()
    .nullable(),
  ultraloq_access_code_disabled: ultraloq_access_code_disabled
    .optional()
    .nullable(),
})

export type AccessCodeWarningMap = z.infer<typeof _access_code_warning_map>

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
        Errors associated with the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes).
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
        Warnings associated with the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes).
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
      'Current status of the access code within the operational lifecycle. Values are `setting`, a transitional phase that indicates that the code is being configured or activated; `set`, which indicates that the code is active and operational; `unset`, which indicates a deactivated or unused state, either before activation or after deliberate deactivation; `removing`, which indicates a transitional period in which the code is being deleted or made inactive; and `unknown`, which indicates an indeterminate state, due to reasons such as system errors or incomplete data, that highlights a potential need for system review or troubleshooting. See also [Lifecycle of Access Codes](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/lifecycle-of-access-codes).',
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
}).describe(`
  ---
  route_path: /access_codes
  ---
  Represents a smart lock [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes).

  An access code is a code used for a keypad or pinpad device. Unlike physical keys, which can easily be lost or duplicated, PIN codes can be customized, tracked, and altered on the fly. Using the Seam Access Code API, you can easily generate access codes on the hundreds of door lock models with which we integrate.

  Seam supports programming two types of access codes: [ongoing](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes#ongoing-access-codes) and [time-bound](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes#time-bound-access-codes). To differentiate between the two, refer to the \`type\` property of the access code. Ongoing codes display as \`ongoing\`, whereas time-bound codes are labeled \`time_bound\`. An ongoing access code is active, until it has been removed from the device. To specify an ongoing access code, leave both \`starts_at\` and \`ends_at\` empty. A time-bound access code will be programmed at the \`starts_at\` time and removed at the \`ends_at\` time.

  In addition, for certain devices, Seam also supports [offline access codes](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes#offline-access-codes). Offline access (PIN) codes are designed for door locks that might not always maintain an internet connection. For this type of access code, the device manufacturer uses encryption keys (tokens) to create server-based registries of algorithmically-generated offline PIN codes. Because the tokens remain synchronized with the managed devices, the locks do not require an active internet connection—and you do not need to be near the locks—to create an offline access code. Then, owners or managers can share these offline codes with users through a variety of mechanisms, such as messaging applications. That is, lock users do not need to install a smartphone application to receive an offline access code.
`)

export type AccessCode = z.infer<typeof access_code>
