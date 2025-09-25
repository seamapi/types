import { z } from 'zod'

import {
  access_grant_resource,
  booking_resource,
  reservation_resource,
} from './access-grant-resources.js'
import {
  building_resource,
  common_area_resource,
  facility_resource,
  listing_resource,
  neutral_resource,
  property_listing_resource,
  property_resource,
  room_resource,
  site_resource,
  unit_resource,
} from './location-resources.js'
import {
  guest_resource,
  resident_resource,
  tenant_resource,
  user_identity_resource,
  user_resource,
} from './user-identity-resources.js'

export const customer_data = z.object({
  customer_key: z.string().describe('Your unique identifier for the customer.'),

  // Location resources
  spaces: z
    .array(neutral_resource)
    .optional()
    .describe('List of general spaces or areas.'),
  sites: z
    .array(site_resource)
    .optional()
    .describe('List of general sites or areas.'),
  properties: z
    .array(property_resource)
    .optional()
    .describe('List of short-term rental properties.'),
  rooms: z
    .array(room_resource)
    .optional()
    .describe('List of hotel or hospitality rooms.'),
  common_areas: z
    .array(common_area_resource)
    .optional()
    .describe('List of shared common areas.'),
  units: z
    .array(unit_resource)
    .optional()
    .describe('List of multi-family residential units.'),
  facilities: z
    .array(facility_resource)
    .optional()
    .describe('List of gym or fitness facilities.'),
  buildings: z
    .array(building_resource)
    .optional()
    .describe('List of buildings.'),
  listings: z
    .array(listing_resource)
    .optional()
    .describe('List of property listings.'),
  property_listings: z
    .array(property_listing_resource)
    .optional()
    .describe('List of property listings.'),

  // User identity resources
  guests: z.array(guest_resource).optional().describe('List of guests.'),
  tenants: z.array(tenant_resource).optional().describe('List of tenants.'),
  residents: z
    .array(resident_resource)
    .optional()
    .describe('List of residents.'),
  users: z.array(user_resource).optional().describe('List of users.'),
  user_identities: z
    .array(user_identity_resource)
    .optional()
    .describe('List of user identities.'),

  // Access grant resources
  reservations: z
    .array(reservation_resource)
    .optional()
    .describe('List of reservations.'),
  bookings: z.array(booking_resource).optional().describe('List of bookings.'),
  access_grants: z
    .array(access_grant_resource)
    .optional()
    .describe('List of access grants.'),
})

export type CustomerData = z.infer<typeof customer_data>

// Re-export all resource types for convenience
export * from './access-grant-resources.js'
export * from './location-resources.js'
export * from './user-identity-resources.js'
