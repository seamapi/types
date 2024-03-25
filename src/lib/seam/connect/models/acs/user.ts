import { z } from 'zod'

import { phone_number } from '../phone-number.js'
import { schedule } from '../schedule.js'

export const acs_user_external_type = z.enum([
  'pti_user',
  'brivo_user',
  'hid_credential_manager_user',
  'salto_site_user',
])

export type AcsUserExternalType = z.infer<typeof acs_user_external_type>

const user_fields = z.object({
  full_name: z.string().optional(),
  email: z.string().email().optional().describe(`
    ---
    deprecated: use email_address.
    ---
    `),
  email_address: z.string().email().optional(),
  phone_number: phone_number.optional(),
})

export const acs_user = z
  .object({
    acs_user_id: z.string().uuid(),
    acs_system_id: z.string().uuid(),
    hid_acs_system_id: z.string().uuid().optional(),
    workspace_id: z.string().uuid(),
    created_at: z.string().datetime(),
    display_name: z.string(),
    external_type: acs_user_external_type.optional(),
    external_type_display_name: z.string().optional(),
    is_suspended: z.boolean(),
    access_schedule: schedule.optional(),
    user_identity_id: z.string().optional(),
    user_identity_email_address: z.string().optional(),
    user_identity_phone_number: z.string().optional(),
  })
  .merge(user_fields)

export type AcsUser = z.output<typeof acs_user>
