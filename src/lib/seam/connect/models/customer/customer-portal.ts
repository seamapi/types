import { z } from 'zod'

const base_feature = z.object({
  exclude: z
    .boolean()
    .default(false)
    .describe('Whether to exclude this feature from the portal.'),
})

const base_connect_feature = base_feature
const base_manage_devices_feature = base_feature
const base_organize_feature = base_feature

const base_configure_feature = base_feature.extend({
  allow_access_automation_rule_customization: z
    .boolean()
    .default(false)
    .describe(
      'Indicates whether the customer can customize the access automation rules for their properties.',
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
  manage_devices: base_manage_devices_feature
    .default({})
    .describe('Configuration for the manage devices feature.'),
  organize: base_organize_feature
    .default({})
    .describe('Configuration for the organize feature.'),
  configure: base_configure_feature
    .default({})
    .describe('Configuration for the configure feature.'),
})

export const portal_configuration = z
  .object({
    features: base_features.default({}),
    is_embedded: z
      .boolean()
      .default(false)
      .describe('Whether the portal is embedded in another application.'),
  })
  .default({
    features: {
      connect: { exclude: false },
      organize: { exclude: false },
      manage_devices: { exclude: false },
      configure: {
        exclude: false,
        allow_instant_key_customization: false, // default
        allow_access_automation_rule_customization: false, // default
      },
    },
    is_embedded: false,
  })
  .describe(`Configuration for a customer portal`)

export type PortalConfiguration = z.infer<typeof portal_configuration>
