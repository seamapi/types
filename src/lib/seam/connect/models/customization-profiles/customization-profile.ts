import { z } from 'zod'

export const customization_profile = z.object({
  workspace_id: z.string().uuid(),
  name: z.string().nullable(),
  customization_profile_id: z.string().uuid(),
  created_at: z.string().datetime(),
  logo_url: z.string().url().optional(),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
}).describe(`
  ---
  title: Customization Profile
  undocumented: Unreleased.
  route_path: /workspaces/customization_profiles
  ---
  A customization profile.
`)

export type CustomizationProfile = z.infer<typeof customization_profile>
