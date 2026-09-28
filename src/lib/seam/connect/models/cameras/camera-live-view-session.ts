import * as z from 'zod/v3'

import { datetime } from '../datetime.js'

export const camera_live_view_session = z.object({
  camera_live_view_session_id: z
    .string()
    .uuid()
    .describe('ID of the camera live view session.'),
  device_id: z.string().uuid().describe('ID of the camera.'),
  token: z
    .string()
    .min(1)
    .max(512)
    .describe(
      'Token that authorizes the offer and stop requests for this session.',
    ),
  expires_at: datetime.describe(
    'Date and time at which the live view session expires.',
  ),
}).describe(`
  ---
  route_path: /cameras/live_views
  ---
  Represents a short-lived live view session for a single camera. Use the session ID and token to start a WebRTC stream and to stop the session.
`)

export type CameraLiveViewSession = z.infer<typeof camera_live_view_session>
