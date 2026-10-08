import * as z from 'zod/v3'

import { datetime } from '../datetime.js'

export const customer = z.object({
  customer_key: z
    .string()
    .describe('Unique key for the customer within the workspace.'),
  workspace_id: z
    .string()
    .uuid()
    .describe('ID of the workspace associated with the customer.'),
  created_at: datetime.describe(
    'Date and time at which the customer was created.',
  ),
  customization_profile_id: z
    .string()
    .uuid()
    .nullable()
    .describe(
      'ID of the customization profile the customer uses. Access grants that automations create for this customer use this profile. This can differ from the profiles the customer owns.',
    ),
  low_battery_alert_threshold: z
    .number()
    .nullable()
    .describe(
      "Battery level, from 0 to 1, at or below which `device.low_battery` events fire for this customer's devices. `null` means the workspace or device default applies.",
    ),
}).describe(`
  ---
  route_path: /customers
  undocumented: Internal resource.
  ---
  Represents a customer within a workspace. Customers are used to organize resources and manage access for different clients, such as hotels, property managers, and more.
  `)

export type Customer = z.infer<typeof customer>
