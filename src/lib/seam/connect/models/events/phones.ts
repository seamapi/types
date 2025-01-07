import { z } from 'zod'

import { common_event } from './common.js'

const phone_event = common_event.extend({
  device_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [device](https://docs.seam.co/latest/core-concepts/devices).',
    ),
})

export const phone_deactivated_event = phone_event
  .extend({
    event_type: z.literal('phone.deactivated'),
  })
  .describe('A phone device was deactivated.')

export type PhoneDeactivatedEvent = z.infer<typeof phone_deactivated_event>

export const phone_events = [phone_deactivated_event] as const
