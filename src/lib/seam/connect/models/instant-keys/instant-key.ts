import { z } from 'zod'

export const instant_key = z.object({
  instant_key_id: z.string().uuid().describe('ID of the Instant Key.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the Instant Key.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the Instant Key was created.'),
  instant_key_url: z
    .string()
    .url()
    .describe(
      'Shareable URL for the Instant Key. Use the URL to deliver the Instant Key to your user through a link in a text message or email or by embedding it in your web app.',
    ),
  client_session_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [client session](https://docs.seam.co/latest/core-concepts/authentication/client-session-tokens) associated with the Instant Key.',
    ),
  user_identity_id: z
    .string()
    .uuid()
    .describe('ID of the user identity associated with the Instant Key.'),
  expires_at: z
    .string()
    .datetime()
    .describe('Date and time at which the Instant Key expires.'),
  customization_profile_id: z
    .string()
    .uuid()
    .optional()
    .describe(
      'ID of the customization profile associated with the Instant Key.',
    ),
  customization: z
    .object({
      primary_color: z
        .string()
        .optional()
        .describe('Primary color used in the Instant Key UI.'),
      secondary_color: z
        .string()
        .optional()
        .describe('Secondary color used in the Instant Key UI.'),
      logo_url: z
        .string()
        .url()
        .optional()
        .describe('URL of the logo displayed on the Instant Key.'),
    })
    .optional()
    .describe('Customization applied to the Instant Key UI.'),
}).describe(`
  ---
  route_path: /instant_keys
  ---
  Represents a Seam Instant Key. For issuing Bluetooth mobile keys, Instant Keys are the fastest way to share access. With a single API call, you can create a mobile key and send it through text or email or embed it in your own app.

  There’s no app to install, nor account to create. Your user just taps a link and gets a lightweight, native-feeling experience using iOS App Clip or Instant Apps on Android. Further, Instant Keys work offline, so even in areas with poor cellular or Wi-Fi, like elevator banks or concrete-walled hallways, the Instant Keys still work.
`)

export type InstantKey = z.infer<typeof instant_key>
