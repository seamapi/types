import { z } from 'zod'

export const common_action_attempt = z.object({
  action_attempt_id: z.string().uuid().describe('ID of the action attempt.'),
  status: z
    .enum(['pending', 'success', 'error'])
    .describe('Status of the action attempt.'),
})

export const common_pending_action_attempt = common_action_attempt.extend({
  status: z.literal('pending'),
  result: z
    .null()
    .describe(
      'Result of the action attempt. Null for pending action attempts.',
    ),
  error: z
    .null()
    .describe(
      'Errors associated with the action attempt. Null for pending action attempts.',
    ),
})

export const common_succeeded_action_attempt = common_action_attempt.extend({
  status: z.literal('success'),
  error: z
    .null()
    .describe(
      'Errors associated with the action attempt. Null for successful action attempts.',
    ),
})

export const common_failed_action_attempt = common_action_attempt.extend({
  status: z.literal('error'),
  result: z
    .null()
    .describe('Result of the action attempt. Null for failed action attempts.'),
})

export const common_action_attempt_errors = [
  z
    .object({
      type: z
        .literal('uncategorized_error')
        .describe('Type of the error associated with the action attempt.'),
      message: z
        .string()
        .describe('Message for the error associated with the action attempt.'),
    })
    .describe("Error that doesn't fit into other specific error categories."),
  z
    .object({
      type: z
        .literal('action_attempt_expired')
        .describe('Type of the error associated with the action attempt.'),
      message: z
        .string()
        .describe('Message for the error associated with the action attempt.'),
    })
    .describe('Error to indicate an expired action attempt.'),
] as const
