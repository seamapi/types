import { z } from 'zod'

export const acs_entrance_brivo_metadata = z
  .object({
    access_point_id: z
      .string()
      .optional()
      .describe('ID of the access point in the Brivo access system.'),
    site_id: z
      .number()
      .optional()
      .describe('ID of the site that the access point belongs to.'),
    site_name: z
      .string()
      .optional()
      .describe('Name of the site that the access point belongs to.'),
  })
  .partial()
  .describe('Brivo-specific metadata associated with the entrance.')

export type AcsEntranceBrivoMetadata = z.infer<
  typeof acs_entrance_brivo_metadata
>
