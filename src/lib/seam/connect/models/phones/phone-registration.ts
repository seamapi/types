import { z } from 'zod'

export const phone_registration = z.object({
  phone_registration_id: z.string().describe('Registration ID for the phone.'),
  provider_state: z.any().describe('Provider state for the phone.'),
  provider_name: z.string().nullable().describe('Provider name for the phone.'),
  is_being_activated: z
    .boolean()
    .describe('Indicates whether the phone is being activated.'),
}).describe(`
  ---
  route_path: /seam/mobile_sdk/v1/phone_sessions
  undocumented: Seam Mobile SDK only.
  ---
  Represents a mobile phone registration.
`)

export type PhoneRegistration = z.infer<typeof phone_registration>
