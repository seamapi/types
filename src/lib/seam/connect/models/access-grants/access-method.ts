import { z } from 'zod'

export const access_method = z.object({
  access_method_key: z
    .string()
    .describe('Key for the access method - unique within an access grant.'),
  display_name: z.string().describe('Display name of the access method.'),
  mode: z
    .enum(['code', 'card', 'mobile_key'])
    .describe(
      'Access method mode. Supported values: `code`, `card`, `mobile_key`.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the access method was created.'),
  issued_at: z
    .string()
    .datetime()
    .nullable()
    .describe('Date and time at which the access method was issued.'),
}).describe(`
  ---
  undocumented: Unreleased.
  ---
  `)

export type AccessMethod = z.infer<typeof access_method>
