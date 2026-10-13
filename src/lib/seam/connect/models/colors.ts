import * as z from 'zod/v3'

export const hex_color_code = z.string().refine((value) => {
  if (value != null) {
    return /^#[\da-fa-z]{3,6}$/i.test(value)
  }

  return true
}, 'Must be a hex color')

const css_number = String.raw`[+-]?(?:\d+\.?\d*|\.\d+)`
const css_alpha = String.raw`(?:\s*/\s*${css_number}%?)?`
const css_color_patterns = [
  /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i,
  new RegExp(
    String.raw`^oklch\(\s*${css_number}%?\s+${css_number}%?\s+${css_number}(?:deg)?${css_alpha}\s*\)$`,
    'i',
  ),
  new RegExp(
    String.raw`^rgba?\(\s*${css_number}%?(?:\s*,\s*|\s+)${css_number}%?(?:\s*,\s*|\s+)${css_number}%?(?:(?:\s*,\s*|\s*/\s*)${css_number}%?)?\s*\)$`,
    'i',
  ),
  new RegExp(
    String.raw`^hsla?\(\s*${css_number}(?:deg)?(?:\s*,\s*|\s+)${css_number}%(?:\s*,\s*|\s+)${css_number}%(?:(?:\s*,\s*|\s*/\s*)${css_number}%?)?\s*\)$`,
    'i',
  ),
  new RegExp(String.raw`^${css_number}\s+${css_number}%\s+${css_number}%$`),
]

export const css_color = z
  .string()
  .max(100)
  .refine(
    (value) =>
      css_color_patterns.some((css_color_pattern) =>
        css_color_pattern.test(value.trim()),
      ),
    'Must be a CSS color: a hex code, `oklch()`, `rgb()`, or `hsl()`',
  )
