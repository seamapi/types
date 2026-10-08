import * as z from 'zod/v3'

export const speaker_playback_state = z
  .enum(['playing', 'paused', 'idle', 'buffering', 'unknown'])
  .describe('Playback state of the speaker.')

export type SpeakerPlaybackState = z.infer<typeof speaker_playback_state>

export const speaker_capability_properties = z.object({
  speaker: z
    .object({
      volume: z
        .number()
        .describe(
          "Current volume of the speaker, on the speaker's native volume scale from `min_volume` to `max_volume`. This is the native volume setting, not a decibel level.",
        ),
      is_muted: z.boolean().describe('Indicates whether the speaker is muted.'),
      has_fixed_volume: z
        .boolean()
        .describe(
          "Indicates whether the speaker's volume is fixed, for example, because the speaker's line-out level is controlled by an external amplifier. A speaker with a fixed volume cannot have its volume set through Seam.",
        ),
      min_volume: z
        .number()
        .describe('Minimum volume that you can set on the speaker.'),
      max_volume: z
        .number()
        .describe(
          "Maximum volume that you can set on the speaker. This is the ceiling of the speaker's native volume scale, not a limit configured for guests.",
        ),
      volume_step: z
        .number()
        .describe(
          'Increment between the volume values that you can set on the speaker.',
        ),
      playback_state: speaker_playback_state,
      now_playing: z
        .object({
          title: z
            .string()
            .optional()
            .describe('Title of the content that is currently playing.'),
          artist: z
            .string()
            .optional()
            .describe('Artist of the content that is currently playing.'),
          album: z
            .string()
            .optional()
            .describe('Album of the content that is currently playing.'),
        })
        .optional()
        .describe('Content that is currently playing on the speaker.'),
      grouped_with_device_ids: z
        .array(z.string().uuid())
        .describe(
          'IDs of the other speakers that are currently grouped with this speaker. Pausing or resuming playback on a speaker also affects the speakers in its group.',
        ),
      supports_chime: z
        .boolean()
        .describe('Indicates whether the speaker can play a chime.'),
      volume_reported_at: z
        .string()
        .datetime()
        .optional()
        .describe(
          'Date and time at which the speaker last reported its volume.',
        ),
    })
    .optional().describe(`
          ---
          property_group_key: speakers
          ---
          Audio state and capabilities of the speaker.
          `),
})
