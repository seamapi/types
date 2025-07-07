import { z } from 'zod'

import { custom_metadata } from '../custom-metadata.js'
import { common_event } from './common.js'

const phone_event = common_event.extend({
  device_id: z.string().uuid().describe('ID of the affected phone device.'),
  device_custom_metadata: custom_metadata
    .optional()
    .describe(
      'Custom metadata of the device; present when device_id is provided.',
    ),
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
