import * as z from 'zod/v3'

import { datetime } from '../datetime.js'

export const media = z.object({
  media_id: z.string().uuid().describe('ID of the media.'),
  workspace_id: z
    .string()
    .uuid()
    .describe('ID of the workspace that contains the media.'),
  device_id: z
    .string()
    .uuid()
    .nullable()
    .describe('ID of the device that captured the media.'),
  event_id: z
    .string()
    .uuid()
    .nullable()
    .describe('ID of the event that the media belongs to.'),
  media_type: z
    .enum(['video', 'image'])
    .describe('Type of the media: a video clip or a still image.'),
  content_type: z
    .string()
    .nullable()
    .describe('MIME type of the media, such as `video/mp4` or `image/jpeg`.'),
  status: z
    .enum(['pending', 'available', 'unavailable', 'failed'])
    .describe(
      'Status of the media. `pending` means that Seam is still retrieving the media. `available` means that `url` can be used to download it. `unavailable` means that no media exists for the event, and `failed` means that Seam could not retrieve it.',
    ),
  url: z
    .string()
    .url()
    .nullable()
    .describe(
      'Short-lived URL from which you can download the media. Null unless `status` is `available`. The URL expires after about five minutes. Call `/media/get` again for a new URL.',
    ),
  expires_at: datetime
    .nullable()
    .describe(
      'Date and time at which the media stops being available. Null when Seam does not know when the media expires.',
    ),
  created_at: datetime.describe(
    'Date and time at which the media was created.',
  ),
}).describe(`
  ---
  route_path: /media
  ---
  Represents a piece of media, such as a video clip or a thumbnail image, that a device captured for an event. Media is in beta.
`)

export type Media = z.infer<typeof media>
