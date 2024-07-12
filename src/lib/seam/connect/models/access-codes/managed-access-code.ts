import { z } from 'zod'

import { connected_account_error } from '../connected-accounts/index.js'
import { device_error } from '../devices/index.js'

const common_access_code_error = z.object({
  message: z.string(),
  is_access_code_error: z.literal(true),
})

const common_access_code_warning = z.object({
  message: z.string(),
})

const access_code_error = common_access_code_error.extend({
  error_code: z.string(),
})

export type AccessCodeError = z.infer<typeof access_code_error>

const access_code_warning = common_access_code_warning.extend({
  warning_code: z.string(),
})

export type AccessCodeWarning = z.infer<typeof access_code_warning>

export const access_code = z.object({
  common_code_key: z
    .string()
    .nullable()
    .describe(
      'Unique identifier for a group of access codes that share the same code.',
    ),
  is_scheduled_on_device: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the code is set on the device according to a preconfigured schedule.',
    ),
  type: z
    .enum(['time_bound', 'ongoing'])
    .describe(
      'Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration.',
    ),
  is_waiting_for_code_assignment: z
    .boolean()
    .optional()
    .describe(
      'Indicates whether the access code is waiting for a code assignment.',
    ),
  access_code_id: z
    .string()
    .uuid()
    .describe('Unique identifier for the access code.'),
  device_id: z
    .string()
    .uuid()
    .describe(
      'Unique identifier for the device associated with the access code.',
    ),
  name: z
    .string()
    .nullable()
    .describe(
      'Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes.',
    ),
  code: z
    .string()
    .nullable()
    .describe(
      'Code used for access. Typically, a numeric or alphanumeric string.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the access code was created.'),
  errors: z
    .array(z.union([access_code_error, device_error, connected_account_error]))
    .describe(
      'Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues.',
    ),
  warnings: z
    .array(access_code_warning)
    .describe(
      'Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention.',
    ),
  is_managed: z
    .literal(true)
    .describe('Indicates whether Seam manages the access code.'),
  starts_at: z
    .string()
    .datetime()
    .nullable()
    .optional()
    .describe(
      'Date and time at which the time-bound access code becomes active.',
    ),
  ends_at: z
    .string()
    .datetime()
    .nullable()
    .optional()
    .describe(
      'Date and time after which the time-bound access code becomes inactive.',
    ),
  status: z.enum(['setting', 'set', 'unset', 'removing', 'unknown']).describe(`
    Current status of the access code within the operational lifecycle. Values are "setting," a transitional phase that indicates that the code is being configured or activated; "set", which indicates that the code is active and operational; "unset," which indicates a deactivated or unused state, either before activation or after deliberate deactivation; "removing," which indicates a transitional period in which the code is being deleted or made inactive; and "unknown," which indicates an indeterminate state, due to reasons such as system errors or incomplete data, that highlights a potential need for system review or troubleshooting.
  `),
  is_backup_access_code_available: z
    .boolean()
    .describe(
      'Indicates whether a backup access code is available for use if the primary access code is lost or compromised.',
    ),
  is_backup: z
    .boolean()
    .optional()
    .describe('Indicates whether the access code is a backup code.'),
  pulled_backup_access_code_id: z
    .string()
    .uuid()
    .nullable()
    .optional()
    .describe(
      'Identifier of the pulled backup access code. Used to associate the pulled backup access code with the original access code.',
    ),
  is_external_modification_allowed: z
    .boolean()
    .describe(
      'Indicates whether changes to the access code from external sources are permitted.',
    ),
  is_one_time_use: z
    .boolean()
    .describe(
      'Indicates whether the access code can only be used once. If "true," the code becomes invalid after the first use.',
    ),
  is_offline_access_code: z
    .boolean()
    .describe(
      'Indicates whether the access code is intended for use in offline scenarios. If "true," this code can be created on a device without a network connection.',
    ),
})

export type AccessCode = z.infer<typeof access_code>
