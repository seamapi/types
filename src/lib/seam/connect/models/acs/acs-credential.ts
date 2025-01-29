import { z } from 'zod'

import {
  acs_credential_visionline_metadata,
  acs_credential_vostio_metadata,
} from './metadata/index.js'

// If changed, update seam.acs_credential.external_type generated column
export const acs_credential_external_type = z.enum([
  'pti_card',
  'brivo_credential',
  'hid_credential',
  'visionline_card',
  'salto_ks_credential',
  'assa_abloy_vostio_key',
  'salto_space_key',
])

export const acs_credential_access_method_type = z.enum([
  'code',
  'card',
  'mobile_key',
])

export type AcsCredentialExternalType = z.infer<
  typeof acs_credential_external_type
>

const common_acs_credential_warning = z.object({
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which Seam created the warning.'),
  message: z
    .string()
    .describe(
      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
    ),
})

const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const waiting_to_be_issued = common_acs_credential_warning
  .extend({
    warning_code: z
      .literal('waiting_to_be_issued')
      .describe(warning_code_description),
  })
  .describe('Indicates that the credential is waiting to be issued.')

const schedule_externally_modified = common_acs_credential_warning
  .extend({
    warning_code: z
      .literal('schedule_externally_modified')
      .describe(warning_code_description),
  })
  .describe(
    "Indicates that the schedule of one of the credential's children was modified externally.",
  )

const schedule_modified = common_acs_credential_warning
  .extend({
    warning_code: z
      .literal('schedule_modified')
      .describe(warning_code_description),
  })
  .describe(
    'Indicates that the schedule of this credential was modified to avoid creating a credential with a start date in the past.',
  )

const being_deleted = common_acs_credential_warning
  .extend({
    warning_code: z.literal('being_deleted').describe(warning_code_description),
  })
  .describe('Indicates that this credential is being deleted.')

export const unknown_issue_with_acs_credential = common_acs_credential_warning
  .extend({
    warning_code: z
      .literal('unknown_issue_with_acs_credential')
      .describe(warning_code_description),
  })
  .describe(
    'An unknown issue occurred while syncing the state of this credential with the provider. ' +
      'This issue may affect the proper functioning of this credential.',
  )

const needs_to_be_reissued = common_acs_credential_warning
  .extend({
    warning_code: z
      .literal('needs_to_be_reissued')
      .describe(warning_code_description),
  })
  .describe(
    'Access permissions for this [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) have changed. [Reissue](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners/creating-and-encoding-card-based-credentials) (re-encode) this credential. This issue may affect the proper functioning of the credential.',
  )

const acs_credential_warning = z
  .discriminatedUnion('warning_code', [
    waiting_to_be_issued,
    schedule_externally_modified,
    schedule_modified,
    being_deleted,
    unknown_issue_with_acs_credential,
    needs_to_be_reissued,
  ])
  .describe('Warning associated with the `acs_credential`.')

const acs_credential_warning_map = z.object({
  waiting_to_be_issued: waiting_to_be_issued.optional().nullable(),
  schedule_externally_modified: schedule_externally_modified
    .optional()
    .nullable(),
  schedule_modified: schedule_modified.optional().nullable(),
  being_deleted: being_deleted.optional().nullable(),
  unknown_issue_with_acs_credential: unknown_issue_with_acs_credential
    .optional()
    .nullable(),
  needs_to_be_reissued: needs_to_be_reissued.optional().nullable(),
})

export type AcsCredentialWarningMap = z.infer<typeof acs_credential_warning_map>

