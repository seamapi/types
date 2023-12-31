import { z } from 'zod'

import { schedule } from '../schedule.js'

export const acs_user_external_type = z.enum([
  'pti_user',
  'brivo_user',
  'hid_credential_manager_user',
  'salto_site_user',
])

export type AcsUserExternalType = z.infer<typeof acs_user_external_type>

const phone_number = z.coerce
  .string()
  .trim()
  .refine(
    (val) => {
      // https://www.twilio.com/docs/glossary/what-e164
      return /^\+[1-9]\d{1,14}$/.test(val)
    },
    {
      message: 'Phone number must be in E.164 format: +14155552671',
    },
  )

const user_fields = z.object({
  full_name: z.string().optional(),
  email: z
    .string()
    .email()
    .optional()
    .describe('Deprecated: use email_address.'),
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
  })
  .merge(user_fields)

export type AcsUser = z.output<typeof acs_user>
