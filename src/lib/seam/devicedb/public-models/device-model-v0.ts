import { z } from 'zod'

export const device_model_v0 = z.object({
  main_category: z.string(),
  model_name: z.string(),
  manufacturer_model_id: z.string(),
  connection_type: z.enum(['wifi', 'zwave', 'zigbee', 'unknown']),
  support_level: z.enum(['live', 'beta', 'unsupported']),
  brand: z.string(),
  icon_url: z.string(),
  seam_device_model_page_url: z.string(),
})

export type DeviceModelV0 = z.infer<typeof device_model_v0>
