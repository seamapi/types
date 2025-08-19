import { z } from 'zod'

const instant_key_preview_hotel = z.object({
  hotel_name: z.string(),
  primary_color: z.string(),
  accent_color: z.string(),
  secondary_color: z.string(),
  logo_url: z.string().optional(),
  verified: z.boolean(),
})

const instant_key_preview_guest = z.object({
  first_name: z.string(),
  last_name: z.string(),
  full_name: z.string(),
  email: z.string(),
  check_in_date: z.string(),
  check_out_date: z.string(),
})

const instant_key_preview_room = z.object({
  room_number: z.string(),
  room_type: z.string(),
  floor: z.number(),
})

const instant_key_preview_access = z.object({
  name: z.string(),
  icon: z.string(),
  hours: z.string().optional(),
  location: z.string().optional(),
  available: z.boolean(),
})

export const instant_key_preview = z.object({
  shortcode: z.string(),
  hotel: instant_key_preview_hotel,
  guest: instant_key_preview_guest,
  room: instant_key_preview_room,
  access: z.array(instant_key_preview_access),
  key_status: z.enum(['ready', 'expired', 'used']),
  support_phone: z.string(),
  support_email: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  expires_at: z.string(),
}).describe(`
  ---
  route_path: /instant_keys/preview
  ---
  Represents a preview of an Instant Key with hotel, guest, and access information.
`)

export type InstantKeyPreview = z.infer<typeof instant_key_preview>
export type InstantKeyPreviewHotel = z.infer<typeof instant_key_preview_hotel>
export type InstantKeyPreviewGuest = z.infer<typeof instant_key_preview_guest>
export type InstantKeyPreviewRoom = z.infer<typeof instant_key_preview_room>
export type InstantKeyPreviewAccess = z.infer<typeof instant_key_preview_access>
