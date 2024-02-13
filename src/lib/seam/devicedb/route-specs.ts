import { z } from 'zod'

import * as schemas from './models/index.js'

const dot_path = z.string().regex(/^([a-z])[a-z_.]*[a-z]+$/)

export const routes = {
  '/api/v1/device_models/get': {
    auth: 'publishable_key',
    methods: ['GET', 'OPTIONS'],
    queryParams: z.object({
      device_model_id: z.string().uuid(),
    }),
    jsonResponse: z.object({
      device_model: schemas.device_model_v1,
    }),
  },
  '/api/v1/device_models/list': {
    auth: 'publishable_key',
    methods: ['GET', 'OPTIONS'],
    queryParams: z.object({
      main_category: schemas.device_category.optional(),
      manufacturer_id: z.string().uuid().optional(),
      manufacturer_ids: z.string().uuid().array().optional(),
      /** @deprecated */
      integration_status: schemas.manufacturer.shape.integration.optional(),
      integration_support_levels: z
        .array(schemas.manufacturer_integration_support_level)
        .optional(),
      text_search: z.string().optional(),
      include_if: z.array(dot_path).optional(),
      exclude_if: z.array(dot_path).optional(),
    }),
    jsonResponse: z.object({
      device_models: schemas.device_model_v1.array(),
    }),
  },
  '/api/v1/manufacturers/get': {
    auth: 'publishable_key',
    methods: ['GET', 'OPTIONS'],
    queryParams: z.object({
      manufacturer_id: z.string().uuid(),
    }),
    jsonResponse: z.object({
      manufacturer: schemas.manufacturer,
    }),
  },
  '/api/v1/manufacturers/list': {
    auth: 'publishable_key',
    methods: ['GET', 'OPTIONS'],
    queryParams: z.object({
      /** @deprecated */
      integration_status: schemas.manufacturer.shape.integration.optional(),
      integration_support_levels: z
        .array(schemas.manufacturer_integration_support_level)
        .optional(),
      liqe_query: z.string().optional(),
    }),
    jsonResponse: z.object({
      manufacturers: schemas.manufacturer.array(),
    }),
  },
} as const
