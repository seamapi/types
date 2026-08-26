import { z } from 'zod'

export const resource_key = z
  .string()
  .min(1)
  .refine((value) => value.trim() !== '', {
    message: 'Must not consist only of whitespace',
  })
