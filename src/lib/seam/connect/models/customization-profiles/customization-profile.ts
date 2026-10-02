import * as z from 'zod/v3'

import { hex_color_code } from '../colors.js'
import { datetime } from '../datetime.js'

export const customer_portal_theme = z.object({
  primary_color: hex_color_code.optional(),
  primary_foreground_color: hex_color_code.optional(),
  secondary_color: hex_color_code.optional(),
  secondary_foreground_color: hex_color_code.optional(),
  font_family: z.string().optional(),
  mono_font_family: z.string().optional(),
})

export const message_overrides = z.record(
  z.string(),
  z.record(z.string(), z.string()),
)

export const customization_profile = z.object({
  workspace_id: z.string().uuid(),
  name: z.string().nullable(),
  customization_profile_id: z.string().uuid(),
  customer_key: z
    .string()
    .nullable()
    .describe(
      'Key of the customer that owns the profile, or `null` for a workspace-level profile. A customer can own a profile without using it; the profile a customer uses is `customization_profile_id` on the customer.',
    ),
  created_at: datetime,
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
