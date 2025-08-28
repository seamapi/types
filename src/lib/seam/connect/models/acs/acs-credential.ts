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
  'latch_access',
  'dormakaba_ambiance_credential',
  'hotek_card',
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
  .describe(
    'Indicates that the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) is waiting to be issued.',
  )

const schedule_externally_modified = common_acs_credential_warning
  .extend({
    warning_code: z
      .literal('schedule_externally_modified')
      .describe(warning_code_description),
  })
  .describe(
    "Indicates that the schedule of one of the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials)'s children was modified externally.",
  )

const schedule_modified = common_acs_credential_warning
  .extend({
    warning_code: z
      .literal('schedule_modified')
      .describe(warning_code_description),
  })
  .describe(
    'Indicates that the schedule of the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) was modified to avoid creating a credential with a start date in the past.',
  )

const being_deleted = common_acs_credential_warning
  .extend({
    warning_code: z.literal('being_deleted').describe(warning_code_description),
  })
  .describe(
    'Indicates that the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) is being deleted.',
  )

export const unknown_issue_with_acs_credential = common_acs_credential_warning
  .extend({
    warning_code: z
      .literal('unknown_issue_with_acs_credential')
      .describe(warning_code_description),
  })
  .describe(
    'An unknown issue occurred while syncing the state of the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) with the provider. This issue may affect the proper functioning of the credential.',
  )

