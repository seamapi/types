import { z } from 'zod'

export const acs_entrance_salto_space_metadata = z
  .object({
    ext_door_id: z.string().describe(`
    ---
    deprecated: use door_id.
    ---
    `),
    door_id: z.string().describe('Door ID in the Salto Space access system.'),
    door_name: z
      .string()
      .describe('Name of the door in the Salto Space access system.'),
    door_description: z
      .string()
      .describe('Description of the door in the Salto Space access system.'),
    audit_on_keys: z
      .boolean()
      .describe(
        'Indicates whether AuditOnKeys is enabled for the door in the Salto Space access system.',
      ),
    room_name: z
      .string()
      .describe('Name of the room in the Salto Space access system.'),
    room_description: z
      .string()
      .describe('Description of the room in the Salto Space access system.'),
  })
  .partial()
  .describe('Salto Space-specific metadata associated with the entrance.')

export type AcsEntranceSaltoSpaceMetadata = z.infer<
  typeof acs_entrance_salto_space_metadata
>
