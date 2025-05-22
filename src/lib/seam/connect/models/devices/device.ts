import { z } from 'zod'

import { schemas as devicedb_schemas } from '@seamapi/types/devicedb'

import { connected_account_error } from '../connected-accounts/index.js'
import { custom_metadata } from '../custom-metadata.js'
import { capabilities } from './capabilities-supported.js'
import { capability_properties } from './capability-properties/index.js'
import { device_metadata } from './device-metadata.js'
import { any_device_type } from './device-type.js'
import { phone_specific_properties } from './phone-properties.js'

export const device_capability_flags =
  devicedb_schemas.device_capability_flags.extend({
    can_simulate_removal: z.boolean().optional(),
    can_simulate_connection: z.boolean().optional(),
    can_simulate_disconnection: z.boolean().optional(),
  })

export const battery_status = z.enum(['critical', 'low', 'good', 'full'])

export type BatteryStatus = z.infer<typeof battery_status>

const common_device_error = z.object({
  message: z.string(),
  is_device_error: z.literal(true),
  created_at: z.string().datetime(),
})

const error_code_description =
  'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.'

const device_offline = common_device_error
  .extend({
    error_code: z.literal('device_offline').describe(error_code_description),
  })
  .describe('Device is offline')

const device_removed = common_device_error
  .extend({
    error_code: z.literal('device_removed').describe(error_code_description),
  })
  .describe('Device has been removed')

const hub_disconnected = common_device_error
  .extend({
    error_code: z.literal('hub_disconnected').describe(error_code_description),
  })
  .describe('Hub is disconnected')

const device_disconnected = common_device_error
  .extend({
    error_code: z
      .literal('device_disconnected')
      .describe(error_code_description),
  })
  .describe('Device is disconnected')

const account_disconnected = common_device_error
  .extend({
    error_code: z
      .literal('account_disconnected')
      .describe(error_code_description),
    is_connected_account_error: z.literal(true),
    is_device_error: z.literal(false),
  })
  .describe('Account is disconnected')

const empty_backup_access_code_pool = common_device_error
  .extend({
    error_code: z
      .literal('empty_backup_access_code_pool')
      .describe(error_code_description),
  })
  .describe('The backup access code pool is empty.')

const august_lock_not_authorized = common_device_error
  .extend({
    error_code: z
      .literal('august_lock_not_authorized')
      .describe(error_code_description),
  })
  .describe('User is not authorized to use the August Lock.')

const august_lock_missing_bridge = common_device_error
  .extend({
    error_code: z
      .literal('august_lock_missing_bridge')
      .describe(error_code_description),
  })
  .describe('Lock is not connected to the Seam Bridge.')

const salto_ks_subscription_limit_exceeded = common_device_error
  .extend({
    error_code: z
      .literal('salto_ks_subscription_limit_exceeded')
      .describe(error_code_description),
    is_connected_account_error: z.literal(true),
    is_device_error: z.literal(false),
  })
  .describe('Salto site user limit reached.')

const ttlock_lock_not_paired_to_gateway = common_device_error
  .extend({
    error_code: z
      .literal('ttlock_lock_not_paired_to_gateway')
      .describe(error_code_description),
  })
  .describe('Lock is not paired with a Gateway.')

const missing_device_credentials = common_device_error
  .extend({
    error_code: z
      .literal('missing_device_credentials')
      .describe(error_code_description),
  })
  .describe('Missing device credentials.')

const auxiliary_heat_running = common_device_error
  .extend({
    error_code: z
      .literal('auxiliary_heat_running')
      .describe(error_code_description),
  })
  .describe('The auxiliary heat is running.')

const subscription_required = common_device_error
  .extend({
    error_code: z
      .literal('subscription_required')
      .describe(error_code_description),
  })
  .describe('Subscription required to connect.')

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
  ])
  .describe('Error associated with the `device`.')

export type DeviceError = z.infer<typeof device_error>

const device_error_map = z.object({
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
})

export type DeviceErrorMap = z.infer<typeof device_error_map>

const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const common_device_warning = z.object({
  message: z.string(),
  created_at: z.string().datetime(),
})

const partial_backup_access_code_pool = common_device_warning
  .extend({
    warning_code: z
      .literal('partial_backup_access_code_pool')
      .describe(warning_code_description),
  })
  .describe('Backup access code unhealthy.')

const many_active_backup_codes = common_device_warning
  .extend({
    warning_code: z
      .literal('many_active_backup_codes')
      .describe(warning_code_description),
  })
  .describe('Too many backup codes.')