const needs_to_be_reissued = common_acs_credential_warning
  .extend({
    warning_code: z
      .literal('needs_to_be_reissued')
      .describe(warning_code_description),
  })
  .describe(
    'Access permissions for the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) have changed. [Reissue](https://docs.seam.co/latest/capability-guides/access-systems/working-with-card-encoders-and-scanners/creating-and-encoding-card-based-credentials) (re-encode) the credential. This issue may affect the proper functioning of the credential.',
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
  .describe(
    'Warning associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
  )

const _acs_credential_warning_map = z.object({
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

export type AcsCredentialWarningMap = z.infer<
  typeof _acs_credential_warning_map
>

const common_acs_credential = z.object({
  acs_credential_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
  acs_user_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) to whom the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) belongs.',
    ),
  user_identity_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the [user identity](https://docs.seam.co/latest/api/user_identities) to whom the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) belongs.',
    ),
  connected_account_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [connected account](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials#connected-accounts) to which the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) belongs.',
    ),
  acs_credential_pool_id: z.string().uuid().optional(),
  acs_system_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [access control system](https://docs.seam.co/latest/capability-guides/access-systems) that contains the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
  parent_acs_credential_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the parent [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
  display_name: z
    .string()
    .min(1)
    .describe(
      'Display name that corresponds to the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) type.',
    ),
  code: z
    .string()
    .optional()
    .nullable()
    .describe(
      'Access (PIN) code for the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
  is_one_time_use: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) can only be used once. If `true`, the code becomes invalid after the first use.',
    ),
  card_number: z
    .string()
    .optional()
    .nullable()
    .describe(
      'Number of the card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
  is_issued: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) has been encoded onto a card.',
    ),
  issued_at: z
    .string()
    .datetime()
    .optional()
    .nullable()
    .describe(
      'Date and time at which the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) was encoded onto a card.',
    ),
  access_method: acs_credential_access_method_type.describe(
    'Access method for the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials). Supported values: `code`, `card`, `mobile_key`.',
  ),
  external_type: acs_credential_external_type
    .optional()
    .describe(
      'Brand-specific terminology for the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) type. Supported values: `pti_card`, `brivo_credential`, `hid_credential`, `visionline_card`.',
    ),
  external_type_display_name: z
    .string()
    .optional()
    .describe(
      'Display name that corresponds to the brand-specific terminology for the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) type.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe(
      'Date and time at which the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) was created.',
    ),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
  starts_at: z
    .string()
    .optional()
    .describe(
      'Date and time at which the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) validity starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
    ),
  ends_at: z
    .string()
    .optional()
    .describe(
      'Date and time at which the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) validity ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
    ),
  errors: z
    .array(
      z.object({
        error_code: z.string(),
        message: z.string(),
      }),
    )
    .describe(
      'Errors associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
  warnings: z
    .array(acs_credential_warning)
    .describe(
      'Warnings associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
  is_multi_phone_sync_credential: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) is a [multi-phone sync credential](https://docs.seam.co/latest/capability-guides/mobile-access/issuing-mobile-credentials-from-an-access-control-system#what-are-multi-phone-sync-credentials).',
    ),
  is_latest_desired_state_synced_with_provider: z
    .boolean()
    .nullable()
    .optional()
    .describe(
      'Indicates whether the latest state of the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) has been synced from Seam to the provider.',
    ),
  latest_desired_state_synced_with_provider_at: z
    .string()
    .datetime()
    .nullable()
    .optional()
    .describe(
      'Date and time at which the state of the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) was most recently synced from Seam to the provider.',
    ),
  visionline_metadata: acs_credential_visionline_metadata
    .optional()
    .describe(
      'Visionline-specific metadata for the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
  assa_abloy_vostio_metadata: acs_credential_vostio_metadata
    .optional()
    .describe(
      'Vostio-specific metadata for the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
})

export const acs_credential = common_acs_credential.merge(
  z.object({
    is_managed: z.literal(true),
  }),
).describe(`
  ---
  route_path: /acs/credentials
  ---
  Means by which an [access control system user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) gains access at an [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details). The \`acs_credential\` object represents a [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) that provides an ACS user access within an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).

  An access control system generally uses digital means of access to authorize a user trying to get through a specific entrance. Examples of credentials include plastic key cards, mobile keys, biometric identifiers, and PIN codes. The electronic nature of these credentials, as well as the fact that access is centralized, enables both the rapid provisioning and rescinding of access and the ability to compile access audit logs.

  For each \`acs_credential\`, you define the access method. You can also specify additional properties, such as a PIN code, depending on the credential type.
`)

export const unmanaged_acs_credential = common_acs_credential.merge(
  z.object({
    is_managed: z.literal(false),
  }),
).describe(`
  ---
  route_path: /acs/credentials/unmanaged
  undocumented: Unreleased.
  ---
  Means by which an [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) gains access at an [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details). The \`unmanaged_acs_credential\` object, which is not managed by Seam, represents a [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) that provides an ACS user access within an [access control system](https://docs.seam.co/latest/capability-guides/access-systems). For each \`acs_credential\` object, you define the access method. You can also specify additional properties, such as a PIN code.
`)

export const acs_credential_on_encoder = z.object({
  created_at: z
    .string()
    .datetime()
    .nullable()
    .describe(
      'Date and time at which the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) was created.',
    ),

  is_issued: z.boolean().nullable(),

  starts_at: z
    .string()
    .datetime()
    .nullable()
    .describe(
      'Date and time at which the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) becomes usable.',
    ),
  ends_at: z
    .string()
    .datetime()
    .nullable()
    .describe(
      'Date and time at which the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) will stop being usable.',
    ),

  card_number: z
    .string()
    .nullable()
    .describe(
      'A number or string that physically identifies the card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),

  visionline_metadata: z
    .object({
      card_id: z
        .string()
        .describe(
          'Card ID for the Visionline card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        ),
      // TODO card_function_type: z.enum(["guest", "staff"]), // computed, looks at door ops, and checks is guest op is present.

      cancelled: z
        .boolean()
        .describe(
          'Indicates whether the card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) is cancelled.',
        ),
      discarded: z
        .boolean()
        .describe(
          'Indicates whether the card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) is discarded.',
        ),
      expired: z
        .boolean()
        .describe(
          'Indicates whether the card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) is expired.',
        ),
      overwritten: z
        .boolean()
        .describe(
          'Indicates whether the card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) is overwritten.',
        ),
      overridden: z
        .boolean()
        .optional()
        .describe(
          'Indicates whether the card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) is overridden.',
        ),
      pending_auto_update: z
        .boolean()
        .describe(
          'Indicates whether the card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) is pending auto-update.',
        ),

      card_format: z
        .enum(['TLCode', 'rfid48'])
        .describe(
          'Format of the card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        ),
      card_holder: z
        .string()
        .optional()
        .describe(
          'Holder of the card associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        ),

      number_of_issued_cards: z
        .number()
        .describe(
          'Number of issued cards associated with the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        ),

      guest_acs_entrance_ids: z
        .array(z.string().uuid())
        .optional()
        .describe(
          'IDs of the guest [entrances](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details) for the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        ),
      common_acs_entrance_ids: z
        .array(z.string().uuid())
        .optional()
        .describe(
          'IDs of the common [entrances](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details) for the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        ),
    })
    .optional()
    .describe(
      'Visionline-specific metadata for the [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
    ),
})

export type AcsCredential = z.output<typeof acs_credential>
export type UnmanagedAcsCredential = z.output<typeof unmanaged_acs_credential>
export type AcsCredentialOnEncoder = z.output<typeof acs_credential_on_encoder>
