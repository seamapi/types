import { z } from 'zod'

import { phone_number } from '../../phone-number.js'
import { schedule } from '../../schedule.js'

const common_pending_modification = z.object({
  created_at: z.string().datetime(),
})

const acs_user_profile = z.object({
  email_address: z.string().email().nullable(),
  full_name: z.string().nullable(),
  phone_number: phone_number.optional().nullable(),
})

const profile_pending_modification = common_pending_modification.extend({
  modification_code: z.literal('profile'),
  modified_from: acs_user_profile.partial(),
  modified_to: acs_user_profile.partial(),
})

const access_schedule_pending_modification = common_pending_modification.extend(
  {
    modification_code: z.literal('access_schedule'),
    modified_from: schedule,
    modified_to: schedule,
  },
)

const suspension_state_pending_modification =
  common_pending_modification.extend({
    modification_code: z.literal('suspension_state'),
    modified_from: z.object({ is_suspended: z.boolean() }),
    modified_to: z.object({ is_suspended: z.boolean() }),
  })

const acs_access_group_membership_pending_modification =
  common_pending_modification.extend({
    modification_code: z.literal('acs_access_group_membership'),
    modified_from: z.object({
      acs_access_group_id: z.string().uuid().nullable(),
    }),
    modified_to: z.object({
      acs_access_group_id: z.string().uuid().nullable(),
    }),
  })

export const acs_user_pending_modification = z.discriminatedUnion(
  'modification_code',
  [
    profile_pending_modification,
    access_schedule_pending_modification,
    suspension_state_pending_modification,
    acs_access_group_membership_pending_modification,
  ],
)
