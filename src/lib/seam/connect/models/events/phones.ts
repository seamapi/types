import { z } from 'zod'

import { common_event } from './common.js'

const phone_event = common_event.extend({
  device_id: z.string().uuid().describe('ID of the affected phone device.'),
})

export const phone_deactivated_event = phone_event.extend({
  event_type: z.literal('phone.deactivated'),
}).describe(`
    ---
    route_path: /phones
    ---
    A phone device was deactivated.
  `)

export type PhoneDeactivatedEvent = z.infer<typeof phone_deactivated_event>

export const phone_events = [phone_deactivated_event] as const
