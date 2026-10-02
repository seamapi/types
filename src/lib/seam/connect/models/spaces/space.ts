import * as z from 'zod/v3'

import { datetime } from '../datetime.js'

const time_of_day_re = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/

export const space_customer_data = z
  .object({
    time_zone: z
      .string()
      .nullish()
      .describe('IANA time zone for the space, e.g. America/Los_Angeles.'),
    default_checkin_time: z
      .string()
      .regex(time_of_day_re)
      .nullish()
      .describe(
        'Default check-in time for reservations at the space, as HH:mm or HH:mm:ss.',
      ),
    default_checkout_time: z
      .string()
      .regex(time_of_day_re)
      .nullish()
      .describe(
        'Default check-out time for reservations at the space, as HH:mm or HH:mm:ss.',
      ),
    address: z.string().nullish().describe('Postal address for the space.'),
  })
  .describe('Reservation/stay-related defaults for the space.')

export const space_geolocation = z
  .object({
    latitude: z.number().describe('Latitude of the space, in decimal degrees.'),
    longitude: z
      .number()
      .describe('Longitude of the space, in decimal degrees.'),
  })
  .describe('Geographic coordinates of the space.')

const warning_code_description =
  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.'

const common_space_warning = z.object({
  created_at: datetime.describe(
    'Date and time at which Seam created the warning.',
  ),
  message: z
    .string()
    .describe(
      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
    ),
})

const space_being_deleted = common_space_warning
  .extend({
    warning_code: z.literal('being_deleted').describe(warning_code_description),
  })
  .describe(
    'Indicates that the space is being deleted. Seam removes it, revokes its access grants, and detaches its devices and entrances shortly.',
  )

const space_warning = z
  .discriminatedUnion('warning_code', [space_being_deleted])
  .describe('Warning associated with the space.')

const _space_warning_map = z.object({
  being_deleted: space_being_deleted.optional().nullable(),
})

export type SpaceWarningMap = z.infer<typeof _space_warning_map>

export const space = z.object({
  space_id: z.string().uuid().describe('ID of the space.'),
  workspace_id: z
    .string()
    .uuid()
    .describe('ID of the workspace associated with the space.'),
  space_key: z
    .string()
    .optional()
    .describe('Unique key for the space within the workspace.'),
  name: z.string().describe('Name of the space.'),
  display_name: z.string().describe('Display name for the space.'),
  created_at: datetime.describe(
    'Date and time at which the space was created.',
  ),
  device_count: z.number().describe('Number of devices in the space.'),
  acs_entrance_count: z.number().describe('Number of entrances in the space.'),
  customer_key: z
    .string()
    .optional()
    .describe('Customer key associated with the space.'),
  customer_data: space_customer_data
    .catchall(z.string().nullish())
    .describe(
      'Reservation/stay-related defaults for the space. Also carries the provider/PMS-supplied name under a `<connector_type>_name` key (e.g. `guesty_name`), which Seam preserves when you rename the space (read-only — managed by Seam).',
    )
    .optional(),
  geolocation: space_geolocation
    .nullish()
    .describe('Geographic coordinates (latitude and longitude) of the space.'),
  warnings: z
    .array(space_warning)
    .describe('Warnings associated with the space.'),
  parent_space_id: z.string().uuid().optional().describe(`
    ---
    undocumented: Only used internally.
    ---
    `),
  parent_space_key: z.string().optional().describe(`
    ---
    undocumented: Only used internally.
    ---
    `),
}).describe(`
  ---
  draft: Early access.
  route_path: /spaces
  ---
  Represents a space that is a logical grouping of devices and entrances. You can assign access to an entire space, thereby making granting access more efficient.
  `)

export type Space = z.infer<typeof space>
