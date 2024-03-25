import { z } from 'zod'

export const phone_specific_properties = z.object({
  assa_abloy_credential_service_metadata: z
    .object({
      has_active_endpoint: z.boolean(),
      endpoints: z.array(
        z.object({
          endpoint_id: z.string(),
          is_active: z.boolean(),
        }),
      ),
    })
    .optional(),
})
