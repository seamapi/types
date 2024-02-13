import { z } from 'zod'

export const image_reference = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
})

export type ImageReference = z.infer<typeof image_reference>
