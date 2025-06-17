import { z } from 'zod'

export const acs_entrance_salto_space_metadata = z
  .object({
    door_name: z
      .string()
      .describe('Name of the door in the Salto Space access system.'),
    ext_door_id: z
      .string()
      .describe('External door ID in the Salto Space access system.'),
    door_description: z
      .string()
      .optional()
      .describe('Description of the door in the Salto Space access system.'),
  })
  .describe('Salto Space-specific metadata associated with the entrance.')

export type AcsEntranceSaltoSpaceMetadata = z.infer<
  typeof acs_entrance_salto_space_metadata
>
