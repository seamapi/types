import { z } from 'zod'

export const customer_delete_data = z.object({
  // Customer keys to delete all data for
  customer_keys: z
    .array(z.string())
    .optional()
    .describe('List of customer keys to delete all data for.'),

  // Location resources to delete
  space_keys: z
    .array(z.string())
    .optional()
    .describe('List of space keys to delete.'),
  property_keys: z
    .array(z.string())
    .optional()
    .describe('List of property keys to delete.'),
  room_keys: z
    .array(z.string())
    .optional()
    .describe('List of room keys to delete.'),
  common_area_keys: z
    .array(z.string())
    .optional()
    .describe('List of common area keys to delete.'),
  unit_keys: z
    .array(z.string())
    .optional()
    .describe('List of unit keys to delete.'),
  facility_keys: z
    .array(z.string())
    .optional()
    .describe('List of facility keys to delete.'),
  building_keys: z
    .array(z.string())
    .optional()
    .describe('List of building keys to delete.'),
  listing_keys: z
    .array(z.string())
    .optional()
    .describe('List of listing keys to delete.'),
  property_listing_keys: z
    .array(z.string())
    .optional()
    .describe('List of property listing keys to delete.'),

  // User identity resources to delete
  guest_keys: z
    .array(z.string())
    .optional()
    .describe('List of guest keys to delete.'),
  tenant_keys: z
    .array(z.string())
    .optional()
    .describe('List of tenant keys to delete.'),
  resident_keys: z
    .array(z.string())
    .optional()
    .describe('List of resident keys to delete.'),
  user_keys: z
    .array(z.string())
    .optional()
    .describe('List of user keys to delete.'),
  user_identity_keys: z
    .array(z.string())
    .optional()
    .describe('List of user identity keys to delete.'),

  // Access grant resources to delete
  reservation_keys: z
    .array(z.string())
    .optional()
    .describe('List of reservation keys to delete.'),
  booking_keys: z
    .array(z.string())
    .optional()
    .describe('List of booking keys to delete.'),
  access_grant_keys: z
    .array(z.string())
    .optional()
    .describe('List of access grant keys to delete.'),
  staff_member_keys: z
    .array(z.string())
    .optional()
    .describe('List of staff member keys to delete.'),
})

export type CustomerDeleteData = z.infer<typeof customer_delete_data>