const salto_ks_office_mode = common_device_warning
  .extend({
    warning_code: z
      .literal('salto_ks_office_mode')
      .describe(warning_code_description),
  })
  .describe('Lock is in Office Mode. Access Codes will not unlock doors.')

const salto_ks_privacy_mode = common_device_warning
  .extend({
    warning_code: z
      .literal('salto_ks_privacy_mode')
      .describe(warning_code_description),
  })
  .describe('Lock is in Privacy Mode. Access Codes will not unlock doors.')

const salto_ks_subscription_limit_almost_reached = common_device_warning
  .extend({
    warning_code: z
      .literal('salto_ks_subscription_limit_almost_reached')
      .describe(warning_code_description),
  })
  .describe(
    'Indicates that the Salto KS site has exceeded 80% of the maximum number of allowed users. Please increase your subscription limit, or delete some users from your site to rectify this.',
  )

const wyze_device_missing_gateway = common_device_warning
  .extend({
    warning_code: z
      .literal('wyze_device_missing_gateway')
      .describe(warning_code_description),
  })
  .describe('Wyze Lock is not connected to a gateway.')

const functional_offline_device = common_device_warning
  .extend({
    warning_code: z
      .literal('functional_offline_device')
      .describe(warning_code_description),
  })
  .describe('Device is offline, but has some functionality available.')

const third_party_integration_detected = common_device_warning
  .extend({
    warning_code: z
      .literal('third_party_integration_detected')
      .describe(warning_code_description),
  })
  .describe('Third-party integration detected.')

const nest_thermostat_in_manual_eco_mode = common_device_warning
  .extend({
    warning_code: z
      .literal('nest_thermostat_in_manual_eco_mode')
      .describe(warning_code_description),
  })
  .describe('Nest thermostat in manual eco mode.')

const ttlock_lock_gateway_unlocking_not_enabled = common_device_warning
  .extend({
    warning_code: z
      .literal('ttlock_lock_gateway_unlocking_not_enabled')
      .describe(warning_code_description),
  })
  .describe('Remote Unlock feature not enabled in settings.')

const ttlock_weak_gateway_signal = common_device_warning
  .extend({
    warning_code: z
      .literal('ttlock_weak_gateway_signal')
      .describe(warning_code_description),
  })
  .describe('Gateway signal is weak.')

const temperature_threshold_exceeded = common_device_warning
  .extend({
    warning_code: z
      .literal('temperature_threshold_exceeded')
      .describe(warning_code_description),
  })
  .describe('Temperature threshold exceeded.')

const device_communication_degraded = common_device_warning
  .extend({
    warning_code: z
      .literal('device_communication_degraded')
      .describe(warning_code_description),
  })
  .describe('Device appears to be unresponsive.')

const scheduled_maintenance_window = common_device_warning
  .extend({
    warning_code: z
      .literal('scheduled_maintenance_window')
      .describe(warning_code_description),
  })
  .describe('Scheduled maintenance window detected.')

const device_has_flaky_connection = common_device_warning
  .extend({
    warning_code: z
      .literal('device_has_flaky_connection')
      .describe(warning_code_description),
  })
  .describe('Device has flaky connection.')

const lockly_time_zone_not_configured = common_device_warning
  .extend({
    warning_code: z
      .literal('lockly_time_zone_not_configured')
      .describe(warning_code_description),
  })
  .describe(
    'We detected that this device does not have a time zone configured. Time bound codes may not work as expected.',
  )

export const unknown_issue_with_phone = common_device_warning
  .extend({
    warning_code: z
      .literal('unknown_issue_with_phone')
      .describe(warning_code_description),
  })
  .describe(
    'An unknown issue occurred while syncing the state of this phone with the provider. This issue may affect the proper functioning of this phone.',
  )

