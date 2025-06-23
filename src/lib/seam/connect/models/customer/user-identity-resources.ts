import { z } from 'zod'

// Base user identity resource with common fields
const base_user_identity_resource = z.object({
  name: z
    .string()
    .describe('Your display name for this user identity resource.'),
  email_address: z
    .string()
    .optional()
    .describe('Email address associated with the user identity.'),
  phone_number: z
    .string()
    .optional()
    .describe('Phone number associated with the user identity.'),
})

// User identity resource types with their key aliases
export const guest_resource = base_user_identity_resource.extend({
  guest_key: z.string().describe('Your unique identifier for the guest.'),
})

export const tenant_resource = base_user_identity_resource.extend({
  tenant_key: z.string().describe('Your unique identifier for the tenant.'),
})

export const resident_resource = base_user_identity_resource.extend({
  resident_key: z.string().describe('Your unique identifier for the resident.'),
})

export const user_resource = base_user_identity_resource.extend({
  user_key: z.string().describe('Your unique identifier for the user.'),
})

export const user_identity_resource = base_user_identity_resource.extend({
  user_identity_key: z
    .string()
    .describe('Your unique identifier for the user identity.'),
})

// Union of all user identity resource types
export const user_identity_resource_union = z.union([
  guest_resource,
  tenant_resource,
  resident_resource,
  user_resource,
  user_identity_resource,
])

// All user identity key aliases for use in references
export const user_identity_key_aliases = z.union([
  z.object({ guest_key: z.string() }),
  z.object({ tenant_key: z.string() }),
  z.object({ resident_key: z.string() }),
  z.object({ user_key: z.string() }),
  z.object({ user_identity_key: z.string() }),
])

// Export types
export type GuestResource = z.infer<typeof guest_resource>
export type TenantResource = z.infer<typeof tenant_resource>
export type ResidentResource = z.infer<typeof resident_resource>
export type UserResource = z.infer<typeof user_resource>
export type UserIdentityResource = z.infer<typeof user_identity_resource>
export type UserIdentityResourceUnion = z.infer<
  typeof user_identity_resource_union
>
export type UserIdentityKeyAliases = z.infer<typeof user_identity_key_aliases>
