import { z } from 'zod'

import { acs_credential } from '../acs/acs-credential.js'
import { acs_entrance } from '../acs/acs-entrance.js'
import { user_identity } from '../user-identities/user-identity.js'
import { phone_registration } from './phone-registration.js'

const phone_provider_session = z
  .object({
    phone_registration,
    acs_credentials: acs_credential
      .omit({
        acs_credential_id: true,
      })
      .extend({
        acs_credential_id: z.string().nullable(),
        acs_entrances: acs_entrance.array(),
      })
      .array()
      .describe(
        'Access system credentials associated with the phone provider session.',
      ),
  })
  .describe('Phone provider session.')

export const phone_session = z.object({
  provider_sessions: phone_provider_session
    .array()
    .describe('Phone provider sessions.'),

  user_identity: user_identity.describe('User identity.'),

  workspace_id: z.string().describe('Workspace ID.'),

  is_sandbox_workspace: z
    .boolean()
    .describe('Whether the workspace is in sandbox mode.'),
}).describe(`
  ---
  route_path: /seam/mobile_sdk/v1/phone_sessions
  undocumented: Seam Mobile SDK only.
  ---
  Represents a mobile phone session.
`)

export type PhoneProviderSession = z.infer<typeof phone_provider_session>

export type PhoneSession = z.infer<typeof phone_session>
