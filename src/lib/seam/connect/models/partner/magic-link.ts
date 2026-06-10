import { z } from 'zod'

export const magic_link = z.object({
  url: z.string().url().describe('URL for the magic link.'),
  customer_key: z.string().describe('Customer key for the magic link.'),
  expires_at: z
    .string()
    .datetime()
    .describe('Date and time at which the magic link expires.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) associated with the magic link.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the magic link was created.'),
}).describe(`
  ---
  undocumented: Unreleased.
  route_path: /unstable_partner/building_blocks
  ---
  Represents a Customer Portal. Customer Portal is a hosted, customizable interface for managing device access. It enables you to embed secure, pre-authenticated access flows into your product—either by sharing a link with users or embedding a view in an iframe.

  With Customer Portal, you no longer need to build out frontend experiences for physical access, thermostats, and sensors. Instead, you can ship enterprise-grade access control experiences in a fraction of the time, while maintaining your product's branding and user experience.
  
  Seam hosts these flows, handling everything from account connection and device mapping to full-featured device control.
  `)

export type MagicLink = z.infer<typeof magic_link>
