import { z } from 'zod'

import { common_acs_event } from './common.js'

const acs_encoder_event = common_acs_event.extend({
  acs_encoder_id: z.string().uuid().describe('ID of the affected encoder.'),
})

export const acs_encoder_added_event = acs_encoder_event.extend({
  event_type: z.literal('acs_encoder.added'),
}).describe(`
    ---
    route_path: /acs/encoders
    ---
    An [access system encoder](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners) was added.
  `)

export type AcsEncoderAddedEvent = z.infer<typeof acs_encoder_added_event>

export const acs_encoder_removed_event = acs_encoder_event.extend({
  event_type: z.literal('acs_encoder.removed'),
}).describe(`
    ---
    route_path: /acs/encoders
    ---
    An [access system encoder](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners) was removed.
  `)

export type AcsEncoderRemovedEvent = z.infer<typeof acs_encoder_removed_event>

export const acs_encoder_events = [
  acs_encoder_added_event,
  acs_encoder_removed_event,
] as const
