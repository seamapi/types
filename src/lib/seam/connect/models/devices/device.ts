import { z } from 'zod'

import { connected_account_error } from '../connected-accounts/index.js'
import { custom_metadata } from '../custom-metadata.js'
import { capabilities } from './capabilities-supported.js'
import { capability_properties } from './capability-properties/index.js'
import { device_metadata } from './device-metadata.js'
import { any_device_type } from './device-type.js'
import { phone_specific_properties } from './phone-properties.js'

export const device_capability_flags = z
  .object({
    can_remotely_unlock: z.boolean(),
    can_remotely_lock: z.boolean(),
    can_program_offline_access_codes: z.boolean(),
    can_program_online_access_codes: z.boolean(),
    can_hvac_heat: z.boolean(),
    can_hvac_cool: z.boolean(),
    can_hvac_heat_cool: z.boolean(),
    can_turn_off_hvac: z.boolean(),
    can_simulate_removal: z.boolean(),
    can_simulate_connection: z.boolean(),
    can_simulate_disconnection: z.boolean(),
    can_unlock_with_code: z.boolean(),
    can_run_thermostat_programs: z.boolean(),
    can_simulate_hub_connection: z.boolean(),
    can_simulate_hub_disconnection: z.boolean(),
    can_simulate_paid_subscription: z.boolean(),
  })
  .partial()

export const battery_status = z.enum(['critical', 'low', 'good', 'full'])
  .describe(`Represents the current status of the battery charge level. Values are \`critical\`, which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; \`low\`, which signifies that the battery is under the preferred threshold and should be charged soon; \`good\`, which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and \`full\`, which represents a battery that is fully charged, providing the maximum duration of usage.
          `)

export type BatteryStatus = z.infer<typeof battery_status>

const common_device_error = z.object({
  message: z
    .string()
    .describe(
      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
    ),
  is_device_error: z
    .literal(true)
    .describe('Indicates that the error is a device error.'),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the error.'),
})

const error_code_description =
  'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.'

const device_offline = common_device_error
  .extend({
    error_code: z.literal('device_offline').describe(error_code_description),
  })
  .describe('Indicates that the device is offline.')

const device_removed = common_device_error
  .extend({
    error_code: z.literal('device_removed').describe(error_code_description),
  })
  .describe('Indicates that the device has been removed.')

const hub_disconnected = common_device_error
  .extend({
    error_code: z.literal('hub_disconnected').describe(error_code_description),
  })
  .describe('Indicates that the hub is disconnected.')

const device_disconnected = common_device_error
  .extend({
    error_code: z
      .literal('device_disconnected')
      .describe(error_code_description),
  })
  .describe('Indicates that the device is disconnected.')

const account_disconnected = common_device_error
  .extend({
    error_code: z
      .literal('account_disconnected')
      .describe(error_code_description),
    is_connected_account_error: z
      .literal(true)
      .describe(
        'Indicates that the error is a [connected account](https://docs.seam.co/latest/api/connected_accounts) error.',
      ),
    is_device_error: z
      .literal(false)
      .describe('Indicates that the error is not a device error.'),
  })
  .describe('Indicates that the account is disconnected.')

const empty_backup_access_code_pool = common_device_error.extend({
  error_code: z
    .literal('empty_backup_access_code_pool')
    .describe(error_code_description),
}).describe(`
    ---
    variant_group_key: access_codes
    ---
    Indicates that the [backup access code pool](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/backup-access-codes) is empty.
    `)

const august_lock_not_authorized = common_device_error.extend({
  error_code: z
    .literal('august_lock_not_authorized')
    .describe(error_code_description),
}).describe(`
    ---
    variant_group_key: locks
    ---
    Indicates that the user is not authorized to use the August lock.
    `)

const august_lock_missing_bridge = common_device_error.extend({
  error_code: z
    .literal('august_lock_missing_bridge')
    .describe(error_code_description),
}).describe(`
    ---
    variant_group_key: locks
    ---
    Indicates that the lock is not connected to a bridge.
    `)

