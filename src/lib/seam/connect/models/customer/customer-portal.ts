import { z } from 'zod'

import type { CustomMetadata } from '../custom-metadata.js'
import { access_grant_key_aliases } from './access-grant-resources.js'
import { location_key_aliases } from './location-resources.js'

const base_feature = z.object({
  exclude: z
    .boolean()
    .default(false)
    .describe('Whether to exclude this feature from the portal.'),
})

const base_connect_feature = base_feature.extend({
  accepted_providers: z
    .array(z.string())
    .optional()
    .describe(
      'List of provider keys to allow for the connect feature. These providers will be shown when the customer tries to connect an account.',
    ),
  excluded_providers: z
    .array(z.string())
    .optional()
    .describe(
      'List of provider keys to exclude from the connect feature. These providers will not be shown when the customer tries to connect an account.',
    ),
})
const base_manage_devices_feature = base_feature

const base_manage_feature = base_feature.extend({
  exclude_reservation_management: z
    .boolean()
    .default(false)
    .describe(
      'Indicates whether the customer can manage reservations for their properties.',
    ),
  exclude_staff_management: z
    .boolean()
    .default(false)
    .describe(
      'Indicates whether the customer can manage staff for their properties.',
    ),
})

const base_organize_feature = base_feature

const base_configure_feature = base_feature.extend({
  allow_access_automation_rule_customization: z
    .boolean()
    .default(false)
    .describe(
      'Indicates whether the customer can customize the access automation rules for their properties.',
    ),
  allow_climate_automation_rule_customization: z
    .boolean()
    .default(false)
    .describe(
      'Indicates whether the customer can customize the climate automation rules for their properties.',
    ),
  allow_instant_key_customization: z
    .boolean()
    .default(false)
    .describe(
      'Indicates whether the customer can customize the Instant Key profile for their properties.',
    ),
})

const base_features = z.object({
  connect: base_connect_feature
    .default({})
    .describe('Configuration for the connect accounts feature.'),
  manage: base_manage_feature
    .default({})
    .describe('Configuration for the manage feature.'),
  manage_devices: base_manage_devices_feature.default({}).describe(`
      Configuration for the manage devices feature.
      ---
      deprecated: Use \`manage\` instead.
      ---
    `),
  organize: base_organize_feature
    .default({})
    .describe('Configuration for the organize feature.'),
  configure: base_configure_feature
    .default({})
    .describe('Configuration for the configure feature.'),
})

export const portal_configuration_base = z.object({
  features: base_features.default({}),
  is_embedded: z
    .boolean()
    .default(false)
    .describe('Whether the portal is embedded in another application.'),
  landing_page: z
    .object({
      manage: z
        .union([location_key_aliases, access_grant_key_aliases])
        .optional(),
    })
    .optional()
    .describe('Configuration for the landing page when the portal loads.'),
  locale: z
    .enum(['en-US', 'pt-PT', 'fr-FR', 'it-IT', 'es-ES'])
    .optional()
    .describe('The locale to use for the portal.'),
  customization_profile_id: z
    .string()
    .uuid()
    .optional()
    .describe('The ID of the customization profile to use for the portal.'),
  property_listing_filter: z
    .record(z.string(), z.union([z.string(), z.boolean()]))
    .optional()
    .describe(
      'Filter configuration for property listings based on their custom_metadata. Keys and values must match the custom_metadata stored on property listings.',
    ),
})

export const portal_configuration = portal_configuration_base
  .default({
    features: {
      connect: { exclude: false },
      organize: { exclude: false },
      manage: {
        exclude: false,
        exclude_reservation_management: false,
        exclude_staff_management: false,
      },
      manage_devices: {
        exclude: false,
      },
      configure: {
        exclude: false,
        allow_instant_key_customization: false, // default
        allow_access_automation_rule_customization: false, // default
        allow_climate_automation_rule_customization: false, // default
      },
    },
    is_embedded: false,
    locale: undefined,
    property_listing_filter: undefined,
  })
  .describe(`Configuration for a customer portal`)

export type PortalConfiguration = z.infer<typeof portal_configuration>

export type PropertyListingFilter = CustomMetadata
