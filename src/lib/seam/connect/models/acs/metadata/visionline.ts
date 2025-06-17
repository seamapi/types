import { z } from 'zod'

export const acs_entrance_visionline_metadata = z
  .object({
    door_name: z
      .string()
      .describe('Name of the door in the Visionline access system.'),
    door_category: z
      .enum(['entrance', 'guest', 'elevator reader', 'common', 'common (PMS)'])
      .describe('Category of the door in the Visionline access system.'),
    profiles: z
      .array(
        z.object({
          visionline_door_profile_id: z
            .string()
            .describe('Door profile ID in the Visionline access system.'),
          visionline_door_profile_type: z
            .enum(['BLE', 'commonDoor', 'touch'])
            .describe('Door profile type in the Visionline access system.'),
        }),
      )
      .optional()
      .describe('Profile for the door in the Visionline access system.'),
  })
  .describe('Visionline-specific metadata associated with the entrance.')

export const acs_credential_visionline_metadata = z
  .object({
    card_function_type: z
      .enum(['guest', 'staff'])
      .describe('Card function type in the Visionline access system.'),
    joiner_acs_credential_ids: z
      .array(z.string().uuid())
      .optional()
      .describe('IDs of the credentials to which you want to join.'),
    guest_acs_entrance_ids: z
      .array(z.string().uuid())
      .optional()
      .describe('Guest entrance IDs in the Visionline access system.'),
    common_acs_entrance_ids: z
      .array(z.string().uuid())
      .optional()
      .describe('Common entrance IDs in the Visionline access system.'),
    is_valid: z
      .boolean()
      .optional()
      .describe('Indicates whether the credential is valid.'),
    auto_join: z
      .boolean()
      .optional()
      .describe(
        'Indicates whether the credential should auto-join. For an auto-join credential, Seam automatically issues an override card if there are no other cards and a joiner card if there are existing cards on the doors.',
      ),
    card_id: z
      .string()
      .optional()
      .describe('ID of the card in the Visionline access system.'),
    credential_id: z
      .string()
      .optional()
      .describe('ID of the credential in the Visionline access system.'),
  })
  .describe('Visionline-specific metadata associated with the credential.')

export type AcsCredentialVisionlineMetadata = z.infer<
  typeof acs_credential_visionline_metadata
>

export type AcsEntranceVisionlineMetadata = z.infer<
  typeof acs_entrance_visionline_metadata
>
