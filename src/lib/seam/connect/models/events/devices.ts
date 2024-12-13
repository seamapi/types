import { z } from 'zod'

import { climate_setting } from '../thermostats/climate-preset.js'
import { common_event } from './common.js'

const device_event = common_event.extend({
  device_id: z.string().uuid().describe('ID of the device.'),
  connected_account_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
    ),
})

const battery_level = z
  .number()
  .min(0)
  .max(1)
  .describe(
    'Number in the range 0 to 1.0 indicating the amount of battery in the device, as reported by the device.',
  )

const device_battery_status = z
  .enum(['critical', 'low', 'good', 'full'])
  .describe(
    'Battery status of the device, calculated from the numeric `battery_level` value.',
  )

const disconnection_error_code = z
  .enum(['account_disconnected', 'hub_disconnected', 'device_disconnected'])
  .describe('Error code associated with the disconnection event, if any.')

export const lock_method = z
  .enum(['keycode', 'manual', 'automatic', 'unknown', 'seamapi'])
  .describe(
    'Method by which a lock device was locked or unlocked. When the method is `keycode`, the `access_code_id` indicates the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used, if reported by the device.',
  )
export type LockMethod = z.infer<typeof lock_method>

export const device_connected_event = device_event
  .extend({
    event_type: z.literal('device.connected'),
  })
  .describe('A new device was connected to Seam.')

export type DeviceConnectedEvent = z.infer<typeof device_connected_event>

export const device_added_event = device_event
  .extend({
    event_type: z.literal('device.added'),
  })
  .describe('A device was added or reconnected to Seam.')

export type DeviceAddedEvent = z.infer<typeof device_added_event>

export const device_converted_to_unmanaged_event = device_event
  .extend({
    event_type: z.literal('device.converted_to_unmanaged'),
  })
  .describe(
    'An [unmanaged device](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices) was successfully converted to a managed device.',
  )

export type DeviceConvertedToUnmanagedEvent = z.infer<
  typeof device_converted_to_unmanaged_event
>

export const unmanaged_device_converted_to_managed_event = device_event
  .extend({
    event_type: z.literal('device.unmanaged.converted_to_managed'),
  })
  .describe(
    'A managed device was successfully converted to an [unmanaged device](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices).',
  )

export type UnmanagedDeviceConvertedToManagedEvent = z.infer<
  typeof unmanaged_device_converted_to_managed_event
>

export const unmanaged_device_connected_event = device_event
  .extend({
    event_type: z.literal('device.unmanaged.connected'),
  })
  .describe(
    'An [unmanaged device](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices) was connected to Seam.',
  )

export type UnmanagedDeviceConnectedEvent = z.infer<
  typeof unmanaged_device_connected_event
>

export const device_disconnected_event = device_event
  .extend({
    event_type: z.literal('device.disconnected'),
    error_code: disconnection_error_code,
  })
  .describe('A device was disconnected from Seam.')

export type DeviceDisconnectedEvent = z.infer<typeof device_disconnected_event>

export const unmanaged_device_disconnected_event = device_event
  .extend({
    event_type: z.literal('device.unmanaged.disconnected'),
    error_code: disconnection_error_code,
  })
  .describe(
    'An [unmanaged device](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices) was disconnected from Seam.',
  )

export type UnmanagedDeviceDisconnectedEvent = z.infer<
  typeof unmanaged_device_disconnected_event
>

export const device_tampered_event = device_event
  .extend({
    event_type: z.literal('device.tampered'),
  })
  .describe(
    'A device detected that it was tampered with, for example, opened or moved.',
  )

export type DeviceTamperedEvent = z.infer<typeof device_tampered_event>

export const device_low_battery_event = device_event
  .extend({
    event_type: z.literal('device.low_battery'),
    battery_level,
  })
  .describe('A device battery level dropped below the low threshold.')

export type DeviceLowBatteryEvent = z.infer<typeof device_low_battery_event>

export const device_battery_status_changed_event = device_event
  .extend({
    event_type: z.literal('device.battery_status_changed'),
    battery_status: device_battery_status,
    battery_level,
  })
  .describe(
    'A device battery status changed since the last `battery_status_changed` event.',
  )