const salto_ks_subscription_limit_exceeded = common_device_error.extend({
  error_code: z
    .literal('salto_ks_subscription_limit_exceeded')
    .describe(error_code_description),
  is_connected_account_error: z
    .literal(true)
    .describe(
      'Indicates that the error is a [connected account](https://docs.seam.co/latest/api/connected_accounts) error.',
    ),
  is_device_error: z
    .literal(false)
    .describe('Indicates that the error is not a device error.'),
}).describe(`
    ---
    variant_group_key: locks
    ---
    Indicates that the Salto site user limit has been reached.
    `)

const ttlock_lock_not_paired_to_gateway = common_device_error.extend({
  error_code: z
    .literal('ttlock_lock_not_paired_to_gateway')
    .describe(error_code_description),
}).describe(`
    Indicates that the lock is not paired with a gateway.
    `)

const missing_device_credentials = common_device_error
  .extend({
    error_code: z
      .literal('missing_device_credentials')
      .describe(error_code_description),
  })
  .describe('Indicates that device credentials are missing.')

const auxiliary_heat_running = common_device_error.extend({
  error_code: z
    .literal('auxiliary_heat_running')
    .describe(error_code_description),
}).describe(`
    ---
    variant_group_key: thermostats
    ---
    Indicates that the auxiliary heat is running.
    `)

const subscription_required = common_device_error
  .extend({
    error_code: z
      .literal('subscription_required')
      .describe(error_code_description),
  })
  .describe('Indicates that a subscription is required to connect.')

const lockly_missing_wifi_bridge = common_device_error.extend({
  error_code: z
    .literal('lockly_missing_wifi_bridge')
    .describe(error_code_description),
}).describe(`
    Indicates that the Lockly lock is not connected to a Wi-Fi bridge.
    `)

export const device_error = z
  .discriminatedUnion('error_code', [
    account_disconnected,
    salto_ks_subscription_limit_exceeded,
    device_offline,
    device_removed,
    hub_disconnected,
    device_disconnected,
    empty_backup_access_code_pool,
    august_lock_not_authorized,
    august_lock_missing_bridge,
    ttlock_lock_not_paired_to_gateway,
    missing_device_credentials,
    auxiliary_heat_running,
    subscription_required,
    lockly_missing_wifi_bridge,
  ])
  .describe('Error associated with the device.')

export type DeviceError = z.infer<typeof device_error>

const _device_error_map = z.object({
  device_offline: device_offline.optional().nullable(),
  device_removed: device_removed.optional().nullable(),
  hub_disconnected: hub_disconnected.optional().nullable(),
  device_disconnected: device_disconnected.optional().nullable(),
  account_disconnected: account_disconnected.optional().nullable(),
  empty_backup_access_code_pool: empty_backup_access_code_pool
    .optional()
    .nullable(),
  august_lock_not_authorized: august_lock_not_authorized.optional().nullable(),
  august_lock_missing_bridge: august_lock_missing_bridge.optional().nullable(),
  salto_ks_subscription_limit_exceeded: salto_ks_subscription_limit_exceeded
    .optional()
    .nullable(),
  ttlock_lock_not_paired_to_gateway: ttlock_lock_not_paired_to_gateway
    .optional()
    .nullable(),
  missing_device_credentials: missing_device_credentials.optional().nullable(),
  auxiliary_heat_running: auxiliary_heat_running.optional().nullable(),
  subscription_required: subscription_required.optional().nullable(),
  lockly_missing_wifi_bridge: lockly_missing_wifi_bridge.optional().nullable(),
})

export type DeviceErrorMap = z.infer<typeof _device_error_map>

