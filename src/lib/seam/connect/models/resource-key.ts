import { z } from 'zod'

/**
 * Shared schema for every customer-supplied `*_key` identifier
 * (`customer_key`, `access_grant_key`, `space_key`, `user_identity_key`, ...).
 *
 * A whitespace-only key is never a usable identifier: it cannot be looked back
 * up, and once stored it silently shadows the "no key set" case that the
 * underlying columns model as NULL.
 */
export const resource_key = z
  .string()
  .min(1)
  .refine((value) => value.trim() !== '', {
    message: 'Must not consist only of whitespace',
  })
