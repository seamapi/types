import { z } from 'zod'

import { access_code } from './managed-access-code.js'

export const unmanaged_access_code = access_code
  .pick({
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
    is_managed: z.literal(false),
    status: z.enum(['set']),
  })

export type UnmanagedAccessCode = z.infer<typeof unmanaged_access_code>
