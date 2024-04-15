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

export const manufacturer_annotation_code = z.enum(['subscription_required'])

export type ManufacturerAnnotationCode = z.infer<
  typeof manufacturer_annotation_code
>

export const manufacturer_annotation = z.object({
  annotation_code: manufacturer_annotation_code,
  message: z.string().trim().nonempty(),
})

export type ManufacturerAnnotation = z.infer<typeof manufacturer_annotation>

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
  annotations: z.array(manufacturer_annotation),
  website: z.string().url().optional(),
  legal_name: z.string().optional(),
  parent_organization: z.string().optional(),
  headquarters: z.array(z.string()).optional(),
  countries_of_origin: z.array(z.string()).optional(),
  founding_year: z.string().optional(),
  us_customer_support_tel: z.string().optional(),
  us_customer_support_email: z.string().email().optional(),
  us_customer_support_contact_url: z.string().url().optional(),
  seam_api_guide: z.string().optional(),
  description: z.string().optional(),
})

export type Manufacturer = z.infer<typeof manufacturer>
