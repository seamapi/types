import type { SetRequired, Simplify } from 'type-fest'
import { z } from 'zod'

import { custom_metadata } from '../../../stable/models/custom-metadata.js'
import { capability_properties } from '../capability-properties/index.js'
import { capabilities } from './capabilities-supported.js'
import { device_metadata } from './device-metadata.js'
import { any_device_type } from './device-type.js'
import { phone_specific_properties } from './phone-properties.js'

export const battery_status = z.enum(['critical', 'low', 'good', 'full'])

export type BatteryStatus = z.infer<typeof battery_status>

export const common_device_properties = z.object({
  online: z.boolean().describe('Indicates whether the device is online.'),
  name: z
    .string()
    .describe(
      'Name of the device. Enables administrators and users to identify the device easily, especially when there are numerous devices.',
    ),
  model: z.object({
    display_name: z.string().describe('Display name of the device model.'),
    manufacturer_display_name: z
      .string()
      .describe(
        'Display name that corresponds to the manufacturer-specific terminology for the device.',
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
      .describe('Indicates whether the device supports an accessory keypad.'),
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
  manufacturer: z.string().optional().describe('Manufacturer of the device.'),
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
    .describe('Deprecated. Use model.accessory_keypad_supported.')
    .optional(),
  supports_offline_access_codes: z
    .boolean()
    .describe('Deprecated. Use offline_access_codes_enabled.')
    .optional(),
})

export const managed_device = z.object({
  device_id: z.string().uuid().describe('Unique identifier for the device.'),
  device_type: any_device_type.describe('Type of the device.'),
  capabilities_supported: z
    .array(capabilities)
    .describe(
      'Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health.',
    ),
  properties: common_device_properties
    .and(device_metadata)
    .and(capability_properties)
    .and(phone_specific_properties.partial())
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
    .describe('Unique identifier for the account associated with the device.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'Unique identifier for the Seam workspace associated with the device.',
    ),
  errors: z
    .array(
      z.object({
        error_code: z.string(),
        message: z.string(),
      }),
    )
    .describe(
      'Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.',
    ),
  warnings: z
    .array(
      z.object({
        warning_code: z.string(),
        message: z.string(),
      }),
    )
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
  custom_metadata: custom_metadata.optional(),
})

export type ManagedDevice = z.infer<typeof managed_device>

export type ManagedDeviceWithBackendMetadata<
  MetadataKey extends keyof z.infer<typeof device_metadata>,
> = Simplify<
  ManagedDevice & {
    properties: SetRequired<ManagedDevice['properties'], MetadataKey>
  }
>
