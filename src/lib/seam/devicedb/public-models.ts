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

export const image_reference = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
})

export type ImageReference = z.infer<typeof image_reference>

export const manufacturer = z.object({
  manufacturer_id: z.string().uuid(),
  display_name: z.string(),
  logo: image_reference.optional(),
  integration: z.enum(['stable', 'beta', 'planned', 'unsupported']),
  is_connect_webview_supported: z.boolean(),
  requires_seam_support_to_add_account: z.boolean(),
})

export type Manufacturer = z.infer<typeof manufacturer>

export const device_model_v1 = z.object({
  device_model_id: z.string().uuid(),
  manufacturer,
  is_device_supported: z.boolean(),
  display_name: z.string(),
  description: z.string(),
  product_url: z.string(),
  main_connection_type: z.enum(['wifi', 'zwave', 'zigbee', 'unknown']),
  main_category: z.enum(['smartlock', 'thermostat', 'noise_sensor']),
  aesthetic_variants: z
    .object({
      slug: z.string(),
      display_name: z.string(),
      primary_color_hex: z.string().optional(),
      manufacturer_sku: z.string(),
      front_image: image_reference.optional(),
      back_image: image_reference.optional(),
    })
    .array(),
})

export type DeviceModelV1 = z.infer<typeof device_model_v1>
