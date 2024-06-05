import { z } from 'zod'

const common_seam_bridge_error = z.object({
  created_at: z.string().datetime(),
  message: z.string(),
})

const connection_failure = common_seam_bridge_error.extend({
  error_code: z.literal('connection_failure'),
})
const bridge_tunnel_failed = common_seam_bridge_error.extend({
  error_code: z.literal('bridge_tunnel_failed'),
})
const bridge_proxy_failure = common_seam_bridge_error.extend({
  error_code: z.literal('bridge_proxy_failure'),
})

export const seam_bridge_error_map = z.object({
  bridge_tunnel_failed: bridge_tunnel_failed.optional().nullable(),
  bridge_proxy_failure: bridge_proxy_failure.optional().nullable(),
  connection_failure: connection_failure.optional().nullable(),
})

export const seam_bridge_error = z.union([
  connection_failure,
  bridge_proxy_failure,
  bridge_tunnel_failed,
])

export type SeamBridgeErrorMap = z.infer<typeof seam_bridge_error_map>
