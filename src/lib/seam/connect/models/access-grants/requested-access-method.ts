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
  provisioned_access_method_ids: z
    .array(z.string().uuid())
    .describe('IDs of the locations to which access is being given.'),
}).describe(`
  ---
  undocumented: Unreleased.
  ---
  `)

export type RequestedAccessMethod = z.infer<typeof requested_access_method>