export type DeviceBatteryStatusChangedEvent = z.infer<
  typeof device_battery_status_changed_event
>

export const device_removed_event = device_event
  .extend({
    event_type: z.literal('device.removed'),
  })
  .describe(
    'A device was removed externally from the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
  )

export type DeviceRemovedEvent = z.infer<typeof device_removed_event>

export const device_deleted_event = device_event
  .extend({
    event_type: z.literal('device.deleted'),
  })
  .describe(
    'A device was [deleted](https://docs.seam.co/latest/api/devices/delete).',
  )

export type DeviceDeletedEvent = z.infer<typeof device_deleted_event>

export const device_third_party_integration_detected_event = device_event
  .extend({
    event_type: z.literal('device.third_party_integration_detected'),
  })
  .describe(
    'Seam detected that a device is using a third-party integration that will interfere with Seam device management.',
  )

export type DeviceThirdPartyIntegrationDetectedEvent = z.infer<
  typeof device_third_party_integration_detected_event
>

export const device_third_party_integration_no_longer_detected_event =
  device_event
    .extend({
      event_type: z.literal(
        'device.third_party_integration_no_longer_detected',
      ),
    })
    .describe(
      'Seam detected that a device is no longer using a third-party integration that was interfering with Seam device management.',
    )

export type DeviceThirdPartyIntegrationNoLongerDetectedEvent = z.infer<
  typeof device_third_party_integration_no_longer_detected_event
>

export const device_salto_privacy_mode_activated_event = device_event
  .extend({
    event_type: z.literal('device.salto.privacy_mode_activated'),
  })
  .describe('A Salto device activated privacy mode.')

export type DeviceSaltoPrivacyModeActivatedEvent = z.infer<
  typeof device_salto_privacy_mode_activated_event
>

export const device_salto_privacy_mode_deactivated_event = device_event
  .extend({
    event_type: z.literal('device.salto.privacy_mode_deactivated'),
  })
  .describe('A Salto device deactivated privacy mode.')

export type DeviceSaltoPrivacyModeDeactivatedEvent = z.infer<
  typeof device_salto_privacy_mode_deactivated_event
>

export const device_connection_became_flaky_event = device_event
  .extend({
    event_type: z.literal('device.connection_became_flaky'),
  })
  .describe('Seam detected a flaky device connection.')

export type DeviceConnectionBecameFlakyEvent = z.infer<
  typeof device_connection_became_flaky_event
>

export const device_connection_stabilized_event = device_event
  .extend({
    event_type: z.literal('device.connection_stabilized'),
  })
  .describe(
    'Seam detected that a previously-flaky device connection stabilized.',
  )

export type DeviceConnectionStabilizedEvent = z.infer<
  typeof device_connection_stabilized_event
>

export const device_error_subscription_required_event = device_event
  .extend({
    event_type: z.literal('device.error.subscription_required'),
  })
  .describe(
    'A third-party subscription is required to use all device features.',
  )

export type DeviceErrorSubscriptionRequiredEvent = z.infer<
  typeof device_error_subscription_required_event
>

export const device_error_subscription_required_resolved_event = device_event
  .extend({
    event_type: z.literal('device.error.subscription_required.resolved'),
  })
  .describe(
    'A third-party subscription is active or no longer required to use all device features.',
  )

export type DeviceErrorSubscriptionRequiredResolvedEvent = z.infer<
  typeof device_error_subscription_required_resolved_event
>

export const device_accessory_keypad_connected_event = device_event
  .extend({
    event_type: z.literal('device.accessory_keypad_connected'),
  })
  .describe('An accessory keypad was connected to a device.')

export type DeviceAccessoryKeypadConnectedEvent = z.infer<
  typeof device_accessory_keypad_connected_event
>

export const device_accessory_keypad_disconnected_event = device_event
  .extend({
    event_type: z.literal('device.accessory_keypad_disconnected'),
  })
  .describe('An accessory keypad was disconnected from a device.')

export type DeviceAccessoryKeypadDisconnectedEvent = z.infer<
  typeof device_accessory_keypad_disconnected_event
>

