import { z } from 'zod'

import { common_event } from './common.js'

const action_attempt_event = common_event.extend({
  action_attempt_id: z
    .string()
    .uuid()
    .describe('ID of the affected action attempt.'),
  action_type: z.string().describe('Type of the action.'),
  status: z.string().describe('Status of the action.'),
})

export const action_attempt_lock_door_succeeded_event =
  action_attempt_event.extend({
    event_type: z.literal('action_attempt.lock_door.succeeded'),
  }).describe(`
    ---
    route_path: /action_attempts
    ---
    A lock door [action attempt](https://docs.seam.co/latest/core-concepts/action-attempts) succeeded.
  `)

export const action_attempt_lock_door_failed_event =
  action_attempt_event.extend({
    event_type: z.literal('action_attempt.lock_door.failed'),
  }).describe(`
    ---
    route_path: /action_attempts
    ---
    A lock door [action attempt](https://docs.seam.co/latest/core-concepts/action-attempts) failed.
  `)

export const action_attempt_unlock_door_succeeded_event =
  action_attempt_event.extend({
    event_type: z.literal('action_attempt.unlock_door.succeeded'),
  }).describe(`
    ---
    route_path: /action_attempts
    ---
    An unlock door [action attempt](https://docs.seam.co/latest/core-concepts/action-attempts) succeeded.
  `)

export const action_attempt_unlock_door_failed_event =
  action_attempt_event.extend({
    event_type: z.literal('action_attempt.unlock_door.failed'),
  }).describe(`
    ---
    route_path: /action_attempts
    ---
    An unlock door [action attempt](https://docs.seam.co/latest/core-concepts/action-attempts) failed.
  `)

export const action_attempt_events = [
  action_attempt_lock_door_succeeded_event,
  action_attempt_lock_door_failed_event,
  action_attempt_unlock_door_succeeded_event,
  action_attempt_unlock_door_failed_event,
]
