import { z } from 'zod'

import { climate_setting } from '../thermostats/climate-preset.js'
import { common_event } from './common.js'

const device_event = common_event.extend({
  device_id: z.string().uuid().describe(`
    ---
    title: Device ID
    ---
    ID of the device.
  `),
  connected_account_id: z.string().uuid().describe(`
    ---
    title: Connected Account ID
    ---
    ID of the connected account.
  `),
})

const battery_level = z.number().min(0).max(1).describe(`
  ---
  title: Battery Level
  ---
  Fractional number 0 to 1.0 indicating amount of battery in device, as reported by device.
`)

const device_battery_status = z.enum(['critical', 'low', 'good', 'full'])
  .describe(`
  ---
  title: Battery Status
  ---
  Enum representing the battery status calculated from numeric battery_level value, one of 'critical' | 'low' | 'good' | 'full'
`)

const disconnection_error_code = z.enum([
  'account_disconnected',
  'hub_disconnected',
  'device_disconnected',
]).describe(`
  ---
  title: Event Error Code
  ---
  The error code associated with the event, if any.
`)

export const lock_method = z.enum([
  'keycode',
  'manual',
  'automatic',
  'unknown',
  'seamapi',
]).describe(`
  ---
  title: Lock Lock/Unlock Method
  ---
  Method by which a lock device was locked or unlocked. When the method is \`keycode\`, the \`access_code_id\` will reference the Seam access code which was used, if reported by the device.
`)
export type LockMethod = z.infer<typeof lock_method>

export const device_connected_event = device_event
  .extend({
    event_type: z.literal('device.connected'),
  })
  .describe('A new device was connected to Seam.')

export type DeviceConnectedEvent = z.infer<typeof device_connected_event>

export const device_converted_to_unmanaged_event = device_event
  .extend({
    event_type: z.literal('device.converted_to_unmanaged'),
  })
  .describe(
    'An unmanaged device was successfully converted to a managed device.',
  )

export type DeviceConvertedToUnmanagedEvent = z.infer<
  typeof device_converted_to_unmanaged_event
>

export const unmanaged_device_converted_to_managed_event = device_event
  .extend({
    event_type: z.literal('device.unmanaged.converted_to_managed'),
  })
  .describe(
    'A managed device was successfully converted to an unmanaged device.',
  )

export type UnmanagedDeviceConvertedToManagedEvent = z.infer<
  typeof unmanaged_device_converted_to_managed_event
>

export const unmanaged_device_connected_event = device_event
  .extend({
    event_type: z.literal('device.unmanaged.connected'),
  })
  .describe('An unmanaged device was connected to Seam')

export type UnmanagedDeviceConnectedEvent = z.infer<
  typeof unmanaged_device_connected_event
>

export const device_disconnected_event = device_event
  .extend({
    event_type: z.literal('device.disconnected'),
    error_code: disconnection_error_code,
  })
  .describe('A device was disconnected')

export type DeviceDisconnectedEvent = z.infer<typeof device_disconnected_event>

export const unmanaged_device_disconnected_event = device_event
  .extend({
    event_type: z.literal('device.unmanaged.disconnected'),
    error_code: disconnection_error_code,
  })
  .describe('An unmanaged device was disconnected')

export type UnmanagedDeviceDisconnectedEvent = z.infer<
  typeof unmanaged_device_disconnected_event
>

export const device_tampered_event = device_event
  .extend({
    event_type: z.literal('device.tampered'),
  })
  .describe(
    'A device detected that it was tampered with, e.g., opened or moved.',
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
    'A device battery status changed since the last battery status changed event.',
  )

export type DeviceBatteryStatusChangedEvent = z.infer<
  typeof device_battery_status_changed_event
>

export const device_removed_event = device_event
  .extend({
    event_type: z.literal('device.removed'),
  })
  .describe('A device was removed externally from the connected account.')

export type DeviceRemovedEvent = z.infer<typeof device_removed_event>

export const device_deleted_event = device_event
  .extend({
    event_type: z.literal('device.deleted'),
  })
  .describe('A device was deleted.')

export type DeviceDeletedEvent = z.infer<typeof device_deleted_event>

