import { z } from 'zod'

export const partner_resource = z.object({
  partner_resource_type: z.string(),
  partner_resource_key: z.string(),
  customer_key: z.string(),

  // For user identity partner resources
  email_address: z.string().optional(),
  phone_number: z.string().optional(),

  // For access grant partner resources
  starts_at: z.string().optional(),
  ends_at: z.string().optional(),
  user_identity_key: z.string().optional(),
  location_keys: z.array(z.string()).optional(),

  // Common
  name: z.string().optional(),
  description: z.string().optional(),
  custom_metadata: z.record(z.string(), z.string()).optional(),
})

export type PartnerResource = z.infer<typeof partner_resource>
