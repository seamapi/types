import { z } from 'zod'

const common_seam_bridge_error = z.object({
  created_at: z.string().datetime(),
  message: z.string(),
})

const seam_bridge_unreachable = common_seam_bridge_error.extend({
  error_code: z.literal('seam_bridge_unreachable'),
})
const failed_to_create_tunnel = common_seam_bridge_error.extend({
  error_code: z.literal('failed_to_create_tunnel'),
})
const failed_to_create_proxy = common_seam_bridge_error.extend({
  error_code: z.literal('failed_to_create_proxy'),
})

const managed_by_other_account = common_seam_bridge_error.extend({
  error_code: z.literal('managed_by_other_account'),
})

export const seam_bridge_error_map = z.object({
  failed_to_create_tunnel: failed_to_create_tunnel.optional().nullable(),
  failed_to_create_proxy: failed_to_create_proxy.optional().nullable(),
  seam_bridge_unreachable: seam_bridge_unreachable.optional().nullable(),
  managed_by_other_account: managed_by_other_account.optional().nullable(),
})

export const seam_bridge_error = z.union([
  seam_bridge_unreachable,
  failed_to_create_proxy,
  failed_to_create_tunnel,
  managed_by_other_account,
])

export type SeamBridgeErrorMap = z.infer<typeof seam_bridge_error_map>
