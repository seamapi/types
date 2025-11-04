import { z } from 'zod'

// Base access grant resource with common fields
const base_access_grant_resource = z.object({
  name: z
    .string()
    .optional()
    .describe('Your name for this access grant resource.'),
  starts_at: z
    .string()
    .datetime()
    .optional()
    .describe('Starting date and time for the access grant.'),
  ends_at: z
    .string()
    .datetime()
    .optional()
    .describe('Ending date and time for the access grant.'),
  preferred_code: z
    .string()
    .optional()
    .describe(
      'Preferred PIN code to use when creating access for this reservation.',
    ),
})

// User identity key reference - allows any user identity key alias
export const user_identity_reference = z.object({
  // Allow any user identity key alias (only one should be present)
  guest_key: z
    .string()
    .optional()
    .describe('Guest key associated with the access grant.'),
  tenant_key: z
    .string()
    .optional()
    .describe('Tenant key associated with the access grant.'),
  resident_key: z
    .string()
    .optional()
    .describe('Resident key associated with the access grant.'),
  user_key: z
    .string()
    .optional()
    .describe('User key associated with the access grant.'),
  user_identity_key: z
    .string()
    .optional()
    .describe('User identity key associated with the access grant.'),
})

// Location key references - separate arrays for each location key alias
export const location_references = z.object({
  // Allow arrays of strings for each location key alias
  space_keys: z
    .array(z.string())
    .optional()
    .describe('Space keys associated with the access grant.'),
  property_keys: z
    .array(z.string())
    .optional()
    .describe('Property keys associated with the access grant.'),
  room_keys: z
    .array(z.string())
    .optional()
    .describe('Room keys associated with the access grant.'),
  common_area_keys: z
    .array(z.string())
    .optional()
    .describe('Common area keys associated with the access grant.'),
  unit_keys: z
    .array(z.string())
    .optional()
    .describe('Unit keys associated with the access grant.'),
  facility_keys: z
    .array(z.string())
    .optional()
    .describe('Facility keys associated with the access grant.'),
  building_keys: z
    .array(z.string())
    .optional()
    .describe('Building keys associated with the access grant.'),
  listing_keys: z
    .array(z.string())
    .optional()
    .describe('Listing keys associated with the access grant.'),
})

// Access grant resource types with their key aliases
export const reservation_resource = base_access_grant_resource
  .extend({
    reservation_key: z
      .string()
      .min(1)
      .refine((val) => val === val.trim(), {
        message: 'Must not have leading or trailing whitespace',
      })
      .describe('Your unique identifier for the reservation.'),
  })
  .merge(user_identity_reference)
  .merge(location_references)

export const booking_resource = base_access_grant_resource
  .extend({
    booking_key: z
      .string()
      .min(1)
      .refine((val) => val === val.trim(), {
        message: 'Must not have leading or trailing whitespace',
      })
      .describe('Your unique identifier for the booking.'),
  })
  .merge(user_identity_reference)
  .merge(location_references)

export const access_grant_resource = base_access_grant_resource
  .extend({
    access_grant_key: z
      .string()
      .min(1)
      .refine((val) => val === val.trim(), {
        message: 'Must not have leading or trailing whitespace',
      })
      .describe('Your unique identifier for the access grant.'),
  })
  .merge(user_identity_reference)
  .merge(location_references)

// Union of all access grant resource types
export const access_grant_resource_union = z.union([
  reservation_resource,
  booking_resource,
  access_grant_resource,
])

// All access grant key aliases for use in references
export const access_grant_key_aliases = z.union([
  z.object({ reservation_key: z.string() }),
  z.object({ booking_key: z.string() }),
  z.object({ access_grant_key: z.string() }),
])

// Export types
export type ReservationResource = z.infer<typeof reservation_resource>
export type BookingResource = z.infer<typeof booking_resource>
export type AccessGrantResource = z.infer<typeof access_grant_resource>
export type AccessGrantResourceUnion = z.infer<
  typeof access_grant_resource_union
>
export type AccessGrantKeyAliases = z.infer<typeof access_grant_key_aliases>
export type UserIdentityReference = z.infer<typeof user_identity_reference>
export type LocationReferences = z.infer<typeof location_references>
