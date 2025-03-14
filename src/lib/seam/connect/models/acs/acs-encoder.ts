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

const acs_encoder_error_map = z.object({
  acs_encoder_removed: acs_encoder_removed.optional().nullable(),
})

export type AcsEncoderErrorMap = z.infer<typeof acs_encoder_error_map>

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
  Represents a hardware device that encodes [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) data onto physical cards within an [access control system](https://docs.seam.co/latest/capability-guides/access-systems). See also [Working with Card Encoders and Scanners](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners).
`)

export type AcsEncoder = z.infer<typeof acs_encoder>
