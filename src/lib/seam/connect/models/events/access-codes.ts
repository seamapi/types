import { z } from 'zod'

import { common_event } from './common.js'

const access_code_event = common_event.extend({
  access_code_id: z.string().uuid().describe(`
    ---
    title: Access Code ID
    ---
    The ID of the access code.
  `),
  device_id: z.string().uuid().describe(`
    ---
    title: Device ID
    ---
    The ID of the device.
  `),
  connected_account_id: z.string().uuid().describe(`
    ---
    title: Connected Account ID
    ---
    The ID of the connected account.
  `),
})

const code = z.string().describe(`
  ---
  title: Access Code
  ---
  The code of the access code.
`)

export const access_code_created_event = access_code_event
  .extend({
    event_type: z.literal('access_code.created'),
  })
  .describe('An access code was created.')

export type AccessCodeCreatedEvent = z.infer<typeof access_code_created_event>

export const access_code_changed_event = access_code_event
  .extend({
    event_type: z.literal('access_code.changed'),
  })
  .describe('An access code was changed.')

export type AccessCodeChangedEvent = z.infer<typeof access_code_changed_event>

export const access_code_scheduled_on_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.scheduled_on_device'),
    code,
  })
  .describe('An access code was natively scheduled on a device.')

export type AccessCodeScheduledOnDeviceEvent = z.infer<
  typeof access_code_scheduled_on_device_event
>

export const access_code_set_on_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.set_on_device'),
    code,
  })
  .describe('An access code was set on a device.')

export type AccessCodeSetOnDeviceEvent = z.infer<
  typeof access_code_set_on_device_event
>

export const access_code_removed_from_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.removed_from_device'),
  })
  .describe('An access code was removed from a device.')

export type AccessCodeRemovedFromDeviceEvent = z.infer<
  typeof access_code_removed_from_device_event
>

export const access_code_delay_in_setting_on_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.delay_in_setting_on_device'),
  })
  .describe(
    'There was an unusually long delay in setting an access code on a device.',
  )

export type AccessCodeDelayInSettingOnDeviceEvent = z.infer<
  typeof access_code_delay_in_setting_on_device_event
>

export const access_code_failed_to_set_on_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.failed_to_set_on_device'),
  })
  .describe('An access code failed to be set on a device.')

export type AccessCodeFailedToSetOnDeviceEvent = z.infer<
  typeof access_code_failed_to_set_on_device_event
>

export const access_code_deleted_event = access_code_event
  .extend({
    event_type: z.literal('access_code.deleted'),
    code: code.nullable(),
  })
  .describe('An access code was deleted.')

export type AccessCodeDeletedEvent = z.infer<typeof access_code_deleted_event>

export const access_code_delay_in_removing_from_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.delay_in_removing_from_device'),
  })
  .describe(
    'There was an unusually long delay in removing an access code from a device.',
  )

export type AccessCodeDelayInRemovingFromDeviceEvent = z.infer<
  typeof access_code_delay_in_removing_from_device_event
>

export const access_code_failed_to_remove_from_device_event = access_code_event
  .extend({
    event_type: z.literal('access_code.failed_to_remove_from_device'),
  })
  .describe('An access code failed to be removed from a device.')

export type AccessCodeFailedToRemoveFromDeviceEvent = z.infer<
  typeof access_code_failed_to_remove_from_device_event
>

export const access_code_modified_external_to_seam_event = access_code_event
  .extend({
    event_type: z.literal('access_code.modified_external_to_seam'),
  })
  .describe('An access code was modified external to Seam.')

export type AccessCodeModifiedExternalToSeamEvent = z.infer<
  typeof access_code_modified_external_to_seam_event
>

export const access_code_deleted_external_to_seam_event = access_code_event
  .extend({
    event_type: z.literal('access_code.deleted_external_to_seam'),
  })
  .describe('An access code was deleted external to Seam.')

export type AccessCodeDeletedExternalToSeamEvent = z.infer<
  typeof access_code_deleted_external_to_seam_event
>

export const access_code_backup_access_code_pulled_event = access_code_event
  .extend({
    event_type: z.literal('access_code.backup_access_code_pulled'),
    backup_access_code_id: z.string(),
  })
  .describe(
    'A backup access code was pulled from the backup access code pool and set on a device.',
  )

export type AccessCodeBackupAccessCodePulledEvent = z.infer<
  typeof access_code_backup_access_code_pulled_event
>

export const unmanaged_access_code_converted_to_managed_event =
  access_code_event
    .extend({
      event_type: z.literal('access_code.unmanaged.converted_to_managed'),
    })
    .describe(
      'An unmanaged access code was successfully converted to a managed access code.',
    )

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
    .describe(
      'An unmanaged access code failed to be converted to a managed access code.',
    )

export type UnmanagedAccessCodeFailedToConvertToManagedEvent = z.infer<
  typeof unmanaged_access_code_failed_to_convert_to_managed_event
>

export const unmanaged_access_code_created_event = access_code_event
  .extend({
    event_type: z.literal('access_code.unmanaged.created'),
  })
  .describe('An unmanaged access code was created on a device.')

export type UnmanagedAccessCodeCreatedEvent = z.infer<
  typeof unmanaged_access_code_created_event
>

export const unmanaged_access_code_removed_event = access_code_event
  .extend({
    event_type: z.literal('access_code.unmanaged.removed'),
  })
  .describe('An unmanaged access code was removed from a device.')

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
