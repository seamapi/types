import { z } from 'zod'

import {
  common_failed_action_attempt,
  common_pending_action_attempt,
  common_succeeded_action_attempt,
} from './common.js'

const error = z
  .object({
    type: z.string().describe('Type of the error.'),
    message: z
      .string()
      .describe(
        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
      ),
  })
  .describe('Error associated with the action.')

const result = z.object({}).describe('Result of the action.')

const sync_access_codes_action_attempt = z
  .discriminatedUnion('status', [
    common_pending_action_attempt.extend({
      action_type: z
        .literal('SYNC_ACCESS_CODES')
        .describe('Syncing access codes is pending.'),
    }),
    common_succeeded_action_attempt.extend({
      action_type: z
        .literal('SYNC_ACCESS_CODES')
        .describe('Syncing access codes succeeded.'),
      result,
    }),
    common_failed_action_attempt.extend({
      action_type: z
        .literal('SYNC_ACCESS_CODES')
        .describe('Syncing access codes failed.'),
      error,
    }),
  ])
  .describe('Action attempt to track the status of syncing access codes.')

const create_access_code_action_attempt = z
  .discriminatedUnion('status', [
    common_pending_action_attempt.extend({
      action_type: z
        .literal('CREATE_ACCESS_CODE')
        .describe('Creating an access code is pending.'),
    }),
    common_succeeded_action_attempt.extend({
      action_type: z
        .literal('CREATE_ACCESS_CODE')
        .describe('Creating an access code succeeded.'),
      result: z
        .object({
          access_code: z.any().describe('Created access code.'),
        })
        .describe('Result of the action.'),
    }),
    common_failed_action_attempt.extend({
      action_type: z
        .literal('CREATE_ACCESS_CODE')
        .describe('Creating an access code failed.'),
      error,
    }),
  ])
  .describe('Action attempt to track the status of creating an access code.')

const delete_access_code_action_attempt = z
  .discriminatedUnion('status', [
    common_pending_action_attempt.extend({
      action_type: z
        .literal('DELETE_ACCESS_CODE')
        .describe('Deleting an access code is pending.'),
    }),
    common_succeeded_action_attempt.extend({
      action_type: z
        .literal('DELETE_ACCESS_CODE')
        .describe('Deleting an access code succeeded.'),
      result,
    }),
    common_failed_action_attempt.extend({
      action_type: z
        .literal('DELETE_ACCESS_CODE')
        .describe('Deleting an access code failed.'),
      error,
    }),
  ])
  .describe('Action attempt to track the status of deleting an access code.')

const update_access_code_action_attempt = z
  .discriminatedUnion('status', [
    common_pending_action_attempt.extend({
      action_type: z
        .literal('UPDATE_ACCESS_CODE')
        .describe('Updating an access code is pending.'),
    }),
    common_succeeded_action_attempt.extend({
      action_type: z
        .literal('UPDATE_ACCESS_CODE')
        .describe('Updating an access code succeeded.'),
      result: z
        .object({
          access_code: z.any().describe('Updated access code.'),
        })
        .describe('Result of the action.'),
    }),
    common_failed_action_attempt.extend({
      action_type: z
        .literal('UPDATE_ACCESS_CODE')
        .describe('Updating an access code failed.'),
      error,
    }),
  ])
  .describe('Action attempt to track the status of updating an access code.')

const create_noise_threshold_action_attempt = z
  .discriminatedUnion('status', [
    common_pending_action_attempt.extend({
      action_type: z
        .literal('CREATE_NOISE_THRESHOLD')
        .describe('Creating a noise threshold is pending.'),
    }),
    common_succeeded_action_attempt.extend({
      action_type: z
        .literal('CREATE_NOISE_THRESHOLD')
        .describe('Creating a noise threshold succeeded.'),
      result: z
        .object({
          noise_threshold: z.any().describe('Created noise threshold.'),
        })
        .describe('Result of the action.'),
    }),
    common_failed_action_attempt.extend({
      action_type: z
        .literal('CREATE_NOISE_THRESHOLD')
        .describe('Creating a noise threshold failed.'),
      error,
    }),
  ])
  .describe('Action attempt to track the status of creating a noise threshold.')

const delete_noise_threshold_action_attempt = z
  .discriminatedUnion('status', [
    common_pending_action_attempt.extend({
      action_type: z
        .literal('DELETE_NOISE_THRESHOLD')
        .describe('Deleting a noise threshold is pending.'),
    }),
    common_succeeded_action_attempt.extend({
      action_type: z
        .literal('DELETE_NOISE_THRESHOLD')
        .describe('Deleting a noise threshold succeeded.'),
      result,
    }),
    common_failed_action_attempt.extend({
      action_type: z
        .literal('DELETE_NOISE_THRESHOLD')
        .describe('Deleting a noise threshold failed.'),
      error,
    }),
  ])
  .describe('Action attempt to track the status of deleting a noise threshold.')

const update_noise_threshold_action_attempt = z
  .discriminatedUnion('status', [
    common_pending_action_attempt.extend({
      action_type: z
        .literal('UPDATE_NOISE_THRESHOLD')
        .describe('Updating a noise threshold is pending.'),
    }),
    common_succeeded_action_attempt.extend({
      action_type: z
        .literal('UPDATE_NOISE_THRESHOLD')
        .describe('Updating a noise threshold succeeded.'),
      result: z
        .object({
          noise_threshold: z.any().describe('Updated noise threshold.'),
        })
        .describe('Result of the action.'),
    }),
    common_failed_action_attempt.extend({
      action_type: z
        .literal('UPDATE_NOISE_THRESHOLD')
        .describe('Updating a noise threshold failed.'),
      error,
    }),
  ])
  .describe('Action attempt to track the status of updating a noise threshold.')

export const deprecated_action_attempts = [
  ...sync_access_codes_action_attempt.options,
  ...create_access_code_action_attempt.options,
  ...delete_access_code_action_attempt.options,
  ...update_access_code_action_attempt.options,
  ...create_noise_threshold_action_attempt.options,
  ...delete_noise_threshold_action_attempt.options,
  ...update_noise_threshold_action_attempt.options,
] as const
