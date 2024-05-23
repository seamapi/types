import { z } from 'zod'

import { common_event } from './common.js'

const enrollment_automation_event = common_event.extend({
  enrollment_automation_id: z.string().uuid().describe(`
    ---
    title: Enrollment Automation ID
    ---
    ID of the enrollment automation.
  `),
})

export const enrollment_automation_deleted_event = enrollment_automation_event
  .extend({
    event_type: z.literal('enrollment_automation.deleted'),
  })
  .describe('An enrollment automation was deleted.')

export type EnrollmentAutomationDeletedEvent = z.infer<
  typeof enrollment_automation_deleted_event
>

export const enrollment_automation_events = [
  enrollment_automation_deleted_event,
] as const
