import { z } from 'zod'

import { acs_credential } from '../acs/acs-credential.js'
import { acs_entrance } from '../acs/acs-entrance.js'
import { phone_registration } from './phone-registration.js'

const phone_provider_session = z.object({
  phone_registration,
  acs_credentials: acs_credential
    .omit({
      acs_credential_id: true,
    })
    .extend({
      acs_credential_id: z.string().optional().nullable(),
      acs_entrances: acs_entrance.array(),
    })
    .array(),
})

export const phone_session = z.object({
  provider_sessions: phone_provider_session.array(),
}).describe(`
  ---
  route_path: /seam/mobile_sdk/v1/phone_sessions
  undocumented: Seam Mobile SDK only.
  ---
`)

export type PhoneProviderSession = z.infer<typeof phone_provider_session>

export type PhoneSession = z.infer<typeof phone_session>
