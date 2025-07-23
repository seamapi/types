import { z } from 'zod'

const common_acs_encoder_error = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the error.'),
  message: z
    .string()
    .describe(
      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
    ),
})

const error_code_description =
  'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.'

const acs_encoder_removed = common_acs_encoder_error.extend({
  error_code: z.literal('acs_encoder_removed').describe(error_code_description),
})

const acs_encoder_error =
  // z.union([
  acs_encoder_removed
    // ])
    .describe(
      'Error associated with the [encoder](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners).',
    )

const _acs_encoder_error_map = z.object({
  acs_encoder_removed: acs_encoder_removed.optional().nullable(),
})

export type AcsEncoderErrorMap = z.infer<typeof _acs_encoder_error_map>

export const acs_encoder = z.object({
  acs_encoder_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [encoder](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners.',
    ),
  acs_system_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) that contains the [encoder](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners).',
    ),
  connected_account_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) that contains the [encoder](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners).',
    ),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the [encoder](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners).',
    ),
  errors: z
    .array(acs_encoder_error)
    .describe(
      'Errors associated with the [encoder](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners).',
    ),
  created_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the [encoder](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners) was created.',
    ),
  display_name: z
    .string()
    .describe(
      'Display name for the [encoder](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners).',
    ),
}).describe(`
  ---
  route_path: /acs/encoders
  ---
  Represents a hardware device that encodes [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) data onto physical cards within an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).

  Some access control systems require credentials to be encoded onto plastic key cards using a card encoder. This process involves the following two key steps:

  1. Credential creation
     Configure the access parameters for the credential.
  2. Card encoding
     Write the credential data onto the card using a compatible card encoder.

  Separately, the Seam API also supports card scanning, which enables you to scan and read the encoded data on a card. You can use this action to confirm consistency with access control system records or diagnose discrepancies if needed.

   See [Working with Card Encoders and Scanners](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners).

  To verify if your access control system requires a card encoder, see the corresponding [system integration guide](https://docs.seam.co/latest/device-and-system-integration-guides/overview#access-control-systems).
`)

export type AcsEncoder = z.infer<typeof acs_encoder>
