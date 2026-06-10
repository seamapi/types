import { z } from 'zod'

export const common_event = z.object({
  event_id: z.string().uuid().describe('ID of the event.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) associated with the event.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the event was created.'),
  occurred_at: z
    .string()
    .datetime()
    .describe('Date and time at which the event occurred.'),
})

const error_code_description =
  'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.'
const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

export const common_event_error = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the error.'),
  message: z
    .string()
    .describe(
      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
    ),
  error_code: z.string().describe(error_code_description),
})

export const common_event_warning = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the warning.'),
  message: z
    .string()
    .describe(
      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
    ),
  warning_code: z.string().describe(warning_code_description),
})
