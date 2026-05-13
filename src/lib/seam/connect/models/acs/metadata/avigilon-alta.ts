import { z } from 'zod'

export const acs_entrance_avigilon_alta_metadata = z
  .object({
    entry_name: z.string().describe('Entry name for an Avigilon Alta system.'),
    org_name: z
      .string()
      .describe('Organization name for an Avigilon Alta system.'),
    zone_id: z.number().describe('Zone ID for an Avigilon Alta system.'),
    zone_name: z.string().describe('Zone name for an Avigilon Alta system.'),
    site_id: z.number().describe('Site ID for an Avigilon Alta system.'),
    site_name: z.string().describe('Site name for an Avigilon Alta system.'),
    entry_relays_total_count: z
      .number()
      .describe('Total count of entry relays for an Avigilon Alta system.'),
  })
  .describe('Avigilon Alta-specific metadata associated with the entrance.')

export type AcsEntranceAvigilonAltaMetadata = z.infer<
  typeof acs_entrance_avigilon_alta_metadata
>