const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const common_device_warning = z.object({
  message: z
    .string()
    .describe(
      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the warning.'),
})

const partial_backup_access_code_pool = common_device_warning.extend({
  warning_code: z
    .literal('partial_backup_access_code_pool')
    .describe(warning_code_description),
}).describe(`
    ---
    variant_group_key: access_codes
    ---
    Indicates that the backup access code is unhealthy.
    `)

const many_active_backup_codes = common_device_warning.extend({
  warning_code: z
    .literal('many_active_backup_codes')
    .describe(warning_code_description),
}).describe(`
    ---
    variant_group_key: access_codes
    ---
    Indicates that there are too many backup codes.
    `)

const salto_ks_office_mode = common_device_warning.extend({
  warning_code: z
    .literal('salto_ks_office_mode')
    .describe(warning_code_description),
}).describe(`
    ---
    variant_group_key: access_codes
    ---
    Indicates that the Salto KS lock is in Office Mode. Access Codes will not unlock doors.
  `)

const salto_ks_privacy_mode = common_device_warning.extend({
  warning_code: z
    .literal('salto_ks_privacy_mode')
    .describe(warning_code_description),
}).describe(`
    ---
    variant_group_key: access_codes
    ---
    Indicates that the Salto KS lock is in Privacy Mode. Access Codes will not unlock doors.
  `)

const salto_ks_subscription_limit_almost_reached = common_device_warning
  .extend({
    warning_code: z
      .literal('salto_ks_subscription_limit_almost_reached')
      .describe(warning_code_description),
  })
  .describe(
    'Indicates that the Salto KS site has exceeded 80% of the maximum number of allowed users. Increase your subscription limit or delete some users from your site.',
  )

const wyze_device_missing_gateway = common_device_warning.extend({
  warning_code: z
    .literal('wyze_device_missing_gateway')
    .describe(warning_code_description),
}).describe(`
    Indicates that the Wyze Lock is not connected to a gateway.
    `)

const functional_offline_device = common_device_warning
  .extend({
    warning_code: z
      .literal('functional_offline_device')
      .describe(warning_code_description),
  })
  .describe(
    'Indicates that the device is offline but has some functionality available.',
  )

const third_party_integration_detected = common_device_warning
  .extend({
    warning_code: z
      .literal('third_party_integration_detected')
      .describe(warning_code_description),
  })
  .describe('Indicates that a third-party integration has been detected.')

const ttlock_lock_gateway_unlocking_not_enabled = common_device_warning.extend({
  warning_code: z
    .literal('ttlock_lock_gateway_unlocking_not_enabled')
    .describe(warning_code_description),
}).describe(`
    ---
    variant_group_key: locks
    ---
    Indicates that the Remote Unlock feature is not enabled in the settings."
    `)

const ttlock_weak_gateway_signal = common_device_warning.extend({
  warning_code: z
    .literal('ttlock_weak_gateway_signal')
    .describe(warning_code_description),
}).describe(`
    Indicates that the gateway signal is weak.
    `)

const power_saving_mode = common_device_warning.extend({
  warning_code: z
    .literal('power_saving_mode')
    .describe(warning_code_description),
}).describe(`
    ---
    variant_group_key: locks
    ---
    Indicates that the device is in power saving mode and may have limited functionality.
    `)

const temperature_threshold_exceeded = common_device_warning.extend({
  warning_code: z
    .literal('temperature_threshold_exceeded')
    .describe(warning_code_description),
}).describe(`
    ---
    variant_group_key: thermostats
    ---
    Indicates that the temperature threshold has been exceeded.
    `)

const device_communication_degraded = common_device_warning
  .extend({
    warning_code: z
      .literal('device_communication_degraded')
      .describe(warning_code_description),
  })
  .describe('Indicates that the device appears to be unresponsive.')

const scheduled_maintenance_window = common_device_warning
  .extend({
    warning_code: z
      .literal('scheduled_maintenance_window')
      .describe(warning_code_description),
  })
  .describe('Indicates that a scheduled maintenance window has been detected.')

const device_has_flaky_connection = common_device_warning
  .extend({
    warning_code: z
      .literal('device_has_flaky_connection')
      .describe(warning_code_description),
  })
  .describe('Indicates that the device has a flaky connection.')

const lockly_time_zone_not_configured = common_device_warning
  .extend({
    warning_code: z
      .literal('lockly_time_zone_not_configured')
      .describe(warning_code_description),
  })
  .describe(
    'Indicates that Seam detected that the Lockly device does not have a time zone configured. Time-bound codes may not work as expected.',
  )

export const unknown_issue_with_phone = common_device_warning.extend({
  warning_code: z
    .literal('unknown_issue_with_phone')
    .describe(warning_code_description),
}).describe(`
    ---
    variant_group_key: phones
    ---
    Indicates that an unknown issue occurred while syncing the state of the phone with the provider. This issue may affect the proper functioning of the phone.
    `)

const device_warning = z.discriminatedUnion('warning_code', [
  partial_backup_access_code_pool,
  many_active_backup_codes,
  wyze_device_missing_gateway,
  functional_offline_device,
  third_party_integration_detected,
  ttlock_lock_gateway_unlocking_not_enabled,
  ttlock_weak_gateway_signal,
  power_saving_mode,
  temperature_threshold_exceeded,
  device_communication_degraded,
  scheduled_maintenance_window,
  device_has_flaky_connection,
  salto_ks_office_mode,
  salto_ks_privacy_mode,
  salto_ks_subscription_limit_almost_reached,
  unknown_issue_with_phone,
  lockly_time_zone_not_configured,
])

export type DeviceWarning = z.infer<typeof device_warning>

const _device_warning_map = z.object({
  partial_backup_access_code_pool: partial_backup_access_code_pool
    .optional()
    .nullable(),
  many_active_backup_codes: many_active_backup_codes.optional().nullable(),
  device_has_flaky_connection: device_has_flaky_connection
    .extend({
      _event_id: z.string().uuid().optional(),
      _reason: z.string().optional(),
    })
    .optional()
    .nullable(),
  wyze_device_missing_gateway: wyze_device_missing_gateway
    .optional()
    .nullable(),
  functional_offline_device: functional_offline_device.optional().nullable(),
  third_party_integration_detected: third_party_integration_detected
    .optional()
    .nullable(),
  ttlock_lock_gateway_unlocking_not_enabled:
    ttlock_lock_gateway_unlocking_not_enabled.optional().nullable(),
  ttlock_weak_gateway_signal: ttlock_weak_gateway_signal.optional().nullable(),
  power_saving_mode: power_saving_mode.optional().nullable(),
  temperature_threshold_exceeded: temperature_threshold_exceeded
    .optional()
    .nullable(),
  device_communication_degraded: device_communication_degraded
    .optional()
    .nullable(),
  scheduled_maintenance_window: scheduled_maintenance_window
    .optional()
    .nullable(),
  salto_ks_office_mode: salto_ks_office_mode.optional().nullable(),
  salto_ks_privacy_mode: salto_ks_privacy_mode.optional().nullable(),
  salto_ks_subscription_limit_almost_reached:
    salto_ks_subscription_limit_almost_reached.optional().nullable(),
  unknown_issue_with_phone: unknown_issue_with_phone.optional().nullable(),
  lockly_time_zone_not_configured: lockly_time_zone_not_configured
    .optional()
    .nullable(),
})

export type DeviceWarningMap = z.infer<typeof _device_warning_map>

export const common_device_properties = z.object({
  online: z.boolean().describe('Indicates whether the device is online.'),
  name: z.string().describe(`
      ---
      deprecated: use device.display_name instead
      ---
      Name of the device.
      `),
  accessory_keypad: z
    .object({
      is_connected: z.boolean()
        .describe(`Indicates if an accessory keypad is connected to the device.
        `),
      battery: z
        .object({
          level: z.number().min(0).max(1),
        })
        .optional().describe(`Keypad battery properties.
          `),
    })
    .optional().describe(`
          ---
          property_group_key: hardware
          ---
          Accessory keypad properties and state.
          `),
  appearance: z.object({
    name: z
      .string()
      .describe(
        'Name of the device as seen from the provider API and application, not settable through Seam.',
      ),
  }).describe(`
          ---
          property_group_key: hardware
          ---
          Appearance-related properties, as reported by the device.
          `),
  model: z
    .object({
      can_connect_accessory_keypad: z.boolean().optional().describe(`
          Indicates whether the device can connect a accessory keypad.
      `),
      display_name: z.string().describe(`
          Display name of the device model.
      `),
      manufacturer_display_name: z.string().describe(`
          Display name that corresponds to the manufacturer-specific terminology for the device.
      `),
      has_built_in_keypad: z.boolean().optional().describe(`
          Indicates whether the device has a built in accessory keypad.
      `),
      offline_access_codes_supported: z.boolean().optional().describe(`
          ---
          deprecated: use device.can_program_offline_access_codes.
          ---
          `),
      online_access_codes_supported: z.boolean().optional().describe(`
          ---
          deprecated: use device.can_program_online_access_codes.
          ---
          `),
      accessory_keypad_supported: z.boolean().optional().describe(`
        ---
        deprecated: use device.properties.model.can_connect_accessory_keypad
        ---
        `),
    })
    .describe(`Device model-related properties.`),
  has_direct_power: z.boolean().optional().describe(`
          ---
          property_group_key: hardware
          ---
          Indicates whether the device has direct power.
          `),
  battery_level: z.number().min(0).max(1).optional().describe(`
          ---
          property_group_key: hardware
          ---
          Indicates the battery level of the device as a decimal value between 0 and 1, inclusive.
          `),
  battery: z
    .object({
      level: z.number().min(0).max(1)
        .describe(`Battery charge level as a value between 0 and 1, inclusive.
          `),
      status: battery_status,
    })
    .optional().describe(`
          ---
          property_group_key: hardware
          ---
          Represents the current status of the battery charge level.
          `),
  // todo: use enum
  manufacturer: z.string().optional().describe(`
          ---
          property_group_key: hardware
          ---
          Manufacturer of the device. When a device, such as a smart lock, is connected through a smart hub, the manufacturer of the device might be different from that of the smart hub.
    `),
  image_url: z.string().url().optional().describe(`
          ---
          property_group_key: hardware
          ---
          Image URL for the device.
          `),
  image_alt_text: z.string().optional().describe(`
          ---
          property_group_key: hardware
          ---
          Alt text for the device image.
          `),
  serial_number: z.string().optional().describe(`
          ---
          property_group_key: hardware
          ---
          Serial number of the device.
          `),

  online_access_codes_enabled: z
    .boolean()
    .describe(
      `
          ---
          property_group_key: access_codes
          deprecated: use device.can_program_online_access_codes
          ---
          Indicates whether it is currently possible to use online access codes for the device.
          `,
    )
    .optional(),
  offline_access_codes_enabled: z
    .boolean()
    .describe(
      `
          ---
          property_group_key: access_codes
          deprecated: use device.can_program_offline_access_codes
          ---
          Indicates whether it is currently possible to use offline access codes for the device.
          `,
    )
    .optional(),

  // Deprecated legacy capability support props
  supports_accessory_keypad: z
    .boolean()
    .describe(
      `
      ---
      deprecated: use device.properties.model.can_connect_accessory_keypad
      property_group_key: access_codes
      ---
      `,
    )
    .optional(),
  supports_offline_access_codes: z
    .boolean()
    .describe(
      `
      ---
      deprecated: use offline_access_codes_enabled
      property_group_key: access_codes
      ---
      `,
    )
    .optional(),
  noise_level_decibels: z
    .number()
    .describe(
      `
          ---
          property_group_key: noise_sensors
          ---
          Indicates current noise level in decibels, if the device supports noise detection.
          `,
    )
    .optional(),
  currently_triggering_noise_threshold_ids: z
    .array(z.string())
    .describe(
      `
          ---
          property_group_key: noise_sensors
          ---
          Array of noise threshold IDs that are currently triggering.
          `,
    )
    .optional(),
})

export const device_and_connected_account_error_options = [
  ...device_error.options,
  ...connected_account_error.options.filter(
    (_connected_account_error) =>
      !device_error.options.some(
        (_device_error) =>
          _device_error.shape.error_code.value ===
          _connected_account_error.shape.error_code.value,
      ),
  ),
]

export const device = z
  .object({
    device_id: z.string().uuid().describe('ID of the device.'),
    device_type: any_device_type.describe('Type of the device.'),
    space_ids: z
      .array(z.string().uuid())
      .describe('IDs of the spaces the device is in.'),
    nickname: z
      .string()
      .optional()
      .describe(
        'Optional nickname to describe the device, settable through Seam.',
      ),
    display_name: z
      .string()
      .describe(
        'Display name of the device, defaults to nickname (if it is set) or `properties.appearance.name`, otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices.',
      ),
    capabilities_supported: z.array(capabilities).describe(`
        Collection of capabilities that the device supports when connected to Seam. Values are \`access_code\`, which indicates that the device can manage and utilize digital PIN codes for secure access; \`lock\`, which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; \`noise_detection\`, which indicates that the device supports monitoring and responding to ambient noise levels; \`thermostat\`, which indicates that the device can regulate and adjust indoor temperatures; \`battery\`, which indicates that the device can manage battery life and health; and \`phone\`, which indicates that the device is a mobile device, such as a smartphone. **Important:** Superseded by [capability flags](https://docs.seam.co/latest/capability-guides/device-and-system-capabilities#capability-flags).
        `),
    properties: common_device_properties
      .and(phone_specific_properties.partial())
      .and(device_metadata)
      .and(capability_properties).describe(`
    ---
    property_groups:
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
    Properties of the device.
  `),
    location: z
      // todo: optional instead of nullable
      .object({
        location_name: z.string().optional()
          .describe(`Name of the device location.
          `),
        timezone: z.string().optional()
          .describe(`Time zone of the device location.
          `),
      })
      .nullable().describe(`
          ---
          property_group_key: hardware
          ---
          Location information for the device.
          `),
    connected_account_id: z
      .string()
      .uuid()
      .describe(
        'Unique identifier for the account associated with the device.',
      ),
    workspace_id: z
      .string()
      .uuid()
      .describe(
        'Unique identifier for the Seam workspace associated with the device.',
      ),
    errors: z.array(
      z.discriminatedUnion('error_code', [
        ...device_error.options,
        ...connected_account_error.options.filter(
          (_connected_account_error) =>
            !device_error.options.some(
              (_device_error) =>
                _device_error.shape.error_code.value ===
                _connected_account_error.shape.error_code.value,
            ),
        ),
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
        Array of errors associated with the device. Each error object within the array contains two fields: \`error_code\` and \`message\`. \`error_code\` is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. \`message\` provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.
      `),
    warnings: z.array(device_warning).describe(`
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
        Array of warnings associated with the device. Each warning object within the array contains two fields: \`warning_code\` and \`message\`. \`warning_code\` is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. \`message\` provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it.
      `),
    created_at: z
      .string()
      .datetime()
      .describe('Date and time at which the device object was created.'),
    is_managed: z
      .literal(true)
      .describe(
        'Indicates whether Seam manages the device. See also [Managed and Unmanaged Devices](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices).',
      ),
    custom_metadata,
  })
  .merge(device_capability_flags).describe(`
    ---
    route_path: /devices
    property_groups:
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
    Represents a [device](https://docs.seam.co/latest/core-concepts/devices) that has been connected to Seam.
  `)

export type Device = z.infer<typeof device>
