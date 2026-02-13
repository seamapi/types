import { z } from 'zod'

import { access_code } from './managed-access-code.js'

export const dormakaba_oracode_unmanaged_access_code_metadata = z
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
  })
  .describe('Metadata for a dormakaba Oracode unmanaged access code.')

export const unmanaged_access_code = access_code
  .pick({
    workspace_id: true,
    type: true,
    access_code_id: true,
    device_id: true,
    name: true,
    code: true,
    created_at: true,
    errors: true,
    warnings: true,
    is_managed: true,
    starts_at: true,
    ends_at: true,
  })
  .extend({
    is_managed: z
      .literal(false)
      .describe('Indicates that Seam does not manage the access code.'),
    status: z
      .enum(['set'])
      .describe(
        'Current status of the access code within the operational lifecycle. `set` indicates that the code is active and operational.',
      ),
    dormakaba_oracode_metadata: dormakaba_oracode_unmanaged_access_code_metadata
      .nullable()
      .describe(
        'Metadata for a dormakaba Oracode unmanaged access code. Only present for unmanaged access codes from dormakaba Oracode devices.',
      ),
  }).describe(`
    ---
    route_path: /access_codes/unmanaged
    ---
    Represents an [unmanaged smart lock access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/migrating-existing-access-codes).

    An access code is a code used for a keypad or pinpad device. Unlike physical keys, which can easily be lost or duplicated, PIN codes can be customized, tracked, and altered on the fly.

    When you create an access code on a device in Seam, it is created as a managed access code. Access codes that exist on a device that were not created through Seam are considered unmanaged codes. We strictly limit the operations that can be performed on unmanaged codes.

    Prior to using Seam to manage your devices, you may have used another lock management system to manage the access codes on your devices. Where possible, we help you keep any existing access codes on devices and transition those codes to ones managed by your Seam workspace.

    Not all providers support unmanaged access codes. The following providers do not support unmanaged access codes:
    
    - [Kwikset](https://docs.seam.co/latest/device-and-system-integration-guides/kwikset-locks)
  `)

export type UnmanagedAccessCode = z.infer<typeof unmanaged_access_code>
