import { z } from 'zod'

export const phone_registration = z.object({
  phone_registration_id: z.string(),
  provider_state: z.any(),
  provider_name: z.string().nullable(),
  is_being_activated: z.boolean(),
}).describe(`
  ---
  route_path: /seam/mobile_sdk/v1/phone_sessions
  undocumented: Seam Mobile SDK only.
  ---
`)

export type PhoneRegistration = z.infer<typeof phone_registration>
