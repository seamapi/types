import * as z from 'zod/v3'

export const datetime = z.string().datetime({ offset: true })
