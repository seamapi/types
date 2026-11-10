import * as z from 'zod/v3'

const pool_field_header = `
      ---
      property_group_key: pools
      undocumented: Unreleased.
      ---
`

const describePoolField = (description: string): string =>
  `${pool_field_header}      ${description}
      `

export const pool_fields = z.object({
  is_spa: z
    .boolean()
    .optional()
    .describe(
      describePoolField(
        'Indicates whether the device represents spa water rather than pool water. Present only on pool and spa devices.',
      ),
    ),
  is_water_circulating: z
    .boolean()
    .optional()
    .describe(
      describePoolField(
        'Indicates whether the water is circulating. Temperature readings are only live while it is circulating. Omitted if the controller does not report it.',
      ),
    ),
})

export const pool_system_fields = z.object({
  salt_ppm: z
    .number()
    .optional()
    .describe(
      describePoolField(
        'Salt level reported by the chlorinator, in parts per million. Omitted if the system has no salt chlorinator.',
      ),
    ),
})

export type PoolFields = z.infer<typeof pool_fields>
export type PoolSystemFields = z.infer<typeof pool_system_fields>
