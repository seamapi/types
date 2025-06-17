import { z } from 'zod'

export const acs_entrance_assa_abloy_vostio_metadata = z
  .object({
    door_type: z
      .enum(['CommonDoor', 'EntranceDoor', 'GuestDoor', 'Elevator'])
      .describe('Type of the door in the Vostio access system.'),
    door_name: z
      .string()
      .describe('Name of the door in the Vostio access system.'),
    door_number: z
      .number()
      .optional()
      .describe('Number of the door in the Vostio access system.'),
    stand_open: z
      .boolean()
      .optional()
      .describe(
        'Indicates whether keys are allowed to set the door in stand open mode in the Vostio access system.',
      ),
    pms_id: z
      .string()
      .optional()
      .describe('PMS ID of the door in the Vostio access system.'),
  })
  .describe('ASSA ABLOY Vostio-specific metadata associated with the entrance.')

export type AcsEntranceAssaAbloyVostioMetadata = z.infer<
  typeof acs_entrance_assa_abloy_vostio_metadata
>

export const acs_credential_vostio_metadata = z
  .object({
    // auto_join does not exist in the Vostio API and is an abstraction made by Seam
    auto_join: z
      .boolean()
      .optional()
      .describe(
        'Indicates whether the credential should auto-join. For an auto-join credential, Seam automatically issues an override card if there are no other cards and a joiner card if there are existing cards on the doors.',
      ),
    override_guest_acs_entrance_ids: z
      .string()
      .array()
      .optional()
      .describe(
        'IDs of the guest entrances to override in the Vostio access system.',
      ),
    key_id: z
      .string()
      .optional()
      .describe('Key ID in the Vostio access system.'),
    key_issuing_request_id: z
      .string()
      .optional()
      .describe('Key issuing request ID in the Vostio access system.'),
    door_names: z
      .string()
      .array()
      .optional()
      .describe(
        'Names of the doors to which to grant access in the Vostio access system.',
      ),
    endpoint_id: z
      .string()
      .optional()
      .describe('Endpoint ID in the Vostio access system.'),
  })
  .describe(
    'ASSA ABLOY Vostio-specific metadata associated with the credential.',
  )

export type AcsCredentialVostioMetadata = z.infer<
  typeof acs_credential_vostio_metadata
>
