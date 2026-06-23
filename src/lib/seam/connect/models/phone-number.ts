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

// Use this for phone numbers that originate from provider/external-system sync
// — user identities, access system users, and their pending mutations — and,
// because the create/update endpoints for those resources pick `phone_number`
// from these same schemas, for that API input too. Synced data legitimately
// contains non-E.164 values (partial/last-four digits, spaces, or a missing
// `+`), so validating them strictly on the *output* path makes the public
// mapper throw a ZodError, which 500s the entire list endpoint for any
// workspace holding one such row; and the create/update endpoints must be able
// to round-trip those same values. Use the strict `phone_number` schema above
// only where you specifically want to reject non-E.164 input.
export const loose_phone_number = z.string()
