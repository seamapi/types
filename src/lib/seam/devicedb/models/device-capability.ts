import { z, type ZodLiteral } from 'zod'

export const device_capability_flags = z
  .object({
    can_remotely_unlock: z.boolean(),
    can_remotely_lock: z.boolean(),
    can_program_offline_access_codes: z.boolean(),
    can_program_online_access_codes: z.boolean(),
    can_hvac_heat: z.boolean(),
    can_hvac_cool: z.boolean(),
    can_hvac_heat_cool: z.boolean(),
    can_turn_off_hvac: z.boolean(),
  })
  .partial()

const device_model_capability_flags_map: Record<
  keyof z.infer<typeof device_capability_flags>,
  ZodLiteral<true>
> = {
  can_remotely_lock: z.literal(true),
  can_remotely_unlock: z.literal(true),
  can_program_offline_access_codes: z.literal(true),
  can_program_online_access_codes: z.literal(true),
  can_hvac_heat: z.literal(true),
  can_hvac_cool: z.literal(true),
  can_hvac_heat_cool: z.literal(true),
  can_turn_off_hvac: z.literal(true),
}

export const device_model_capability_flags = z
  .object(device_model_capability_flags_map)
  .partial()
