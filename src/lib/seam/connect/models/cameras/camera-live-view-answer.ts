import * as z from 'zod/v3'

export const camera_live_view_answer = z.object({
  sdp_answer: z
    .string()
    .describe(
      'WebRTC SDP answer for the offer, limited to 64 KiB of UTF-8 data.',
    ),
}).describe(`
  ---
  route_path: /cameras/live_views
  ---
  Represents the WebRTC SDP answer that starts streaming video from a camera for a live view session.
`)

export type CameraLiveViewAnswer = z.infer<typeof camera_live_view_answer>