export const noise_sensor_noise_threshold_triggered_event = device_event
  .extend({
    event_type: z.literal('noise_sensor.noise_threshold_triggered'),
    noise_level_decibels: z
      .number()
      .optional()
      .describe('Detected noise level in decibels.'),
    noise_level_nrs: z
      .number()
      .optional()
      .describe('Detected noise level in Noiseaware Noise Risk Score (NRS).'),
    noise_threshold_id: z
      .string()
      .uuid()
      .optional()
      .describe(
        'ID of the [noise threshold](https://docs.seam.co/latest/capability-guides/noise-sensors#what-is-a-threshold) that was triggered.',
      ),
    noise_threshold_name: z
      .string()
      .optional()
      .describe(
        'Name of the [noise threshold](https://docs.seam.co/latest/capability-guides/noise-sensors#what-is-a-threshold) that was triggered.',
      ),
    // TODO: remove metadata from this event
    noiseaware_metadata: z.record(z.unknown()).optional().describe(`
      ---
      title: Noiseaware Metadata
      ---
      Metadata from Noiseaware.
    `),
    minut_metadata: z.record(z.unknown()).optional().describe(`
      ---
      title: Minut Metadata
      ---
      Metadata from Minut.
    `),
  })
  .describe(
    'Extended periods of noise or noise exceeding a [threshold](https://docs.seam.co/latest/capability-guides/noise-sensors#what-is-a-threshold) were detected.',
  )

export type NoiseSensorNoiseThresholdTriggeredEvent = z.infer<
  typeof noise_sensor_noise_threshold_triggered_event
>

export const lock_locked_event = device_event
  .extend({
    event_type: z.literal('lock.locked'),
    access_code_id: z
      .string()
      .uuid()
      .optional()
      .describe(
        'ID of the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used to lock the device.',
      ),
    action_attempt_id: z
      .string()
      .uuid()
      .optional()
      .describe(
        'ID of the [action attempt](https://docs.seam.co/latest/core-concepts/action-attempts) associated with the lock action.',
      ),
    method: lock_method.describe(
      'Method by which a lock device was locked. When the method is `keycode`, the `access_code_id` indicates the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used, if reported by the device.',
    ),
  })
  .describe('A lock was locked.')

export type LockLockedEvent = z.infer<typeof lock_locked_event>

export const lock_unlocked_event = device_event
  .extend({
    event_type: z.literal('lock.unlocked'),
    access_code_id: z
      .string()
      .uuid()
      .optional()
      .describe(
        'ID of the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used to unlock the device.',
      ),
    action_attempt_id: z
      .string()
      .uuid()
      .optional()
      .describe(
        'ID of the [action attempt](https://docs.seam.co/latest/core-concepts/action-attempts) associated with the unlock action.',
      ),
    method: lock_method.describe(
      'Method by which a lock device was unlocked. When the method is `keycode`, the `access_code_id` indicates the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used, if reported by the device.',
    ),
  })
  .describe('A lock was unlocked.')

export type LockUnlockedEvent = z.infer<typeof lock_unlocked_event>

export const lock_access_denied_event = device_event
  .extend({
    event_type: z.literal('lock.access_denied'),
    access_code_id: z
      .string()
      .uuid()
      .optional()
      .describe(
        'ID of the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used in the unlock attempts.',
      ),
  })
  .describe(
    'The lock denied access to a user after one or more consecutive invalid attempts to unlock the device.',
  )

export type LockAccessDeniedEvent = z.infer<typeof lock_access_denied_event>

export const thermostat_climate_preset_activated_event = device_event
  .extend({
    event_type: z.literal('thermostat.climate_preset_activated'),
    thermostat_schedule_id: z
      .string()
      .uuid()
      .nullable()
      .describe(
        'ID of the [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) that prompted the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) to be activated.',
      ),
    climate_preset_key: z
      .string()
      .describe(
        'Key of the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) that was activated.',
      ),
    is_fallback_climate_preset: z
      .boolean()
      .describe(
        'Indicates whether the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) that was activated is the [fallback climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets/setting-the-fallback-climate-preset) for the thermostat.',
      ),
  })
  .describe(
    'A thermostat [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) was activated.',
  )

export type ThermostatClimatePresetActivatedEvent = z.infer<
  typeof thermostat_climate_preset_activated_event
>

