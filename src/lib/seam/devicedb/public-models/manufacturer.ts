import { z } from 'zod'

import { image_reference } from './image-reference.js'

export const manufacturer = z.object({
  manufacturer_id: z.string().uuid(),
  display_name: z.string(),
  logo: image_reference.optional(),
  integration: z.enum(['stable', 'beta', 'planned', 'unsupported']),
  is_connect_webview_supported: z.boolean(),
  requires_seam_support_to_add_account: z.boolean(),
})

export type Manufacturer = z.infer<typeof manufacturer>
