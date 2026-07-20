import { z } from 'zod'

export const acs_entrance_avigilon_alta_metadata = z
  .object({
    entry_name: z
      .string()
      .optional()
      .describe('Entry name for an Avigilon Alta system.'),
    org_name: z
      .string()
      .optional()
      .describe('Organization name for an Avigilon Alta system.'),
    zone_id: z
      .number()
      .optional()
      .describe('Zone ID for an Avigilon Alta system.'),
    zone_name: z
      .string()
      .optional()
      .describe('Zone name for an Avigilon Alta system.'),
    site_id: z
      .number()
      .optional()
      .describe('Site ID for an Avigilon Alta system.'),
    site_name: z
      .string()
      .optional()
      .describe('Site name for an Avigilon Alta system.'),
    entry_relays_total_count: z
      .number()
      .optional()
      .describe('Total count of entry relays for an Avigilon Alta system.'),
  })
  .partial()
  .describe('Avigilon Alta-specific metadata associated with the entrance.')

export type AcsEntranceAvigilonAltaMetadata = z.infer<
  typeof acs_entrance_avigilon_alta_metadata
>
