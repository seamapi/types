import { z } from 'zod'

export const acs_entrance_visionline_metadata = z.object({
  door_name: z.string(),
  door_category: z.enum([
    'entrance',
    'guest',
    'elevator reader',
    'common',
    'common (PMS)',
  ]),
  profiles: z
    .array(
      z.object({
        visionline_door_profile_id: z.string(),
        visionline_door_profile_type: z.enum(['BLE', 'commonDoor', 'touch']),
      }),
    )
    .optional(),
})

export const acs_credential_visionline_metadata = z.object({
  card_function_type: z.enum(['guest', 'staff']),
  joiner_acs_credential_ids: z.array(z.string().uuid()).optional(),
  guest_acs_entrance_ids: z.array(z.string().uuid()).optional(),
  common_acs_entrance_ids: z.array(z.string().uuid()).optional(),
  is_valid: z.boolean().optional(),
  auto_join: z.boolean().optional(),
  card_id: z.string().optional(),
  credential_id: z.string().optional(),
})

export type AcsCredentialVisionlineMetadata = z.infer<
  typeof acs_credential_visionline_metadata
>

export type AcsEntranceVisionlineMetadata = z.infer<
  typeof acs_entrance_visionline_metadata
>
