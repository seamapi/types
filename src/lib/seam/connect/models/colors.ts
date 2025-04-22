import { z } from 'zod'

export const hex_color_code = z.string().refine((value) => {
  if (value != null) {
    return /^#[\da-fa-z]{3,6}$/i.test(value)
  }

  return true
}, 'Must be a hex color')