const device_warning = z.discriminatedUnion('warning_code', [
  partial_backup_access_code_pool,
  many_active_backup_codes,
  wyze_device_missing_gateway,
  functional_offline_device,
  third_party_integration_detected,
  nest_thermostat_in_manual_eco_mode,
  ttlock_lock_gateway_unlocking_not_enabled,
  ttlock_weak_gateway_signal,
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

export const device_warning_map = z.object({
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
  nest_thermostat_in_manual_eco_mode: nest_thermostat_in_manual_eco_mode
    .optional()
    .nullable(),
  ttlock_lock_gateway_unlocking_not_enabled:
    ttlock_lock_gateway_unlocking_not_enabled.optional().nullable(),
  ttlock_weak_gateway_signal: ttlock_weak_gateway_signal.optional().nullable(),
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

export type DeviceWarningMap = z.infer<typeof device_warning_map>

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
      is_connected: z
        .boolean()
        .describe(
          'Indicates if the accessory_keypad is connected to the device.',
        ),
      battery: z
        .object({
          level: z.number().min(0).max(1),
        })
        .optional()
        .describe('Indicates if the keypad battery properties.'),
    })
    .optional()
    .describe('Represents the accessory keypad state.'),
  appearance: z.object({
    name: z
      .string()
      .describe(
        'Name of the device as seen from the provider API and application, not settable through Seam.',
      ),
  }),
  model: z.object({
    can_connect_accessory_keypad: z
      .boolean()
      .optional()
      .describe('Indicates whether the device can connect a accessory keypad.'),
    display_name: z.string().describe('Display name of the device model.'),
    manufacturer_display_name: z
      .string()
      .describe(
        'Display name that corresponds to the manufacturer-specific terminology for the device.',
      ),
    has_built_in_keypad: z
      .boolean()
      .optional()
      .describe(
        'Indicates whether the device has a built in accessory keypad.',
      ),
    offline_access_codes_supported: z
      .boolean()
      .optional()
      .describe('Indicates whether the device supports offline access codes.'),
    online_access_codes_supported: z
      .boolean()
      .optional()
      .describe('Indicates whether the device supports online access codes.'),
    accessory_keypad_supported: z
      .boolean()
      .optional()
      .describe(
        `
      ---
      deprecated: use device.properties.model.can_connect_accessory_keypad
      ---
      `,
      ),
  }),
  has_direct_power: z
    .boolean()
    .optional()
    .describe('Indicates whether the device has direct power.'),
  battery_level: z
    .number()
    .min(0)
    .max(1)
    .optional()
    .describe(
      'Indicates the battery level of the device as a decimal value between 0 and 1, inclusive.',
    ),
  battery: z
    .object({
      level: z.number().min(0).max(1),
      status: battery_status,
    })
    .optional()
    .describe(
      'Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage.',
    ),
  // todo: use enum
  manufacturer: z
    .string()
    .optional()
    .describe(
      'Manufacturer of the device. When a device, such as a smart lock, is connected through a smart hub, the manufacturer of the device might be different from that of the smart hub.',
    ),
  image_url: z.string().url().optional().describe('Image URL for the device.'),
  image_alt_text: z
    .string()
    .optional()
    .describe('Alt text for the device image.'),
  serial_number: z.string().optional().describe('Serial number of the device.'),

  online_access_codes_enabled: z
    .boolean()
    .describe(
      'Indicates whether it is currently possible to use online access codes for the device.',
    )
    .optional(),
  offline_access_codes_enabled: z
    .boolean()
    .describe(
      'Indicates whether it is currently possible to use offline access codes for the device.',
    )
    .optional(),

  // Deprecated legacy capability support props
  supports_accessory_keypad: z
    .boolean()
    .describe(
      `
      ---
      deprecated: use device.properties.model.can_connect_accessory_keypad
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
      ---
      `,
    )
    .optional(),
  noise_level_decibels: z
    .number()
    .describe(
      'Indicates current noise level in decibels, if the device supports noise detection.',
    )
    .optional(),
  currently_triggering_noise_threshold_ids: z
    .array(z.string())
    .describe('Array of noise threshold IDs that are currently triggering.')
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
    device_id: z.string().uuid().describe('Unique identifier for the device.'),
    device_type: any_device_type.describe('Type of the device.'),
    nickname: z
      .string()
      .optional()
      .describe(
        'Optional nickname to describe the device, settable through Seam',
      ),
    display_name: z
      .string()
      .describe(
        'Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices.',
      ),
    capabilities_supported: z
      .array(capabilities)
      .describe(
        'Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health.',
      ),
    properties: common_device_properties
      .and(phone_specific_properties.partial())
      .and(device_metadata)
      .and(capability_properties)
      .describe('Properties of the device.'),
    location: z
      // todo: optional instead of nullable
      .object({
        location_name: z
          .string()
          .optional()
          .describe('Name of the device location.'),
        timezone: z
          .string()
          .optional()
          .describe('Time zone of the device location.'),
      })
      .nullable()
      .describe('Location information for the device.'),
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
    errors: z
      .array(
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
      )
      .describe(
        'Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.',
      ),
    warnings: z
      .array(device_warning)
      .describe(
        'Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it.',
      ),
    created_at: z
      .string()
      .datetime()
      .describe('Date and time at which the device object was created.'),
    is_managed: z
      .literal(true)
      .describe('Indicates whether Seam manages the device.'),
    custom_metadata,
  })
  .merge(device_capability_flags).describe(`
    ---
    route_path: /devices
    ---
    Represents a [device](https://docs.seam.co/latest/core-concepts/devices) that has been connected to Seam.
  `)

export type Device = z.infer<typeof device>
