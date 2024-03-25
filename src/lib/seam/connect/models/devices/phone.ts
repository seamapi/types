import { z } from 'zod'

import { managed_device } from './managed-device.js'
import { phone_specific_properties } from './phone-properties.js'

export { phone_specific_properties } from './phone-properties.js'

export const phone = managed_device
  .omit({
    connected_account_id: true,
  })
  .extend({
    device_type: z.enum(['android_phone', 'ios_phone']),
  })
  .merge(z.object({ properties: phone_specific_properties }))
