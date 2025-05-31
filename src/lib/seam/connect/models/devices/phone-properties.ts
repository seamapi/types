import { z } from 'zod'

export const phone_specific_properties = z.object({
  assa_abloy_credential_service_metadata: z
    .object({
      has_active_endpoint: z
        .boolean()
        .describe(
          'Indicates whether the credential service has active endpoints associated with the phone.',
        ),
      endpoints: z
        .array(
          z.object({
            endpoint_id: z.string().describe('ID of the associated endpoint.'),
            is_active: z
              .boolean()
              .describe('Indicated whether the endpoint is active.'),
          }),
        )
        .describe('Endpoints associated with the phone.'),
    })
    .optional()
    .describe('ASSA ABLOY Credential Service metadata for the phone.'),

  salto_space_credential_service_metadata: z
    .object({
      has_active_phone: z
        .boolean()
        .describe(
          'Indicates whether the credential service has an active associated phone.',
        ),
    })
    .optional()
    .describe('Salto Space credential service metadata for the phone.'),
}).describe(`
          Properties of the phone.
          `)