export const device_third_party_integration_detected_event = device_event
  .extend({
    event_type: z.literal('device.third_party_integration_detected'),
  })
  .describe(
    'Seam detected a device is using a third party integration that will interfere with Seam device management.',
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
      'Seam detected a device is no longer using a third party integration that was interfering with Seam device management.',
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
  .describe('Seam detected a previously flaky device connection stabilized.')

export type DeviceConnectionStabilizedEvent = z.infer<
  typeof device_connection_stabilized_event
>

export const device_error_subscription_required_event = device_event
  .extend({
    event_type: z.literal('device.error.subscription_required'),
  })
  .describe(
    'A third party subscription is required to use all device features.',
  )

export type DeviceErrorSubscriptionRequiredEvent = z.infer<
  typeof device_error_subscription_required_event
>

export const device_error_subscription_required_resolved_event = device_event
  .extend({
    event_type: z.literal('device.error.subscription_required.resolved'),
  })
  .describe(
    'A third party subscription is active or no longer-required to use all device features.',
  )

export type DeviceErrorSubscriptionRequiredResolvedEvent = z.infer<
  typeof device_error_subscription_required_resolved_event
>

export const device_accessory_keypad_connected_event = device_event
  .extend({
    event_type: z.literal('device.accessory_keypad_connected'),
  })
  .describe('A accessory keypad was connected to a device.')

export type DeviceAccessoryKeypadConnectedEvent = z.infer<
  typeof device_accessory_keypad_connected_event
>

export const device_accessory_keypad_disconnected_event = device_event
  .extend({
    event_type: z.literal('device.accessory_keypad_disconnected'),
  })
  .describe('A accessory keypad was disconnected to a device.')

export type DeviceAccessoryKeypadDisconnectedEvent = z.infer<
  typeof device_accessory_keypad_disconnected_event
>

export const noise_sensor_noise_threshold_triggered_event = device_event
  .extend({
    event_type: z.literal('noise_sensor.noise_threshold_triggered'),
    noise_level_decibels: z.number().optional(),
    noise_level_nrs: z.number().optional(),
    noise_threshold_id: z.string().uuid().optional(),
    noise_threshold_name: z.string().optional(),
    // TODO: remove metadata from this event
    noiseaware_metadata: z.record(z.unknown()).optional().describe(`
      ---
      title: Noiseaware Metadata
      ---
      Metadata from the Noiseaware API.
    `),
    minut_metadata: z.record(z.unknown()).optional().describe(`
      ---
      title: Minut Metadata
      ---
      Metadata from the Minut API.
    `),
  })
  .describe(
    'Extended periods of noise or noise exceeding a threshold was detected.',
  )

export type NoiseSensorNoiseThresholdTriggeredEvent = z.infer<
  typeof noise_sensor_noise_threshold_triggered_event
>

export const lock_locked_event = device_event
  .extend({
    event_type: z.literal('lock.locked'),
    access_code_id: z.string().uuid().optional(),
    action_attempt_id: z.string().uuid().optional(),
    method: lock_method,
  })
  .describe('A lock was locked.')

export type LockLockedEvent = z.infer<typeof lock_locked_event>

export const lock_unlocked_event = device_event
  .extend({
    event_type: z.literal('lock.unlocked'),
    access_code_id: z.string().uuid().optional(),
    action_attempt_id: z.string().uuid().optional(),
    method: lock_method,
  })
  .describe('A lock was unlocked.')

export type LockUnlockedEvent = z.infer<typeof lock_unlocked_event>

export const lock_access_denied_event = device_event
  .extend({
    event_type: z.literal('lock.access_denied'),
    access_code_id: z.string().uuid().optional(),
  })
  .describe(
    'The lock denied access to a user after one or more consecutive invalid attempts to unlock the device.',
  )

export type LockAccessDeniedEvent = z.infer<typeof lock_access_denied_event>

export const thermostat_climate_preset_activated_event = device_event
  .extend({
    event_type: z.literal('thermostat.climate_preset_activated'),
    thermostat_schedule_id: z.string().uuid().nullable(),
    climate_preset_key: z.string(),
    is_fallback_climate_preset: z.boolean(),
  })
  .describe('A thermostat climate preset was activated.')

export type ThermostatClimatePresetActivatedEvent = z.infer<
  typeof thermostat_climate_preset_activated_event
>

export const thermostat_manually_adjusted_event = device_event
  .extend({
    event_type: z.literal('thermostat.manually_adjusted'),
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
  .describe('A thermostat was manually adjusted.')

export type ThermostatManuallyAdjustedEvent = z.infer<
  typeof thermostat_manually_adjusted_event
>

export const device_events = [
  device_connected_event,
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
] as const
