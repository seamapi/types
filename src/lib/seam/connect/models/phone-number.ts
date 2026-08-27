import * as z from 'zod/v3'

export const phone_number = z.coerce
  .string()
  .trim()
  .refine(
    (val) => {
      return /^\+[1-9]\d{1,14}$/.test(val)
    },
    {
      message: 'Phone number must be in E.164 format: +14155552671',
    },
  )

export const loose_phone_number = z.string()