export const thermostat_manually_adjusted_method = z
  .enum(['seam', 'external'])
  .describe(
    'Method used to adjust the thermostat manually. `seam` indicates that the Seam API, Seam CLI, or Seam Console was used to adjust the thermostat.',
  )

export const thermostat_manually_adjusted_event = device_event
  .extend({
    event_type: z.literal('thermostat.manually_adjusted'),
    method: thermostat_manually_adjusted_method,
  })
  .merge(
    climate_setting.pick({
      fan_mode_setting: true,
      hvac_mode_setting: true,
      cooling_set_point_celsius: true,
      heating_set_point_celsius: true,
      cooling_set_point_fahrenheit: true,
      heating_set_point_fahrenheit: true,
    }),
  )
  .describe('A thermostat was adjusted manually.')

export type ThermostatManuallyAdjustedEvent = z.infer<
  typeof thermostat_manually_adjusted_event
>

export const temperature_threshold_exceeded_event = device_event
  .extend({
    event_type: z.literal('thermostat.temperature_threshold_exceeded'),
    temperature_celsius: z
      .number()
      .describe('Temperature, in °C, reported by the thermostat.'),
    temperature_fahrenheit: z
      .number()
      .describe('Temperature, in °F, reported by the thermostat.'),
    upper_limit_celsius: z
      .number()
      .nullable()
      .describe(
        'Upper temperature limit, in °C, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
      ),
    upper_limit_fahrenheit: z
      .number()
      .nullable()
      .describe(
        'Upper temperature limit, in °F, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
      ),
    lower_limit_celsius: z
      .number()
      .nullable()
      .describe(
        'Lower temperature limit, in °C, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
      ),
    lower_limit_fahrenheit: z
      .number()
      .nullable()
      .describe(
        'Lower temperature limit, in °F, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
      ),
  })
  .describe(
    "A thermostat's temperature reading exceeded the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).",
  )

export type TemperatureThresholdExceededEvent = z.infer<
  typeof temperature_threshold_exceeded_event
>

export const temperature_threshold_no_longer_exceeded_event = device_event
  .extend({
    event_type: z.literal(
      'thermostat.temperature_threshold_no_longer_exceeded',
    ),
    temperature_celsius: z
      .number()
      .describe('Temperature, in °C, reported by the thermostat.'),
    temperature_fahrenheit: z
      .number()
      .describe('Temperature, in °F, reported by the thermostat.'),
    upper_limit_celsius: z
      .number()
      .nullable()
      .describe(
        'Upper temperature limit, in °C, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
      ),
    upper_limit_fahrenheit: z
      .number()
      .nullable()
      .describe(
        'Upper temperature limit, in °F, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
      ),
    lower_limit_celsius: z
      .number()
      .nullable()
      .describe(
        'Lower temperature limit, in °C, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
      ),
    lower_limit_fahrenheit: z
      .number()
      .nullable()
      .describe(
        'Lower temperature limit, in °F, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
      ),
  })
  .describe(
    "A thermostat's temperature reading no longer exceeds the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).",
  )

export type TemperatureThresholdNoLongerExceededEvent = z.infer<
  typeof temperature_threshold_no_longer_exceeded_event
>

export const device_events = [
  device_connected_event,
  device_added_event,
  device_converted_to_unmanaged_event,
  unmanaged_device_converted_to_managed_event,
  unmanaged_device_connected_event,
  device_disconnected_event,
  unmanaged_device_disconnected_event,
  device_tampered_event,
  device_low_battery_event,
  device_battery_status_changed_event,
  device_removed_event,
  device_deleted_event,
  device_third_party_integration_detected_event,
  device_third_party_integration_no_longer_detected_event,
  device_salto_privacy_mode_activated_event,
  device_salto_privacy_mode_deactivated_event,
  device_connection_became_flaky_event,
  device_connection_stabilized_event,
  device_error_subscription_required_event,
  device_error_subscription_required_resolved_event,
  device_accessory_keypad_connected_event,
  device_accessory_keypad_disconnected_event,
  noise_sensor_noise_threshold_triggered_event,
  lock_locked_event,
  lock_unlocked_event,
  lock_access_denied_event,
  thermostat_climate_preset_activated_event,
  thermostat_manually_adjusted_event,
  temperature_threshold_exceeded_event,
  temperature_threshold_no_longer_exceeded_event,
] as const
