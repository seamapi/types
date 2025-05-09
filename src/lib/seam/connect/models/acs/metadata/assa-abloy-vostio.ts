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

export const acs_credential_vostio_metadata = z.object({
  // auto_join does not exist in the Vostio API and is an abstraction made by Seam
  auto_join: z.boolean().optional(),
  override_guest_acs_entrance_ids: z.string().array().optional(),
  key_id: z.string().optional(),
  key_issuing_request_id: z.string().optional(),
  door_names: z.string().array().optional(),
  endpoint_id: z.string().optional(),
})

export type AcsCredentialVostioMetadata = z.infer<
  typeof acs_credential_vostio_metadata
>
