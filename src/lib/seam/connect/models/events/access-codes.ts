import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'
import {
  common_event,
  common_event_error,
  common_event_warning,
} from './common.js'

const access_code_event = common_event.extend({
  access_code_id: z.string().uuid().describe('ID of the affected access code.'),
  device_id: z
    .string()
    .uuid()
    .describe('ID of the device associated with the affected access code.'),
  connected_account_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) associated with the affected access code.',
    ),
  device_custom_metadata: custom_metadata
    .optional()
    .describe(
      'Custom metadata of the device, present when device_id is provided.',
    ),
  connected_account_custom_metadata: custom_metadata
    .optional()
    .describe(
      'Custom metadata of the connected account, present when connected_account_id is provided.',
    ),
})

const access_code_event_issue_properties = {
  connected_account_errors: z
    .array(common_event_error)
    .describe('Errors associated with the connected account.'),
  connected_account_warnings: z
    .array(common_event_warning)
    .describe('Warnings associated with the connected account.'),
  device_errors: z
    .array(common_event_error)
    .describe('Errors associated with the device.'),
  device_warnings: z
    .array(common_event_warning)
    .describe('Warnings associated with the device.'),
  access_code_errors: z
    .array(common_event_error)
    .describe('Errors associated with the access code.'),
  access_code_warnings: z
    .array(common_event_warning)
    .describe('Warnings associated with the access code.'),
}

const code = z.string().describe('Code for the affected access code.')

export const access_code_created_event = access_code_event.extend({
  event_type: z.literal('access_code.created'),
}).describe(`
    ---
    route_path: /access_codes
    ---
    An [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) was created.
  `)

export type AccessCodeCreatedEvent = z.infer<typeof access_code_created_event>

export const access_code_changed_event = access_code_event.extend({
  event_type: z.literal('access_code.changed'),
}).describe(`
    ---
    route_path: /access_codes
    ---
    An [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) was changed.
  `)

export type AccessCodeChangedEvent = z.infer<typeof access_code_changed_event>

export const access_code_scheduled_on_device_event = access_code_event.extend({
  event_type: z.literal('access_code.scheduled_on_device'),
  code,
}).describe(`
    ---
    route_path: /access_codes
    ---
    An [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) was [scheduled natively](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes#native-scheduling) on a device.
  `)

export type AccessCodeScheduledOnDeviceEvent = z.infer<
  typeof access_code_scheduled_on_device_event
>

export const access_code_set_on_device_event = access_code_event.extend({
  event_type: z.literal('access_code.set_on_device'),
  code,
}).describe(`
    ---
    route_path: /access_codes
    ---
    An [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) was set on a device.
  `)

export type AccessCodeSetOnDeviceEvent = z.infer<
  typeof access_code_set_on_device_event
>

export const access_code_removed_from_device_event = access_code_event.extend({
  event_type: z.literal('access_code.removed_from_device'),
}).describe(`
    ---
    route_path: /access_codes
    ---
    An [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) was removed from a device.
  `)

export type AccessCodeRemovedFromDeviceEvent = z.infer<
  typeof access_code_removed_from_device_event
>

export const access_code_delay_in_setting_on_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.delay_in_setting_on_device'),
  })
  .extend(access_code_event_issue_properties).describe(`
    ---
    route_path: /access_codes
    ---
    There was an unusually long delay in setting an [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) on a device.
  `)

export type AccessCodeDelayInSettingOnDeviceEvent = z.infer<
  typeof access_code_delay_in_setting_on_device_event
>

export const access_code_failed_to_set_on_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.failed_to_set_on_device'),
  })
  .extend(access_code_event_issue_properties).describe(`
    ---
    route_path: /access_codes
    ---
    An [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) failed to be set on a device.
  `)

export type AccessCodeFailedToSetOnDeviceEvent = z.infer<
  typeof access_code_failed_to_set_on_device_event
>

export const access_code_deleted_event = access_code_event.extend({
  event_type: z.literal('access_code.deleted'),
  code: code.nullable(),
}).describe(`
    ---
    route_path: /access_codes
    ---
    An [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) was deleted.
  `)

export type AccessCodeDeletedEvent = z.infer<typeof access_code_deleted_event>

export const access_code_delay_in_removing_from_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.delay_in_removing_from_device'),
  })
  .extend(access_code_event_issue_properties).describe(`
    ---
    route_path: /access_codes
    ---
    There was an unusually long delay in removing an [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) from a device.
  `)

