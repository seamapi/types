import { z } from 'zod'

export const custom_metadata = z
  .record(
    z.string().max(40),
    z.union([z.string().max(500), z.boolean(), z.null()]),
  )
  .refine((val) => Object.keys(val).length <= 50, {
    message: 'Custom metadata is limited to a maximum of 50 keys',
  })

export type CustomMetadata = z.infer<typeof custom_metadata>
