import { z } from 'zod'

export const managed_access_code = z.object({
  common_code_key: z.string().nullable(),
  is_scheduled_on_device: z.boolean().optional(),
  type: z.enum(['time_bound', 'ongoing']),
  is_waiting_for_code_assignment: z.boolean().optional(),
  access_code_id: z.string().uuid(),
  device_id: z.string().uuid(),
  name: z.string().nullable(),
  code: z.string().nullable(),
  created_at: z.string().datetime(),
  errors: z.any(),
  warnings: z.any(),
  is_managed: z.literal(true),
  starts_at: z.string().datetime().nullable().optional(),
  ends_at: z.string().datetime().nullable().optional(),
  status: z.enum(['setting', 'set', 'unset', 'removing', 'unknown']),
  is_backup_access_code_available: z.boolean(),
  is_backup: z.boolean().optional(),
  pulled_backup_access_code_id: z.string().uuid().nullable().optional(),
  is_external_modification_allowed: z.boolean(),
})

export type ManagedAccessCode = z.infer<typeof managed_access_code>
