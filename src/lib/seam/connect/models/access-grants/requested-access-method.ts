import { z } from 'zod'

export const requested_access_method = z.object({
  display_name: z.string().describe('Display name of the access method.'),
  mode: z
    .enum(['code', 'card', 'mobile_key'])
    .describe(
      'Access method mode. Supported values: `code`, `card`, `mobile_key`.',
    ),
  code: z
    .string()
    .min(4)
    .max(9)
    .regex(/^\d+$/, 'Must only contain digits')
    .optional()
    .describe(
      "Specific PIN code to use for this access method. Only applicable when mode is 'code'.",
    ),
  instant_key_max_use_count: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe(
      "Maximum number of times the instant key can be used. Only applicable when mode is 'mobile_key'. Defaults to 1 if not specified.",
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
