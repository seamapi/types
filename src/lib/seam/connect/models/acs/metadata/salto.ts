import { z } from 'zod'

export const acs_entrance_salto_ks_metadata = z
  .object({
    door_name: z
      .string()
      .optional()
      .describe('Name of the door in the Salto KS access system.'),
    locked_state: z
      .string()
      .optional()
      .describe('Locked state of the door in the Salto KS access system.'),
    lock_type: z
      .string()
      .optional()
      .describe('Type of the lock in the Salto KS access system.'),
    online: z
      .boolean()
      .optional()
      .describe('Indicates whether the door access device is online.'),
    battery_level: z
      .string()
      .optional()
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
  .partial()
  .describe('Salto KS-specific metadata associated with the entrance.')

export type AcsEntranceSaltoKSMetadata = z.infer<
  typeof acs_entrance_salto_ks_metadata
>

export const acs_user_salto_ks_metadata = z
  .object({
    is_subscribed: z
      .boolean()
      .optional()
      .describe(
        "Indicates whether the user holds an active subscription slot on the Salto KS site. Only subscribed users can unlock doors and count against the site's user-subscription limit. A user may not be subscribed because their access schedule has not started or has ended, the site has reached its subscription limit, or they were manually unsubscribed. This is distinct from `is_suspended`, which reflects whether the user has been explicitly blocked.",
      ),
  })
  .partial()
  .describe(
    'Salto KS-specific metadata associated with the access system user.',
  )

export type AcsUserSaltoKSMetadata = z.infer<typeof acs_user_salto_ks_metadata>
