import { z } from 'zod'

export const acs_user_external_type = z.enum(['pti_user'])

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
  email: z.string().email().optional(),
  phone_number: phone_number.optional(),
})

export const acs_user = z
  .object({
    acs_user_id: z.string().uuid(),
    acs_system_id: z.string().uuid(),
    workspace_id: z.string().uuid(),
    created_at: z.string().datetime(),
    display_name: z.string(),
    external_type: acs_user_external_type,
    external_type_display_name: z.string(),
    is_being_deleted: z.boolean(),
  })
  .merge(user_fields)

export type AcsUser = z.output<typeof acs_user>
