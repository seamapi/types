import * as z from 'zod/v3'

export const temperature_controller_mode = z
  .enum(['heat', 'off'])
  .describe("Operating mode of the device's primary temperature controller.")

export type TemperatureControllerMode = z.infer<
  typeof temperature_controller_mode
>

export const temperature_setting = z.object({
  controller_mode: temperature_controller_mode.describe(
    "Operating mode requested from the device's primary temperature controller.",
  ),
  heating_set_point_celsius: z
    .number()
    .optional()
    .describe(
      'Temperature to which the controller should heat, in °C. The controller can retain this value while it is off.',
    ),
  heating_set_point_fahrenheit: z
    .number()
    .optional()
    .describe(
      'Temperature to which the controller should heat, in °F. The controller can retain this value while it is off.',
    ),
})

export type TemperatureSetting = z.infer<typeof temperature_setting>

const temperature_controller_field_header = `
      ---
      property_group_key: temperature_controllers
      undocumented: Unreleased.
      ---
`

const describeTemperatureControllerField = (description: string): string =>
  `${temperature_controller_field_header}      ${description}
      `

export const temperature_controller_fields = z.object({
  temperature_setting: temperature_setting
    .optional()
    .describe(
      describeTemperatureControllerField(
        "Current setting of the device's primary temperature controller.",
      ),
    ),
})
