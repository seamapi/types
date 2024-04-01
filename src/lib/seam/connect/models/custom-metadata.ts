import { z } from 'zod'

export const custom_metadata_input = z
  .record(
    z.string().max(40),
    z.union([z.string().max(500), z.boolean(), z.null()]),
  )
  .refine((val) => Object.keys(val).length <= 50, {
    message: 'Custom metadata is limited to a maximum of 50 keys',
  })

export const custom_metadata = z.record(
  z.string(),
  z.union([z.string(), z.boolean()]),
)

export type CustomMetadata = z.output<typeof custom_metadata>

export type CustomMetadataInput = z.input<typeof custom_metadata_input>
