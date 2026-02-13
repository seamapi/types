import { z } from 'zod'

export const dormakaba_oracode_time_slot = z
  .object({
    name: z
      .string()
      .describe(`Name of a time slot for a dormakaba Oracode device.`),
    prefix: z
      .number()
      .describe(`Prefix for a time slot for a dormakaba Oracode device.`),
    // Seam TOD
    check_in_time: z
      .string()
      .describe(
        `Check in time for a time slot for a dormakaba Oracode device.`,
      ),
    // Seam TOD
    check_out_time: z
      .string()
      .describe(
        `Checkout time for a time slot for a dormakaba Oracode device.`,
      ),

    is_24_hour: z
      .boolean()
      .describe(
        `Indicates whether a time slot for a dormakaba Oracode device is a 24-hour time slot.`,
      ),
    is_biweekly_mode: z
      .boolean()
      .describe(
        `Indicates whether a time slot for a dormakaba Oracode device is in biweekly mode.`,
      ),
    is_one_shot: z
      .boolean()
      .describe(
        `Indicates whether a time slot for a dormakaba Oracode device is a one-shot time slot.`,
      ),
    is_master: z
      .boolean()
      .describe(
        `Indicates whether a time slot for a dormakaba Oracode device is a master time slot.`,
      ),

    ext_dormakaba_oracode_user_level_prefix: z
      .number()
      .describe(`Prefix for a user level for a dormakaba Oracode device.`),
    dormakaba_oracode_user_level_id: z
      .string()
      .uuid()
      .describe(`ID of a user level for a dormakaba Oracode device.`),
  })
  .describe(`Time slot for a dormakaba Oracode device.`)

