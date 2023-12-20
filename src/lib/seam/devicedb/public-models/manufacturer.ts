import { z } from 'zod'

import { image_reference } from './image-reference.js'

export const manufacturer_integration_support_level = z.enum([
  'stable',
  'beta',
  'planned',
  'unsupported',
  'inquire',
])

export type ManufacturerIntegrationSupportLevel = z.infer<
  typeof manufacturer_integration_support_level
>

export const manufacturer = z.object({
  manufacturer_id: z.string().uuid(),
  display_name: z.string(),
  logo: image_reference.optional(),
  /** @deprecated */
  integration: manufacturer_integration_support_level,
  integration_support_level: manufacturer_integration_support_level,
  is_connect_webview_supported: z.boolean(),
  requires_seam_support_to_add_account: z.boolean(),
  device_model_count: z.number(),
})

export type Manufacturer = z.infer<typeof manufacturer>
