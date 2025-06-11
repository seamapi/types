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
}).describe(`
  ---
  undocumented: Unreleased.
  route_path: /unstable_partner/resources
  ---
  `)

export type PartnerResource = z.infer<typeof partner_resource>

export const typed_partner_resource = z.object({
  partner_resource_key: z.string(),

  name: z.string(),
  description: z.string().optional(),
  custom_metadata: z.record(z.string(), z.string()).optional(),
}).describe(`
  ---
  undocumented: Unreleased.
  route_path: /unstable_partner/resources
  ---
  `)

export type TypedPartnerResource = z.infer<typeof typed_partner_resource>

export const space_resource = z.object({
  space_key: z.string(),

  name: z.string(),
  description: z.string().optional(),
  custom_metadata: z.record(z.string(), z.string()).optional(),
}).describe(`
  ---
  undocumented: Unreleased.
  route_path: /unstable_partner/resources
  ---
  `)

export type SpaceResource = z.infer<typeof space_resource>
