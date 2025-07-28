import { z } from 'zod'

export const customization_profile = z.object({
  workspace_id: z.string().uuid(),
  customization_profile_id: z.string().uuid(),
  logo_url: z.string().optional(),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
})

export type CustomizationProfile = z.infer<typeof customization_profile>
