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
            items: {
              oneOf: [
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_access_code_error: { enum: [true], type: 'boolean' },
                    message: { type: 'string' },
                  },
                  required: ['message', 'is_access_code_error', 'error_code'],
                  type: 'object',
                },
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_device_error: { enum: [true], type: 'boolean' },
                    message: { type: 'string' },
                  },
                  required: ['message', 'is_device_error', 'error_code'],
                  type: 'object',
                },
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_connected_account_error: {
                      enum: [true],
                      type: 'boolean',
                    },
                    message: { type: 'string' },
                  },
                  required: [
                    'message',
                    'is_connected_account_error',
                    'error_code',
                  ],
                  type: 'object',
                },
              ],
            },
            type: 'array',
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
            items: {
              properties: {
                message: { type: 'string' },
                warning_code: { type: 'string' },
              },
              required: ['message', 'warning_code'],
              type: 'object',
            },
            type: 'array',
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
          'errors',
          'warnings',
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
        description:
          'Group that defines the entrances to which a set of users has access and, in some cases, the access schedule for these entrances and users.\nThe `acs_access_group` object represents an [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups) within an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
        properties: {
          access_group_type: {
            deprecated: true,
            enum: [
              'pti_unit',
              'pti_access_level',
              'salto_ks_access_group',
              'brivo_group',
              'salto_space_group',
              'dormakaba_community_access_group',
            ],
            type: 'string',
            'x-deprecated': 'Use `external_type`.',
          },
          access_group_type_display_name: {
            deprecated: true,
            type: 'string',
            'x-deprecated': 'Use `external_type_display_name`.',
          },
          acs_access_group_id: {
            description: 'ID of the access group.',
            format: 'uuid',
            type: 'string',
          },
          acs_system_id: {
            description:
              'ID of the access control system that contains the access group.',
            format: 'uuid',
            type: 'string',
          },
          created_at: {
            description: 'Date and time at which the access group was created.',
            format: 'date-time',
            type: 'string',
          },
          display_name: { type: 'string' },
          external_type: {
            description:
              'Brand-specific terminology for the access group type.',
            enum: [
              'pti_unit',
              'pti_access_level',
              'salto_ks_access_group',
              'brivo_group',
              'salto_space_group',
              'dormakaba_community_access_group',
            ],
            type: 'string',
          },
          external_type_display_name: {
            description:
              'Display name that corresponds to the brand-specific terminology for the access group type.',
            type: 'string',
          },
          is_managed: { enum: [true], type: 'boolean' },
          name: { description: 'Name of the access group.', type: 'string' },
          warnings: {
            description: 'Warnings associated with the `acs_access_group`.',
            items: {
              description: 'Warning associated with the `acs_access_group`.',
              properties: {
                created_at: {
                  description:
                    'Date and time at which Seam created the warning.',
                  format: 'date-time',
                  type: 'string',
                },
                message: {
                  description:
                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                  type: 'string',
                },
                warning_code: {
                  description:
                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                  enum: ['unknown_issue_with_acs_access_group'],
                  type: 'string',
                },
              },
              required: ['created_at', 'message', 'warning_code'],
              type: 'object',
            },
            type: 'array',
          },
          workspace_id: {
            description:
              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the access group.',
            format: 'uuid',
            type: 'string',
          },
        },
        required: [
          'acs_access_group_id',
          'acs_system_id',
          'workspace_id',
          'name',
          'access_group_type',
          'access_group_type_display_name',
          'display_name',
          'external_type',
          'external_type_display_name',
          'created_at',
          'warnings',
          'is_managed',
        ],
        type: 'object',
      },
      acs_credential: {
        description:
          'Means by which a user gains access at an entrance.\nThe `acs_credential` object represents a credential that provides an ACS user access within an access control system. For each acs_credential object, you define the access method. You can also specify additional properties, such as a code.',
        properties: {
          access_method: {
            description:
              'Access method for the credential. Supported values: `code`, `card`, `mobile_key`.',
            enum: ['code', 'card', 'mobile_key'],
            type: 'string',
          },
          acs_credential_id: {
            description: 'ID of the credential.',
            format: 'uuid',
            type: 'string',
          },
          acs_credential_pool_id: { format: 'uuid', type: 'string' },
          acs_system_id: {
            description:
              'ID of the access control system that contains the credential.',
            format: 'uuid',
            type: 'string',
          },
          acs_user_id: {
            description: 'ID of the ACS user to whom the credential belongs.',
            format: 'uuid',
            type: 'string',
          },
          card_number: { nullable: true, type: 'string' },
          code: {
            description: 'Access (PIN) code for the credential.',
            nullable: true,
            type: 'string',
          },
          created_at: {
            description: 'Date and time at which the credential was created.',
            format: 'date-time',
            type: 'string',
          },
          display_name: {
            description:
              'Display name that corresponds to the credential type.',
            minLength: 1,
            type: 'string',
          },
          ends_at: {
            description:
              'Date and time at which the credential validity ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
            type: 'string',
          },
          errors: {
            description: 'Errors associated with the `acs_credential`.',
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
            description:
              'Brand-specific terminology for the credential type. Supported values: `pti_card`, `brivo_credential`, `hid_credential`, `visionline_card`.',
            enum: [
              'pti_card',
              'brivo_credential',
              'hid_credential',
              'visionline_card',
              'salto_ks_credential',
            ],
            type: 'string',
          },
          external_type_display_name: {
            description:
              'Display name that corresponds to the brand-specific terminology for the credential type.',
            type: 'string',
          },
          is_issued: { type: 'boolean' },
          is_latest_desired_state_synced_with_provider: {
            description:
              'Indicates whether the latest state of the credential has been synced from Seam to the provider.',
            nullable: true,
            type: 'boolean',
          },
          is_managed: { enum: [true], type: 'boolean' },
          is_multi_phone_sync_credential: {
            description:
              'Indicates whether the credential is a [multi-phone sync credential](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#what-are-multi-phone-sync-credentials).',
            type: 'boolean',
          },
          is_one_time_use: {
            description:
              'Indicates whether the credential can only be used once. If "true," the code becomes invalid after the first use.',
            type: 'boolean',
          },
          issued_at: { format: 'date-time', nullable: true, type: 'string' },
          latest_desired_state_synced_with_provider_at: {
            description:
              'Date and time at which the state of the credential was most recently synced from Seam to the provider.',
            format: 'date-time',
            nullable: true,
            type: 'string',
          },
          parent_acs_credential_id: {
            description: 'ID of the parent credential.',
            format: 'uuid',
            type: 'string',
          },
          starts_at: {
            description:
              'Date and time at which the credential validity starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
            type: 'string',
          },
          visionline_metadata: {
            description: 'Visionline-specific metadata for the credential.',
            properties: {
              auto_join: { type: 'boolean' },
              card_function_type: { enum: ['guest', 'staff'], type: 'string' },
              card_id: { type: 'string' },
              common_acs_entrance_ids: {
                items: { format: 'uuid', type: 'string' },
                type: 'array',
              },
              credential_id: { type: 'string' },
              guest_acs_entrance_ids: {
                items: { format: 'uuid', type: 'string' },
                type: 'array',
              },
              is_valid: { type: 'boolean' },
              joiner_acs_credential_ids: {
                items: { format: 'uuid', type: 'string' },
                type: 'array',
              },
            },
            required: ['card_function_type'],
            type: 'object',
          },
          warnings: {
            description: 'Warnings associated with the `acs_credential`.',
            items: {
              description: 'Warning associated with the `acs_credential`.',
              oneOf: [
                {
                  description:
                    'Indicates that the credential is waiting to be issued.',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the warning.',
                      format: 'date-time',
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                    warning_code: {
                      description:
                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                      enum: ['waiting_to_be_issued'],
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'warning_code'],
                  type: 'object',
                },
                {
                  description:
                    "Indicates that the schedule of one of the credential's children was modified externally.",
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the warning.',
                      format: 'date-time',
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                    warning_code: {
                      description:
                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                      enum: ['schedule_externally_modified'],
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'warning_code'],
                  type: 'object',
                },
                {
                  description:
                    'Indicates that the schedule of this credential was modified to avoid creating a credential with a start date in the past.',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the warning.',
                      format: 'date-time',
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                    warning_code: {
                      description:
                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                      enum: ['schedule_modified'],
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'warning_code'],
                  type: 'object',
                },
                {
                  description:
                    'Indicates that this credential is being deleted.',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the warning.',
                      format: 'date-time',
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                    warning_code: {
                      description:
                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                      enum: ['being_deleted'],
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'warning_code'],
                  type: 'object',
                },
                {
                  description:
                    'An unknown issue occurred while syncing the state of this credential with the provider. This issue may affect the proper functioning of this credential.',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the warning.',
                      format: 'date-time',
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                    warning_code: {
                      description:
                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                      enum: ['unknown_issue_with_acs_credential'],
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'warning_code'],
                  type: 'object',
                },
              ],
            },
            type: 'array',
          },
          workspace_id: {
            description:
              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the credential.',
            format: 'uuid',
            type: 'string',
          },
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
          'is_managed',
        ],
        type: 'object',
      },
      acs_credential_pool: {
        properties: {
          acs_credential_pool_id: { format: 'uuid', type: 'string' },
          acs_system_id: { format: 'uuid', type: 'string' },
          created_at: { format: 'date-time', type: 'string' },
          display_name: { minLength: 1, type: 'string' },
          external_type: { enum: ['hid_part_number'], type: 'string' },
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
      acs_credential_provisioning_automation: {
        properties: {
          acs_credential_provisioning_automation_id: {
            format: 'uuid',
            type: 'string',
          },
          created_at: { format: 'date-time', type: 'string' },
          credential_manager_acs_system_id: { format: 'uuid', type: 'string' },
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
      acs_entrance: {
        description:
          'Represents an [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details) within an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
        properties: {
          acs_entrance_id: {
            description: 'ID of the entrance.',
            format: 'uuid',
            type: 'string',
          },
          acs_system_id: {
            description:
              'ID of the access control system that contains the entrance.',
            format: 'uuid',
            type: 'string',
          },
          assa_abloy_vostio_metadata: {
            properties: {
              door_name: { type: 'string' },
              door_number: { format: 'float', type: 'number' },
              door_type: {
                enum: ['CommonDoor', 'EntranceDoor', 'GuestDoor', 'Elevator'],
                type: 'string',
              },
              pms_id: { type: 'string' },
              stand_open: { type: 'boolean' },
            },
            required: ['door_type', 'door_name'],
            type: 'object',
          },
          created_at: {
            description: 'Date and time at which the entrance was created.',
            format: 'date-time',
            type: 'string',
          },
          display_name: {
            description: 'Display name for the entrance.',
            type: 'string',
          },
          dormakaba_community_metadata: {
            properties: {
              access_point_name: { type: 'string' },
              common_area_number: { format: 'float', type: 'number' },
            },
            required: ['access_point_name'],
            type: 'object',
          },
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
          latch_metadata: {
            properties: {
              accessibility_type: { type: 'string' },
              door_name: { type: 'string' },
              door_type: { type: 'string' },
              is_connected: { type: 'boolean' },
            },
            required: [
              'accessibility_type',
              'door_name',
              'door_type',
              'is_connected',
            ],
            type: 'object',
          },
          salto_ks_metadata: {
            properties: {
              battery_level: { type: 'string' },
              door_name: { type: 'string' },
              intrusion_alarm: { type: 'boolean' },
              left_open_alarm: { type: 'boolean' },
              lock_type: { type: 'string' },
              locked_state: { type: 'string' },
              online: { type: 'boolean' },
              privacy_mode: { type: 'boolean' },
            },
            required: [
              'door_name',
              'locked_state',
              'lock_type',
              'battery_level',
            ],
            type: 'object',
          },
          salto_space_metadata: {
            properties: {
              door_description: { type: 'string' },
              door_name: { type: 'string' },
              ext_door_id: { type: 'string' },
            },
            required: ['door_name', 'ext_door_id'],
            type: 'object',
          },
          visionline_metadata: {
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
                    visionline_door_profile_id: { type: 'string' },
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
          'acs_system_id',
          'acs_entrance_id',
          'created_at',
          'display_name',
          'errors',
        ],
        type: 'object',
      },
      acs_system: {
        description:
          'Represents an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
        properties: {
          acs_system_id: {
            description: 'ID of the `acs_system`.',
            format: 'uuid',
            type: 'string',
          },
          can_add_acs_users_to_acs_access_groups: {
            description:
              'Indicates whether the `acs_system` supports [adding users to access groups](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups#add-an-acs-user-to-an-access-group). See also [Access Group-based Access Control Systems](https://docs.seam.co/latest/capability-guides/access-systems/understanding-access-control-system-differences#access-group-based-access-control-systems).',
            type: 'boolean',
          },
          can_automate_enrollment: {
            description:
              'Indicates whether it is possible to [launch enrollment automations](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#prepare-the-phones-for-a-user-identity-to-start-receiving-mobile-credentials-using-an-enrollment-aut) for the `acs_system`.',
            type: 'boolean',
          },
          can_create_acs_access_groups: {
            description:
              'Indicates whether the `acs_system` supports creating [access groups](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups). See also [Access Group-based Access Control Systems](https://docs.seam.co/latest/capability-guides/access-systems/understanding-access-control-system-differences#access-group-based-access-control-systems).',
            type: 'boolean',
          },
          can_remove_acs_users_from_acs_access_groups: {
            description:
              'Indicates whether the `acs_system` supports [removing users from access groups](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups#remove-an-acs-user-from-an-access-group). See also [Access Group-based Access Control Systems](https://docs.seam.co/latest/capability-guides/access-systems/understanding-access-control-system-differences#access-group-based-access-control-systems).',
            type: 'boolean',
          },
          connected_account_id: {
            description:
              'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts) associated with the `acs_system`.',
            format: 'uuid',
            type: 'string',
          },
          connected_account_ids: {
            deprecated: true,
            description:
              'IDs of the [connected accounts](https://docs.seam.co/latest/core-concepts/connected-accounts) associated with the `acs_system`.',
            items: { format: 'uuid', type: 'string' },
            type: 'array',
            'x-deprecated': 'Use `connected_account_id`.',
          },
          created_at: {
            description: 'Date and time at which the `acs_system` was created.',
            format: 'date-time',
            type: 'string',
          },
          default_credential_manager_acs_system_id: {
            description:
              'ID of the default credential manager acs_system for this access control system.',
            format: 'uuid',
            nullable: true,
            type: 'string',
            'x-draft': 'Needs review',
          },
          errors: {
            description: 'Errors associated with the `acs_system`.',
            items: {
              description: 'Error associated with the `acs_system`.',
              oneOf: [
                {
                  description:
                    'Indicates that the Seam API cannot communicate with the [Seam Bridge](https://docs.seam.co/latest/capability-guides/seam-bridge), for example, if the Seam Bridge executable has stopped or if the computer running the Seam Bridge executable is offline.\n  This error might also occur if the Seam Bridge is connected to the wrong [workspace](https://docs.seam.co/latest/core-concepts/workspaces).\n  See also [Troubleshooting Your Access Control System](https://docs.seam.co/latest/capability-guides/capability-guides/access-systems/troubleshooting-your-access-control-system#acs_system.errors.seam_bridge_disconnected).',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      description:
                        'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.',
                      enum: ['seam_bridge_disconnected'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
                {
                  description:
                    'Indicates that the Seam Bridge is functioning correctly and the Seam API can communicate with the Seam Bridge, but the Seam API cannot connect to the on-premises [Visionline access control system](https://docs.seam.co/latest/device-and-system-integration-guides/assa-abloy-visionline-access-control-system).\n  For example, the IP address of the on-premises access control system may be set incorrectly within the Seam [workspace](https://docs.seam.co/latest/core-concepts/workspaces).\n  See also [Troubleshooting Your Access Control System](https://docs.seam.co/latest/capability-guides/capability-guides/access-systems/troubleshooting-your-access-control-system#acs_system.errors.visionline_instance_unreachable).',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      description:
                        'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.',
                      enum: ['visionline_instance_unreachable'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
                {
                  description:
                    'Indicates that the maximum number of users allowed for the site has been reached. This means that new access codes cannot be created. Contact Salto support to increase the user limit.',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      description:
                        'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.',
                      enum: ['salto_ks_subscription_limit_exceeded'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
                {
                  description:
                    'Indicates that the access system has been disconnected. See [this guide](https://docs.seam.co/latest/capability-guides/access-systems/troubleshooting-your-access-control-system guide) to resolve the issue.',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      description:
                        'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.',
                      enum: ['acs_system_disconnected'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
                {
                  description:
                    'Indicates that the login credentials are invalid. Reconnect the account using the Connect Webview to restore access.',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      description:
                        'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.',
                      enum: ['account_disconnected'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
                {
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      description:
                        'Indicates that the access system has lost its Salto KS certification. Please contact support to regain access.',
                      enum: ['salto_ks_certification_expired'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
              ],
            },
            type: 'array',
          },
          external_type: {
            description:
              'Brand-specific terminology for the `acs_system` type.',
            enum: [
              'pti_site',
              'alta_org',
              'salto_ks_site',
              'salto_space_system',
              'brivo_account',
              'hid_credential_manager_organization',
              'visionline_system',
              'assa_abloy_credential_service',
              'latch_building',
              'dormakaba_community_site',
              'legic_connect_credential_service',
              'assa_abloy_vostio',
              'assa_abloy_vostio_credential_service',
            ],
            type: 'string',
          },
          external_type_display_name: {
            description:
              'Display name that corresponds to the brand-specific terminology for the `acs_system` type.',
            type: 'string',
          },
          image_alt_text: {
            description: 'Alternative text for the `acs_system` image.',
            type: 'string',
          },
          image_url: {
            description: 'URL for the image that represents the `acs_system`.',
            type: 'string',
          },
          is_credential_manager: {
            description:
              'Indicates if the `acs_system` is a credential manager.',
            type: 'boolean',
          },
          location: {
            properties: {
              time_zone: {
                description: 'Time zone in which the `acs_system` is located.',
                nullable: true,
                type: 'string',
              },
            },
            required: ['time_zone'],
            type: 'object',
          },
          name: { description: 'Name of the `acs_system`.', type: 'string' },
          system_type: {
            deprecated: true,
            enum: [
              'pti_site',
              'alta_org',
              'salto_ks_site',
              'salto_space_system',
              'brivo_account',
              'hid_credential_manager_organization',
              'visionline_system',
              'assa_abloy_credential_service',
              'latch_building',
              'dormakaba_community_site',
              'legic_connect_credential_service',
              'assa_abloy_vostio',
              'assa_abloy_vostio_credential_service',
            ],
            type: 'string',
            'x-deprecated': 'Use `external_type`.',
          },
          system_type_display_name: {
            deprecated: true,
            type: 'string',
            'x-deprecated': 'Use `external_type_display_name`.',
          },
          visionline_metadata: {
            properties: {
              lan_address: {
                description:
                  'IP address or hostname of the main Visionline server relative to the Seam Bridge on the local network.',
                type: 'string',
              },
              mobile_access_uuid: {
                description:
                  'Keyset loaded into a reader. Mobile keys and reader administration tools securely authenticate only with readers programmed with a matching keyset.',
                type: 'string',
              },
              system_id: {
                description:
                  'Unique ID assigned by the ASSA ABLOY licensing team that identifies each hotel in your credential manager.',
                type: 'string',
              },
            },
            required: ['mobile_access_uuid', 'system_id', 'lan_address'],
            type: 'object',
          },
          warnings: {
            description: 'Warnings associated with the `acs_system`.',
            items: {
              description: 'Warning associated with the `acs_system`.',
              oneOf: [
                {
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the warning.',
                      format: 'date-time',
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                    warning_code: {
                      description:
                        'Indicates that the Salto KS site has exceeded 80% of the maximum number of allowed users. Please increase your subscription limit, or delete some users from your site to rectify this.',
                      enum: ['salto_ks_subscription_limit_almost_reached'],
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'warning_code'],
                  type: 'object',
                },
                {
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the warning.',
                      format: 'date-time',
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                    misconfigured_acs_entrance_ids: {
                      items: { format: 'uuid', type: 'string' },
                      type: 'array',
                    },
                    warning_code: {
                      description:
                        'Indicates the ACS system time zone could not be determined because the reported physical location does not match the time zone configured on the physical ACS entrances.',
                      enum: ['time_zone_does_not_match_location'],
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'warning_code'],
                  type: 'object',
                },
              ],
            },
            type: 'array',
          },
          workspace_id: {
            description:
              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the `acs_system`.',
            format: 'uuid',
            type: 'string',
          },
        },
        required: [
          'acs_system_id',
          'is_credential_manager',
          'location',
          'name',
          'created_at',
          'workspace_id',
          'connected_account_ids',
          'connected_account_id',
          'image_url',
          'image_alt_text',
          'errors',
          'warnings',
        ],
        type: 'object',
      },
      acs_user: {
        description:
          'Represents a [user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) in an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
        properties: {
          access_schedule: {
            description:
              "`starts_at` and `ends_at` timestamps for the `acs_user`'s access.",
            properties: {
              ends_at: {
                description:
                  "Date and time at which the user's access ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.",
                format: 'date-time',
                nullable: true,
                type: 'string',
              },
              starts_at: {
                description:
                  "Date and time at which the user's access starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.",
                format: 'date-time',
                type: 'string',
              },
            },
            required: ['starts_at', 'ends_at'],
            type: 'object',
          },
          acs_system_id: {
            description:
              'ID of the access control system that contains the `acs_user`.',
            format: 'uuid',
            type: 'string',
          },
          acs_user_id: {
            description: 'ID of the `acs_user`.',
            format: 'uuid',
            type: 'string',
          },
          created_at: {
            description: 'Date and time at which the `acs_user` was created.',
            format: 'date-time',
            type: 'string',
          },
          display_name: {
            description: 'Display name for the `acs_user`.',
            type: 'string',
          },
          email: {
            deprecated: true,
            format: 'email',
            type: 'string',
            'x-deprecated': 'use email_address.',
          },
          email_address: {
            description: 'Email address of the `acs_user`.',
            format: 'email',
            type: 'string',
          },
          errors: {
            description: 'Errors associated with the `acs_user`.',
            items: {
              description: 'Error associated with the `acs_user`.',
              oneOf: [
                {
                  description:
                    'Indicates that the ACS user was deleted from the ACS system outside of Seam.',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      enum: ['deleted_externally'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
                {
                  description:
                    'Indicates that the user could not be subscribed on Salto KS because the subscription limit has been exceeded.',
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      enum: ['salto_ks_subscription_limit_exceeded'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
                {
                  description:
                    "Indicates that the user was not created on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.",
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      enum: ['failed_to_create_on_acs_system'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
                {
                  description:
                    "Indicates that the user was not updated on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.",
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      enum: ['failed_to_update_on_acs_system'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
                {
                  description:
                    "Indicates that the user was not deleted on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.",
                  properties: {
                    created_at: {
                      description:
                        'Date and time at which Seam created the error.',
                      format: 'date-time',
                      type: 'string',
                    },
                    error_code: {
                      enum: ['failed_to_delete_on_acs_system'],
                      type: 'string',
                    },
                    message: {
                      description:
                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'error_code'],
                  type: 'object',
                },
              ],
            },
            type: 'array',
          },
          external_type: {
            description: 'Brand-specific terminology for the `acs_user` type.',
            enum: [
              'pti_user',
              'brivo_user',
              'hid_credential_manager_user',
              'salto_site_user',
              'latch_user',
              'dormakaba_community_user',
            ],
            type: 'string',
          },
          external_type_display_name: {
            description:
              'Display name that corresponds to the brand-specific terminology for the `acs_user` type.',
            type: 'string',
          },
          full_name: {
            description: 'Full name of the `acs_user`.',
            type: 'string',
          },
          hid_acs_system_id: { format: 'uuid', type: 'string' },
          is_latest_desired_state_synced_with_provider: {
            nullable: true,
            type: 'boolean',
            'x-undocumented': 'Only used internally.',
          },
          is_managed: { enum: [true], type: 'boolean' },
          is_suspended: {
            description:
              'Indicates whether the `acs_user` is currently [suspended](https://docs.seam.co/latest/capability-guides/access-systems/user-management/suspending-and-unsuspending-users).',
            type: 'boolean',
          },
          latest_desired_state_synced_with_provider_at: {
            format: 'date-time',
            nullable: true,
            type: 'string',
            'x-undocumented': 'Only used internally.',
          },
          phone_number: {
            description:
              'Phone number of the `acs_user` in E.164 format (for example, `+15555550100`).',
            type: 'string',
          },
          user_identity_email_address: {
            description:
              'Email address of the user identity associated with the `acs_user`.',
            nullable: true,
            type: 'string',
          },
          user_identity_full_name: {
            description:
              'Full name of the user identity associated with the `acs_user`.',
            nullable: true,
            type: 'string',
          },
          user_identity_id: {
            description:
              'ID of the user identity associated with the `acs_user`.',
            type: 'string',
          },
          user_identity_phone_number: {
            description:
              'Phone number of the user identity associated with the `acs_user` in E.164 format (for example, `+15555550100`).',
            nullable: true,
            type: 'string',
          },
          warnings: {
            description: 'Warnings associated with the `acs_user`.',
            items: {
              description: 'Warning associated with the `acs_user`.',
              oneOf: [
                {
                  description:
                    'Indicates that the user is being deleted from the ACS system. This is a temporary state, and the user will be deleted shortly.',
                  properties: {
                    created_at: { format: 'date-time', type: 'string' },
                    message: { type: 'string' },
                    warning_code: { enum: ['being_deleted'], type: 'string' },
                  },
                  required: ['created_at', 'message', 'warning_code'],
                  type: 'object',
                },
                {
                  description:
                    'Indicates that the user is not subscribed on the Salto KS, so they cannot unlock doors or perform any actions. This occur when the their access schedule hasn’t started yet, or if their access schedule has ended, or if the site has reached its limit for active users (subscription slots), or if they have been manually unsubscribed.',
                  properties: {
                    created_at: { format: 'date-time', type: 'string' },
                    message: { type: 'string' },
                    warning_code: {
                      enum: ['salto_ks_user_not_subscribed'],
                      type: 'string',
                    },
                  },
                  required: ['created_at', 'message', 'warning_code'],
                  type: 'object',
                },
              ],
            },
            type: 'array',
          },
          workspace_id: {
            description:
              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the `acs_user`.',
            format: 'uuid',
            type: 'string',
          },
        },
        required: [
          'acs_user_id',
          'acs_system_id',
          'workspace_id',
          'created_at',
          'display_name',
          'warnings',
          'errors',
          'is_managed',
        ],
        type: 'object',
      },
      action_attempt: {
        oneOf: [
          {
            description: 'Locking door.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['LOCK_DOOR'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            description: 'Locking door succeeded.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['LOCK_DOOR'], type: 'string' },
              error: { nullable: true },
              result: { properties: {}, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            description: 'Locking door failed.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['LOCK_DOOR'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            description: 'Unlocking door.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['UNLOCK_DOOR'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            description: 'Unlocking door succeeded.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['UNLOCK_DOOR'], type: 'string' },
              error: { nullable: true },
              result: { properties: {}, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            description: 'Unlocking door failed.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['UNLOCK_DOOR'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            description: 'Reading credential data from physical encoder.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SCAN_CREDENTIAL'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            description:
              'Reading credential data from physical encoder succeeded.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SCAN_CREDENTIAL'], type: 'string' },
              error: { nullable: true },
              result: {
                properties: {
                  acs_credential_on_encoder: {
                    description:
                      'Snapshot of credential data read from physical encoder.',
                    nullable: true,
                    properties: {
                      card_number: {
                        description:
                          'A number or string that physically identifies this card.',
                        nullable: true,
                        type: 'string',
                      },
                      created_at: {
                        description:
                          'Date and time the credential was created.',
                        format: 'date-time',
                        nullable: true,
                        type: 'string',
                      },
                      ends_at: {
                        description:
                          'Date and time the credential will stop being useable.',
                        format: 'date-time',
                        nullable: true,
                        type: 'string',
                      },
                      is_issued: { nullable: true, type: 'boolean' },
                      starts_at: {
                        description:
                          'Date and time the credential will become useable.',
                        format: 'date-time',
                        nullable: true,
                        type: 'string',
                      },
                      visionline_metadata: {
                        description:
                          'Visionline-specific metadata for the credential.',
                        properties: {
                          cancelled: { type: 'boolean' },
                          card_format: {
                            enum: ['TLCode', 'rfid48'],
                            type: 'string',
                          },
                          card_holder: { type: 'string' },
                          card_id: { type: 'string' },
                          common_acs_entrance_ids: {
                            items: { format: 'uuid', type: 'string' },
                            type: 'array',
                          },
                          discarded: { type: 'boolean' },
                          expired: { type: 'boolean' },
                          guest_acs_entrance_ids: {
                            items: { format: 'uuid', type: 'string' },
                            type: 'array',
                          },
                          number_of_issued_cards: {
                            format: 'float',
                            type: 'number',
                          },
                          overridden: { type: 'boolean' },
                          overwritten: { type: 'boolean' },
                          pending_auto_update: { type: 'boolean' },
                        },
                        required: [
                          'card_id',
                          'cancelled',
                          'discarded',
                          'expired',
                          'overwritten',
                          'pending_auto_update',
                          'card_format',
                          'number_of_issued_cards',
                        ],
                        type: 'object',
                      },
                    },
                    required: [
                      'created_at',
                      'is_issued',
                      'starts_at',
                      'ends_at',
                      'card_number',
                    ],
                    type: 'object',
                  },
                  acs_credential_on_seam: {
                    description:
                      'Matching acs_credential currently encoded on this card.',
                    nullable: true,
                    oneOf: [
                      {
                        description:
                          'Means by which a user gains access at an entrance.\nThe `acs_credential` object represents a credential that provides an ACS user access within an access control system. For each acs_credential object, you define the access method. You can also specify additional properties, such as a code.',
                        properties: {
                          access_method: {
                            description:
                              'Access method for the credential. Supported values: `code`, `card`, `mobile_key`.',
                            enum: ['code', 'card', 'mobile_key'],
                            type: 'string',
                          },
                          acs_credential_id: {
                            description: 'ID of the credential.',
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_credential_pool_id: {
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_system_id: {
                            description:
                              'ID of the access control system that contains the credential.',
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_user_id: {
                            description:
                              'ID of the ACS user to whom the credential belongs.',
                            format: 'uuid',
                            type: 'string',
                          },
                          card_number: { nullable: true, type: 'string' },
                          code: {
                            description:
                              'Access (PIN) code for the credential.',
                            nullable: true,
                            type: 'string',
                          },
                          created_at: {
                            description:
                              'Date and time at which the credential was created.',
                            format: 'date-time',
                            type: 'string',
                          },
                          display_name: {
                            description:
                              'Display name that corresponds to the credential type.',
                            minLength: 1,
                            type: 'string',
                          },
                          ends_at: {
                            description:
                              'Date and time at which the credential validity ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
                            type: 'string',
                          },
                          errors: {
                            description:
                              'Errors associated with the `acs_credential`.',
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
                            description:
                              'Brand-specific terminology for the credential type. Supported values: `pti_card`, `brivo_credential`, `hid_credential`, `visionline_card`.',
                            enum: [
                              'pti_card',
                              'brivo_credential',
                              'hid_credential',
                              'visionline_card',
                              'salto_ks_credential',
                            ],
                            type: 'string',
                          },
                          external_type_display_name: {
                            description:
                              'Display name that corresponds to the brand-specific terminology for the credential type.',
                            type: 'string',
                          },
                          is_issued: { type: 'boolean' },
                          is_latest_desired_state_synced_with_provider: {
                            description:
                              'Indicates whether the latest state of the credential has been synced from Seam to the provider.',
                            nullable: true,
                            type: 'boolean',
                          },
                          is_managed: { enum: [true], type: 'boolean' },
                          is_multi_phone_sync_credential: {
                            description:
                              'Indicates whether the credential is a [multi-phone sync credential](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#what-are-multi-phone-sync-credentials).',
                            type: 'boolean',
                          },
                          is_one_time_use: {
                            description:
                              'Indicates whether the credential can only be used once. If "true," the code becomes invalid after the first use.',
                            type: 'boolean',
                          },
                          issued_at: {
                            format: 'date-time',
                            nullable: true,
                            type: 'string',
                          },
                          latest_desired_state_synced_with_provider_at: {
                            description:
                              'Date and time at which the state of the credential was most recently synced from Seam to the provider.',
                            format: 'date-time',
                            nullable: true,
                            type: 'string',
                          },
                          parent_acs_credential_id: {
                            description: 'ID of the parent credential.',
                            format: 'uuid',
                            type: 'string',
                          },
                          starts_at: {
                            description:
                              'Date and time at which the credential validity starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                            type: 'string',
                          },
                          visionline_metadata: {
                            description:
                              'Visionline-specific metadata for the credential.',
                            properties: {
                              auto_join: { type: 'boolean' },
                              card_function_type: {
                                enum: ['guest', 'staff'],
                                type: 'string',
                              },
                              card_id: { type: 'string' },
                              common_acs_entrance_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                              credential_id: { type: 'string' },
                              guest_acs_entrance_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                              is_valid: { type: 'boolean' },
                              joiner_acs_credential_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                            },
                            required: ['card_function_type'],
                            type: 'object',
                          },
                          warnings: {
                            description:
                              'Warnings associated with the `acs_credential`.',
                            items: {
                              description:
                                'Warning associated with the `acs_credential`.',
                              oneOf: [
                                {
                                  description:
                                    'Indicates that the credential is waiting to be issued.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['waiting_to_be_issued'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    "Indicates that the schedule of one of the credential's children was modified externally.",
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['schedule_externally_modified'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'Indicates that the schedule of this credential was modified to avoid creating a credential with a start date in the past.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['schedule_modified'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'Indicates that this credential is being deleted.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['being_deleted'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'An unknown issue occurred while syncing the state of this credential with the provider. This issue may affect the proper functioning of this credential.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: [
                                        'unknown_issue_with_acs_credential',
                                      ],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                              ],
                            },
                            type: 'array',
                          },
                          workspace_id: {
                            description:
                              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the credential.',
                            format: 'uuid',
                            type: 'string',
                          },
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
                          'is_managed',
                        ],
                        type: 'object',
                      },
                      {
                        description:
                          'Means by which a user gains access at an entrance.\nThe `unmanaged_acs_credential` object, which is not managed by Seam, represents a credential that provides an ACS user access within an access control system. For each acs_credential object, you define the access method. You can also specify additional properties, such as a code.',
                        properties: {
                          access_method: {
                            description:
                              'Access method for the credential. Supported values: `code`, `card`, `mobile_key`.',
                            enum: ['code', 'card', 'mobile_key'],
                            type: 'string',
                          },
                          acs_credential_id: {
                            description: 'ID of the credential.',
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_credential_pool_id: {
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_system_id: {
                            description:
                              'ID of the access control system that contains the credential.',
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_user_id: {
                            description:
                              'ID of the ACS user to whom the credential belongs.',
                            format: 'uuid',
                            type: 'string',
                          },
                          card_number: { nullable: true, type: 'string' },
                          code: {
                            description:
                              'Access (PIN) code for the credential.',
                            nullable: true,
                            type: 'string',
                          },
                          created_at: {
                            description:
                              'Date and time at which the credential was created.',
                            format: 'date-time',
                            type: 'string',
                          },
                          display_name: {
                            description:
                              'Display name that corresponds to the credential type.',
                            minLength: 1,
                            type: 'string',
                          },
                          ends_at: {
                            description:
                              'Date and time at which the credential validity ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
                            type: 'string',
                          },
                          errors: {
                            description:
                              'Errors associated with the `acs_credential`.',
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
                            description:
                              'Brand-specific terminology for the credential type. Supported values: `pti_card`, `brivo_credential`, `hid_credential`, `visionline_card`.',
                            enum: [
                              'pti_card',
                              'brivo_credential',
                              'hid_credential',
                              'visionline_card',
                              'salto_ks_credential',
                            ],
                            type: 'string',
                          },
                          external_type_display_name: {
                            description:
                              'Display name that corresponds to the brand-specific terminology for the credential type.',
                            type: 'string',
                          },
                          is_issued: { type: 'boolean' },
                          is_latest_desired_state_synced_with_provider: {
                            description:
                              'Indicates whether the latest state of the credential has been synced from Seam to the provider.',
                            nullable: true,
                            type: 'boolean',
                          },
                          is_managed: { enum: [false], type: 'boolean' },
                          is_multi_phone_sync_credential: {
                            description:
                              'Indicates whether the credential is a [multi-phone sync credential](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#what-are-multi-phone-sync-credentials).',
                            type: 'boolean',
                          },
                          is_one_time_use: {
                            description:
                              'Indicates whether the credential can only be used once. If "true," the code becomes invalid after the first use.',
                            type: 'boolean',
                          },
                          issued_at: {
                            format: 'date-time',
                            nullable: true,
                            type: 'string',
                          },
                          latest_desired_state_synced_with_provider_at: {
                            description:
                              'Date and time at which the state of the credential was most recently synced from Seam to the provider.',
                            format: 'date-time',
                            nullable: true,
                            type: 'string',
                          },
                          parent_acs_credential_id: {
                            description: 'ID of the parent credential.',
                            format: 'uuid',
                            type: 'string',
                          },
                          starts_at: {
                            description:
                              'Date and time at which the credential validity starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                            type: 'string',
                          },
                          visionline_metadata: {
                            description:
                              'Visionline-specific metadata for the credential.',
                            properties: {
                              auto_join: { type: 'boolean' },
                              card_function_type: {
                                enum: ['guest', 'staff'],
                                type: 'string',
                              },
                              card_id: { type: 'string' },
                              common_acs_entrance_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                              credential_id: { type: 'string' },
                              guest_acs_entrance_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                              is_valid: { type: 'boolean' },
                              joiner_acs_credential_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                            },
                            required: ['card_function_type'],
                            type: 'object',
                          },
                          warnings: {
                            description:
                              'Warnings associated with the `acs_credential`.',
                            items: {
                              description:
                                'Warning associated with the `acs_credential`.',
                              oneOf: [
                                {
                                  description:
                                    'Indicates that the credential is waiting to be issued.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['waiting_to_be_issued'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    "Indicates that the schedule of one of the credential's children was modified externally.",
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['schedule_externally_modified'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'Indicates that the schedule of this credential was modified to avoid creating a credential with a start date in the past.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['schedule_modified'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'Indicates that this credential is being deleted.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['being_deleted'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'An unknown issue occurred while syncing the state of this credential with the provider. This issue may affect the proper functioning of this credential.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: [
                                        'unknown_issue_with_acs_credential',
                                      ],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                              ],
                            },
                            type: 'array',
                          },
                          workspace_id: {
                            description:
                              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the credential.',
                            format: 'uuid',
                            type: 'string',
                          },
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
                          'is_managed',
                        ],
                        type: 'object',
                      },
                    ],
                  },
                  warnings: {
                    items: {
                      properties: {
                        warning_code: {
                          enum: [
                            'acs_credential_on_encoder_out_of_sync',
                            'acs_credential_on_seam_not_found',
                          ],
                          type: 'string',
                        },
                        warning_message: { type: 'string' },
                      },
                      required: ['warning_code', 'warning_message'],
                      type: 'object',
                    },
                    type: 'array',
                  },
                },
                required: [
                  'acs_credential_on_encoder',
                  'acs_credential_on_seam',
                  'warnings',
                ],
                type: 'object',
              },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            description:
              'Reading credential data from physical encoder failed.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SCAN_CREDENTIAL'], type: 'string' },
              error: {
                oneOf: [
                  {
                    properties: {
                      message: { type: 'string' },
                      type: { enum: ['uncategorized_error'], type: 'string' },
                    },
                    required: ['type', 'message'],
                    type: 'object',
                  },
                  {
                    properties: {
                      message: { type: 'string' },
                      type: {
                        enum: ['action_attempt_expired'],
                        type: 'string',
                      },
                    },
                    required: ['type', 'message'],
                    type: 'object',
                  },
                  {
                    properties: {
                      message: { type: 'string' },
                      type: {
                        enum: ['no_credential_on_encoder'],
                        type: 'string',
                      },
                    },
                    required: ['type', 'message'],
                    type: 'object',
                  },
                ],
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            description: 'Encoding credential data from physical encoder.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['ENCODE_CREDENTIAL'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            description:
              'Encoding credential data from physical encoder succeeded.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['ENCODE_CREDENTIAL'], type: 'string' },
              error: { nullable: true },
              result: {
                description:
                  'Means by which a user gains access at an entrance.\nThe `acs_credential` object represents a credential that provides an ACS user access within an access control system. For each acs_credential object, you define the access method. You can also specify additional properties, such as a code.',
                oneOf: [
                  {
                    description:
                      'Means by which a user gains access at an entrance.\nThe `acs_credential` object represents a credential that provides an ACS user access within an access control system. For each acs_credential object, you define the access method. You can also specify additional properties, such as a code.',
                    properties: {
                      access_method: {
                        description:
                          'Access method for the credential. Supported values: `code`, `card`, `mobile_key`.',
                        enum: ['code', 'card', 'mobile_key'],
                        type: 'string',
                      },
                      acs_credential_id: {
                        description: 'ID of the credential.',
                        format: 'uuid',
                        type: 'string',
                      },
                      acs_credential_pool_id: {
                        format: 'uuid',
                        type: 'string',
                      },
                      acs_system_id: {
                        description:
                          'ID of the access control system that contains the credential.',
                        format: 'uuid',
                        type: 'string',
                      },
                      acs_user_id: {
                        description:
                          'ID of the ACS user to whom the credential belongs.',
                        format: 'uuid',
                        type: 'string',
                      },
                      card_number: { nullable: true, type: 'string' },
                      code: {
                        description: 'Access (PIN) code for the credential.',
                        nullable: true,
                        type: 'string',
                      },
                      created_at: {
                        description:
                          'Date and time at which the credential was created.',
                        format: 'date-time',
                        type: 'string',
                      },
                      display_name: {
                        description:
                          'Display name that corresponds to the credential type.',
                        minLength: 1,
                        type: 'string',
                      },
                      ends_at: {
                        description:
                          'Date and time at which the credential validity ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
                        type: 'string',
                      },
                      errors: {
                        description:
                          'Errors associated with the `acs_credential`.',
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
                        description:
                          'Brand-specific terminology for the credential type. Supported values: `pti_card`, `brivo_credential`, `hid_credential`, `visionline_card`.',
                        enum: [
                          'pti_card',
                          'brivo_credential',
                          'hid_credential',
                          'visionline_card',
                          'salto_ks_credential',
                        ],
                        type: 'string',
                      },
                      external_type_display_name: {
                        description:
                          'Display name that corresponds to the brand-specific terminology for the credential type.',
                        type: 'string',
                      },
                      is_issued: { type: 'boolean' },
                      is_latest_desired_state_synced_with_provider: {
                        description:
                          'Indicates whether the latest state of the credential has been synced from Seam to the provider.',
                        nullable: true,
                        type: 'boolean',
                      },
                      is_managed: { enum: [true], type: 'boolean' },
                      is_multi_phone_sync_credential: {
                        description:
                          'Indicates whether the credential is a [multi-phone sync credential](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#what-are-multi-phone-sync-credentials).',
                        type: 'boolean',
                      },
                      is_one_time_use: {
                        description:
                          'Indicates whether the credential can only be used once. If "true," the code becomes invalid after the first use.',
                        type: 'boolean',
                      },
                      issued_at: {
                        format: 'date-time',
                        nullable: true,
                        type: 'string',
                      },
                      latest_desired_state_synced_with_provider_at: {
                        description:
                          'Date and time at which the state of the credential was most recently synced from Seam to the provider.',
                        format: 'date-time',
                        nullable: true,
                        type: 'string',
                      },
                      parent_acs_credential_id: {
                        description: 'ID of the parent credential.',
                        format: 'uuid',
                        type: 'string',
                      },
                      starts_at: {
                        description:
                          'Date and time at which the credential validity starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                        type: 'string',
                      },
                      visionline_metadata: {
                        description:
                          'Visionline-specific metadata for the credential.',
                        properties: {
                          auto_join: { type: 'boolean' },
                          card_function_type: {
                            enum: ['guest', 'staff'],
                            type: 'string',
                          },
                          card_id: { type: 'string' },
                          common_acs_entrance_ids: {
                            items: { format: 'uuid', type: 'string' },
                            type: 'array',
                          },
                          credential_id: { type: 'string' },
                          guest_acs_entrance_ids: {
                            items: { format: 'uuid', type: 'string' },
                            type: 'array',
                          },
                          is_valid: { type: 'boolean' },
                          joiner_acs_credential_ids: {
                            items: { format: 'uuid', type: 'string' },
                            type: 'array',
                          },
                        },
                        required: ['card_function_type'],
                        type: 'object',
                      },
                      warnings: {
                        description:
                          'Warnings associated with the `acs_credential`.',
                        items: {
                          description:
                            'Warning associated with the `acs_credential`.',
                          oneOf: [
                            {
                              description:
                                'Indicates that the credential is waiting to be issued.',
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['waiting_to_be_issued'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                            {
                              description:
                                "Indicates that the schedule of one of the credential's children was modified externally.",
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['schedule_externally_modified'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                            {
                              description:
                                'Indicates that the schedule of this credential was modified to avoid creating a credential with a start date in the past.',
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['schedule_modified'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                            {
                              description:
                                'Indicates that this credential is being deleted.',
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['being_deleted'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                            {
                              description:
                                'An unknown issue occurred while syncing the state of this credential with the provider. This issue may affect the proper functioning of this credential.',
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['unknown_issue_with_acs_credential'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                          ],
                        },
                        type: 'array',
                      },
                      workspace_id: {
                        description:
                          'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the credential.',
                        format: 'uuid',
                        type: 'string',
                      },
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
                      'is_managed',
                    ],
                    type: 'object',
                  },
                  {
                    description:
                      'Means by which a user gains access at an entrance.\nThe `unmanaged_acs_credential` object, which is not managed by Seam, represents a credential that provides an ACS user access within an access control system. For each acs_credential object, you define the access method. You can also specify additional properties, such as a code.',
                    properties: {
                      access_method: {
                        description:
                          'Access method for the credential. Supported values: `code`, `card`, `mobile_key`.',
                        enum: ['code', 'card', 'mobile_key'],
                        type: 'string',
                      },
                      acs_credential_id: {
                        description: 'ID of the credential.',
                        format: 'uuid',
                        type: 'string',
                      },
                      acs_credential_pool_id: {
                        format: 'uuid',
                        type: 'string',
                      },
                      acs_system_id: {
                        description:
                          'ID of the access control system that contains the credential.',
                        format: 'uuid',
                        type: 'string',
                      },
                      acs_user_id: {
                        description:
                          'ID of the ACS user to whom the credential belongs.',
                        format: 'uuid',
                        type: 'string',
                      },
                      card_number: { nullable: true, type: 'string' },
                      code: {
                        description: 'Access (PIN) code for the credential.',
                        nullable: true,
                        type: 'string',
                      },
                      created_at: {
                        description:
                          'Date and time at which the credential was created.',
                        format: 'date-time',
                        type: 'string',
                      },
                      display_name: {
                        description:
                          'Display name that corresponds to the credential type.',
                        minLength: 1,
                        type: 'string',
                      },
                      ends_at: {
                        description:
                          'Date and time at which the credential validity ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
                        type: 'string',
                      },
                      errors: {
                        description:
                          'Errors associated with the `acs_credential`.',
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
                        description:
                          'Brand-specific terminology for the credential type. Supported values: `pti_card`, `brivo_credential`, `hid_credential`, `visionline_card`.',
                        enum: [
                          'pti_card',
                          'brivo_credential',
                          'hid_credential',
                          'visionline_card',
                          'salto_ks_credential',
                        ],
                        type: 'string',
                      },
                      external_type_display_name: {
                        description:
                          'Display name that corresponds to the brand-specific terminology for the credential type.',
                        type: 'string',
                      },
                      is_issued: { type: 'boolean' },
                      is_latest_desired_state_synced_with_provider: {
                        description:
                          'Indicates whether the latest state of the credential has been synced from Seam to the provider.',
                        nullable: true,
                        type: 'boolean',
                      },
                      is_managed: { enum: [false], type: 'boolean' },
                      is_multi_phone_sync_credential: {
                        description:
                          'Indicates whether the credential is a [multi-phone sync credential](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#what-are-multi-phone-sync-credentials).',
                        type: 'boolean',
                      },
                      is_one_time_use: {
                        description:
                          'Indicates whether the credential can only be used once. If "true," the code becomes invalid after the first use.',
                        type: 'boolean',
                      },
                      issued_at: {
                        format: 'date-time',
                        nullable: true,
                        type: 'string',
                      },
                      latest_desired_state_synced_with_provider_at: {
                        description:
                          'Date and time at which the state of the credential was most recently synced from Seam to the provider.',
                        format: 'date-time',
                        nullable: true,
                        type: 'string',
                      },
                      parent_acs_credential_id: {
                        description: 'ID of the parent credential.',
                        format: 'uuid',
                        type: 'string',
                      },
                      starts_at: {
                        description:
                          'Date and time at which the credential validity starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                        type: 'string',
                      },
                      visionline_metadata: {
                        description:
                          'Visionline-specific metadata for the credential.',
                        properties: {
                          auto_join: { type: 'boolean' },
                          card_function_type: {
                            enum: ['guest', 'staff'],
                            type: 'string',
                          },
                          card_id: { type: 'string' },
                          common_acs_entrance_ids: {
                            items: { format: 'uuid', type: 'string' },
                            type: 'array',
                          },
                          credential_id: { type: 'string' },
                          guest_acs_entrance_ids: {
                            items: { format: 'uuid', type: 'string' },
                            type: 'array',
                          },
                          is_valid: { type: 'boolean' },
                          joiner_acs_credential_ids: {
                            items: { format: 'uuid', type: 'string' },
                            type: 'array',
                          },
                        },
                        required: ['card_function_type'],
                        type: 'object',
                      },
                      warnings: {
                        description:
                          'Warnings associated with the `acs_credential`.',
                        items: {
                          description:
                            'Warning associated with the `acs_credential`.',
                          oneOf: [
                            {
                              description:
                                'Indicates that the credential is waiting to be issued.',
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['waiting_to_be_issued'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                            {
                              description:
                                "Indicates that the schedule of one of the credential's children was modified externally.",
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['schedule_externally_modified'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                            {
                              description:
                                'Indicates that the schedule of this credential was modified to avoid creating a credential with a start date in the past.',
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['schedule_modified'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                            {
                              description:
                                'Indicates that this credential is being deleted.',
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['being_deleted'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                            {
                              description:
                                'An unknown issue occurred while syncing the state of this credential with the provider. This issue may affect the proper functioning of this credential.',
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['unknown_issue_with_acs_credential'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                          ],
                        },
                        type: 'array',
                      },
                      workspace_id: {
                        description:
                          'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the credential.',
                        format: 'uuid',
                        type: 'string',
                      },
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
                      'is_managed',
                    ],
                    type: 'object',
                  },
                ],
              },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            description:
              'Encoding credential data from physical encoder failed.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['ENCODE_CREDENTIAL'], type: 'string' },
              error: {
                oneOf: [
                  {
                    properties: {
                      message: { type: 'string' },
                      type: { enum: ['uncategorized_error'], type: 'string' },
                    },
                    required: ['type', 'message'],
                    type: 'object',
                  },
                  {
                    properties: {
                      message: { type: 'string' },
                      type: {
                        enum: ['action_attempt_expired'],
                        type: 'string',
                      },
                    },
                    required: ['type', 'message'],
                    type: 'object',
                  },
                  {
                    properties: {
                      message: { type: 'string' },
                      type: {
                        enum: ['no_credential_on_encoder'],
                        type: 'string',
                      },
                    },
                    required: ['type', 'message'],
                    type: 'object',
                  },
                  {
                    properties: {
                      message: { type: 'string' },
                      type: {
                        enum: ['incompatible_card_format'],
                        type: 'string',
                      },
                    },
                    required: ['type', 'message'],
                    type: 'object',
                  },
                ],
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            description: 'Resetting sandbox workspace.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: {
                enum: ['RESET_SANDBOX_WORKSPACE'],
                type: 'string',
              },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            description: 'Resetting sandbox workspace succeeded.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: {
                enum: ['RESET_SANDBOX_WORKSPACE'],
                type: 'string',
              },
              error: { nullable: true },
              result: { properties: {}, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            description: 'Resetting sandbox workspace failed.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: {
                enum: ['RESET_SANDBOX_WORKSPACE'],
                type: 'string',
              },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            description: 'Setting fan mode.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SET_FAN_MODE'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            description: 'Setting fan mode succeeded.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SET_FAN_MODE'], type: 'string' },
              error: { nullable: true },
              result: { properties: {}, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            description: 'Setting fan mode failed.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SET_FAN_MODE'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            description: 'Setting HVAC mode.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SET_HVAC_MODE'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            description: 'Setting HVAC mode succeeded.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SET_HVAC_MODE'], type: 'string' },
              error: { nullable: true },
              result: { properties: {}, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            description: 'Setting HVAC mode failed.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SET_HVAC_MODE'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            description: 'Activating climate preset.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: {
                enum: ['ACTIVATE_CLIMATE_PRESET'],
                type: 'string',
              },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            description: 'Activating climate preset succeeded.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: {
                enum: ['ACTIVATE_CLIMATE_PRESET'],
                type: 'string',
              },
              error: { nullable: true },
              result: { properties: {}, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            description: 'Activating climate preset failed.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: {
                enum: ['ACTIVATE_CLIMATE_PRESET'],
                type: 'string',
              },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SYNC_ACCESS_CODES'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SYNC_ACCESS_CODES'], type: 'string' },
              error: { nullable: true },
              result: { properties: {}, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['SYNC_ACCESS_CODES'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['CREATE_ACCESS_CODE'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['CREATE_ACCESS_CODE'], type: 'string' },
              error: { nullable: true },
              result: { properties: { access_code: {} }, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['CREATE_ACCESS_CODE'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['DELETE_ACCESS_CODE'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['DELETE_ACCESS_CODE'], type: 'string' },
              error: { nullable: true },
              result: { properties: {}, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['DELETE_ACCESS_CODE'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['UPDATE_ACCESS_CODE'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['UPDATE_ACCESS_CODE'], type: 'string' },
              error: { nullable: true },
              result: { properties: { access_code: {} }, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['UPDATE_ACCESS_CODE'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['CREATE_NOISE_THRESHOLD'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['CREATE_NOISE_THRESHOLD'], type: 'string' },
              error: { nullable: true },
              result: { properties: { noise_threshold: {} }, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['CREATE_NOISE_THRESHOLD'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['DELETE_NOISE_THRESHOLD'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['DELETE_NOISE_THRESHOLD'], type: 'string' },
              error: { nullable: true },
              result: { properties: {}, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['DELETE_NOISE_THRESHOLD'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
              'error',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['UPDATE_NOISE_THRESHOLD'], type: 'string' },
              error: { nullable: true },
              result: { nullable: true },
              status: { enum: ['pending'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'error',
              'action_type',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['UPDATE_NOISE_THRESHOLD'], type: 'string' },
              error: { nullable: true },
              result: { properties: { noise_threshold: {} }, type: 'object' },
              status: { enum: ['success'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'error',
              'action_type',
              'result',
            ],
            type: 'object',
          },
          {
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: { enum: ['UPDATE_NOISE_THRESHOLD'], type: 'string' },
              error: {
                properties: {
                  message: { type: 'string' },
                  type: { type: 'string' },
                },
                required: ['type', 'message'],
                type: 'object',
              },
              result: { nullable: true },
              status: { enum: ['error'], type: 'string' },
            },
            required: [
              'action_attempt_id',
              'status',
              'result',
              'action_type',
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
          device_count: { format: 'float', type: 'number' },
          expires_at: { format: 'date-time', type: 'string' },
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
          'workspace_id',
          'created_at',
          'expires_at',
          'token',
          'user_identifier_key',
          'device_count',
          'connected_account_ids',
          'connect_webview_ids',
          'user_identity_ids',
        ],
        type: 'object',
      },
      connect_webview: {
        properties: {
          accepted_devices: {
            deprecated: true,
            items: { type: 'string' },
            type: 'array',
            'x-deprecated': 'Unused. Will be removed.',
          },
          accepted_providers: { items: { type: 'string' }, type: 'array' },
          any_device_allowed: {
            deprecated: true,
            type: 'boolean',
            'x-deprecated': 'Unused. Will be removed.',
          },
          any_provider_allowed: { type: 'boolean' },
          authorized_at: {
            format: 'date-time',
            nullable: true,
            type: 'string',
          },
          automatically_manage_new_devices: { type: 'boolean' },
          connect_webview_id: { format: 'uuid', type: 'string' },
          connected_account_id: {
            format: 'uuid',
            nullable: true,
            type: 'string',
          },
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
          'workspace_id',
          'created_at',
          'connected_account_id',
          'url',
          'device_selection_mode',
          'accepted_providers',
          'accepted_devices',
          'any_device_allowed',
          'any_provider_allowed',
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
          errors: {
            items: {
              properties: {
                error_code: { type: 'string' },
                is_connected_account_error: { enum: [true], type: 'boolean' },
                message: { type: 'string' },
              },
              required: ['message', 'is_connected_account_error', 'error_code'],
              type: 'object',
            },
            type: 'array',
          },
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
          warnings: {
            items: {
              description: 'Warning associated with the `connected_account`.',
              oneOf: [
                {
                  properties: {
                    message: { type: 'string' },
                    warning_code: { type: 'string' },
                  },
                  required: ['message', 'warning_code'],
                  type: 'object',
                },
                {
                  description:
                    'An unknown issue occurred while syncing the state of this connected account with the provider. This issue may affect the proper functioning of one or more resources in this account.',
                  properties: {
                    message: { type: 'string' },
                    warning_code: {
                      description:
                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                      enum: ['unknown_issue_with_connected_account'],
                      type: 'string',
                    },
                  },
                  required: ['message', 'warning_code'],
                  type: 'object',
                },
              ],
            },
            type: 'array',
          },
        },
        required: [
          'account_type_display_name',
          'errors',
          'warnings',
          'custom_metadata',
          'automatically_manage_new_devices',
        ],
        type: 'object',
      },
      device: {
        properties: {
          can_hvac_cool: { type: 'boolean' },
          can_hvac_heat: { type: 'boolean' },
          can_hvac_heat_cool: { type: 'boolean' },
          can_program_offline_access_codes: { type: 'boolean' },
          can_program_online_access_codes: { type: 'boolean' },
          can_remotely_lock: { type: 'boolean' },
          can_remotely_unlock: { type: 'boolean' },
          can_simulate_connection: { type: 'boolean' },
          can_simulate_disconnection: { type: 'boolean' },
          can_simulate_removal: { type: 'boolean' },
          can_turn_off_hvac: { type: 'boolean' },
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
                  'akiles_lock',
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
                  'tado_thermostat',
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
              oneOf: [
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_device_error: { enum: [true], type: 'boolean' },
                    message: { type: 'string' },
                  },
                  required: ['message', 'is_device_error', 'error_code'],
                  type: 'object',
                },
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_connected_account_error: {
                      enum: [true],
                      type: 'boolean',
                    },
                    message: { type: 'string' },
                  },
                  required: [
                    'message',
                    'is_connected_account_error',
                    'error_code',
                  ],
                  type: 'object',
                },
              ],
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
                                    format: 'float',
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
                              level: {
                                format: 'float',
                                maximum: 1,
                                minimum: 0,
                                type: 'number',
                              },
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
                            format: 'float',
                            maximum: 1,
                            minimum: 0,
                            type: 'number',
                          },
                          currently_triggering_noise_threshold_ids: {
                            description:
                              'Array of noise threshold IDs that are currently triggering.',
                            items: { type: 'string' },
                            type: 'array',
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
                                deprecated: true,
                                type: 'boolean',
                                'x-deprecated':
                                  'use device.properties.model.can_connect_accessory_keypad',
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
                            deprecated: true,
                            description: 'Name of the device.',
                            type: 'string',
                            'x-deprecated': 'use device.display_name instead',
                          },
                          noise_level_decibels: {
                            description:
                              'Indicates current noise level in decibels, if the device supports noise detection.',
                            format: 'float',
                            type: 'number',
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
                            deprecated: true,
                            type: 'boolean',
                            'x-deprecated':
                              'use device.properties.model.can_connect_accessory_keypad',
                          },
                          supports_offline_access_codes: {
                            deprecated: true,
                            type: 'boolean',
                            'x-deprecated': 'use offline_access_codes_enabled',
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
                      akiles_metadata: {
                        properties: {
                          _member_group_id: { type: 'string' },
                          gadget_id: { type: 'string' },
                          gadget_name: { type: 'string' },
                          product_name: { type: 'string' },
                        },
                        required: ['gadget_name', 'gadget_id', 'product_name'],
                        type: 'object',
                      },
                      assa_abloy_vostio_metadata: {
                        properties: { encoder_name: { type: 'string' } },
                        required: ['encoder_name'],
                        type: 'object',
                      },
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
                          entry_relays_total_count: {
                            format: 'float',
                            type: 'number',
                          },
                          org_name: { type: 'string' },
                          site_id: { format: 'float', type: 'number' },
                          site_name: { type: 'string' },
                          zone_id: { format: 'float', type: 'number' },
                          zone_name: { type: 'string' },
                        },
                        required: [
                          'entry_name',
                          'org_name',
                          'zone_id',
                          'zone_name',
                          'site_id',
                          'site_name',
                          'entry_relays_total_count',
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
                          device_id: {
                            oneOf: [
                              { format: 'float', type: 'number' },
                              { type: 'string' },
                            ],
                          },
                          door_id: { format: 'float', type: 'number' },
                          door_is_wireless: { type: 'boolean' },
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
                                  format: 'float',
                                  type: 'number',
                                },
                                is_24_hour: { type: 'boolean' },
                                is_biweekly_mode: { type: 'boolean' },
                                is_master: { type: 'boolean' },
                                is_one_shot: { type: 'boolean' },
                                name: { type: 'string' },
                                prefix: { format: 'float', type: 'number' },
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
                          site_id: {
                            description: '@DEPRECATED',
                            format: 'float',
                            nullable: true,
                            type: 'number',
                          },
                          site_name: { type: 'string' },
                        },
                        required: [
                          'door_name',
                          'door_is_wireless',
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
                          device_id: { format: 'float', type: 'number' },
                          device_name: { type: 'string' },
                          reclose_delay_in_seconds: {
                            format: 'float',
                            type: 'number',
                          },
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
                          keypad_id: { type: 'string' },
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
                                  value: { format: 'float', type: 'number' },
                                },
                                required: ['time', 'value'],
                                type: 'object',
                              },
                              humidity: {
                                properties: {
                                  time: { type: 'string' },
                                  value: { format: 'float', type: 'number' },
                                },
                                required: ['time', 'value'],
                                type: 'object',
                              },
                              pressure: {
                                properties: {
                                  time: { type: 'string' },
                                  value: { format: 'float', type: 'number' },
                                },
                                required: ['time', 'value'],
                                type: 'object',
                              },
                              sound: {
                                properties: {
                                  time: { type: 'string' },
                                  value: { format: 'float', type: 'number' },
                                },
                                required: ['time', 'value'],
                                type: 'object',
                              },
                              temperature: {
                                properties: {
                                  time: { type: 'string' },
                                  value: { format: 'float', type: 'number' },
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
                          device_custom_name: { type: 'string' },
                          device_name: { type: 'string' },
                          display_name: { type: 'string' },
                          nest_device_id: { type: 'string' },
                        },
                        required: [
                          'nest_device_id',
                          'device_name',
                          'device_custom_name',
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
                          noise_level_decibel: {
                            format: 'float',
                            type: 'number',
                          },
                          noise_level_nrs: { format: 'float', type: 'number' },
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
                      salto_ks_metadata: {
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
                      salto_metadata: {
                        description:
                          '\n    ---\n    deprecated: Use `salto_ks_metadata ` instead.\n    ',
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
                            format: 'float',
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
                          device_num: { format: 'float', type: 'number' },
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
                      tado_metadata: {
                        properties: {
                          device_type: { type: 'string' },
                          serial_no: { type: 'string' },
                        },
                        required: ['serial_no', 'device_type'],
                        type: 'object',
                      },
                      tedee_metadata: {
                        properties: {
                          bridge_id: { format: 'float', type: 'number' },
                          bridge_name: { type: 'string' },
                          device_id: { format: 'float', type: 'number' },
                          device_model: { type: 'string' },
                          device_name: { type: 'string' },
                          keypad_id: { format: 'float', type: 'number' },
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
                          feature_value: { type: 'string' },
                          features: {
                            properties: {
                              incomplete_keyboard_passcode: { type: 'boolean' },
                              lock_command: { type: 'boolean' },
                              passcode: { type: 'boolean' },
                              passcode_management: { type: 'boolean' },
                              unlock_via_gateway: { type: 'boolean' },
                            },
                            required: [
                              'passcode',
                              'passcode_management',
                              'unlock_via_gateway',
                              'lock_command',
                              'incomplete_keyboard_passcode',
                            ],
                            type: 'object',
                          },
                          has_gateway: { type: 'boolean' },
                          lock_alias: { type: 'string' },
                          lock_id: { format: 'float', type: 'number' },
                          wireless_keypads: {
                            items: {
                              properties: {
                                wireless_keypad_id: {
                                  format: 'float',
                                  type: 'number',
                                },
                                wireless_keypad_name: { type: 'string' },
                              },
                              required: [
                                'wireless_keypad_id',
                                'wireless_keypad_name',
                              ],
                              type: 'object',
                            },
                            type: 'array',
                          },
                        },
                        required: [
                          'lock_id',
                          'lock_alias',
                          'feature_value',
                          'features',
                        ],
                        type: 'object',
                      },
                      two_n_metadata: {
                        properties: {
                          device_id: { format: 'float', type: 'number' },
                          device_name: { type: 'string' },
                        },
                        required: ['device_id', 'device_name'],
                        type: 'object',
                      },
                      visionline_metadata: {
                        properties: { encoder_id: { type: 'string' } },
                        required: ['encoder_id'],
                        type: 'object',
                      },
                      wyze_metadata: {
                        properties: {
                          device_id: { type: 'string' },
                          device_info_model: { type: 'string' },
                          device_name: { type: 'string' },
                          keypad_uuid: { type: 'string' },
                          locker_status_hardlock: {
                            format: 'float',
                            type: 'number',
                          },
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
                        items: { format: 'float', type: 'number' },
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
                                    'cannot_contain_089',
                                    'cannot_contain_0789',
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
                                  enum: ['name_length', 'name_must_be_unique'],
                                  type: 'string',
                                },
                                max_length: { format: 'float', type: 'number' },
                                min_length: { format: 'float', type: 'number' },
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
                        properties: {
                          level: { format: 'float', type: 'number' },
                        },
                        required: ['level'],
                        type: 'object',
                      },
                      locked: { type: 'boolean' },
                      max_active_codes_supported: {
                        format: 'float',
                        type: 'number',
                      },
                      supported_code_lengths: {
                        items: { format: 'float', type: 'number' },
                        type: 'array',
                      },
                      supports_backup_access_code_pool: { type: 'boolean' },
                    },
                    type: 'object',
                  },
                  {
                    properties: {
                      active_thermostat_schedule: {
                        default: null,
                        description:
                          'Represents a [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) that activates a configured [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) on a [thermostat](https://docs.seam.co/latest/capability-guides/thermostats) at a specified starting time and deactivates the climate preset at a specified ending time.',
                        nullable: true,
                        properties: {
                          climate_preset_key: {
                            description:
                              'Key of the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) to use for the thermostat schedule.',
                            type: 'string',
                          },
                          created_at: {
                            description:
                              'Date and time at which the thermostat schedule was created.',
                            format: 'date-time',
                            type: 'string',
                          },
                          device_id: {
                            description: 'ID of the desired thermostat device.',
                            format: 'uuid',
                            type: 'string',
                          },
                          ends_at: {
                            description:
                              'Date and time at which the thermostat schedule ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                            format: 'date-time',
                            type: 'string',
                          },
                          errors: {
                            description:
                              'Array of errors associated with the thermostat schedule. Each error object within the array contains two fields: `error_code` and `message`. `error_code` is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. `message` provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.',
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
                          max_override_period_minutes: {
                            description:
                              "Number of minutes for which a person at the thermostat can change the thermostat's settings after the activation of the scheduled climate preset. See also [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).",
                            minimum: 0,
                            type: 'integer',
                          },
                          name: {
                            description:
                              'User-friendly name to identify the thermostat schedule.',
                            type: 'string',
                          },
                          starts_at: {
                            description:
                              'Date and time at which the thermostat schedule starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                            format: 'date-time',
                            type: 'string',
                          },
                          thermostat_schedule_id: {
                            description: 'ID of the thermostat schedule.',
                            format: 'uuid',
                            type: 'string',
                          },
                          unstable_is_override_allowed: {
                            description:
                              "Indicates whether a person at the thermostat can change the thermostat's settings.",
                            type: 'boolean',
                            'x-undocumented': 'Unstable',
                          },
                        },
                        required: [
                          'thermostat_schedule_id',
                          'device_id',
                          'climate_preset_key',
                          'max_override_period_minutes',
                          'starts_at',
                          'ends_at',
                          'created_at',
                          'errors',
                        ],
                        type: 'object',
                      },
                      available_climate_presets: {
                        items: {
                          properties: {
                            can_delete: {
                              description:
                                'Indicates whether this climate preset key can be deleted.',
                              type: 'boolean',
                            },
                            can_edit: {
                              description:
                                'Indicates whether this climate preset key can be edited.',
                              type: 'boolean',
                            },
                            climate_preset_key: {
                              description:
                                'Unique key to identify the climate preset.',
                              type: 'string',
                            },
                            cooling_set_point_celsius: {
                              description:
                                'Temperature to which the thermostat should cool (in °C). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
                              format: 'float',
                              type: 'number',
                            },
                            cooling_set_point_fahrenheit: {
                              description:
                                'Temperature to which the thermostat should cool (in °F).',
                              format: 'float',
                              type: 'number',
                            },
                            display_name: {
                              description:
                                'Display name for the climate preset.',
                              type: 'string',
                            },
                            fan_mode_setting: {
                              description:
                                'Desired fan mode setting, such as `on`, `auto`, or `circulate`.',
                              enum: ['auto', 'on', 'circulate'],
                              type: 'string',
                            },
                            heating_set_point_celsius: {
                              description:
                                'Temperature to which the thermostat should heat (in °C).',
                              format: 'float',
                              type: 'number',
                            },
                            heating_set_point_fahrenheit: {
                              description:
                                'Temperature to which the thermostat should heat (in °F).',
                              format: 'float',
                              type: 'number',
                            },
                            hvac_mode_setting: {
                              description:
                                'Desired [HVAC mode](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/hvac-mode) setting, such as `heat`, `cool`, `heat_cool`, or `off`.',
                              enum: ['off', 'heat', 'cool', 'heat_cool'],
                              type: 'string',
                            },
                            manual_override_allowed: {
                              deprecated: true,
                              description:
                                "Indicates whether a person at the thermostat can change the thermostat's settings.",
                              type: 'boolean',
                              'x-deprecated':
                                "Use 'thermostat_schedule.is_override_allowed'",
                            },
                            name: {
                              default: null,
                              description:
                                'User-friendly name to identify the climate preset.',
                              nullable: true,
                              type: 'string',
                            },
                          },
                          required: [
                            'climate_preset_key',
                            'can_edit',
                            'can_delete',
                            'display_name',
                            'manual_override_allowed',
                          ],
                          type: 'object',
                        },
                        type: 'array',
                      },
                      available_fan_mode_settings: {
                        items: {
                          enum: ['auto', 'on', 'circulate'],
                          type: 'string',
                        },
                        type: 'array',
                      },
                      available_hvac_mode_settings: {
                        items: {
                          enum: ['off', 'heat', 'cool', 'heat_cool'],
                          type: 'string',
                        },
                        type: 'array',
                      },
                      current_climate_setting: {
                        properties: {
                          can_delete: {
                            description:
                              'Indicates whether this climate preset key can be deleted.',
                            type: 'boolean',
                          },
                          can_edit: {
                            description:
                              'Indicates whether this climate preset key can be edited.',
                            type: 'boolean',
                          },
                          climate_preset_key: {
                            description:
                              'Unique key to identify the climate preset.',
                            type: 'string',
                          },
                          cooling_set_point_celsius: {
                            description:
                              'Temperature to which the thermostat should cool (in °C). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
                            format: 'float',
                            type: 'number',
                          },
                          cooling_set_point_fahrenheit: {
                            description:
                              'Temperature to which the thermostat should cool (in °F).',
                            format: 'float',
                            type: 'number',
                          },
                          display_name: {
                            description: 'Display name for the climate preset.',
                            type: 'string',
                          },
                          fan_mode_setting: {
                            description:
                              'Desired fan mode setting, such as `on`, `auto`, or `circulate`.',
                            enum: ['auto', 'on', 'circulate'],
                            type: 'string',
                          },
                          heating_set_point_celsius: {
                            description:
                              'Temperature to which the thermostat should heat (in °C).',
                            format: 'float',
                            type: 'number',
                          },
                          heating_set_point_fahrenheit: {
                            description:
                              'Temperature to which the thermostat should heat (in °F).',
                            format: 'float',
                            type: 'number',
                          },
                          hvac_mode_setting: {
                            description:
                              'Desired [HVAC mode](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/hvac-mode) setting, such as `heat`, `cool`, `heat_cool`, or `off`.',
                            enum: ['off', 'heat', 'cool', 'heat_cool'],
                            type: 'string',
                          },
                          manual_override_allowed: {
                            deprecated: true,
                            description:
                              "Indicates whether a person at the thermostat can change the thermostat's settings.",
                            type: 'boolean',
                            'x-deprecated':
                              "Use 'thermostat_schedule.is_override_allowed'",
                          },
                          name: {
                            default: null,
                            description:
                              'User-friendly name to identify the climate preset.',
                            nullable: true,
                            type: 'string',
                          },
                        },
                        type: 'object',
                      },
                      default_climate_setting: {
                        deprecated: true,
                        properties: {
                          can_delete: {
                            description:
                              'Indicates whether this climate preset key can be deleted.',
                            type: 'boolean',
                          },
                          can_edit: {
                            description:
                              'Indicates whether this climate preset key can be edited.',
                            type: 'boolean',
                          },
                          climate_preset_key: {
                            description:
                              'Unique key to identify the climate preset.',
                            type: 'string',
                          },
                          cooling_set_point_celsius: {
                            description:
                              'Temperature to which the thermostat should cool (in °C). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
                            format: 'float',
                            type: 'number',
                          },
                          cooling_set_point_fahrenheit: {
                            description:
                              'Temperature to which the thermostat should cool (in °F).',
                            format: 'float',
                            type: 'number',
                          },
                          display_name: {
                            description: 'Display name for the climate preset.',
                            type: 'string',
                          },
                          fan_mode_setting: {
                            description:
                              'Desired fan mode setting, such as `on`, `auto`, or `circulate`.',
                            enum: ['auto', 'on', 'circulate'],
                            type: 'string',
                          },
                          heating_set_point_celsius: {
                            description:
                              'Temperature to which the thermostat should heat (in °C).',
                            format: 'float',
                            type: 'number',
                          },
                          heating_set_point_fahrenheit: {
                            description:
                              'Temperature to which the thermostat should heat (in °F).',
                            format: 'float',
                            type: 'number',
                          },
                          hvac_mode_setting: {
                            description:
                              'Desired [HVAC mode](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/hvac-mode) setting, such as `heat`, `cool`, `heat_cool`, or `off`.',
                            enum: ['off', 'heat', 'cool', 'heat_cool'],
                            type: 'string',
                          },
                          manual_override_allowed: {
                            deprecated: true,
                            description:
                              "Indicates whether a person at the thermostat can change the thermostat's settings.",
                            type: 'boolean',
                            'x-deprecated':
                              "Use 'thermostat_schedule.is_override_allowed'",
                          },
                          name: {
                            default: null,
                            description:
                              'User-friendly name to identify the climate preset.',
                            nullable: true,
                            type: 'string',
                          },
                        },
                        type: 'object',
                        'x-deprecated':
                          'use fallback_climate_preset_key to specify a fallback climate preset instead.',
                      },
                      fallback_climate_preset_key: {
                        default: null,
                        minLength: 1,
                        nullable: true,
                        type: 'string',
                      },
                      fan_mode_setting: {
                        deprecated: true,
                        enum: ['auto', 'on', 'circulate'],
                        type: 'string',
                        'x-deprecated':
                          'use current_climate_setting.fan_mode_setting instead.',
                      },
                      is_cooling: { type: 'boolean' },
                      is_fan_running: { type: 'boolean' },
                      is_heating: { type: 'boolean' },
                      is_temporary_manual_override_active: { type: 'boolean' },
                      max_cooling_set_point_celsius: {
                        format: 'float',
                        type: 'number',
                      },
                      max_cooling_set_point_fahrenheit: {
                        format: 'float',
                        type: 'number',
                      },
                      max_heating_set_point_celsius: {
                        format: 'float',
                        type: 'number',
                      },
                      max_heating_set_point_fahrenheit: {
                        format: 'float',
                        type: 'number',
                      },
                      min_cooling_set_point_celsius: {
                        format: 'float',
                        type: 'number',
                      },
                      min_cooling_set_point_fahrenheit: {
                        format: 'float',
                        type: 'number',
                      },
                      min_heating_cooling_delta_celsius: {
                        format: 'float',
                        type: 'number',
                      },
                      min_heating_cooling_delta_fahrenheit: {
                        format: 'float',
                        type: 'number',
                      },
                      min_heating_set_point_celsius: {
                        format: 'float',
                        type: 'number',
                      },
                      min_heating_set_point_fahrenheit: {
                        format: 'float',
                        type: 'number',
                      },
                      relative_humidity: {
                        format: 'float',
                        maximum: 1,
                        minimum: 0,
                        type: 'number',
                      },
                      temperature_celsius: { format: 'float', type: 'number' },
                      temperature_fahrenheit: {
                        format: 'float',
                        type: 'number',
                      },
                      temperature_threshold: {
                        properties: {
                          lower_limit_celsius: {
                            format: 'float',
                            nullable: true,
                            type: 'number',
                          },
                          lower_limit_fahrenheit: {
                            format: 'float',
                            nullable: true,
                            type: 'number',
                          },
                          upper_limit_celsius: {
                            format: 'float',
                            nullable: true,
                            type: 'number',
                          },
                          upper_limit_fahrenheit: {
                            format: 'float',
                            nullable: true,
                            type: 'number',
                          },
                        },
                        required: [
                          'lower_limit_celsius',
                          'lower_limit_fahrenheit',
                          'upper_limit_celsius',
                          'upper_limit_fahrenheit',
                        ],
                        type: 'object',
                      },
                    },
                    type: 'object',
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
              required: ['message', 'warning_code'],
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
          can_hvac_cool: { type: 'boolean' },
          can_hvac_heat: { type: 'boolean' },
          can_hvac_heat_cool: { type: 'boolean' },
          can_program_offline_access_codes: { type: 'boolean' },
          can_program_online_access_codes: { type: 'boolean' },
          can_remotely_lock: { type: 'boolean' },
          can_remotely_unlock: { type: 'boolean' },
          can_simulate_connection: { type: 'boolean' },
          can_simulate_disconnection: { type: 'boolean' },
          can_simulate_removal: { type: 'boolean' },
          can_turn_off_hvac: { type: 'boolean' },
          device_provider_name: {
            enum: [
              'dormakaba_community',
              'legic_connect',
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
              'salto_ks',
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
              'akiles',
              'assa_abloy_vostio',
              'assa_abloy_vostio_credential_service',
              'tado',
              'salto_space',
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
        description:
          'Represents an [enrollment automation](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system) within the [Seam mobile access solution](https://docs.seam.co/latest/capability-guides/mobile-access-in-development).',
        properties: {
          created_at: {
            description:
              'Date and time at which the enrollment automation was created.',
            format: 'date-time',
            type: 'string',
          },
          credential_manager_acs_system_id: {
            description:
              'ID of the associated [ACS system](https://docs.seam.co/latest/capability-guides/access-systems) that serves as the credential manager.',
            format: 'uuid',
            type: 'string',
          },
          enrollment_automation_id: {
            description: 'ID of the enrollment automation.',
            format: 'uuid',
            type: 'string',
          },
          user_identity_id: {
            description:
              'ID of the associated [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
            format: 'uuid',
            type: 'string',
          },
          workspace_id: {
            description:
              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the enrollment automation.',
            format: 'uuid',
            type: 'string',
          },
        },
        required: [
          'enrollment_automation_id',
          'credential_manager_acs_system_id',
          'user_identity_id',
          'created_at',
          'workspace_id',
        ],
        type: 'object',
      },
      event: {
        discriminator: { propertyName: 'event_type' },
        oneOf: [
          {
            description: 'An access code was created.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['access_code.created'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An access code was changed.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['access_code.changed'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An access code was natively scheduled on a device.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              code: {
                description: 'The code of the access code.',
                type: 'string',
                'x-title': 'Access Code',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.scheduled_on_device'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
              'code',
            ],
            type: 'object',
          },
          {
            description: 'An access code was set on a device.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              code: {
                description: 'The code of the access code.',
                type: 'string',
                'x-title': 'Access Code',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.set_on_device'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
              'code',
            ],
            type: 'object',
          },
          {
            description: 'An access code was removed from a device.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.removed_from_device'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'There was an unusually long delay in setting an access code on a device.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.delay_in_setting_on_device'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An access code failed to be set on a device.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.failed_to_set_on_device'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An access code was deleted.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              code: {
                description: 'The code of the access code.',
                nullable: true,
                type: 'string',
                'x-title': 'Access Code',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['access_code.deleted'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
              'code',
            ],
            type: 'object',
          },
          {
            description:
              'There was an unusually long delay in removing an access code from a device.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.delay_in_removing_from_device'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An access code failed to be removed from a device.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.failed_to_remove_from_device'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An access code was modified external to Seam.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.modified_external_to_seam'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An access code was deleted external to Seam.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.deleted_external_to_seam'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'A backup access code was pulled from the backup access code pool and set on a device.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              backup_access_code_id: { type: 'string' },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.backup_access_code_pulled'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
              'backup_access_code_id',
            ],
            type: 'object',
          },
          {
            description:
              'An unmanaged access code was successfully converted to a managed access code.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.unmanaged.converted_to_managed'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'An unmanaged access code failed to be converted to a managed access code.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.unmanaged.failed_to_convert_to_managed'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An unmanaged access code was created on a device.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.unmanaged.created'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An unmanaged access code was removed from a device.',
            properties: {
              access_code_id: {
                description: 'The ID of the access code.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Access Code ID',
              },
              connected_account_id: {
                description: 'The ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'The ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['access_code.unmanaged.removed'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'access_code_id',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An ACS system was connected.',
            properties: {
              acs_system_id: {
                description: 'ID of the ACS system.',
                format: 'uuid',
                type: 'string',
                'x-title': 'ACS System ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['acs_system.connected'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'acs_system_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An ACS system was added.',
            properties: {
              acs_system_id: {
                description: 'ID of the ACS system.',
                format: 'uuid',
                type: 'string',
                'x-title': 'ACS System ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['acs_system.added'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'acs_system_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An ACS system was disconnected.',
            properties: {
              acs_system_id: {
                description: 'ID of the ACS system.',
                format: 'uuid',
                type: 'string',
                'x-title': 'ACS System ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['acs_system.disconnected'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'acs_system_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An ACS credential was deleted.',
            properties: {
              acs_credential_id: { format: 'uuid', type: 'string' },
              acs_system_id: {
                description: 'ID of the ACS system.',
                format: 'uuid',
                type: 'string',
                'x-title': 'ACS System ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['acs_credential.deleted'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'acs_system_id',
              'acs_credential_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An ACS credential was issued.',
            properties: {
              acs_credential_id: { format: 'uuid', type: 'string' },
              acs_system_id: {
                description: 'ID of the ACS system.',
                format: 'uuid',
                type: 'string',
                'x-title': 'ACS System ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['acs_credential.issued'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'acs_system_id',
              'acs_credential_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An ACS user was deleted.',
            properties: {
              acs_system_id: {
                description: 'ID of the ACS system.',
                format: 'uuid',
                type: 'string',
                'x-title': 'ACS System ID',
              },
              acs_user_id: { format: 'uuid', type: 'string' },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['acs_user.deleted'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'acs_system_id',
              'acs_user_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An ACS encoder was added.',
            properties: {
              acs_encoder_id: {
                description: 'ID of the ACS encoder.',
                format: 'uuid',
                type: 'string',
              },
              acs_system_id: {
                description: 'ID of the ACS system.',
                format: 'uuid',
                type: 'string',
                'x-title': 'ACS System ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['acs_encoder.added'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'acs_system_id',
              'acs_encoder_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An ACS encoder was removed.',
            properties: {
              acs_encoder_id: {
                description: 'ID of the ACS encoder.',
                format: 'uuid',
                type: 'string',
              },
              acs_system_id: {
                description: 'ID of the ACS system.',
                format: 'uuid',
                type: 'string',
                'x-title': 'ACS System ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['acs_encoder.removed'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'acs_system_id',
              'acs_encoder_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A client session was deleted.',
            properties: {
              client_session_id: {
                description: 'ID of the client session.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Client Session ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['client_session.deleted'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'client_session_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'A connected account was connected for the first time, was reconnected after being disconnected.',
            properties: {
              connect_webview_id: {
                description: 'ID of the connect webview.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connect Webview ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['connected_account.connected'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'connected_account_id',
              'event_type',
              'connect_webview_id',
            ],
            type: 'object',
          },
          {
            description: 'A connected account was created.',
            properties: {
              connect_webview_id: {
                description: 'ID of the connect webview.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connect Webview ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['connected_account.created'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'connected_account_id',
              'event_type',
              'connect_webview_id',
            ],
            type: 'object',
          },
          {
            deprecated: true,
            description:
              'A connected account had a successful connect webview login.',
            properties: {
              connect_webview_id: {
                description: 'ID of the connect webview.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connect Webview ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['connected_account.successful_login'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'connected_account_id',
              'event_type',
              'connect_webview_id',
            ],
            type: 'object',
            'x-deprecated': 'Use `connect_webview.login_succeeded`.',
          },
          {
            description: 'A connected account was disconnected.',
            properties: {
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['connected_account.disconnected'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'A connected account completed the first sync with Seam and devices are now available.',
            properties: {
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['connected_account.completed_first_sync'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A connected account was deleted.',
            properties: {
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['connected_account.deleted'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'A connected account completed the first sync after reconnection with Seam and devices are now available.',
            properties: {
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: [
                  'connected_account.completed_first_sync_after_reconnection',
                ],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A lock door action attempt succeeded.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: {
                description: 'The type of action.',
                type: 'string',
                'x-title': 'Action Type',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['action_attempt.lock_door.succeeded'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              status: {
                description: 'The status of the action.',
                type: 'string',
                'x-title': 'Status',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'action_attempt_id',
              'action_type',
              'status',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A lock door action attempt failed.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: {
                description: 'The type of action.',
                type: 'string',
                'x-title': 'Action Type',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['action_attempt.lock_door.failed'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              status: {
                description: 'The status of the action.',
                type: 'string',
                'x-title': 'Status',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'action_attempt_id',
              'action_type',
              'status',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An unlock door action attempt succeeded.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: {
                description: 'The type of action.',
                type: 'string',
                'x-title': 'Action Type',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['action_attempt.unlock_door.succeeded'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              status: {
                description: 'The status of the action.',
                type: 'string',
                'x-title': 'Status',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'action_attempt_id',
              'action_type',
              'status',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An unlock door action attempt failed.',
            properties: {
              action_attempt_id: {
                description: 'The ID of the action attempt.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Action Attempt ID',
              },
              action_type: {
                description: 'The type of action.',
                type: 'string',
                'x-title': 'Action Type',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['action_attempt.unlock_door.failed'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              status: {
                description: 'The status of the action.',
                type: 'string',
                'x-title': 'Status',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'action_attempt_id',
              'action_type',
              'status',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A connect webview had a successful login.',
            properties: {
              connect_webview_id: {
                description: 'ID of the connect webview.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connect Webview ID',
              },
              connected_account_id: {
                description: 'ID of the connected account.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connected Account ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['connect_webview.login_succeeded'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'connect_webview_id',
              'event_type',
              'connected_account_id',
            ],
            type: 'object',
          },
          {
            description: 'A connect webview had a failed login.',
            properties: {
              connect_webview_id: {
                description: 'ID of the connect webview.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Connect Webview ID',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['connect_webview.login_failed'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'connect_webview_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A new device was connected to Seam.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['device.connected'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A device was added or reconnected to Seam.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['device.added'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'An [unmanaged device](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices) was successfully converted to a managed device.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.converted_to_unmanaged'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'A managed device was successfully converted to an [unmanaged device](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices).',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.unmanaged.converted_to_managed'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'An [unmanaged device](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices) was connected to Seam.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.unmanaged.connected'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A device was disconnected from Seam.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              error_code: {
                description:
                  'Error code associated with the disconnection event, if any.',
                enum: [
                  'account_disconnected',
                  'hub_disconnected',
                  'device_disconnected',
                ],
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['device.disconnected'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
              'error_code',
            ],
            type: 'object',
          },
          {
            description:
              'An [unmanaged device](https://docs.seam.co/latest/core-concepts/devices/managed-and-unmanaged-devices) was disconnected from Seam.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              error_code: {
                description:
                  'Error code associated with the disconnection event, if any.',
                enum: [
                  'account_disconnected',
                  'hub_disconnected',
                  'device_disconnected',
                ],
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.unmanaged.disconnected'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
              'error_code',
            ],
            type: 'object',
          },
          {
            description:
              'A device detected that it was tampered with, for example, opened or moved.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['device.tampered'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'A device battery level dropped below the low threshold.',
            properties: {
              battery_level: {
                description:
                  'Number in the range 0 to 1.0 indicating the amount of battery in the device, as reported by the device.',
                format: 'float',
                maximum: 1,
                minimum: 0,
                type: 'number',
              },
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['device.low_battery'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
              'battery_level',
            ],
            type: 'object',
          },
          {
            description:
              'A device battery status changed since the last `battery_status_changed` event.',
            properties: {
              battery_level: {
                description:
                  'Number in the range 0 to 1.0 indicating the amount of battery in the device, as reported by the device.',
                format: 'float',
                maximum: 1,
                minimum: 0,
                type: 'number',
              },
              battery_status: {
                description:
                  'Battery status of the device, calculated from the numeric `battery_level` value.',
                enum: ['critical', 'low', 'good', 'full'],
                type: 'string',
              },
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.battery_status_changed'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
              'battery_status',
              'battery_level',
            ],
            type: 'object',
          },
          {
            description:
              'A device was removed externally from the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['device.removed'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'A device was [deleted](https://docs.seam.co/latest/api/devices/delete).',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['device.deleted'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'Seam detected that a device is using a third-party integration that will interfere with Seam device management.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.third_party_integration_detected'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'Seam detected that a device is no longer using a third-party integration that was interfering with Seam device management.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.third_party_integration_no_longer_detected'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A Salto device activated privacy mode.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.salto.privacy_mode_activated'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A Salto device deactivated privacy mode.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.salto.privacy_mode_deactivated'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'Seam detected a flaky device connection.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.connection_became_flaky'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'Seam detected that a previously-flaky device connection stabilized.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.connection_stabilized'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'A third-party subscription is required to use all device features.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.error.subscription_required'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'A third-party subscription is active or no longer required to use all device features.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.error.subscription_required.resolved'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An accessory keypad was connected to a device.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.accessory_keypad_connected'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'An accessory keypad was disconnected from a device.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['device.accessory_keypad_disconnected'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'Extended periods of noise or noise exceeding a [threshold](https://docs.seam.co/latest/capability-guides/noise-sensors#what-is-a-threshold) were detected.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['noise_sensor.noise_threshold_triggered'],
                type: 'string',
              },
              minut_metadata: {
                additionalProperties: {},
                description: 'Metadata from Minut.',
                type: 'object',
                'x-title': 'Minut Metadata',
              },
              noise_level_decibels: {
                description: 'Detected noise level in decibels.',
                format: 'float',
                type: 'number',
              },
              noise_level_nrs: {
                description:
                  'Detected noise level in Noiseaware Noise Risk Score (NRS).',
                format: 'float',
                type: 'number',
              },
              noise_threshold_id: {
                description:
                  'ID of the [noise threshold](https://docs.seam.co/latest/capability-guides/noise-sensors#what-is-a-threshold) that was triggered.',
                format: 'uuid',
                type: 'string',
              },
              noise_threshold_name: {
                description:
                  'Name of the [noise threshold](https://docs.seam.co/latest/capability-guides/noise-sensors#what-is-a-threshold) that was triggered.',
                type: 'string',
              },
              noiseaware_metadata: {
                additionalProperties: {},
                description: 'Metadata from Noiseaware.',
                type: 'object',
                'x-title': 'Noiseaware Metadata',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A lock was locked.',
            properties: {
              access_code_id: {
                description:
                  'ID of the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used to lock the device.',
                format: 'uuid',
                type: 'string',
              },
              action_attempt_id: {
                description:
                  'ID of the [action attempt](https://docs.seam.co/latest/core-concepts/action-attempts) associated with the lock action.',
                format: 'uuid',
                type: 'string',
              },
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['lock.locked'], type: 'string' },
              method: {
                description:
                  'Method by which a lock device was locked. When the method is `keycode`, the `access_code_id` indicates the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used, if reported by the device.',
                enum: ['keycode', 'manual', 'automatic', 'unknown', 'seamapi'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
              'method',
            ],
            type: 'object',
          },
          {
            description: 'A lock was unlocked.',
            properties: {
              access_code_id: {
                description:
                  'ID of the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used to unlock the device.',
                format: 'uuid',
                type: 'string',
              },
              action_attempt_id: {
                description:
                  'ID of the [action attempt](https://docs.seam.co/latest/core-concepts/action-attempts) associated with the unlock action.',
                format: 'uuid',
                type: 'string',
              },
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['lock.unlocked'], type: 'string' },
              method: {
                description:
                  'Method by which a lock device was unlocked. When the method is `keycode`, the `access_code_id` indicates the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used, if reported by the device.',
                enum: ['keycode', 'manual', 'automatic', 'unknown', 'seamapi'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
              'method',
            ],
            type: 'object',
          },
          {
            description:
              'The lock denied access to a user after one or more consecutive invalid attempts to unlock the device.',
            properties: {
              access_code_id: {
                description:
                  'ID of the [access code](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes) that was used in the unlock attempts.',
                format: 'uuid',
                type: 'string',
              },
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['lock.access_denied'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description:
              'A thermostat [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) was activated.',
            properties: {
              climate_preset_key: {
                description:
                  'Key of the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) that was activated.',
                type: 'string',
              },
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['thermostat.climate_preset_activated'],
                type: 'string',
              },
              is_fallback_climate_preset: {
                description:
                  'Indicates whether the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) that was activated is the [fallback climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets/setting-the-fallback-climate-preset) for the thermostat.',
                type: 'boolean',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              thermostat_schedule_id: {
                description:
                  'ID of the [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) that prompted the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) to be activated.',
                format: 'uuid',
                nullable: true,
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
              'thermostat_schedule_id',
              'climate_preset_key',
              'is_fallback_climate_preset',
            ],
            type: 'object',
          },
          {
            description: 'A thermostat was adjusted manually.',
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              cooling_set_point_celsius: {
                description:
                  'Temperature to which the thermostat should cool (in °C). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
                format: 'float',
                type: 'number',
              },
              cooling_set_point_fahrenheit: {
                description:
                  'Temperature to which the thermostat should cool (in °F).',
                format: 'float',
                type: 'number',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['thermostat.manually_adjusted'],
                type: 'string',
              },
              fan_mode_setting: {
                description:
                  'Desired fan mode setting, such as `on`, `auto`, or `circulate`.',
                enum: ['auto', 'on', 'circulate'],
                type: 'string',
              },
              heating_set_point_celsius: {
                description:
                  'Temperature to which the thermostat should heat (in °C).',
                format: 'float',
                type: 'number',
              },
              heating_set_point_fahrenheit: {
                description:
                  'Temperature to which the thermostat should heat (in °F).',
                format: 'float',
                type: 'number',
              },
              hvac_mode_setting: {
                description:
                  'Desired [HVAC mode](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/hvac-mode) setting, such as `heat`, `cool`, `heat_cool`, or `off`.',
                enum: ['off', 'heat', 'cool', 'heat_cool'],
                type: 'string',
              },
              method: {
                description:
                  'Method used to adjust the thermostat manually. `seam` indicates that the Seam API, Seam CLI, or Seam Console was used to adjust the thermostat.',
                enum: ['seam', 'external'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
              'method',
            ],
            type: 'object',
          },
          {
            description:
              "A thermostat's temperature reading exceeded the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).",
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['thermostat.temperature_threshold_exceeded'],
                type: 'string',
              },
              lower_limit_celsius: {
                description:
                  'Lower temperature limit, in °C, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
                format: 'float',
                nullable: true,
                type: 'number',
              },
              lower_limit_fahrenheit: {
                description:
                  'Lower temperature limit, in °F, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
                format: 'float',
                nullable: true,
                type: 'number',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              temperature_celsius: {
                description: 'Temperature, in °C, reported by the thermostat.',
                format: 'float',
                type: 'number',
              },
              temperature_fahrenheit: {
                description: 'Temperature, in °F, reported by the thermostat.',
                format: 'float',
                type: 'number',
              },
              upper_limit_celsius: {
                description:
                  'Upper temperature limit, in °C, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
                format: 'float',
                nullable: true,
                type: 'number',
              },
              upper_limit_fahrenheit: {
                description:
                  'Upper temperature limit, in °F, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
                format: 'float',
                nullable: true,
                type: 'number',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
              'temperature_celsius',
              'temperature_fahrenheit',
              'upper_limit_celsius',
              'upper_limit_fahrenheit',
              'lower_limit_celsius',
              'lower_limit_fahrenheit',
            ],
            type: 'object',
          },
          {
            description:
              "A thermostat's temperature reading no longer exceeds the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).",
            properties: {
              connected_account_id: {
                description:
                  'ID of the [connected account](https://docs.seam.co/latest/core-concepts/connected-accounts).',
                format: 'uuid',
                type: 'string',
              },
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['thermostat.temperature_threshold_no_longer_exceeded'],
                type: 'string',
              },
              lower_limit_celsius: {
                description:
                  'Lower temperature limit, in °C, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
                format: 'float',
                nullable: true,
                type: 'number',
              },
              lower_limit_fahrenheit: {
                description:
                  'Lower temperature limit, in °F, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
                format: 'float',
                nullable: true,
                type: 'number',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              temperature_celsius: {
                description: 'Temperature, in °C, reported by the thermostat.',
                format: 'float',
                type: 'number',
              },
              temperature_fahrenheit: {
                description: 'Temperature, in °F, reported by the thermostat.',
                format: 'float',
                type: 'number',
              },
              upper_limit_celsius: {
                description:
                  'Upper temperature limit, in °C, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
                format: 'float',
                nullable: true,
                type: 'number',
              },
              upper_limit_fahrenheit: {
                description:
                  'Upper temperature limit, in °F, defined by the set [threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds).',
                format: 'float',
                nullable: true,
                type: 'number',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'connected_account_id',
              'event_type',
              'temperature_celsius',
              'temperature_fahrenheit',
              'upper_limit_celsius',
              'upper_limit_fahrenheit',
              'lower_limit_celsius',
              'lower_limit_fahrenheit',
            ],
            type: 'object',
          },
          {
            description: 'An enrollment automation was deleted.',
            properties: {
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              enrollment_automation_id: {
                description: 'ID of the enrollment automation.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Enrollment Automation ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: {
                enum: ['enrollment_automation.deleted'],
                type: 'string',
              },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'enrollment_automation_id',
              'event_type',
            ],
            type: 'object',
          },
          {
            description: 'A phone device was deactivated.',
            properties: {
              created_at: {
                description: 'Time at which the event was created.',
                format: 'date-time',
                type: 'string',
              },
              device_id: {
                description: 'ID of the device.',
                format: 'uuid',
                type: 'string',
                'x-title': 'Device ID',
              },
              event_id: {
                description: 'ID of the event.',
                format: 'uuid',
                type: 'string',
              },
              event_type: { enum: ['phone.deactivated'], type: 'string' },
              occurred_at: {
                description: 'Time when the event occurred.',
                format: 'date-time',
                type: 'string',
              },
              workspace_id: {
                description:
                  'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces).',
                format: 'uuid',
                type: 'string',
              },
            },
            required: [
              'event_id',
              'workspace_id',
              'created_at',
              'occurred_at',
              'device_id',
              'event_type',
            ],
            type: 'object',
          },
        ],
      },
      network: {
        properties: {
          created_at: { format: 'date-time', type: 'string' },
          display_name: { type: 'string' },
          network_id: { format: 'uuid', type: 'string' },
          workspace_id: { format: 'uuid', type: 'string' },
        },
        required: ['network_id', 'workspace_id', 'display_name', 'created_at'],
        type: 'object',
      },
      noise_threshold: {
        properties: {
          device_id: { format: 'uuid', type: 'string' },
          ends_daily_at: { type: 'string' },
          name: { type: 'string' },
          noise_threshold_decibels: { format: 'float', type: 'number' },
          noise_threshold_id: { format: 'uuid', type: 'string' },
          noise_threshold_nrs: { format: 'float', type: 'number' },
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
          can_hvac_cool: { type: 'boolean' },
          can_hvac_heat: { type: 'boolean' },
          can_hvac_heat_cool: { type: 'boolean' },
          can_program_offline_access_codes: { type: 'boolean' },
          can_program_online_access_codes: { type: 'boolean' },
          can_remotely_lock: { type: 'boolean' },
          can_remotely_unlock: { type: 'boolean' },
          can_simulate_connection: { type: 'boolean' },
          can_simulate_disconnection: { type: 'boolean' },
          can_simulate_removal: { type: 'boolean' },
          can_turn_off_hvac: { type: 'boolean' },
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
              oneOf: [
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_device_error: { enum: [true], type: 'boolean' },
                    message: { type: 'string' },
                  },
                  required: ['message', 'is_device_error', 'error_code'],
                  type: 'object',
                },
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_connected_account_error: {
                      enum: [true],
                      type: 'boolean',
                    },
                    message: { type: 'string' },
                  },
                  required: [
                    'message',
                    'is_connected_account_error',
                    'error_code',
                  ],
                  type: 'object',
                },
              ],
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
              required: ['message', 'warning_code'],
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
      thermostat_schedule: {
        description:
          'Represents a [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) that activates a configured [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) on a [thermostat](https://docs.seam.co/latest/capability-guides/thermostats) at a specified starting time and deactivates the climate preset at a specified ending time.',
        properties: {
          climate_preset_key: {
            description:
              'Key of the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) to use for the thermostat schedule.',
            type: 'string',
          },
          created_at: {
            description:
              'Date and time at which the thermostat schedule was created.',
            format: 'date-time',
            type: 'string',
          },
          device_id: {
            description: 'ID of the desired thermostat device.',
            format: 'uuid',
            type: 'string',
          },
          ends_at: {
            description:
              'Date and time at which the thermostat schedule ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
            format: 'date-time',
            type: 'string',
          },
          errors: {
            description:
              'Array of errors associated with the thermostat schedule. Each error object within the array contains two fields: `error_code` and `message`. `error_code` is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. `message` provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it.',
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
          max_override_period_minutes: {
            description:
              "Number of minutes for which a person at the thermostat can change the thermostat's settings after the activation of the scheduled climate preset. See also [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).",
            minimum: 0,
            type: 'integer',
          },
          name: {
            description:
              'User-friendly name to identify the thermostat schedule.',
            type: 'string',
          },
          starts_at: {
            description:
              'Date and time at which the thermostat schedule starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
            format: 'date-time',
            type: 'string',
          },
          thermostat_schedule_id: {
            description: 'ID of the thermostat schedule.',
            format: 'uuid',
            type: 'string',
          },
          unstable_is_override_allowed: {
            description:
              "Indicates whether a person at the thermostat can change the thermostat's settings.",
            type: 'boolean',
            'x-undocumented': 'Unstable',
          },
        },
        required: [
          'thermostat_schedule_id',
          'device_id',
          'climate_preset_key',
          'max_override_period_minutes',
          'starts_at',
          'ends_at',
          'created_at',
          'errors',
        ],
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
            items: {
              oneOf: [
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_access_code_error: { enum: [true], type: 'boolean' },
                    message: { type: 'string' },
                  },
                  required: ['message', 'is_access_code_error', 'error_code'],
                  type: 'object',
                },
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_device_error: { enum: [true], type: 'boolean' },
                    message: { type: 'string' },
                  },
                  required: ['message', 'is_device_error', 'error_code'],
                  type: 'object',
                },
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_connected_account_error: {
                      enum: [true],
                      type: 'boolean',
                    },
                    message: { type: 'string' },
                  },
                  required: [
                    'message',
                    'is_connected_account_error',
                    'error_code',
                  ],
                  type: 'object',
                },
              ],
            },
            type: 'array',
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
            items: {
              properties: {
                message: { type: 'string' },
                warning_code: { type: 'string' },
              },
              required: ['message', 'warning_code'],
              type: 'object',
            },
            type: 'array',
          },
        },
        required: [
          'type',
          'access_code_id',
          'device_id',
          'name',
          'code',
          'created_at',
          'errors',
          'warnings',
          'is_managed',
          'status',
        ],
        type: 'object',
      },
      unmanaged_device: {
        properties: {
          can_hvac_cool: { type: 'boolean' },
          can_hvac_heat: { type: 'boolean' },
          can_hvac_heat_cool: { type: 'boolean' },
          can_program_offline_access_codes: { type: 'boolean' },
          can_program_online_access_codes: { type: 'boolean' },
          can_remotely_lock: { type: 'boolean' },
          can_remotely_unlock: { type: 'boolean' },
          can_simulate_connection: { type: 'boolean' },
          can_simulate_disconnection: { type: 'boolean' },
          can_simulate_removal: { type: 'boolean' },
          can_turn_off_hvac: { type: 'boolean' },
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
                  'akiles_lock',
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
                  'tado_thermostat',
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
              oneOf: [
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_device_error: { enum: [true], type: 'boolean' },
                    message: { type: 'string' },
                  },
                  required: ['message', 'is_device_error', 'error_code'],
                  type: 'object',
                },
                {
                  properties: {
                    error_code: { type: 'string' },
                    is_connected_account_error: {
                      enum: [true],
                      type: 'boolean',
                    },
                    message: { type: 'string' },
                  },
                  required: [
                    'message',
                    'is_connected_account_error',
                    'error_code',
                  ],
                  type: 'object',
                },
              ],
            },
            type: 'array',
          },
          is_managed: { enum: [false], type: 'boolean' },
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
          properties: {
            properties: {
              accessory_keypad: {
                description: 'Represents the accessory keypad state.',
                properties: {
                  battery: {
                    description: 'Indicates if the keypad battery properties.',
                    properties: {
                      level: {
                        format: 'float',
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
              battery: {
                description:
                  'Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage.',
                properties: {
                  level: {
                    format: 'float',
                    maximum: 1,
                    minimum: 0,
                    type: 'number',
                  },
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
                format: 'float',
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
                    deprecated: true,
                    type: 'boolean',
                    'x-deprecated':
                      'use device.properties.model.can_connect_accessory_keypad',
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
                deprecated: true,
                description: 'Name of the device.',
                type: 'string',
                'x-deprecated': 'use device.display_name instead',
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
              required: ['message', 'warning_code'],
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
          'location',
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
      user_identity: {
        description:
          'Represents a [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity) associated with an application user account.',
        properties: {
          created_at: {
            description:
              'Date and time at which the user identity was created.',
            format: 'date-time',
            type: 'string',
          },
          display_name: { minLength: 1, type: 'string' },
          email_address: {
            description: 'Unique email address for the user identity.',
            format: 'email',
            nullable: true,
            type: 'string',
          },
          full_name: { minLength: 1, nullable: true, type: 'string' },
          phone_number: {
            description:
              'Unique phone number for the user identity in [E.164 format](https://www.itu.int/rec/T-REC-E.164/en) (for example, +15555550100).',
            nullable: true,
            type: 'string',
          },
          user_identity_id: {
            description: 'ID of the user identity.',
            format: 'uuid',
            type: 'string',
          },
          user_identity_key: {
            description: 'Unique key for the user identity.',
            minLength: 1,
            nullable: true,
            type: 'string',
          },
          workspace_id: {
            description:
              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the user identity.',
            format: 'uuid',
            type: 'string',
          },
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
          company_name: { type: 'string' },
          connect_partner_name: {
            deprecated: true,
            nullable: true,
            type: 'string',
            'x-deprecated': 'use company_name',
          },
          is_sandbox: { type: 'boolean' },
          name: { type: 'string' },
          workspace_id: { format: 'uuid', type: 'string' },
        },
        required: [
          'workspace_id',
          'name',
          'company_name',
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
      console_session_with_workspace: {
        bearerFormat: 'Console Session Token',
        scheme: 'bearer',
        type: 'http',
      },
      console_session_without_workspace: {
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
      publishable_key: {
        in: 'header',
        name: 'seam-publishable-key',
        type: 'apiKey',
      },
      seam_client_session_token: {
        in: 'header',
        name: 'seam-client-session-token',
        type: 'apiKey',
      },
      seam_workspace: { in: 'header', name: 'seam-workspace', type: 'apiKey' },
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
                    maxLength: 9,
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
                  preferred_code_length: { format: 'float', type: 'number' },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/create',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'access_code',
        'x-response-key': 'access_code',
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
                    maxLength: 9,
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
                  preferred_code_length: { format: 'float', type: 'number' },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/create_multiple',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'create_multiple',
        'x-fern-sdk-return-value': 'access_codes',
        'x-response-key': 'access_codes',
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
                    maxLength: 9,
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
                  preferred_code_length: { format: 'float', type: 'number' },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/create_multiple',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
        'x-response-key': 'access_codes',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/delete',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/generate_code',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'generate_code',
        'x-fern-sdk-return-value': 'generated_code',
        'x-response-key': 'generated_code',
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
          { console_session_with_workspace: [] },
          { client_session: [] },
        ],
        summary: '/access_codes/get',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'access_code',
        'x-response-key': 'access_code',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/list',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'access_codes',
        'x-response-key': 'access_codes',
      },
    },
    '/access_codes/pull_backup_access_code': {
      post: {
        description:
          'Retrieves a backup access code for an access code. See also [Managing Backup Access Codes](https://docs.seam.co/latest/capability-guides/smart-locks/access-codes/backup-access-codes).',
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
                    access_code: { $ref: '#/components/schemas/access_code' },
                    backup_access_code: {
                      $ref: '#/components/schemas/access_code',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['backup_access_code', 'access_code', 'ok'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/pull_backup_access_code',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'pull_backup_access_code',
        'x-fern-sdk-return-value': 'access_code',
        'x-response-key': 'access_code',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/simulate/create_unmanaged_access_code',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'simulate'],
        'x-fern-sdk-method-name': 'create_unmanaged_access_code',
        'x-fern-sdk-return-value': 'access_code',
        'x-response-key': 'access_code',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/convert_to_managed',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/convert_to_managed',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'convert_to_managed',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/delete',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/get',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'access_code',
        'x-response-key': 'access_code',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/list',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'access_codes',
        'x-response-key': 'access_codes',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/update',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/unmanaged/update',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
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
                    maxLength: 9,
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
                  preferred_code_length: { format: 'float', type: 'number' },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/update',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
        'x-response-key': null,
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
                    maxLength: 9,
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
                  preferred_code_length: { format: 'float', type: 'number' },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/update',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
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
                    maxLength: 9,
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
                  preferred_code_length: { format: 'float', type: 'number' },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/update',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
        'x-response-key': null,
      },
    },
    '/access_codes/update_multiple': {
      patch: {
        operationId: 'accessCodesUpdateMultiplePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  common_code_key: { type: 'string' },
                  ends_at: { type: 'string' },
                  name: { type: 'string' },
                  starts_at: { type: 'string' },
                },
                required: ['common_code_key'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/update_multiple',
        tags: ['/access_codes'],
        'x-fern-ignore': true,
        'x-response-key': null,
      },
      post: {
        operationId: 'accessCodesUpdateMultiplePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  common_code_key: { type: 'string' },
                  ends_at: { type: 'string' },
                  name: { type: 'string' },
                  starts_at: { type: 'string' },
                },
                required: ['common_code_key'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/access_codes/update_multiple',
        tags: ['/access_codes'],
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'update_multiple',
        'x-response-key': null,
      },
    },
    '/acs/access_groups/add_user': {
      post: {
        description:
          'Adds a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) to a specified [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsAccessGroupsAddUserPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: {
                    description: 'ID of the desired access group.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description: 'ID of the desired user.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/add_user',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'add_user',
        'x-response-key': null,
        'x-title': 'Add an ACS User to an Access Group',
      },
      put: {
        description:
          'Adds a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) to a specified [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsAccessGroupsAddUserPut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: {
                    description: 'ID of the desired access group.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description: 'ID of the desired user.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/add_user',
        tags: ['/acs'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Add an ACS User to an Access Group',
      },
    },
    '/acs/access_groups/get': {
      post: {
        description:
          'Returns a specified [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsAccessGroupsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: {
                    description: 'ID of the desired access group.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'acs_access_group',
        'x-response-key': 'acs_access_group',
        'x-title': 'Get an Access Group',
      },
    },
    '/acs/access_groups/list': {
      post: {
        description:
          'Returns a list of all [access groups](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsAccessGroupsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_system_id: {
                    description:
                      'ID of the access control system for which you want to retrieve all access groups.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description:
                      'ID of the user for which you want to retrieve all access groups.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'acs_access_groups',
        'x-response-key': 'acs_access_groups',
        'x-title': 'List Access Groups',
      },
    },
    '/acs/access_groups/list_accessible_entrances': {
      post: {
        description:
          'Returns a list of all accessible entrances for a specified [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsAccessGroupsListAccessibleEntrancesPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: {
                    description:
                      'ID of the access group for which you want to retrieve all accessible entrances.',
                    format: 'uuid',
                    type: 'string',
                  },
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
                    acs_entrances: {
                      items: { $ref: '#/components/schemas/acs_entrance' },
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/access_groups/list_accessible_entrances',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'list_accessible_entrances',
        'x-fern-sdk-return-value': 'acs_entrances',
        'x-response-key': 'acs_entrances',
        'x-title': 'List Entrances Accessible to an Access Group',
      },
    },
    '/acs/access_groups/list_users': {
      post: {
        description:
          'Returns a list of all [ACS users](https://docs.seam.co/latest/capability-guides/access-systems/user-management) in an [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsAccessGroupsListUsersPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: {
                    description:
                      'ID of the access group for which you want to retrieve all users.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/list_users',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'list_users',
        'x-fern-sdk-return-value': 'acs_users',
        'x-response-key': 'acs_users',
        'x-title': 'List ACS Users in an Access Group',
      },
    },
    '/acs/access_groups/remove_user': {
      post: {
        description:
          'Removes a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) from a specified [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsAccessGroupsRemoveUserPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: {
                    description: 'ID of the desired access group.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description: 'ID of the desired user.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/remove_user',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups'],
        'x-fern-sdk-method-name': 'remove_user',
        'x-response-key': null,
        'x-title': 'Remove an ACS User from an Access Group',
      },
    },
    '/acs/access_groups/unmanaged/get': {
      post: {
        description:
          'Returns a specified unmanaged [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsAccessGroupsUnmanagedGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: {
                    description: 'ID of the desired unmanaged access group.',
                    format: 'uuid',
                    type: 'string',
                  },
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
                      properties: {
                        access_group_type: {
                          deprecated: true,
                          enum: [
                            'pti_unit',
                            'pti_access_level',
                            'salto_ks_access_group',
                            'brivo_group',
                            'salto_space_group',
                            'dormakaba_community_access_group',
                          ],
                          type: 'string',
                          'x-deprecated': 'Use `external_type`.',
                        },
                        access_group_type_display_name: {
                          deprecated: true,
                          type: 'string',
                          'x-deprecated': 'Use `external_type_display_name`.',
                        },
                        acs_access_group_id: {
                          description: 'ID of the access group.',
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_system_id: {
                          description:
                            'ID of the access control system that contains the access group.',
                          format: 'uuid',
                          type: 'string',
                        },
                        created_at: {
                          description:
                            'Date and time at which the access group was created.',
                          format: 'date-time',
                          type: 'string',
                        },
                        display_name: { type: 'string' },
                        external_type: {
                          description:
                            'Brand-specific terminology for the access group type.',
                          enum: [
                            'pti_unit',
                            'pti_access_level',
                            'salto_ks_access_group',
                            'brivo_group',
                            'salto_space_group',
                            'dormakaba_community_access_group',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: {
                          description:
                            'Display name that corresponds to the brand-specific terminology for the access group type.',
                          type: 'string',
                        },
                        is_managed: { enum: [false], type: 'boolean' },
                        name: {
                          description: 'Name of the access group.',
                          type: 'string',
                        },
                        warnings: {
                          description:
                            'Warnings associated with the `acs_access_group`.',
                          items: {
                            description:
                              'Warning associated with the `acs_access_group`.',
                            properties: {
                              created_at: {
                                description:
                                  'Date and time at which Seam created the warning.',
                                format: 'date-time',
                                type: 'string',
                              },
                              message: {
                                description:
                                  'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                type: 'string',
                              },
                              warning_code: {
                                description:
                                  'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                enum: ['unknown_issue_with_acs_access_group'],
                                type: 'string',
                              },
                            },
                            required: ['created_at', 'message', 'warning_code'],
                            type: 'object',
                          },
                          type: 'array',
                        },
                        workspace_id: {
                          description:
                            'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the access group.',
                          format: 'uuid',
                          type: 'string',
                        },
                      },
                      required: [
                        'acs_access_group_id',
                        'acs_system_id',
                        'workspace_id',
                        'name',
                        'access_group_type',
                        'access_group_type_display_name',
                        'display_name',
                        'external_type',
                        'external_type_display_name',
                        'created_at',
                        'warnings',
                        'is_managed',
                      ],
                      type: 'object',
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/unmanaged/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups', 'unmanaged'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'acs_access_group',
        'x-response-key': 'acs_access_group',
        'x-undocumented':
          'No unmanaged access groups are currently implemented.',
      },
    },
    '/acs/access_groups/unmanaged/list': {
      post: {
        description:
          'Returns a list of all unmanaged [access groups](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsAccessGroupsUnmanagedListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_system_id: {
                    description:
                      'ID of the access control system for which you want to retrieve all unmanaged access groups.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description:
                      'ID of the user for which you want to retrieve all unmanaged access groups.',
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
                    acs_access_groups: {
                      items: {
                        properties: {
                          access_group_type: {
                            deprecated: true,
                            enum: [
                              'pti_unit',
                              'pti_access_level',
                              'salto_ks_access_group',
                              'brivo_group',
                              'salto_space_group',
                              'dormakaba_community_access_group',
                            ],
                            type: 'string',
                            'x-deprecated': 'Use `external_type`.',
                          },
                          access_group_type_display_name: {
                            deprecated: true,
                            type: 'string',
                            'x-deprecated': 'Use `external_type_display_name`.',
                          },
                          acs_access_group_id: {
                            description: 'ID of the access group.',
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_system_id: {
                            description:
                              'ID of the access control system that contains the access group.',
                            format: 'uuid',
                            type: 'string',
                          },
                          created_at: {
                            description:
                              'Date and time at which the access group was created.',
                            format: 'date-time',
                            type: 'string',
                          },
                          display_name: { type: 'string' },
                          external_type: {
                            description:
                              'Brand-specific terminology for the access group type.',
                            enum: [
                              'pti_unit',
                              'pti_access_level',
                              'salto_ks_access_group',
                              'brivo_group',
                              'salto_space_group',
                              'dormakaba_community_access_group',
                            ],
                            type: 'string',
                          },
                          external_type_display_name: {
                            description:
                              'Display name that corresponds to the brand-specific terminology for the access group type.',
                            type: 'string',
                          },
                          is_managed: { enum: [false], type: 'boolean' },
                          name: {
                            description: 'Name of the access group.',
                            type: 'string',
                          },
                          warnings: {
                            description:
                              'Warnings associated with the `acs_access_group`.',
                            items: {
                              description:
                                'Warning associated with the `acs_access_group`.',
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the warning.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                                warning_code: {
                                  description:
                                    'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                  enum: ['unknown_issue_with_acs_access_group'],
                                  type: 'string',
                                },
                              },
                              required: [
                                'created_at',
                                'message',
                                'warning_code',
                              ],
                              type: 'object',
                            },
                            type: 'array',
                          },
                          workspace_id: {
                            description:
                              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the access group.',
                            format: 'uuid',
                            type: 'string',
                          },
                        },
                        required: [
                          'acs_access_group_id',
                          'acs_system_id',
                          'workspace_id',
                          'name',
                          'access_group_type',
                          'access_group_type_display_name',
                          'display_name',
                          'external_type',
                          'external_type_display_name',
                          'created_at',
                          'warnings',
                          'is_managed',
                        ],
                        type: 'object',
                      },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/access_groups/unmanaged/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'access_groups', 'unmanaged'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'acs_access_groups',
        'x-response-key': 'acs_access_groups',
        'x-undocumented':
          'No unmanaged access groups are currently implemented.',
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
                        $ref: '#/components/schemas/acs_credential_pool',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credential_pools/list',
        tags: ['/acs'],
        'x-deprecated':
          'Use `/user_identities/enrollment_automations/list` instead.',
        'x-fern-sdk-group-name': ['acs', 'credential_pools'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'acs_credential_pools',
        'x-response-key': 'acs_credential_pools',
        'x-undocumented': 'Replaced by enrollment automations.',
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
                      $ref: '#/components/schemas/acs_credential_provisioning_automation',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credential_provisioning_automations/launch',
        tags: ['/acs'],
        'x-deprecated':
          'Use `/user_identities/enrollment_automations/launch` instead.',
        'x-fern-sdk-group-name': ['acs', 'credential_provisioning_automations'],
        'x-fern-sdk-method-name': 'launch',
        'x-fern-sdk-return-value': 'acs_credential_provisioning_automation',
        'x-response-key': 'acs_credential_provisioning_automation',
        'x-undocumented': 'Replaced by enrollment automations.',
      },
    },
    '/acs/credentials/assign': {
      patch: {
        description:
          'Assigns a specified [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) to a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsCredentialsAssignPatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description: 'ID of the desired credential.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description: 'ID of the desired user.',
                    format: 'uuid',
                    type: 'string',
                  },
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
                      $ref: '#/components/schemas/acs_credential',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/assign',
        tags: ['/acs'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Assign a Credential to an ACS User',
      },
      post: {
        description:
          'Assigns a specified [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) to a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsCredentialsAssignPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description: 'ID of the desired credential.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description: 'ID of the desired user.',
                    format: 'uuid',
                    type: 'string',
                  },
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
                      $ref: '#/components/schemas/acs_credential',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/assign',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'assign',
        'x-response-key': null,
        'x-title': 'Assign a Credential to an ACS User',
      },
    },
    '/acs/credentials/create': {
      post: {
        description:
          'Creates a new [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) for a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsCredentialsCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_method: {
                    description:
                      'Access method for the new credential. Supported values: `code`, `card`, `mobile_key`.',
                    enum: ['code', 'card', 'mobile_key'],
                    type: 'string',
                  },
                  acs_user_id: {
                    description:
                      'ID of the ACS user to whom the new credential belongs.',
                    format: 'uuid',
                    type: 'string',
                  },
                  allowed_acs_entrance_ids: {
                    default: [],
                    description:
                      'Set of IDs of the [entrances](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details) for which the new credential grants access.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  assa_abloy_vostio_metadata: {
                    description:
                      'Vostio-specific metadata for the new credential.',
                    properties: {
                      join_all_guest_acs_entrances: { type: 'boolean' },
                      override_all_guest_acs_entrances: { type: 'boolean' },
                      override_guest_acs_entrance_ids: {
                        items: { format: 'uuid', type: 'string' },
                        type: 'array',
                      },
                    },
                    type: 'object',
                  },
                  code: {
                    description:
                      'Access (PIN) code for the new credential. There may be manufacturer-specific code restrictions. For details, see the applicable [device or system integration guide](https://docs.seam.co/latest/device-and-system-integration-guides/overview).',
                    pattern: '^\\d+$',
                    type: 'string',
                  },
                  credential_manager_acs_system_id: {
                    description:
                      'ACS system ID of the credential manager for the new credential.',
                    format: 'uuid',
                    type: 'string',
                  },
                  ends_at: {
                    description:
                      'Date and time at which the validity of the new credential ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
                    format: 'date-time',
                    type: 'string',
                  },
                  is_multi_phone_sync_credential: {
                    default: false,
                    description:
                      'Indicates whether the new credential is a [multi-phone sync credential](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#what-are-multi-phone-sync-credentials).',
                    type: 'boolean',
                  },
                  salto_space_metadata: {
                    description:
                      'Salto Space-specific metadata for the new credential.',
                    properties: {
                      assign_new_key: { type: 'boolean' },
                      update_current_key: { type: 'boolean' },
                    },
                    type: 'object',
                  },
                  starts_at: {
                    description:
                      'Date and time at which the validity of the new credential starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                    format: 'date-time',
                    type: 'string',
                  },
                  visionline_metadata: {
                    description:
                      'Visionline-specific metadata for the new credential.',
                    properties: {
                      assa_abloy_credential_service_mobile_endpoint_id: {
                        deprecated: true,
                        format: 'uuid',
                        type: 'string',
                        'x-deprecated':
                          'Read-only endpoint references moved to `endpoint`.',
                        'x-undocumented':
                          'Deprecated. Read-only endpoint references moved to `endpoint`.',
                      },
                      auto_join: { type: 'boolean' },
                      card_format: {
                        enum: ['TLCode', 'rfid48'],
                        type: 'string',
                      },
                      card_function_type: {
                        default: 'guest',
                        enum: ['guest', 'staff'],
                        type: 'string',
                      },
                      is_override_key: {
                        deprecated: true,
                        type: 'boolean',
                        'x-deprecated': 'Use `override` instead.',
                        'x-undocumented': 'Use `override` instead.',
                      },
                      joiner_acs_credential_ids: {
                        items: { format: 'uuid', type: 'string' },
                        type: 'array',
                      },
                      override: { type: 'boolean' },
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
                      $ref: '#/components/schemas/acs_credential',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/create',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'acs_credential',
        'x-response-key': 'acs_credential',
        'x-title': 'Create a Credential for an ACS User',
      },
    },
    '/acs/credentials/create_offline_code': {
      post: {
        description:
          'Creates a new offline [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) for a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsCredentialsCreateOfflineCodePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: {
                    description:
                      'ID of the ACS user to whom the new credential belongs.',
                    format: 'uuid',
                    type: 'string',
                  },
                  allowed_acs_entrance_id: {
                    description:
                      'IDs of the [`acs_entrance`s](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details) for which the new credential grants access.',
                    format: 'uuid',
                    type: 'string',
                  },
                  ends_at: {
                    description:
                      'Date and time at which the validity of the new credential ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
                    format: 'date-time',
                    type: 'string',
                  },
                  is_one_time_use: {
                    default: false,
                    description:
                      'Indicates whether the code is one-time-use or reusable.',
                    type: 'boolean',
                  },
                  starts_at: {
                    description:
                      'Date and time at which the validity of the new credential starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                    format: 'date-time',
                    type: 'string',
                  },
                },
                required: ['acs_user_id', 'allowed_acs_entrance_id'],
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
                      $ref: '#/components/schemas/acs_credential',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/create_offline_code',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'create_offline_code',
        'x-fern-sdk-return-value': 'acs_credential',
        'x-response-key': 'acs_credential',
        'x-title': 'Create an Offline Credential for an ACS User',
        'x-undocumented': 'Unreleased.',
      },
    },
    '/acs/credentials/delete': {
      post: {
        description:
          'Deletes a specified [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        operationId: 'acsCredentialsDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description: 'ID of the desired credential.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/delete',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
        'x-title': 'Delete a Credential',
      },
    },
    '/acs/credentials/get': {
      post: {
        description:
          'Returns a specified [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        operationId: 'acsCredentialsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description: 'ID of the desired credential.',
                    format: 'uuid',
                    type: 'string',
                  },
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
                      $ref: '#/components/schemas/acs_credential',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'acs_credential',
        'x-response-key': 'acs_credential',
        'x-title': 'Get a Credential',
      },
    },
    '/acs/credentials/list': {
      post: {
        description:
          'Returns a list of all [credentials](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
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
                          acs_user_id: {
                            description:
                              'ID of the ACS user for which you want to retrieve all credentials.',
                            format: 'uuid',
                            type: 'string',
                          },
                        },
                        required: ['acs_user_id'],
                        type: 'object',
                      },
                      {
                        properties: {
                          acs_system_id: {
                            description:
                              'ID of the access control system for which you want to retrieve all credentials.',
                            format: 'uuid',
                            type: 'string',
                          },
                        },
                        required: ['acs_system_id'],
                        type: 'object',
                      },
                      {
                        properties: {
                          acs_system_id: {
                            description:
                              'ID of the access control system for which you want to retrieve all credentials.',
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_user_id: {
                            description:
                              'ID of the ACS user for which you want to retrieve all credentials.',
                            format: 'uuid',
                            type: 'string',
                          },
                        },
                        required: ['acs_user_id', 'acs_system_id'],
                        type: 'object',
                      },
                      {
                        properties: {
                          user_identity_id: {
                            description:
                              'ID of the user identity for which you want to retrieve all credentials.',
                            format: 'uuid',
                            type: 'string',
                          },
                        },
                        required: ['user_identity_id'],
                        type: 'object',
                      },
                    ],
                  },
                  {
                    properties: {
                      created_before: {
                        description:
                          'Date and time, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format, before which events to return were created.',
                        format: 'date-time',
                        type: 'string',
                      },
                      is_multi_phone_sync_credential: {
                        description:
                          'Indicates whether you want to retrieve only multi-phone sync credentials or non-multi-phone sync credentials.',
                        type: 'boolean',
                      },
                      limit: {
                        default: 500,
                        description: 'Number of credentials to return.',
                        format: 'float',
                        type: 'number',
                      },
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
                      items: { $ref: '#/components/schemas/acs_credential' },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/credentials/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'acs_credentials',
        'x-response-key': 'acs_credentials',
        'x-title': 'List Credentials',
      },
    },
    '/acs/credentials/list_accessible_entrances': {
      post: {
        description:
          'Returns a list of all [entrances](https://docs.seam.co/latest/api/acs/entrances) to which a [credential](https://docs.seam.co/latest/api/acs/credentials) grants access.',
        operationId: 'acsCredentialsListAccessibleEntrancesPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description:
                      'ID of the credential for which you want to retrieve all entrances to which this credential grants access.',
                    format: 'uuid',
                    type: 'string',
                  },
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
                    acs_entrances: {
                      items: { $ref: '#/components/schemas/acs_entrance' },
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/credentials/list_accessible_entrances',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'list_accessible_entrances',
        'x-fern-sdk-return-value': 'acs_entrances',
        'x-response-key': 'acs_entrances',
        'x-title': 'List Accessible Entrances',
      },
    },
    '/acs/credentials/unassign': {
      patch: {
        description:
          'Unassigns a specified [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) from a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsCredentialsUnassignPatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description: 'ID of the desired credential.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description: 'ID of the desired user.',
                    format: 'uuid',
                    type: 'string',
                  },
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
                      $ref: '#/components/schemas/acs_credential',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/unassign',
        tags: ['/acs'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Unassign a Credential from an ACS User',
      },
      post: {
        description:
          'Unassigns a specified [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) from a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsCredentialsUnassignPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description: 'ID of the desired credential.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description: 'ID of the desired user.',
                    format: 'uuid',
                    type: 'string',
                  },
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
                      $ref: '#/components/schemas/acs_credential',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/unassign',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'unassign',
        'x-response-key': null,
        'x-title': 'Unassign a Credential from an ACS User',
      },
    },
    '/acs/credentials/unmanaged/get': {
      post: {
        description:
          'Returns a specified unmanaged [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        operationId: 'acsCredentialsUnmanagedGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description: 'ID of the desired unmanaged credential.',
                    format: 'uuid',
                    type: 'string',
                  },
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
                      description:
                        'Means by which a user gains access at an entrance.\nThe `unmanaged_acs_credential` object, which is not managed by Seam, represents a credential that provides an ACS user access within an access control system. For each acs_credential object, you define the access method. You can also specify additional properties, such as a code.',
                      properties: {
                        access_method: {
                          description:
                            'Access method for the credential. Supported values: `code`, `card`, `mobile_key`.',
                          enum: ['code', 'card', 'mobile_key'],
                          type: 'string',
                        },
                        acs_credential_id: {
                          description: 'ID of the credential.',
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_credential_pool_id: {
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_system_id: {
                          description:
                            'ID of the access control system that contains the credential.',
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_user_id: {
                          description:
                            'ID of the ACS user to whom the credential belongs.',
                          format: 'uuid',
                          type: 'string',
                        },
                        card_number: { nullable: true, type: 'string' },
                        code: {
                          description: 'Access (PIN) code for the credential.',
                          nullable: true,
                          type: 'string',
                        },
                        created_at: {
                          description:
                            'Date and time at which the credential was created.',
                          format: 'date-time',
                          type: 'string',
                        },
                        display_name: {
                          description:
                            'Display name that corresponds to the credential type.',
                          minLength: 1,
                          type: 'string',
                        },
                        ends_at: {
                          description:
                            'Date and time at which the credential validity ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
                          type: 'string',
                        },
                        errors: {
                          description:
                            'Errors associated with the `acs_credential`.',
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
                          description:
                            'Brand-specific terminology for the credential type. Supported values: `pti_card`, `brivo_credential`, `hid_credential`, `visionline_card`.',
                          enum: [
                            'pti_card',
                            'brivo_credential',
                            'hid_credential',
                            'visionline_card',
                            'salto_ks_credential',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: {
                          description:
                            'Display name that corresponds to the brand-specific terminology for the credential type.',
                          type: 'string',
                        },
                        is_issued: { type: 'boolean' },
                        is_latest_desired_state_synced_with_provider: {
                          description:
                            'Indicates whether the latest state of the credential has been synced from Seam to the provider.',
                          nullable: true,
                          type: 'boolean',
                        },
                        is_managed: { enum: [false], type: 'boolean' },
                        is_multi_phone_sync_credential: {
                          description:
                            'Indicates whether the credential is a [multi-phone sync credential](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#what-are-multi-phone-sync-credentials).',
                          type: 'boolean',
                        },
                        is_one_time_use: {
                          description:
                            'Indicates whether the credential can only be used once. If "true," the code becomes invalid after the first use.',
                          type: 'boolean',
                        },
                        issued_at: {
                          format: 'date-time',
                          nullable: true,
                          type: 'string',
                        },
                        latest_desired_state_synced_with_provider_at: {
                          description:
                            'Date and time at which the state of the credential was most recently synced from Seam to the provider.',
                          format: 'date-time',
                          nullable: true,
                          type: 'string',
                        },
                        parent_acs_credential_id: {
                          description: 'ID of the parent credential.',
                          format: 'uuid',
                          type: 'string',
                        },
                        starts_at: {
                          description:
                            'Date and time at which the credential validity starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                          type: 'string',
                        },
                        visionline_metadata: {
                          description:
                            'Visionline-specific metadata for the credential.',
                          properties: {
                            auto_join: { type: 'boolean' },
                            card_function_type: {
                              enum: ['guest', 'staff'],
                              type: 'string',
                            },
                            card_id: { type: 'string' },
                            common_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            credential_id: { type: 'string' },
                            guest_acs_entrance_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                            is_valid: { type: 'boolean' },
                            joiner_acs_credential_ids: {
                              items: { format: 'uuid', type: 'string' },
                              type: 'array',
                            },
                          },
                          required: ['card_function_type'],
                          type: 'object',
                        },
                        warnings: {
                          description:
                            'Warnings associated with the `acs_credential`.',
                          items: {
                            description:
                              'Warning associated with the `acs_credential`.',
                            oneOf: [
                              {
                                description:
                                  'Indicates that the credential is waiting to be issued.',
                                properties: {
                                  created_at: {
                                    description:
                                      'Date and time at which Seam created the warning.',
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  message: {
                                    description:
                                      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                    type: 'string',
                                  },
                                  warning_code: {
                                    description:
                                      'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                    enum: ['waiting_to_be_issued'],
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'warning_code',
                                ],
                                type: 'object',
                              },
                              {
                                description:
                                  "Indicates that the schedule of one of the credential's children was modified externally.",
                                properties: {
                                  created_at: {
                                    description:
                                      'Date and time at which Seam created the warning.',
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  message: {
                                    description:
                                      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                    type: 'string',
                                  },
                                  warning_code: {
                                    description:
                                      'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                    enum: ['schedule_externally_modified'],
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'warning_code',
                                ],
                                type: 'object',
                              },
                              {
                                description:
                                  'Indicates that the schedule of this credential was modified to avoid creating a credential with a start date in the past.',
                                properties: {
                                  created_at: {
                                    description:
                                      'Date and time at which Seam created the warning.',
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  message: {
                                    description:
                                      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                    type: 'string',
                                  },
                                  warning_code: {
                                    description:
                                      'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                    enum: ['schedule_modified'],
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'warning_code',
                                ],
                                type: 'object',
                              },
                              {
                                description:
                                  'Indicates that this credential is being deleted.',
                                properties: {
                                  created_at: {
                                    description:
                                      'Date and time at which Seam created the warning.',
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  message: {
                                    description:
                                      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                    type: 'string',
                                  },
                                  warning_code: {
                                    description:
                                      'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                    enum: ['being_deleted'],
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'warning_code',
                                ],
                                type: 'object',
                              },
                              {
                                description:
                                  'An unknown issue occurred while syncing the state of this credential with the provider. This issue may affect the proper functioning of this credential.',
                                properties: {
                                  created_at: {
                                    description:
                                      'Date and time at which Seam created the warning.',
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  message: {
                                    description:
                                      'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                    type: 'string',
                                  },
                                  warning_code: {
                                    description:
                                      'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                    enum: ['unknown_issue_with_acs_credential'],
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'warning_code',
                                ],
                                type: 'object',
                              },
                            ],
                          },
                          type: 'array',
                        },
                        workspace_id: {
                          description:
                            'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the credential.',
                          format: 'uuid',
                          type: 'string',
                        },
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
                        'is_managed',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/unmanaged/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials', 'unmanaged'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'acs_credential',
        'x-response-key': 'acs_credential',
        'x-title': 'Get an Unmanaged Credential',
        'x-undocumented': 'No unmanaged credentials are currently implemented.',
      },
    },
    '/acs/credentials/unmanaged/list': {
      post: {
        description:
          'Returns a list of all unmanaged [credentials](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        operationId: 'acsCredentialsUnmanagedListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    properties: {
                      acs_user_id: {
                        description:
                          'ID of the ACS user for which you want to retrieve all credentials.',
                        format: 'uuid',
                        type: 'string',
                      },
                    },
                    required: ['acs_user_id'],
                    type: 'object',
                  },
                  {
                    properties: {
                      acs_system_id: {
                        description:
                          'ID of the access control system for which you want to retrieve all credentials.',
                        format: 'uuid',
                        type: 'string',
                      },
                    },
                    required: ['acs_system_id'],
                    type: 'object',
                  },
                  {
                    properties: {
                      acs_system_id: {
                        description:
                          'ID of the access control system for which you want to retrieve all credentials.',
                        format: 'uuid',
                        type: 'string',
                      },
                      acs_user_id: {
                        description:
                          'ID of the ACS user for which you want to retrieve all credentials.',
                        format: 'uuid',
                        type: 'string',
                      },
                    },
                    required: ['acs_user_id', 'acs_system_id'],
                    type: 'object',
                  },
                  {
                    properties: {
                      user_identity_id: {
                        description:
                          'ID of the user identity for which you want to retrieve all credentials.',
                        format: 'uuid',
                        type: 'string',
                      },
                    },
                    required: ['user_identity_id'],
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
                        description:
                          'Means by which a user gains access at an entrance.\nThe `unmanaged_acs_credential` object, which is not managed by Seam, represents a credential that provides an ACS user access within an access control system. For each acs_credential object, you define the access method. You can also specify additional properties, such as a code.',
                        properties: {
                          access_method: {
                            description:
                              'Access method for the credential. Supported values: `code`, `card`, `mobile_key`.',
                            enum: ['code', 'card', 'mobile_key'],
                            type: 'string',
                          },
                          acs_credential_id: {
                            description: 'ID of the credential.',
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_credential_pool_id: {
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_system_id: {
                            description:
                              'ID of the access control system that contains the credential.',
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_user_id: {
                            description:
                              'ID of the ACS user to whom the credential belongs.',
                            format: 'uuid',
                            type: 'string',
                          },
                          card_number: { nullable: true, type: 'string' },
                          code: {
                            description:
                              'Access (PIN) code for the credential.',
                            nullable: true,
                            type: 'string',
                          },
                          created_at: {
                            description:
                              'Date and time at which the credential was created.',
                            format: 'date-time',
                            type: 'string',
                          },
                          display_name: {
                            description:
                              'Display name that corresponds to the credential type.',
                            minLength: 1,
                            type: 'string',
                          },
                          ends_at: {
                            description:
                              'Date and time at which the credential validity ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after `starts_at`.',
                            type: 'string',
                          },
                          errors: {
                            description:
                              'Errors associated with the `acs_credential`.',
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
                            description:
                              'Brand-specific terminology for the credential type. Supported values: `pti_card`, `brivo_credential`, `hid_credential`, `visionline_card`.',
                            enum: [
                              'pti_card',
                              'brivo_credential',
                              'hid_credential',
                              'visionline_card',
                              'salto_ks_credential',
                            ],
                            type: 'string',
                          },
                          external_type_display_name: {
                            description:
                              'Display name that corresponds to the brand-specific terminology for the credential type.',
                            type: 'string',
                          },
                          is_issued: { type: 'boolean' },
                          is_latest_desired_state_synced_with_provider: {
                            description:
                              'Indicates whether the latest state of the credential has been synced from Seam to the provider.',
                            nullable: true,
                            type: 'boolean',
                          },
                          is_managed: { enum: [false], type: 'boolean' },
                          is_multi_phone_sync_credential: {
                            description:
                              'Indicates whether the credential is a [multi-phone sync credential](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system#what-are-multi-phone-sync-credentials).',
                            type: 'boolean',
                          },
                          is_one_time_use: {
                            description:
                              'Indicates whether the credential can only be used once. If "true," the code becomes invalid after the first use.',
                            type: 'boolean',
                          },
                          issued_at: {
                            format: 'date-time',
                            nullable: true,
                            type: 'string',
                          },
                          latest_desired_state_synced_with_provider_at: {
                            description:
                              'Date and time at which the state of the credential was most recently synced from Seam to the provider.',
                            format: 'date-time',
                            nullable: true,
                            type: 'string',
                          },
                          parent_acs_credential_id: {
                            description: 'ID of the parent credential.',
                            format: 'uuid',
                            type: 'string',
                          },
                          starts_at: {
                            description:
                              'Date and time at which the credential validity starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                            type: 'string',
                          },
                          visionline_metadata: {
                            description:
                              'Visionline-specific metadata for the credential.',
                            properties: {
                              auto_join: { type: 'boolean' },
                              card_function_type: {
                                enum: ['guest', 'staff'],
                                type: 'string',
                              },
                              card_id: { type: 'string' },
                              common_acs_entrance_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                              credential_id: { type: 'string' },
                              guest_acs_entrance_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                              is_valid: { type: 'boolean' },
                              joiner_acs_credential_ids: {
                                items: { format: 'uuid', type: 'string' },
                                type: 'array',
                              },
                            },
                            required: ['card_function_type'],
                            type: 'object',
                          },
                          warnings: {
                            description:
                              'Warnings associated with the `acs_credential`.',
                            items: {
                              description:
                                'Warning associated with the `acs_credential`.',
                              oneOf: [
                                {
                                  description:
                                    'Indicates that the credential is waiting to be issued.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['waiting_to_be_issued'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    "Indicates that the schedule of one of the credential's children was modified externally.",
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['schedule_externally_modified'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'Indicates that the schedule of this credential was modified to avoid creating a credential with a start date in the past.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['schedule_modified'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'Indicates that this credential is being deleted.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: ['being_deleted'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'An unknown issue occurred while syncing the state of this credential with the provider. This issue may affect the proper functioning of this credential.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the warning.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the warning. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                    warning_code: {
                                      description:
                                        'Unique identifier of the type of warning. Enables quick recognition and categorization of the issue.',
                                      enum: [
                                        'unknown_issue_with_acs_credential',
                                      ],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                              ],
                            },
                            type: 'array',
                          },
                          workspace_id: {
                            description:
                              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the credential.',
                            format: 'uuid',
                            type: 'string',
                          },
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
                          'is_managed',
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/credentials/unmanaged/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials', 'unmanaged'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'acs_credentials',
        'x-response-key': 'acs_credentials',
        'x-title': 'List Unmanaged Credentials',
        'x-undocumented': 'No unmanaged credentials are currently implemented.',
      },
    },
    '/acs/credentials/update': {
      patch: {
        description:
          'Updates the code and ends at date and time for a specified [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        operationId: 'acsCredentialsUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description: 'ID of the desired credential.',
                    type: 'string',
                  },
                  code: {
                    description:
                      'Replacement access (PIN) code for the credential.',
                    pattern: '^\\d+$',
                    type: 'string',
                  },
                  ends_at: {
                    description:
                      'Replacement date and time at which the validity of the credential ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after the `starts_at` value that you set when creating the credential.',
                    format: 'date-time',
                    type: 'string',
                  },
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
                      $ref: '#/components/schemas/acs_credential',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/update',
        tags: ['/acs'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Update a Credential',
      },
      post: {
        description:
          'Updates the code and ends at date and time for a specified [credential](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).',
        operationId: 'acsCredentialsUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description: 'ID of the desired credential.',
                    type: 'string',
                  },
                  code: {
                    description:
                      'Replacement access (PIN) code for the credential.',
                    pattern: '^\\d+$',
                    type: 'string',
                  },
                  ends_at: {
                    description:
                      'Replacement date and time at which the validity of the credential ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Must be a time in the future and after the `starts_at` value that you set when creating the credential.',
                    format: 'date-time',
                    type: 'string',
                  },
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
                      $ref: '#/components/schemas/acs_credential',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/credentials/update',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'credentials'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
        'x-title': 'Update a Credential',
      },
    },
    '/acs/encoders/encode_credential': {
      post: {
        operationId: 'acsEncodersEncodeCredentialPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_id: {
                    description:
                      'ID of the acs_credential to encode on a physical card.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_encoder_id: {
                    description:
                      'ID of the acs_encoder to use for the encoding.',
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['acs_encoder_id', 'acs_credential_id'],
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/encoders/encode_credential',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'encoders'],
        'x-fern-sdk-method-name': 'encode_credential',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
        'x-undocumented': 'Encoders are in alpha.',
      },
    },
    '/acs/encoders/list': {
      post: {
        operationId: 'acsEncodersListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    properties: {
                      acs_system_id: { format: 'uuid', type: 'string' },
                      limit: { default: 500, format: 'float', type: 'number' },
                    },
                    required: ['acs_system_id'],
                    type: 'object',
                  },
                  {
                    properties: {
                      acs_system_ids: {
                        items: { format: 'uuid', type: 'string' },
                        type: 'array',
                      },
                      limit: { default: 500, format: 'float', type: 'number' },
                    },
                    required: ['acs_system_ids'],
                    type: 'object',
                  },
                  {
                    properties: {
                      acs_encoder_ids: {
                        items: { format: 'uuid', type: 'string' },
                        type: 'array',
                      },
                      limit: { default: 500, format: 'float', type: 'number' },
                    },
                    required: ['acs_encoder_ids'],
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
                    acs_encoders: {
                      items: {
                        properties: {
                          acs_encoder_id: {
                            description: 'ID of the `acs_encoder`.',
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_system_id: {
                            description:
                              'ID of the access control system that contains the `acs_encoder`.',
                            format: 'uuid',
                            type: 'string',
                          },
                          created_at: {
                            description:
                              'Date and time at which the `acs_encoder` was created.',
                            format: 'date-time',
                            type: 'string',
                          },
                          display_name: {
                            description: 'Display name for the `acs_encoder`.',
                            type: 'string',
                          },
                          errors: {
                            description:
                              'Errors associated with the `acs_encoder`.',
                            items: {
                              description:
                                'Error associated with the `acs_encoder`.',
                              properties: {
                                created_at: {
                                  description:
                                    'Date and time at which Seam created the error.',
                                  format: 'date-time',
                                  type: 'string',
                                },
                                error_code: {
                                  description:
                                    'Unique identifier of the type of error. Enables quick recognition and categorization of the issue.',
                                  enum: ['acs_encoder_removed'],
                                  type: 'string',
                                },
                                message: {
                                  description:
                                    'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                  type: 'string',
                                },
                              },
                              required: ['created_at', 'message', 'error_code'],
                              type: 'object',
                            },
                            type: 'array',
                          },
                          workspace_id: {
                            description:
                              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the `acs_system`.',
                            format: 'uuid',
                            type: 'string',
                          },
                        },
                        required: [
                          'acs_encoder_id',
                          'acs_system_id',
                          'workspace_id',
                          'errors',
                          'created_at',
                          'display_name',
                        ],
                        type: 'object',
                      },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['acs_encoders', 'ok'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/encoders/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'encoders'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'acs_encoders',
        'x-response-key': 'acs_encoders',
        'x-undocumented': 'Encoders are in alpha.',
      },
    },
    '/acs/encoders/scan_credential': {
      post: {
        operationId: 'acsEncodersScanCredentialPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_encoder_id: {
                    description: 'ID of the acs_encoder to use for the scan.',
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['acs_encoder_id'],
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/encoders/scan_credential',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'encoders'],
        'x-fern-sdk-method-name': 'scan_credential',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
        'x-undocumented': 'Encoders are in alpha.',
      },
    },
    '/acs/encoders/simulate/next_credential_encode_will_fail': {
      post: {
        operationId: 'acsEncodersSimulateNextCredentialEncodeWillFailPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    additionalProperties: false,
                    properties: {
                      acs_encoder_id: { format: 'uuid', type: 'string' },
                      error_code: {
                        default: 'no_credential_on_encoder',
                        enum: ['no_credential_on_encoder'],
                        type: 'string',
                      },
                    },
                    required: ['acs_encoder_id'],
                    type: 'object',
                  },
                  {
                    additionalProperties: false,
                    properties: {
                      acs_credential_id: { format: 'uuid', type: 'string' },
                      acs_encoder_id: { format: 'uuid', type: 'string' },
                      error_code: {
                        enum: ['uncategorized_error', 'action_attempt_expired'],
                        type: 'string',
                      },
                    },
                    required: ['acs_encoder_id', 'error_code'],
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
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/encoders/simulate/next_credential_encode_will_fail',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'encoders', 'simulate'],
        'x-fern-sdk-method-name': 'next_credential_encode_will_fail',
        'x-response-key': null,
        'x-undocumented': 'Encoder simulations are in alpha.',
      },
    },
    '/acs/encoders/simulate/next_credential_encode_will_succeed': {
      post: {
        operationId: 'acsEncodersSimulateNextCredentialEncodeWillSucceedPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                additionalProperties: false,
                properties: {
                  acs_encoder_id: { format: 'uuid', type: 'string' },
                  scenario: {
                    default: 'credential_is_issued',
                    enum: ['credential_is_issued'],
                    type: 'string',
                  },
                },
                required: ['acs_encoder_id'],
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
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/encoders/simulate/next_credential_encode_will_succeed',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'encoders', 'simulate'],
        'x-fern-sdk-method-name': 'next_credential_encode_will_succeed',
        'x-response-key': null,
        'x-undocumented': 'Encoder simulations are in alpha.',
      },
    },
    '/acs/encoders/simulate/next_credential_scan_will_fail': {
      post: {
        operationId: 'acsEncodersSimulateNextCredentialScanWillFailPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    additionalProperties: false,
                    properties: {
                      acs_encoder_id: { format: 'uuid', type: 'string' },
                      error_code: {
                        default: 'no_credential_on_encoder',
                        enum: ['no_credential_on_encoder'],
                        type: 'string',
                      },
                    },
                    required: ['acs_encoder_id'],
                    type: 'object',
                  },
                  {
                    additionalProperties: false,
                    properties: {
                      acs_credential_id_on_seam: {
                        format: 'uuid',
                        type: 'string',
                      },
                      acs_encoder_id: { format: 'uuid', type: 'string' },
                      error_code: {
                        enum: ['uncategorized_error', 'action_attempt_expired'],
                        type: 'string',
                      },
                    },
                    required: ['acs_encoder_id', 'error_code'],
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
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/encoders/simulate/next_credential_scan_will_fail',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'encoders', 'simulate'],
        'x-fern-sdk-method-name': 'next_credential_scan_will_fail',
        'x-response-key': null,
        'x-undocumented': 'Encoder simulations are in alpha.',
      },
    },
    '/acs/encoders/simulate/next_credential_scan_will_succeed': {
      post: {
        operationId: 'acsEncodersSimulateNextCredentialScanWillSucceedPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    additionalProperties: false,
                    properties: {
                      acs_credential_id_on_seam: {
                        format: 'uuid',
                        type: 'string',
                      },
                      acs_encoder_id: { format: 'uuid', type: 'string' },
                      scenario: {
                        default: 'credential_exists_on_seam',
                        enum: [
                          'credential_exists_on_seam',
                          'credential_on_encoder_needs_update',
                        ],
                        type: 'string',
                      },
                    },
                    required: ['acs_encoder_id'],
                    type: 'object',
                  },
                  {
                    additionalProperties: false,
                    properties: {
                      acs_encoder_id: { format: 'uuid', type: 'string' },
                      scenario: {
                        enum: ['credential_does_not_exist_on_seam'],
                        type: 'string',
                      },
                    },
                    required: ['acs_encoder_id', 'scenario'],
                    type: 'object',
                  },
                  {
                    additionalProperties: false,
                    properties: {
                      acs_encoder_id: { format: 'uuid', type: 'string' },
                      scenario: {
                        enum: ['credential_on_encoder_is_empty'],
                        type: 'string',
                      },
                    },
                    required: ['acs_encoder_id', 'scenario'],
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
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/encoders/simulate/next_credential_scan_will_succeed',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'encoders', 'simulate'],
        'x-fern-sdk-method-name': 'next_credential_scan_will_succeed',
        'x-response-key': null,
        'x-undocumented': 'Encoder simulations are in alpha.',
      },
    },
    '/acs/entrances/get': {
      post: {
        description:
          'Returns a specified [ACS entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
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
                    acs_entrance: { $ref: '#/components/schemas/acs_entrance' },
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
          { console_session_with_workspace: [] },
          { client_session: [] },
        ],
        summary: '/acs/entrances/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'entrances'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'acs_entrance',
        'x-response-key': 'acs_entrance',
        'x-title': 'Get an Entrance',
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/entrances/grant_access',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'entrances'],
        'x-fern-sdk-method-name': 'grant_access',
        'x-response-key': null,
        'x-title': 'Grant an ACS User Access to an Entrance',
      },
    },
    '/acs/entrances/list': {
      post: {
        description:
          'Returns a list of all [ACS entrances](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
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
                      items: { $ref: '#/components/schemas/acs_entrance' },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/entrances/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'entrances'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'acs_entrances',
        'x-response-key': 'acs_entrances',
        'x-title': 'List Entrances',
      },
    },
    '/acs/entrances/list_credentials_with_access': {
      post: {
        description:
          'Returns a list of all [credentials](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials) with access to a specified [entrance](https://docs.seam.co/latest/capability-guides/access-systems/retrieving-entrance-details).',
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
                      items: { $ref: '#/components/schemas/acs_credential' },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/entrances/list_credentials_with_access',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'entrances'],
        'x-fern-sdk-method-name': 'list_credentials_with_access',
        'x-fern-sdk-return-value': 'acs_credentials',
        'x-response-key': 'acs_credentials',
        'x-title': 'List Credentials with Access to an Entrance',
      },
    },
    '/acs/systems/get': {
      post: {
        description:
          'Returns a specified [access control system](https://docs.seam.co/latest/capability-guides/access-systems).\n\nSpecify the desired access control system by including the corresponding `acs_system_id` in the request body.',
        operationId: 'acsSystemsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_system_id: {
                    description: 'ID of the desired access control system.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/systems/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'systems'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'acs_system',
        'x-response-key': 'acs_system',
        'x-title': 'Get an ACS System',
      },
    },
    '/acs/systems/list': {
      post: {
        description:
          'Returns a list of all [access control systems](https://docs.seam.co/latest/capability-guides/access-systems).\n\nTo filter the list of returned access control systems by a specific connected account ID, include the\n`connected_account_id` in the request body. If you omit the `connected_account_id` parameter, the\nresponse includes all access control systems connected to your workspace.',
        operationId: 'acsSystemsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connected_account_id: {
                    description:
                      'ID of the connected account by which to filter the list of returned access control systems.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/systems/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'systems'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'acs_systems',
        'x-response-key': 'acs_systems',
        'x-title': 'List ACS Systems',
      },
    },
    '/acs/systems/list_compatible_credential_manager_acs_systems': {
      post: {
        description:
          'Returns a list of all credential manager ACS systems that are compatible with a specified\n[access control system](https://docs.seam.co/latest/capability-guides/access-systems).\n\nSpecify the ACS system for which you want to retrieve all compatible credential manager ACS\nsystems by including the corresponding `acs_system_id` in the request body.',
        operationId: 'acsSystemsListCompatibleCredentialManagerAcsSystemsPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_system_id: {
                    description:
                      'ID of the ACS system for which you want to retrieve all compatible credential manager ACS systems.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/systems/list_compatible_credential_manager_acs_systems',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'systems'],
        'x-fern-sdk-method-name':
          'list_compatible_credential_manager_acs_systems',
        'x-fern-sdk-return-value': 'acs_systems',
        'x-response-key': 'acs_systems',
        'x-title': 'List Compatible Credential Manager ACS Systems',
      },
    },
    '/acs/users/add_to_access_group': {
      post: {
        description:
          'Adds a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) to a specified [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsUsersAddToAccessGroupPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: {
                    description: 'ID of the desired access group.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description: 'ID of the desired `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/add_to_access_group',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'add_to_access_group',
        'x-response-key': null,
        'x-title': 'Add an ACS User to an Access Group',
      },
      put: {
        description:
          'Adds a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) to a specified [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsUsersAddToAccessGroupPut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: {
                    description: 'ID of the desired access group.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description: 'ID of the desired `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/add_to_access_group',
        tags: ['/acs'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Add an ACS User to an Access Group',
      },
    },
    '/acs/users/create': {
      post: {
        description:
          'Creates a new [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsUsersCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_schedule: {
                    description:
                      "`starts_at` and `ends_at` timestamps for the new `acs_user`'s access. If you specify an `access_schedule`, you may include both `starts_at` and `ends_at`. `starts_at` defaults to the current time if not provided. `ends_at` is optional and must be a time in the future and after `starts_at`.",
                    properties: {
                      ends_at: {
                        format: 'date-time',
                        nullable: true,
                        type: 'string',
                      },
                      starts_at: { format: 'date-time', type: 'string' },
                    },
                    type: 'object',
                  },
                  acs_access_group_ids: {
                    default: [],
                    description:
                      'Array of `access_group_id`s to indicate the access groups to which to add the new `acs_user`.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  acs_system_id: {
                    description:
                      'ID of the `acs_system` to which to add the new `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
                  email: {
                    deprecated: true,
                    format: 'email',
                    type: 'string',
                    'x-deprecated': 'use email_address.',
                  },
                  email_address: {
                    description: 'Email address of the `acs_user`.',
                    format: 'email',
                    type: 'string',
                  },
                  full_name: {
                    description: 'Full name of the new `acs_user`.',
                    type: 'string',
                  },
                  phone_number: {
                    description:
                      'Phone number of the `acs_user` in E.164 format (for example, `+15555550100`).',
                    type: 'string',
                  },
                  user_identity_id: {
                    description:
                      'ID of the user identity with which to associate the new `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['full_name', 'acs_system_id'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/create',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'acs_user',
        'x-response-key': 'acs_user',
        'x-title': 'Create an ACS User',
      },
    },
    '/acs/users/delete': {
      post: {
        description:
          "Deletes a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) and invalidates the ACS user's [credentials](https://docs.seam.co/latest/capability-guides/access-systems/managing-credentials).",
        operationId: 'acsUsersDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: {
                    description: 'ID of the desired `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/delete',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
        'x-title': 'Delete an ACS User',
      },
    },
    '/acs/users/get': {
      post: {
        description:
          'Returns a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsUsersGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: {
                    description: 'ID of the desired `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'acs_user',
        'x-response-key': 'acs_user',
        'x-title': 'Get an ACS User',
      },
    },
    '/acs/users/list': {
      post: {
        description:
          'Returns a list of all [ACS users](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsUsersListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_system_id: {
                    description:
                      'ID of the `acs_system` for which you want to retrieve all `acs_user`s.',
                    format: 'uuid',
                    type: 'string',
                  },
                  created_before: { format: 'date-time', type: 'string' },
                  limit: { default: 500, format: 'float', type: 'number' },
                  user_identity_email_address: {
                    description:
                      'Email address of the user identity for which you want to retrieve all `acs_user`s.',
                    type: 'string',
                  },
                  user_identity_id: {
                    description:
                      'ID of the user identity for which you want to retrieve all `acs_user`s.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_phone_number: {
                    description:
                      'Phone number of the user identity for which you want to retrieve all `acs_user`s, in [E.164 format](https://www.itu.int/rec/T-REC-E.164/en) (for example, `+15555550100`).',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'acs_users',
        'x-response-key': 'acs_users',
        'x-title': 'List ACS Users',
      },
    },
    '/acs/users/list_accessible_entrances': {
      post: {
        description:
          'Lists the [entrances](https://docs.seam.co/latest/api/acs/entrances) to which a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) has access.',
        operationId: 'acsUsersListAccessibleEntrancesPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: {
                    description: 'ID of the desired `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
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
                  properties: {
                    acs_entrances: {
                      items: { $ref: '#/components/schemas/acs_entrance' },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/list_accessible_entrances',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'list_accessible_entrances',
        'x-fern-sdk-return-value': 'acs_entrances',
        'x-response-key': 'acs_entrances',
        'x-title': 'List ACS User-Accessible Entrances',
      },
    },
    '/acs/users/remove_from_access_group': {
      post: {
        description:
          'Removes a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) from a specified [access group](https://docs.seam.co/latest/capability-guides/access-systems/assigning-users-to-access-groups).',
        operationId: 'acsUsersRemoveFromAccessGroupPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_access_group_id: {
                    description: 'ID of the desired access group.',
                    format: 'uuid',
                    type: 'string',
                  },
                  acs_user_id: {
                    description: 'ID of the desired `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/remove_from_access_group',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'remove_from_access_group',
        'x-response-key': null,
        'x-title': 'Remove an ACS User from an Access Group',
      },
    },
    '/acs/users/revoke_access_to_all_entrances': {
      post: {
        description:
          'Revokes access to all [entrances](https://docs.seam.co/latest/api/acs/entrances) for a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsUsersRevokeAccessToAllEntrancesPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: {
                    description: 'ID of the desired `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/users/revoke_access_to_all_entrances',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'revoke_access_to_all_entrances',
        'x-response-key': null,
        'x-title': 'Revoke ACS User Access to All Entrances',
      },
    },
    '/acs/users/suspend': {
      post: {
        description:
          "[Suspends](https://docs.seam.co/latest/capability-guides/access-systems/user-management/suspending-and-unsuspending-users#suspend-an-acs-user) a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management). Suspending an ACS user revokes their access temporarily. To restore an ACS user's access, you can [unsuspend](https://docs.seam.co/latest/api/acs/users/unsuspend) them.",
        operationId: 'acsUsersSuspendPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: {
                    description: 'ID of the desired `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/suspend',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'suspend',
        'x-response-key': null,
        'x-title': 'Suspend an ACS User',
      },
    },
    '/acs/users/unmanaged/get': {
      post: {
        operationId: 'acsUsersUnmanagedGetPost',
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
                    acs_user: {
                      description:
                        'Represents an unmanaged [user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) in an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
                      properties: {
                        access_schedule: {
                          description:
                            "`starts_at` and `ends_at` timestamps for the `acs_user`'s access.",
                          properties: {
                            ends_at: {
                              description:
                                "Date and time at which the user's access ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.",
                              format: 'date-time',
                              nullable: true,
                              type: 'string',
                            },
                            starts_at: {
                              description:
                                "Date and time at which the user's access starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.",
                              format: 'date-time',
                              type: 'string',
                            },
                          },
                          required: ['starts_at', 'ends_at'],
                          type: 'object',
                        },
                        acs_system_id: {
                          description:
                            'ID of the access control system that contains the `acs_user`.',
                          format: 'uuid',
                          type: 'string',
                        },
                        acs_user_id: {
                          description: 'ID of the `acs_user`.',
                          format: 'uuid',
                          type: 'string',
                        },
                        created_at: {
                          description:
                            'Date and time at which the `acs_user` was created.',
                          format: 'date-time',
                          type: 'string',
                        },
                        display_name: {
                          description: 'Display name for the `acs_user`.',
                          type: 'string',
                        },
                        email: {
                          deprecated: true,
                          format: 'email',
                          type: 'string',
                          'x-deprecated': 'use email_address.',
                        },
                        email_address: {
                          description: 'Email address of the `acs_user`.',
                          format: 'email',
                          type: 'string',
                        },
                        errors: {
                          description: 'Errors associated with the `acs_user`.',
                          items: {
                            description:
                              'Error associated with the `acs_user`.',
                            oneOf: [
                              {
                                description:
                                  'Indicates that the ACS user was deleted from the ACS system outside of Seam.',
                                properties: {
                                  created_at: {
                                    description:
                                      'Date and time at which Seam created the error.',
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  error_code: {
                                    enum: ['deleted_externally'],
                                    type: 'string',
                                  },
                                  message: {
                                    description:
                                      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'error_code',
                                ],
                                type: 'object',
                              },
                              {
                                description:
                                  'Indicates that the user could not be subscribed on Salto KS because the subscription limit has been exceeded.',
                                properties: {
                                  created_at: {
                                    description:
                                      'Date and time at which Seam created the error.',
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  error_code: {
                                    enum: [
                                      'salto_ks_subscription_limit_exceeded',
                                    ],
                                    type: 'string',
                                  },
                                  message: {
                                    description:
                                      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'error_code',
                                ],
                                type: 'object',
                              },
                              {
                                description:
                                  "Indicates that the user was not created on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.",
                                properties: {
                                  created_at: {
                                    description:
                                      'Date and time at which Seam created the error.',
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  error_code: {
                                    enum: ['failed_to_create_on_acs_system'],
                                    type: 'string',
                                  },
                                  message: {
                                    description:
                                      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'error_code',
                                ],
                                type: 'object',
                              },
                              {
                                description:
                                  "Indicates that the user was not updated on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.",
                                properties: {
                                  created_at: {
                                    description:
                                      'Date and time at which Seam created the error.',
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  error_code: {
                                    enum: ['failed_to_update_on_acs_system'],
                                    type: 'string',
                                  },
                                  message: {
                                    description:
                                      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'error_code',
                                ],
                                type: 'object',
                              },
                              {
                                description:
                                  "Indicates that the user was not deleted on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.",
                                properties: {
                                  created_at: {
                                    description:
                                      'Date and time at which Seam created the error.',
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  error_code: {
                                    enum: ['failed_to_delete_on_acs_system'],
                                    type: 'string',
                                  },
                                  message: {
                                    description:
                                      'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'error_code',
                                ],
                                type: 'object',
                              },
                            ],
                          },
                          type: 'array',
                        },
                        external_type: {
                          description:
                            'Brand-specific terminology for the `acs_user` type.',
                          enum: [
                            'pti_user',
                            'brivo_user',
                            'hid_credential_manager_user',
                            'salto_site_user',
                            'latch_user',
                            'dormakaba_community_user',
                          ],
                          type: 'string',
                        },
                        external_type_display_name: {
                          description:
                            'Display name that corresponds to the brand-specific terminology for the `acs_user` type.',
                          type: 'string',
                        },
                        full_name: {
                          description: 'Full name of the `acs_user`.',
                          type: 'string',
                        },
                        hid_acs_system_id: { format: 'uuid', type: 'string' },
                        is_latest_desired_state_synced_with_provider: {
                          nullable: true,
                          type: 'boolean',
                          'x-undocumented': 'Only used internally.',
                        },
                        is_managed: { enum: [false], type: 'boolean' },
                        is_suspended: {
                          description:
                            'Indicates whether the `acs_user` is currently [suspended](https://docs.seam.co/latest/capability-guides/access-systems/user-management/suspending-and-unsuspending-users).',
                          type: 'boolean',
                        },
                        latest_desired_state_synced_with_provider_at: {
                          format: 'date-time',
                          nullable: true,
                          type: 'string',
                          'x-undocumented': 'Only used internally.',
                        },
                        phone_number: {
                          description:
                            'Phone number of the `acs_user` in E.164 format (for example, `+15555550100`).',
                          type: 'string',
                        },
                        user_identity_email_address: {
                          description:
                            'Email address of the user identity associated with the `acs_user`.',
                          nullable: true,
                          type: 'string',
                        },
                        user_identity_full_name: {
                          description:
                            'Full name of the user identity associated with the `acs_user`.',
                          nullable: true,
                          type: 'string',
                        },
                        user_identity_id: {
                          description:
                            'ID of the user identity associated with the `acs_user`.',
                          type: 'string',
                        },
                        user_identity_phone_number: {
                          description:
                            'Phone number of the user identity associated with the `acs_user` in E.164 format (for example, `+15555550100`).',
                          nullable: true,
                          type: 'string',
                        },
                        warnings: {
                          description:
                            'Warnings associated with the `acs_user`.',
                          items: {
                            description:
                              'Warning associated with the `acs_user`.',
                            oneOf: [
                              {
                                description:
                                  'Indicates that the user is being deleted from the ACS system. This is a temporary state, and the user will be deleted shortly.',
                                properties: {
                                  created_at: {
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  message: { type: 'string' },
                                  warning_code: {
                                    enum: ['being_deleted'],
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'warning_code',
                                ],
                                type: 'object',
                              },
                              {
                                description:
                                  'Indicates that the user is not subscribed on the Salto KS, so they cannot unlock doors or perform any actions. This occur when the their access schedule hasn’t started yet, or if their access schedule has ended, or if the site has reached its limit for active users (subscription slots), or if they have been manually unsubscribed.',
                                properties: {
                                  created_at: {
                                    format: 'date-time',
                                    type: 'string',
                                  },
                                  message: { type: 'string' },
                                  warning_code: {
                                    enum: ['salto_ks_user_not_subscribed'],
                                    type: 'string',
                                  },
                                },
                                required: [
                                  'created_at',
                                  'message',
                                  'warning_code',
                                ],
                                type: 'object',
                              },
                            ],
                          },
                          type: 'array',
                        },
                        workspace_id: {
                          description:
                            'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the `acs_user`.',
                          format: 'uuid',
                          type: 'string',
                        },
                      },
                      required: [
                        'acs_user_id',
                        'acs_system_id',
                        'workspace_id',
                        'created_at',
                        'display_name',
                        'warnings',
                        'errors',
                        'is_managed',
                      ],
                      type: 'object',
                    },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/unmanaged/get',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users', 'unmanaged'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'acs_user',
        'x-response-key': 'acs_user',
        'x-undocumented': 'No unmanaged users are currently implemented.',
      },
    },
    '/acs/users/unmanaged/list': {
      post: {
        operationId: 'acsUsersUnmanagedListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_system_id: { format: 'uuid', type: 'string' },
                  limit: { default: 500, format: 'float', type: 'number' },
                  user_identity_email_address: { type: 'string' },
                  user_identity_id: { format: 'uuid', type: 'string' },
                  user_identity_phone_number: { type: 'string' },
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
                      items: {
                        description:
                          'Represents an unmanaged [user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) in an [access control system](https://docs.seam.co/latest/capability-guides/access-systems).',
                        properties: {
                          access_schedule: {
                            description:
                              "`starts_at` and `ends_at` timestamps for the `acs_user`'s access.",
                            properties: {
                              ends_at: {
                                description:
                                  "Date and time at which the user's access ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.",
                                format: 'date-time',
                                nullable: true,
                                type: 'string',
                              },
                              starts_at: {
                                description:
                                  "Date and time at which the user's access starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.",
                                format: 'date-time',
                                type: 'string',
                              },
                            },
                            required: ['starts_at', 'ends_at'],
                            type: 'object',
                          },
                          acs_system_id: {
                            description:
                              'ID of the access control system that contains the `acs_user`.',
                            format: 'uuid',
                            type: 'string',
                          },
                          acs_user_id: {
                            description: 'ID of the `acs_user`.',
                            format: 'uuid',
                            type: 'string',
                          },
                          created_at: {
                            description:
                              'Date and time at which the `acs_user` was created.',
                            format: 'date-time',
                            type: 'string',
                          },
                          display_name: {
                            description: 'Display name for the `acs_user`.',
                            type: 'string',
                          },
                          email: {
                            deprecated: true,
                            format: 'email',
                            type: 'string',
                            'x-deprecated': 'use email_address.',
                          },
                          email_address: {
                            description: 'Email address of the `acs_user`.',
                            format: 'email',
                            type: 'string',
                          },
                          errors: {
                            description:
                              'Errors associated with the `acs_user`.',
                            items: {
                              description:
                                'Error associated with the `acs_user`.',
                              oneOf: [
                                {
                                  description:
                                    'Indicates that the ACS user was deleted from the ACS system outside of Seam.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the error.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    error_code: {
                                      enum: ['deleted_externally'],
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'error_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'Indicates that the user could not be subscribed on Salto KS because the subscription limit has been exceeded.',
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the error.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    error_code: {
                                      enum: [
                                        'salto_ks_subscription_limit_exceeded',
                                      ],
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'error_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    "Indicates that the user was not created on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.",
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the error.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    error_code: {
                                      enum: ['failed_to_create_on_acs_system'],
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'error_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    "Indicates that the user was not updated on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.",
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the error.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    error_code: {
                                      enum: ['failed_to_update_on_acs_system'],
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'error_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    "Indicates that the user was not deleted on the ACS system. This is likely due to an internal unexpected error. Please contact Seam's support if you encounter this.",
                                  properties: {
                                    created_at: {
                                      description:
                                        'Date and time at which Seam created the error.',
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    error_code: {
                                      enum: ['failed_to_delete_on_acs_system'],
                                      type: 'string',
                                    },
                                    message: {
                                      description:
                                        'Detailed description of the error. Provides insights into the issue and potentially how to rectify it.',
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'error_code',
                                  ],
                                  type: 'object',
                                },
                              ],
                            },
                            type: 'array',
                          },
                          external_type: {
                            description:
                              'Brand-specific terminology for the `acs_user` type.',
                            enum: [
                              'pti_user',
                              'brivo_user',
                              'hid_credential_manager_user',
                              'salto_site_user',
                              'latch_user',
                              'dormakaba_community_user',
                            ],
                            type: 'string',
                          },
                          external_type_display_name: {
                            description:
                              'Display name that corresponds to the brand-specific terminology for the `acs_user` type.',
                            type: 'string',
                          },
                          full_name: {
                            description: 'Full name of the `acs_user`.',
                            type: 'string',
                          },
                          hid_acs_system_id: { format: 'uuid', type: 'string' },
                          is_latest_desired_state_synced_with_provider: {
                            nullable: true,
                            type: 'boolean',
                            'x-undocumented': 'Only used internally.',
                          },
                          is_managed: { enum: [false], type: 'boolean' },
                          is_suspended: {
                            description:
                              'Indicates whether the `acs_user` is currently [suspended](https://docs.seam.co/latest/capability-guides/access-systems/user-management/suspending-and-unsuspending-users).',
                            type: 'boolean',
                          },
                          latest_desired_state_synced_with_provider_at: {
                            format: 'date-time',
                            nullable: true,
                            type: 'string',
                            'x-undocumented': 'Only used internally.',
                          },
                          phone_number: {
                            description:
                              'Phone number of the `acs_user` in E.164 format (for example, `+15555550100`).',
                            type: 'string',
                          },
                          user_identity_email_address: {
                            description:
                              'Email address of the user identity associated with the `acs_user`.',
                            nullable: true,
                            type: 'string',
                          },
                          user_identity_full_name: {
                            description:
                              'Full name of the user identity associated with the `acs_user`.',
                            nullable: true,
                            type: 'string',
                          },
                          user_identity_id: {
                            description:
                              'ID of the user identity associated with the `acs_user`.',
                            type: 'string',
                          },
                          user_identity_phone_number: {
                            description:
                              'Phone number of the user identity associated with the `acs_user` in E.164 format (for example, `+15555550100`).',
                            nullable: true,
                            type: 'string',
                          },
                          warnings: {
                            description:
                              'Warnings associated with the `acs_user`.',
                            items: {
                              description:
                                'Warning associated with the `acs_user`.',
                              oneOf: [
                                {
                                  description:
                                    'Indicates that the user is being deleted from the ACS system. This is a temporary state, and the user will be deleted shortly.',
                                  properties: {
                                    created_at: {
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: { type: 'string' },
                                    warning_code: {
                                      enum: ['being_deleted'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                                {
                                  description:
                                    'Indicates that the user is not subscribed on the Salto KS, so they cannot unlock doors or perform any actions. This occur when the their access schedule hasn’t started yet, or if their access schedule has ended, or if the site has reached its limit for active users (subscription slots), or if they have been manually unsubscribed.',
                                  properties: {
                                    created_at: {
                                      format: 'date-time',
                                      type: 'string',
                                    },
                                    message: { type: 'string' },
                                    warning_code: {
                                      enum: ['salto_ks_user_not_subscribed'],
                                      type: 'string',
                                    },
                                  },
                                  required: [
                                    'created_at',
                                    'message',
                                    'warning_code',
                                  ],
                                  type: 'object',
                                },
                              ],
                            },
                            type: 'array',
                          },
                          workspace_id: {
                            description:
                              'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the `acs_user`.',
                            format: 'uuid',
                            type: 'string',
                          },
                        },
                        required: [
                          'acs_user_id',
                          'acs_system_id',
                          'workspace_id',
                          'created_at',
                          'display_name',
                          'warnings',
                          'errors',
                          'is_managed',
                        ],
                        type: 'object',
                      },
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/acs/users/unmanaged/list',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users', 'unmanaged'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'acs_users',
        'x-response-key': 'acs_users',
        'x-undocumented': 'No unmanaged users are currently implemented.',
      },
    },
    '/acs/users/unsuspend': {
      post: {
        description:
          '[Unsuspends](https://docs.seam.co/latest/capability-guides/access-systems/user-management/suspending-and-unsuspending-users#unsuspend-an-acs-user) a specified suspended [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management). While [suspending an ACS user](https://docs.seam.co/latest/api/acs/users/suspend) revokes their access temporarily, unsuspending the ACS user restores their access.',
        operationId: 'acsUsersUnsuspendPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: {
                    description: 'ID of the desired `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/users/unsuspend',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'unsuspend',
        'x-response-key': null,
        'x-title': 'Unsuspend an ACS User',
      },
    },
    '/acs/users/update': {
      patch: {
        description:
          'Updates the properties of a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsUsersUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_schedule: {
                    description:
                      "`starts_at` and `ends_at` timestamps for the `acs_user`'s access. If you specify an `access_schedule`, you must include both `starts_at` and `ends_at`. `ends_at` must be a time in the future and after `starts_at`.",
                    nullable: true,
                    properties: {
                      ends_at: { format: 'date-time', type: 'string' },
                      starts_at: { format: 'date-time', type: 'string' },
                    },
                    required: ['starts_at', 'ends_at'],
                    type: 'object',
                  },
                  acs_user_id: {
                    description: 'ID of the `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
                  email: {
                    deprecated: true,
                    format: 'email',
                    type: 'string',
                    'x-deprecated': 'use email_address.',
                  },
                  email_address: {
                    description: 'Email address of the `acs_user`.',
                    format: 'email',
                    type: 'string',
                  },
                  full_name: {
                    description: 'Full name of the `acs_user`.',
                    type: 'string',
                  },
                  hid_acs_system_id: { format: 'uuid', type: 'string' },
                  phone_number: {
                    description:
                      'Phone number of the `acs_user` in E.164 format (for example, `+15555550100`).',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/users/update',
        tags: ['/acs'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Update an ACS User',
      },
      post: {
        description:
          'Updates the properties of a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management).',
        operationId: 'acsUsersUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  access_schedule: {
                    description:
                      "`starts_at` and `ends_at` timestamps for the `acs_user`'s access. If you specify an `access_schedule`, you must include both `starts_at` and `ends_at`. `ends_at` must be a time in the future and after `starts_at`.",
                    nullable: true,
                    properties: {
                      ends_at: { format: 'date-time', type: 'string' },
                      starts_at: { format: 'date-time', type: 'string' },
                    },
                    required: ['starts_at', 'ends_at'],
                    type: 'object',
                  },
                  acs_user_id: {
                    description: 'ID of the `acs_user`.',
                    format: 'uuid',
                    type: 'string',
                  },
                  email: {
                    deprecated: true,
                    format: 'email',
                    type: 'string',
                    'x-deprecated': 'use email_address.',
                  },
                  email_address: {
                    description: 'Email address of the `acs_user`.',
                    format: 'email',
                    type: 'string',
                  },
                  full_name: {
                    description: 'Full name of the `acs_user`.',
                    type: 'string',
                  },
                  hid_acs_system_id: { format: 'uuid', type: 'string' },
                  phone_number: {
                    description:
                      'Phone number of the `acs_user` in E.164 format (for example, `+15555550100`).',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/acs/users/update',
        tags: ['/acs'],
        'x-fern-sdk-group-name': ['acs', 'users'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
        'x-title': 'Update an ACS User',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/action_attempts/get',
        tags: ['/action_attempts'],
        'x-fern-sdk-group-name': ['action_attempts'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/action_attempts/list',
        tags: ['/action_attempts'],
        'x-fern-sdk-group-name': ['action_attempts'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'action_attempts',
        'x-response-key': 'action_attempts',
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
                  expires_at: { format: 'date-time', type: 'string' },
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
        security: [
          { publishable_key: [] },
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/client_sessions/create',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'client_session',
        'x-response-key': 'client_session',
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
                  expires_at: { format: 'date-time', type: 'string' },
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
        security: [
          { publishable_key: [] },
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/client_sessions/create',
        tags: ['/client_sessions'],
        'x-fern-ignore': true,
        'x-response-key': 'client_session',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/client_sessions/delete',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/client_sessions/get',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'client_session',
        'x-response-key': 'client_session',
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
                  expires_at: { format: 'date-time', type: 'string' },
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
        security: [
          { publishable_key: [] },
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/client_sessions/get_or_create',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'get_or_create',
        'x-fern-sdk-return-value': 'client_session',
        'x-response-key': 'client_session',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/client_sessions/grant_access',
        tags: ['/client_sessions'],
        'x-fern-ignore': true,
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/client_sessions/grant_access',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'grant_access',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/client_sessions/list',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'client_sessions',
        'x-response-key': 'client_sessions',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/client_sessions/revoke',
        tags: ['/client_sessions'],
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'revoke',
        'x-response-key': null,
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
                        'dormakaba_community',
                        'legic_connect',
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
                        'salto_ks',
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
                        'akiles',
                        'assa_abloy_vostio',
                        'assa_abloy_vostio_credential_service',
                        'tado',
                        'salto_space',
                        'yale_access',
                        'hid_cm',
                        'google_nest',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  automatically_manage_new_devices: {
                    default: true,
                    type: 'boolean',
                  },
                  custom_metadata: {
                    additionalProperties: {
                      nullable: true,
                      oneOf: [
                        { maxLength: 500, type: 'string' },
                        { type: 'boolean' },
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
                  wait_for_device_creation: { default: false, type: 'boolean' },
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
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/connect_webviews/create',
        tags: ['/connect_webviews'],
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'connect_webview',
        'x-response-key': 'connect_webview',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/connect_webviews/delete',
        tags: ['/connect_webviews'],
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/connect_webviews/get',
        tags: ['/connect_webviews'],
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'connect_webview',
        'x-response-key': 'connect_webview',
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
                      'Returns webviews whose custom_metadata contains all of the provided key/value pairs.',
                    type: 'object',
                  },
                  limit: { default: 500, format: 'float', type: 'number' },
                  user_identifier_key: {
                    description:
                      'Returns webviews that can be accessed by the provided user_identifier_key.',
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
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/connect_webviews/list',
        tags: ['/connect_webviews'],
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'connect_webviews',
        'x-response-key': 'connect_webviews',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/connected_accounts/delete',
        tags: ['/connected_accounts'],
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
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
          { client_session: [] },
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/connected_accounts/get',
        tags: ['/connected_accounts'],
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'connected_account',
        'x-response-key': 'connected_account',
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
                      'Returns accounts whose custom_metadata contains all of the provided key/value pairs.',
                    type: 'object',
                  },
                  user_identifier_key: {
                    description:
                      'Returns accounts that can be accessed by the provided user_identifier_key.',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/connected_accounts/list',
        tags: ['/connected_accounts'],
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'connected_accounts',
        'x-response-key': 'connected_accounts',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/connected_accounts/update',
        tags: ['/connected_accounts'],
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/devices/delete',
        tags: ['/devices'],
        'x-deprecated':
          'Deleting a device is no longer supported and will be removed.',
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
        'x-undocumented':
          'Deleting a device is no longer supported and will be removed.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/devices/get',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'device',
        'x-response-key': 'device',
      },
    },
    '/devices/list': {
      post: {
        description:
          'Returns a list of all [devices](https://docs.seam.co/latest/core-concepts/devices).',
        operationId: 'devicesListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_id: {
                    description:
                      'ID of the Connect Webview by which to filter devices.',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_id: {
                    description:
                      'ID of the connected account by which to filter.',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_ids: {
                    description:
                      'Array of IDs of the connected accounts by which to filter devices.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  created_before: {
                    description:
                      'Date threshold for devices to return. If specified, returns only devices created before the specified date.',
                    format: 'date-time',
                    type: 'string',
                  },
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    description:
                      'Set of key:value [custom metadata](https://docs.seam.co/latest/core-concepts/devices/adding-custom-metadata-to-a-device) pairs by which you want to filter devices.',
                    type: 'object',
                  },
                  device_ids: {
                    description:
                      'Array of device IDs by which to filter devices.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  device_type: {
                    description: 'Device type by which to filter devices.',
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
                          'akiles_lock',
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
                          'tado_thermostat',
                        ],
                        type: 'string',
                      },
                      { enum: ['ios_phone', 'android_phone'], type: 'string' },
                    ],
                  },
                  device_types: {
                    description:
                      'Array of device types by which to filter devices.',
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
                            'akiles_lock',
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
                            'tado_thermostat',
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
                        'can_program_offline_access_codes',
                        'can_program_online_access_codes',
                        'can_hvac_heat',
                        'can_hvac_cool',
                        'can_hvac_heat_cool',
                        'can_turn_off_hvac',
                        'can_simulate_removal',
                        'can_simulate_connection',
                        'can_simulate_disconnection',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                    'x-undocumented': 'Only used internally.',
                  },
                  include_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_offline_access_codes',
                        'can_program_online_access_codes',
                        'can_hvac_heat',
                        'can_hvac_cool',
                        'can_hvac_heat_cool',
                        'can_turn_off_hvac',
                        'can_simulate_removal',
                        'can_simulate_connection',
                        'can_simulate_disconnection',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                    'x-undocumented': 'Only used internally.',
                  },
                  limit: {
                    default: 500,
                    description:
                      'Numerical limit on the number of devices to return.',
                    format: 'float',
                    type: 'number',
                  },
                  manufacturer: {
                    description: 'Manufacturer by which to filter devices.',
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
                      'akiles',
                      'tado',
                    ],
                    type: 'string',
                  },
                  user_identifier_key: {
                    description:
                      'Your own internal user ID for the user by which to filter devices.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/devices/list',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'devices',
        'x-response-key': 'devices',
        'x-title': 'List Devices',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/devices/list_device_providers',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'list_device_providers',
        'x-fern-sdk-return-value': 'device_providers',
        'x-response-key': 'device_providers',
      },
    },
    '/devices/simulate/connect': {
      post: {
        operationId: 'devicesSimulateConnectPost',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/devices/simulate/connect',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices', 'simulate'],
        'x-fern-sdk-method-name': 'connect',
        'x-response-key': null,
      },
    },
    '/devices/simulate/disconnect': {
      post: {
        operationId: 'devicesSimulateDisconnectPost',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/devices/simulate/disconnect',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices', 'simulate'],
        'x-fern-sdk-method-name': 'disconnect',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/devices/simulate/remove',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices', 'simulate'],
        'x-fern-sdk-method-name': 'remove',
        'x-response-key': null,
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
          { client_session: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/devices/unmanaged/get',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices', 'unmanaged'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'device',
        'x-response-key': 'device',
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
                  connect_webview_id: {
                    description:
                      'ID of the Connect Webview by which to filter devices.',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_id: {
                    description:
                      'ID of the connected account by which to filter.',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_ids: {
                    description:
                      'Array of IDs of the connected accounts by which to filter devices.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  created_before: {
                    description:
                      'Date threshold for devices to return. If specified, returns only devices created before the specified date.',
                    format: 'date-time',
                    type: 'string',
                  },
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    description:
                      'Set of key:value [custom metadata](https://docs.seam.co/latest/core-concepts/devices/adding-custom-metadata-to-a-device) pairs by which you want to filter devices.',
                    type: 'object',
                  },
                  device_ids: {
                    description:
                      'Array of device IDs by which to filter devices.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  device_type: {
                    description: 'Device type by which to filter devices.',
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
                          'akiles_lock',
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
                          'tado_thermostat',
                        ],
                        type: 'string',
                      },
                      { enum: ['ios_phone', 'android_phone'], type: 'string' },
                    ],
                  },
                  device_types: {
                    description:
                      'Array of device types by which to filter devices.',
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
                            'akiles_lock',
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
                            'tado_thermostat',
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
                        'can_program_offline_access_codes',
                        'can_program_online_access_codes',
                        'can_hvac_heat',
                        'can_hvac_cool',
                        'can_hvac_heat_cool',
                        'can_turn_off_hvac',
                        'can_simulate_removal',
                        'can_simulate_connection',
                        'can_simulate_disconnection',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                    'x-undocumented': 'Only used internally.',
                  },
                  include_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_offline_access_codes',
                        'can_program_online_access_codes',
                        'can_hvac_heat',
                        'can_hvac_cool',
                        'can_hvac_heat_cool',
                        'can_turn_off_hvac',
                        'can_simulate_removal',
                        'can_simulate_connection',
                        'can_simulate_disconnection',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                    'x-undocumented': 'Only used internally.',
                  },
                  limit: {
                    default: 500,
                    description:
                      'Numerical limit on the number of devices to return.',
                    format: 'float',
                    type: 'number',
                  },
                  manufacturer: {
                    description: 'Manufacturer by which to filter devices.',
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
                      'akiles',
                      'tado',
                    ],
                    type: 'string',
                  },
                  user_identifier_key: {
                    description:
                      'Your own internal user ID for the user by which to filter devices.',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/devices/unmanaged/list',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices', 'unmanaged'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'devices',
        'x-response-key': 'devices',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/devices/unmanaged/update',
        tags: ['/devices'],
        'x-fern-ignore': true,
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/devices/unmanaged/update',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices', 'unmanaged'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/devices/update',
        tags: ['/devices'],
        'x-fern-ignore': true,
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/devices/update',
        tags: ['/devices'],
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
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
          { client_session: [] },
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/events/get',
        tags: ['/events'],
        'x-fern-sdk-group-name': ['events'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'event',
        'x-response-key': 'event',
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
                  acs_system_id: { format: 'uuid', type: 'string' },
                  acs_system_ids: {
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
                  connect_webview_id: { format: 'uuid', type: 'string' },
                  connected_account_id: { format: 'uuid', type: 'string' },
                  device_id: { format: 'uuid', type: 'string' },
                  device_ids: {
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  event_type: {
                    enum: [
                      'device.accessory_keypad_connected',
                      'device.accessory_keypad_disconnected',
                      'device.added',
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
                      'lock.access_denied',
                      'phone.deactivated',
                      'connected_account.connected',
                      'connected_account.successful_login',
                      'connected_account.created',
                      'connected_account.deleted',
                      'connected_account.disconnected',
                      'connected_account.completed_first_sync',
                      'connected_account.completed_first_sync_after_reconnection',
                      'connect_webview.login_succeeded',
                      'connect_webview.login_failed',
                      'noise_sensor.noise_threshold_triggered',
                      'access_code.backup_access_code_pulled',
                      'acs_system.added',
                      'acs_system.connected',
                      'acs_system.disconnected',
                      'acs_user.deleted',
                      'acs_credential.deleted',
                      'acs_credential.issued',
                      'acs_encoder.added',
                      'acs_encoder.removed',
                      'enrollment_automation.deleted',
                      'client_session.deleted',
                      'action_attempt.lock_door.succeeded',
                      'action_attempt.lock_door.failed',
                      'action_attempt.unlock_door.succeeded',
                      'action_attempt.unlock_door.failed',
                      'thermostat.climate_preset_activated',
                      'thermostat.manually_adjusted',
                      'thermostat.temperature_threshold_exceeded',
                      'thermostat.temperature_threshold_no_longer_exceeded',
                    ],
                    type: 'string',
                  },
                  event_types: {
                    items: {
                      enum: [
                        'device.accessory_keypad_connected',
                        'device.accessory_keypad_disconnected',
                        'device.added',
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
                        'lock.access_denied',
                        'phone.deactivated',
                        'connected_account.connected',
                        'connected_account.successful_login',
                        'connected_account.created',
                        'connected_account.deleted',
                        'connected_account.disconnected',
                        'connected_account.completed_first_sync',
                        'connected_account.completed_first_sync_after_reconnection',
                        'connect_webview.login_succeeded',
                        'connect_webview.login_failed',
                        'noise_sensor.noise_threshold_triggered',
                        'access_code.backup_access_code_pulled',
                        'acs_system.added',
                        'acs_system.connected',
                        'acs_system.disconnected',
                        'acs_user.deleted',
                        'acs_credential.deleted',
                        'acs_credential.issued',
                        'acs_encoder.added',
                        'acs_encoder.removed',
                        'enrollment_automation.deleted',
                        'client_session.deleted',
                        'action_attempt.lock_door.succeeded',
                        'action_attempt.lock_door.failed',
                        'action_attempt.unlock_door.succeeded',
                        'action_attempt.unlock_door.failed',
                        'thermostat.climate_preset_activated',
                        'thermostat.manually_adjusted',
                        'thermostat.temperature_threshold_exceeded',
                        'thermostat.temperature_threshold_no_longer_exceeded',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                  },
                  limit: { default: 500, format: 'float', type: 'number' },
                  since: { type: 'string' },
                  unstable_offset: { format: 'float', type: 'number' },
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
          { client_session: [] },
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/events/list',
        tags: ['/events'],
        'x-fern-sdk-group-name': ['events'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'events',
        'x-response-key': 'events',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/locks/get',
        tags: ['/locks'],
        'x-deprecated': 'Use `/devices/get` instead.',
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'device',
        'x-response-key': 'device',
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
                  connect_webview_id: {
                    description:
                      'ID of the Connect Webview by which to filter devices.',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_id: {
                    description:
                      'ID of the connected account by which to filter.',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_ids: {
                    description:
                      'Array of IDs of the connected accounts by which to filter devices.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  created_before: {
                    description:
                      'Date threshold for devices to return. If specified, returns only devices created before the specified date.',
                    format: 'date-time',
                    type: 'string',
                  },
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    description:
                      'Set of key:value [custom metadata](https://docs.seam.co/latest/core-concepts/devices/adding-custom-metadata-to-a-device) pairs by which you want to filter devices.',
                    type: 'object',
                  },
                  device_ids: {
                    description:
                      'Array of device IDs by which to filter devices.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  device_type: {
                    description: 'Device type by which to filter devices.',
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
                          'akiles_lock',
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
                          'tado_thermostat',
                        ],
                        type: 'string',
                      },
                      { enum: ['ios_phone', 'android_phone'], type: 'string' },
                    ],
                  },
                  device_types: {
                    description:
                      'Array of device types by which to filter devices.',
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
                            'akiles_lock',
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
                            'tado_thermostat',
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
                        'can_program_offline_access_codes',
                        'can_program_online_access_codes',
                        'can_hvac_heat',
                        'can_hvac_cool',
                        'can_hvac_heat_cool',
                        'can_turn_off_hvac',
                        'can_simulate_removal',
                        'can_simulate_connection',
                        'can_simulate_disconnection',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                    'x-undocumented': 'Only used internally.',
                  },
                  include_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_offline_access_codes',
                        'can_program_online_access_codes',
                        'can_hvac_heat',
                        'can_hvac_cool',
                        'can_hvac_heat_cool',
                        'can_turn_off_hvac',
                        'can_simulate_removal',
                        'can_simulate_connection',
                        'can_simulate_disconnection',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                    'x-undocumented': 'Only used internally.',
                  },
                  limit: {
                    default: 500,
                    description:
                      'Numerical limit on the number of devices to return.',
                    format: 'float',
                    type: 'number',
                  },
                  manufacturer: {
                    description: 'Manufacturer by which to filter devices.',
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
                      'akiles',
                      'tado',
                    ],
                    type: 'string',
                  },
                  user_identifier_key: {
                    description:
                      'Your own internal user ID for the user by which to filter devices.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/locks/list',
        tags: ['/locks'],
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'devices',
        'x-response-key': 'devices',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/locks/lock_door',
        tags: ['/locks'],
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'lock_door',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/locks/unlock_door',
        tags: ['/locks'],
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'unlock_door',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
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
                    network: { $ref: '#/components/schemas/network' },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/networks/get',
        tags: ['/networks'],
        'x-fern-sdk-group-name': ['networks'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'network',
        'x-response-key': 'network',
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
                      items: { $ref: '#/components/schemas/network' },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/networks/list',
        tags: ['/networks'],
        'x-fern-sdk-group-name': ['networks'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'networks',
        'x-response-key': 'networks',
      },
    },
    '/noise_sensors/list': {
      post: {
        operationId: 'noiseSensorsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_id: {
                    description:
                      'ID of the Connect Webview by which to filter devices.',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_id: {
                    description:
                      'ID of the connected account by which to filter.',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_ids: {
                    description:
                      'Array of IDs of the connected accounts by which to filter devices.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  created_before: {
                    description:
                      'Date threshold for devices to return. If specified, returns only devices created before the specified date.',
                    format: 'date-time',
                    type: 'string',
                  },
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    description:
                      'Set of key:value [custom metadata](https://docs.seam.co/latest/core-concepts/devices/adding-custom-metadata-to-a-device) pairs by which you want to filter devices.',
                    type: 'object',
                  },
                  device_ids: {
                    description:
                      'Array of device IDs by which to filter devices.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  device_type: {
                    description: 'Device type by which to filter devices.',
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
                          'akiles_lock',
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
                          'tado_thermostat',
                        ],
                        type: 'string',
                      },
                      { enum: ['ios_phone', 'android_phone'], type: 'string' },
                    ],
                  },
                  device_types: {
                    description:
                      'Array of device types by which to filter devices.',
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
                            'akiles_lock',
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
                            'tado_thermostat',
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
                        'can_program_offline_access_codes',
                        'can_program_online_access_codes',
                        'can_hvac_heat',
                        'can_hvac_cool',
                        'can_hvac_heat_cool',
                        'can_turn_off_hvac',
                        'can_simulate_removal',
                        'can_simulate_connection',
                        'can_simulate_disconnection',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                    'x-undocumented': 'Only used internally.',
                  },
                  include_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_offline_access_codes',
                        'can_program_online_access_codes',
                        'can_hvac_heat',
                        'can_hvac_cool',
                        'can_hvac_heat_cool',
                        'can_turn_off_hvac',
                        'can_simulate_removal',
                        'can_simulate_connection',
                        'can_simulate_disconnection',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                    'x-undocumented': 'Only used internally.',
                  },
                  limit: {
                    default: 500,
                    description:
                      'Numerical limit on the number of devices to return.',
                    format: 'float',
                    type: 'number',
                  },
                  manufacturer: {
                    description: 'Manufacturer by which to filter devices.',
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
                      'akiles',
                      'tado',
                    ],
                    type: 'string',
                  },
                  user_identifier_key: {
                    description:
                      'Your own internal user ID for the user by which to filter devices.',
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
                    devices: {
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                    },
                    noise_sensors: {
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['noise_sensors', 'devices', 'ok'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/noise_sensors/list',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'devices',
        'x-response-key': 'devices',
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
                  noise_threshold_decibels: { format: 'float', type: 'number' },
                  noise_threshold_nrs: { format: 'float', type: 'number' },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/create',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'noise_threshold',
        'x-response-key': 'noise_threshold',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/delete',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/get',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'noise_threshold',
        'x-response-key': 'noise_threshold',
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
          { client_session: [] },
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/list',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'noise_thresholds',
        'x-response-key': 'noise_thresholds',
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
                  noise_threshold_decibels: { format: 'float', type: 'number' },
                  noise_threshold_id: { format: 'uuid', type: 'string' },
                  noise_threshold_nrs: { format: 'float', type: 'number' },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/update',
        tags: ['/noise_sensors'],
        'x-fern-ignore': true,
        'x-response-key': null,
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
                  noise_threshold_decibels: { format: 'float', type: 'number' },
                  noise_threshold_id: { format: 'uuid', type: 'string' },
                  noise_threshold_nrs: { format: 'float', type: 'number' },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/update',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
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
                  noise_threshold_decibels: { format: 'float', type: 'number' },
                  noise_threshold_id: { format: 'uuid', type: 'string' },
                  noise_threshold_nrs: { format: 'float', type: 'number' },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/noise_sensors/noise_thresholds/update',
        tags: ['/noise_sensors'],
        'x-fern-ignore': true,
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/noise_sensors/simulate/trigger_noise_threshold',
        tags: ['/noise_sensors'],
        'x-fern-sdk-group-name': ['noise_sensors', 'simulate'],
        'x-fern-sdk-method-name': 'trigger_noise_threshold',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/phones/deactivate',
        tags: ['/phones'],
        'x-fern-sdk-group-name': ['phones'],
        'x-fern-sdk-method-name': 'deactivate',
        'x-response-key': null,
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
                  acs_credential_id: { format: 'uuid', type: 'string' },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/phones/list',
        tags: ['/phones'],
        'x-fern-sdk-group-name': ['phones'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'phones',
        'x-response-key': 'phones',
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
                      seos_tsm_endpoint_id: {
                        default: 1,
                        format: 'float',
                        type: 'number',
                      },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/phones/simulate/create_sandbox_phone',
        tags: ['/phones'],
        'x-fern-sdk-group-name': ['phones', 'simulate'],
        'x-fern-sdk-method-name': 'create_sandbox_phone',
        'x-fern-sdk-return-value': 'phone',
        'x-response-key': 'phone',
      },
    },
    '/thermostats/activate_climate_preset': {
      post: {
        description:
          'Activates a specified [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsActivateClimatePresetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_preset_key: {
                    description:
                      'Climate preset key of the desired climate preset.',
                    type: 'string',
                  },
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['device_id', 'climate_preset_key'],
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
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/activate_climate_preset',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'activate_climate_preset',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
        'x-title': 'Activate a Climate Preset',
      },
    },
    '/thermostats/cool': {
      post: {
        description:
          'Sets a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats) to [cool mode](https://docs.seam.co/latest/capability-guides/thermostats/configure-current-climate-settings).',
        operationId: 'thermostatsCoolPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  cooling_set_point_celsius: {
                    description:
                      'Desired [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °C. You must set one of the `cooling_set_point` parameters.',
                    format: 'float',
                    type: 'number',
                  },
                  cooling_set_point_fahrenheit: {
                    description:
                      'Desired [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °F. You must set one of the `cooling_set_point` parameters.',
                    format: 'float',
                    type: 'number',
                  },
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  sync: {
                    default: false,
                    type: 'boolean',
                    'x-undocumented': 'Only used internally.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/cool',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'cool',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
        'x-title': 'Set to Cool Mode',
      },
    },
    '/thermostats/create_climate_preset': {
      post: {
        description:
          'Creates a [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsCreateClimatePresetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_preset_key: {
                    description: 'Unique key to identify the climate preset.',
                    type: 'string',
                  },
                  cooling_set_point_celsius: {
                    description:
                      'Temperature to which the thermostat should cool (in °C). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
                    format: 'float',
                    type: 'number',
                  },
                  cooling_set_point_fahrenheit: {
                    description:
                      'Temperature to which the thermostat should cool (in °F).',
                    format: 'float',
                    type: 'number',
                  },
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  fan_mode_setting: {
                    description:
                      'Desired fan mode setting, such as `on`, `auto`, or `circulate`.',
                    enum: ['auto', 'on', 'circulate'],
                    type: 'string',
                  },
                  heating_set_point_celsius: {
                    description:
                      'Temperature to which the thermostat should heat (in °C).',
                    format: 'float',
                    type: 'number',
                  },
                  heating_set_point_fahrenheit: {
                    description:
                      'Temperature to which the thermostat should heat (in °F).',
                    format: 'float',
                    type: 'number',
                  },
                  hvac_mode_setting: {
                    description:
                      'Desired [HVAC mode](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/hvac-mode) setting, such as `heat`, `cool`, `heat_cool`, or `off`.',
                    enum: ['off', 'heat', 'cool', 'heat_cool'],
                    type: 'string',
                  },
                  manual_override_allowed: {
                    default: true,
                    deprecated: true,
                    description:
                      "Indicates whether a person at the thermostat or using the API can change the thermostat's settings.",
                    type: 'boolean',
                    'x-deprecated':
                      "Use 'thermostat_schedule.is_override_allowed'",
                  },
                  name: {
                    default: null,
                    description:
                      'User-friendly name to identify the climate preset.',
                    nullable: true,
                    type: 'string',
                  },
                },
                required: ['device_id', 'climate_preset_key'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/create_climate_preset',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'create_climate_preset',
        'x-response-key': null,
        'x-title': 'Create a Climate Preset',
      },
    },
    '/thermostats/delete_climate_preset': {
      post: {
        description:
          'Deletes a specified [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsDeleteClimatePresetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_preset_key: {
                    description:
                      'Climate preset key of the desired climate preset.',
                    type: 'string',
                  },
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['device_id', 'climate_preset_key'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/delete_climate_preset',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'delete_climate_preset',
        'x-response-key': null,
        'x-title': 'Delete a Climate Preset',
      },
    },
    '/thermostats/get': {
      post: {
        description:
          'Returns a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  name: {
                    description:
                      'User-friendly name of the desired thermostat device.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/get',
        tags: ['/thermostats'],
        'x-deprecated': 'Use `/devices/get` instead.',
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'thermostat',
        'x-response-key': 'thermostat',
        'x-title': 'Get a Thermostat',
        'x-undocumented': 'Will be removed.',
      },
    },
    '/thermostats/heat': {
      post: {
        description:
          'Sets a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats) to [heat mode](https://docs.seam.co/latest/capability-guides/thermostats/configure-current-climate-settings).',
        operationId: 'thermostatsHeatPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  heating_set_point_celsius: {
                    description:
                      'Desired [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °C. You must set one of the `heating_set_point` parameters.',
                    format: 'float',
                    type: 'number',
                  },
                  heating_set_point_fahrenheit: {
                    description:
                      'Desired [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °F. You must set one of the `heating_set_point` parameters.',
                    format: 'float',
                    type: 'number',
                  },
                  sync: {
                    default: false,
                    type: 'boolean',
                    'x-undocumented': 'Only used internally.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/heat',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'heat',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
        'x-title': 'Set to Heat Mode',
      },
    },
    '/thermostats/heat_cool': {
      post: {
        description:
          'Sets a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats) to [heat-cool ("auto") mode](https://docs.seam.co/latest/capability-guides/thermostats/configure-current-climate-settings).',
        operationId: 'thermostatsHeatCoolPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  cooling_set_point_celsius: {
                    description:
                      'Desired [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °C. You must set one of the `cooling_set_point` parameters.',
                    format: 'float',
                    type: 'number',
                  },
                  cooling_set_point_fahrenheit: {
                    description:
                      'Desired [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °F. You must set one of the `cooling_set_point` parameters.',
                    format: 'float',
                    type: 'number',
                  },
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  heating_set_point_celsius: {
                    description:
                      'Desired [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °C. You must set one of the `heating_set_point` parameters.',
                    format: 'float',
                    type: 'number',
                  },
                  heating_set_point_fahrenheit: {
                    description:
                      'Desired [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °F. You must set one of the `heating_set_point` parameters.',
                    format: 'float',
                    type: 'number',
                  },
                  sync: {
                    default: false,
                    type: 'boolean',
                    'x-undocumented': 'Only used internally.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/heat_cool',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'heat_cool',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
        'x-title': 'Set to Heat-Cool (Auto) Mode',
      },
    },
    '/thermostats/list': {
      post: {
        description:
          'Returns a list of all [thermostats](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  connect_webview_id: {
                    description:
                      'ID of the Connect Webview by which to filter devices.',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_id: {
                    description:
                      'ID of the connected account by which to filter.',
                    format: 'uuid',
                    type: 'string',
                  },
                  connected_account_ids: {
                    description:
                      'Array of IDs of the connected accounts by which to filter devices.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  created_before: {
                    description:
                      'Date threshold for devices to return. If specified, returns only devices created before the specified date.',
                    format: 'date-time',
                    type: 'string',
                  },
                  custom_metadata_has: {
                    additionalProperties: {
                      oneOf: [{ type: 'string' }, { type: 'boolean' }],
                    },
                    description:
                      'Set of key:value [custom metadata](https://docs.seam.co/latest/core-concepts/devices/adding-custom-metadata-to-a-device) pairs by which you want to filter devices.',
                    type: 'object',
                  },
                  device_ids: {
                    description:
                      'Array of device IDs by which to filter devices.',
                    items: { format: 'uuid', type: 'string' },
                    type: 'array',
                  },
                  device_type: {
                    description: 'Device type by which to filter devices.',
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
                          'akiles_lock',
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
                          'tado_thermostat',
                        ],
                        type: 'string',
                      },
                      { enum: ['ios_phone', 'android_phone'], type: 'string' },
                    ],
                  },
                  device_types: {
                    description:
                      'Array of device types by which to filter devices.',
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
                            'akiles_lock',
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
                            'tado_thermostat',
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
                        'can_program_offline_access_codes',
                        'can_program_online_access_codes',
                        'can_hvac_heat',
                        'can_hvac_cool',
                        'can_hvac_heat_cool',
                        'can_turn_off_hvac',
                        'can_simulate_removal',
                        'can_simulate_connection',
                        'can_simulate_disconnection',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                    'x-undocumented': 'Only used internally.',
                  },
                  include_if: {
                    items: {
                      enum: [
                        'can_remotely_unlock',
                        'can_remotely_lock',
                        'can_program_offline_access_codes',
                        'can_program_online_access_codes',
                        'can_hvac_heat',
                        'can_hvac_cool',
                        'can_hvac_heat_cool',
                        'can_turn_off_hvac',
                        'can_simulate_removal',
                        'can_simulate_connection',
                        'can_simulate_disconnection',
                      ],
                      type: 'string',
                    },
                    type: 'array',
                    'x-undocumented': 'Only used internally.',
                  },
                  limit: {
                    default: 500,
                    description:
                      'Numerical limit on the number of devices to return.',
                    format: 'float',
                    type: 'number',
                  },
                  manufacturer: {
                    description: 'Manufacturer by which to filter devices.',
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
                      'akiles',
                      'tado',
                    ],
                    type: 'string',
                  },
                  user_identifier_key: {
                    description:
                      'Your own internal user ID for the user by which to filter devices.',
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
                    devices: {
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                    thermostats: {
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                    },
                  },
                  required: ['thermostats', 'devices', 'ok'],
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
          { console_session_with_workspace: [] },
          { client_session: [] },
        ],
        summary: '/thermostats/list',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'devices',
        'x-response-key': 'devices',
        'x-title': 'List Thermostats',
      },
    },
    '/thermostats/off': {
      post: {
        description:
          'Sets a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats) to ["off" mode](https://docs.seam.co/latest/capability-guides/thermostats/configure-current-climate-settings).',
        operationId: 'thermostatsOffPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  sync: {
                    default: false,
                    type: 'boolean',
                    'x-undocumented': 'Only used internally.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/off',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'off',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
        'x-title': 'Set to Off Mode',
      },
    },
    '/thermostats/schedules/create': {
      post: {
        description:
          'Creates a [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsSchedulesCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_preset_key: {
                    description:
                      'Key of the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) to use for the thermostat schedule.',
                    type: 'string',
                  },
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    type: 'string',
                  },
                  ends_at: {
                    description:
                      'Date and time at which the thermostat schedule ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                    type: 'string',
                  },
                  is_override_allowed: {
                    default: false,
                    description:
                      "Indicates whether a person at the thermostat or using the API can change the thermostat's settings while the schedule is active. See also [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).",
                    type: 'boolean',
                  },
                  max_override_period_minutes: {
                    default: 0,
                    description:
                      "Number of minutes for which a person at the thermostat or using the API can change the thermostat's settings after the activation of the scheduled climate preset. See also [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).",
                    minimum: 0,
                    type: 'integer',
                  },
                  name: {
                    description:
                      'User-friendly name to identify the thermostat schedule.',
                    type: 'string',
                  },
                  starts_at: {
                    description:
                      'Date and time at which the thermostat schedule starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                    type: 'string',
                  },
                },
                required: [
                  'device_id',
                  'climate_preset_key',
                  'starts_at',
                  'ends_at',
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
                    ok: { type: 'boolean' },
                    thermostat_schedule: {
                      $ref: '#/components/schemas/thermostat_schedule',
                    },
                  },
                  required: ['thermostat_schedule', 'ok'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/schedules/create',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats', 'schedules'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'thermostat_schedule',
        'x-response-key': 'thermostat_schedule',
        'x-title': 'Create a Thermostat Schedule',
      },
    },
    '/thermostats/schedules/delete': {
      post: {
        description:
          'Deletes a [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsSchedulesDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  thermostat_schedule_id: {
                    description: 'ID of the desired thermostat schedule.',
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['thermostat_schedule_id'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/schedules/delete',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats', 'schedules'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
        'x-title': 'Delete a Thermostat Schedule',
      },
    },
    '/thermostats/schedules/get': {
      post: {
        description:
          'Returns a specified [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules).',
        operationId: 'thermostatsSchedulesGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  thermostat_schedule_id: {
                    description: 'ID of the desired thermostat schedule.',
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['thermostat_schedule_id'],
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
                    thermostat_schedule: {
                      $ref: '#/components/schemas/thermostat_schedule',
                    },
                  },
                  required: ['thermostat_schedule', 'ok'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/schedules/get',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats', 'schedules'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'thermostat_schedule',
        'x-response-key': 'thermostat_schedule',
        'x-title': 'Get a Thermostat Schedule',
      },
    },
    '/thermostats/schedules/list': {
      post: {
        description:
          'Returns a list of all [thermostat schedules](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules) for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsSchedulesListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identifier_key: {
                    description:
                      'User identifier key by which to filter the list of returned thermostat schedules.',
                    type: 'string',
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
                  properties: {
                    ok: { type: 'boolean' },
                    thermostat_schedules: {
                      items: {
                        $ref: '#/components/schemas/thermostat_schedule',
                      },
                      type: 'array',
                    },
                  },
                  required: ['thermostat_schedules', 'ok'],
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
          { console_session_with_workspace: [] },
        ],
        summary: '/thermostats/schedules/list',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats', 'schedules'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'thermostat_schedules',
        'x-response-key': 'thermostat_schedules',
        'x-title': 'List Thermostat Schedules',
      },
    },
    '/thermostats/schedules/update': {
      patch: {
        description:
          'Updates a specified [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules).',
        operationId: 'thermostatsSchedulesUpdatePatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_preset_key: {
                    description:
                      'Key of the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) to use for the thermostat schedule.',
                    type: 'string',
                  },
                  ends_at: {
                    description:
                      'Date and time at which the thermostat schedule ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                    type: 'string',
                  },
                  is_override_allowed: {
                    description:
                      "Indicates whether a person at the thermostat or using the API can change the thermostat's settings while the schedule is active. See also [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).",
                    type: 'boolean',
                  },
                  max_override_period_minutes: {
                    description:
                      "Number of minutes for which a person at the thermostat or using the API can change the thermostat's settings after the activation of the scheduled climate preset. See also [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).",
                    minimum: 0,
                    type: 'integer',
                  },
                  name: {
                    description:
                      'User-friendly name to identify the thermostat schedule.',
                    type: 'string',
                  },
                  starts_at: {
                    description:
                      'Date and time at which the thermostat schedule starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                    type: 'string',
                  },
                  thermostat_schedule_id: {
                    description: 'ID of the desired thermostat schedule.',
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['thermostat_schedule_id'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/schedules/update',
        tags: ['/thermostats'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Update a Thermostat Schedule',
      },
      post: {
        description:
          'Updates a specified [thermostat schedule](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules).',
        operationId: 'thermostatsSchedulesUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_preset_key: {
                    description:
                      'Key of the [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) to use for the thermostat schedule.',
                    type: 'string',
                  },
                  ends_at: {
                    description:
                      'Date and time at which the thermostat schedule ends, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                    type: 'string',
                  },
                  is_override_allowed: {
                    description:
                      "Indicates whether a person at the thermostat or using the API can change the thermostat's settings while the schedule is active. See also [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).",
                    type: 'boolean',
                  },
                  max_override_period_minutes: {
                    description:
                      "Number of minutes for which a person at the thermostat or using the API can change the thermostat's settings after the activation of the scheduled climate preset. See also [Specifying Manual Override Permissions](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-thermostat-schedules#specifying-manual-override-permissions).",
                    minimum: 0,
                    type: 'integer',
                  },
                  name: {
                    description:
                      'User-friendly name to identify the thermostat schedule.',
                    type: 'string',
                  },
                  starts_at: {
                    description:
                      'Date and time at which the thermostat schedule starts, in [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format.',
                    type: 'string',
                  },
                  thermostat_schedule_id: {
                    description: 'ID of the desired thermostat schedule.',
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['thermostat_schedule_id'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/schedules/update',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats', 'schedules'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
        'x-title': 'Update a Thermostat Schedule',
      },
    },
    '/thermostats/set_fallback_climate_preset': {
      post: {
        description:
          'Sets a specified [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) as the ["fallback"](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets/setting-the-fallback-climate-preset) preset for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsSetFallbackClimatePresetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_preset_key: {
                    description:
                      'Climate preset key of the desired climate preset.',
                    type: 'string',
                  },
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                },
                required: ['device_id', 'climate_preset_key'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/set_fallback_climate_preset',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'set_fallback_climate_preset',
        'x-response-key': null,
        'x-title': 'Set the Fallback Climate Preset',
      },
    },
    '/thermostats/set_fan_mode': {
      post: {
        description:
          'Sets the [fan mode setting](https://docs.seam.co/latest/capability-guides/thermostats/configure-current-climate-settings#fan-mode-settings) for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsSetFanModePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: { format: 'uuid', type: 'string' },
                  fan_mode: {
                    deprecated: true,
                    enum: ['auto', 'on', 'circulate'],
                    type: 'string',
                    'x-deprecated': 'Use `fan_mode_setting` instead.',
                  },
                  fan_mode_setting: {
                    description:
                      'Desired [fan mode setting](https://docs.seam.co/latest/capability-guides/thermostats/configure-current-climate-settings#fan-mode-settings) for the thermostat.',
                    enum: ['auto', 'on', 'circulate'],
                    type: 'string',
                  },
                  sync: {
                    default: false,
                    type: 'boolean',
                    'x-undocumented': 'Only used internally.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/set_fan_mode',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'set_fan_mode',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
        'x-title': 'Set the Fan Mode Setting',
      },
    },
    '/thermostats/set_hvac_mode': {
      post: {
        description:
          'Sets the [HVAC mode](https://docs.seam.co/latest/capability-guides/thermostats/configure-current-climate-settings) for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsSetHvacModePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                discriminator: { propertyName: 'hvac_mode_setting' },
                oneOf: [
                  {
                    properties: {
                      device_id: {
                        description: 'ID of the desired thermostat device.',
                        format: 'uuid',
                        type: 'string',
                      },
                      hvac_mode_setting: { enum: ['off'], type: 'string' },
                    },
                    required: ['hvac_mode_setting', 'device_id'],
                    type: 'object',
                  },
                  {
                    properties: {
                      cooling_set_point_celsius: {
                        description:
                          'Desired [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °C. You must set one of the `cooling_set_point` parameters.',
                        format: 'float',
                        type: 'number',
                      },
                      cooling_set_point_fahrenheit: {
                        description:
                          'Desired [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °F. You must set one of the `cooling_set_point` parameters.',
                        format: 'float',
                        type: 'number',
                      },
                      device_id: {
                        description: 'ID of the desired thermostat device.',
                        format: 'uuid',
                        type: 'string',
                      },
                      hvac_mode_setting: { enum: ['cool'], type: 'string' },
                    },
                    required: ['hvac_mode_setting', 'device_id'],
                    type: 'object',
                  },
                  {
                    properties: {
                      device_id: {
                        description: 'ID of the desired thermostat device.',
                        format: 'uuid',
                        type: 'string',
                      },
                      heating_set_point_celsius: {
                        description:
                          'Desired [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °C. You must set one of the `heating_set_point` parameters.',
                        format: 'float',
                        type: 'number',
                      },
                      heating_set_point_fahrenheit: {
                        description:
                          'Desired [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °F. You must set one of the `heating_set_point` parameters.',
                        format: 'float',
                        type: 'number',
                      },
                      hvac_mode_setting: { enum: ['heat'], type: 'string' },
                    },
                    required: ['hvac_mode_setting', 'device_id'],
                    type: 'object',
                  },
                  {
                    properties: {
                      cooling_set_point_celsius: {
                        description:
                          'Desired [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °C. You must set one of the `cooling_set_point` parameters.',
                        format: 'float',
                        type: 'number',
                      },
                      cooling_set_point_fahrenheit: {
                        description:
                          'Desired [cooling set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °F. You must set one of the `cooling_set_point` parameters.',
                        format: 'float',
                        type: 'number',
                      },
                      device_id: {
                        description: 'ID of the desired thermostat device.',
                        format: 'uuid',
                        type: 'string',
                      },
                      heating_set_point_celsius: {
                        description:
                          'Desired [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °C. You must set one of the `heating_set_point` parameters.',
                        format: 'float',
                        type: 'number',
                      },
                      heating_set_point_fahrenheit: {
                        description:
                          'Desired [heating set point](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points) in °F. You must set one of the `heating_set_point` parameters.',
                        format: 'float',
                        type: 'number',
                      },
                      hvac_mode_setting: {
                        enum: ['heat_cool'],
                        type: 'string',
                      },
                    },
                    required: ['hvac_mode_setting', 'device_id'],
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/set_hvac_mode',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'set_hvac_mode',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
        'x-title': 'Set the HVAC Mode',
      },
    },
    '/thermostats/set_temperature_threshold': {
      patch: {
        description:
          'Sets a [temperature threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds) for a specified thermostat. Seam emits a `thermostat.temperature_threshold_exceeded` event and adds a warning on a thermostat if it reports a temperature outside the threshold range.',
        operationId: 'thermostatsSetTemperatureThresholdPatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  lower_limit_celsius: {
                    default: null,
                    description:
                      'Lower temperature limit in in °C. Seam alerts you if the reported temperature is lower than this value. You can specify either `lower_limit` but not both.',
                    format: 'float',
                    nullable: true,
                    type: 'number',
                  },
                  lower_limit_fahrenheit: {
                    default: null,
                    description:
                      'Lower temperature limit in in °F. Seam alerts you if the reported temperature is lower than this value. You can specify either `lower_limit` but not both.',
                    format: 'float',
                    nullable: true,
                    type: 'number',
                  },
                  upper_limit_celsius: {
                    default: null,
                    description:
                      'Upper temperature limit in in °C. Seam alerts you if the reported temperature is higher than this value. You can specify either `upper_limit` but not both.',
                    format: 'float',
                    nullable: true,
                    type: 'number',
                  },
                  upper_limit_fahrenheit: {
                    default: null,
                    description:
                      'Upper temperature limit in in °C. Seam alerts you if the reported temperature is higher than this value. You can specify either `upper_limit` but not both.',
                    format: 'float',
                    nullable: true,
                    type: 'number',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/thermostats/set_temperature_threshold',
        tags: ['/thermostats'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Set a Temperature Threshold',
      },
      post: {
        description:
          'Sets a [temperature threshold](https://docs.seam.co/latest/capability-guides/thermostats/setting-and-monitoring-temperature-thresholds) for a specified thermostat. Seam emits a `thermostat.temperature_threshold_exceeded` event and adds a warning on a thermostat if it reports a temperature outside the threshold range.',
        operationId: 'thermostatsSetTemperatureThresholdPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  lower_limit_celsius: {
                    default: null,
                    description:
                      'Lower temperature limit in in °C. Seam alerts you if the reported temperature is lower than this value. You can specify either `lower_limit` but not both.',
                    format: 'float',
                    nullable: true,
                    type: 'number',
                  },
                  lower_limit_fahrenheit: {
                    default: null,
                    description:
                      'Lower temperature limit in in °F. Seam alerts you if the reported temperature is lower than this value. You can specify either `lower_limit` but not both.',
                    format: 'float',
                    nullable: true,
                    type: 'number',
                  },
                  upper_limit_celsius: {
                    default: null,
                    description:
                      'Upper temperature limit in in °C. Seam alerts you if the reported temperature is higher than this value. You can specify either `upper_limit` but not both.',
                    format: 'float',
                    nullable: true,
                    type: 'number',
                  },
                  upper_limit_fahrenheit: {
                    default: null,
                    description:
                      'Upper temperature limit in in °C. Seam alerts you if the reported temperature is higher than this value. You can specify either `upper_limit` but not both.',
                    format: 'float',
                    nullable: true,
                    type: 'number',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/thermostats/set_temperature_threshold',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'set_temperature_threshold',
        'x-response-key': null,
        'x-title': 'Set a Temperature Threshold',
      },
    },
    '/thermostats/update_climate_preset': {
      patch: {
        description:
          'Updates a specified [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsUpdateClimatePresetPatch',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_preset_key: {
                    description: 'Unique key to identify the climate preset.',
                    type: 'string',
                  },
                  cooling_set_point_celsius: {
                    description:
                      'Temperature to which the thermostat should cool (in °C). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
                    format: 'float',
                    type: 'number',
                  },
                  cooling_set_point_fahrenheit: {
                    description:
                      'Temperature to which the thermostat should cool (in °F).',
                    format: 'float',
                    type: 'number',
                  },
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  fan_mode_setting: {
                    description:
                      'Desired fan mode setting, such as `on`, `auto`, or `circulate`.',
                    enum: ['auto', 'on', 'circulate'],
                    type: 'string',
                  },
                  heating_set_point_celsius: {
                    description:
                      'Temperature to which the thermostat should heat (in °C).',
                    format: 'float',
                    type: 'number',
                  },
                  heating_set_point_fahrenheit: {
                    description:
                      'Temperature to which the thermostat should heat (in °F).',
                    format: 'float',
                    type: 'number',
                  },
                  hvac_mode_setting: {
                    description:
                      'Desired [HVAC mode](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/hvac-mode) setting, such as `heat`, `cool`, `heat_cool`, or `off`.',
                    enum: ['off', 'heat', 'cool', 'heat_cool'],
                    type: 'string',
                  },
                  manual_override_allowed: {
                    deprecated: true,
                    description:
                      "Indicates whether a person at the thermostat can change the thermostat's settings.",
                    type: 'boolean',
                    'x-deprecated':
                      "Use 'thermostat_schedule.is_override_allowed'",
                  },
                  name: {
                    default: null,
                    description:
                      'User-friendly name to identify the climate preset.',
                    nullable: true,
                    type: 'string',
                  },
                },
                required: [
                  'device_id',
                  'climate_preset_key',
                  'manual_override_allowed',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/update_climate_preset',
        tags: ['/thermostats'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Update a Climate Preset',
      },
      post: {
        description:
          'Updates a specified [climate preset](https://docs.seam.co/latest/capability-guides/thermostats/creating-and-managing-climate-presets) for a specified [thermostat](https://docs.seam.co/latest/capability-guides/thermostats).',
        operationId: 'thermostatsUpdateClimatePresetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  climate_preset_key: {
                    description: 'Unique key to identify the climate preset.',
                    type: 'string',
                  },
                  cooling_set_point_celsius: {
                    description:
                      'Temperature to which the thermostat should cool (in °C). See also [Set Points](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/set-points).',
                    format: 'float',
                    type: 'number',
                  },
                  cooling_set_point_fahrenheit: {
                    description:
                      'Temperature to which the thermostat should cool (in °F).',
                    format: 'float',
                    type: 'number',
                  },
                  device_id: {
                    description: 'ID of the desired thermostat device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  fan_mode_setting: {
                    description:
                      'Desired fan mode setting, such as `on`, `auto`, or `circulate`.',
                    enum: ['auto', 'on', 'circulate'],
                    type: 'string',
                  },
                  heating_set_point_celsius: {
                    description:
                      'Temperature to which the thermostat should heat (in °C).',
                    format: 'float',
                    type: 'number',
                  },
                  heating_set_point_fahrenheit: {
                    description:
                      'Temperature to which the thermostat should heat (in °F).',
                    format: 'float',
                    type: 'number',
                  },
                  hvac_mode_setting: {
                    description:
                      'Desired [HVAC mode](https://docs.seam.co/latest/capability-guides/thermostats/understanding-thermostat-concepts/hvac-mode) setting, such as `heat`, `cool`, `heat_cool`, or `off`.',
                    enum: ['off', 'heat', 'cool', 'heat_cool'],
                    type: 'string',
                  },
                  manual_override_allowed: {
                    deprecated: true,
                    description:
                      "Indicates whether a person at the thermostat can change the thermostat's settings.",
                    type: 'boolean',
                    'x-deprecated':
                      "Use 'thermostat_schedule.is_override_allowed'",
                  },
                  name: {
                    default: null,
                    description:
                      'User-friendly name to identify the climate preset.',
                    nullable: true,
                    type: 'string',
                  },
                },
                required: [
                  'device_id',
                  'climate_preset_key',
                  'manual_override_allowed',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/thermostats/update_climate_preset',
        tags: ['/thermostats'],
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'update_climate_preset',
        'x-response-key': null,
        'x-title': 'Update a Climate Preset',
      },
    },
    '/user_identities/add_acs_user': {
      post: {
        description:
          'Adds a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) to a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
        operationId: 'userIdentitiesAddAcsUserPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: {
                    description: 'ID of the desired ACS user.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_id: {
                    description: 'ID of the desired user identity.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/add_acs_user',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'add_acs_user',
        'x-response-key': null,
        'x-title': 'Add an ACS User to a User Identity',
      },
      put: {
        description:
          'Adds a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) to a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
        operationId: 'userIdentitiesAddAcsUserPut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: {
                    description: 'ID of the desired ACS user.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_id: {
                    description: 'ID of the desired user identity.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/add_acs_user',
        tags: ['/user_identities'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Add an ACS User to a User Identity',
      },
    },
    '/user_identities/create': {
      post: {
        description:
          'Creates a new [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
        operationId: 'userIdentitiesCreatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  email_address: {
                    description: 'Unique email address for the user identity.',
                    format: 'email',
                    nullable: true,
                    type: 'string',
                  },
                  full_name: {
                    description:
                      'Full name of the user associated with the user identity.',
                    minLength: 1,
                    nullable: true,
                    type: 'string',
                  },
                  phone_number: {
                    description:
                      'Unique phone number for the user identity in E.164 format (for example, +15555550100).',
                    nullable: true,
                    type: 'string',
                  },
                  user_identity_key: {
                    description: 'Unique key for the user identity.',
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
                      $ref: '#/components/schemas/user_identity',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/create',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'user_identity',
        'x-response-key': 'user_identity',
        'x-title': 'Create a User Identity',
      },
    },
    '/user_identities/delete': {
      post: {
        description:
          'Deletes a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity). To delete a user identity, you must first delete any [ACS credentials](https://docs.seam.co/latest/api/access-control-systems/credentials) and [enrollment automations](https://docs.seam.co/latest/api/user_identities/enrollment_automations/delete) associated with the user identity. You must also deactivate any associated phones.',
        operationId: 'userIdentitiesDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user_identity_id: {
                    description: 'ID of the desired user identity.',
                    format: 'uuid',
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
          { api_key: [] },
          { pat_with_workspace: [] },
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/delete',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
        'x-title': 'Delete a User Identity',
      },
    },
    '/user_identities/enrollment_automations/delete': {
      post: {
        description:
          'Deletes a specified [enrollment automation](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system). You must delete all enrollment automations associated with a [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity) before [deleting the user identity](https://docs.seam.co/latest/api/user_identities/delete).',
        operationId: 'userIdentitiesEnrollmentAutomationsDeletePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  enrollment_automation_id: {
                    description: 'ID of the desired enrollment automation.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/enrollment_automations/delete',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities', 'enrollment_automations'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
        'x-title': 'Delete an Enrollment Automation',
      },
    },
    '/user_identities/enrollment_automations/get': {
      post: {
        description:
          'Returns a specified [enrollment automation](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system).',
        operationId: 'userIdentitiesEnrollmentAutomationsGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  enrollment_automation_id: {
                    description: 'ID of the desired enrollment automation.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/enrollment_automations/get',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities', 'enrollment_automations'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'enrollment_automation',
        'x-response-key': 'enrollment_automation',
        'x-title': 'Get an Enrollment Automation',
      },
    },
    '/user_identities/enrollment_automations/launch': {
      post: {
        description:
          'Sets up a new [enrollment automation](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system) for a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity) with a specified [credential manager](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system).',
        operationId: 'userIdentitiesEnrollmentAutomationsLaunchPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_credential_pool_id: {
                    description:
                      'ID of the ACS credential pool from which to obtain credentials for the user identity.',
                    format: 'uuid',
                    type: 'string',
                  },
                  create_credential_manager_user: {
                    description:
                      'Indicates whether to create an associated credential manager user. If you set `create_credential_manager_user` to `true`, you cannot specify a `credential_manager_acs_user_id`.',
                    type: 'boolean',
                  },
                  credential_manager_acs_system_id: {
                    description:
                      'ID of the desired ACS system that serves as the credential manager.',
                    format: 'uuid',
                    type: 'string',
                  },
                  credential_manager_acs_user_id: {
                    description:
                      'ID of the associated ACS user within the credential manager. If you specify a `credential_manager_acs_user_id`, you cannot set `create_credential_manager_user` to `true`.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_id: {
                    description: 'ID of the desired user identity.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/enrollment_automations/launch',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities', 'enrollment_automations'],
        'x-fern-sdk-method-name': 'launch',
        'x-fern-sdk-return-value': 'enrollment_automation',
        'x-response-key': 'enrollment_automation',
        'x-title': 'Launch an Enrollment Automation',
      },
    },
    '/user_identities/enrollment_automations/list': {
      post: {
        description:
          'Returns a list of all [enrollment automations](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system) for a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
        operationId: 'userIdentitiesEnrollmentAutomationsListPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user_identity_id: {
                    description:
                      'ID of the user identity for which you want to retrieve all enrollment automations.',
                    format: 'uuid',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/enrollment_automations/list',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities', 'enrollment_automations'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'enrollment_automations',
        'x-response-key': 'enrollment_automations',
        'x-title': 'List Enrollment Automations',
      },
    },
    '/user_identities/get': {
      post: {
        description:
          'Returns a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
        operationId: 'userIdentitiesGetPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    properties: {
                      user_identity_id: {
                        description: 'ID of the desired user identity.',
                        format: 'uuid',
                        type: 'string',
                      },
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
                      $ref: '#/components/schemas/user_identity',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/get',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'user_identity',
        'x-response-key': 'user_identity',
        'x-title': 'Get a User Identity',
      },
    },
    '/user_identities/grant_access_to_device': {
      post: {
        description:
          'Grants a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity) access to a specified [device](https://docs.seam.co/latest/core-concepts/devices/).',
        operationId: 'userIdentitiesGrantAccessToDevicePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: {
                    description: 'ID of the desired managed device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_id: {
                    description: 'ID of the desired user identity.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/grant_access_to_device',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'grant_access_to_device',
        'x-response-key': null,
        'x-title': 'Grant a User Identity Access to a Device',
      },
      put: {
        description:
          'Grants a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity) access to a specified [device](https://docs.seam.co/latest/core-concepts/devices/).',
        operationId: 'userIdentitiesGrantAccessToDevicePut',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: {
                    description: 'ID of the desired managed device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_id: {
                    description: 'ID of the desired user identity.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/grant_access_to_device',
        tags: ['/user_identities'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Grant a User Identity Access to a Device',
      },
    },
    '/user_identities/list': {
      post: {
        description:
          'Returns a list of all [user identities](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
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
                      items: { $ref: '#/components/schemas/user_identity' },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/list',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'user_identities',
        'x-response-key': 'user_identities',
        'x-title': 'List User Identities',
      },
    },
    '/user_identities/list_accessible_devices': {
      post: {
        description:
          'Returns a list of all [devices](https://docs.seam.co/latest/core-concepts/devices) associated with a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
        operationId: 'userIdentitiesListAccessibleDevicesPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user_identity_id: {
                    description:
                      'ID of the user identity for which you want to retrieve all accessible devices.',
                    format: 'uuid',
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
                  properties: {
                    accessible_devices: {
                      deprecated: true,
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                      'x-deprecated': 'use devices.',
                    },
                    devices: {
                      items: { $ref: '#/components/schemas/device' },
                      type: 'array',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['devices', 'accessible_devices', 'ok'],
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/list_accessible_devices',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'list_accessible_devices',
        'x-fern-sdk-return-value': 'devices',
        'x-response-key': 'devices',
        'x-title': 'List Accessible Devices for a User Identity',
      },
    },
    '/user_identities/list_acs_systems': {
      post: {
        description:
          'Returns a list of all [access control systems](https://docs.seam.co/latest/capability-guides/access-systems) associated with a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
        operationId: 'userIdentitiesListAcsSystemsPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user_identity_id: {
                    description:
                      'ID of the user identity for which you want to retrieve all access control systems.',
                    format: 'uuid',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/list_acs_systems',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'list_acs_systems',
        'x-fern-sdk-return-value': 'acs_systems',
        'x-response-key': 'acs_systems',
        'x-title': 'List ACS Systems Associated with a User Identity',
      },
    },
    '/user_identities/list_acs_users': {
      post: {
        description:
          'Returns a list of all [ACS users](https://docs.seam.co/latest/capability-guides/access-systems/user-management) assigned to a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
        operationId: 'userIdentitiesListAcsUsersPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user_identity_id: {
                    description:
                      'ID of the user identity for which you want to retrieve all ACS users.',
                    format: 'uuid',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/list_acs_users',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'list_acs_users',
        'x-fern-sdk-return-value': 'acs_users',
        'x-response-key': 'acs_users',
        'x-title': 'List ACS Users Associated with a User Identity',
      },
    },
    '/user_identities/remove_acs_user': {
      post: {
        description:
          'Removes a specified [ACS user](https://docs.seam.co/latest/capability-guides/access-systems/user-management) from a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
        operationId: 'userIdentitiesRemoveAcsUserPost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  acs_user_id: {
                    description: 'ID of the ACS user.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_id: {
                    description: 'ID of the desired user identity.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/remove_acs_user',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'remove_acs_user',
        'x-response-key': null,
        'x-title': 'Remove an ACS User from a User Identity',
      },
    },
    '/user_identities/revoke_access_to_device': {
      post: {
        description:
          'Revokes access to a specified [device](https://docs.seam.co/latest/core-concepts/devices/) from a specified [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
        operationId: 'userIdentitiesRevokeAccessToDevicePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  device_id: {
                    description: 'ID of the desired managed device.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_id: {
                    description: 'ID of the desired user identity.',
                    format: 'uuid',
                    type: 'string',
                  },
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
          { console_session_with_workspace: [] },
        ],
        summary: '/user_identities/revoke_access_to_device',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'revoke_access_to_device',
        'x-response-key': null,
        'x-title': 'Revoke Access to a Device from a User Identity',
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
                    description: 'Unique email address for the user identity.',
                    format: 'email',
                    nullable: true,
                    type: 'string',
                  },
                  full_name: { minLength: 1, nullable: true, type: 'string' },
                  phone_number: {
                    description:
                      'Unique phone number for the user identity in [E.164 format](https://www.itu.int/rec/T-REC-E.164/en) (for example, +15555550100).',
                    nullable: true,
                    type: 'string',
                  },
                  user_identity_id: {
                    description: 'ID of the user identity.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_key: {
                    description: 'Unique key for the user identity.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/update',
        tags: ['/user_identities'],
        'x-fern-ignore': true,
        'x-response-key': null,
        'x-title': 'Update a User Identity',
      },
      post: {
        operationId: 'userIdentitiesUpdatePost',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  email_address: {
                    description: 'Unique email address for the user identity.',
                    format: 'email',
                    nullable: true,
                    type: 'string',
                  },
                  full_name: { minLength: 1, nullable: true, type: 'string' },
                  phone_number: {
                    description:
                      'Unique phone number for the user identity in [E.164 format](https://www.itu.int/rec/T-REC-E.164/en) (for example, +15555550100).',
                    nullable: true,
                    type: 'string',
                  },
                  user_identity_id: {
                    description: 'ID of the user identity.',
                    format: 'uuid',
                    type: 'string',
                  },
                  user_identity_key: {
                    description: 'Unique key for the user identity.',
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
          { console_session_with_workspace: [] },
          { api_key: [] },
        ],
        summary: '/user_identities/update',
        tags: ['/user_identities'],
        'x-fern-sdk-group-name': ['user_identities'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
        'x-title': 'Update a User Identity',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/webhooks/create',
        tags: ['/webhooks'],
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'webhook',
        'x-response-key': 'webhook',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/webhooks/delete',
        tags: ['/webhooks'],
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'delete',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/webhooks/get',
        tags: ['/webhooks'],
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'webhook',
        'x-response-key': 'webhook',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/webhooks/list',
        tags: ['/webhooks'],
        'x-fern-ignore': true,
        'x-response-key': 'webhooks',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/webhooks/list',
        tags: ['/webhooks'],
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'webhooks',
        'x-response-key': 'webhooks',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/webhooks/update',
        tags: ['/webhooks'],
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'update',
        'x-response-key': null,
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
          { console_session_with_workspace: [] },
        ],
        summary: '/webhooks/update',
        tags: ['/webhooks'],
        'x-fern-ignore': true,
        'x-response-key': null,
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
                  company_name: { type: 'string' },
                  connect_partner_name: {
                    deprecated: true,
                    nullable: true,
                    type: 'string',
                    'x-deprecated': 'use company_name',
                  },
                  is_sandbox: { default: false, type: 'boolean' },
                  name: { type: 'string' },
                  webview_logo_shape: {
                    enum: ['circle', 'square'],
                    type: 'string',
                  },
                  webview_primary_button_color: { type: 'string' },
                  webview_primary_button_text_color: { type: 'string' },
                },
                required: ['name'],
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
        security: [
          { pat_without_workspace: [] },
          { console_session_with_workspace: [] },
          { console_session_without_workspace: [] },
        ],
        summary: '/workspaces/create',
        tags: ['/workspaces'],
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'create',
        'x-fern-sdk-return-value': 'workspace',
        'x-response-key': 'workspace',
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
        security: [
          { api_key: [] },
          { console_session_with_workspace: [] },
          { client_session: [] },
          { pat_with_workspace: [] },
        ],
        summary: '/workspaces/get',
        tags: ['/workspaces'],
        'x-fern-ignore': true,
        'x-response-key': 'workspace',
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
        security: [
          { api_key: [] },
          { console_session_with_workspace: [] },
          { client_session: [] },
          { pat_with_workspace: [] },
        ],
        summary: '/workspaces/get',
        tags: ['/workspaces'],
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'get',
        'x-fern-sdk-return-value': 'workspace',
        'x-response-key': 'workspace',
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
          { api_key: [] },
          { client_session: [] },
          { console_session_with_workspace: [] },
          { console_session_without_workspace: [] },
        ],
        summary: '/workspaces/list',
        tags: ['/workspaces'],
        'x-fern-ignore': true,
        'x-response-key': 'workspaces',
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
          { api_key: [] },
          { client_session: [] },
          { console_session_with_workspace: [] },
          { console_session_without_workspace: [] },
        ],
        summary: '/workspaces/list',
        tags: ['/workspaces'],
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'list',
        'x-fern-sdk-return-value': 'workspaces',
        'x-response-key': 'workspaces',
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
          { console_session_with_workspace: [] },
        ],
        summary: '/workspaces/reset_sandbox',
        tags: ['/workspaces'],
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'reset_sandbox',
        'x-fern-sdk-return-value': 'action_attempt',
        'x-response-key': 'action_attempt',
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
