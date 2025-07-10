import { z } from 'zod'

export const requested_access_method = z.object({
  display_name: z.string().describe('Display name of the access method.'),
  mode: z
    .enum(['code', 'card', 'mobile_key'])
    .describe(
      'Access method mode. Supported values: `code`, `card`, `mobile_key`.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the requested access method was added to the Access Grant.',
    ),
  created_access_method_ids: z
    .array(z.string().uuid())
    .describe(
      'IDs of the access methods created for the requested access method.',
    ),
})

export type RequestedAccessMethod = z.infer<typeof requested_access_method>
