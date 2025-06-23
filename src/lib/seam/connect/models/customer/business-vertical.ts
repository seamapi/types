import { z } from 'zod'

export const business_vertical = z
  .enum([
    'short_term_rental',
    'hospitality',
    'multi_family',
    'gym_management',
    'property_tours',
  ])
  .describe('Business vertical of the customer portal.')

export type BusinessVertical = z.infer<typeof business_vertical>
