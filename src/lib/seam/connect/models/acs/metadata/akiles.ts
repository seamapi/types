import { z } from 'zod'

export const acs_entrance_akiles_metadata = z
  .object({
    gadget_id: z.string().optional().describe('ID of the Akiles gadget.'),
    site_id: z
      .string()
      .optional()
      .describe('ID of the Akiles site the gadget belongs to.'),
    site_name: z
      .string()
      .optional()
      .describe('Name of the Akiles site the gadget belongs to.'),
    actions: z
      .array(
        z
          .object({
            id: z.string().optional().describe('ID of the gadget action.'),
            name: z.string().optional().describe('Name of the gadget action.'),
          })
          .partial(),
      )
      .optional()
      .describe('Actions the gadget exposes (for example, open).'),
  })
  .partial()
  .describe('Akiles-specific metadata for the entrance.')

export type AcsEntranceAkilesMetadata = z.infer<
  typeof acs_entrance_akiles_metadata
>
