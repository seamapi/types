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
})

export const portal_configuration = z
  .object({
    features: base_features.default({}),
  })
  .default({
    features: {
      connect: { exclude: false },
      organize: { exclude: false },
      manage_devices: { exclude: false },
    },
  })
  .describe(`Configuration for a customer portal`)

export type PortalConfiguration = z.infer<typeof portal_configuration>