export type AccessCodeDelayInRemovingFromDeviceEvent = z.infer<
  typeof access_code_delay_in_removing_from_device_event
>

export const access_code_failed_to_remove_from_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.failed_to_remove_from_device'),
  })
  .extend(access_code_event_issue_properties).describe(`
    ---
    route_path: /access_codes
    ---
    An [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) failed to be removed from a device.
  `)

export type AccessCodeFailedToRemoveFromDeviceEvent = z.infer<
  typeof access_code_failed_to_remove_from_device_event
>

export const access_code_modified_external_to_seam_event =
  access_code_event.extend({
    event_type: z.literal('access_code.modified_external_to_seam'),
  }).describe(`
    ---
    route_path: /access_codes
    ---
    An [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) was modified outside of Seam.
  `)

export type AccessCodeModifiedExternalToSeamEvent = z.infer<
  typeof access_code_modified_external_to_seam_event
>

export const access_code_deleted_external_to_seam_event =
  access_code_event.extend({
    event_type: z.literal('access_code.deleted_external_to_seam'),
  }).describe(`
    ---
    route_path: /access_codes
    ---
    An [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) was deleted outside of Seam.
  `)

export type AccessCodeDeletedExternalToSeamEvent = z.infer<
  typeof access_code_deleted_external_to_seam_event
>

export const access_code_backup_access_code_pulled_event =
  access_code_event.extend({
    event_type: z.literal('access_code.backup_access_code_pulled'),
    backup_access_code_id: z.string(),
  }).describe(`
    ---
    route_path: /access_codes
    ---
    A [backup access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/backup-access-codes) was pulled from the backup access code pool and set on a device.
  `)

export type AccessCodeBackupAccessCodePulledEvent = z.infer<
  typeof access_code_backup_access_code_pulled_event
>

export const unmanaged_access_code_converted_to_managed_event =
  access_code_event.extend({
    event_type: z.literal('access_code.unmanaged.converted_to_managed'),
  }).describe(`
      ---
      route_path: /access_codes/unmanaged
      ---
      An [unmanaged access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/migrating-existing-access-codes) was converted successfully to a managed access code.
    `)

export type UnmanagedAccessCodeConvertedToManagedEvent = z.infer<
  typeof unmanaged_access_code_converted_to_managed_event
>

export const unmanaged_access_code_failed_to_convert_to_managed_event =
  access_code_event
    .extend({
      event_type: z.literal(
        'access_code.unmanaged.failed_to_convert_to_managed',
      ),
    })
    .extend(access_code_event_issue_properties).describe(`
      ---
      route_path: /access_codes/unmanaged
      ---
      An [unmanaged access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/migrating-existing-access-codes) failed to be converted to a managed access code.
    `)

export type UnmanagedAccessCodeFailedToConvertToManagedEvent = z.infer<
  typeof unmanaged_access_code_failed_to_convert_to_managed_event
>

export const unmanaged_access_code_created_event = access_code_event.extend({
  event_type: z.literal('access_code.unmanaged.created'),
}).describe(`
    ---
    route_path: /access_codes/unmanaged
    ---
    An [unmanaged access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/migrating-existing-access-codes) was created on a device.
  `)

export type UnmanagedAccessCodeCreatedEvent = z.infer<
  typeof unmanaged_access_code_created_event
>

export const unmanaged_access_code_removed_event = access_code_event.extend({
  event_type: z.literal('access_code.unmanaged.removed'),
}).describe(`
    ---
    route_path: /access_codes/unmanaged
    ---
    An [unmanaged access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/migrating-existing-access-codes) was removed from a device.
  `)

export type UnmanagedAccessCodeRemovedEvent = z.infer<
  typeof unmanaged_access_code_removed_event
>

export const access_code_events = [
  access_code_created_event,
  access_code_changed_event,
  access_code_scheduled_on_device_event,
  access_code_set_on_device_event,
  access_code_removed_from_device_event,
  access_code_delay_in_setting_on_device_event,
  access_code_failed_to_set_on_device_event,
  access_code_deleted_event,
  access_code_delay_in_removing_from_device_event,
  access_code_failed_to_remove_from_device_event,
  access_code_modified_external_to_seam_event,
  access_code_deleted_external_to_seam_event,
  access_code_backup_access_code_pulled_event,
  unmanaged_access_code_converted_to_managed_event,
  unmanaged_access_code_failed_to_convert_to_managed_event,
  unmanaged_access_code_created_event,
  unmanaged_access_code_removed_event,
] as const
