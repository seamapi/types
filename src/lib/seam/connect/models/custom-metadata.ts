import { z } from 'zod'

export const custom_metadata_input = z
  .record(
    z.string().max(40),
    z.union([z.string().max(500), z.boolean(), z.null()]),
  )
  .refine((val) => Object.keys(val).length <= 50, {
    message: 'Custom metadata is limited to a maximum of 50 keys',
  })
  .describe(
    'Set of up to 50 key:value pairs, with key names up to 40 characters long. Accepts string or Boolean values. Strings are limited to 500 characters. Adding custom metadata to a resource, such as a [Connect Webview](https://docs.seam.co/latest/core-concepts/connect-webviews/attaching-custom-data-to-the-connect-webview), [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts/adding-custom-metadata-to-a-connected-account), or [device](https://docs.seam.co/latest/core-concepts/devices/adding-custom-metadata-to-a-device), enables you to store custom information, like customer details or internal IDs from your application.',
  )

export const custom_metadata = z
  .record(z.string(), z.union([z.string(), z.boolean()]))
  .describe(
    'Set of key:value pairs. Adding custom metadata to a resource, such as a [Connect Webview](https://docs.seam.co/latest/core-concepts/connect-webviews/attaching-custom-data-to-the-connect-webview), [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts/adding-custom-metadata-to-a-connected-account), or [device](https://docs.seam.co/latest/core-concepts/devices/adding-custom-metadata-to-a-device), enables you to store custom information, like customer details or internal IDs from your application.',
  )

export type CustomMetadata = z.output<typeof custom_metadata>

export type CustomMetadataInput = z.input<typeof custom_metadata_input>
