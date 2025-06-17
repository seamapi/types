import { z } from 'zod'

import { device } from './device.js'
import { phone_device_type } from './device-type.js'
import { phone_specific_properties } from './phone-properties.js'

export { phone_specific_properties } from './phone-properties.js'

const basePhoneDeviceSchema = device.pick({
  device_id: true,
  nickname: true,
  display_name: true,
  workspace_id: true,
  created_at: true,
  custom_metadata: true,
})

export const phone = z.object({
  device_id: basePhoneDeviceSchema.shape.device_id.describe(`ID of the phone.
          `),
  nickname: basePhoneDeviceSchema.shape.nickname
    .describe(`Optional nickname to describe the phone, settable through Seam.
  `),
  display_name: basePhoneDeviceSchema.shape.display_name
    .describe(`Display name of the phone. Defaults to \`nickname\` (if it is set) or \`properties.appearance.name\`, otherwise. Enables administrators and users to identify the phone easily, especially when there are numerous phones.
  `),
  workspace_id: basePhoneDeviceSchema.shape.workspace_id
    .describe(`ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the phone.
  `),
  created_at: basePhoneDeviceSchema.shape.created_at
    .describe(`Date and time at which the phone was created.
  `),
  custom_metadata: basePhoneDeviceSchema.shape.custom_metadata
    .describe(`Optional [custom metadata](https://docs.seam.co/latest/core-concepts/devices/adding-custom-metadata-to-a-device) for the phone.
  `),

  errors: z
    .array(
      z.object({
        error_code: z.string(),
        message: z.string(),
      }),
    )
    .describe('Errors associated with the phone.'),
  warnings: z
    .array(
      z.object({
        warning_code: z.string(),
        message: z.string(),
      }),
    )
    .describe('Warnings associated with the phone.'),
  device_type: phone_device_type,
  properties: phone_specific_properties,
}).describe(`
  ---
  route_path: /phones
  property_groups:
    phones:
      name: Phones
  ---
  Represents an app user's mobile phone.
`)
