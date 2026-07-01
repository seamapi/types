import { z } from 'zod'

export const webhook = z.object({
  webhook_id: z.string().describe('ID of the webhook.'),
  url: z
    .string()
    .describe(
      'URL for the [webhook](https://docs.seam.co/developer-tools/webhooks).',
    ),
  event_types: z
    .array(z.string())
    .optional()
    .describe(
      'Types of events that the [webhook](https://docs.seam.co/developer-tools/webhooks) should receive.',
    ),
  secret: z
    .string()
    .optional()
    .describe(
      'Secret associated with the [webhook](https://docs.seam.co/developer-tools/webhooks).',
    ),
}).describe(`
  ---
  route_path: /webhooks
  ---
  Represents a [webhook](https://docs.seam.co/developer-tools/webhooks) that enables you to receive notifications of events. When you create a webhook, specify the endpoint URL at which you want to receive events and the set of event types that you want to receive.
  `)

export type Webhook = z.infer<typeof webhook>
