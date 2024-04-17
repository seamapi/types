import { common_event } from 'lib/seam/connect/models/events/common.js'
import { z } from 'zod'

const action_attempt_failed_event = common_event.extend({
  event_type: z.literal('action_attempt.failed'),
})

const action_attempt_succeeded_event = common_event.extend({
  event_type: z.literal('action_attempt.succeeded'),
})

export const action_attempt_events = [
  action_attempt_failed_event,
  action_attempt_succeeded_event,
] as const