const common_acs_credential = z.object({
  acs_credential_id: z.string().uuid().describe('ID of the credential.'),
  acs_user_id: z
    .string()
    .uuid()
    .optional()
    .describe('ID of the ACS user to whom the credential belongs.'),
  acs_credential_pool_id: z.string().uuid().optional(),
  acs_system_id: z
    .string()
    .uuid()
    .describe('ID of the access control system that contains the credential.'),
  parent_acs_credential_id: z
    .string()
    .uuid()
    .optional()
    .describe('ID of the parent credential.'),
  display_name: z
    .string()
    .min(1)
    .describe('Display name that corresponds to the credential type.'),
  code: z
    .string()
    .optional()
    .nullable()
    .describe('Access (PIN) code for the credential.'),
  is_one_time_use: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the credential can only be used once. If "true," the code becomes invalid after the first use.',
    ),
  card_number: z.string().optional().nullable(),
  is_issued: z.boolean().optional(),
  issued_at: z.string().datetime().optional().nullable(),
  access_method: acs_credential_access_method_type.describe(
    'Access method for the credential. Supported values: `code`, `card`, `mobile_key`.',
  ),
  external_type: acs_credential_external_type
    .optional()
    .describe(
      'Brand-specific terminology for the credential type. Supported values: `pti_card`, `brivo_credential`, `hid_credential`, `visionline_card`.',
    ),
  external_type_display_name: z
    .string()
    .optional()
    .describe(
      'Display name that corresponds to the brand-specific terminology for the credential type.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the credential was created.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the credential.',
    ),
  starts_at: z
    .string()
    .optional()
    .describe(
      'Date and time at which the credential validity starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
    ),
  ends_at: z
    .string()
    .optional()
    .describe(
      'Date and time at which the credential validity ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
    ),
  errors: z
    .array(
      z.object({
        error_code: z.string(),
        message: z.string(),
      }),
    )
    .describe('Errors associated with the `acs_credential`.'),
  warnings: z
    .array(acs_credential_warning)
    .describe('Warnings associated with the `acs_credential`.'),
  is_multi_phone_sync_credential: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the credential is a [multi-phone sync credential](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#what-are-multi-phone-sync-credentials).',
    ),
  is_latest_desired_state_synced_with_provider: z
    .boolean()
    .nullable()
    .optional()
    .describe(
      'Indicates whether the latest state of the credential has been synced from Seam to the provider.',
    ),
  latest_desired_state_synced_with_provider_at: z
    .string()
    .datetime()
    .nullable()
    .optional()
    .describe(
      'Date and time at which the state of the credential was most recently synced from Seam to the provider.',
    ),
  visionline_metadata: acs_credential_visionline_metadata
    .optional()
    .describe('Visionline-specific metadata for the credential.'),
  assa_abloy_vostio_metadata: acs_credential_vostio_metadata
    .optional()
    .describe('Vostio-specific metadata for the credential.'),
})

export const acs_credential = common_acs_credential.merge(
  z.object({
    is_managed: z.literal(true),
  }),
).describe(`
  ---
  route_path: /acs/credentials
  ---
  Means by which a user gains access at an entrance. The \`acs_credential\` object represents a credential that provides an ACS user access within an access control system. For each acs_credential object, you define the access method. You can also specify additional properties, such as a code.
`)

export const unmanaged_acs_credential = common_acs_credential.merge(
  z.object({
    is_managed: z.literal(false),
  }),
).describe(`
  ---
  route_path: /acs/credentials/unmanaged
  ---
  Means by which a user gains access at an entrance. The \`unmanaged_acs_credential\` object, which is not managed by Seam, represents a credential that provides an ACS user access within an access control system. For each acs_credential object, you define the access method. You can also specify additional properties, such as a code.
`)

export const acs_credential_on_encoder = z.object({
  created_at: z
    .string()
    .datetime()
    .nullable()
    .describe('Date and time the credential was created.'),

  is_issued: z.boolean().nullable(),

  starts_at: z
    .string()
    .datetime()
    .nullable()
    .describe('Date and time the credential will become useable.'),
  ends_at: z
    .string()
    .datetime()
    .nullable()
    .describe('Date and time the credential will stop being useable.'),

  card_number: z
    .string()
    .nullable()
    .describe('A number or string that physically identifies this card.'),

  visionline_metadata: z
    .object({
      card_id: z.string(),
      // TODO card_function_type: z.enum(["guest", "staff"]), // computed, looks at door ops, and checks is guest op is present.

      cancelled: z.boolean(),
      discarded: z.boolean(),
      expired: z.boolean(),
      overwritten: z.boolean(),
      overridden: z.boolean().optional(),
      pending_auto_update: z.boolean(),

      card_format: z.enum(['TLCode', 'rfid48']),
      card_holder: z.string().optional(),

      number_of_issued_cards: z.number(),

      guest_acs_entrance_ids: z.array(z.string().uuid()).optional(),
      common_acs_entrance_ids: z.array(z.string().uuid()).optional(),
    })
    .optional()
    .describe('Visionline-specific metadata for the credential.'),
})

export type AcsCredential = z.output<typeof acs_credential>
export type UnmanagedAcsCredential = z.output<typeof unmanaged_acs_credential>
export type AcsCredentialOnEncoder = z.output<typeof acs_credential_on_encoder>
