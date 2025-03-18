import { z } from 'zod'

export const geolocation = z.object({
  latitude: z.number(),
  longitude: z.number(),
})

export const location = z.object({
  location_id: z
    .string()
    .uuid()
    .describe('Unique identifier for the location.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'Unique identifier for the Seam workspace associated with the location.',
    ),
  name: z.string().describe('Name of the location.'),
  display_name: z.string().describe('Display name of the location.'),
  geolocation: geolocation
    .optional()
    .describe('Geographical location of the location.'),
  time_zone: z.string().optional().describe('Time zone of the location.'),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the location object was created.'),
})

export type Location = z.infer<typeof location>
