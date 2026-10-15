import * as z from 'zod/v3'

import { css_color, hex_color_code } from '../colors.js'
import { datetime } from '../datetime.js'

export const customer_portal_theme = z.object({
  primary_color: hex_color_code.optional(),
  primary_foreground_color: hex_color_code.optional(),
  secondary_color: hex_color_code.optional(),
  secondary_foreground_color: hex_color_code.optional(),
  font_family: z.string().optional(),
  mono_font_family: z.string().optional(),
})

const instant_key_theme_colors = z
  .object({
    background: css_color.optional().describe('App background.'),
    foreground: css_color.optional().describe('Default text color.'),
    card: css_color.optional().describe('Card background.'),
    card_foreground: css_color.optional().describe('Text color on cards.'),
    popover: css_color.optional().describe('Dialog and sheet background.'),
    popover_foreground: css_color
      .optional()
      .describe('Text color on dialogs and sheets.'),
    primary: css_color.optional().describe('Primary buttons and highlights.'),
    primary_foreground: css_color
      .optional()
      .describe('Text color on `primary`.'),
    secondary: css_color.optional().describe('Secondary buttons.'),
    secondary_foreground: css_color
      .optional()
      .describe('Text color on `secondary`.'),
    muted: css_color
      .optional()
      .describe('Subtle backgrounds, such as the unlock sheet header.'),
    muted_foreground: css_color.optional().describe('Secondary text.'),
    accent: css_color.optional().describe('Pressed and hovered backgrounds.'),
    accent_foreground: css_color.optional().describe('Text color on `accent`.'),
    destructive: css_color
      .optional()
      .describe('Errors and destructive actions.'),
    destructive_foreground: css_color
      .optional()
      .describe('Text color on `destructive`.'),
    border: css_color.optional().describe('Borders and dividers.'),
    input: css_color.optional().describe('Input borders.'),
    ring: css_color.optional().describe('Focus rings.'),
    success: css_color.optional().describe('Successful unlocks.'),
    success_foreground: css_color
      .optional()
      .describe('Text color on `success`.'),
    key_card: css_color.optional().describe('Start of the key card gradient.'),
    key_card_end: css_color
      .optional()
      .describe('End of the key card gradient.'),
    key_card_foreground: css_color
      .optional()
      .describe('Text and logo color on the key card.'),
    unlock: css_color
      .optional()
      .describe('Start of the unlock button gradient.'),
    unlock_end: css_color
      .optional()
      .describe('End of the unlock button gradient.'),
    unlock_foreground: css_color
      .optional()
      .describe('Icon color on the unlock button.'),
  })
  .strict()

export const instant_key_theme = z.object({
  radius: z
    .string()
    .regex(
      /^(?:\d+\.?\d*|\.\d+)(?:rem|px)?$/,
      'Must be a length in `rem` or `px`, like `0.875rem` or `14px`',
    )
    .optional()
    .describe(
      'Corner radius for the Instant Key UI, as a CSS length such as `0.875rem` or `14px`.',
    ),
  font_family: z
    .string()
    .max(200)
    .optional()
    .describe(
      'Font family for the Instant Key UI. The apps use the closest system typeface: sans-serif, serif, or monospace.',
    ),
  key_card_texture: z
    .enum(['default', 'none'])
    .optional()
    .describe(
      'Whether the key card shows its default texture over the key card gradient, or the gradient alone.',
    ),
  light: instant_key_theme_colors
    .optional()
    .describe(
      "Light-mode colors, named after shadcn/ui's CSS variables in snake_case. Values are CSS colors in hex, `oklch()`, `rgb()`, or `hsl()` form. Colors you omit use the Seam default.",
    ),
  dark: instant_key_theme_colors
    .optional()
    .describe(
      'Dark-mode colors, in the same form as `light`. When omitted, dark mode uses the Seam default with your `primary`, `primary_foreground`, and `ring` colors.',
    ),
})

export const message_overrides = z.record(
  z.string(),
  z.record(z.string(), z.string()),
)

export const customization_profile = z.object({
  workspace_id: z.string().uuid(),
  name: z.string().nullable(),
  customization_profile_id: z.string().uuid(),
  customer_key: z
    .string()
    .nullable()
    .describe(
      'Key of the customer that owns the profile, or `null` for a workspace-level profile. A customer can own a profile without using it; the profile a customer uses is `customization_profile_id` on the customer.',
    ),
  created_at: datetime,
  is_workspace_default: z
    .boolean()
    .describe(
      "Whether this is the workspace's default profile, used for access grants and Instant Keys created without a customization profile.",
    ),
  logo_url: z.string().url().optional(),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
  customer_portal_theme: customer_portal_theme.optional(),
  instant_key_theme: instant_key_theme
    .optional()
    .describe('Theme for the Instant Keys apps.'),
  message_overrides: message_overrides.optional(),
}).describe(`
  ---
  title: Customization Profile
  undocumented: Unreleased.
  route_path: /workspaces/customization_profiles
  ---
  A customization profile.
`)

export type CustomizationProfile = z.infer<typeof customization_profile>
