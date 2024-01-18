import { z } from 'zod'

export const device_added = z
  .object({
    event_type: z.literal('device_added'),
    device_id: z.string().uuid(),
  })
  .describe('This device was added to a Connected Account by the device owner')

export const device_removed = z.object({
  event_type: z.literal('device_removed'),
  device_id: z.string().uuid(),
})

export const device_updated = z.object({
  event_type: z.literal('device_updated'),
  device_id: z.string().uuid(),
})

export const device_event_map = {
  device_added,
  device_removed,
  device_updated,
}
