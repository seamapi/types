import { z } from 'zod'

export const common_action_attempt = z.object({
  action_attempt_id: z.string().uuid().describe(`
    ---
    title: Action Attempt ID
    ---
    The ID of the action attempt.
  `),
  status: z.enum(['pending', 'success', 'error']),
})

export const common_pending_action_attempt = common_action_attempt.extend({
  status: z.literal('pending'),
  result: z.null(),
  error: z.null(),
})

export const common_succeeded_action_attempt = common_action_attempt.extend({
  status: z.literal('success'),
  error: z.null(),
})

export const common_failed_action_attempt = common_action_attempt.extend({
  status: z.literal('error'),
  result: z.null(),
})
