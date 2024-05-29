import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const error = z.object({
  type: z.string(),
  message: z.string(),
})

const result = z.any()

const sync_access_codes_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt.extend({
    action_type: z.literal('SYNC_ACCESS_CODES'),
  }),
  common_succeeded_action_attempt.extend({
    action_type: z.literal('SYNC_ACCESS_CODES'),
    result,
  }),
  common_failed_action_attempt.extend({
    action_type: z.literal('SYNC_ACCESS_CODES'),
    error,
  }),
])

const create_access_code_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt.extend({
    action_type: z.literal('CREATE_ACCESS_CODE'),
  }),
  common_succeeded_action_attempt.extend({
    action_type: z.literal('CREATE_ACCESS_CODE'),
    result,
  }),
  common_failed_action_attempt.extend({
    action_type: z.literal('CREATE_ACCESS_CODE'),
    error,
  }),
])

const delete_access_code_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt.extend({
    action_type: z.literal('DELETE_ACCESS_CODE'),
  }),
  common_succeeded_action_attempt.extend({
    action_type: z.literal('DELETE_ACCESS_CODE'),
    result,
  }),
  common_failed_action_attempt.extend({
    action_type: z.literal('DELETE_ACCESS_CODE'),
    error,
  }),
])

const update_access_code_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt.extend({
    action_type: z.literal('UPDATE_ACCESS_CODE'),
  }),
  common_succeeded_action_attempt.extend({
    action_type: z.literal('UPDATE_ACCESS_CODE'),
    result,
  }),
  common_failed_action_attempt.extend({
    action_type: z.literal('UPDATE_ACCESS_CODE'),
    error,
  }),
])

const create_noise_threshold_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt.extend({
    action_type: z.literal('CREATE_NOISE_THRESHOLD'),
  }),
  common_succeeded_action_attempt.extend({
    action_type: z.literal('CREATE_NOISE_THRESHOLD'),
    result,
  }),
  common_failed_action_attempt.extend({
    action_type: z.literal('CREATE_NOISE_THRESHOLD'),
    error,
  }),
])

const delete_noise_threshold_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt.extend({
    action_type: z.literal('DELETE_NOISE_THRESHOLD'),
  }),
  common_succeeded_action_attempt.extend({
    action_type: z.literal('DELETE_NOISE_THRESHOLD'),
    result,
  }),
  common_failed_action_attempt.extend({
    action_type: z.literal('DELETE_NOISE_THRESHOLD'),
    error,
  }),
])

const update_noise_threshold_action_attempt = z.discriminatedUnion('status', [
  common_pending_action_attempt.extend({
    action_type: z.literal('UPDATE_NOISE_THRESHOLD'),
  }),
  common_succeeded_action_attempt.extend({
    action_type: z.literal('UPDATE_NOISE_THRESHOLD'),
    result,
  }),
  common_failed_action_attempt.extend({
    action_type: z.literal('UPDATE_NOISE_THRESHOLD'),
    error,
  }),
])

export const deprecated_action_attempts = [
  ...sync_access_codes_action_attempt.options,
  ...create_access_code_action_attempt.options,
  ...delete_access_code_action_attempt.options,
  ...update_access_code_action_attempt.options,
  ...create_noise_threshold_action_attempt.options,
  ...delete_noise_threshold_action_attempt.options,
  ...update_noise_threshold_action_attempt.options,
] as const
