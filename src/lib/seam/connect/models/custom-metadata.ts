import { z } from 'zod'

const PERIOD_IN_KEY_ERROR = {
  message: 'Custom metadata key names cannot contain a period (.)',
}

const doesNotContainPeriod = (key: string): boolean => !key.includes('.')

const custom_metadata_key = z
  .string()
  .max(40)
  .refine(doesNotContainPeriod, PERIOD_IN_KEY_ERROR)

// Periods are rejected because a dotted key breaks the pagination query hash
// serializer. The .max(40) of custom_metadata_key is deliberately not carried
// over: rows written before that limit can hold longer keys, and a filter that
// cannot name them would be a regression.
const custom_metadata_has_key = z
  .string()
  .refine(doesNotContainPeriod, PERIOD_IN_KEY_ERROR)

export const custom_metadata_input = z
  .record(
    custom_metadata_key,
    z.union([z.string().max(500), z.boolean(), z.null()]),
  )
  .refine((val) => Object.keys(val).length <= 50, {
    message: 'Custom metadata is limited to a maximum of 50 keys',
  })
  .describe(
    'Set of up to 50 key:value pairs, with key names up to 40 characters long that cannot contain a period (.). Accepts string or Boolean values. Strings are limited to 500 characters. Adding custom metadata to a resource, such as a [Connect Webview](https://docs.seam.co/core-concepts/connect-webviews/attaching-custom-data-to-the-connect-webview), [connected account](https://docs.seam.co/core-concepts/connected-accounts/adding-custom-metadata-to-a-connected-account), or [device](https://docs.seam.co/core-concepts/devices/adding-custom-metadata-to-a-device), enables you to store custom information, like customer details or internal IDs from your application. Set a key to `null` or to an empty string to remove that key from the custom metadata.',
  )

export const custom_metadata_has = z
  .record(custom_metadata_has_key, z.union([z.string(), z.boolean()]))
  .describe(
    'Set of key:value pairs by which to filter. Key names cannot contain a period (.). Accepts string or Boolean values. Specify an empty string to match a key that is unset or set to an empty string.',
  )

export const custom_metadata = z
  .record(z.string(), z.union([z.string(), z.boolean()]))
  .describe(
    'Set of key:value pairs. Adding custom metadata to a resource, such as a [Connect Webview](https://docs.seam.co/core-concepts/connect-webviews/attaching-custom-data-to-the-connect-webview), [connected account](https://docs.seam.co/core-concepts/connected-accounts/adding-custom-metadata-to-a-connected-account), or [device](https://docs.seam.co/core-concepts/devices/adding-custom-metadata-to-a-device), enables you to store custom information, like customer details or internal IDs from your application. Keys set to `null` or to an empty string are omitted.',
  )

export type CustomMetadata = z.output<typeof custom_metadata>

export type CustomMetadataInput = z.input<typeof custom_metadata_input>
