import { z } from 'zod'

export const phone_number = z.coerce
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
