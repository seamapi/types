import { z } from 'zod'

export const acs_entrance_salto_ks_metadata = z
  .object({
    door_name: z
      .string()
      .describe('Name of the door in the Salto KS access system.'),
    locked_state: z
      .string()
      .describe('Locked state of the door in the Salto KS access system.'),
    lock_type: z
      .string()
      .describe('Type of the lock in the Salto KS access system.'),
    online: z
      .boolean()
      .optional()
      .describe('Indicates whether the door access device is online.'),
    battery_level: z
      .string()
      .describe('Battery level of the door access device.'),
    left_open_alarm: z
      .boolean()
      .optional()
      .describe('Indicates whether the door is left open.'),
    intrusion_alarm: z
      .boolean()
      .optional()
      .describe('Indicates whether an intrusion alarm is active on the door.'),
    privacy_mode: z
      .boolean()
      .optional()
      .describe('Indicates whether privacy mode is enabled for the lock.'),
  })
  .describe('Salto KS-specific metadata associated with the entrance.')

export type AcsEntranceSaltoKSMetadata = z.infer<
  typeof acs_entrance_salto_ks_metadata
>