export const device_metadata = z
  .object({
    august_metadata: z
      .object({
        lock_id: z.string().describe(`Lock ID for an August device.`),
        lock_name: z.string().describe(`Lock name for an August device.`),
        house_name: z.string().describe(`House name for an August device.`),
        has_keypad: z
          .boolean()
          .describe(`Indicates whether an August device has a keypad.`),
        keypad_battery_level: z
          .string()
          .optional()
          .describe(`Keypad battery level for an August device.`),
        model: z.string().optional().describe(`Model for an August device.`),
        house_id: z
          .string()
          .optional()
          .describe(`House ID for an August device.`),
      })
      .describe(`Metadata for an August device.`),

    avigilon_alta_metadata: z
      .object({
        entry_name: z
          .string()
          .describe(`Entry name for an Avigilon Alta system.`),
        org_name: z
          .string()
          .describe(`Organization name for an Avigilon Alta system.`),
        zone_id: z.number().describe(`Zone ID for an Avigilon Alta system.`),
        zone_name: z
          .string()
          .describe(`Zone name for an Avigilon Alta system.`),
        site_id: z.number().describe(`Site ID for an Avigilon Alta system.`),
        site_name: z
          .string()
          .describe(`Site name for an Avigilon Alta system.`),
        entry_relays_total_count: z
          .number()
          .describe(`Total count of entry relays for an Avigilon Alta system.`),
      })
      .describe(`Metadata for an Avigilon Alta system.`),

    schlage_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for a Schlage device.`),
        device_name: z.string().describe(`Device name for a Schlage device.`),
        model: z.string().optional().describe(`Model for a Schlage device.`),
      })
      .describe(`Metadata for a Schlage device.`),

    smartthings_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for a SmartThings device.`),
        device_name: z
          .string()
          .describe(`Device name for a SmartThings device.`),
        model: z
          .string()
          .optional()
          .describe(`Model for a SmartThings device.`),
        location_id: z
          .string()
          .optional()
          .describe(`Location ID for a SmartThings device.`),
      })
      .describe(`Metadata for a SmartThings device.`),

    lockly_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for a Lockly device.`),
        device_name: z.string().describe(`Device name for a Lockly device.`),
        model: z.string().optional().describe(`Model for a Lockly device.`),
      })
      .describe(`Metadata for a Lockly device.`),

    nuki_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for a Nuki device.`),
        device_name: z.string().describe(`Device name for a Nuki device.`),
        keypad_battery_critical: z
          .boolean()
          .optional()
          .describe(
            `Indicates whether the keypad battery is in a critical state for a Nuki device.`,
          ),
        keypad_paired: z
          .boolean()
          .optional()
          .describe(
            `Indicates whether the keypad is paired for a Nuki device.`,
          ),
        keypad_2_paired: z
          .boolean()
          .optional()
          .describe(`Indicates whether keypad 2 is paired for a Nuki device.`),
      })
      .describe(`Metadata for a Nuki device.`),

    kwikset_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for a Kwikset device.`),
        device_name: z.string().describe(`Device name for a Kwikset device.`),
        model_number: z.string().describe(`Model number for a Kwikset device.`),
      })
      .describe(`Metadata for a Kwikset device.`),
    salto_metadata: z.object({
      lock_id: z.string().describe(`Lock ID for a Salto device.`),
      customer_reference: z
        .string()
        .describe(`Customer reference for a Salto device.`),
      lock_type: z.string().describe(`Lock type for a Salto device.`),
      battery_level: z.string().describe(`Battery level for a Salto device.`),
      locked_state: z.string().describe(`Locked state for a Salto device.`),
      model: z.string().optional().describe(`Model for a Salto device.`),
    }).describe(`
    ---
    deprecated: Use \`salto_ks_metadata \` instead.
    ---
    Metada for a Salto device.
    `),
    salto_ks_metadata: z
      .object({
        lock_id: z.string().describe(`Lock ID for a Salto KS device.`),
        customer_reference: z
          .string()
          .describe(`Customer reference for a Salto KS device.`),
        lock_type: z.string().describe(`Lock type for a Salto KS device.`),
        battery_level: z
          .string()
          .describe(`Battery level for a Salto KS device.`),
        locked_state: z
          .string()
          .describe(`Locked state for a Salto KS device.`),
        model: z.string().optional().describe(`Model for a Salto KS device.`),
        has_custom_pin_subscription: z
          .boolean()
          .optional()
          .describe(
            `Indicates whether the site has a Salto KS subscription that supports custom PINs.`,
          ),
      })
      .describe(`Metadata for a Salto KS device.`),

    genie_metadata: z
      .object({
        device_name: z.string().describe(`Lock name for a Genie device.`),
        door_name: z.string().describe(`Door name for a Genie device.`),
      })
      .describe(`Metadata for a Genie device.`),

    brivo_metadata: z
      .object({
        device_name: z.string().describe(`Device name for a Brivo device.`),
        activation_enabled: z
          .boolean()
          .describe(
            `Indicates whether the Brivo access point has activation (remote unlock) enabled.`,
          ),
      })
      .partial()
      .describe(`Metadata for a Brivo device.`),

    igloo_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for an igloo device.`),
        bridge_id: z.string().describe(`Bridge ID for an igloo device.`),
        model: z.string().optional().describe(`Model for an igloo device.`),
      })
      .describe(`Metadata for an igloo device.`),

    noiseaware_metadata: z
      .object({
        device_model: z
          .enum(['indoor', 'outdoor'])
          .describe(`Device model for a NoiseAware device.`),
        noise_level_nrs: z
          .number()
          .describe(
            `Noise level, expressed as a Noise Risk Score (NRS), for a NoiseAware device.`,
          ),
        noise_level_decibel: z
          .number()
          .describe(`Noise level, in decibels, for a NoiseAware device.`),
        device_name: z
          .string()
          .describe(`Device name for a NoiseAware device.`),
        device_id: z.string().describe(`Device ID for a NoiseAware device.`),
      })
      .describe(`Metadata for a NoiseAware device.`),

    minut_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for a Minut device.`),
        device_name: z.string().describe(`Device name for a Minut device.`),
        latest_sensor_values: z
          .object({
            temperature: z
              .object({
                time: z
                  .string()
                  .describe(
                    `Time of latest temperature reading for a Minut device.`,
                  ),
                value: z
                  .number()
                  .describe(
                    `Value of latest temperature reading for a Minut device.`,
                  ),
              })
              .describe(`Latest temperature reading for a Minut device.`),
            sound: z
              .object({
                time: z
                  .string()
                  .describe(`Time of latest sound reading for a Minut device.`),
                value: z
                  .number()
                  .describe(
                    `Value of latest sound reading for a Minut device.`,
                  ),
              })
              .describe(`Latest sound reading for a Minut device.`),
            humidity: z
              .object({
                time: z
                  .string()
                  .describe(
                    `Time of latest humidity reading for a Minut device.`,
                  ),
                value: z
                  .number()
                  .describe(
                    `Value of latest humidity reading for a Minut device.`,
                  ),
              })
              .describe(`Latest humidity reading for a Minut device.`),
            pressure: z
              .object({
                time: z
                  .string()
                  .describe(
                    `Time of latest pressure reading for a Minut device.`,
                  ),
                value: z
                  .number()
                  .describe(
                    `Value of latest pressure reading for a Minut device.`,
                  ),
              })
              .describe(`Latest pressure reading for a Minut device.`),
            accelerometer_z: z
              .object({
                time: z
                  .string()
                  .describe(
                    `Time of latest accelerometer Z-axis reading for a Minut device.`,
                  ),
                value: z
                  .number()
                  .describe(
                    `Value of latest accelerometer Z-axis reading for a Minut device.`,
                  ),
              })
              .describe(
                `Latest accelerometer Z-axis reading for a Minut device.`,
              ),
          })
          .describe(`Latest sensor values for a Minut device.`),
      })
      .describe(`Metadata for a Minut device.`),
    four_suites_metadata: z
      .object({
        device_id: z.number().describe(`Device ID for a 4SUITES device.`),
        device_name: z.string().describe(`Device name for a 4SUITES device.`),
        reclose_delay_in_seconds: z
          .number()
          .describe(`Reclose delay, in seconds, for a 4SUITES device.`),
      })
      .describe(`Metadata for a 4SUITES device.`),

    two_n_metadata: z
      .object({
        device_id: z.number().describe(`Device ID for a 2N device.`),
        device_name: z.string().describe(`Device name for a 2N device.`),
      })
      .describe(`Metadata for a 2N device.`),

    controlbyweb_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for a ControlByWeb device.`),
        device_name: z
          .string()
          .describe(`Device name for a ControlByWeb device.`),
        relay_name: z
          .string()
          .nullable()
          .describe(`Relay name for a ControlByWeb device.`),
      })
      .describe(`Metadata for a ControlByWeb device.`),

    ttlock_metadata: z
      .object({
        lock_id: z.number().describe(`Lock ID for a TTLock device.`),
        lock_alias: z.string().describe(`Lock alias for a TTLock device.`),
        feature_value: z
          .string()
          .describe(`Feature value for a TTLock device.`),
        features: z
          .object({
            passcode: z
              .boolean()
              .describe(
                `Indicates whether a TTLock device supports a passcode.`,
              ),
            passcode_management: z
              .boolean()
              .describe(
                `Indicates whether a TTLock device supports passcode management.`,
              ),
            unlock_via_gateway: z
              .boolean()
              .describe(
                `Indicates whether a TTLock device supports unlock via gateway.`,
              ),
            lock_command: z
              .boolean()
              .describe(
                `Indicates whether a TTLock device supports the lock command.`,
              ),
            incomplete_keyboard_passcode: z
              .boolean()
              .describe(
                `Indicates whether a TTLock device supports an incomplete keyboard passcode.`,
              ),
            wifi: z
              .boolean()
              .describe(`Indicates whether a TTLock device supports Wi-Fi.`),
          })
          .describe(`Features for a TTLock device.`),
        has_gateway: z
          .boolean()
          .optional()
          .describe(`Indicates whether a TTLock device has a gateway.`),
        wireless_keypads: z
          .array(
            z.object({
              wireless_keypad_id: z
                .number()
                .describe(`ID for a wireless keypad for a TTLock device.`),
              wireless_keypad_name: z
                .string()
                .describe(`Name for a wireless keypad for a TTLock device.`),
            }),
          )
          .optional()
          .describe(`Wireless keypads for a TTLock device.`),
      })
      .describe(`Metadata for a TTLock device.`),

    seam_bridge_metadata: z
      .object({
        unlock_method: z
          .enum(['bridge', 'doorking'])
          .optional()
          .describe(`Unlock method for Seam Bridge.`),
        device_num: z.number().describe(`Device number for Seam Bridge.`),
        name: z.string().describe(`Name for Seam Bridge.`),
      })
      .describe(`Metadata for Seam Bridge.`),

    igloohome_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for an igloohome device.`),
        device_name: z
          .string()
          .describe(`Device name for an igloohome device.`),
        bridge_id: z
          .string()
          .optional()
          .describe(`Bridge ID for an igloohome device.`),
        bridge_name: z
          .string()
          .optional()
          .describe(`Bridge name for an igloohome device.`),
        keypad_id: z
          .string()
          .optional()
          .describe(`Keypad ID for an igloohome device.`),
        is_accessory_keypad_linked_to_bridge: z
          .boolean()
          .optional()
          .describe(
            `Indicates whether a keypad is linked to a bridge for an igloohome device.`,
          ),
      })
      .describe(`Metadata for an igloohome device.`),

    nest_metadata: z
      .object({
        nest_device_id: z
          .string()
          .describe(`Device ID for a Google Nest device.`),
        device_name: z
          .string()
          .describe(
            `Device name for a Google Nest device. Google sets this value.`,
          ), // set by Google
        device_custom_name: z
          .string()
          .describe(
            `Custom device name for a Google Nest device. The device owner sets this value.`,
          ), // set by device owner
        display_name: z
          .string()
          .optional()
          .describe(`Display name for a Google Nest device.`),
      })
      .describe(`Metadata for a Google Nest device.`),

    ecobee_metadata: z
      .object({
        ecobee_device_id: z
          .string()
          .describe(`Device ID for an ecobee device.`),
        device_name: z.string().describe(`Device name for an ecobee device.`),
      })
      .describe(`Metadata for an ecobee device.`),

    honeywell_resideo_metadata: z
      .object({
        honeywell_resideo_device_id: z
          .string()
          .describe(`Device ID for a Honeywell Resideo device.`),
        device_name: z
          .string()
          .describe(`Device name for a Honeywell Resideo device.`),
      })
      .describe(`Metadata for a Honeywell Resideo device.`),

    dormakaba_oracode_metadata: z
      .object({
        door_id: z
          .number()
          .optional()
          .describe(`Door ID for a dormakaba Oracode device.`),
        door_name: z
          .string()
          .describe(`Door name for a dormakaba Oracode device.`),
        device_id: z
          .number()
          .or(z.string())
          .optional()
          .describe(`Device ID for a dormakaba Oracode device.`),
        door_is_wireless: z
          .boolean()
          .describe(
            `Indicates whether a door is wireless for a dormakaba Oracode device.`,
          ),
        site_id: z.number().nullable().describe(`
          ---
          deprecated: Previously marked as "@DEPRECATED."
          ---
          Site ID for a dormakaba Oracode device.
          `),
        site_name: z
          .string()
          .describe(`Site name for a dormakaba Oracode device.`),
        iana_timezone: z
          .string()
          .optional()
          .describe(`IANA time zone for a dormakaba Oracode device.`),
        predefined_time_slots: z
          .array(dormakaba_oracode_time_slot)
          .optional()
          .describe(`Predefined time slots for a dormakaba Oracode device.`),
      })
      .describe(`Metadata for a dormakaba Oracode device.`),

    wyze_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for a Wyze device.`),
        device_name: z.string().describe(`Device name for a Wyze device.`),
        product_name: z.string().describe(`Product name for a Wyze device.`),
        product_type: z.string().describe(`Product type for a Wyze device.`),
        product_model: z.string().describe(`Product model for a Wyze device.`),
        device_info_model: z
          .string()
          .describe(`Device information model for a Wyze device.`),
        keypad_uuid: z
          .string()
          .optional()
          .describe(`Keypad UUID for a Wyze device.`),
        locker_status_hardlock: z
          .number()
          .optional()
          .describe(`Locker status (hardlock) for a Wyze device.`),
      })
      .describe(`Metadata for a Wyze device.`),

    tedee_metadata: z
      .object({
        device_id: z.number().describe(`Device ID for a Tedee device.`),
        serial_number: z.string().describe(`Serial number for a Tedee device.`),
        device_name: z.string().describe(`Device name for a Tedee device.`),
        device_model: z.string().describe(`Device model for a Tedee device.`),
        bridge_id: z.number().describe(`Bridge ID for a Tedee device.`),
        bridge_name: z.string().describe(`Bridge name for a Tedee device.`),
        keypad_id: z
          .number()
          .optional()
          .describe(`Keypad ID for a Tedee device.`),
      })
      .describe(`Metadata for a Tedee device.`),

    visionline_metadata: z
      .object({
        encoder_id: z
          .string()
          .describe(`Encoder ID for an ASSA ABLOY Visionline system.`),
      })
      .describe(`Metadata for an ASSA ABLOY Visionline system.`),

    akiles_metadata: z
      .object({
        gadget_name: z.string().describe(`Gadget name for an Akiles device.`),
        gadget_id: z.string().describe(`Gadget ID for an Akiles device.`),
        product_name: z.string().describe(`Product name for an Akiles device.`),

        /**
         * Group ID to add users to for this device
         */
        _member_group_id: z
          .string()
          .optional()
          .describe(`Group ID to which to add users for an Akiles device.`),
      })
      .describe(`Metadata for an Akiles device.`),
    assa_abloy_vostio_metadata: z
      .object({
        encoder_name: z
          .string()
          .describe(`Encoder name for an ASSA ABLOY Vostio system.`),
      })
      .describe(`Metadata for an ASSA ABLOY Vostio system.`),

    tado_metadata: z
      .object({
        serial_no: z.string().describe(`Serial number for a tado° device.`),
        device_type: z.string().describe(`Device type for a tado° device.`),
      })
      .describe(`Metadata for a tado° device.`),

    sensi_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for a Sensi device.`),
        device_name: z.string().describe(`Device name for a Sensi device.`),
        product_type: z.string().describe(`Product type for a Sensi device.`),
      })
      .describe(`Metadata for a Sensi device.`),

    keynest_metadata: z
      .object({
        key_id: z.string().describe(`Key ID for a KeyNest device.`),
        device_name: z.string().describe(`Device name for a KeyNest device.`),
        property_id: z
          .string()
          .nullable()
          .describe(`Property ID for a KeyNest device.`),
        property_postcode: z
          .string()
          .nullable()
          .describe(`Property postcode for a KeyNest device.`),
        key_notes: z
          .string()
          .nullable()
          .describe(`Key notes for a KeyNest device.`),
        subscription_plan: z
          .string()
          .describe(`Subscription plan for a KeyNest device.`),
        status_type: z.string().describe(`Status type for a KeyNest device.`),
        current_or_last_store_id: z
          .number()
          .describe(`Current or last store ID for a KeyNest device.`),
        last_movement: z
          .string()
          .describe(`Last movement timestamp for a KeyNest device.`),
        address: z
          .string()
          .nullable()
          .describe(`Address for a KeyNest device.`),
        current_status: z
          .string()
          .nullable()
          .describe(`Current status for a KeyNest device.`),
        current_user_name: z
          .string()
          .nullable()
          .describe(`Current user name for a KeyNest device.`),
        current_user_email: z
          .string()
          .nullable()
          .describe(`Current user email for a KeyNest device.`),
        current_user_phone_number: z
          .string()
          .nullable()
          .describe(`Current user phone number for a KeyNest device.`),
        current_user_company: z
          .string()
          .nullable()
          .describe(`Current user company for a KeyNest device.`),
        handover_method: z
          .string()
          .nullable()
          .describe(`Handover method for a KeyNest device.`),
        keynest_app_user: z
          .string()
          .nullable()
          .describe(`KeyNest app user for a KeyNest device.`),
        default_office_id: z
          .number()
          .describe(`Default office ID for a KeyNest device.`),
        fob_id: z.number().describe(`Fob ID for a KeyNest device.`),
        has_photo: z
          .boolean()
          .describe(`Whether the KeyNest device has a photo.`),
        is_quadient_locker: z
          .boolean()
          .optional()
          .describe(
            `Whether the key is in a locker that does not support the access codes API.`,
          ),
      })
      .partial()
      .describe(`Metadata for a KeyNest device.`),

    ultraloq_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for an Ultraloq device.`),
        device_name: z.string().describe(`Device name for an Ultraloq device.`),
        device_type: z.string().describe(`Device type for an Ultraloq device.`),
        time_zone: z
          .string()
          .nullable()
          .describe(`IANA timezone for the Ultraloq device.`),
      })
      .describe(`Metadata for an Ultraloq device.`),

    korelock_metadata: z
      .object({
        device_id: z.string().describe(`Device ID for a Korelock device.`),
        device_name: z.string().describe(`Device name for a Korelock device.`),
        model_code: z.string().describe(`Model code for a Korelock device.`),
        serial_number: z
          .string()
          .describe(`Serial number for a Korelock device.`),
        firmware_version: z
          .string()
          .describe(`Firmware version for a Korelock device.`),
        wifi_signal_strength: z
          .number()
          .describe(`WiFi signal strength (0-1) for a Korelock device.`),
        location_id: z
          .string()
          .nullable()
          .describe(
            `Location ID for a Korelock device. Required for timebound access codes.`,
          ),
      })
      .partial()
      .describe(`Metadata for a Korelock device.`),
  })
  .partial().describe(`
          ---
          property_group_key: provider_metadata
          ---
          Provider-specific metadata.
          `)

export type DeviceMetadata = z.infer<typeof device_metadata>
