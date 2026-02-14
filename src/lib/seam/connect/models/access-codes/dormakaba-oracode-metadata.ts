import { z } from 'zod'

export const dormakaba_oracode_access_code_metadata = z
  .object({
    ext_stay_id: z
      .number()
      .describe('Dormakaba Oracode stay ID associated with this access code.'),
    ext_user_level: z
      .string()
      .nullable()
      .describe(
        'Dormakaba Oracode user level name associated with this access code.',
      ),
    ext_site_name: z
      .string()
      .describe('Dormakaba Oracode site name used for API calls.'),
    is_cancellable: z
      .boolean()
      .describe(
        'Indicates whether the stay associated with this access code can be cancelled.',
      ),
    is_extendable: z
      .boolean()
      .describe(
        'Indicates whether the stay associated with this access code can be extended.',
      ),
    is_early_checkin_able: z
      .boolean()
      .describe(
        'Indicates whether early check-in is available for the stay associated with this access code.',
      ),
  })
  .describe('Metadata for a dormakaba Oracode access code.')
