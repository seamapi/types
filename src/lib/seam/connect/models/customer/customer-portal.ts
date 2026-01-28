import { z } from 'zod'

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
  customer_resources_filters: z
    .array(
      z.object({
        field: z
          .string()
          .regex(/^[a-zA-Z_]\w*$/, {
            message:
              'Field names must start with a letter or underscore and contain only alphanumeric characters and underscores',
          })
          .describe('The custom_metadata field name to filter on.'),
        operation: z
          .literal('=')
          .describe(
            "The comparison operation. Currently only '=' is supported.",
          ),
        value: z
          .union([z.string(), z.boolean()])
          .describe('The value to compare against.'),
      }),
    )
    .optional()
    .describe(
      'Filter configuration for resources based on their custom_metadata. Each filter specifies a field, operation, and value to match against resource custom_metadata.',
    ),
  navigation_mode: z
    .enum(['full', 'restricted'])
    .default('full')
    .describe(
      "Navigation mode for the portal. 'restricted' tells frontend to hide navigation UI, typically used for embedded deep links.",
    ),
  deep_link: z
    .object({
      resource_type: z.enum(['reservation']),
      resource_key: z.string(),
    })
    .optional()
    .describe(
      'Deep link target resource for initial redirect. When set, the portal will navigate directly to the specified resource.',
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
    customer_resources_filters: undefined,
  })
  .describe(`Configuration for a customer portal`)

export type PortalConfiguration = z.infer<typeof portal_configuration>

export type CustomerResourcesFilters = Array<{
  field: string
  operation: '='
  value: string | boolean
}>
