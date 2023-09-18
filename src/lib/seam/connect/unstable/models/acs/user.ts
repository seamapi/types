import { z } from 'zod'

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

export const desired_user_properties = z.object({
  _desired_full_name: z.string(),
  _desired_email: z.string().email().nullish(),
  _desired_phone_number: phone_number.nullish(),
})

export type DesiredAcsUserProperties = z.output<typeof desired_user_properties>

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
  })
  .merge(user_fields)

export type AcsUser = z.output<typeof acs_user>
