import { z } from 'zod'

export const partner_resource = z.object({
  partner_resource_type: z.string().describe('Type of the partner resource.'),
  partner_resource_key: z.string().describe('Key of the partner resource.'),
  customer_key: z
    .string()
    .describe('Customer key associated with the partner resource.'),

  // For user identity partner resources
  email_address: z
    .string()
    .optional()
    .describe(
      'Email address associated with the user identity partner resource.',
    ),
  phone_number: z
    .string()
    .optional()
    .describe(
      'Phone number associated with the user identity partner resource.',
    ),

  // For access grant partner resources
  starts_at: z
    .string()
    .optional()
    .describe(
      'Starting date and time associated with the access grant partner resource.',
    ),
  ends_at: z
    .string()
    .optional()
    .describe(
      'Ending date and time associated with the access grant partner resource.',
    ),
  user_identity_key: z
    .string()
    .optional()
    .describe(
      'User identity key associated with the access grant partner resource.',
    ),
  location_keys: z
    .array(z.string())
    .optional()
    .describe(
      'Location keys associated with the access grant partner resource.',
    ),

  // Common
  name: z.string().optional().describe('Name of the partner resource.'),
  description: z
    .string()
    .optional()
    .describe('Description of the partner resource.'),
  custom_metadata: z
    .record(z.string(), z.string())
    .optional()
    .describe('Custom metadata associated with the partner resource.'),
}).describe(`
  ---
  undocumented: Unreleased.
  route_path: /unstable_partner/resources
  ---
  Represents a partner resource that enables you to send your user identity and access grant resources to Seam.
  `)

export type PartnerResource = z.infer<typeof partner_resource>

export const typed_partner_resource = z.object({
  partner_resource_key: z.string().describe('Key of the partner resource.'),

  name: z.string().describe('Name of the partner resource.'),
  description: z
    .string()
    .optional()
    .describe('Description of the partner resource.'),
  custom_metadata: z
    .record(z.string(), z.string())
    .optional()
    .describe('Custom metadata associated with the partner resource.'),
}).describe(`
  ---
  undocumented: Unreleased.
  route_path: /unstable_partner/resources
  ---
  Represents a typed partner resource that enables you to send your user identity and access grant resources to Seam.
  `)

export type TypedPartnerResource = z.infer<typeof typed_partner_resource>

export const space_resource = z.object({
  space_key: z.string().describe('Key of the space for the resource.'),

  name: z.string().describe('Name of the space resource.'),
  description: z
    .string()
    .optional()
    .describe('Description of the space resource.'),
  custom_metadata: z
    .record(z.string(), z.string())
    .optional()
    .describe('Custom metadata associated with the space resource.'),
}).describe(`
  ---
  undocumented: Unreleased.
  route_path: /unstable_partner/resources
  ---
  Represents a partner resource that enables you to send your space resources to Seam.
  `)

export type SpaceResource = z.infer<typeof space_resource>
