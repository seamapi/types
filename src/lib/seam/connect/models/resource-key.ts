import * as z from 'zod/v3'

export const resource_key = z
  .string()
  .min(1)
  .refine((value) => value.trim() !== '', {
    message: 'Must not consist only of whitespace',
  })
