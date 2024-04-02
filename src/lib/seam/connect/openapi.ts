export default {
  components: {
    schemas: {
      access_code: {
        properties: {
          access_code_id: {
            description: 'Unique identifier for the access code.',
            format: 'uuid',
            type: 'string',
          },
          code: {
            description:
              'Code used for access. Typically, a numeric or alphanumeric string.',
            nullable: true,
            type: 'string',
          },
          common_code_key: {
            description:
              'Unique identifier for a group of access codes that share the same code.',
            nullable: true,
            type: 'string',
          },
          created_at: {
            description: 'Date and time at which the access code was created.',
            format: 'date-time',
            type: 'string',
          },
          device_id: {
            description:
              'Unique identifier for the device associated with the access code.',
            format: 'uuid',
            type: 'string',
          },
          ends_at: {
            description:
              'Date and time after which the time-bound access code becomes inactive.',
            format: 'date-time',
            nullable: true,
            type: 'string',
          },
          errors: {
            description:
              'Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues.',
            nullable: true,
          },
          is_backup: {
            description: 'Indicates whether the access code is a backup code.',
            type: 'boolean',
          },
          is_backup_access_code_available: {
            description:
              'Indicates whether a backup access code is available for use if the primary access code is lost or compromised.',
            type: 'boolean',
          },
          is_external_modification_allowed: {
            description:
              'Indicates whether changes to the access code from external sources are permitted.',
            type: 'boolean',
          },
          is_managed: {
            description: 'Indicates whether Seam manages the access code.',
            enum: [true],
            type: 'boolean',
          },
          is_offline_access_code: {
            description:
              'Indicates whether the access code is intended for use in offline scenarios. If "true," this code can be created on a device without a network connection.',
            type: 'boolean',
          },
          is_one_time_use: {
            description:
              'Indicates whether the access code can only be used once. If "true," the code becomes invalid after the first use.',
            type: 'boolean',
          },
          is_scheduled_on_device: {
            description:
              'Indicates whether the code is set on the device according to a preconfigured schedule.',
            type: 'boolean',
          },
          is_waiting_for_code_assignment: {
            description:
              'Indicates whether the access code is waiting for a code assignment.',
            type: 'boolean',
          },
          name: {
            description:
              'Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes.',
            nullable: true,
            type: 'string',
          },
          pulled_backup_access_code_id: {
            description:
              'Identifier of the pulled backup access code. Used to associate the pulled backup access code with the original access code.',
            format: 'uuid',
            nullable: true,
            type: 'string',
          },
          starts_at: {
            description:
              'Date and time at which the time-bound access code becomes active.',
            format: 'date-time',
            nullable: true,
            type: 'string',
          },
          status: {
            description:
              '\n    Current status of the access code within the operational lifecycle. Values are "setting," a transitional phase that indicates that the code is being configured or activated; "set", which indicates that the code is active and operational; "unset," which indicates a deactivated or unused state, either before activation or after deliberate deactivation; "removing," which indicates a transitional period in which the code is being deleted or made inactive; and "unknown," which indicates an indeterminate state, due to reasons such as system errors or incomplete data, that highlights a potential need for system review or troubleshooting.\n  ',
            enum: ['setting', 'set', 'unset', 'removing', 'unknown'],
            type: 'string',
          },
          type: {
            description:
              'Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration.',
            enum: ['time_bound', 'ongoing'],
            type: 'string',
          },
          warnings: {
            description:
              'Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention.',
            nullable: true,
          },
        },
        required: [
          'common_code_key',
          'type',
          'access_code_id',
          'device_id',
          'name',
          'code',
          'created_at',
          'is_managed',
          'status',
          'is_backup_access_code_available',
          'is_external_modification_allowed',
          'is_one_time_use',
          'is_offline_access_code',
        ],
        type: 'object',
      },
      acs_access_group: {
        properties: {
          access_group_type: {
            description:
              '\n    ---\n    deprecated: use external_type\n    ---\n  ',
            enum: [
              'pti_unit',
              'pti_access_level',
              'salto_access_group',
              'brivo_group',
            ],
            type: 'string',
          },
          access_group_type_display_name: {
            description:
              '\n    ---\n    deprecated: use external_type_display_name\n    ---\n    ',
            type: 'string',
          },
          acs_access_group_id: { format: 'uuid', type: 'string' },
          acs_system_id: { format: 'uuid', type: 'string' },
          created_at: { format: 'date-time', type: 'string' },
          external_type: {
            enum: [
              'pti_unit',
              'pti_access_level',
              'salto_access_group',
              'brivo_group',
            ],
            type: 'string',
          },
          external_type_display_name: { type: 'string' },
          name: { type: 'string' },
          workspace_id: { format: 'uuid', type: 'string' },
        },
        required: [
          'acs_access_group_id',
          'acs_system_id',
          'workspace_id',
          'name',
          'access_group_type',
          'access_group_type_display_name',
          'external_type',
          'external_type_display_name',
          'created_at',
        ],
        type: 'object',
      },
      acs_system: {
        properties: {
          acs_system_id: { format: 'uuid', type: 'string' },
          can_automate_enrollment: { type: 'boolean' },
          connected_account_ids: { items: { type: 'string' }, type: 'array' },
          created_at: { format: 'date-time', type: 'string' },
          external_type: {
            enum: [
              'pti_site',
              'alta_org',
              'salto_site',
              'brivo_account',
              'hid_credential_manager_organization',
              'visionline_system',
              'assa_abloy_credential_service',
              'latch_building',
            ],
            type: 'string',
          },
          external_type_display_name: { type: 'string' },
          image_alt_text: { type: 'string' },
          image_url: { type: 'string' },
          name: { type: 'string' },
          system_type: {
            description:
              '\n      ---\n      deprecated: use external_type\n      ---\n      ',
            enum: [
              'pti_site',
              'alta_org',
              'salto_site',
              'brivo_account',
              'hid_credential_manager_organization',
              'visionline_system',
              'assa_abloy_credential_service',
              'latch_building',
            ],
            type: 'string',
          },
          system_type_display_name: {
            description:
              '\n      ---\n      deprecated: use external_type_display_name\n      ---\n      ',
            type: 'string',
          },
          workspace_id: { format: 'uuid', type: 'string' },
        },
        required: [
          'acs_system_id',
          'external_type',
          'external_type_display_name',
          'system_type',
          'system_type_display_name',
          'name',
          'created_at',
          'workspace_id',
          'connected_account_ids',
          'image_url',
          'image_alt_text',
        ],
        type: 'object',
      },
      acs_user: {
        properties: {
          access_schedule: {
            properties: {
              ends_at: { format: 'date-time', type: 'string' },
              starts_at: { format: 'date-time', type: 'string' },
            },
            required: ['starts_at', 'ends_at'],
            type: 'object',
          },
          acs_system_id: { format: 'uuid', type: 'string' },
          acs_user_id: { format: 'uuid', type: 'string' },
          created_at: { format: 'date-time', type: 'string' },
          display_name: { type: 'string' },
          email: {
            description:
              '\n    ---\n    deprecated: use email_address.\n    ---\n    ',
            format: 'email',
            type: 'string',
          },
          email_address: { format: 'email', type: 'string' },
          external_type: {
            enum: [
              'pti_user',
              'brivo_user',
              'hid_credential_manager_user',
              'salto_site_user',
            ],
            type: 'string',
          },
          external_type_display_name: { type: 'string' },
          full_name: { type: 'string' },
          hid_acs_system_id: { format: 'uuid', type: 'string' },
          is_suspended: { type: 'boolean' },
          phone_number: { nullable: true, type: 'string' },
          user_identity_email_address: { type: 'string' },
          user_identity_id: { type: 'string' },
          user_identity_phone_number: { type: 'string' },
          workspace_id: { format: 'uuid', type: 'string' },
        },
        required: [
          'acs_user_id',
          'acs_system_id',
          'workspace_id',
          'created_at',
          'display_name',
          'is_suspended',
        ],
        type: 'object',
      },
      action_attempt: {
        discriminator: { propertyName: 'status' },
        oneOf: [
          {
            properties: {
              action_attempt_id: { format: 'uuid', type: 'string' },
              action_type: { type: 'string' },
              error: { format: 'null', nullable: true, type: 'string' },
              result: { nullable: true },
              status: { enum: ['success'], type: 'string' },
            },
            required: ['status', 'action_type', 'action_attempt_id', 'error'],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: { format: 'uuid', type: 'string' },
              action_type: { type: 'string' },
              error: { format: 'null', nullable: true, type: 'string' },
              result: { format: 'null', nullable: true, type: 'string' },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'status',
              'action_type',
              'action_attempt_id',
              'result',
              'error',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: { format: 'uuid', type: 'string' },
              action_type: { type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { format: 'null', nullable: true, type: 'string' },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'status',
              'action_type',
              'action_attempt_id',
              'result',
              'error',
            ],
            type: 'object',
          },
        ],
      },
      client_session: {
        properties: {
          client_session_id: { format: 'uuid', type: 'string' },
          connect_webview_ids: {
            items: { format: 'uuid', type: 'string' },
            type: 'array',
          },
          connected_account_ids: {
            items: { format: 'uuid', type: 'string' },
            type: 'array',
          },
          created_at: { format: 'date-time', type: 'string' },
          device_count: { type: 'number' },
          token: { type: 'string' },
          user_identifier_key: { nullable: true, type: 'string' },
          user_identity_ids: {
            items: { format: 'uuid', type: 'string' },
            type: 'array',
          },
          workspace_id: { format: 'uuid', type: 'string' },
        },
        required: [
          'client_session_id',
          'user_identifier_key',
          'created_at',
          'token',
          'device_count',
          'connected_account_ids',
          'connect_webview_ids',
          'user_identity_ids',
          'workspace_id',
        ],
        type: 'object',
      },
      climate_setting_schedule: {
        properties: {
          automatic_cooling_enabled: { type: 'boolean' },
          automatic_heating_enabled: { type: 'boolean' },
          climate_setting_schedule_id: { format: 'uuid', type: 'string' },
          cooling_set_point_celsius: { type: 'number' },
          cooling_set_point_fahrenheit: { type: 'number' },
          created_at: { format: 'date-time', type: 'string' },
          device_id: { format: 'uuid', type: 'string' },
          errors: {
            description:
              'Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues.',
            nullable: true,
          },
          heating_set_point_celsius: { type: 'number' },
          heating_set_point_fahrenheit: { type: 'number' },
          hvac_mode_setting: {
            enum: ['off', 'heat', 'cool', 'heat_cool'],
            type: 'string',
          },
          manual_override_allowed: { type: 'boolean' },
          name: { type: 'string' },
          schedule_ends_at: { type: 'string' },
          schedule_starts_at: { type: 'string' },
          schedule_type: { enum: ['time_bound'], type: 'string' },
        },
        required: [
          'climate_setting_schedule_id',
          'schedule_type',
          'device_id',
          'schedule_starts_at',
          'schedule_ends_at',
          'created_at',
        ],
        type: 'object',
      },
      connect_webview: {
        properties: {
          accepted_devices: { items: { type: 'string' }, type: 'array' },
          accepted_providers: { items: { type: 'string' }, type: 'array' },
          any_device_allowed: { type: 'boolean' },
          any_provider_allowed: { type: 'boolean' },
          authorized_at: {
            format: 'date-time',
            nullable: true,
            type: 'string',
          },
          automatically_manage_new_devices: { type: 'boolean' },
          connect_webview_id: { format: 'uuid', type: 'string' },
          connected_account_id: { format: 'uuid', type: 'string' },
          created_at: { format: 'date-time', type: 'string' },
          custom_metadata: {
            additionalProperties: {
              oneOf: [{ type: 'string' }, { type: 'boolean' }],
            },
            type: 'object',
          },
          custom_redirect_failure_url: {
            format: 'uri',
            nullable: true,
            type: 'string',
          },
          custom_redirect_url: {
            format: 'uri',
            nullable: true,
            type: 'string',
          },
          device_selection_mode: {
            enum: ['none', 'single', 'multiple'],
            type: 'string',
          },
          login_successful: { type: 'boolean' },
          selected_provider: { nullable: true, type: 'string' },
          status: { enum: ['pending', 'failed', 'authorized'], type: 'string' },
          url: { format: 'uri', type: 'string' },
          wait_for_device_creation: { type: 'boolean' },
          workspace_id: { format: 'uuid', type: 'string' },
        },
        required: [
          'connect_webview_id',
          'url',
          'workspace_id',
          'device_selection_mode',
          'accepted_providers',
          'accepted_devices',
          'any_provider_allowed',
          'any_device_allowed',
          'created_at',
          'login_successful',
          'status',
          'custom_redirect_url',
          'custom_redirect_failure_url',
          'custom_metadata',
          'automatically_manage_new_devices',
          'wait_for_device_creation',
          'authorized_at',
          'selected_provider',
        ],
        type: 'object',
      },
      connected_account: {
        properties: {
          account_type: { type: 'string' },
          account_type_display_name: { type: 'string' },
          automatically_manage_new_devices: { type: 'boolean' },
          connected_account_id: { format: 'uuid', type: 'string' },
          created_at: { format: 'date-time', type: 'string' },
          custom_metadata: {
            additionalProperties: {
              oneOf: [{ type: 'string' }, { type: 'boolean' }],
            },
            type: 'object',
          },
          errors: { nullable: true },
          user_identifier: {
            properties: {
              api_url: { type: 'string' },
              email: { type: 'string' },
              exclusive: { type: 'boolean' },
              phone: { type: 'string' },
              username: { type: 'string' },
            },
            type: 'object',
          },
          warnings: { nullable: true },
        },
        required: [
          'account_type_display_name',
          'custom_metadata',
          'automatically_manage_new_devices',
        ],
        type: 'object',
      },
      device: {
        properties: {
          can_program_online_access_codes: { type: 'boolean' },
          can_remotely_lock: { type: 'boolean' },
          can_remotely_unlock: { type: 'boolean' },
          can_simulate_removal: { type: 'boolean' },
          capabilities_supported: {
            description:
              'Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health.',
            items: {
              enum: [
                'access_code',
                'lock',
                'noise_detection',
                'thermostat',
                'battery',
                'phone',
              ],
              type: 'string',
            },
            type: 'array',
          },
          connected_account_id: {
            description:
              'Unique identifier for the account associated with the device.',
            format: 'uuid',
            type: 'string',
          },
          created_at: {
            description:
              'Date and time at which the device object was created.',
            format: 'date-time',
            type: 'string',
          },
          custom_metadata: {
            additionalProperties: {
              oneOf: [{ type: 'string' }, { type: 'boolean' }],
            },
            type: 'object',
          },
          device_id: {
            description: 'Unique identifier for the device.',
            format: 'uuid',
            type: 'string',
          },
          device_type: {
            description: 'Type of the device.',
            oneOf: [
              {
                enum: [
                  'akuvox_lock',
                  'august_lock',
                  'brivo_access_point',
                  'butterflymx_panel',
                  'avigilon_alta_entry',
                  'doorking_lock',
                  'genie_door',
                  'igloo_lock',
                  'linear_lock',
                  'lockly_lock',
                  'kwikset_lock',
                  'nuki_lock',
                  'salto_lock',
                  'schlage_lock',
                  'seam_relay',
                  'smartthings_lock',
                  'wyze_lock',
                  'yale_lock',
                  'two_n_intercom',
                  'controlbyweb_device',
                  'ttlock_lock',
                  'igloohome_lock',
                  'hubitat_lock',
                  'four_suites_door',
                  'dormakaba_oracode_door',
                  'tedee_lock',
                ],
                type: 'string',
              },
              {
                enum: ['noiseaware_activity_zone', 'minut_sensor'],
                type: 'string',
              },
              {
                enum: [
                  'ecobee_thermostat',
                  'nest_thermostat',
                  'honeywell_resideo_thermostat',
                ],
                type: 'string',
              },
              { enum: ['ios_phone', 'android_phone'], type: 'string' },
            ],
          },
          display_name: {
            description:
              'Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices.',
            type: 'string',
          },
          errors: {
            description:
              'Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.',
            items: {
              properties: {
                error_code: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['error_code', 'message'],
              type: 'object',
            },
            type: 'array',
          },
          is_managed: {
            description: 'Indicates whether Seam manages the device.',
            enum: [true],
            type: 'boolean',
          },
          location: {
            description: 'Location information for the device.',
            nullable: true,
            properties: {
              location_name: {
                description: 'Name of the device location.',
                type: 'string',
              },
              timezone: {
                description: 'Time zone of the device location.',
                type: 'string',
              },
            },
            type: 'object',
          },
          nickname: {
            description:
              'Optional nickname to describe the device, settable through Seam',
            type: 'string',
          },
          properties: {
            allOf: [
              {
                allOf: [
                  {
                    allOf: [
                      {
                        properties: {
                          accessory_keypad: {
                            description:
                              'Represents the accessory keypad state.',
                            properties: {
                              battery: {
                                description:
                                  'Indicates if the keypad battery properties.',
                                properties: {
                                  level: {
                                    maximum: 1,
                                    minimum: 0,
                                    type: 'number',
                                  },
                                },
                                required: ['level'],
                                type: 'object',
                              },
                              is_connected: {
                                description:
                                  'Indicates if the accessory_keypad is connected to the device.',
                                type: 'boolean',
                              },
                            },
                            required: ['is_connected'],
                            type: 'object',
                          },
                          appearance: {
                            properties: {
                              name: {
                                description:
                                  'Name of the device as seen from the provider API and application, not settable through Seam.',
                                type: 'string',
                              },
                            },
                            required: ['name'],
                            type: 'object',
                          },
                          battery: {
                            description:
                              'Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage.',
                            properties: {
                              level: { maximum: 1, minimum: 0, type: 'number' },
                              status: {
                                enum: ['critical', 'low', 'good', 'full'],
                                type: 'string',
                              },
                            },
                            required: ['level', 'status'],
                            type: 'object',
                          },
                          battery_level: {
                            description:
                              'Indicates the battery level of the device as a decimal value between 0 and 1, inclusive.',
                            maximum: 1,
                            minimum: 0,
                            type: 'number',
                          },
                          has_direct_power: {
                            description:
                              'Indicates whether the device has direct power.',
                            type: 'boolean',
                          },
                          image_alt_text: {
                            description: 'Alt text for the device image.',
                            type: 'string',
                          },
                          image_url: {
                            description: 'Image URL for the device.',
                            format: 'uri',
                            type: 'string',
                          },
                          manufacturer: {
                            description: 'Manufacturer of the device.',
                            type: 'string',
                          },
                          model: {
                            properties: {
                              accessory_keypad_supported: {
                                description:
                                  'Indicates whether the device supports an accessory keypad.',
                                type: 'boolean',
                              },
                              can_connect_accessory_keypad: {
                                description:
                                  'Indicates whether the device can connect a accessory keypad.',
                                type: 'boolean',
                              },
                              display_name: {
                                description:
                                  'Display name of the device model.',
                                type: 'string',
                              },
                              has_built_in_keypad: {
                                description:
                                  'Indicates whether the device has a built in accessory keypad.',
                                type: 'boolean',
                              },
                              manufacturer_display_name: {
                                description:
                                  'Display name that corresponds to the manufacturer-specific terminology for the device.',
                                type: 'string',
                              },
                              offline_access_codes_supported: {
                                description:
                                  'Indicates whether the device supports offline access codes.',
                                type: 'boolean',
                              },
                              online_access_codes_supported: {
                                description:
                                  'Indicates whether the device supports online access codes.',
                                type: 'boolean',
                              },
                            },
                            required: [
                              'display_name',
                              'manufacturer_display_name',
                            ],
                            type: 'object',
                          },
                          name: {
                            description:
                              '\n      ---\n      deprecated: use device.display_name instead\n      ---\n      Name of the device.\n      ',
                            type: 'string',
                          },
                          offline_access_codes_enabled: {
                            description:
                              'Indicates whether it is currently possible to use offline access codes for the device.',
                            type: 'boolean',
                          },
                          online: {
                            description:
                              'Indicates whether the device is online.',
                            type: 'boolean',
                          },
                          online_access_codes_enabled: {
                            description:
                              'Indicates whether it is currently possible to use online access codes for the device.',
                            type: 'boolean',
                          },
                          serial_number: {
                            description: 'Serial number of the device.',
                            type: 'string',
                          },
                          supports_accessory_keypad: {
                            description:
                              '\n      ---\n      deprecated: use model.accessory_keypad_supported\n      ---\n      ',
                            type: 'boolean',
                          },
                          supports_offline_access_codes: {
                            description:
                              '\n      ---\n      deprecated: use offline_access_codes_enabled\n      ---\n      ',
                            type: 'boolean',
                          },
                        },
                        required: ['online', 'name', 'appearance', 'model'],
                        type: 'object',
                      },
                      {
                        properties: {
                          assa_abloy_credential_service_metadata: {
                            properties: {
                              endpoints: {
                                items: {
                                  properties: {
                                    endpoint_id: { type: 'string' },
                                    is_active: { type: 'boolean' },
                                  },
                                  required: ['endpoint_id', 'is_active'],
                                  type: 'object',
                                },
                                type: 'array',
                              },
                              has_active_endpoint: { type: 'boolean' },
                            },
                            required: ['has_active_endpoint', 'endpoints'],
                            type: 'object',
                          },
                        },
                        type: 'object',
                      },
                    ],
                  },
                  {
                    properties: {
                      august_metadata: {
                        properties: {
                          has_keypad: { type: 'boolean' },
                          house_id: { type: 'string' },
                          house_name: { type: 'string' },
                          keypad_battery_level: { type: 'string' },
                          lock_id: { type: 'string' },
                          lock_name: { type: 'string' },
                          model: { type: 'string' },
                        },
                        required: [
                          'lock_id',
                          'lock_name',
                          'house_name',
                          'has_keypad',
                        ],
                        type: 'object',
                      },
                      avigilon_alta_metadata: {
                        properties: {
                          entry_name: { type: 'string' },
                          org_name: { type: 'string' },
                          site_id: { type: 'number' },
                          site_name: { type: 'string' },
                          zone_id: { type: 'number' },
                          zone_name: { type: 'string' },
                        },
                        required: [
                          'entry_name',
                          'org_name',
                          'zone_id',
                          'zone_name',
                          'site_id',
                          'site_name',
                        ],
                        type: 'object',
                      },
                      brivo_metadata: {
                        properties: { device_name: { type: 'string' } },
                        required: ['device_name'],
                        type: 'object',
                      },
                      controlbyweb_metadata: {
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          relay_name: { nullable: true, type: 'string' },
                        },
                        required: ['device_id', 'device_name', 'relay_name'],
                        type: 'object',
                      },
                      dormakaba_oracode_metadata: {
                        properties: {
                          device_id: { type: 'number' },
                          door_id: { type: 'number' },
                          door_name: { type: 'string' },
                          iana_timezone: { type: 'string' },
                          predefined_time_slots: {
                            items: {
                              properties: {
                                check_in_time: { type: 'string' },
                                check_out_time: { type: 'string' },
                                dormakaba_oracode_user_level_id: {
                                  format: 'uuid',
                                  type: 'string',
                                },
                                ext_dormakaba_oracode_user_level_prefix: {
                                  type: 'number',
                                },
                                is_24_hour: { type: 'boolean' },
                                is_biweekly_mode: { type: 'boolean' },
                                is_master: { type: 'boolean' },
                                is_one_shot: { type: 'boolean' },
                                name: { type: 'string' },
                                prefix: { type: 'number' },
                              },
                              required: [
                                'name',
                                'prefix',
                                'check_in_time',
                                'check_out_time',
                                'is_24_hour',
                                'is_biweekly_mode',
                                'is_one_shot',
                                'is_master',
                                'ext_dormakaba_oracode_user_level_prefix',
                                'dormakaba_oracode_user_level_id',
                              ],
                              type: 'object',
                            },
                            type: 'array',
                          },
                          site_id: { type: 'number' },
                          site_name: { type: 'string' },
                        },
                        required: [
                          'door_id',
                          'door_name',
                          'site_id',
                          'site_name',
                        ],
                        type: 'object',
                      },
                      ecobee_metadata: {
                        properties: {
                          device_name: { type: 'string' },
                          ecobee_device_id: { type: 'string' },
                        },
                        required: ['ecobee_device_id', 'device_name'],
                        type: 'object',
                      },
                      four_suites_metadata: {
                        properties: {
                          device_id: { type: 'number' },
                          device_name: { type: 'string' },
                          reclose_delay_in_seconds: { type: 'number' },
                        },
                        required: [
                          'device_id',
                          'device_name',
                          'reclose_delay_in_seconds',
                        ],
                        type: 'object',
                      },
                      genie_metadata: {
                        properties: {
                          device_name: { type: 'string' },
                          door_name: { type: 'string' },
                        },
                        required: ['device_name', 'door_name'],
                        type: 'object',
                      },
                      honeywell_resideo_metadata: {
                        properties: {
                          device_name: { type: 'string' },
                          honeywell_resideo_device_id: { type: 'string' },
                        },
                        required: [
                          'honeywell_resideo_device_id',
                          'device_name',
                        ],
                        type: 'object',
                      },
                      hubitat_metadata: {
                        properties: {
                          device_id: { type: 'string' },
                          device_label: { type: 'string' },
                          device_name: { type: 'string' },
                        },
                        required: ['device_id', 'device_name', 'device_label'],
                        type: 'object',
                      },
                      igloo_metadata: {
                        properties: {
                          bridge_id: { type: 'string' },
                          device_id: { type: 'string' },
                          model: { type: 'string' },
                        },
                        required: ['device_id', 'bridge_id'],
                        type: 'object',
                      },
                      igloohome_metadata: {
                        properties: {
                          bridge_id: { type: 'string' },
                          bridge_name: { type: 'string' },
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                        },
                        required: ['device_id', 'device_name'],
                        type: 'object',
                      },
                      kwikset_metadata: {
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          model_number: { type: 'string' },
                        },
                        required: ['device_id', 'device_name', 'model_number'],
                        type: 'object',
                      },
                      lockly_metadata: {
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          model: { type: 'string' },
                        },
                        required: ['device_id', 'device_name'],
                        type: 'object',
                      },
                      minut_metadata: {
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          latest_sensor_values: {
                            properties: {
                              accelerometer_z: {
                                properties: {
                                  time: { type: 'string' },
                                  value: { type: 'number' },
                                },
                                required: ['time', 'value'],
                                type: 'object',
                              },
                              humidity: {
                                properties: {
                                  time: { type: 'string' },
                                  value: { type: 'number' },
                                },
                                required: ['time', 'value'],
                                type: 'object',
                              },
                              pressure: {
                                properties: {
                                  time: { type: 'string' },
                                  value: { type: 'number' },
                                },
                                required: ['time', 'value'],
                                type: 'object',
                              },
                              sound: {
                                properties: {
                                  time: { type: 'string' },
                                  value: { type: 'number' },
                                },
                                required: ['time', 'value'],
                                type: 'object',
                              },
                              temperature: {
                                properties: {
                                  time: { type: 'string' },
                                  value: { type: 'number' },
                                },
                                required: ['time', 'value'],
                                type: 'object',
                              },
                            },
                            required: [
                              'temperature',
                              'sound',
                              'humidity',
                              'pressure',
                              'accelerometer_z',
                            ],
                            type: 'object',
                          },
                        },
                        required: [
                          'device_id',
                          'device_name',
                          'latest_sensor_values',
                        ],
                        type: 'object',
                      },
                      nest_metadata: {
                        properties: {
                          custom_name: { type: 'string' },
                          device_name: { type: 'string' },
                          nest_device_id: { type: 'string' },
                        },
                        required: [
                          'nest_device_id',
                          'device_name',
                          'custom_name',
                        ],
                        type: 'object',
                      },
                      noiseaware_metadata: {
                        properties: {
                          device_id: { type: 'string' },
                          device_model: {
                            enum: ['indoor', 'outdoor'],
                            type: 'string',
                          },
                          device_name: { type: 'string' },
                          noise_level_decibel: { type: 'number' },
                          noise_level_nrs: { type: 'number' },
                        },
                        required: [
                          'device_model',
                          'noise_level_nrs',
                          'noise_level_decibel',
                          'device_name',
                          'device_id',
                        ],
                        type: 'object',
                      },
                      nuki_metadata: {
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          keypad_2_paired: { type: 'boolean' },
                          keypad_battery_critical: { type: 'boolean' },
                          keypad_paired: { type: 'boolean' },
                        },
                        required: ['device_id', 'device_name'],
                        type: 'object',
                      },
                      salto_metadata: {
                        properties: {
                          battery_level: { type: 'string' },
                          customer_reference: { type: 'string' },
                          lock_id: { type: 'string' },
                          lock_type: { type: 'string' },
                          locked_state: { type: 'string' },
                          model: { type: 'string' },
                        },
                        required: [
                          'lock_id',
                          'customer_reference',
                          'lock_type',
                          'battery_level',
                          'locked_state',
                        ],
                        type: 'object',
                      },
                      schlage_metadata: {
                        properties: {
                          access_code_length: {
                            nullable: true,
                            type: 'number',
                          },
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          model: { type: 'string' },
                        },
                        required: [
                          'device_id',
                          'device_name',
                          'access_code_length',
                        ],
                        type: 'object',
                      },
                      seam_bridge_metadata: {
                        properties: {
                          device_num: { type: 'number' },
                          name: { type: 'string' },
                          unlock_method: {
                            enum: ['bridge', 'doorking'],
                            type: 'string',
                          },
                        },
                        required: ['device_num', 'name'],
                        type: 'object',
                      },
                      smartthings_metadata: {
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          location_id: { type: 'string' },
                          model: { type: 'string' },
                        },
                        required: ['device_id', 'device_name'],
                        type: 'object',
                      },
                      tedee_metadata: {
                        properties: {
                          bridge_id: { type: 'number' },
                          bridge_name: { type: 'string' },
                          device_id: { type: 'number' },
                          device_model: { type: 'string' },
                          device_name: { type: 'string' },
                          keypad_id: { type: 'number' },
                          serial_number: { type: 'string' },
                        },
                        required: [
                          'device_id',
                          'serial_number',
                          'device_name',
                          'device_model',
                          'bridge_id',
                          'bridge_name',
                        ],
                        type: 'object',
                      },
                      ttlock_metadata: {
                        properties: {
                          lock_alias: { type: 'string' },
                          lock_id: { type: 'number' },
                        },
                        required: ['lock_id', 'lock_alias'],
                        type: 'object',
                      },
                      two_n_metadata: {
                        properties: {
                          device_id: { type: 'number' },
                          device_name: { type: 'string' },
                        },
                        required: ['device_id', 'device_name'],
                        type: 'object',
                      },
                      wyze_metadata: {
                        properties: {
                          device_id: { type: 'string' },
                          device_info_model: { type: 'string' },
                          device_name: { type: 'string' },
                          product_model: { type: 'string' },
                          product_name: { type: 'string' },
                          product_type: { type: 'string' },
                        },
                        required: [
                          'device_id',
                          'device_name',
                          'product_name',
                          'product_type',
                          'product_model',
                          'device_info_model',
                        ],
                        type: 'object',
                      },
                    },
                    type: 'object',
                  },
                ],
              },
              {
                allOf: [
                  {
                    properties: {
                      _experimental_supported_code_from_access_codes_lengths: {
                        items: { type: 'number' },
                        type: 'array',
                      },
                      code_constraints: {
                        items: {
                          oneOf: [
                            {
                              properties: {
                                constraint_type: {
                                  enum: [
                                    'no_zeros',
                                    'cannot_start_with_12',
                                    'no_triple_consecutive_ints',
                                    'cannot_specify_pin_code',
                                    'pin_code_matches_existing_set',
                                    'start_date_in_future',
                                    'no_ascending_or_descending_sequence',
                                    'at_least_three_unique_digits',
                                  ],
                                  type: 'string',
                                },
                              },
                              required: ['constraint_type'],
                              type: 'object',
                            },
                            {
                              properties: {
                                constraint_type: {
                                  enum: ['name_length'],
                                  type: 'string',
                                },
                                max_length: { type: 'number' },
                                min_length: { type: 'number' },
                              },
                              required: ['constraint_type'],
                              type: 'object',
                            },
                          ],
                        },
                        type: 'array',
                      },
                      door_open: { type: 'boolean' },
                      has_native_entry_events: { type: 'boolean' },
                      keypad_battery: {
                        properties: { level: { type: 'number' } },
                        required: ['level'],
                        type: 'object',
                      },
                      locked: { type: 'boolean' },
                      max_active_codes_supported: { type: 'number' },
                      supported_code_lengths: {
                        items: { type: 'number' },
                        type: 'array',
                      },
                      supports_backup_access_code_pool: { type: 'boolean' },
                    },
                    type: 'object',
                  },
                  {
                    oneOf: [
                      {
                        properties: {
                          active_climate_setting_schedule: {
                            properties: {
                              automatic_cooling_enabled: { type: 'boolean' },
                              automatic_heating_enabled: { type: 'boolean' },
                              climate_setting_schedule_id: {
                                format: 'uuid',
                                type: 'string',
                              },
                              cooling_set_point_celsius: { type: 'number' },
                              cooling_set_point_fahrenheit: { type: 'number' },
                              created_at: {
                                format: 'date-time',
                                type: 'string',
                              },
                              device_id: { format: 'uuid', type: 'string' },
                              errors: {
                                description:
                                  'Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues.',
                                nullable: true,
                              },
                              heating_set_point_celsius: { type: 'number' },
                              heating_set_point_fahrenheit: { type: 'number' },
                              hvac_mode_setting: {
                                enum: ['off', 'heat', 'cool', 'heat_cool'],
                                type: 'string',
                              },
                              manual_override_allowed: { type: 'boolean' },
                              name: { type: 'string' },
                              schedule_ends_at: { type: 'string' },
                              schedule_starts_at: { type: 'string' },
                              schedule_type: {
                                enum: ['time_bound'],
                                type: 'string',
                              },
                            },
                            required: [
                              'climate_setting_schedule_id',
                              'schedule_type',
                              'device_id',
                              'schedule_starts_at',
                              'schedule_ends_at',
                              'created_at',
                            ],
                            type: 'object',
                          },
                          available_hvac_mode_settings: {
                            items: {
                              enum: ['off', 'heat', 'cool', 'heat_cool'],
                              type: 'string',
                            },
                            type: 'array',
                          },
                          can_enable_automatic_cooling: { type: 'boolean' },
                          can_enable_automatic_heating: { type: 'boolean' },
                          current_climate_setting: {
                            properties: {
                              automatic_cooling_enabled: { type: 'boolean' },
                              automatic_heating_enabled: { type: 'boolean' },
                              cooling_set_point_celsius: { type: 'number' },
                              cooling_set_point_fahrenheit: { type: 'number' },
                              heating_set_point_celsius: { type: 'number' },
                              heating_set_point_fahrenheit: { type: 'number' },
                              hvac_mode_setting: {
                                enum: ['off', 'heat', 'cool', 'heat_cool'],
                                type: 'string',
                              },
                              manual_override_allowed: { type: 'boolean' },
                            },
                            required: [
                              'automatic_heating_enabled',
                              'automatic_cooling_enabled',
                              'hvac_mode_setting',
                              'manual_override_allowed',
                            ],
                            type: 'object',
                          },
                          default_climate_setting: {
                            properties: {
                              automatic_cooling_enabled: { type: 'boolean' },
                              automatic_heating_enabled: { type: 'boolean' },
                              cooling_set_point_celsius: { type: 'number' },
                              cooling_set_point_fahrenheit: { type: 'number' },
                              heating_set_point_celsius: { type: 'number' },
                              heating_set_point_fahrenheit: { type: 'number' },
                              hvac_mode_setting: {
                                enum: ['off', 'heat', 'cool', 'heat_cool'],
                                type: 'string',
                              },
                              manual_override_allowed: { type: 'boolean' },
                            },
                            required: [
                              'automatic_heating_enabled',
                              'automatic_cooling_enabled',
                              'hvac_mode_setting',
                              'manual_override_allowed',
                            ],
                            type: 'object',
                          },
                          fan_mode_setting: {
                            enum: ['auto', 'on'],
                            type: 'string',
                          },
                          is_climate_setting_schedule_active: {
                            type: 'boolean',
                          },
                          is_cooling: { type: 'boolean' },
                          is_cooling_available: {
                            enum: [true],
                            type: 'boolean',
                          },
                          is_fan_running: { type: 'boolean' },
                          is_heating: { type: 'boolean' },
                          is_heating_available: {
                            enum: [true],
                            type: 'boolean',
                          },
                          is_temporary_manual_override_active: {
                            type: 'boolean',
                          },
                          max_cooling_set_point_celsius: { type: 'number' },
                          max_cooling_set_point_fahrenheit: { type: 'number' },
                          max_heating_set_point_celsius: { type: 'number' },
                          max_heating_set_point_fahrenheit: { type: 'number' },
                          min_cooling_set_point_celsius: { type: 'number' },
                          min_cooling_set_point_fahrenheit: { type: 'number' },
                          min_heating_cooling_delta_celsius: { type: 'number' },
                          min_heating_cooling_delta_fahrenheit: {
                            type: 'number',
                          },
                          min_heating_set_point_celsius: { type: 'number' },
                          min_heating_set_point_fahrenheit: { type: 'number' },
                          relative_humidity: {
                            maximum: 1,
                            minimum: 0,
                            type: 'number',
                          },
                          temperature_celsius: { type: 'number' },
                          temperature_fahrenheit: { type: 'number' },
                        },
                        type: 'object',
                      },
                      {
                        properties: {
                          active_climate_setting_schedule: {
                            properties: {
                              automatic_cooling_enabled: { type: 'boolean' },
                              automatic_heating_enabled: { type: 'boolean' },
                              climate_setting_schedule_id: {
                                format: 'uuid',
                                type: 'string',
                              },
                              cooling_set_point_celsius: { type: 'number' },
                              cooling_set_point_fahrenheit: { type: 'number' },
                              created_at: {
                                format: 'date-time',
                                type: 'string',
                              },
                              device_id: { format: 'uuid', type: 'string' },
                              errors: {
                                description:
                                  'Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues.',
                                nullable: true,
                              },
                              heating_set_point_celsius: { type: 'number' },
                              heating_set_point_fahrenheit: { type: 'number' },
                              hvac_mode_setting: {
                                enum: ['off', 'heat', 'cool', 'heat_cool'],
                                type: 'string',
                              },
                              manual_override_allowed: { type: 'boolean' },
                              name: { type: 'string' },
                              schedule_ends_at: { type: 'string' },
                              schedule_starts_at: { type: 'string' },
                              schedule_type: {
                                enum: ['time_bound'],
                                type: 'string',
                              },
                            },
                            required: [
                              'climate_setting_schedule_id',
                              'schedule_type',
                              'device_id',
                              'schedule_starts_at',
                              'schedule_ends_at',
                              'created_at',
                            ],
                            type: 'object',
                          },
                          available_hvac_mode_settings: {
                            items: {
                              enum: ['off', 'heat', 'cool', 'heat_cool'],
                              type: 'string',
                            },
                            type: 'array',
                          },
                          can_enable_automatic_cooling: { type: 'boolean' },
                          can_enable_automatic_heating: { type: 'boolean' },
                          current_climate_setting: {
                            properties: {
                              automatic_cooling_enabled: { type: 'boolean' },
                              automatic_heating_enabled: { type: 'boolean' },
                              cooling_set_point_celsius: { type: 'number' },
                              cooling_set_point_fahrenheit: { type: 'number' },
                              heating_set_point_celsius: { type: 'number' },
                              heating_set_point_fahrenheit: { type: 'number' },
                              hvac_mode_setting: {
                                enum: ['off', 'heat', 'cool', 'heat_cool'],
                                type: 'string',
                              },
                              manual_override_allowed: { type: 'boolean' },
                            },
                            required: [
                              'automatic_heating_enabled',
                              'automatic_cooling_enabled',
                              'hvac_mode_setting',
                              'manual_override_allowed',
                            ],
                            type: 'object',
                          },
                          default_climate_setting: {
                            properties: {
                              automatic_cooling_enabled: { type: 'boolean' },
                              automatic_heating_enabled: { type: 'boolean' },
                              cooling_set_point_celsius: { type: 'number' },
                              cooling_set_point_fahrenheit: { type: 'number' },
                              heating_set_point_celsius: { type: 'number' },
                              heating_set_point_fahrenheit: { type: 'number' },
                              hvac_mode_setting: {
                                enum: ['off', 'heat', 'cool', 'heat_cool'],
                                type: 'string',
                              },
                              manual_override_allowed: { type: 'boolean' },
                            },
                            required: [
                              'automatic_heating_enabled',
                              'automatic_cooling_enabled',
                              'hvac_mode_setting',
                              'manual_override_allowed',
                            ],
                            type: 'object',
                          },
                          fan_mode_setting: {
                            enum: ['auto', 'on'],
                            type: 'string',
                          },
                          is_climate_setting_schedule_active: {
                            type: 'boolean',
                          },
                          is_cooling: { type: 'boolean' },
                          is_cooling_available: {
                            enum: [false],
                            type: 'boolean',
                          },
                          is_fan_running: { type: 'boolean' },
                          is_heating: { type: 'boolean' },
                          is_heating_available: {
                            enum: [true],
                            type: 'boolean',
                          },
                          is_temporary_manual_override_active: {
                            type: 'boolean',
                          },
                          max_heating_set_point_celsius: { type: 'number' },
                          max_heating_set_point_fahrenheit: { type: 'number' },
                          min_heating_set_point_celsius: { type: 'number' },
                          min_heating_set_point_fahrenheit: { type: 'number' },
                          relative_humidity: {
                            maximum: 1,
                            minimum: 0,
                            type: 'number',
                          },
                          temperature_celsius: { type: 'number' },
                          temperature_fahrenheit: { type: 'number' },
                        },
                        type: 'object',
                      },
                      {
                        properties: {
                          active_climate_setting_schedule: {
                            properties: {
                              automatic_cooling_enabled: { type: 'boolean' },
                              automatic_heating_enabled: { type: 'boolean' },
                              climate_setting_schedule_id: {
                                format: 'uuid',
                                type: 'string',
                              },
                              cooling_set_point_celsius: { type: 'number' },
                              cooling_set_point_fahrenheit: { type: 'number' },
                              created_at: {
                                format: 'date-time',
                                type: 'string',
                              },
                              device_id: { format: 'uuid', type: 'string' },
                              errors: {
                                description:
                                  'Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues.',
                                nullable: true,
                              },
                              heating_set_point_celsius: { type: 'number' },
                              heating_set_point_fahrenheit: { type: 'number' },
                              hvac_mode_setting: {
                                enum: ['off', 'heat', 'cool', 'heat_cool'],
                                type: 'string',
                              },
                              manual_override_allowed: { type: 'boolean' },
                              name: { type: 'string' },
                              schedule_ends_at: { type: 'string' },
                              schedule_starts_at: { type: 'string' },
                              schedule_type: {
                                enum: ['time_bound'],
                                type: 'string',
                              },
                            },
                            required: [
                              'climate_setting_schedule_id',
                              'schedule_type',
                              'device_id',
                              'schedule_starts_at',
                              'schedule_ends_at',
                              'created_at',
                            ],
                            type: 'object',
                          },
                          available_hvac_mode_settings: {
                            items: {
                              enum: ['off', 'heat', 'cool', 'heat_cool'],
                              type: 'string',
                            },
                            type: 'array',
                          },
                          can_enable_automatic_cooling: { type: 'boolean' },
                          can_enable_automatic_heating: { type: 'boolean' },
                          current_climate_setting: {
                            properties: {
                              automatic_cooling_enabled: { type: 'boolean' },
                              automatic_heating_enabled: { type: 'boolean' },
                              cooling_set_point_celsius: { type: 'number' },
                              cooling_set_point_fahrenheit: { type: 'number' },
                              heating_set_point_celsius: { type: 'number' },
                              heating_set_point_fahrenheit: { type: 'number' },
                              hvac_mode_setting: {
                                enum: ['off', 'heat', 'cool', 'heat_cool'],
                                type: 'string',
                              },
                              manual_override_allowed: { type: 'boolean' },
                            },
                            required: [
                              'automatic_heating_enabled',
                              'automatic_cooling_enabled',
                              'hvac_mode_setting',
                              'manual_override_allowed',
                            ],
                            type: 'object',
                          },
                          default_climate_setting: {
                            properties: {
                              automatic_cooling_enabled: { type: 'boolean' },
                              automatic_heating_enabled: { type: 'boolean' },
                              cooling_set_point_celsius: { type: 'number' },
                              cooling_set_point_fahrenheit: { type: 'number' },
                              heating_set_point_celsius: { type: 'number' },
                              heating_set_point_fahrenheit: { type: 'number' },
                              hvac_mode_setting: {
                                enum: ['off', 'heat', 'cool', 'heat_cool'],
                                type: 'string',
                              },
                              manual_override_allowed: { type: 'boolean' },
                            },
                            required: [
                              'automatic_heating_enabled',
                              'automatic_cooling_enabled',
                              'hvac_mode_setting',
                              'manual_override_allowed',
                            ],
                            type: 'object',
                          },
                          fan_mode_setting: {
                            enum: ['auto', 'on'],
                            type: 'string',
                          },
                          is_climate_setting_schedule_active: {
                            type: 'boolean',
                          },
                          is_cooling: { type: 'boolean' },
                          is_cooling_available: {
                            enum: [true],
                            type: 'boolean',
                          },
                          is_fan_running: { type: 'boolean' },
                          is_heating: { type: 'boolean' },
                          is_heating_available: {
                            enum: [false],
                            type: 'boolean',
                          },
                          is_temporary_manual_override_active: {
                            type: 'boolean',
                          },
                          max_cooling_set_point_celsius: { type: 'number' },
                          max_cooling_set_point_fahrenheit: { type: 'number' },
                          min_cooling_set_point_celsius: { type: 'number' },
                          min_cooling_set_point_fahrenheit: { type: 'number' },
                          relative_humidity: {
                            maximum: 1,
                            minimum: 0,
                            type: 'number',
                          },
                          temperature_celsius: { type: 'number' },
                          temperature_fahrenheit: { type: 'number' },
                        },
                        type: 'object',
                      },
                    ],
                  },
                ],
              },
            ],
            description: 'Properties of the device.',
          },
          warnings: {
            description:
              'Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it.',
            items: {
              properties: {
                message: { type: 'string' },
                warning_code: { type: 'string' },
              },
              required: ['warning_code', 'message'],
              type: 'object',
            },
            type: 'array',
          },
          workspace_id: {
            description:
              'Unique identifier for the Seam workspace associated with the device.',
            format: 'uuid',
            type: 'string',
          },
        },
        required: [
          'device_id',
          'device_type',
          'display_name',
          'capabilities_supported',
          'properties',
          'location',
          'connected_account_id',
          'workspace_id',
          'errors',
          'warnings',
          'created_at',
          'is_managed',
          'custom_metadata',
        ],
        type: 'object',
      },
      device_provider: {
        properties: {
          device_provider_name: {
            enum: [
              'akuvox',
              'august',
              'avigilon_alta',
              'brivo',
              'butterflymx',
              'schlage',
              'smartthings',
              'yale',
              'genie',
              'doorking',
              'salto',
              'lockly',
              'ttlock',
              'linear',
              'noiseaware',
              'nuki',
              'seam_relay_admin',
              'igloo',
              'kwikset',
              'minut',
              'my_2n',
              'controlbyweb',
              'nest',
              'igloohome',
              'ecobee',
              'hubitat',
              'four_suites',
              'dormakaba_oracode',
              'pti',
              'wyze',
              'seam_passport',
              'visionline',
              'assa_abloy_credential_service',
              'seam_bridge',
              'tedee',
              'honeywell_resideo',
              'latch',
            ],
            type: 'string',
          },
          display_name: { type: 'string' },
          image_url: { type: 'string' },
          provider_categories: {
            items: {
              enum: [
                'stable',
                'consumer_smartlocks',
                'thermostats',
                'noise_sensors',
                'access_control_systems',
              ],
              type: 'string',
            },
            type: 'array',
          },
        },
        required: [
          'device_provider_name',
          'display_name',
          'image_url',
          'provider_categories',
        ],
        type: 'object',
      },
      enrollment_automation: {
        properties: {
          created_at: { format: 'date-time', type: 'string' },
          credential_manager_acs_system_id: { format: 'uuid', type: 'string' },
          enrollment_automation_id: { format: 'uuid', type: 'string' },
          user_identity_id: { format: 'uuid', type: 'string' },
          workspace_id: { format: 'uuid', type: 'string' },
        },
        required: [
          'credential_manager_acs_system_id',
          'user_identity_id',
          'created_at',
          'workspace_id',
          'enrollment_automation_id',
        ],
        type: 'object',
      },
      event: {
        properties: {
          created_at: { format: 'date-time', type: 'string' },
          device_id: { format: 'uuid', type: 'string' },
          event_id: { format: 'uuid', type: 'string' },
          event_type: { type: 'string' },
          occurred_at: { format: 'date-time', type: 'string' },
          workspace_id: { format: 'uuid', type: 'string' },
        },
        required: [
          'event_id',
          'event_type',
          'workspace_id',
          'created_at',
          'occurred_at',
        ],
        type: 'object',
      },
      noise_threshold: {
        properties: {
          device_id: { format: 'uuid', type: 'string' },
          ends_daily_at: { type: 'string' },
          name: { type: 'string' },
          noise_threshold_decibels: { type: 'number' },
          noise_threshold_id: { format: 'uuid', type: 'string' },
          noise_threshold_nrs: { type: 'number' },
          starts_daily_at: { type: 'string' },
        },
        required: [
          'noise_threshold_id',
          'device_id',
          'name',
          'starts_daily_at',
          'ends_daily_at',
          'noise_threshold_decibels',
        ],
        type: 'object',
      },
      phone: {
        properties: {
          can_program_online_access_codes: { type: 'boolean' },
          can_remotely_lock: { type: 'boolean' },
          can_remotely_unlock: { type: 'boolean' },
          can_simulate_removal: { type: 'boolean' },
          capabilities_supported: {
            description:
              'Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health.',
            items: {
              enum: [
                'access_code',
                'lock',
                'noise_detection',
                'thermostat',
                'battery',
                'phone',
              ],
              type: 'string',
            },
            type: 'array',
          },
          created_at: {
            description:
              'Date and time at which the device object was created.',
            format: 'date-time',
            type: 'string',
          },
          custom_metadata: {
            additionalProperties: {
              oneOf: [{ type: 'string' }, { type: 'boolean' }],
            },
            type: 'object',
          },
          device_id: {
            description: 'Unique identifier for the device.',
            format: 'uuid',
            type: 'string',
          },
          device_type: { enum: ['android_phone', 'ios_phone'], type: 'string' },
          display_name: {
            description:
              'Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices.',
            type: 'string',
          },
          errors: {
            description:
              'Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.',
            items: {
              properties: {
                error_code: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['error_code', 'message'],
              type: 'object',
            },
            type: 'array',
          },
          is_managed: {
            description: 'Indicates whether Seam manages the device.',
            enum: [true],
            type: 'boolean',
          },
          location: {
            description: 'Location information for the device.',
            nullable: true,
            properties: {
              location_name: {
                description: 'Name of the device location.',
                type: 'string',
              },
              timezone: {
                description: 'Time zone of the device location.',
                type: 'string',
              },
            },
            type: 'object',
          },
          nickname: {
            description:
              'Optional nickname to describe the device, settable through Seam',
            type: 'string',
          },
          properties: {
            properties: {
              assa_abloy_credential_service_metadata: {
                properties: {
                  endpoints: {
                    items: {
                      properties: {
                        endpoint_id: { type: 'string' },
                        is_active: { type: 'boolean' },
                      },
                      required: ['endpoint_id', 'is_active'],
                      type: 'object',
                    },
                    type: 'array',
                  },
                  has_active_endpoint: { type: 'boolean' },
                },
                required: ['has_active_endpoint', 'endpoints'],
                type: 'object',
              },
            },
            type: 'object',
          },
          warnings: {
            description:
              'Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it.',
            items: {
              properties: {
                message: { type: 'string' },
                warning_code: { type: 'string' },
              },
              required: ['warning_code', 'message'],
              type: 'object',
            },
            type: 'array',
          },
          workspace_id: {
            description:
              'Unique identifier for the Seam workspace associated with the device.',
            format: 'uuid',
            type: 'string',
          },
        },
        required: [
          'device_id',
          'device_type',
          'display_name',
          'capabilities_supported',
          'properties',
          'location',
          'workspace_id',
          'errors',
          'warnings',
          'created_at',
          'is_managed',
          'custom_metadata',
        ],
        type: 'object',
      },
      service_health: {
        properties: {
          description: { type: 'string' },
          service: { type: 'string' },
          status: { enum: ['healthy', 'degraded', 'down'], type: 'string' },
        },
        required: ['service', 'status', 'description'],
        type: 'object',
      },
      unmanaged_access_code: {
        properties: {
          access_code_id: {
            description: 'Unique identifier for the access code.',
            format: 'uuid',
            type: 'string',
          },
          code: {
            description:
              'Code used for access. Typically, a numeric or alphanumeric string.',
            nullable: true,
            type: 'string',
          },
          created_at: {
            description: 'Date and time at which the access code was created.',
            format: 'date-time',
            type: 'string',
          },
          device_id: {
            description:
              'Unique identifier for the device associated with the access code.',
            format: 'uuid',
            type: 'string',
          },
          ends_at: {
            description:
              'Date and time after which the time-bound access code becomes inactive.',
            format: 'date-time',
            nullable: true,
            type: 'string',
          },
          errors: {
            description:
              'Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues.',
            nullable: true,
          },
          is_managed: { enum: [false], type: 'boolean' },
          name: {
            description:
              'Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes.',
            nullable: true,
            type: 'string',
          },
          starts_at: {
            description:
              'Date and time at which the time-bound access code becomes active.',
            format: 'date-time',
            nullable: true,
            type: 'string',
          },
          status: { enum: ['set'], type: 'string' },
          type: {
            description:
              'Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration.',
            enum: ['time_bound', 'ongoing'],
            type: 'string',
          },
          warnings: {
            description:
              'Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention.',
            nullable: true,
          },
        },
        required: [
          'type',
          'access_code_id',
          'device_id',
          'name',
          'code',
          'created_at',
          'is_managed',
          'status',
        ],
        type: 'object',
      },
      unmanaged_device: {
        properties: {
          can_program_online_access_codes: { type: 'boolean' },
          can_remotely_lock: { type: 'boolean' },
          can_remotely_unlock: { type: 'boolean' },
          can_simulate_removal: { type: 'boolean' },
          capabilities_supported: {
            description:
              'Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health.',
            items: {
              enum: [
                'access_code',
                'lock',
                'noise_detection',
                'thermostat',
                'battery',
                'phone',
              ],
              type: 'string',
            },
            type: 'array',
          },
          connected_account_id: {
            description:
              'Unique identifier for the account associated with the device.',
            format: 'uuid',
            type: 'string',
          },
          created_at: {
            description:
              'Date and time at which the device object was created.',
            format: 'date-time',
            type: 'string',
          },
          device_id: {
            description: 'Unique identifier for the device.',
            format: 'uuid',
            type: 'string',
          },
          device_type: {
            description: 'Type of the device.',
            oneOf: [
              {
                enum: [
                  'akuvox_lock',
                  'august_lock',
                  'brivo_access_point',
                  'butterflymx_panel',
                  'avigilon_alta_entry',
                  'doorking_lock',
                  'genie_door',
                  'igloo_lock',
                  'linear_lock',
                  'lockly_lock',
                  'kwikset_lock',
                  'nuki_lock',
                  'salto_lock',
                  'schlage_lock',
                  'seam_relay',
                  'smartthings_lock',
                  'wyze_lock',
                  'yale_lock',
                  'two_n_intercom',
                  'controlbyweb_device',
                  'ttlock_lock',
                  'igloohome_lock',
                  'hubitat_lock',
                  'four_suites_door',
                  'dormakaba_oracode_door',
                  'tedee_lock',
                ],
                type: 'string',
              },
              {
                enum: ['noiseaware_activity_zone', 'minut_sensor'],
                type: 'string',
              },
              {
                enum: [
                  'ecobee_thermostat',
                  'nest_thermostat',
                  'honeywell_resideo_thermostat',
                ],
                type: 'string',
              },
              { enum: ['ios_phone', 'android_phone'], type: 'string' },
            ],
          },
          errors: {
            description:
              'Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.',
            items: {
              properties: {
                error_code: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['error_code', 'message'],
              type: 'object',
            },
            type: 'array',
          },
          is_managed: { enum: [false], type: 'boolean' },
          properties: {
            properties: {
              accessory_keypad: {
                description: 'Represents the accessory keypad state.',
                properties: {
                  battery: {
                    description: 'Indicates if the keypad battery properties.',
                    properties: {
                      level: { maximum: 1, minimum: 0, type: 'number' },
                    },
                    required: ['level'],
                    type: 'object',
                  },
                  is_connected: {
                    description:
                      'Indicates if the accessory_keypad is connected to the device.',
                    type: 'boolean',
                  },
                },
                required: ['is_connected'],
                type: 'object',
              },
              battery: {
                description:
                  'Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage.',
                properties: {
                  level: { maximum: 1, minimum: 0, type: 'number' },
                  status: {
                    enum: ['critical', 'low', 'good', 'full'],
                    type: 'string',
                  },
                },
                required: ['level', 'status'],
                type: 'object',
              },
              battery_level: {
                description:
                  'Indicates the battery level of the device as a decimal value between 0 and 1, inclusive.',
                maximum: 1,
                minimum: 0,
                type: 'number',
              },
              image_alt_text: {
                description: 'Alt text for the device image.',
                type: 'string',
              },
              image_url: {
                description: 'Image URL for the device.',
                format: 'uri',
                type: 'string',
              },
              manufacturer: {
                description: 'Manufacturer of the device.',
                type: 'string',
              },
              model: {
                properties: {
                  accessory_keypad_supported: {
                    description:
                      'Indicates whether the device supports an accessory keypad.',
                    type: 'boolean',
                  },
                  can_connect_accessory_keypad: {
                    description:
                      'Indicates whether the device can connect a accessory keypad.',
                    type: 'boolean',
                  },
                  display_name: {
                    description: 'Display name of the device model.',
                    type: 'string',
                  },
                  has_built_in_keypad: {
                    description:
                      'Indicates whether the device has a built in accessory keypad.',
                    type: 'boolean',
                  },
                  manufacturer_display_name: {
                    description:
                      'Display name that corresponds to the manufacturer-specific terminology for the device.',
                    type: 'string',
                  },
                  offline_access_codes_supported: {
                    description:
                      'Indicates whether the device supports offline access codes.',
                    type: 'boolean',
                  },
                  online_access_codes_supported: {
                    description:
                      'Indicates whether the device supports online access codes.',
                    type: 'boolean',
                  },
                },
                required: ['display_name', 'manufacturer_display_name'],
                type: 'object',
              },
              name: {
                description:
                  '\n      ---\n      deprecated: use device.display_name instead\n      ---\n      Name of the device.\n      ',
                type: 'string',
              },
              offline_access_codes_enabled: {
                description:
                  'Indicates whether it is currently possible to use offline access codes for the device.',
                type: 'boolean',
              },
              online: {
                description: 'Indicates whether the device is online.',
                type: 'boolean',
              },
              online_access_codes_enabled: {
                description:
                  'Indicates whether it is currently possible to use online access codes for the device.',
                type: 'boolean',
              },
            },
            required: ['name', 'online', 'model'],
            type: 'object',
          },
          warnings: {
            description:
              'Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it.',
            items: {
              properties: {
                message: { type: 'string' },
                warning_code: { type: 'string' },
              },
              required: ['warning_code', 'message'],
              type: 'object',
            },
            type: 'array',
          },
          workspace_id: {
            description:
              'Unique identifier for the Seam workspace associated with the device.',
            format: 'uuid',
            type: 'string',
          },
        },
        required: [
          'device_id',
          'device_type',
          'connected_account_id',
          'capabilities_supported',
          'workspace_id',
          'errors',
          'warnings',
          'created_at',
          'is_managed',
          'properties',
        ],
        type: 'object',
      },
      webhook: {
        properties: {
          event_types: { items: { type: 'string' }, type: 'array' },
          secret: { type: 'string' },
          url: { type: 'string' },
          webhook_id: { type: 'string' },
        },
        required: ['webhook_id', 'url'],
        type: 'object',
      },
      workspace: {
        properties: {
          connect_partner_name: { nullable: true, type: 'string' },
          is_sandbox: { type: 'boolean' },
          name: { type: 'string' },
          workspace_id: { format: 'uuid', type: 'string' },
        },
        required: [
          'workspace_id',
          'name',
          'is_sandbox',
          'connect_partner_name',
        ],
        type: 'object',
      },
    },
    securitySchemes: {
      access_token: {
        bearerFormat: 'API Token',
        scheme: 'bearer',
        type: 'http',
      },
      api_key: { bearerFormat: 'API Key', scheme: 'bearer', type: 'http' },
      client_session: {
        bearerFormat: 'Client Session Token',
        scheme: 'bearer',
        type: 'http',
      },
      client_session_token: {
        in: 'header',
        name: 'client-session-token',
        type: 'apiKey',
      },
      console_session: {
        bearerFormat: 'Console Session Token',
        scheme: 'bearer',
        type: 'http',
      },
      pat_with_workspace: {
        bearerFormat: 'API Token',
        scheme: 'bearer',
        type: 'http',
      },
      pat_without_workspace: {
        bearerFormat: 'API Token',
        scheme: 'bearer',
        type: 'http',
      },
      seam_client_session_token: {
        in: 'header',
        name: 'seam-client-session-token',
        type: 'apiKey',
      },
      seam_workspace: { in: 'header', name: 'seam-workspace', type: 'apiKey' },
      user_session: {
        bearerFormat: 'User Session Token',
        scheme: 'bearer',
        type: 'http',
      },
      user_session_without_workspace: {
        bearerFormat: 'User Session Token',
        scheme: 'bearer',
        type: 'http',
      },
    },
  },
  info: { title: 'Seam Connect', version: '1.0.0' },
  openapi: '3.0.0',
  paths: {
    '/access_codes/create': {
      post: {
        operationId: 'accessCodesCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  allow_external_modification: { type: 'boolean' },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  code: {
                    maxLength: 8,
                    minLength: 4,
                    pattern: '^\\d+$',
                    type: 'string',
                  },
                  common_code_key: { type: 'string' },
                  device_id: { format: 'uuid', type: 'string' },
                  ends_at: { type: 'string' },
                  is_external_modification_allowed: { type: 'boolean' },
                  is_offline_access_code: { type: 'boolean' },
                  is_one_time_use: { type: 'boolean' },
                  max_time_rounding: {
                    default: '1hour',
                    enum: ['1hour', '1day', '1h', '1d'],
                    type: 'string',
                  },
                  name: { type: 'string' },
                  prefer_native_scheduling: { type: 'boolean' },
                  starts_at: { type: 'string' },
                  sync: { default: false, type: 'boolean' },
                  use_backup_access_code_pool: { type: 'boolean' },
                  use_offline_access_code: { type: 'boolean' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    access_code: { $ref: '#/components/schemas/access_code' },
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'access_code', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/create',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'access_code',
      },
    },
    '/access_codes/create_multiple': {
      post: {
        operationId: 'accessCodesCreateMultiplePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  allow_external_modification: { type: 'boolean' },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  behavior_when_code_cannot_be_shared: {
                    default: 'throw',
                    enum: ['throw', 'create_random_code'],
                    type: 'string',
                  },
                  code: {
                    maxLength: 8,
                    minLength: 4,
                    pattern: '^\\d+$',
                    type: 'string',
                  },
                  device_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  ends_at: { type: 'string' },
                  is_external_modification_allowed: { type: 'boolean' },
                  is_offline_access_code: { type: 'boolean' },
                  is_one_time_use: { type: 'boolean' },
                  max_time_rounding: {
                    default: '1hour',
                    enum: ['1hour', '1day', '1h', '1d'],
                    type: 'string',
                  },
                  name: { type: 'string' },
                  prefer_native_scheduling: { type: 'boolean' },
                  preferred_code_length: { type: 'number' },
                  starts_at: { type: 'string' },
                  use_backup_access_code_pool: { type: 'boolean' },
                  use_offline_access_code: { type: 'boolean' },
                },
                required: ['device_ids'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    access_codes: {
                      items: { $ref: '#/components/schemas/access_code' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_codes', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/create_multiple',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'create_multiple',
        'x-fern-sdk-return-value': 'access_codes',
      },
      put: {
        operationId: 'accessCodesCreateMultiplePut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  allow_external_modification: { type: 'boolean' },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  behavior_when_code_cannot_be_shared: {
                    default: 'throw',
                    enum: ['throw', 'create_random_code'],
                    type: 'string',
                  },
                  code: {
                    maxLength: 8,
                    minLength: 4,
                    pattern: '^\\d+$',
                    type: 'string',
                  },
                  device_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  ends_at: { type: 'string' },
                  is_external_modification_allowed: { type: 'boolean' },
                  is_offline_access_code: { type: 'boolean' },
                  is_one_time_use: { type: 'boolean' },
                  max_time_rounding: {
                    default: '1hour',
                    enum: ['1hour', '1day', '1h', '1d'],
                    type: 'string',
                  },
                  name: { type: 'string' },
                  prefer_native_scheduling: { type: 'boolean' },
                  preferred_code_length: { type: 'number' },
                  starts_at: { type: 'string' },
                  use_backup_access_code_pool: { type: 'boolean' },
                  use_offline_access_code: { type: 'boolean' },
                },
                required: ['device_ids'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    access_codes: {
                      items: { $ref: '#/components/schemas/access_code' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_codes', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/create_multiple',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
      },
    },
    '/access_codes/delete': {
      post: {
        operationId: 'accessCodesDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  device_id: { format: 'uuid', type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['access_code_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/delete',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'delete',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/access_codes/generate_code': {
      post: {
        operationId: 'accessCodesGenerateCodePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { device_id: { format: 'uuid', type: 'string' } },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    generated_code: {
                      $ref: '#/components/schemas/access_code',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['generated_code', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/generate_code',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'generate_code',
        'x-fern-sdk-return-value': 'generated_code',
      },
    },
    '/access_codes/get': {
      post: {
        operationId: 'accessCodesGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  code: { type: 'string' },
                  device_id: { format: 'uuid', type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    access_code: { $ref: '#/components/schemas/access_code' },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_code', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { access_token: [] },
          { user_session: [] },
          { client_session: [] },
        ],
        summary: '/access_codes/get',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'access_code',
      },
    },
    '/access_codes/list': {
      post: {
        operationId: 'accessCodesListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  device_id: { format: 'uuid', type: 'string' },
                  user_identifier_key: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    access_codes: {
                      items: { $ref: '#/components/schemas/access_code' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_codes', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/list',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'access_codes',
      },
    },
    '/access_codes/pull_backup_access_code': {
      post: {
        operationId: 'accessCodesPullBackupAccessCodePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                },
                required: ['access_code_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    backup_access_code: {
                      $ref: '#/components/schemas/access_code',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['backup_access_code', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/pull_backup_access_code',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'pull_backup_access_code',
        'x-fern-sdk-return-value': 'backup_access_code',
      },
    },
    '/access_codes/simulate/create_unmanaged_access_code': {
      post: {
        operationId: 'accessCodesSimulateCreateUnmanagedAccessCodePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  code: {
                    maxLength: 8,
                    minLength: 4,
                    pattern: '^\\d+$',
                    type: 'string',
                  },
                  device_id: { format: 'uuid', type: 'string' },
                  name: { type: 'string' },
                },
                required: ['device_id', 'name', 'code'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    access_code: {
                      $ref: '#/components/schemas/unmanaged_access_code',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_code', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/simulate/create_unmanaged_access_code',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'simulate'],
        'x-fern-sdk-method-name': 'create_unmanaged_access_code',
        'x-fern-sdk-return-value': 'access_code',
      },
    },
    '/access_codes/unmanaged/convert_to_managed': {
      patch: {
        operationId: 'accessCodesUnmanagedConvertToManagedPatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  allow_external_modification: { type: 'boolean' },
                  force: { type: 'boolean' },
                  is_external_modification_allowed: { type: 'boolean' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['access_code_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/convert_to_managed',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'accessCodesUnmanagedConvertToManagedPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  allow_external_modification: { type: 'boolean' },
                  force: { type: 'boolean' },
                  is_external_modification_allowed: { type: 'boolean' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['access_code_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/convert_to_managed',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'convert_to_managed',
      },
    },
    '/access_codes/unmanaged/delete': {
      post: {
        operationId: 'accessCodesUnmanagedDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['access_code_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/delete',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'delete',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/access_codes/unmanaged/get': {
      post: {
        operationId: 'accessCodesUnmanagedGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  code: { type: 'string' },
                  device_id: { format: 'uuid', type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    access_code: {
                      $ref: '#/components/schemas/unmanaged_access_code',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_code', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/get',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'access_code',
      },
    },
    '/access_codes/unmanaged/list': {
      post: {
        operationId: 'accessCodesUnmanagedListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  user_identifier_key: { type: 'string' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    access_codes: {
                      items: {
                        $ref: '#/components/schemas/unmanaged_access_code',
                      },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_codes', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/list',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'access_codes',
      },
    },
    '/access_codes/unmanaged/update': {
      patch: {
        operationId: 'accessCodesUnmanagedUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  allow_external_modification: { type: 'boolean' },
                  force: { type: 'boolean' },
                  is_external_modification_allowed: { type: 'boolean' },
                  is_managed: { type: 'boolean' },
                },
                required: ['access_code_id', 'is_managed'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/update',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'accessCodesUnmanagedUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  allow_external_modification: { type: 'boolean' },
                  force: { type: 'boolean' },
                  is_external_modification_allowed: { type: 'boolean' },
                  is_managed: { type: 'boolean' },
                },
                required: ['access_code_id', 'is_managed'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/update',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'update',
      },
    },
    '/access_codes/update': {
      patch: {
        operationId: 'accessCodesUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  allow_external_modification: { type: 'boolean' },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  code: {
                    maxLength: 8,
                    minLength: 4,
                    pattern: '^\\d+$',
                    type: 'string',
                  },
                  device_id: { format: 'uuid', type: 'string' },
                  ends_at: { type: 'string' },
                  is_external_modification_allowed: { type: 'boolean' },
                  is_managed: { type: 'boolean' },
                  is_offline_access_code: { type: 'boolean' },
                  is_one_time_use: { type: 'boolean' },
                  max_time_rounding: {
                    default: '1hour',
                    enum: ['1hour', '1day', '1h', '1d'],
                    type: 'string',
                  },
                  name: { type: 'string' },
                  prefer_native_scheduling: { type: 'boolean' },
                  starts_at: { type: 'string' },
                  sync: { default: false, type: 'boolean' },
                  type: { enum: ['ongoing', 'time_bound'], type: 'string' },
                  use_backup_access_code_pool: { type: 'boolean' },
                  use_offline_access_code: { type: 'boolean' },
                },
                required: ['access_code_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/update',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'accessCodesUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  allow_external_modification: { type: 'boolean' },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  code: {
                    maxLength: 8,
                    minLength: 4,
                    pattern: '^\\d+$',
                    type: 'string',
                  },
                  device_id: { format: 'uuid', type: 'string' },
                  ends_at: { type: 'string' },
                  is_external_modification_allowed: { type: 'boolean' },
                  is_managed: { type: 'boolean' },
                  is_offline_access_code: { type: 'boolean' },
                  is_one_time_use: { type: 'boolean' },
                  max_time_rounding: {
                    default: '1hour',
                    enum: ['1hour', '1day', '1h', '1d'],
                    type: 'string',
                  },
                  name: { type: 'string' },
                  prefer_native_scheduling: { type: 'boolean' },
                  starts_at: { type: 'string' },
                  sync: { default: false, type: 'boolean' },
                  type: { enum: ['ongoing', 'time_bound'], type: 'string' },
                  use_backup_access_code_pool: { type: 'boolean' },
                  use_offline_access_code: { type: 'boolean' },
                },
                required: ['access_code_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/update',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'update',
        'x-fern-sdk-return-value': 'action_attempt',
      },
      put: {
        operationId: 'accessCodesUpdatePut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  allow_external_modification: { type: 'boolean' },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  code: {
                    maxLength: 8,
                    minLength: 4,
                    pattern: '^\\d+$',
                    type: 'string',
                  },
                  device_id: { format: 'uuid', type: 'string' },
                  ends_at: { type: 'string' },
                  is_external_modification_allowed: { type: 'boolean' },
                  is_managed: { type: 'boolean' },
                  is_offline_access_code: { type: 'boolean' },
                  is_one_time_use: { type: 'boolean' },
                  max_time_rounding: {
                    default: '1hour',
                    enum: ['1hour', '1day', '1h', '1d'],
                    type: 'string',
                  },
                  name: { type: 'string' },
                  prefer_native_scheduling: { type: 'boolean' },
                  starts_at: { type: 'string' },
                  sync: { default: false, type: 'boolean' },
                  type: { enum: ['ongoing', 'time_bound'], type: 'string' },
                  use_backup_access_code_pool: { type: 'boolean' },
                  use_offline_access_code: { type: 'boolean' },
                },
                required: ['access_code_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/update',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
      },
    },
    '/acs/access_groups/add_user': {
      post: {
        operationId: 'acsAccessGroupsAddUserPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_access_group_id', 'acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/add_user',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'add_user',
      },
      put: {
        operationId: 'acsAccessGroupsAddUserPut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_access_group_id', 'acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/add_user',
        tags: ['/acs'],
        'x-fern-ignore': true,
      },
    },
    '/acs/access_groups/get': {
      post: {
        operationId: 'acsAccessGroupsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_access_group_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_access_group: {
                      $ref: '#/components/schemas/acs_access_group',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_access_group', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'get',
      },
    },
    '/acs/access_groups/list': {
      post: {
        operationId: 'acsAccessGroupsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_system_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_access_groups: {
                      items: { $ref: '#/components/schemas/acs_access_group' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_access_groups', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'list',
      },
    },
    '/acs/access_groups/list_users': {
      post: {
        operationId: 'acsAccessGroupsListUsersPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_access_group_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_users: {
                      items: { $ref: '#/components/schemas/acs_user' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_users', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/list_users',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'list_users',
      },
    },
    '/acs/access_groups/remove_user': {
      post: {
        operationId: 'acsAccessGroupsRemoveUserPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_access_group_id', 'acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/remove_user',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'remove_user',
      },
    },
    '/acs/credential_pools/list': {
      post: {
        operationId: 'acsCredentialPoolsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_system_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_system_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credential_pools: {
                      items: {
                        properties: {
                          acs_credential_pool_id: {
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_system_id: { format: 'uuid', type: 'string' },
                          created_at: { format: 'date-time', type: 'string' },
                          display_name: { minLength: 1, type: 'string' },
                          external_type: {
                            enum: ['hid_part_number'],
                            type: 'string',
                          },
                          external_type_display_name: { type: 'string' },
                          workspace_id: { format: 'uuid', type: 'string' },
                        },
                        required: [
                          'acs_credential_pool_id',
                          'acs_system_id',
                          'display_name',
                          'external_type',
                          'external_type_display_name',
                          'created_at',
                          'workspace_id',
                        ],
                        type: 'object',
                      },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credential_pools', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credential_pools/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credential_pools'],
        'x-fern-sdk-method-name': 'list',
      },
    },
    '/acs/credential_provisioning_automations/launch': {
      post: {
        operationId: 'acsCredentialProvisioningAutomationsLaunchPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_pool_id: { format: 'uuid', type: 'string' },
                  create_credential_manager_user: { type: 'boolean' },
                  credential_manager_acs_system_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                  credential_manager_acs_user_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: [
                  'user_identity_id',
                  'credential_manager_acs_system_id',
                ],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credential_provisioning_automation: {
                      properties: {
                        acs_credential_provisioning_automation_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        created_at: { format: 'date-time', type: 'string' },
                        credential_manager_acs_system_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        user_identity_id: { format: 'uuid', type: 'string' },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'acs_credential_provisioning_automation_id',
                        'credential_manager_acs_system_id',
                        'user_identity_id',
                        'created_at',
                        'workspace_id',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credential_provisioning_automation', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credential_provisioning_automations/launch',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credential_provisioning_automations'],
        'x-fern-sdk-method-name': 'launch',
      },
    },
    '/acs/credentials/assign': {
      patch: {
        operationId: 'acsCredentialsAssignPatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_user_id', 'acs_credential_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credential: {
                      properties: {
                        access_method: {
                          enum: ['code', 'card', 'mobile_key'],
                          type: 'string',
                        },
                        acs_credential_id: { format: 'uuid', type: 'string' },
                        acs_credential_pool_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_system_id: { format: 'uuid', type: 'string' },
                        acs_user_id: { format: 'uuid', type: 'string' },
                        code: { nullable: true, type: 'string' },
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { minLength: 1, type: 'string' },
                        ends_at: { type: 'string' },
                        errors: {
                          items: {
                            properties: {
                              error_code: { type: 'string' },
                              message: { type: 'string' },
                            },
                            required: ['error_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        external_type: {
                          enum: [
                            'pti_card',
                            'brivo_credential',
                            'hid_credential',
                            'visionline_card',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: { type: 'string' },
                        is_multi_phone_sync_credential: { type: 'boolean' },
                        parent_acs_credential_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        starts_at: { type: 'string' },
                        visionline_metadata: {
                          properties: {
                            common_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            guest_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            joiner_acs_credential_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                          },
                          type: 'object',
                        },
                        warnings: {
                          items: {
                            properties: {
                              message: { type: 'string' },
                              warning_code: { type: 'string' },
                            },
                            required: ['warning_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'acs_credential_id',
                        'acs_system_id',
                        'display_name',
                        'access_method',
                        'created_at',
                        'workspace_id',
                        'errors',
                        'warnings',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credential', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/assign',
        tags: ['/acs'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'acsCredentialsAssignPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_user_id', 'acs_credential_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credential: {
                      properties: {
                        access_method: {
                          enum: ['code', 'card', 'mobile_key'],
                          type: 'string',
                        },
                        acs_credential_id: { format: 'uuid', type: 'string' },
                        acs_credential_pool_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_system_id: { format: 'uuid', type: 'string' },
                        acs_user_id: { format: 'uuid', type: 'string' },
                        code: { nullable: true, type: 'string' },
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { minLength: 1, type: 'string' },
                        ends_at: { type: 'string' },
                        errors: {
                          items: {
                            properties: {
                              error_code: { type: 'string' },
                              message: { type: 'string' },
                            },
                            required: ['error_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        external_type: {
                          enum: [
                            'pti_card',
                            'brivo_credential',
                            'hid_credential',
                            'visionline_card',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: { type: 'string' },
                        is_multi_phone_sync_credential: { type: 'boolean' },
                        parent_acs_credential_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        starts_at: { type: 'string' },
                        visionline_metadata: {
                          properties: {
                            common_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            guest_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            joiner_acs_credential_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                          },
                          type: 'object',
                        },
                        warnings: {
                          items: {
                            properties: {
                              message: { type: 'string' },
                              warning_code: { type: 'string' },
                            },
                            required: ['warning_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'acs_credential_id',
                        'acs_system_id',
                        'display_name',
                        'access_method',
                        'created_at',
                        'workspace_id',
                        'errors',
                        'warnings',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credential', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/assign',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'assign',
      },
    },
    '/acs/credentials/create': {
      post: {
        operationId: 'acsCredentialsCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_method: {
                    enum: ['code', 'card', 'mobile_key'],
                    type: 'string',
                  },
                  acs_user_id: { format: 'uuid', type: 'string' },
                  allowed_acs_entrance_ids: {
                    default: [],
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  code: { pattern: '^\\d+$', type: 'string' },
                  credential_manager_acs_system_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                  ends_at: { format: 'date-time', type: 'string' },
                  is_multi_phone_sync_credential: {
                    default: false,
                    type: 'boolean',
                  },
                  starts_at: { format: 'date-time', type: 'string' },
                  visionline_metadata: {
                    properties: {
                      assa_abloy_credential_service_mobile_endpoint_id: {
                        format: 'uuid',
                        type: 'string',
                      },
                      card_format: {
                        enum: ['TLCode', 'rfid48'],
                        type: 'string',
                      },
                      is_override_key: { type: 'boolean' },
                      joiner_acs_credential_ids: {
                        items: { format: 'uuid', type: 'string' },
                        type: 'array',
                      },
                    },
                    type: 'object',
                  },
                },
                required: ['acs_user_id', 'access_method'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credential: {
                      properties: {
                        access_method: {
                          enum: ['code', 'card', 'mobile_key'],
                          type: 'string',
                        },
                        acs_credential_id: { format: 'uuid', type: 'string' },
                        acs_credential_pool_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_system_id: { format: 'uuid', type: 'string' },
                        acs_user_id: { format: 'uuid', type: 'string' },
                        code: { nullable: true, type: 'string' },
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { minLength: 1, type: 'string' },
                        ends_at: { type: 'string' },
                        errors: {
                          items: {
                            properties: {
                              error_code: { type: 'string' },
                              message: { type: 'string' },
                            },
                            required: ['error_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        external_type: {
                          enum: [
                            'pti_card',
                            'brivo_credential',
                            'hid_credential',
                            'visionline_card',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: { type: 'string' },
                        is_multi_phone_sync_credential: { type: 'boolean' },
                        parent_acs_credential_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        starts_at: { type: 'string' },
                        visionline_metadata: {
                          properties: {
                            common_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            guest_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            joiner_acs_credential_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                          },
                          type: 'object',
                        },
                        warnings: {
                          items: {
                            properties: {
                              message: { type: 'string' },
                              warning_code: { type: 'string' },
                            },
                            required: ['warning_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'acs_credential_id',
                        'acs_system_id',
                        'display_name',
                        'access_method',
                        'created_at',
                        'workspace_id',
                        'errors',
                        'warnings',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credential', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/create',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'create',
      },
    },
    '/acs/credentials/delete': {
      post: {
        operationId: 'acsCredentialsDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_credential_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/delete',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'delete',
      },
    },
    '/acs/credentials/get': {
      post: {
        operationId: 'acsCredentialsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_credential_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credential: {
                      properties: {
                        access_method: {
                          enum: ['code', 'card', 'mobile_key'],
                          type: 'string',
                        },
                        acs_credential_id: { format: 'uuid', type: 'string' },
                        acs_credential_pool_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_system_id: { format: 'uuid', type: 'string' },
                        acs_user_id: { format: 'uuid', type: 'string' },
                        code: { nullable: true, type: 'string' },
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { minLength: 1, type: 'string' },
                        ends_at: { type: 'string' },
                        errors: {
                          items: {
                            properties: {
                              error_code: { type: 'string' },
                              message: { type: 'string' },
                            },
                            required: ['error_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        external_type: {
                          enum: [
                            'pti_card',
                            'brivo_credential',
                            'hid_credential',
                            'visionline_card',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: { type: 'string' },
                        is_multi_phone_sync_credential: { type: 'boolean' },
                        parent_acs_credential_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        starts_at: { type: 'string' },
                        visionline_metadata: {
                          properties: {
                            common_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            guest_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            joiner_acs_credential_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                          },
                          type: 'object',
                        },
                        warnings: {
                          items: {
                            properties: {
                              message: { type: 'string' },
                              warning_code: { type: 'string' },
                            },
                            required: ['warning_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'acs_credential_id',
                        'acs_system_id',
                        'display_name',
                        'access_method',
                        'created_at',
                        'workspace_id',
                        'errors',
                        'warnings',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credential', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'get',
      },
    },
    '/acs/credentials/list': {
      post: {
        operationId: 'acsCredentialsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                allOf: [
                  {
                    oneOf: [
                      {
                        properties: {
                          acs_user_id: { format: 'uuid', type: 'string' },
                        },
                        required: ['acs_user_id'],
                        type: 'object',
                      },
                      {
                        properties: {
                          acs_system_id: { format: 'uuid', type: 'string' },
                        },
                        required: ['acs_system_id'],
                        type: 'object',
                      },
                      {
                        properties: {
                          acs_system_id: { format: 'uuid', type: 'string' },
                          acs_user_id: { format: 'uuid', type: 'string' },
                        },
                        required: ['acs_user_id', 'acs_system_id'],
                        type: 'object',
                      },
                      {
                        properties: {
                          user_identity_id: { format: 'uuid', type: 'string' },
                        },
                        required: ['user_identity_id'],
                        type: 'object',
                      },
                    ],
                  },
                  {
                    properties: {
                      is_multi_phone_sync_credential: { type: 'boolean' },
                    },
                    type: 'object',
                  },
                ],
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credentials: {
                      items: {
                        properties: {
                          access_method: {
                            enum: ['code', 'card', 'mobile_key'],
                            type: 'string',
                          },
                          acs_credential_id: { format: 'uuid', type: 'string' },
                          acs_credential_pool_id: {
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_system_id: { format: 'uuid', type: 'string' },
                          acs_user_id: { format: 'uuid', type: 'string' },
                          code: { nullable: true, type: 'string' },
                          created_at: { format: 'date-time', type: 'string' },
                          display_name: { minLength: 1, type: 'string' },
                          ends_at: { type: 'string' },
                          errors: {
                            items: {
                              properties: {
                                error_code: { type: 'string' },
                                message: { type: 'string' },
                              },
                              required: ['error_code', 'message'],
                              type: 'object',
                            },
                            type: 'array',
                          },
                          external_type: {
                            enum: [
                              'pti_card',
                              'brivo_credential',
                              'hid_credential',
                              'visionline_card',
                            ],
                            type: 'string',
                          },
                          external_type_display_name: { type: 'string' },
                          is_multi_phone_sync_credential: { type: 'boolean' },
                          parent_acs_credential_id: {
                            format: 'uuid',
                            type: 'string',
                          },
                          starts_at: { type: 'string' },
                          visionline_metadata: {
                            properties: {
                              common_acs_entrance_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                              guest_acs_entrance_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                              joiner_acs_credential_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                            },
                            type: 'object',
                          },
                          warnings: {
                            items: {
                              properties: {
                                message: { type: 'string' },
                                warning_code: { type: 'string' },
                              },
                              required: ['warning_code', 'message'],
                              type: 'object',
                            },
                            type: 'array',
                          },
                          workspace_id: { format: 'uuid', type: 'string' },
                        },
                        required: [
                          'acs_credential_id',
                          'acs_system_id',
                          'display_name',
                          'access_method',
                          'created_at',
                          'workspace_id',
                          'errors',
                          'warnings',
                        ],
                        type: 'object',
                      },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credentials', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/acs/credentials/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'list',
      },
    },
    '/acs/credentials/unassign': {
      patch: {
        operationId: 'acsCredentialsUnassignPatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_user_id', 'acs_credential_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credential: {
                      properties: {
                        access_method: {
                          enum: ['code', 'card', 'mobile_key'],
                          type: 'string',
                        },
                        acs_credential_id: { format: 'uuid', type: 'string' },
                        acs_credential_pool_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_system_id: { format: 'uuid', type: 'string' },
                        acs_user_id: { format: 'uuid', type: 'string' },
                        code: { nullable: true, type: 'string' },
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { minLength: 1, type: 'string' },
                        ends_at: { type: 'string' },
                        errors: {
                          items: {
                            properties: {
                              error_code: { type: 'string' },
                              message: { type: 'string' },
                            },
                            required: ['error_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        external_type: {
                          enum: [
                            'pti_card',
                            'brivo_credential',
                            'hid_credential',
                            'visionline_card',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: { type: 'string' },
                        is_multi_phone_sync_credential: { type: 'boolean' },
                        parent_acs_credential_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        starts_at: { type: 'string' },
                        visionline_metadata: {
                          properties: {
                            common_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            guest_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            joiner_acs_credential_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                          },
                          type: 'object',
                        },
                        warnings: {
                          items: {
                            properties: {
                              message: { type: 'string' },
                              warning_code: { type: 'string' },
                            },
                            required: ['warning_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'acs_credential_id',
                        'acs_system_id',
                        'display_name',
                        'access_method',
                        'created_at',
                        'workspace_id',
                        'errors',
                        'warnings',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credential', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/unassign',
        tags: ['/acs'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'acsCredentialsUnassignPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_user_id', 'acs_credential_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credential: {
                      properties: {
                        access_method: {
                          enum: ['code', 'card', 'mobile_key'],
                          type: 'string',
                        },
                        acs_credential_id: { format: 'uuid', type: 'string' },
                        acs_credential_pool_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_system_id: { format: 'uuid', type: 'string' },
                        acs_user_id: { format: 'uuid', type: 'string' },
                        code: { nullable: true, type: 'string' },
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { minLength: 1, type: 'string' },
                        ends_at: { type: 'string' },
                        errors: {
                          items: {
                            properties: {
                              error_code: { type: 'string' },
                              message: { type: 'string' },
                            },
                            required: ['error_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        external_type: {
                          enum: [
                            'pti_card',
                            'brivo_credential',
                            'hid_credential',
                            'visionline_card',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: { type: 'string' },
                        is_multi_phone_sync_credential: { type: 'boolean' },
                        parent_acs_credential_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        starts_at: { type: 'string' },
                        visionline_metadata: {
                          properties: {
                            common_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            guest_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            joiner_acs_credential_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                          },
                          type: 'object',
                        },
                        warnings: {
                          items: {
                            properties: {
                              message: { type: 'string' },
                              warning_code: { type: 'string' },
                            },
                            required: ['warning_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'acs_credential_id',
                        'acs_system_id',
                        'display_name',
                        'access_method',
                        'created_at',
                        'workspace_id',
                        'errors',
                        'warnings',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credential', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/unassign',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'unassign',
      },
    },
    '/acs/credentials/update': {
      patch: {
        operationId: 'acsCredentialsUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: { type: 'string' },
                  code: { pattern: '^\\d+$', type: 'string' },
                },
                required: ['acs_credential_id', 'code'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credential: {
                      properties: {
                        access_method: {
                          enum: ['code', 'card', 'mobile_key'],
                          type: 'string',
                        },
                        acs_credential_id: { format: 'uuid', type: 'string' },
                        acs_credential_pool_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_system_id: { format: 'uuid', type: 'string' },
                        acs_user_id: { format: 'uuid', type: 'string' },
                        code: { nullable: true, type: 'string' },
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { minLength: 1, type: 'string' },
                        ends_at: { type: 'string' },
                        errors: {
                          items: {
                            properties: {
                              error_code: { type: 'string' },
                              message: { type: 'string' },
                            },
                            required: ['error_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        external_type: {
                          enum: [
                            'pti_card',
                            'brivo_credential',
                            'hid_credential',
                            'visionline_card',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: { type: 'string' },
                        is_multi_phone_sync_credential: { type: 'boolean' },
                        parent_acs_credential_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        starts_at: { type: 'string' },
                        visionline_metadata: {
                          properties: {
                            common_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            guest_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            joiner_acs_credential_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                          },
                          type: 'object',
                        },
                        warnings: {
                          items: {
                            properties: {
                              message: { type: 'string' },
                              warning_code: { type: 'string' },
                            },
                            required: ['warning_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'acs_credential_id',
                        'acs_system_id',
                        'display_name',
                        'access_method',
                        'created_at',
                        'workspace_id',
                        'errors',
                        'warnings',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credential', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/update',
        tags: ['/acs'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'acsCredentialsUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: { type: 'string' },
                  code: { pattern: '^\\d+$', type: 'string' },
                },
                required: ['acs_credential_id', 'code'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credential: {
                      properties: {
                        access_method: {
                          enum: ['code', 'card', 'mobile_key'],
                          type: 'string',
                        },
                        acs_credential_id: { format: 'uuid', type: 'string' },
                        acs_credential_pool_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_system_id: { format: 'uuid', type: 'string' },
                        acs_user_id: { format: 'uuid', type: 'string' },
                        code: { nullable: true, type: 'string' },
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { minLength: 1, type: 'string' },
                        ends_at: { type: 'string' },
                        errors: {
                          items: {
                            properties: {
                              error_code: { type: 'string' },
                              message: { type: 'string' },
                            },
                            required: ['error_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        external_type: {
                          enum: [
                            'pti_card',
                            'brivo_credential',
                            'hid_credential',
                            'visionline_card',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: { type: 'string' },
                        is_multi_phone_sync_credential: { type: 'boolean' },
                        parent_acs_credential_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        starts_at: { type: 'string' },
                        visionline_metadata: {
                          properties: {
                            common_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            guest_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            joiner_acs_credential_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                          },
                          type: 'object',
                        },
                        warnings: {
                          items: {
                            properties: {
                              message: { type: 'string' },
                              warning_code: { type: 'string' },
                            },
                            required: ['warning_code', 'message'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'acs_credential_id',
                        'acs_system_id',
                        'display_name',
                        'access_method',
                        'created_at',
                        'workspace_id',
                        'errors',
                        'warnings',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credential', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/update',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'update',
      },
    },
    '/acs/entrances/get': {
      post: {
        operationId: 'acsEntrancesGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_entrance_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_entrance_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_entrance: {
                      properties: {
                        acs_entrance_id: { format: 'uuid', type: 'string' },
                        acs_system_id: { format: 'uuid', type: 'string' },
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { type: 'string' },
                        latch_metadata: {
                          nullable: true,
                          properties: {
                            accessibility_type: { type: 'string' },
                            is_connected: { type: 'boolean' },
                            name: { type: 'string' },
                            type: { type: 'string' },
                          },
                          required: [
                            'accessibility_type',
                            'name',
                            'type',
                            'is_connected',
                          ],
                          type: 'object',
                        },
                        visionline_metadata: {
                          nullable: true,
                          properties: {
                            door_category: {
                              enum: [
                                'entrance',
                                'guest',
                                'elevator reader',
                                'common',
                                'common (PMS)',
                              ],
                              type: 'string',
                            },
                            door_name: { type: 'string' },
                            profiles: {
                              items: {
                                properties: {
                                  visionline_door_profile_id: {
                                    type: 'string',
                                  },
                                  visionline_door_profile_type: {
                                    enum: ['BLE', 'commonDoor', 'touch'],
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'visionline_door_profile_id',
                                  'visionline_door_profile_type',
                                ],
                                type: 'object',
                              },
                              type: 'array',
                            },
                          },
                          required: ['door_name', 'door_category'],
                          type: 'object',
                        },
                      },
                      required: [
                        'acs_entrance_id',
                        'display_name',
                        'acs_system_id',
                        'created_at',
                        'latch_metadata',
                        'visionline_metadata',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_entrance', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { access_token: [] },
          { user_session: [] },
          { client_session: [] },
        ],
        summary: '/acs/entrances/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'entrances'],
        'x-fern-sdk-method-name': 'get',
      },
    },
    '/acs/entrances/grant_access': {
      post: {
        operationId: 'acsEntrancesGrantAccessPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_entrance_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_entrance_id', 'acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/acs/entrances/grant_access',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'entrances'],
        'x-fern-sdk-method-name': 'grant_access',
      },
    },
    '/acs/entrances/list': {
      post: {
        operationId: 'acsEntrancesListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: { format: 'uuid', type: 'string' },
                  acs_system_id: { format: 'uuid', type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_entrances: {
                      items: {
                        properties: {
                          acs_entrance_id: { format: 'uuid', type: 'string' },
                          acs_system_id: { format: 'uuid', type: 'string' },
                          created_at: { format: 'date-time', type: 'string' },
                          display_name: { type: 'string' },
                          latch_metadata: {
                            nullable: true,
                            properties: {
                              accessibility_type: { type: 'string' },
                              is_connected: { type: 'boolean' },
                              name: { type: 'string' },
                              type: { type: 'string' },
                            },
                            required: [
                              'accessibility_type',
                              'name',
                              'type',
                              'is_connected',
                            ],
                            type: 'object',
                          },
                          visionline_metadata: {
                            nullable: true,
                            properties: {
                              door_category: {
                                enum: [
                                  'entrance',
                                  'guest',
                                  'elevator reader',
                                  'common',
                                  'common (PMS)',
                                ],
                                type: 'string',
                              },
                              door_name: { type: 'string' },
                              profiles: {
                                items: {
                                  properties: {
                                    visionline_door_profile_id: {
                                      type: 'string',
                                    },
                                    visionline_door_profile_type: {
                                      enum: ['BLE', 'commonDoor', 'touch'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'visionline_door_profile_id',
                                    'visionline_door_profile_type',
                                  ],
                                  type: 'object',
                                },
                                type: 'array',
                              },
                            },
                            required: ['door_name', 'door_category'],
                            type: 'object',
                          },
                        },
                        required: [
                          'acs_entrance_id',
                          'display_name',
                          'acs_system_id',
                          'created_at',
                          'latch_metadata',
                          'visionline_metadata',
                        ],
                        type: 'object',
                      },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_entrances', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/acs/entrances/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'entrances'],
        'x-fern-sdk-method-name': 'list',
      },
    },
    '/acs/entrances/list_credentials_with_access': {
      post: {
        operationId: 'acsEntrancesListCredentialsWithAccessPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_entrance_id: { format: 'uuid', type: 'string' },
                  include_if: {
                    items: {
                      enum: ['visionline_metadata.is_valid'],
                      type: 'string',
                    },
                    type: 'array',
                  },
                },
                required: ['acs_entrance_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_credentials: {
                      items: {
                        properties: {
                          access_method: {
                            enum: ['code', 'card', 'mobile_key'],
                            type: 'string',
                          },
                          acs_credential_id: { format: 'uuid', type: 'string' },
                          acs_credential_pool_id: {
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_system_id: { format: 'uuid', type: 'string' },
                          acs_user_id: { format: 'uuid', type: 'string' },
                          code: { nullable: true, type: 'string' },
                          created_at: { format: 'date-time', type: 'string' },
                          display_name: { minLength: 1, type: 'string' },
                          ends_at: { type: 'string' },
                          errors: {
                            items: {
                              properties: {
                                error_code: { type: 'string' },
                                message: { type: 'string' },
                              },
                              required: ['error_code', 'message'],
                              type: 'object',
                            },
                            type: 'array',
                          },
                          external_type: {
                            enum: [
                              'pti_card',
                              'brivo_credential',
                              'hid_credential',
                              'visionline_card',
                            ],
                            type: 'string',
                          },
                          external_type_display_name: { type: 'string' },
                          is_multi_phone_sync_credential: { type: 'boolean' },
                          parent_acs_credential_id: {
                            format: 'uuid',
                            type: 'string',
                          },
                          starts_at: { type: 'string' },
                          visionline_metadata: {
                            properties: {
                              common_acs_entrance_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                              guest_acs_entrance_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                              joiner_acs_credential_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                            },
                            type: 'object',
                          },
                          warnings: {
                            items: {
                              properties: {
                                message: { type: 'string' },
                                warning_code: { type: 'string' },
                              },
                              required: ['warning_code', 'message'],
                              type: 'object',
                            },
                            type: 'array',
                          },
                          workspace_id: { format: 'uuid', type: 'string' },
                        },
                        required: [
                          'acs_credential_id',
                          'acs_system_id',
                          'display_name',
                          'access_method',
                          'created_at',
                          'workspace_id',
                          'errors',
                          'warnings',
                        ],
                        type: 'object',
                      },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_credentials', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/entrances/list_credentials_with_access',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'entrances'],
        'x-fern-sdk-method-name': 'list_credentials_with_access',
      },
    },
    '/acs/systems/get': {
      post: {
        operationId: 'acsSystemsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_system_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_system_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_system: { $ref: '#/components/schemas/acs_system' },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_system', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/systems/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'systems'],
        'x-fern-sdk-method-name': 'get',
      },
    },
    '/acs/systems/list': {
      post: {
        operationId: 'acsSystemsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connected_account_id: { format: 'uuid', type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_systems: {
                      items: { $ref: '#/components/schemas/acs_system' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_systems', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/systems/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'systems'],
        'x-fern-sdk-method-name': 'list',
      },
    },
    '/acs/users/add_to_access_group': {
      post: {
        operationId: 'acsUsersAddToAccessGroupPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_user_id', 'acs_access_group_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/add_to_access_group',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'add_to_access_group',
      },
      put: {
        operationId: 'acsUsersAddToAccessGroupPut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_user_id', 'acs_access_group_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/add_to_access_group',
        tags: ['/acs'],
        'x-fern-ignore': true,
      },
    },
    '/acs/users/create': {
      post: {
        operationId: 'acsUsersCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_schedule: {
                    properties: {
                      ends_at: { format: 'date-time', type: 'string' },
                      starts_at: { format: 'date-time', type: 'string' },
                    },
                    required: ['starts_at', 'ends_at'],
                    type: 'object',
                  },
                  acs_access_group_ids: {
                    default: [],
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  acs_system_id: { format: 'uuid', type: 'string' },
                  email: {
                    description:
                      '\n    ---\n    deprecated: use email_address.\n    ---\n    ',
                    format: 'email',
                    type: 'string',
                  },
                  email_address: { format: 'email', type: 'string' },
                  full_name: { type: 'string' },
                  phone_number: { nullable: true, type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_system_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_user: { $ref: '#/components/schemas/acs_user' },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_user', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/create',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'create',
      },
    },
    '/acs/users/delete': {
      post: {
        operationId: 'acsUsersDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { acs_user_id: { format: 'uuid', type: 'string' } },
                required: ['acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/delete',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'delete',
      },
    },
    '/acs/users/get': {
      post: {
        operationId: 'acsUsersGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { acs_user_id: { format: 'uuid', type: 'string' } },
                required: ['acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_user: { $ref: '#/components/schemas/acs_user' },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_user', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'get',
      },
    },
    '/acs/users/list': {
      post: {
        operationId: 'acsUsersListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_system_id: { format: 'uuid', type: 'string' },
                  user_identity_email_address: { type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                  user_identity_phone_number: {
                    nullable: true,
                    type: 'string',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_users: {
                      items: { $ref: '#/components/schemas/acs_user' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_users', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'list',
      },
    },
    '/acs/users/list_accessible_entrances': {
      post: {
        operationId: 'acsUsersListAccessibleEntrancesPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { acs_user_id: { format: 'uuid', type: 'string' } },
                required: ['acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_entrances: {
                      items: {
                        properties: {
                          acs_entrance_id: { format: 'uuid', type: 'string' },
                          acs_system_id: { format: 'uuid', type: 'string' },
                          created_at: { format: 'date-time', type: 'string' },
                          display_name: { type: 'string' },
                          latch_metadata: {
                            nullable: true,
                            properties: {
                              accessibility_type: { type: 'string' },
                              is_connected: { type: 'boolean' },
                              name: { type: 'string' },
                              type: { type: 'string' },
                            },
                            required: [
                              'accessibility_type',
                              'name',
                              'type',
                              'is_connected',
                            ],
                            type: 'object',
                          },
                          visionline_metadata: {
                            nullable: true,
                            properties: {
                              door_category: {
                                enum: [
                                  'entrance',
                                  'guest',
                                  'elevator reader',
                                  'common',
                                  'common (PMS)',
                                ],
                                type: 'string',
                              },
                              door_name: { type: 'string' },
                              profiles: {
                                items: {
                                  properties: {
                                    visionline_door_profile_id: {
                                      type: 'string',
                                    },
                                    visionline_door_profile_type: {
                                      enum: ['BLE', 'commonDoor', 'touch'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'visionline_door_profile_id',
                                    'visionline_door_profile_type',
                                  ],
                                  type: 'object',
                                },
                                type: 'array',
                              },
                            },
                            required: ['door_name', 'door_category'],
                            type: 'object',
                          },
                        },
                        required: [
                          'acs_entrance_id',
                          'display_name',
                          'acs_system_id',
                          'created_at',
                          'latch_metadata',
                          'visionline_metadata',
                        ],
                        type: 'object',
                      },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_entrances', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/list_accessible_entrances',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'list_accessible_entrances',
      },
    },
    '/acs/users/remove_from_access_group': {
      post: {
        operationId: 'acsUsersRemoveFromAccessGroupPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: { format: 'uuid', type: 'string' },
                  acs_user_id: { format: 'uuid', type: 'string' },
                },
                required: ['acs_user_id', 'acs_access_group_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/remove_from_access_group',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'remove_from_access_group',
      },
    },
    '/acs/users/revoke_access_to_all_entrances': {
      post: {
        operationId: 'acsUsersRevokeAccessToAllEntrancesPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { acs_user_id: { format: 'uuid', type: 'string' } },
                required: ['acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/acs/users/revoke_access_to_all_entrances',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'revoke_access_to_all_entrances',
      },
    },
    '/acs/users/suspend': {
      post: {
        operationId: 'acsUsersSuspendPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { acs_user_id: { format: 'uuid', type: 'string' } },
                required: ['acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/suspend',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'suspend',
      },
    },
    '/acs/users/unsuspend': {
      post: {
        operationId: 'acsUsersUnsuspendPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { acs_user_id: { format: 'uuid', type: 'string' } },
                required: ['acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/acs/users/unsuspend',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'unsuspend',
      },
    },
    '/acs/users/update': {
      patch: {
        operationId: 'acsUsersUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_schedule: {
                    properties: {
                      ends_at: { format: 'date-time', type: 'string' },
                      starts_at: { format: 'date-time', type: 'string' },
                    },
                    required: ['starts_at', 'ends_at'],
                    type: 'object',
                  },
                  acs_user_id: { format: 'uuid', type: 'string' },
                  email: {
                    description:
                      '\n    ---\n    deprecated: use email_address.\n    ---\n    ',
                    format: 'email',
                    type: 'string',
                  },
                  email_address: { format: 'email', type: 'string' },
                  full_name: { type: 'string' },
                  hid_acs_system_id: { format: 'uuid', type: 'string' },
                  phone_number: { nullable: true, type: 'string' },
                },
                required: ['acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/acs/users/update',
        tags: ['/acs'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'acsUsersUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_schedule: {
                    properties: {
                      ends_at: { format: 'date-time', type: 'string' },
                      starts_at: { format: 'date-time', type: 'string' },
                    },
                    required: ['starts_at', 'ends_at'],
                    type: 'object',
                  },
                  acs_user_id: { format: 'uuid', type: 'string' },
                  email: {
                    description:
                      '\n    ---\n    deprecated: use email_address.\n    ---\n    ',
                    format: 'email',
                    type: 'string',
                  },
                  email_address: { format: 'email', type: 'string' },
                  full_name: { type: 'string' },
                  hid_acs_system_id: { format: 'uuid', type: 'string' },
                  phone_number: { nullable: true, type: 'string' },
                },
                required: ['acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/acs/users/update',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'update',
      },
    },
    '/action_attempts/get': {
      post: {
        operationId: 'actionAttemptsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  action_attempt_id: { format: 'uuid', type: 'string' },
                },
                required: ['action_attempt_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/action_attempts/get',
        tags: ['/action_attempts'],
        'x-fern-sdk-group-name': ['action_attempts'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/action_attempts/list': {
      post: {
        operationId: 'actionAttemptsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  action_attempt_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                },
                required: ['action_attempt_ids'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempts: {
                      items: { $ref: '#/components/schemas/action_attempt' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempts', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/action_attempts/list',
        tags: ['/action_attempts'],
        'x-fern-sdk-group-name': ['action_attempts'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'action_attempts',
      },
    },
    '/client_sessions/create': {
      post: {
        operationId: 'clientSessionsCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  connected_account_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  expires_at: {
                    format: 'date-time',
                    nullable: true,
                    type: 'string',
                  },
                  user_identifier_key: { minLength: 1, type: 'string' },
                  user_identity_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    client_session: {
                      $ref: '#/components/schemas/client_session',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_session', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/client_sessions/create',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'client_session',
      },
      put: {
        operationId: 'clientSessionsCreatePut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  connected_account_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  expires_at: {
                    format: 'date-time',
                    nullable: true,
                    type: 'string',
                  },
                  user_identifier_key: { minLength: 1, type: 'string' },
                  user_identity_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    client_session: {
                      $ref: '#/components/schemas/client_session',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_session', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/client_sessions/create',
        tags: ['/client_sessions'],
        'x-fern-ignore': true,
      },
    },
    '/client_sessions/delete': {
      post: {
        operationId: 'clientSessionsDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  client_session_id: { format: 'uuid', type: 'string' },
                },
                required: ['client_session_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/client_sessions/delete',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'delete',
      },
    },
    '/client_sessions/get': {
      post: {
        operationId: 'clientSessionsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  client_session_id: { type: 'string' },
                  user_identifier_key: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    client_session: {
                      $ref: '#/components/schemas/client_session',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_session', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/client_sessions/get',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'client_session',
      },
    },
    '/client_sessions/get_or_create': {
      post: {
        operationId: 'clientSessionsGetOrCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  connected_account_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  expires_at: {
                    format: 'date-time',
                    nullable: true,
                    type: 'string',
                  },
                  user_identifier_key: { minLength: 1, type: 'string' },
                  user_identity_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    client_session: {
                      $ref: '#/components/schemas/client_session',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_session', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/client_sessions/get_or_create',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'get_or_create',
        'x-fern-sdk-return-value': 'client_session',
      },
      put: {
        operationId: 'clientSessionsGetOrCreatePut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  connected_account_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  expires_at: {
                    format: 'date-time',
                    nullable: true,
                    type: 'string',
                  },
                  user_identifier_key: { minLength: 1, type: 'string' },
                  user_identity_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    client_session: {
                      $ref: '#/components/schemas/client_session',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_session', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/client_sessions/get_or_create',
        tags: ['/client_sessions'],
        'x-fern-ignore': true,
      },
    },
    '/client_sessions/grant_access': {
      patch: {
        operationId: 'clientSessionsGrantAccessPatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  client_session_id: { type: 'string' },
                  connect_webview_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  connected_account_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  user_identifier_key: { type: 'string' },
                  user_identity_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    client_session: {
                      $ref: '#/components/schemas/client_session',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_session', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/client_sessions/grant_access',
        tags: ['/client_sessions'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'clientSessionsGrantAccessPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  client_session_id: { type: 'string' },
                  connect_webview_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  connected_account_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                  user_identifier_key: { type: 'string' },
                  user_identity_ids: {
                    items: { type: 'string' },
                    type: 'array',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    client_session: {
                      $ref: '#/components/schemas/client_session',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_session', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/client_sessions/grant_access',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'grant_access',
      },
    },
    '/client_sessions/list': {
      post: {
        operationId: 'clientSessionsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  client_session_id: { type: 'string' },
                  connect_webview_id: { type: 'string' },
                  user_identifier_key: { type: 'string' },
                  user_identity_id: { type: 'string' },
                  without_user_identifier_key: { type: 'boolean' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    client_sessions: {
                      items: { $ref: '#/components/schemas/client_session' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_sessions', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/client_sessions/list',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'client_sessions',
      },
    },
    '/client_sessions/revoke': {
      post: {
        operationId: 'clientSessionsRevokePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  client_session_id: { format: 'uuid', type: 'string' },
                },
                required: ['client_session_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/client_sessions/revoke',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'revoke',
      },
    },
    '/connect_webviews/create': {
      post: {
        operationId: 'connectWebviewsCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  accepted_providers: {
                    items: {
                      enum: [
                        'akuvox',
                        'august',
                        'avigilon_alta',
                        'brivo',
                        'butterflymx',
                        'schlage',
                        'smartthings',
                        'yale',
                        'genie',
                        'doorking',
                        'salto',
                        'lockly',
                        'ttlock',
                        'linear',
                        'noiseaware',
                        'nuki',
                        'seam_relay_admin',
                        'igloo',
                        'kwikset',
                        'minut',
                        'my_2n',
                        'controlbyweb',
                        'nest',
                        'igloohome',
                        'ecobee',
                        'hubitat',
                        'four_suites',
                        'dormakaba_oracode',
                        'pti',
                        'wyze',
                        'seam_passport',
                        'visionline',
                        'assa_abloy_credential_service',
                        'seam_bridge',
                        'tedee',
                        'honeywell_resideo',
                        'latch',
                        'yale_access',
                        'hid_cm',
                        'google_nest',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  automatically_manage_new_devices: { type: 'boolean' },
                  custom_metadata: {
                    additionalProperties: {
                      nullable: true,
                      oneOf: [
                        { maxLength: 500, type: 'string' },
                        { type: 'boolean' },
                        { format: 'null', nullable: true, type: 'string' },
                      ],
                    },
                    type: 'object',
                  },
                  custom_redirect_failure_url: { type: 'string' },
                  custom_redirect_url: { type: 'string' },
                  device_selection_mode: {
                    enum: ['none', 'single', 'multiple'],
                    type: 'string',
                  },
                  provider_category: {
                    enum: [
                      'stable',
                      'consumer_smartlocks',
                      'thermostats',
                      'noise_sensors',
                      'access_control_systems',
                      'internal_beta',
                    ],
                    type: 'string',
                  },
                  wait_for_device_creation: { type: 'boolean' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    connect_webview: {
                      $ref: '#/components/schemas/connect_webview',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connect_webview', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { access_token: [], seam_workspace: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        summary: '/connect_webviews/create',
        tags: ['/connect_webviews'],
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'connect_webview',
      },
    },
    '/connect_webviews/delete': {
      post: {
        operationId: 'connectWebviewsDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_id: { format: 'uuid', type: 'string' },
                },
                required: ['connect_webview_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/connect_webviews/delete',
        tags: ['/connect_webviews'],
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'delete',
      },
    },
    '/connect_webviews/get': {
      post: {
        operationId: 'connectWebviewsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_id: { format: 'uuid', type: 'string' },
                },
                required: ['connect_webview_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    connect_webview: {
                      $ref: '#/components/schemas/connect_webview',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connect_webview', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/connect_webviews/get',
        tags: ['/connect_webviews'],
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'connect_webview',
      },
    },
    '/connect_webviews/list': {
      post: {
        operationId: 'connectWebviewsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    description:
                      "Returns devices where the webview's custom_metadata contains all of the provided key/value pairs.",
                    type: 'object',
                  },
                  user_identifier_key: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    connect_webviews: {
                      items: { $ref: '#/components/schemas/connect_webview' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connect_webviews', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { access_token: [], seam_workspace: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        summary: '/connect_webviews/list',
        tags: ['/connect_webviews'],
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'connect_webviews',
      },
    },
    '/connect_webviews/view': {
      get: {
        operationId: 'connectWebviewsViewGet',
        parameters: [
          {
            in: 'query',
            name: 'connect_webview_id',
            required: true,
            schema: { format: 'uuid', type: 'string' },
          },
          {
            in: 'query',
            name: 'auth_token',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'OK' },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/connect_webviews/view',
        tags: ['/connect_webviews'],
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'view',
      },
    },
    '/connected_accounts/delete': {
      post: {
        operationId: 'connectedAccountsDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connected_account_id: { format: 'uuid', type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['connected_account_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/connected_accounts/delete',
        tags: ['/connected_accounts'],
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'delete',
      },
    },
    '/connected_accounts/get': {
      post: {
        operationId: 'connectedAccountsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    properties: {
                      connected_account_id: { format: 'uuid', type: 'string' },
                    },
                    required: ['connected_account_id'],
                    type: 'object',
                  },
                  {
                    properties: { email: { format: 'email', type: 'string' } },
                    required: ['email'],
                    type: 'object',
                  },
                ],
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    connected_account: {
                      $ref: '#/components/schemas/connected_account',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connected_account', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/connected_accounts/get',
        tags: ['/connected_accounts'],
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'connected_account',
      },
    },
    '/connected_accounts/list': {
      post: {
        operationId: 'connectedAccountsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    description:
                      "Returns devices where the account's custom_metadata contains all of the provided key/value pairs.",
                    type: 'object',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    connected_accounts: {
                      items: { $ref: '#/components/schemas/connected_account' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connected_accounts', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/connected_accounts/list',
        tags: ['/connected_accounts'],
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'connected_accounts',
      },
    },
    '/connected_accounts/update': {
      post: {
        operationId: 'connectedAccountsUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  automatically_manage_new_devices: { type: 'boolean' },
                  connected_account_id: { format: 'uuid', type: 'string' },
                  custom_metadata: {
                    additionalProperties: {
                      nullable: true,
                      oneOf: [
                        { maxLength: 500, type: 'string' },
                        { type: 'boolean' },
                        { format: 'null', nullable: true, type: 'string' },
                      ],
                    },
                    type: 'object',
                  },
                },
                required: ['connected_account_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    connected_account: {
                      $ref: '#/components/schemas/connected_account',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connected_account', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/connected_accounts/update',
        tags: ['/connected_accounts'],
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'update',
        'x-fern-sdk-return-value': 'connected_account',
      },
    },
    '/devices/delete': {
      post: {
        operationId: 'devicesDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { device_id: { format: 'uuid', type: 'string' } },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/devices/delete',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'delete',
      },
    },
    '/devices/get': {
      post: {
        operationId: 'devicesGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  name: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    device: { $ref: '#/components/schemas/device' },
                    ok: { type: 'boolean' },
                  },
                  required: ['device', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/devices/get',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'device',
      },
    },
    '/devices/list': {
      post: {
        operationId: 'devicesListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_id: { format: 'uuid', type: 'string' },
                  connected_account_id: {
                    description:
                      'List all devices owned by this connected account',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  created_before: {
                    format: 'date-time',
                    nullable: true,
                    type: 'string',
                  },
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    type: 'object',
                  },
                  device_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  device_type: {
                    oneOf: [
                      {
                        enum: [
                          'akuvox_lock',
                          'august_lock',
                          'brivo_access_point',
                          'butterflymx_panel',
                          'avigilon_alta_entry',
                          'doorking_lock',
                          'genie_door',
                          'igloo_lock',
                          'linear_lock',
                          'lockly_lock',
                          'kwikset_lock',
                          'nuki_lock',
                          'salto_lock',
                          'schlage_lock',
                          'seam_relay',
                          'smartthings_lock',
                          'wyze_lock',
                          'yale_lock',
                          'two_n_intercom',
                          'controlbyweb_device',
                          'ttlock_lock',
                          'igloohome_lock',
                          'hubitat_lock',
                          'four_suites_door',
                          'dormakaba_oracode_door',
                          'tedee_lock',
                        ],
                        type: 'string',
                      },
                      {
                        enum: ['noiseaware_activity_zone', 'minut_sensor'],
                        type: 'string',
                      },
                      {
                        enum: [
                          'ecobee_thermostat',
                          'nest_thermostat',
                          'honeywell_resideo_thermostat',
                        ],
                        type: 'string',
                      },
                      { enum: ['ios_phone', 'android_phone'], type: 'string' },
                    ],
                  },
                  device_types: {
                    items: {
                      oneOf: [
                        {
                          enum: [
                            'akuvox_lock',
                            'august_lock',
                            'brivo_access_point',
                            'butterflymx_panel',
                            'avigilon_alta_entry',
                            'doorking_lock',
                            'genie_door',
                            'igloo_lock',
                            'linear_lock',
                            'lockly_lock',
                            'kwikset_lock',
                            'nuki_lock',
                            'salto_lock',
                            'schlage_lock',
                            'seam_relay',
                            'smartthings_lock',
                            'wyze_lock',
                            'yale_lock',
                            'two_n_intercom',
                            'controlbyweb_device',
                            'ttlock_lock',
                            'igloohome_lock',
                            'hubitat_lock',
                            'four_suites_door',
                            'dormakaba_oracode_door',
                            'tedee_lock',
                          ],
                          type: 'string',
                        },
                        {
                          enum: ['noiseaware_activity_zone', 'minut_sensor'],
                          type: 'string',
                        },
                        {
                          enum: [
                            'ecobee_thermostat',
                            'nest_thermostat',
                            'honeywell_resideo_thermostat',
                          ],
                          type: 'string',
                        },
                        {
                          enum: ['ios_phone', 'android_phone'],
                          type: 'string',
                        },
                      ],
                    },
                    type: 'array',
                  },
                  exclude_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_online_access_codes',
                        'can_simulate_removal',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  include_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_online_access_codes',
                        'can_simulate_removal',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  limit: { default: 500, nullable: true, type: 'number' },
                  manufacturer: {
                    enum: [
                      'akuvox',
                      'august',
                      'avigilon_alta',
                      'brivo',
                      'butterflymx',
                      'doorking',
                      'four_suites',
                      'genie',
                      'igloo',
                      'keywe',
                      'kwikset',
                      'linear',
                      'lockly',
                      'nuki',
                      'philia',
                      'salto',
                      'samsung',
                      'schlage',
                      'seam',
                      'unknown',
                      'wyze',
                      'yale',
                      'minut',
                      'two_n',
                      'ttlock',
                      'nest',
                      'igloohome',
                      'ecobee',
                      'hubitat',
                      'controlbyweb',
                      'smartthings',
                      'dormakaba_oracode',
                      'tedee',
                      'honeywell_resideo',
                    ],
                    type: 'string',
                  },
                  user_identifier_key: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    devices: {
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['devices', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/devices/list',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'devices',
      },
    },
    '/devices/list_device_providers': {
      post: {
        operationId: 'devicesListDeviceProvidersPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  provider_category: {
                    enum: [
                      'stable',
                      'consumer_smartlocks',
                      'thermostats',
                      'noise_sensors',
                      'access_control_systems',
                    ],
                    type: 'string',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    device_providers: {
                      items: { $ref: '#/components/schemas/device_provider' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['device_providers', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/devices/list_device_providers',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'list_device_providers',
        'x-fern-sdk-return-value': 'device_providers',
      },
    },
    '/devices/simulate/remove': {
      post: {
        operationId: 'devicesSimulateRemovePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { device_id: { format: 'uuid', type: 'string' } },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/devices/simulate/remove',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices', 'simulate'],
        'x-fern-sdk-method-name': 'remove',
      },
    },
    '/devices/unmanaged/get': {
      post: {
        operationId: 'devicesUnmanagedGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  name: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    device: { $ref: '#/components/schemas/unmanaged_device' },
                    ok: { type: 'boolean' },
                  },
                  required: ['device', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { access_token: [], seam_workspace: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        summary: '/devices/unmanaged/get',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices', 'unmanaged'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'device',
      },
    },
    '/devices/unmanaged/list': {
      post: {
        operationId: 'devicesUnmanagedListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_id: { format: 'uuid', type: 'string' },
                  connected_account_id: {
                    description:
                      'List all devices owned by this connected account',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  created_before: {
                    format: 'date-time',
                    nullable: true,
                    type: 'string',
                  },
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    type: 'object',
                  },
                  device_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  device_type: {
                    oneOf: [
                      {
                        enum: [
                          'akuvox_lock',
                          'august_lock',
                          'brivo_access_point',
                          'butterflymx_panel',
                          'avigilon_alta_entry',
                          'doorking_lock',
                          'genie_door',
                          'igloo_lock',
                          'linear_lock',
                          'lockly_lock',
                          'kwikset_lock',
                          'nuki_lock',
                          'salto_lock',
                          'schlage_lock',
                          'seam_relay',
                          'smartthings_lock',
                          'wyze_lock',
                          'yale_lock',
                          'two_n_intercom',
                          'controlbyweb_device',
                          'ttlock_lock',
                          'igloohome_lock',
                          'hubitat_lock',
                          'four_suites_door',
                          'dormakaba_oracode_door',
                          'tedee_lock',
                        ],
                        type: 'string',
                      },
                      {
                        enum: ['noiseaware_activity_zone', 'minut_sensor'],
                        type: 'string',
                      },
                      {
                        enum: [
                          'ecobee_thermostat',
                          'nest_thermostat',
                          'honeywell_resideo_thermostat',
                        ],
                        type: 'string',
                      },
                      { enum: ['ios_phone', 'android_phone'], type: 'string' },
                    ],
                  },
                  device_types: {
                    items: {
                      oneOf: [
                        {
                          enum: [
                            'akuvox_lock',
                            'august_lock',
                            'brivo_access_point',
                            'butterflymx_panel',
                            'avigilon_alta_entry',
                            'doorking_lock',
                            'genie_door',
                            'igloo_lock',
                            'linear_lock',
                            'lockly_lock',
                            'kwikset_lock',
                            'nuki_lock',
                            'salto_lock',
                            'schlage_lock',
                            'seam_relay',
                            'smartthings_lock',
                            'wyze_lock',
                            'yale_lock',
                            'two_n_intercom',
                            'controlbyweb_device',
                            'ttlock_lock',
                            'igloohome_lock',
                            'hubitat_lock',
                            'four_suites_door',
                            'dormakaba_oracode_door',
                            'tedee_lock',
                          ],
                          type: 'string',
                        },
                        {
                          enum: ['noiseaware_activity_zone', 'minut_sensor'],
                          type: 'string',
                        },
                        {
                          enum: [
                            'ecobee_thermostat',
                            'nest_thermostat',
                            'honeywell_resideo_thermostat',
                          ],
                          type: 'string',
                        },
                        {
                          enum: ['ios_phone', 'android_phone'],
                          type: 'string',
                        },
                      ],
                    },
                    type: 'array',
                  },
                  exclude_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_online_access_codes',
                        'can_simulate_removal',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  include_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_online_access_codes',
                        'can_simulate_removal',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  limit: { default: 500, nullable: true, type: 'number' },
                  manufacturer: {
                    enum: [
                      'akuvox',
                      'august',
                      'avigilon_alta',
                      'brivo',
                      'butterflymx',
                      'doorking',
                      'four_suites',
                      'genie',
                      'igloo',
                      'keywe',
                      'kwikset',
                      'linear',
                      'lockly',
                      'nuki',
                      'philia',
                      'salto',
                      'samsung',
                      'schlage',
                      'seam',
                      'unknown',
                      'wyze',
                      'yale',
                      'minut',
                      'two_n',
                      'ttlock',
                      'nest',
                      'igloohome',
                      'ecobee',
                      'hubitat',
                      'controlbyweb',
                      'smartthings',
                      'dormakaba_oracode',
                      'tedee',
                      'honeywell_resideo',
                    ],
                    type: 'string',
                  },
                  user_identifier_key: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    devices: {
                      items: { $ref: '#/components/schemas/unmanaged_device' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['devices', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/devices/unmanaged/list',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices', 'unmanaged'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'devices',
      },
    },
    '/devices/unmanaged/update': {
      patch: {
        operationId: 'devicesUnmanagedUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  is_managed: { enum: [true], type: 'boolean' },
                },
                required: ['device_id', 'is_managed'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/devices/unmanaged/update',
        tags: ['/devices'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'devicesUnmanagedUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  is_managed: { enum: [true], type: 'boolean' },
                },
                required: ['device_id', 'is_managed'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/devices/unmanaged/update',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices', 'unmanaged'],
        'x-fern-sdk-method-name': 'update',
      },
    },
    '/devices/update': {
      patch: {
        operationId: 'devicesUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  custom_metadata: {
                    additionalProperties: {
                      nullable: true,
                      oneOf: [
                        { maxLength: 500, type: 'string' },
                        { type: 'boolean' },
                        { format: 'null', nullable: true, type: 'string' },
                      ],
                    },
                    type: 'object',
                  },
                  device_id: { format: 'uuid', type: 'string' },
                  is_managed: { default: true, type: 'boolean' },
                  name: { nullable: true, type: 'string' },
                  properties: {
                    properties: { name: { nullable: true, type: 'string' } },
                    type: 'object',
                  },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/devices/update',
        tags: ['/devices'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'devicesUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  custom_metadata: {
                    additionalProperties: {
                      nullable: true,
                      oneOf: [
                        { maxLength: 500, type: 'string' },
                        { type: 'boolean' },
                        { format: 'null', nullable: true, type: 'string' },
                      ],
                    },
                    type: 'object',
                  },
                  device_id: { format: 'uuid', type: 'string' },
                  is_managed: { default: true, type: 'boolean' },
                  name: { nullable: true, type: 'string' },
                  properties: {
                    properties: { name: { nullable: true, type: 'string' } },
                    type: 'object',
                  },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/devices/update',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'update',
      },
    },
    '/events/get': {
      post: {
        operationId: 'eventsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  event_id: { format: 'uuid', type: 'string' },
                  event_type: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    event: { $ref: '#/components/schemas/event' },
                    message: { type: 'string' },
                    ok: { type: 'boolean' },
                  },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/events/get',
        tags: ['/events'],
        'x-fern-sdk-group-name': ['events'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'event',
      },
    },
    '/events/list': {
      post: {
        operationId: 'eventsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_code_id: { format: 'uuid', type: 'string' },
                  access_code_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  between: {
                    items: {
                      oneOf: [
                        { type: 'string' },
                        { format: 'date-time', type: 'string' },
                      ],
                    },
                    maxItems: 2,
                    minItems: 2,
                    type: 'array',
                  },
                  connected_account_id: { format: 'uuid', type: 'string' },
                  device_id: { format: 'uuid', type: 'string' },
                  device_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  event_type: {
                    enum: [
                      'device.connected',
                      'device.unmanaged.connected',
                      'device.disconnected',
                      'device.unmanaged.disconnected',
                      'device.converted_to_unmanaged',
                      'device.unmanaged.converted_to_managed',
                      'device.removed',
                      'device.deleted',
                      'device.tampered',
                      'device.low_battery',
                      'device.battery_status_changed',
                      'device.third_party_integration_detected',
                      'device.third_party_integration_no_longer_detected',
                      'device.salto.privacy_mode_activated',
                      'device.salto.privacy_mode_deactivated',
                      'device.connection_became_flaky',
                      'device.connection_stabilized',
                      'device.error.subscription_required',
                      'device.error.subscription_required.resolved',
                      'access_code.created',
                      'access_code.changed',
                      'access_code.scheduled_on_device',
                      'access_code.set_on_device',
                      'access_code.deleted',
                      'access_code.removed_from_device',
                      'access_code.failed_to_set_on_device',
                      'access_code.delay_in_setting_on_device',
                      'access_code.failed_to_remove_from_device',
                      'access_code.delay_in_removing_from_device',
                      'access_code.deleted_external_to_seam',
                      'access_code.modified_external_to_seam',
                      'access_code.unmanaged.converted_to_managed',
                      'access_code.unmanaged.failed_to_convert_to_managed',
                      'access_code.unmanaged.created',
                      'access_code.unmanaged.removed',
                      'lock.locked',
                      'lock.unlocked',
                      'phone.deactivated',
                      'connected_account.connected',
                      'connected_account.successful_login',
                      'connected_account.created',
                      'connected_account.deleted',
                      'connected_account.disconnected',
                      'connected_account.completed_first_sync',
                      'connected_account.completed_first_sync_after_reconnection',
                      'noise_sensor.noise_threshold_triggered',
                      'access_code.backup_access_code_pulled',
                      'acs_user.deleted',
                      'acs_credential.deleted',
                      'enrollment_automation.deleted',
                      'client_session.deleted',
                    ],
                    type: 'string',
                  },
                  event_types: {
                    items: {
                      enum: [
                        'device.connected',
                        'device.unmanaged.connected',
                        'device.disconnected',
                        'device.unmanaged.disconnected',
                        'device.converted_to_unmanaged',
                        'device.unmanaged.converted_to_managed',
                        'device.removed',
                        'device.deleted',
                        'device.tampered',
                        'device.low_battery',
                        'device.battery_status_changed',
                        'device.third_party_integration_detected',
                        'device.third_party_integration_no_longer_detected',
                        'device.salto.privacy_mode_activated',
                        'device.salto.privacy_mode_deactivated',
                        'device.connection_became_flaky',
                        'device.connection_stabilized',
                        'device.error.subscription_required',
                        'device.error.subscription_required.resolved',
                        'access_code.created',
                        'access_code.changed',
                        'access_code.scheduled_on_device',
                        'access_code.set_on_device',
                        'access_code.deleted',
                        'access_code.removed_from_device',
                        'access_code.failed_to_set_on_device',
                        'access_code.delay_in_setting_on_device',
                        'access_code.failed_to_remove_from_device',
                        'access_code.delay_in_removing_from_device',
                        'access_code.deleted_external_to_seam',
                        'access_code.modified_external_to_seam',
                        'access_code.unmanaged.converted_to_managed',
                        'access_code.unmanaged.failed_to_convert_to_managed',
                        'access_code.unmanaged.created',
                        'access_code.unmanaged.removed',
                        'lock.locked',
                        'lock.unlocked',
                        'phone.deactivated',
                        'connected_account.connected',
                        'connected_account.successful_login',
                        'connected_account.created',
                        'connected_account.deleted',
                        'connected_account.disconnected',
                        'connected_account.completed_first_sync',
                        'connected_account.completed_first_sync_after_reconnection',
                        'noise_sensor.noise_threshold_triggered',
                        'access_code.backup_access_code_pulled',
                        'acs_user.deleted',
                        'acs_credential.deleted',
                        'enrollment_automation.deleted',
                        'client_session.deleted',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  limit: { default: 500, nullable: true, type: 'number' },
                  since: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    events: {
                      items: { $ref: '#/components/schemas/event' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['events', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/events/list',
        tags: ['/events'],
        'x-fern-sdk-group-name': ['events'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'events',
      },
    },
    '/health': {
      get: {
        operationId: 'healthGet',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    last_service_evaluation_at: { type: 'string' },
                    msg: {
                      enum: ['I’m one with the Force. The Force is with me.'],
                      type: 'string',
                    },
                    ok: { type: 'boolean' },
                    service_health_statuses: {
                      items: { $ref: '#/components/schemas/service_health' },
                      type: 'array',
                    },
                  },
                  required: ['ok', 'msg', 'service_health_statuses'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/health',
        tags: ['/health'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'healthPost',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    last_service_evaluation_at: { type: 'string' },
                    msg: {
                      enum: ['I’m one with the Force. The Force is with me.'],
                      type: 'string',
                    },
                    ok: { type: 'boolean' },
                    service_health_statuses: {
                      items: { $ref: '#/components/schemas/service_health' },
                      type: 'array',
                    },
                  },
                  required: ['ok', 'msg', 'service_health_statuses'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/health',
        tags: ['/health'],
        'x-fern-ignore': true,
      },
    },
    '/health/get_health': {
      get: {
        operationId: 'healthGetHealthGet',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    last_service_evaluation_at: { type: 'string' },
                    msg: {
                      enum: ['I’m one with the Force. The Force is with me.'],
                      type: 'string',
                    },
                    ok: { type: 'boolean' },
                    service_health_statuses: {
                      items: { $ref: '#/components/schemas/service_health' },
                      type: 'array',
                    },
                  },
                  required: ['ok', 'msg', 'service_health_statuses'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/health/get_health',
        tags: ['/health'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'healthGetHealthPost',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    last_service_evaluation_at: { type: 'string' },
                    msg: {
                      enum: ['I’m one with the Force. The Force is with me.'],
                      type: 'string',
                    },
                    ok: { type: 'boolean' },
                    service_health_statuses: {
                      items: { $ref: '#/components/schemas/service_health' },
                      type: 'array',
                    },
                  },
                  required: ['ok', 'msg', 'service_health_statuses'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/health/get_health',
        tags: ['/health'],
        'x-fern-sdk-group-name': ['health'],
        'x-fern-sdk-method-name': 'get_health',
      },
    },
    '/health/get_service_health': {
      post: {
        operationId: 'healthGetServiceHealthPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { service: { type: 'string' } },
                required: ['service'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    last_service_evaluation_at: { type: 'string' },
                    ok: { type: 'boolean' },
                    service_health: {
                      $ref: '#/components/schemas/service_health',
                    },
                  },
                  required: [
                    'ok',
                    'last_service_evaluation_at',
                    'service_health',
                  ],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/health/get_service_health',
        tags: ['/health'],
        'x-fern-sdk-group-name': ['health'],
        'x-fern-sdk-method-name': 'get_service_health',
      },
    },
    '/health/service/[service_name]': {
      post: {
        operationId: 'healthServiceByServiceNamePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { service_name: { type: 'string' } },
                required: ['service_name'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    last_service_evaluation_at: { type: 'string' },
                    ok: { type: 'boolean' },
                    service_health: {
                      $ref: '#/components/schemas/service_health',
                    },
                  },
                  required: [
                    'ok',
                    'last_service_evaluation_at',
                    'service_health',
                  ],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        summary: '/health/service/[service_name]',
        tags: ['/health'],
        'x-fern-sdk-group-name': ['health', 'service'],
        'x-fern-sdk-method-name': 'by_service_name',
      },
    },
    '/locks/get': {
      post: {
        operationId: 'locksGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  name: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    device: { $ref: '#/components/schemas/device' },
                    lock: { $ref: '#/components/schemas/device' },
                    ok: { type: 'boolean' },
                  },
                  required: ['lock', 'device', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/locks/get',
        tags: ['/locks'],
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'device',
      },
    },
    '/locks/list': {
      post: {
        operationId: 'locksListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_id: { format: 'uuid', type: 'string' },
                  connected_account_id: {
                    description:
                      'List all devices owned by this connected account',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  created_before: {
                    format: 'date-time',
                    nullable: true,
                    type: 'string',
                  },
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    type: 'object',
                  },
                  device_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  device_type: {
                    oneOf: [
                      {
                        enum: [
                          'akuvox_lock',
                          'august_lock',
                          'brivo_access_point',
                          'butterflymx_panel',
                          'avigilon_alta_entry',
                          'doorking_lock',
                          'genie_door',
                          'igloo_lock',
                          'linear_lock',
                          'lockly_lock',
                          'kwikset_lock',
                          'nuki_lock',
                          'salto_lock',
                          'schlage_lock',
                          'seam_relay',
                          'smartthings_lock',
                          'wyze_lock',
                          'yale_lock',
                          'two_n_intercom',
                          'controlbyweb_device',
                          'ttlock_lock',
                          'igloohome_lock',
                          'hubitat_lock',
                          'four_suites_door',
                          'dormakaba_oracode_door',
                          'tedee_lock',
                        ],
                        type: 'string',
                      },
                      {
                        enum: ['noiseaware_activity_zone', 'minut_sensor'],
                        type: 'string',
                      },
                      {
                        enum: [
                          'ecobee_thermostat',
                          'nest_thermostat',
                          'honeywell_resideo_thermostat',
                        ],
                        type: 'string',
                      },
                      { enum: ['ios_phone', 'android_phone'], type: 'string' },
                    ],
                  },
                  device_types: {
                    items: {
                      oneOf: [
                        {
                          enum: [
                            'akuvox_lock',
                            'august_lock',
                            'brivo_access_point',
                            'butterflymx_panel',
                            'avigilon_alta_entry',
                            'doorking_lock',
                            'genie_door',
                            'igloo_lock',
                            'linear_lock',
                            'lockly_lock',
                            'kwikset_lock',
                            'nuki_lock',
                            'salto_lock',
                            'schlage_lock',
                            'seam_relay',
                            'smartthings_lock',
                            'wyze_lock',
                            'yale_lock',
                            'two_n_intercom',
                            'controlbyweb_device',
                            'ttlock_lock',
                            'igloohome_lock',
                            'hubitat_lock',
                            'four_suites_door',
                            'dormakaba_oracode_door',
                            'tedee_lock',
                          ],
                          type: 'string',
                        },
                        {
                          enum: ['noiseaware_activity_zone', 'minut_sensor'],
                          type: 'string',
                        },
                        {
                          enum: [
                            'ecobee_thermostat',
                            'nest_thermostat',
                            'honeywell_resideo_thermostat',
                          ],
                          type: 'string',
                        },
                        {
                          enum: ['ios_phone', 'android_phone'],
                          type: 'string',
                        },
                      ],
                    },
                    type: 'array',
                  },
                  exclude_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_online_access_codes',
                        'can_simulate_removal',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  include_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_online_access_codes',
                        'can_simulate_removal',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  limit: { default: 500, nullable: true, type: 'number' },
                  manufacturer: {
                    enum: [
                      'akuvox',
                      'august',
                      'avigilon_alta',
                      'brivo',
                      'butterflymx',
                      'doorking',
                      'four_suites',
                      'genie',
                      'igloo',
                      'keywe',
                      'kwikset',
                      'linear',
                      'lockly',
                      'nuki',
                      'philia',
                      'salto',
                      'samsung',
                      'schlage',
                      'seam',
                      'unknown',
                      'wyze',
                      'yale',
                      'minut',
                      'two_n',
                      'ttlock',
                      'nest',
                      'igloohome',
                      'ecobee',
                      'hubitat',
                      'controlbyweb',
                      'smartthings',
                      'dormakaba_oracode',
                      'tedee',
                      'honeywell_resideo',
                    ],
                    type: 'string',
                  },
                  user_identifier_key: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    devices: {
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                    },
                    locks: {
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['locks', 'devices', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/locks/list',
        tags: ['/locks'],
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'devices',
      },
    },
    '/locks/lock_door': {
      post: {
        operationId: 'locksLockDoorPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/locks/lock_door',
        tags: ['/locks'],
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'lock_door',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/locks/unlock_door': {
      post: {
        operationId: 'locksUnlockDoorPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/locks/unlock_door',
        tags: ['/locks'],
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'unlock_door',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/networks/get': {
      post: {
        operationId: 'networksGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { network_id: { format: 'uuid', type: 'string' } },
                required: ['network_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    network: {
                      properties: {
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { type: 'string' },
                        network_id: { format: 'uuid', type: 'string' },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'network_id',
                        'workspace_id',
                        'display_name',
                        'created_at',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['network', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/networks/get',
        tags: ['/networks'],
        'x-fern-sdk-group-name': ['networks'],
        'x-fern-sdk-method-name': 'get',
      },
    },
    '/networks/list': {
      post: {
        operationId: 'networksListPost',
        requestBody: {
          content: {
            'application/json': { schema: { properties: {}, type: 'object' } },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    networks: {
                      items: {
                        properties: {
                          created_at: { format: 'date-time', type: 'string' },
                          display_name: { type: 'string' },
                          network_id: { format: 'uuid', type: 'string' },
                          workspace_id: { format: 'uuid', type: 'string' },
                        },
                        required: [
                          'network_id',
                          'workspace_id',
                          'display_name',
                          'created_at',
                        ],
                        type: 'object',
                      },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['networks', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/networks/list',
        tags: ['/networks'],
        'x-fern-sdk-group-name': ['networks'],
        'x-fern-sdk-method-name': 'list',
      },
    },
    '/noise_sensors/noise_thresholds/create': {
      post: {
        operationId: 'noiseSensorsNoiseThresholdsCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  ends_daily_at: { type: 'string' },
                  name: { type: 'string' },
                  noise_threshold_decibels: { type: 'number' },
                  noise_threshold_nrs: { type: 'number' },
                  starts_daily_at: { type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id', 'starts_daily_at', 'ends_daily_at'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    noise_threshold: {
                      $ref: '#/components/schemas/noise_threshold',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'noise_threshold', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/create',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'noise_threshold',
      },
    },
    '/noise_sensors/noise_thresholds/delete': {
      post: {
        operationId: 'noiseSensorsNoiseThresholdsDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  noise_threshold_id: { format: 'uuid', type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['noise_threshold_id', 'device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/delete',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'delete',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/noise_sensors/noise_thresholds/get': {
      post: {
        operationId: 'noiseSensorsNoiseThresholdsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  noise_threshold_id: { format: 'uuid', type: 'string' },
                },
                required: ['noise_threshold_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    noise_threshold: {
                      $ref: '#/components/schemas/noise_threshold',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['noise_threshold', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/get',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'noise_threshold',
      },
    },
    '/noise_sensors/noise_thresholds/list': {
      post: {
        operationId: 'noiseSensorsNoiseThresholdsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  is_programmed: { type: 'boolean' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    noise_thresholds: {
                      items: { $ref: '#/components/schemas/noise_threshold' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['noise_thresholds', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/list',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'noise_thresholds',
      },
    },
    '/noise_sensors/noise_thresholds/update': {
      patch: {
        operationId: 'noiseSensorsNoiseThresholdsUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  ends_daily_at: { type: 'string' },
                  name: { type: 'string' },
                  noise_threshold_decibels: { type: 'number' },
                  noise_threshold_id: { format: 'uuid', type: 'string' },
                  noise_threshold_nrs: { type: 'number' },
                  starts_daily_at: { type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['noise_threshold_id', 'device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/update',
        tags: ['/noise_sensors'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'noiseSensorsNoiseThresholdsUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  ends_daily_at: { type: 'string' },
                  name: { type: 'string' },
                  noise_threshold_decibels: { type: 'number' },
                  noise_threshold_id: { format: 'uuid', type: 'string' },
                  noise_threshold_nrs: { type: 'number' },
                  starts_daily_at: { type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['noise_threshold_id', 'device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/update',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'update',
        'x-fern-sdk-return-value': 'action_attempt',
      },
      put: {
        operationId: 'noiseSensorsNoiseThresholdsUpdatePut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  ends_daily_at: { type: 'string' },
                  name: { type: 'string' },
                  noise_threshold_decibels: { type: 'number' },
                  noise_threshold_id: { format: 'uuid', type: 'string' },
                  noise_threshold_nrs: { type: 'number' },
                  starts_daily_at: { type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['noise_threshold_id', 'device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/update',
        tags: ['/noise_sensors'],
        'x-fern-ignore': true,
      },
    },
    '/noise_sensors/simulate/trigger_noise_threshold': {
      post: {
        operationId: 'noiseSensorsSimulateTriggerNoiseThresholdPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { device_id: { format: 'uuid', type: 'string' } },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/noise_sensors/simulate/trigger_noise_threshold',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'simulate'],
        'x-fern-sdk-method-name': 'trigger_noise_threshold',
      },
    },
    '/phones/deactivate': {
      post: {
        operationId: 'phonesDeactivatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { device_id: { type: 'string' } },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/phones/deactivate',
        tags: ['/phones'],
        'x-fern-sdk-group-name': ['phones'],
        'x-fern-sdk-method-name': 'deactivate',
      },
    },
    '/phones/list': {
      post: {
        operationId: 'phonesListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  owner_user_identity_id: { format: 'uuid', type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    phones: {
                      items: { $ref: '#/components/schemas/phone' },
                      type: 'array',
                    },
                  },
                  required: ['phones', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/phones/list',
        tags: ['/phones'],
        'x-fern-sdk-group-name': ['phones'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'phones',
      },
    },
    '/phones/simulate/create_sandbox_phone': {
      post: {
        operationId: 'phonesSimulateCreateSandboxPhonePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  assa_abloy_metadata: {
                    default: {},
                    properties: {
                      application_version: { default: '1.0.0', type: 'string' },
                      ble_capability: { default: true, type: 'boolean' },
                      hce_capability: { default: false, type: 'boolean' },
                      nfc_capability: { default: false, type: 'boolean' },
                      seos_applet_version: { default: '1.0.0', type: 'string' },
                      seos_tsm_endpoint_id: { default: 1, type: 'number' },
                    },
                    type: 'object',
                  },
                  custom_sdk_installation_id: { type: 'string' },
                  phone_metadata: {
                    default: {},
                    properties: {
                      device_manufacturer: {
                        default: 'Samsung',
                        type: 'string',
                      },
                      device_model: {
                        default: 'Samsung Galaxy S10',
                        type: 'string',
                      },
                      operating_system: {
                        default: 'android',
                        enum: ['android', 'ios'],
                        type: 'string',
                      },
                      os_version: { default: '10', type: 'string' },
                    },
                    type: 'object',
                  },
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    phone: { $ref: '#/components/schemas/phone' },
                  },
                  required: ['phone', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/phones/simulate/create_sandbox_phone',
        tags: ['/phones'],
        'x-fern-sdk-group-name': ['phones', 'simulate'],
        'x-fern-sdk-method-name': 'create_sandbox_phone',
        'x-fern-sdk-return-value': 'phone',
      },
    },
    '/thermostats/climate_setting_schedules/create': {
      post: {
        operationId: 'thermostatsClimateSettingSchedulesCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  automatic_cooling_enabled: { type: 'boolean' },
                  automatic_heating_enabled: { type: 'boolean' },
                  cooling_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  device_id: { type: 'string' },
                  heating_set_point_celsius: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  hvac_mode_setting: {
                    enum: ['off', 'heat', 'cool', 'heat_cool'],
                    type: 'string',
                  },
                  manual_override_allowed: { type: 'boolean' },
                  name: { type: 'string' },
                  schedule_ends_at: { type: 'string' },
                  schedule_starts_at: { type: 'string' },
                  schedule_type: {
                    default: 'time_bound',
                    enum: ['time_bound'],
                    type: 'string',
                  },
                },
                required: [
                  'device_id',
                  'schedule_starts_at',
                  'schedule_ends_at',
                ],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    climate_setting_schedule: {
                      $ref: '#/components/schemas/climate_setting_schedule',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedule', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/climate_setting_schedules/create',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats', 'climate_setting_schedules'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'climate_setting_schedule',
      },
    },
    '/thermostats/climate_setting_schedules/delete': {
      post: {
        operationId: 'thermostatsClimateSettingSchedulesDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_setting_schedule_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['climate_setting_schedule_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/climate_setting_schedules/delete',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats', 'climate_setting_schedules'],
        'x-fern-sdk-method-name': 'delete',
      },
      put: {
        operationId: 'thermostatsClimateSettingSchedulesDeletePut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_setting_schedule_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['climate_setting_schedule_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/climate_setting_schedules/delete',
        tags: ['/thermostats'],
        'x-fern-ignore': true,
      },
    },
    '/thermostats/climate_setting_schedules/get': {
      post: {
        operationId: 'thermostatsClimateSettingSchedulesGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_setting_schedule_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                  device_id: { format: 'uuid', type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    climate_setting_schedule: {
                      $ref: '#/components/schemas/climate_setting_schedule',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedule', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/climate_setting_schedules/get',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats', 'climate_setting_schedules'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'climate_setting_schedule',
      },
    },
    '/thermostats/climate_setting_schedules/list': {
      post: {
        operationId: 'thermostatsClimateSettingSchedulesListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  user_identifier_key: { type: 'string' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    climate_setting_schedules: {
                      items: {
                        $ref: '#/components/schemas/climate_setting_schedule',
                      },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedules', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/thermostats/climate_setting_schedules/list',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats', 'climate_setting_schedules'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'climate_setting_schedules',
      },
    },
    '/thermostats/climate_setting_schedules/update': {
      patch: {
        operationId: 'thermostatsClimateSettingSchedulesUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  automatic_cooling_enabled: { type: 'boolean' },
                  automatic_heating_enabled: { type: 'boolean' },
                  climate_setting_schedule_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                  cooling_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  heating_set_point_celsius: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  hvac_mode_setting: {
                    enum: ['off', 'heat', 'cool', 'heat_cool'],
                    type: 'string',
                  },
                  manual_override_allowed: { type: 'boolean' },
                  name: { type: 'string' },
                  schedule_ends_at: { type: 'string' },
                  schedule_starts_at: { type: 'string' },
                  schedule_type: {
                    default: 'time_bound',
                    enum: ['time_bound'],
                    type: 'string',
                  },
                },
                required: ['climate_setting_schedule_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    climate_setting_schedule: {
                      $ref: '#/components/schemas/climate_setting_schedule',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedule', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/climate_setting_schedules/update',
        tags: ['/thermostats'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'thermostatsClimateSettingSchedulesUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  automatic_cooling_enabled: { type: 'boolean' },
                  automatic_heating_enabled: { type: 'boolean' },
                  climate_setting_schedule_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                  cooling_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  heating_set_point_celsius: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  hvac_mode_setting: {
                    enum: ['off', 'heat', 'cool', 'heat_cool'],
                    type: 'string',
                  },
                  manual_override_allowed: { type: 'boolean' },
                  name: { type: 'string' },
                  schedule_ends_at: { type: 'string' },
                  schedule_starts_at: { type: 'string' },
                  schedule_type: {
                    default: 'time_bound',
                    enum: ['time_bound'],
                    type: 'string',
                  },
                },
                required: ['climate_setting_schedule_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    climate_setting_schedule: {
                      $ref: '#/components/schemas/climate_setting_schedule',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedule', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/climate_setting_schedules/update',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats', 'climate_setting_schedules'],
        'x-fern-sdk-method-name': 'update',
        'x-fern-sdk-return-value': 'climate_setting_schedule',
      },
      put: {
        operationId: 'thermostatsClimateSettingSchedulesUpdatePut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  automatic_cooling_enabled: { type: 'boolean' },
                  automatic_heating_enabled: { type: 'boolean' },
                  climate_setting_schedule_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                  cooling_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  heating_set_point_celsius: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  hvac_mode_setting: {
                    enum: ['off', 'heat', 'cool', 'heat_cool'],
                    type: 'string',
                  },
                  manual_override_allowed: { type: 'boolean' },
                  name: { type: 'string' },
                  schedule_ends_at: { type: 'string' },
                  schedule_starts_at: { type: 'string' },
                  schedule_type: {
                    default: 'time_bound',
                    enum: ['time_bound'],
                    type: 'string',
                  },
                },
                required: ['climate_setting_schedule_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    climate_setting_schedule: {
                      $ref: '#/components/schemas/climate_setting_schedule',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedule', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/climate_setting_schedules/update',
        tags: ['/thermostats'],
        'x-fern-ignore': true,
      },
    },
    '/thermostats/cool': {
      post: {
        operationId: 'thermostatsCoolPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  cooling_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  device_id: { format: 'uuid', type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/cool',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'cool',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/thermostats/get': {
      post: {
        operationId: 'thermostatsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  name: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    thermostat: { $ref: '#/components/schemas/device' },
                  },
                  required: ['thermostat', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/get',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'thermostat',
      },
    },
    '/thermostats/heat': {
      post: {
        operationId: 'thermostatsHeatPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  heating_set_point_celsius: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/heat',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'heat',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/thermostats/heat_cool': {
      post: {
        operationId: 'thermostatsHeatCoolPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  cooling_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  device_id: { format: 'uuid', type: 'string' },
                  heating_set_point_celsius: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/heat_cool',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'heat_cool',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/thermostats/list': {
      post: {
        operationId: 'thermostatsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_id: { format: 'uuid', type: 'string' },
                  connected_account_id: {
                    description:
                      'List all devices owned by this connected account',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  created_before: {
                    format: 'date-time',
                    nullable: true,
                    type: 'string',
                  },
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    type: 'object',
                  },
                  device_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  device_type: {
                    oneOf: [
                      {
                        enum: [
                          'akuvox_lock',
                          'august_lock',
                          'brivo_access_point',
                          'butterflymx_panel',
                          'avigilon_alta_entry',
                          'doorking_lock',
                          'genie_door',
                          'igloo_lock',
                          'linear_lock',
                          'lockly_lock',
                          'kwikset_lock',
                          'nuki_lock',
                          'salto_lock',
                          'schlage_lock',
                          'seam_relay',
                          'smartthings_lock',
                          'wyze_lock',
                          'yale_lock',
                          'two_n_intercom',
                          'controlbyweb_device',
                          'ttlock_lock',
                          'igloohome_lock',
                          'hubitat_lock',
                          'four_suites_door',
                          'dormakaba_oracode_door',
                          'tedee_lock',
                        ],
                        type: 'string',
                      },
                      {
                        enum: ['noiseaware_activity_zone', 'minut_sensor'],
                        type: 'string',
                      },
                      {
                        enum: [
                          'ecobee_thermostat',
                          'nest_thermostat',
                          'honeywell_resideo_thermostat',
                        ],
                        type: 'string',
                      },
                      { enum: ['ios_phone', 'android_phone'], type: 'string' },
                    ],
                  },
                  device_types: {
                    items: {
                      oneOf: [
                        {
                          enum: [
                            'akuvox_lock',
                            'august_lock',
                            'brivo_access_point',
                            'butterflymx_panel',
                            'avigilon_alta_entry',
                            'doorking_lock',
                            'genie_door',
                            'igloo_lock',
                            'linear_lock',
                            'lockly_lock',
                            'kwikset_lock',
                            'nuki_lock',
                            'salto_lock',
                            'schlage_lock',
                            'seam_relay',
                            'smartthings_lock',
                            'wyze_lock',
                            'yale_lock',
                            'two_n_intercom',
                            'controlbyweb_device',
                            'ttlock_lock',
                            'igloohome_lock',
                            'hubitat_lock',
                            'four_suites_door',
                            'dormakaba_oracode_door',
                            'tedee_lock',
                          ],
                          type: 'string',
                        },
                        {
                          enum: ['noiseaware_activity_zone', 'minut_sensor'],
                          type: 'string',
                        },
                        {
                          enum: [
                            'ecobee_thermostat',
                            'nest_thermostat',
                            'honeywell_resideo_thermostat',
                          ],
                          type: 'string',
                        },
                        {
                          enum: ['ios_phone', 'android_phone'],
                          type: 'string',
                        },
                      ],
                    },
                    type: 'array',
                  },
                  exclude_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_online_access_codes',
                        'can_simulate_removal',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  include_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_online_access_codes',
                        'can_simulate_removal',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  limit: { default: 500, nullable: true, type: 'number' },
                  manufacturer: {
                    enum: [
                      'akuvox',
                      'august',
                      'avigilon_alta',
                      'brivo',
                      'butterflymx',
                      'doorking',
                      'four_suites',
                      'genie',
                      'igloo',
                      'keywe',
                      'kwikset',
                      'linear',
                      'lockly',
                      'nuki',
                      'philia',
                      'salto',
                      'samsung',
                      'schlage',
                      'seam',
                      'unknown',
                      'wyze',
                      'yale',
                      'minut',
                      'two_n',
                      'ttlock',
                      'nest',
                      'igloohome',
                      'ecobee',
                      'hubitat',
                      'controlbyweb',
                      'smartthings',
                      'dormakaba_oracode',
                      'tedee',
                      'honeywell_resideo',
                    ],
                    type: 'string',
                  },
                  user_identifier_key: { type: 'string' },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    thermostats: {
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                    },
                  },
                  required: ['thermostats', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { client_session: [] },
        ],
        summary: '/thermostats/list',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'thermostats',
      },
    },
    '/thermostats/off': {
      post: {
        operationId: 'thermostatsOffPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/off',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'off',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/thermostats/set_fan_mode': {
      post: {
        operationId: 'thermostatsSetFanModePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  fan_mode: { enum: ['auto', 'on'], type: 'string' },
                  fan_mode_setting: { enum: ['auto', 'on'], type: 'string' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/set_fan_mode',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'set_fan_mode',
        'x-fern-sdk-return-value': 'action_attempt',
      },
    },
    '/thermostats/update': {
      patch: {
        operationId: 'thermostatsUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  default_climate_setting: {
                    properties: {
                      automatic_cooling_enabled: { type: 'boolean' },
                      automatic_heating_enabled: { type: 'boolean' },
                      cooling_set_point_celsius: { type: 'number' },
                      cooling_set_point_fahrenheit: { type: 'number' },
                      heating_set_point_celsius: { type: 'number' },
                      heating_set_point_fahrenheit: { type: 'number' },
                      hvac_mode_setting: {
                        enum: ['off', 'heat', 'cool', 'heat_cool'],
                        type: 'string',
                      },
                      manual_override_allowed: { type: 'boolean' },
                    },
                    type: 'object',
                  },
                  device_id: { format: 'uuid', type: 'string' },
                },
                required: ['device_id', 'default_climate_setting'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { client_session: [] },
        ],
        summary: '/thermostats/update',
        tags: ['/thermostats'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'thermostatsUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  default_climate_setting: {
                    properties: {
                      automatic_cooling_enabled: { type: 'boolean' },
                      automatic_heating_enabled: { type: 'boolean' },
                      cooling_set_point_celsius: { type: 'number' },
                      cooling_set_point_fahrenheit: { type: 'number' },
                      heating_set_point_celsius: { type: 'number' },
                      heating_set_point_fahrenheit: { type: 'number' },
                      hvac_mode_setting: {
                        enum: ['off', 'heat', 'cool', 'heat_cool'],
                        type: 'string',
                      },
                      manual_override_allowed: { type: 'boolean' },
                    },
                    type: 'object',
                  },
                  device_id: { format: 'uuid', type: 'string' },
                },
                required: ['device_id', 'default_climate_setting'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { client_session: [] },
        ],
        summary: '/thermostats/update',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'update',
      },
    },
    '/user_identities/add_acs_user': {
      post: {
        operationId: 'userIdentitiesAddAcsUserPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: { format: 'uuid', type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id', 'acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/add_acs_user',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'add_acs_user',
      },
      put: {
        operationId: 'userIdentitiesAddAcsUserPut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: { format: 'uuid', type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id', 'acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/add_acs_user',
        tags: ['/user_identities'],
        'x-fern-ignore': true,
      },
    },
    '/user_identities/create': {
      post: {
        operationId: 'userIdentitiesCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  email_address: {
                    format: 'email',
                    nullable: true,
                    type: 'string',
                  },
                  full_name: { minLength: 1, nullable: true, type: 'string' },
                  phone_number: { nullable: true, type: 'string' },
                  user_identity_key: {
                    minLength: 1,
                    nullable: true,
                    type: 'string',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    user_identity: {
                      properties: {
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { minLength: 1, type: 'string' },
                        email_address: {
                          format: 'email',
                          nullable: true,
                          type: 'string',
                        },
                        full_name: {
                          minLength: 1,
                          nullable: true,
                          type: 'string',
                        },
                        phone_number: { nullable: true, type: 'string' },
                        user_identity_id: { format: 'uuid', type: 'string' },
                        user_identity_key: {
                          minLength: 1,
                          nullable: true,
                          type: 'string',
                        },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'user_identity_id',
                        'user_identity_key',
                        'email_address',
                        'phone_number',
                        'display_name',
                        'full_name',
                        'created_at',
                        'workspace_id',
                      ],
                      type: 'object',
                    },
                  },
                  required: ['user_identity', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/create',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'create',
      },
    },
    '/user_identities/delete': {
      post: {
        operationId: 'userIdentitiesDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/delete',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'delete',
      },
    },
    '/user_identities/enrollment_automations/delete': {
      post: {
        operationId: 'userIdentitiesEnrollmentAutomationsDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  enrollment_automation_id: { format: 'uuid', type: 'string' },
                },
                required: ['enrollment_automation_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/enrollment_automations/delete',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities', 'enrollment_automations'],
        'x-fern-sdk-method-name': 'delete',
      },
    },
    '/user_identities/enrollment_automations/get': {
      post: {
        operationId: 'userIdentitiesEnrollmentAutomationsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  enrollment_automation_id: { format: 'uuid', type: 'string' },
                },
                required: ['enrollment_automation_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    enrollment_automation: {
                      $ref: '#/components/schemas/enrollment_automation',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['enrollment_automation', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/enrollment_automations/get',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities', 'enrollment_automations'],
        'x-fern-sdk-method-name': 'get',
      },
    },
    '/user_identities/enrollment_automations/launch': {
      post: {
        operationId: 'userIdentitiesEnrollmentAutomationsLaunchPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_pool_id: { format: 'uuid', type: 'string' },
                  create_credential_manager_user: { type: 'boolean' },
                  credential_manager_acs_system_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                  credential_manager_acs_user_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: [
                  'user_identity_id',
                  'credential_manager_acs_system_id',
                ],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    enrollment_automation: {
                      properties: {
                        acs_credential_provisioning_automation_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        created_at: { format: 'date-time', type: 'string' },
                        credential_manager_acs_system_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        enrollment_automation_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        user_identity_id: { format: 'uuid', type: 'string' },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'acs_credential_provisioning_automation_id',
                        'credential_manager_acs_system_id',
                        'user_identity_id',
                        'created_at',
                        'workspace_id',
                        'enrollment_automation_id',
                      ],
                      type: 'object',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['enrollment_automation', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/enrollment_automations/launch',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities', 'enrollment_automations'],
        'x-fern-sdk-method-name': 'launch',
      },
    },
    '/user_identities/enrollment_automations/list': {
      post: {
        operationId: 'userIdentitiesEnrollmentAutomationsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    enrollment_automations: {
                      items: {
                        $ref: '#/components/schemas/enrollment_automation',
                      },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['enrollment_automations', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/enrollment_automations/list',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities', 'enrollment_automations'],
        'x-fern-sdk-method-name': 'list',
      },
    },
    '/user_identities/get': {
      post: {
        operationId: 'userIdentitiesGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    properties: {
                      user_identity_id: { format: 'uuid', type: 'string' },
                    },
                    required: ['user_identity_id'],
                    type: 'object',
                  },
                  {
                    properties: { user_identity_key: { type: 'string' } },
                    required: ['user_identity_key'],
                    type: 'object',
                  },
                ],
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    user_identity: {
                      properties: {
                        created_at: { format: 'date-time', type: 'string' },
                        display_name: { minLength: 1, type: 'string' },
                        email_address: {
                          format: 'email',
                          nullable: true,
                          type: 'string',
                        },
                        full_name: {
                          minLength: 1,
                          nullable: true,
                          type: 'string',
                        },
                        phone_number: { nullable: true, type: 'string' },
                        user_identity_id: { format: 'uuid', type: 'string' },
                        user_identity_key: {
                          minLength: 1,
                          nullable: true,
                          type: 'string',
                        },
                        workspace_id: { format: 'uuid', type: 'string' },
                      },
                      required: [
                        'user_identity_id',
                        'user_identity_key',
                        'email_address',
                        'phone_number',
                        'display_name',
                        'full_name',
                        'created_at',
                        'workspace_id',
                      ],
                      type: 'object',
                    },
                  },
                  required: ['user_identity', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/get',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'get',
      },
    },
    '/user_identities/grant_access_to_device': {
      post: {
        operationId: 'userIdentitiesGrantAccessToDevicePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id', 'device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/grant_access_to_device',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'grant_access_to_device',
      },
      put: {
        operationId: 'userIdentitiesGrantAccessToDevicePut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id', 'device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/grant_access_to_device',
        tags: ['/user_identities'],
        'x-fern-ignore': true,
      },
    },
    '/user_identities/list': {
      post: {
        operationId: 'userIdentitiesListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  credential_manager_acs_system_id: {
                    format: 'uuid',
                    type: 'string',
                  },
                },
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    user_identities: {
                      items: {
                        properties: {
                          created_at: { format: 'date-time', type: 'string' },
                          display_name: { minLength: 1, type: 'string' },
                          email_address: {
                            format: 'email',
                            nullable: true,
                            type: 'string',
                          },
                          full_name: {
                            minLength: 1,
                            nullable: true,
                            type: 'string',
                          },
                          phone_number: { nullable: true, type: 'string' },
                          user_identity_id: { format: 'uuid', type: 'string' },
                          user_identity_key: {
                            minLength: 1,
                            nullable: true,
                            type: 'string',
                          },
                          workspace_id: { format: 'uuid', type: 'string' },
                        },
                        required: [
                          'user_identity_id',
                          'user_identity_key',
                          'email_address',
                          'phone_number',
                          'display_name',
                          'full_name',
                          'created_at',
                          'workspace_id',
                        ],
                        type: 'object',
                      },
                      type: 'array',
                    },
                  },
                  required: ['user_identities', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/list',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'user_identities',
      },
    },
    '/user_identities/list_accessible_devices': {
      post: {
        operationId: 'userIdentitiesListAccessibleDevicesPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    accessible_devices: {
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['accessible_devices', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/list_accessible_devices',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'list_accessible_devices',
      },
    },
    '/user_identities/list_acs_systems': {
      post: {
        operationId: 'userIdentitiesListAcsSystemsPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_systems: {
                      items: { $ref: '#/components/schemas/acs_system' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_systems', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/list_acs_systems',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'list_acs_systems',
      },
    },
    '/user_identities/list_acs_users': {
      post: {
        operationId: 'userIdentitiesListAcsUsersPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    acs_users: {
                      items: { $ref: '#/components/schemas/acs_user' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_users', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/list_acs_users',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'list_acs_users',
      },
    },
    '/user_identities/remove_acs_user': {
      post: {
        operationId: 'userIdentitiesRemoveAcsUserPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: { format: 'uuid', type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id', 'acs_user_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/remove_acs_user',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'remove_acs_user',
      },
    },
    '/user_identities/revoke_access_to_device': {
      post: {
        operationId: 'userIdentitiesRevokeAccessToDevicePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                },
                required: ['user_identity_id', 'device_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/user_identities/revoke_access_to_device',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'revoke_access_to_device',
      },
    },
    '/user_identities/update': {
      patch: {
        operationId: 'userIdentitiesUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  email_address: {
                    format: 'email',
                    nullable: true,
                    type: 'string',
                  },
                  full_name: { minLength: 1, nullable: true, type: 'string' },
                  phone_number: { nullable: true, type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                  user_identity_key: {
                    minLength: 1,
                    nullable: true,
                    type: 'string',
                  },
                },
                required: ['user_identity_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/update',
        tags: ['/user_identities'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'userIdentitiesUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  email_address: {
                    format: 'email',
                    nullable: true,
                    type: 'string',
                  },
                  full_name: { minLength: 1, nullable: true, type: 'string' },
                  phone_number: { nullable: true, type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                  user_identity_key: {
                    minLength: 1,
                    nullable: true,
                    type: 'string',
                  },
                },
                required: ['user_identity_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { console_session: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/update',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'update',
      },
    },
    '/webhooks/create': {
      post: {
        operationId: 'webhooksCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  event_types: {
                    default: ['*'],
                    items: { type: 'string' },
                    type: 'array',
                  },
                  url: { format: 'uri', type: 'string' },
                },
                required: ['url'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    webhook: { $ref: '#/components/schemas/webhook' },
                  },
                  required: ['webhook', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/webhooks/create',
        tags: ['/webhooks'],
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'webhook',
      },
    },
    '/webhooks/delete': {
      post: {
        operationId: 'webhooksDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { webhook_id: { type: 'string' } },
                required: ['webhook_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/webhooks/delete',
        tags: ['/webhooks'],
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'delete',
      },
    },
    '/webhooks/get': {
      post: {
        operationId: 'webhooksGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: { webhook_id: { type: 'string' } },
                required: ['webhook_id'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    webhook: { $ref: '#/components/schemas/webhook' },
                  },
                  required: ['webhook', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/webhooks/get',
        tags: ['/webhooks'],
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'webhook',
      },
    },
    '/webhooks/list': {
      get: {
        operationId: 'webhooksListGet',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    webhooks: {
                      items: { $ref: '#/components/schemas/webhook' },
                      type: 'array',
                    },
                  },
                  required: ['webhooks', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/webhooks/list',
        tags: ['/webhooks'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'webhooksListPost',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    webhooks: {
                      items: { $ref: '#/components/schemas/webhook' },
                      type: 'array',
                    },
                  },
                  required: ['webhooks', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/webhooks/list',
        tags: ['/webhooks'],
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'webhooks',
      },
    },
    '/webhooks/update': {
      post: {
        operationId: 'webhooksUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  event_types: { items: { type: 'string' }, type: 'array' },
                  webhook_id: { type: 'string' },
                },
                required: ['webhook_id', 'event_types'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/webhooks/update',
        tags: ['/webhooks'],
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'update',
      },
      put: {
        operationId: 'webhooksUpdatePut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  event_types: { items: { type: 'string' }, type: 'array' },
                  webhook_id: { type: 'string' },
                },
                required: ['webhook_id', 'event_types'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/webhooks/update',
        tags: ['/webhooks'],
        'x-fern-ignore': true,
      },
    },
    '/workspaces/create': {
      post: {
        operationId: 'workspacesCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_partner_name: {
                    description: 'The name shown inside the connect webview',
                    type: 'string',
                  },
                  is_sandbox: { default: false, type: 'boolean' },
                  name: { type: 'string' },
                  webview_logo_shape: {
                    enum: ['circle', 'square'],
                    type: 'string',
                  },
                  webview_primary_button_color: { type: 'string' },
                },
                required: ['name', 'connect_partner_name'],
                type: 'object',
              },
            },
          },
        },
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    workspace: { $ref: '#/components/schemas/workspace' },
                  },
                  required: ['workspace', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [{ pat_without_workspace: [] }],
        summary: '/workspaces/create',
        tags: ['/workspaces'],
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'create',
      },
    },
    '/workspaces/get': {
      get: {
        operationId: 'workspacesGetGet',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    workspace: { $ref: '#/components/schemas/workspace' },
                  },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { user_session: [] },
          { client_session: [] },
          { pat_with_workspace: [] },
        ],
        summary: '/workspaces/get',
        tags: ['/workspaces'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'workspacesGetPost',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    workspace: { $ref: '#/components/schemas/workspace' },
                  },
                  required: ['ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { user_session: [] },
          { client_session: [] },
          { pat_with_workspace: [] },
        ],
        summary: '/workspaces/get',
        tags: ['/workspaces'],
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'workspace',
      },
    },
    '/workspaces/list': {
      get: {
        operationId: 'workspacesListGet',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    workspaces: {
                      items: { $ref: '#/components/schemas/workspace' },
                      type: 'array',
                    },
                  },
                  required: ['workspaces', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { pat_without_workspace: [] },
          { user_session: [] },
          { user_session_without_workspace: [] },
          { api_key: [] },
          { client_session: [] },
        ],
        summary: '/workspaces/list',
        tags: ['/workspaces'],
        'x-fern-ignore': true,
      },
      post: {
        operationId: 'workspacesListPost',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    ok: { type: 'boolean' },
                    workspaces: {
                      items: { $ref: '#/components/schemas/workspace' },
                      type: 'array',
                    },
                  },
                  required: ['workspaces', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { pat_with_workspace: [] },
          { pat_without_workspace: [] },
          { user_session: [] },
          { user_session_without_workspace: [] },
          { api_key: [] },
          { client_session: [] },
        ],
        summary: '/workspaces/list',
        tags: ['/workspaces'],
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'workspaces',
      },
    },
    '/workspaces/reset_sandbox': {
      post: {
        operationId: 'workspacesResetSandboxPost',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                  type: 'object',
                },
              },
            },
            description: 'OK',
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session: [] },
        ],
        summary: '/workspaces/reset_sandbox',
        tags: ['/workspaces'],
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'reset_sandbox',
        'x-fern-sdk-return-value': 'message',
      },
    },
  },
  servers: [{ url: 'https://connect.getseam.com' }],
  tags: [
    { description: 'access_codes', name: '/access_codes' },
    { description: 'acs', name: '/acs' },
    { description: 'action_attempts', name: '/action_attempts' },
    { description: 'client_sessions', name: '/client_sessions' },
    { description: 'connected_accounts', name: '/connected_accounts' },
    { description: 'connect_webviews', name: '/connect_webviews' },
    { description: 'devices', name: '/devices' },
    { description: 'events', name: '/events' },
    { description: 'health', name: '/health' },
    { description: 'locks', name: '/locks' },
    { description: 'networks', name: '/networks' },
    { description: 'noise_sensors', name: '/noise_sensors' },
    { description: 'phones', name: '/phones' },
    { description: 'thermostats', name: '/thermostats' },
    { description: 'user_identities', name: '/user_identities' },
    { description: 'webhooks', name: '/webhooks' },
    { description: 'workspaces', name: '/workspaces' },
  ],
}
