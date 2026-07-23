import { z } from 'zod'

import { common_event } from './common.js'

const enrollment_automation_event = common_event.extend({
  enrollment_automation_id: z
    .string()
    .uuid()
    .describe('ID of the affected enrollment automation.'),
})

export const enrollment_automation_deleted_event =
  enrollment_automation_event.extend({
    event_type: z.literal('enrollment_automation.deleted'),
  }).describe(`
    ---
    route_path: /user_identities/enrollment_automations
    undocumented: Enrollment automations are deprecated and will be removed.
    ---
    An [enrollment automation](https://docs.seam.co/capability-guides/mobile-access/issuing-mobile-credentials-from-an-access-control-system) was deleted.
  `)

export type EnrollmentAutomationDeletedEvent = z.infer<
  typeof enrollment_automation_deleted_event
>

export const enrollment_automation_events = [
  enrollment_automation_deleted_event,
] as const
