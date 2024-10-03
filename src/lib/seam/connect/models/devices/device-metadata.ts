import { z } from 'zod'

export const dormakaba_oracode_time_slot = z.object({
  name: z.string(),
  prefix: z.number(),
  // Seam TOD
  check_in_time: z.string(),
  // Seam TOD
  check_out_time: z.string(),

  is_24_hour: z.boolean(),
  is_biweekly_mode: z.boolean(),
  is_one_shot: z.boolean(),
  is_master: z.boolean(),

  ext_dormakaba_oracode_user_level_prefix: z.number(),
  dormakaba_oracode_user_level_id: z.string().uuid(),
})

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

    avigilon_alta_metadata: z.object({
      entry_name: z.string(),
      org_name: z.string(),
      zone_id: z.number(),
      zone_name: z.string(),
      site_id: z.number(),
      site_name: z.string(),
      entry_relays_total_count: z.number(),
    }),

    schlage_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      access_code_length: z.number().nullable(),
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
      keypad_paired: z.boolean().optional(),
      keypad_2_paired: z.boolean().optional(),
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
    four_suites_metadata: z.object({
      device_id: z.number(),
      device_name: z.string(),
      reclose_delay_in_seconds: z.number(),
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
      feature_value: z.string(),
      features: z.object({
        passcode: z.boolean(),
        passcode_management: z.boolean(),
        unlock_via_gateway: z.boolean(),
        lock_command: z.boolean(),
        incomplete_keyboard_passcode: z.boolean(),
      }),
      has_gateway: z.boolean().optional(),
      wireless_keypads: z
        .array(
          z.object({
            wireless_keypad_id: z.number(),
            wireless_keypad_name: z.string(),
          }),
        )
        .optional(),
    }),

    seam_bridge_metadata: z.object({
      unlock_method: z.enum(['bridge', 'doorking']).optional(),
      device_num: z.number(),
      name: z.string(),
    }),

    igloohome_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      bridge_id: z.string().optional(),
      bridge_name: z.string().optional(),
      keypad_id: z.string().optional(),
    }),

    nest_metadata: z.object({
      nest_device_id: z.string(),
      device_name: z.string(), // set by Google
      custom_name: z.string(), // set by device owner
    }),

    ecobee_metadata: z.object({
      ecobee_device_id: z.string(),
      device_name: z.string(),
    }),

    honeywell_resideo_metadata: z.object({
      honeywell_resideo_device_id: z.string(),
      device_name: z.string(),
    }),

    hubitat_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      device_label: z.string(),
    }),

    dormakaba_oracode_metadata: z.object({
      door_id: z.number().optional(),
      door_name: z.string(),
      device_id: z.number().or(z.string()).optional(),
      door_is_wireless: z.boolean(),
      site_id: z.number().nullable().describe('@DEPRECATED'),
      site_name: z.string(),
      iana_timezone: z.string().optional(),
      predefined_time_slots: z.array(dormakaba_oracode_time_slot).optional(),
    }),

    wyze_metadata: z.object({
      device_id: z.string(),
      device_name: z.string(),
      product_name: z.string(),
      product_type: z.string(),
      product_model: z.string(),
      device_info_model: z.string(),
      keypad_uuid: z.string().optional(),
      locker_status_hardlock: z.number().optional(),
    }),

    tedee_metadata: z.object({
      device_id: z.number(),
      serial_number: z.string(),
      device_name: z.string(),
      device_model: z.string(),
      bridge_id: z.number(),
      bridge_name: z.string(),
      keypad_id: z.number().optional(),
    }),

    visionline_metadata: z.object({
      encoder_id: z.string(),
    }),

    akiles_metadata: z.object({
      gadget_name: z.string(),
      gadget_id: z.string(),
    }),
  })
  .partial()

export type DeviceMetadata = z.infer<typeof device_metadata>
