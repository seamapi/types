import { z } from 'zod'

const lock_methods = z.enum(['keycode', 'manual', 'unknown', 'seamapi'])

const lock_locked = z.object({
  event_type: z.literal('lock.locked'),
  device_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  lock_id: z.string().uuid(),
  connected_account_id: z.string().uuid(),
})

const lock_unlocked = z.object({
  event_type: z.literal('lock.unlocked'),
  device_id: z.string().uuid(),
  workspace_id: z.string().uuid(),
  lock_id: z.string().uuid(),
  connected_account_id: z.string().uuid(),
})

export const lock_event_map = {
  lock_methods,
  lock_locked,
  lock_unlocked,
}
