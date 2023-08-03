import { z } from 'zod'

export const device_metadata = z
  .object({
    august_metadata: z.object({
      lock_id: z.string(),
      lock_name: z.string(),
      house_name: z.string(),
      has_keypad: z.boolean(),
      keypad_battery_level: z.string().optional(),
      model: z.string().optional(),
      house_id: z.string().optional(),
    }),

    schlage_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      access_code_length: z.number(),
      model: z.string().optional(),
    }),

    smartthings_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      model: z.string().optional(),
      location_id: z.string().optional(),
    }),

    lockly_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      model: z.string().optional(),
    }),

    nuki_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      keypad_battery_critical: z.boolean().optional(),
    }),

    kwikset_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      model_number: z.string(),
    }),

    salto_metadata: z.object({
      lock_id: z.string(),
      customer_reference: z.string(),
      lock_type: z.string(),
      battery_level: z.string(),
      locked_state: z.string(),
      model: z.string().optional(),
    }),

    genie_metadata: z.object({
      device_name: z.string(),
      door_name: z.string(),
    }),

    brivo_metadata: z.object({
      device_name: z.string(),
    }),

    igloo_metadata: z.object({
      device_id: z.string(),
      bridge_id: z.string(),
      model: z.string().optional(),
    }),

    noiseaware_metadata: z.object({
      device_model: z.enum(['indoor', 'outdoor']),
      noise_level_nrs: z.number(),
      noise_level_decibel: z.number(),
      device_name: z.string(),
      device_id: z.string(),
    }),

    minut_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      latest_sensor_values: z.object({
        temperature: z.object({
          time: z.string(),
          value: z.number(),
        }),
        sound: z.object({
          time: z.string(),
          value: z.number(),
        }),
        humidity: z.object({
          time: z.string(),
          value: z.number(),
        }),
        pressure: z.object({
          time: z.string(),
          value: z.number(),
        }),
        accelerometer_z: z.object({
          time: z.string(),
          value: z.number(),
        }),
      }),
    }),

    two_n_metadata: z.object({
      device_id: z.number(),
      device_name: z.string(),
    }),

    controlbyweb_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      relay_name: z.string().nullable(),
    }),

    ttlock_metadata: z.object({
      lock_id: z.number(),
      lock_alias: z.string(),
    }),

    seam_bridge_metadata: z.object({
      unlock_method: z.enum(['bridge', 'doorking']).optional(),
      device_num: z.number(),
      name: z.string(),
    }),

    igloohome_metadata: z.object({
      device_id: z.string(),
      bridge_id: z.string(),
      device_name: z.string(),
      bridge_name: z.string(),
    }),

    nest_metadata: z.object({
      nest_device_id: z.string(),
      device_name: z.string(), // set by Google
      custom_name: z.string(), // set by device owner
    }),

    ecobee_metadata: z.object({
      ecobee_device_id: z.string(),
      device_name: z.string(),
      min_heating_set_point_fahrenheit: z.number().optional(),
      max_heating_set_point_fahrenheit: z.number().optional(),
      min_cooling_set_point_fahrenheit: z.number().optional(),
      max_cooling_set_point_fahrenheit: z.number().optional(),
      min_heating_set_point_celsius: z.number().optional(),
      max_heating_set_point_celsius: z.number().optional(),
      min_cooling_set_point_celsius: z.number().optional(),
      max_cooling_set_point_celsius: z.number().optional(),
      min_delta_heat_cool_set_points_fahrenheit: z.number().optional(),
      min_delta_heat_cool_set_points_celsius: z.number().optional(),
    }),

    hubitat_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      device_label: z.string(),
    }),
  })
  .partial()
