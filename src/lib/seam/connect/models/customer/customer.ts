import { z } from 'zod'

export const customer = z.object({
  customer_key: z
    .string()
    .describe('Unique key for the customer within the workspace.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) associated with the customer.',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the customer was created.'),
}).describe(`
  ---
  route_path: /customers
  undocumented: Internal resource.
  ---
  Represents a customer within a workspace. Customers are used to organize resources and manage access for different clients, such as hotels, property managers, and more.
  `)

export type Customer = z.infer<typeof customer>
