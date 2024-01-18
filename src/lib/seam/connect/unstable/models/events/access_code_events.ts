import { z } from 'zod'

const access_code_created = z.object({
  event_type: z.literal('access_code.created'),
  device_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  access_code_id: z.string().uuid(),
  connected_account_id: z.string().uuid(),
})

const access_code_changed = z.object({
  event_type: z.literal('access_code.changed'),
  device_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  access_code_id: z.string().uuid(),
})

const access_code_scheduled_on_device = z.object({
  event_type: z.literal('access_code.scheduled_on_device'),
  device_id: z.string().uuid(),
  connected_account_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
})

const backup_access_code_pulled = z.object({
  event_type: z.literal('backup_access_code.pulled'),
  device_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  connected_account_id: z.string().uuid(),
})

export const access_code_event_map = {
  access_code_created,
  access_code_changed,
  access_code_scheduled_on_device,
  backup_access_code_pulled,
}
