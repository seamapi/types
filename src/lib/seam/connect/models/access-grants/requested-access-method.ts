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
      'Date and time at which the requested access method was added to this access grant.',
    ),
  created_access_method_ids: z
    .array(z.string().uuid())
    .describe(
      'IDs of the access methods that were created for this requested access method.',
    ),
})

export type RequestedAccessMethod = z.infer<typeof requested_access_method>
