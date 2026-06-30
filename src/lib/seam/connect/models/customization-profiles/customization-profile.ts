import { z } from 'zod'

import { hex_color_code } from '../colors.js'

export const customer_portal_theme = z.object({
  primary_color: hex_color_code.optional(),
  primary_foreground_color: hex_color_code.optional(),
  secondary_color: hex_color_code.optional(),
  secondary_foreground_color: hex_color_code.optional(),
  font_family: z.string().optional(),
  mono_font_family: z.string().optional(),
})

// Per-locale portal label/terminology overrides:
// { [locale]: { ["Namespace.key"]: "Override string" } }
// e.g. { "en-US": { "Reservations.reservation": "Booking" } }
export const message_overrides = z.record(
  z.string(),
  z.record(z.string(), z.string()),
)

export const customization_profile = z.object({
  workspace_id: z.string().uuid(),
  name: z.string().nullable(),
  customization_profile_id: z.string().uuid(),
  created_at: z.string().datetime(),
  logo_url: z.string().url().optional(),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
  customer_portal_theme: customer_portal_theme.optional(),
  message_overrides: message_overrides.optional(),
}).describe(`
  ---
  title: Customization Profile
  undocumented: Unreleased.
  route_path: /workspaces/customization_profiles
  ---
  A customization profile.
`)

export type CustomizationProfile = z.infer<typeof customization_profile>
