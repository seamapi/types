import { z } from 'zod'

import { acs_entrance } from './acs/index.js'
import { device } from './devices/index.js'
import { space } from './spaces/index.js'
import { user_identity } from './user-identities/index.js'
import { workspace } from './workspaces/index.js'

export const spaces_batch = z
  .object({
    batch_type: z.literal('spaces'),
    spaces: space.array().optional(),
    devices: device.array().optional(),
    acs_entrances: acs_entrance.array().optional(),
  })
  .describe('ID of the affected access system user.')

export const access_grants_batch = z.object({
  batch_type: z.literal('access_grants'),
  spaces: space.array().optional(),
  devices: device.array().optional(),
  acs_entrances: acs_entrance.array().optional(),
})

export const access_methods_batch = z.object({
  batch_type: z.literal('access_methods'),
  spaces: space.array().optional(),
  devices: device.array().optional(),
  acs_entrances: acs_entrance.array().optional(),
})

export const workspaces_batch = z
  .object({
    batch_type: z.literal('workspaces'),
    user_identities: user_identity.array().optional(),
    workspaces: workspace.array().optional(),
    spaces: space.array().optional(),
    devices: device.array().optional(),
    acs_entrances: acs_entrance.array().optional(),
  })
  .describe('A batch of workspace-related resources.')

export const batch = z.object({
  batch_type: z.enum([
    'workspaces',
    'access_grants',
    'access_methods',
    'spaces',
  ]),
  user_identities: user_identity.array().optional(),
  workspaces: workspace.array().optional(),
  spaces: space.array().optional(),
  devices: device.array().optional(),
  acs_entrances: acs_entrance.array().optional(),
}).describe(`
  ---
  route_path: /
  ---
  Represents a resource batch.
`)

// TODO: Resolve type issues blocking this approach.
// export const batch = z.discriminatedUnion("batch_type", [
//   spaces_batch,
//   access_grants_batch,
//   access_methods_batch,
//   workspaces_batch,
// ]).describe(`
//   ---
//   route_path: /
//   ---
//   Represents a resource batch.
// `)

export type WorkspacesBatch = z.infer<typeof workspaces_batch>

export type Batch = z.infer<typeof batch>
