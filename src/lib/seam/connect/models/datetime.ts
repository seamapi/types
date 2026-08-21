import { z } from 'zod'

export const datetime = z.string().datetime({ offset: true })
