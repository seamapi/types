import { z } from 'zod'

export const hvac_mode_setting = z.enum(['off', 'heat', 'cool', 'heatcool'])

export const climate_setting = z.object({
  automatic_heating_enabled: z.boolean(),
  automatic_cooling_enabled: z.boolean(),
  hvac_mode_setting: hvac_mode_setting,
  cooling_set_point_celsius: z.number().optional(),
  heating_set_point_celsius: z.number().optional(),
  cooling_set_point_fahrenheit: z.number().optional(),
  heating_set_point_fahrenheit: z.number().optional(),
  manual_override_allowed: z.boolean(),
})

export type ClimateSetting = z.infer<typeof climate_setting>

export type HvacModeSetting = z.infer<typeof hvac_mode_setting>

export type ClimateSettingMode = Pick<
  ClimateSetting,
  | 'automatic_cooling_enabled'
  | 'automatic_heating_enabled'
  | 'hvac_mode_setting'
>

export const normalizeClimateSettingMode = (
  cs: Partial<ClimateSetting>,
): ClimateSettingMode => {
  return {
    automatic_heating_enabled:
      cs.automatic_heating_enabled ??
      deriveAutomaticHeatingEnabledFromHvacModeSetting(cs.hvac_mode_setting),
    automatic_cooling_enabled:
      cs.automatic_cooling_enabled ??
      deriveAutomaticCoolingEnabledFromHvacModeSetting(cs.hvac_mode_setting),
    hvac_mode_setting:
      cs.hvac_mode_setting ??
      deriveHvacModeSettingFromFlags({
        automatic_cooling_enabled: cs.automatic_cooling_enabled ?? false,
        automatic_heating_enabled: cs.automatic_heating_enabled ?? false,
      }),
  }
}

/**
 * @param {ClimateSetting} cs
 * @returns {ClimateSetting}
 * @description
 * This function takes a Partial<ClimateSetting> and returns a new ClimateSetting with all fields filled in
 *
 */
export const normalizeClimateSetting = (
  cs: Partial<ClimateSetting>,
): ClimateSetting => {
  if (cs.manual_override_allowed === undefined)
    throw new Error('manual_override_allowed is required')

  let normalized_climate_setting: ClimateSetting = {
    ...normalizeClimateSettingMode(cs),
    manual_override_allowed: cs.manual_override_allowed,
  }

  // if the climate setting calls for cooling set points, we set them
  if (normalized_climate_setting.automatic_cooling_enabled) {
    normalized_climate_setting = {
      ...normalized_climate_setting,
      ...normalizeCoolingSetPoints(cs),
    }
  }

  // likewise for heating
  if (normalized_climate_setting.automatic_heating_enabled) {
    normalized_climate_setting = {
      ...normalized_climate_setting,
      ...normalizeHeatingSetPoints(cs),
    }
  }

  return normalized_climate_setting
}

export const deriveAutomaticHeatingEnabledFromHvacModeSetting = (
  hvac_mode_setting?: ClimateSetting['hvac_mode_setting'],
): boolean => hvac_mode_setting === 'heat' || hvac_mode_setting === 'heatcool'

export const deriveAutomaticCoolingEnabledFromHvacModeSetting = (
  hvac_mode_setting?: ClimateSetting['hvac_mode_setting'],
): boolean => hvac_mode_setting === 'cool' || hvac_mode_setting === 'heatcool'

export const deriveHvacModeSettingFromFlags = ({
  automatic_cooling_enabled,
  automatic_heating_enabled,
}: {
  automatic_cooling_enabled: boolean
  automatic_heating_enabled: boolean
}): ClimateSetting['hvac_mode_setting'] => {
  if (automatic_cooling_enabled && automatic_heating_enabled) return 'heatcool'
  if (automatic_cooling_enabled) return 'cool'
  if (automatic_heating_enabled) return 'heat'
  return 'off'
}

/**
 *
 * @param cs
 * @returns {Partial<ClimateSetting>}
 * This will look at what cooling set point is on the climate setting, and set the other temperature scale if neccessary.
 * For example, if a request comes in with a cooling_set_point_ceslius, we will set the cooling_set_point_fahrenheit as well.
 *
 */
const normalizeCoolingSetPoints = (
  cs: Partial<ClimateSetting>,
): Partial<ClimateSetting> => {
  const setPoints: Partial<ClimateSetting> = {}

  if (cs.cooling_set_point_celsius !== undefined) {
    setPoints.cooling_set_point_celsius = cs.cooling_set_point_celsius
  } else if (cs.cooling_set_point_fahrenheit !== undefined) {
    setPoints.cooling_set_point_celsius = convertToCelsius(
      cs.cooling_set_point_fahrenheit,
    )
  }

  if (cs.cooling_set_point_fahrenheit !== undefined) {
    setPoints.cooling_set_point_fahrenheit = cs.cooling_set_point_fahrenheit
  } else if (cs.cooling_set_point_celsius !== undefined) {
    setPoints.cooling_set_point_fahrenheit = convertToFahrenheit(
      cs.cooling_set_point_celsius,
    )
  }
  return setPoints
}

/**
 *
 * @param cs
 * @returns {Partial<ClimateSetting>}
 * This will look at what heating set point is on the climate setting, and set the other temperature scale.
 * For example, if a request comes in with a heating_set_point_ceslius, we will set the heating_set_point_fahrenheit as well.
 *
 */
const normalizeHeatingSetPoints = (
  cs: Partial<ClimateSetting>,
): Partial<ClimateSetting> => {
  const setPoints: Partial<ClimateSetting> = {}

  if (cs.heating_set_point_celsius !== undefined) {
    setPoints.heating_set_point_celsius = cs.heating_set_point_celsius
  } else if (cs.heating_set_point_fahrenheit !== undefined) {
    setPoints.heating_set_point_celsius = convertToCelsius(
      cs.heating_set_point_fahrenheit,
    )
  }

  if (cs.heating_set_point_fahrenheit !== undefined) {
    setPoints.heating_set_point_fahrenheit = cs.heating_set_point_fahrenheit
  } else if (cs.heating_set_point_celsius !== undefined) {
    setPoints.heating_set_point_fahrenheit = convertToFahrenheit(
      cs.heating_set_point_celsius,
    )
  }

  return setPoints
}

export const convertToFahrenheit = (celsius: number): number =>
  (celsius * 9) / 5 + 32

export const convertToCelsius = (fahrenheit: number): number =>
  (fahrenheit - 32) * (5 / 9)
