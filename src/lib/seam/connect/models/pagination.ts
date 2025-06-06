import { z } from 'zod'

export const pagination = z
  .object({
    next_page_cursor: z
      .string()
      .base64()
      .nullable()
      .describe(
        'Opaque value that can be used to select the next page of results via the `page_cursor` parameter.',
      ),
    has_next_page: z
      .boolean()
      .describe(
        'Indicates whether there is another page of results after this one.',
      ),
    next_page_url: z
      .string()
      .url()
      .nullable()
      .describe('URL to get the next page of results.'),
  })
  .describe('Information about the current page of results.')

export type Pagination = z.infer<typeof pagination>
