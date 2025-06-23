import { z } from 'zod'

// Base location resource with common fields
const base_location_resource = z.object({
  name: z.string().describe('Your display name for this location resource.'),
})

// Location resource types with their key aliases
export const neutral_resource = base_location_resource.extend({
  space_key: z.string().describe('Your unique identifier for the space.'),
})

export const property_resource = base_location_resource.extend({
  property_key: z.string().describe('Your unique identifier for the property.'),
})

export const room_resource = base_location_resource.extend({
  room_key: z.string().describe('Your unique identifier for the room.'),
})

export const common_area_resource = base_location_resource.extend({
  common_area_key: z
    .string()
    .describe('Your unique identifier for the common area.'),
})

export const unit_resource = base_location_resource.extend({
  unit_key: z.string().describe('Your unique identifier for the unit.'),
})

export const facility_resource = base_location_resource.extend({
  facility_key: z.string().describe('Your unique identifier for the facility.'),
})

export const building_resource = base_location_resource.extend({
  building_key: z.string().describe('Your unique identifier for the building.'),
})

export const listing_resource = base_location_resource.extend({
  listing_key: z.string().describe('Your unique identifier for the listing.'),
})

// Union of all location resource types
export const location_resource = z.union([
  neutral_resource,
  property_resource,
  room_resource,
  common_area_resource,
  unit_resource,
  facility_resource,
  building_resource,
  listing_resource,
])

// All location key aliases for use in references
export const location_key_aliases = z.union([
  z.object({ space_key: z.string() }),
  z.object({ property_key: z.string() }),
  z.object({ room_key: z.string() }),
  z.object({ common_area_key: z.string() }),
  z.object({ unit_key: z.string() }),
  z.object({ facility_key: z.string() }),
  z.object({ building_key: z.string() }),
  z.object({ listing_key: z.string() }),
])

// Export types
export type NeutralResource = z.infer<typeof neutral_resource>
export type PropertyResource = z.infer<typeof property_resource>
export type RoomResource = z.infer<typeof room_resource>
export type CommonAreaResource = z.infer<typeof common_area_resource>
export type UnitResource = z.infer<typeof unit_resource>
export type FacilityResource = z.infer<typeof facility_resource>
export type BuildingResource = z.infer<typeof building_resource>
export type ListingResource = z.infer<typeof listing_resource>
export type LocationResource = z.infer<typeof location_resource>
export type LocationKeyAliases = z.infer<typeof location_key_aliases>
