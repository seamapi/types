import { z } from 'zod'

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
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the space was created.'),
  device_count: z.number().describe('Number of devices in the space.'),
  acs_entrance_count: z.number().describe('Number of entrances in the space.'),
  customer_key: z
    .string()
    .optional()
    .describe('Customer key associated with the space.'),
  customer_data: space_customer_data.optional(),
  geolocation: space_geolocation
    .nullish()
    .describe('Geographic coordinates (latitude and longitude) of the space.'),
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
