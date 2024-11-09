import { z } from 'zod'

export const acs_entrance_assa_abloy_vostio_metadata = z.object({
  door_type: z.enum(['CommonDoor', 'EntranceDoor', 'GuestDoor', 'Elevator']),
  door_name: z.string(),
  door_number: z.number().optional(),
  stand_open: z.boolean().optional(),
  pms_id: z.string().optional(),
})

export type AcsEntranceAssaAbloyVostioMetadata = z.infer<
  typeof acs_entrance_assa_abloy_vostio_metadata
>
