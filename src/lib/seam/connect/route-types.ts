export interface Routes {
  '/access_codes/create': {
    route: '/access_codes/create'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      name?: string | undefined
      starts_at?: string | undefined
      ends_at?: string | undefined
      code?: string | undefined
      sync?: boolean
      attempt_for_offline_device?: boolean
      common_code_key?: string | undefined
      prefer_native_scheduling?: boolean | undefined
      use_backup_access_code_pool?: boolean | undefined
      allow_external_modification?: boolean | undefined
      is_external_modification_allowed?: boolean | undefined
      use_offline_access_code?: boolean | undefined
      is_offline_access_code?: boolean | undefined
      is_one_time_use?: boolean | undefined
      max_time_rounding?: ('1hour' | '1day' | '1h' | '1d') | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      action_attempt:
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
      access_code: {
        common_code_key: string | null
        is_scheduled_on_device?: boolean | undefined
        type: 'time_bound' | 'ongoing'
        is_waiting_for_code_assignment?: boolean | undefined
        access_code_id: string
        device_id: string
        name: string | null
        code: string | null
        created_at: string
        errors?: any
        warnings?: any
        is_managed: true
        starts_at?: (string | null) | undefined
        ends_at?: (string | null) | undefined
        status: 'setting' | 'set' | 'unset' | 'removing' | 'unknown'
        is_backup_access_code_available: boolean
        is_backup?: boolean | undefined
        pulled_backup_access_code_id?: (string | null) | undefined
        is_external_modification_allowed: boolean
        is_one_time_use: boolean
        is_offline_access_code: boolean
      }
    }
  }
  '/access_codes/create_multiple': {
    route: '/access_codes/create_multiple'
    method: 'POST' | 'PUT'
    queryParams: {}
    jsonBody: {
      device_ids: string[]
      behavior_when_code_cannot_be_shared?: 'throw' | 'create_random_code'
      name?: string | undefined
      starts_at?: string | undefined
      ends_at?: string | undefined
      code?: string | undefined
      attempt_for_offline_device?: boolean
      prefer_native_scheduling?: boolean | undefined
      use_backup_access_code_pool?: boolean | undefined
      allow_external_modification?: boolean | undefined
      is_external_modification_allowed?: boolean | undefined
      use_offline_access_code?: boolean | undefined
      is_offline_access_code?: boolean | undefined
      is_one_time_use?: boolean | undefined
      max_time_rounding?: ('1hour' | '1day' | '1h' | '1d') | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      access_codes: Array<{
        common_code_key: string | null
        is_scheduled_on_device?: boolean | undefined
        type: 'time_bound' | 'ongoing'
        is_waiting_for_code_assignment?: boolean | undefined
        access_code_id: string
        device_id: string
        name: string | null
        code: string | null
        created_at: string
        errors?: any
        warnings?: any
        is_managed: true
        starts_at?: (string | null) | undefined
        ends_at?: (string | null) | undefined
        status: 'setting' | 'set' | 'unset' | 'removing' | 'unknown'
        is_backup_access_code_available: boolean
        is_backup?: boolean | undefined
        pulled_backup_access_code_id?: (string | null) | undefined
        is_external_modification_allowed: boolean
        is_one_time_use: boolean
        is_offline_access_code: boolean
      }>
    }
  }
  '/access_codes/delete': {
    route: '/access_codes/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id?: string | undefined
      access_code_id: string
      sync?: boolean
    }
    formData: {}
    jsonResponse: {
      action_attempt:
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
    }
  }
  '/access_codes/generate_code': {
    route: '/access_codes/generate_code'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id: string
    }
    formData: {}
    jsonResponse: {
      generated_code: {
        device_id: string
        code: string
      }
    }
  }
  '/access_codes/get': {
    route: '/access_codes/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id?: string | undefined
      access_code_id?: string | undefined
      code?: string | undefined
    }
    formData: {}
    jsonResponse: {
      access_code: {
        common_code_key: string | null
        is_scheduled_on_device?: boolean | undefined
        type: 'time_bound' | 'ongoing'
        is_waiting_for_code_assignment?: boolean | undefined
        access_code_id: string
        device_id: string
        name: string | null
        code: string | null
        created_at: string
        errors?: any
        warnings?: any
        is_managed: true
        starts_at?: (string | null) | undefined
        ends_at?: (string | null) | undefined
        status: 'setting' | 'set' | 'unset' | 'removing' | 'unknown'
        is_backup_access_code_available: boolean
        is_backup?: boolean | undefined
        pulled_backup_access_code_id?: (string | null) | undefined
        is_external_modification_allowed: boolean
        is_one_time_use: boolean
        is_offline_access_code: boolean
      }
    }
  }
  '/access_codes/list': {
    route: '/access_codes/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id?: string | undefined
      access_code_ids?: string[] | undefined
      user_identifier_key?: string | undefined
    }
    formData: {}
    jsonResponse: {
      access_codes: Array<{
        common_code_key: string | null
        is_scheduled_on_device?: boolean | undefined
        type: 'time_bound' | 'ongoing'
        is_waiting_for_code_assignment?: boolean | undefined
        access_code_id: string
        device_id: string
        name: string | null
        code: string | null
        created_at: string
        errors?: any
        warnings?: any
        is_managed: true
        starts_at?: (string | null) | undefined
        ends_at?: (string | null) | undefined
        status: 'setting' | 'set' | 'unset' | 'removing' | 'unknown'
        is_backup_access_code_available: boolean
        is_backup?: boolean | undefined
        pulled_backup_access_code_id?: (string | null) | undefined
        is_external_modification_allowed: boolean
        is_one_time_use: boolean
        is_offline_access_code: boolean
      }>
    }
  }
  '/access_codes/pull_backup_access_code': {
    route: '/access_codes/pull_backup_access_code'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      access_code_id: string
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      backup_access_code: {
        common_code_key: string | null
        is_scheduled_on_device?: boolean | undefined
        type: 'time_bound' | 'ongoing'
        is_waiting_for_code_assignment?: boolean | undefined
        access_code_id: string
        device_id: string
        name: string | null
        code: string | null
        created_at: string
        errors?: any
        warnings?: any
        is_managed: true
        starts_at?: (string | null) | undefined
        ends_at?: (string | null) | undefined
        status: 'setting' | 'set' | 'unset' | 'removing' | 'unknown'
        is_backup_access_code_available: boolean
        is_backup?: boolean | undefined
        pulled_backup_access_code_id?: (string | null) | undefined
        is_external_modification_allowed: boolean
        is_one_time_use: boolean
        is_offline_access_code: boolean
      }
    }
  }
  '/access_codes/simulate/create_unmanaged_access_code': {
    route: '/access_codes/simulate/create_unmanaged_access_code'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      name: string
      code: string
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      access_code: {
        type: 'time_bound' | 'ongoing'
        access_code_id: string
        device_id: string
        name: string | null
        code: string | null
        created_at: string
        errors?: any
        warnings?: any
        is_managed: false
        starts_at?: (string | null) | undefined
        ends_at?: (string | null) | undefined
        status: 'set'
      }
    }
  }
  '/access_codes/unmanaged/convert_to_managed': {
    route: '/access_codes/unmanaged/convert_to_managed'
    method: 'POST' | 'PATCH'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      access_code_id: string
      is_external_modification_allowed?: boolean | undefined
      allow_external_modification?: boolean | undefined
      force?: boolean | undefined
      sync?: boolean
    }
    formData: {}
    jsonResponse: {}
  }
  '/access_codes/unmanaged/delete': {
    route: '/access_codes/unmanaged/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      access_code_id: string
      sync?: boolean
    }
    formData: {}
    jsonResponse: {
      action_attempt:
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
    }
  }
  '/access_codes/unmanaged/get': {
    route: '/access_codes/unmanaged/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id?: string | undefined
      access_code_id?: string | undefined
      code?: string | undefined
    }
    formData: {}
    jsonResponse: {
      access_code: {
        type: 'time_bound' | 'ongoing'
        access_code_id: string
        device_id: string
        name: string | null
        code: string | null
        created_at: string
        errors?: any
        warnings?: any
        is_managed: false
        starts_at?: (string | null) | undefined
        ends_at?: (string | null) | undefined
        status: 'set'
      }
    }
  }
  '/access_codes/unmanaged/list': {
    route: '/access_codes/unmanaged/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id: string
      user_identifier_key?: string | undefined
    }
    formData: {}
    jsonResponse: {
      access_codes: Array<{
        type: 'time_bound' | 'ongoing'
        access_code_id: string
        device_id: string
        name: string | null
        code: string | null
        created_at: string
        errors?: any
        warnings?: any
        is_managed: false
        starts_at?: (string | null) | undefined
        ends_at?: (string | null) | undefined
        status: 'set'
      }>
    }
  }
  '/access_codes/unmanaged/update': {
    route: '/access_codes/unmanaged/update'
    method: 'PATCH' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      access_code_id: string
      is_managed: boolean
      allow_external_modification?: boolean | undefined
      is_external_modification_allowed?: boolean | undefined
      force?: boolean | undefined
    }
    formData: {}
    jsonResponse: {}
  }
  '/access_codes/update': {
    route: '/access_codes/update'
    method: 'POST' | 'PATCH' | 'PUT'
    queryParams: {}
    jsonBody: {
      name?: string | undefined
      starts_at?: string | undefined
      ends_at?: string | undefined
      code?: string | undefined
      sync?: boolean
      attempt_for_offline_device?: boolean
      prefer_native_scheduling?: boolean | undefined
      use_backup_access_code_pool?: boolean | undefined
      allow_external_modification?: boolean | undefined
      is_external_modification_allowed?: boolean | undefined
      use_offline_access_code?: boolean | undefined
      is_offline_access_code?: boolean | undefined
      is_one_time_use?: boolean | undefined
      max_time_rounding?: ('1hour' | '1day' | '1h' | '1d') | undefined
      access_code_id: string
      device_id?: string | undefined
      type?: ('ongoing' | 'time_bound') | undefined
      is_managed?: boolean | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      action_attempt:
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
    }
  }
  '/acs/access_groups/add_user': {
    route: '/acs/access_groups/add_user'
    method: 'PUT' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_access_group_id: string
      acs_user_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/acs/access_groups/get': {
    route: '/acs/access_groups/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_access_group_id: string
    }
    formData: {}
    jsonResponse: {
      acs_access_group: {
        acs_access_group_id: string
        acs_system_id: string
        workspace_id: string
        name: string
        /** deprecated: use external_type */
        access_group_type:
          | 'pti_unit'
          | 'pti_access_level'
          | 'salto_access_group'
          | 'brivo_group'
        /** deprecated: use external_type_display_name */
        access_group_type_display_name: string
        external_type:
          | 'pti_unit'
          | 'pti_access_level'
          | 'salto_access_group'
          | 'brivo_group'
        external_type_display_name: string
        created_at: string
      }
    }
  }
  '/acs/access_groups/list': {
    route: '/acs/access_groups/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_system_id?: string | undefined
      acs_user_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      acs_access_groups: Array<{
        acs_access_group_id: string
        acs_system_id: string
        workspace_id: string
        name: string
        /** deprecated: use external_type */
        access_group_type:
          | 'pti_unit'
          | 'pti_access_level'
          | 'salto_access_group'
          | 'brivo_group'
        /** deprecated: use external_type_display_name */
        access_group_type_display_name: string
        external_type:
          | 'pti_unit'
          | 'pti_access_level'
          | 'salto_access_group'
          | 'brivo_group'
        external_type_display_name: string
        created_at: string
      }>
    }
  }
  '/acs/access_groups/list_users': {
    route: '/acs/access_groups/list_users'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_access_group_id: string
    }
    formData: {}
    jsonResponse: {
      acs_users: Array<{
        acs_user_id: string
        acs_system_id: string
        workspace_id: string
        created_at: string
        display_name: string
        external_type: 'pti_user' | 'brivo_user'
        external_type_display_name: string
        is_suspended: boolean
        full_name?: string | undefined
        /** Deprecated: use email_address. */
        email?: string | undefined
        email_address?: string | undefined
        phone_number?: string | undefined
      }>
    }
  }
  '/acs/access_groups/remove_user': {
    route: '/acs/access_groups/remove_user'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_access_group_id: string
      acs_user_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/acs/credentials/assign': {
    route: '/acs/credentials/assign'
    method: 'PATCH' | 'POST'
    queryParams: {}
    jsonBody: {
      acs_user_id: string
      acs_credential_id: string
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/acs/credentials/create': {
    route: '/acs/credentials/create'
    method: 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_user_id: string
      code: string
    }
    formData: {}
    jsonResponse: {
      acs_credential: {
        acs_credential_id: string
        acs_user_id?: string | undefined
        acs_system_id: string
        display_name: string
        code: string | null
        external_type: 'pti_card' | 'brivo_credential'
        external_type_display_name: string
        created_at: string
        workspace_id: string
      }
    }
  }
  '/acs/credentials/delete': {
    route: '/acs/credentials/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_credential_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/acs/credentials/get': {
    route: '/acs/credentials/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_credential_id: string
    }
    formData: {}
    jsonResponse: {
      acs_credential: {
        acs_credential_id: string
        acs_user_id?: string | undefined
        acs_system_id: string
        display_name: string
        code: string | null
        external_type: 'pti_card' | 'brivo_credential'
        external_type_display_name: string
        created_at: string
        workspace_id: string
      }
    }
  }
  '/acs/credentials/list': {
    route: '/acs/credentials/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams:
      | {
          acs_user_id: string
        }
      | {
          acs_system_id: string
        }
      | {
          acs_user_id: string
          acs_system_id: string
        }
    formData: {}
    jsonResponse: {
      acs_credentials: Array<{
        acs_credential_id: string
        acs_user_id?: string | undefined
        acs_system_id: string
        display_name: string
        code: string | null
        external_type: 'pti_card' | 'brivo_credential'
        external_type_display_name: string
        created_at: string
        workspace_id: string
      }>
    }
  }
  '/acs/credentials/unassign': {
    route: '/acs/credentials/unassign'
    method: 'PATCH' | 'POST'
    queryParams: {}
    jsonBody: {
      acs_user_id: string
      acs_credential_id: string
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      acs_credential: {
        acs_credential_id: string
        acs_user_id?: string | undefined
        acs_system_id: string
        code: string | null
        external_type: 'pti_card' | 'brivo_credential'
        external_type_display_name: string
        created_at: string
        workspace_id: string
      }
    }
  }
  '/acs/systems/get': {
    route: '/acs/systems/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_system_id: string
    }
    formData: {}
    jsonResponse: {
      acs_system: {
        acs_system_id: string
        external_type: 'pti_site' | 'alta_org' | 'salto_site' | 'brivo_system'
        external_type_display_name: string
        /** deprecated: use external_type */
        system_type: 'pti_site' | 'alta_org' | 'salto_site' | 'brivo_system'
        /** deprecated: use external_type_display_name */
        system_type_display_name: string
        name: string
        created_at: string
        connected_account_ids: string[]
      }
    }
  }
  '/acs/systems/list': {
    route: '/acs/systems/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      connected_account_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      acs_systems: Array<{
        acs_system_id: string
        external_type: 'pti_site' | 'alta_org' | 'salto_site' | 'brivo_system'
        external_type_display_name: string
        /** deprecated: use external_type */
        system_type: 'pti_site' | 'alta_org' | 'salto_site' | 'brivo_system'
        /** deprecated: use external_type_display_name */
        system_type_display_name: string
        name: string
        created_at: string
        connected_account_ids: string[]
      }>
    }
  }
  '/acs/users/add_to_access_group': {
    route: '/acs/users/add_to_access_group'
    method: 'PUT' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_user_id: string
      acs_access_group_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/acs/users/create': {
    route: '/acs/users/create'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      acs_system_id: string
      acs_access_group_ids?: string[]
      full_name?: string | undefined
      /** Deprecated: use email_address. */
      email?: string | undefined
      phone_number?: string | undefined
      email_address?: string | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      acs_user: {
        acs_user_id: string
        acs_system_id: string
        workspace_id: string
        created_at: string
        display_name: string
        external_type: 'pti_user' | 'brivo_user'
        external_type_display_name: string
        is_suspended: boolean
        full_name?: string | undefined
        /** Deprecated: use email_address. */
        email?: string | undefined
        email_address?: string | undefined
        phone_number?: string | undefined
      }
    }
  }
  '/acs/users/delete': {
    route: '/acs/users/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_user_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/acs/users/get': {
    route: '/acs/users/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_user_id: string
    }
    formData: {}
    jsonResponse: {
      acs_user: {
        acs_user_id: string
        acs_system_id: string
        workspace_id: string
        created_at: string
        display_name: string
        external_type: 'pti_user' | 'brivo_user'
        external_type_display_name: string
        is_suspended: boolean
        full_name?: string | undefined
        /** Deprecated: use email_address. */
        email?: string | undefined
        email_address?: string | undefined
        phone_number?: string | undefined
      }
    }
  }
  '/acs/users/list': {
    route: '/acs/users/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_system_id: string
    }
    formData: {}
    jsonResponse: {
      acs_users: Array<{
        acs_user_id: string
        acs_system_id: string
        workspace_id: string
        created_at: string
        display_name: string
        external_type: 'pti_user' | 'brivo_user'
        external_type_display_name: string
        is_suspended: boolean
        full_name?: string | undefined
        /** Deprecated: use email_address. */
        email?: string | undefined
        email_address?: string | undefined
        phone_number?: string | undefined
      }>
    }
  }
  '/acs/users/remove_from_access_group': {
    route: '/acs/users/remove_from_access_group'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_user_id: string
      acs_access_group_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/acs/users/suspend': {
    route: '/acs/users/suspend'
    method: 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_user_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/acs/users/unsuspend': {
    route: '/acs/users/unsuspend'
    method: 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_user_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/acs/users/update': {
    route: '/acs/users/update'
    method: 'PATCH' | 'POST'
    queryParams: {}
    jsonBody: {
      acs_user_id: string
      full_name?: string | undefined
      /** Deprecated: use email_address. */
      email?: string | undefined
      phone_number?: string | undefined
      email_address?: string | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/action_attempts/get': {
    route: '/action_attempts/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      action_attempt_id: string
    }
    formData: {}
    jsonResponse: {
      action_attempt:
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
    }
  }
  '/action_attempts/list': {
    route: '/action_attempts/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      action_attempt_ids: string[]
    }
    formData: {}
    jsonResponse: {
      action_attempts: Array<
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
      >
    }
  }
  '/client_sessions/create': {
    route: '/client_sessions/create'
    method: 'POST' | 'PUT'
    queryParams: {}
    jsonBody: {
      user_identifier_key?: string | undefined
      connect_webview_ids?: string[] | undefined
      connected_account_ids?: string[] | undefined
      user_identity_ids?: string[] | undefined
      expires_at?: Date | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      client_session: {
        client_session_id: string
        user_identifier_key: string | null
        created_at: string
        token: string
        workspace_id: string
      }
    }
  }
  '/client_sessions/delete': {
    route: '/client_sessions/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      client_session_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/client_sessions/get': {
    route: '/client_sessions/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      client_session_id?: string | undefined
      user_identifier_key?: string | undefined
    }
    formData: {}
    jsonResponse: {
      client_session: {
        client_session_id: string
        user_identifier_key: string | null
        created_at: string
        token: string
        device_count: number
        connected_account_ids: string[]
        connect_webview_ids: string[]
        user_identity_ids: string[]
        workspace_id: string
      }
    }
  }
  '/client_sessions/get_or_create': {
    route: '/client_sessions/get_or_create'
    method: 'POST' | 'PUT'
    queryParams: {}
    jsonBody: {
      user_identifier_key?: string | undefined
      connect_webview_ids?: string[] | undefined
      connected_account_ids?: string[] | undefined
      user_identity_ids?: string[] | undefined
      expires_at?: Date | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      client_session: {
        client_session_id: string
        user_identifier_key: string | null
        created_at: string
        token: string
        workspace_id: string
      }
    }
  }
  '/client_sessions/grant_access': {
    route: '/client_sessions/grant_access'
    method: 'PATCH' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      client_session_id?: string | undefined
      user_identifier_key?: string | undefined
      connected_account_ids?: string[] | undefined
      connect_webview_ids?: string[] | undefined
      user_identity_ids?: string[] | undefined
    }
    formData: {}
    jsonResponse: {
      client_session: {
        client_session_id: string
        user_identifier_key: string | null
        created_at: string
        token: string
        device_count: number
        connected_account_ids: string[]
        connect_webview_ids: string[]
        user_identity_ids: string[]
        workspace_id: string
      }
    }
  }
  '/client_sessions/list': {
    route: '/client_sessions/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      client_session_id?: string | undefined
      user_identifier_key?: string | undefined
      connect_webview_id?: string | undefined
      without_user_identifier_key?: boolean | undefined
    }
    formData: {}
    jsonResponse: {
      client_sessions: Array<{
        client_session_id: string
        user_identifier_key: string | null
        created_at: string
        device_count: number
        connected_account_ids: string[]
        connect_webview_ids: string[]
        user_identity_ids: string[]
        workspace_id: string
      }>
    }
  }
  '/client_sessions/revoke': {
    route: '/client_sessions/revoke'
    method: 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      client_session_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/connect_webviews/create': {
    route: '/connect_webviews/create'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_selection_mode?: ('none' | 'single' | 'multiple') | undefined
      custom_redirect_url?: string | undefined
      custom_redirect_failure_url?: string | undefined
      accepted_providers?:
        | Array<
            | 'akuvox'
            | 'august'
            | 'avigilon_alta'
            | 'brivo'
            | 'butterflymx'
            | 'schlage'
            | 'smartthings'
            | 'yale'
            | 'genie'
            | 'doorking'
            | 'salto'
            | 'lockly'
            | 'ttlock'
            | 'linear'
            | 'noiseaware'
            | 'nuki'
            | 'seam_relay_admin'
            | 'igloo'
            | 'kwikset'
            | 'minut'
            | 'my_2n'
            | 'controlbyweb'
            | 'nest'
            | 'igloohome'
            | 'ecobee'
            | 'hubitat'
            | 'four_suites'
            | 'dormakaba_oracode'
            | 'pti'
            | 'wyze'
            | 'seam_passport'
            | 'yale_access'
            | 'hid_cm'
          >
        | undefined
      provider_category?:
        | ('stable' | 'consumer_smartlocks' | 'internal_beta')
        | undefined
      custom_metadata?:
        | Record<string, string | number | null | boolean>
        | undefined
      automatically_manage_new_devices?: boolean | undefined
      wait_for_device_creation?: boolean | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      connect_webview: {
        connect_webview_id: string
        connected_account_id?: string | undefined
        url: string
        workspace_id: string
        device_selection_mode: 'none' | 'single' | 'multiple'
        accepted_providers: string[]
        accepted_devices: string[]
        any_provider_allowed: boolean
        any_device_allowed: boolean
        created_at: string
        login_successful: boolean
        status: 'pending' | 'failed' | 'authorized'
        custom_redirect_url: string | null
        custom_redirect_failure_url: string | null
        custom_metadata: Record<string, string | number | null | boolean>
        automatically_manage_new_devices: boolean
        wait_for_device_creation: boolean
        authorized_at: string | null
        selected_provider: string | null
      }
    }
  }
  '/connect_webviews/delete': {
    route: '/connect_webviews/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {
      connect_webview_id: string
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/connect_webviews/get': {
    route: '/connect_webviews/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      connect_webview_id: string
    }
    formData: {}
    jsonResponse: {
      connect_webview: {
        connect_webview_id: string
        connected_account_id?: string | undefined
        url: string
        workspace_id: string
        device_selection_mode: 'none' | 'single' | 'multiple'
        accepted_providers: string[]
        accepted_devices: string[]
        any_provider_allowed: boolean
        any_device_allowed: boolean
        created_at: string
        login_successful: boolean
        status: 'pending' | 'failed' | 'authorized'
        custom_redirect_url: string | null
        custom_redirect_failure_url: string | null
        custom_metadata: Record<string, string | number | null | boolean>
        automatically_manage_new_devices: boolean
        wait_for_device_creation: boolean
        authorized_at: string | null
        selected_provider: string | null
      }
    }
  }
  '/connect_webviews/list': {
    route: '/connect_webviews/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identifier_key?: string | undefined
    }
    formData: {}
    jsonResponse: {
      connect_webviews: Array<{
        connect_webview_id: string
        connected_account_id?: string | undefined
        url: string
        workspace_id: string
        device_selection_mode: 'none' | 'single' | 'multiple'
        accepted_providers: string[]
        accepted_devices: string[]
        any_provider_allowed: boolean
        any_device_allowed: boolean
        created_at: string
        login_successful: boolean
        status: 'pending' | 'failed' | 'authorized'
        custom_redirect_url: string | null
        custom_redirect_failure_url: string | null
        custom_metadata: Record<string, string | number | null | boolean>
        automatically_manage_new_devices: boolean
        wait_for_device_creation: boolean
        authorized_at: string | null
        selected_provider: string | null
      }>
    }
  }
  '/connect_webviews/view': {
    route: '/connect_webviews/view'
    method: 'GET'
    queryParams: {
      connect_webview_id: string
      auth_token: string
    }
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/connected_accounts/delete': {
    route: '/connected_accounts/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {
      connected_account_id: string
      sync?: boolean
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/connected_accounts/get': {
    route: '/connected_accounts/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams:
      | {
          connected_account_id: string
        }
      | {
          email: string
        }
    formData: {}
    jsonResponse: {
      connected_account: {
        connected_account_id?: string | undefined
        created_at?: string | undefined
        user_identifier?:
          | {
              username?: string | undefined
              api_url?: string | undefined
              email?: string | undefined
              phone?: string | undefined
              exclusive?: boolean | undefined
            }
          | undefined
        account_type?: string | undefined
        account_type_display_name: string
        errors?: any
        warnings?: any
        custom_metadata?:
          | Record<string, string | number | boolean | null>
          | undefined
      }
    }
  }
  '/connected_accounts/list': {
    route: '/connected_accounts/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      connected_accounts: Array<{
        connected_account_id?: string | undefined
        created_at?: string | undefined
        user_identifier?:
          | {
              username?: string | undefined
              api_url?: string | undefined
              email?: string | undefined
              phone?: string | undefined
              exclusive?: boolean | undefined
            }
          | undefined
        account_type?: string | undefined
        account_type_display_name: string
        errors?: any
        warnings?: any
        custom_metadata?:
          | Record<string, string | number | boolean | null>
          | undefined
      }>
    }
  }
  '/devices/delete': {
    route: '/devices/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/devices/get': {
    route: '/devices/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id?: string | undefined
      name?: string | undefined
    }
    formData: {}
    jsonResponse: {
      device: {
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        properties: ({
          online: boolean
          name: string
          model: {
            display_name: string
            manufacturer_display_name: string
            offline_access_codes_supported?: boolean | undefined
            access_codes_supported?: boolean | undefined
            accessory_keypad_supported?: boolean | undefined
          }
          has_direct_power?: boolean | undefined
          battery_level?: number | undefined
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          serial_number?: string | undefined
          /** Currently possible to use online access codes */
          online_access_codes_enabled?: boolean | undefined
          /** Currently possible to use offline access codes */
          offline_access_codes_enabled?: boolean | undefined
          /** Deprecated: use model.offline_access_codes_enabled. */
          supports_accessory_keypad?: boolean | undefined
          /** Deprecated: use model.accessory_keypad_supported. */
          supports_offline_access_codes?: boolean | undefined
        } & {
          august_metadata?:
            | {
                lock_id: string
                lock_name: string
                house_name: string
                has_keypad: boolean
                keypad_battery_level?: string | undefined
                model?: string | undefined
                house_id?: string | undefined
              }
            | undefined
          avigilon_alta_metadata?:
            | {
                entry_name: string
                org_name: string
                zone_id: number
                zone_name: string
                site_id: number
                site_name: string
              }
            | undefined
          schlage_metadata?:
            | {
                device_id: string
                device_name: string
                access_code_length: number
                model?: string | undefined
              }
            | undefined
          smartthings_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
                location_id?: string | undefined
              }
            | undefined
          lockly_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
              }
            | undefined
          nuki_metadata?:
            | {
                device_id: string
                device_name: string
                keypad_battery_critical?: boolean | undefined
              }
            | undefined
          kwikset_metadata?:
            | {
                device_id: string
                device_name: string
                model_number: string
              }
            | undefined
          salto_metadata?:
            | {
                lock_id: string
                customer_reference: string
                lock_type: string
                battery_level: string
                locked_state: string
                model?: string | undefined
              }
            | undefined
          genie_metadata?:
            | {
                device_name: string
                door_name: string
              }
            | undefined
          brivo_metadata?:
            | {
                device_name: string
              }
            | undefined
          igloo_metadata?:
            | {
                device_id: string
                bridge_id: string
                model?: string | undefined
              }
            | undefined
          noiseaware_metadata?:
            | {
                device_model: 'indoor' | 'outdoor'
                noise_level_nrs: number
                noise_level_decibel: number
                device_name: string
                device_id: string
              }
            | undefined
          minut_metadata?:
            | {
                device_id: string
                device_name: string
                latest_sensor_values: {
                  temperature: {
                    time: string
                    value: number
                  }
                  sound: {
                    time: string
                    value: number
                  }
                  humidity: {
                    time: string
                    value: number
                  }
                  pressure: {
                    time: string
                    value: number
                  }
                  accelerometer_z: {
                    time: string
                    value: number
                  }
                }
              }
            | undefined
          four_suites_metadata?:
            | {
                device_id: number
                device_name: string
                reclose_delay_in_seconds: number
              }
            | undefined
          two_n_metadata?:
            | {
                device_id: number
                device_name: string
              }
            | undefined
          controlbyweb_metadata?:
            | {
                device_id: string
                device_name: string
                relay_name: string | null
              }
            | undefined
          ttlock_metadata?:
            | {
                lock_id: number
                lock_alias: string
              }
            | undefined
          seam_bridge_metadata?:
            | {
                unlock_method?: ('bridge' | 'doorking') | undefined
                device_num: number
                name: string
              }
            | undefined
          igloohome_metadata?:
            | {
                device_id: string
                device_name: string
                bridge_id?: string | undefined
                bridge_name?: string | undefined
              }
            | undefined
          nest_metadata?:
            | {
                nest_device_id: string
                device_name: string
                custom_name: string
              }
            | undefined
          ecobee_metadata?:
            | {
                ecobee_device_id: string
                device_name: string
              }
            | undefined
          hubitat_metadata?:
            | {
                device_id: string
                device_name: string
                device_label: string
              }
            | undefined
          dormakaba_oracode_metadata?:
            | {
                door_id: number
                door_name: string
                device_id?: number | undefined
                site_id: number
                site_name: string
              }
            | undefined
          wyze_metadata?:
            | {
                device_id: string
                device_name: string
                product_name: string
                product_type: string
                product_model: string
                device_info_model: string
              }
            | undefined
        }) &
          ({
            code_constraints?:
              | (
                  | Array<
                      | {
                          constraint_type:
                            | 'no_zeros'
                            | 'cannot_start_with_12'
                            | 'no_triple_consecutive_ints'
                            | 'cannot_specify_pin_code'
                            | 'pin_code_matches_existing_set'
                            | 'start_date_in_future'
                        }
                      | {
                          constraint_type: 'name_length'
                          min_length?: number | undefined
                          max_length?: number | undefined
                        }
                    >
                  | undefined
                )
              | undefined
            supported_code_lengths?: (number[] | undefined) | undefined
            max_active_codes_supported?: (number | undefined) | undefined
            supports_backup_access_code_pool?: (boolean | undefined) | undefined
            has_native_entry_events?: (boolean | undefined) | undefined
            locked?: (boolean | undefined) | undefined
            keypad_battery?:
              | (
                  | {
                      level: number
                    }
                  | undefined
                )
              | undefined
            door_open?: (boolean | undefined) | undefined
          } & (
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
                min_heating_cooling_delta_celsius?: number | undefined
                min_heating_cooling_delta_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: false | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: false | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
              }
          ))
        location: {
          location_name?: string | undefined
          timezone?: string | undefined
        } | null
        connected_account_id: string
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: true
      }
    }
  }
  '/devices/list': {
    route: '/devices/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      /** List all devices owned by this connected account */
      connected_account_id?: string | undefined
      connected_account_ids?: string[] | undefined
      connect_webview_id?: string | undefined
      device_type?:
        | (
            | (
                | 'akuvox_lock'
                | 'august_lock'
                | 'brivo_access_point'
                | 'butterflymx_panel'
                | 'avigilon_alta_entry'
                | 'doorking_lock'
                | 'genie_door'
                | 'igloo_lock'
                | 'linear_lock'
                | 'lockly_lock'
                | 'kwikset_lock'
                | 'nuki_lock'
                | 'salto_lock'
                | 'schlage_lock'
                | 'seam_relay'
                | 'smartthings_lock'
                | 'wyze_lock'
                | 'yale_lock'
                | 'two_n_intercom'
                | 'controlbyweb_device'
                | 'ttlock_lock'
                | 'igloohome_lock'
                | 'hubitat_lock'
                | 'four_suites_door'
                | 'dormakaba_oracode_door'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | ('ecobee_thermostat' | 'nest_thermostat')
          )
        | undefined
      device_types?:
        | Array<
            | (
                | 'akuvox_lock'
                | 'august_lock'
                | 'brivo_access_point'
                | 'butterflymx_panel'
                | 'avigilon_alta_entry'
                | 'doorking_lock'
                | 'genie_door'
                | 'igloo_lock'
                | 'linear_lock'
                | 'lockly_lock'
                | 'kwikset_lock'
                | 'nuki_lock'
                | 'salto_lock'
                | 'schlage_lock'
                | 'seam_relay'
                | 'smartthings_lock'
                | 'wyze_lock'
                | 'yale_lock'
                | 'two_n_intercom'
                | 'controlbyweb_device'
                | 'ttlock_lock'
                | 'igloohome_lock'
                | 'hubitat_lock'
                | 'four_suites_door'
                | 'dormakaba_oracode_door'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | ('ecobee_thermostat' | 'nest_thermostat')
          >
        | undefined
      manufacturer?:
        | (
            | 'akuvox'
            | 'august'
            | 'avigilon_alta'
            | 'brivo'
            | 'butterflymx'
            | 'doorking'
            | 'four_suites'
            | 'genie'
            | 'igloo'
            | 'keywe'
            | 'kwikset'
            | 'linear'
            | 'lockly'
            | 'nuki'
            | 'philia'
            | 'salto'
            | 'samsung'
            | 'schlage'
            | 'seam'
            | 'unknown'
            | 'wyze'
            | 'yale'
            | 'minut'
            | 'two_n'
            | 'ttlock'
            | 'nest'
            | 'igloohome'
            | 'ecobee'
            | 'hubitat'
            | 'controlbyweb'
            | 'smartthings'
            | 'dormakaba_oracode'
          )
        | undefined
      device_ids?: string[] | undefined
      limit?: number
      created_before?: Date | undefined
      user_identifier_key?: string | undefined
    }
    formData: {}
    jsonResponse: {
      devices: Array<{
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        properties: ({
          online: boolean
          name: string
          model: {
            display_name: string
            manufacturer_display_name: string
            offline_access_codes_supported?: boolean | undefined
            access_codes_supported?: boolean | undefined
            accessory_keypad_supported?: boolean | undefined
          }
          has_direct_power?: boolean | undefined
          battery_level?: number | undefined
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          serial_number?: string | undefined
          /** Currently possible to use online access codes */
          online_access_codes_enabled?: boolean | undefined
          /** Currently possible to use offline access codes */
          offline_access_codes_enabled?: boolean | undefined
          /** Deprecated: use model.offline_access_codes_enabled. */
          supports_accessory_keypad?: boolean | undefined
          /** Deprecated: use model.accessory_keypad_supported. */
          supports_offline_access_codes?: boolean | undefined
        } & {
          august_metadata?:
            | {
                lock_id: string
                lock_name: string
                house_name: string
                has_keypad: boolean
                keypad_battery_level?: string | undefined
                model?: string | undefined
                house_id?: string | undefined
              }
            | undefined
          avigilon_alta_metadata?:
            | {
                entry_name: string
                org_name: string
                zone_id: number
                zone_name: string
                site_id: number
                site_name: string
              }
            | undefined
          schlage_metadata?:
            | {
                device_id: string
                device_name: string
                access_code_length: number
                model?: string | undefined
              }
            | undefined
          smartthings_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
                location_id?: string | undefined
              }
            | undefined
          lockly_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
              }
            | undefined
          nuki_metadata?:
            | {
                device_id: string
                device_name: string
                keypad_battery_critical?: boolean | undefined
              }
            | undefined
          kwikset_metadata?:
            | {
                device_id: string
                device_name: string
                model_number: string
              }
            | undefined
          salto_metadata?:
            | {
                lock_id: string
                customer_reference: string
                lock_type: string
                battery_level: string
                locked_state: string
                model?: string | undefined
              }
            | undefined
          genie_metadata?:
            | {
                device_name: string
                door_name: string
              }
            | undefined
          brivo_metadata?:
            | {
                device_name: string
              }
            | undefined
          igloo_metadata?:
            | {
                device_id: string
                bridge_id: string
                model?: string | undefined
              }
            | undefined
          noiseaware_metadata?:
            | {
                device_model: 'indoor' | 'outdoor'
                noise_level_nrs: number
                noise_level_decibel: number
                device_name: string
                device_id: string
              }
            | undefined
          minut_metadata?:
            | {
                device_id: string
                device_name: string
                latest_sensor_values: {
                  temperature: {
                    time: string
                    value: number
                  }
                  sound: {
                    time: string
                    value: number
                  }
                  humidity: {
                    time: string
                    value: number
                  }
                  pressure: {
                    time: string
                    value: number
                  }
                  accelerometer_z: {
                    time: string
                    value: number
                  }
                }
              }
            | undefined
          four_suites_metadata?:
            | {
                device_id: number
                device_name: string
                reclose_delay_in_seconds: number
              }
            | undefined
          two_n_metadata?:
            | {
                device_id: number
                device_name: string
              }
            | undefined
          controlbyweb_metadata?:
            | {
                device_id: string
                device_name: string
                relay_name: string | null
              }
            | undefined
          ttlock_metadata?:
            | {
                lock_id: number
                lock_alias: string
              }
            | undefined
          seam_bridge_metadata?:
            | {
                unlock_method?: ('bridge' | 'doorking') | undefined
                device_num: number
                name: string
              }
            | undefined
          igloohome_metadata?:
            | {
                device_id: string
                device_name: string
                bridge_id?: string | undefined
                bridge_name?: string | undefined
              }
            | undefined
          nest_metadata?:
            | {
                nest_device_id: string
                device_name: string
                custom_name: string
              }
            | undefined
          ecobee_metadata?:
            | {
                ecobee_device_id: string
                device_name: string
              }
            | undefined
          hubitat_metadata?:
            | {
                device_id: string
                device_name: string
                device_label: string
              }
            | undefined
          dormakaba_oracode_metadata?:
            | {
                door_id: number
                door_name: string
                device_id?: number | undefined
                site_id: number
                site_name: string
              }
            | undefined
          wyze_metadata?:
            | {
                device_id: string
                device_name: string
                product_name: string
                product_type: string
                product_model: string
                device_info_model: string
              }
            | undefined
        }) &
          ({
            code_constraints?:
              | (
                  | Array<
                      | {
                          constraint_type:
                            | 'no_zeros'
                            | 'cannot_start_with_12'
                            | 'no_triple_consecutive_ints'
                            | 'cannot_specify_pin_code'
                            | 'pin_code_matches_existing_set'
                            | 'start_date_in_future'
                        }
                      | {
                          constraint_type: 'name_length'
                          min_length?: number | undefined
                          max_length?: number | undefined
                        }
                    >
                  | undefined
                )
              | undefined
            supported_code_lengths?: (number[] | undefined) | undefined
            max_active_codes_supported?: (number | undefined) | undefined
            supports_backup_access_code_pool?: (boolean | undefined) | undefined
            has_native_entry_events?: (boolean | undefined) | undefined
            locked?: (boolean | undefined) | undefined
            keypad_battery?:
              | (
                  | {
                      level: number
                    }
                  | undefined
                )
              | undefined
            door_open?: (boolean | undefined) | undefined
          } & (
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
                min_heating_cooling_delta_celsius?: number | undefined
                min_heating_cooling_delta_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: false | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: false | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
              }
          ))
        location: {
          location_name?: string | undefined
          timezone?: string | undefined
        } | null
        connected_account_id: string
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: true
      }>
    }
  }
  '/devices/list_device_providers': {
    route: '/devices/list_device_providers'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      provider_category?: ('stable' | 'consumer_smartlocks') | undefined
    }
    formData: {}
    jsonResponse: {
      device_providers: Array<{
        device_provider_name: string
        display_name: string
        image_url: string
        provider_categories: Array<'stable' | 'consumer_smartlocks'>
      }>
    }
  }
  '/devices/unmanaged/get': {
    route: '/devices/unmanaged/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id?: string | undefined
      name?: string | undefined
    }
    formData: {}
    jsonResponse: {
      device: {
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        connected_account_id: string
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: false
        properties: {
          name: string
          online: boolean
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          model: {
            display_name: string
            manufacturer_display_name: string
          }
        }
      }
    }
  }
  '/devices/unmanaged/list': {
    route: '/devices/unmanaged/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      /** List all devices owned by this connected account */
      connected_account_id?: string | undefined
      connected_account_ids?: string[] | undefined
      connect_webview_id?: string | undefined
      device_type?:
        | (
            | (
                | 'akuvox_lock'
                | 'august_lock'
                | 'brivo_access_point'
                | 'butterflymx_panel'
                | 'avigilon_alta_entry'
                | 'doorking_lock'
                | 'genie_door'
                | 'igloo_lock'
                | 'linear_lock'
                | 'lockly_lock'
                | 'kwikset_lock'
                | 'nuki_lock'
                | 'salto_lock'
                | 'schlage_lock'
                | 'seam_relay'
                | 'smartthings_lock'
                | 'wyze_lock'
                | 'yale_lock'
                | 'two_n_intercom'
                | 'controlbyweb_device'
                | 'ttlock_lock'
                | 'igloohome_lock'
                | 'hubitat_lock'
                | 'four_suites_door'
                | 'dormakaba_oracode_door'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | ('ecobee_thermostat' | 'nest_thermostat')
          )
        | undefined
      device_types?:
        | Array<
            | (
                | 'akuvox_lock'
                | 'august_lock'
                | 'brivo_access_point'
                | 'butterflymx_panel'
                | 'avigilon_alta_entry'
                | 'doorking_lock'
                | 'genie_door'
                | 'igloo_lock'
                | 'linear_lock'
                | 'lockly_lock'
                | 'kwikset_lock'
                | 'nuki_lock'
                | 'salto_lock'
                | 'schlage_lock'
                | 'seam_relay'
                | 'smartthings_lock'
                | 'wyze_lock'
                | 'yale_lock'
                | 'two_n_intercom'
                | 'controlbyweb_device'
                | 'ttlock_lock'
                | 'igloohome_lock'
                | 'hubitat_lock'
                | 'four_suites_door'
                | 'dormakaba_oracode_door'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | ('ecobee_thermostat' | 'nest_thermostat')
          >
        | undefined
      manufacturer?:
        | (
            | 'akuvox'
            | 'august'
            | 'avigilon_alta'
            | 'brivo'
            | 'butterflymx'
            | 'doorking'
            | 'four_suites'
            | 'genie'
            | 'igloo'
            | 'keywe'
            | 'kwikset'
            | 'linear'
            | 'lockly'
            | 'nuki'
            | 'philia'
            | 'salto'
            | 'samsung'
            | 'schlage'
            | 'seam'
            | 'unknown'
            | 'wyze'
            | 'yale'
            | 'minut'
            | 'two_n'
            | 'ttlock'
            | 'nest'
            | 'igloohome'
            | 'ecobee'
            | 'hubitat'
            | 'controlbyweb'
            | 'smartthings'
            | 'dormakaba_oracode'
          )
        | undefined
      device_ids?: string[] | undefined
      limit?: number
      created_before?: Date | undefined
      user_identifier_key?: string | undefined
    }
    formData: {}
    jsonResponse: {
      devices: Array<{
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        connected_account_id: string
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: false
        properties: {
          name: string
          online: boolean
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          model: {
            display_name: string
            manufacturer_display_name: string
          }
        }
      }>
    }
  }
  '/devices/unmanaged/update': {
    route: '/devices/unmanaged/update'
    method: 'POST' | 'PATCH'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id: string
      is_managed: true
    }
    formData: {}
    jsonResponse: {}
  }
  '/devices/update': {
    route: '/devices/update'
    method: 'POST' | 'PATCH'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id: string
      properties?:
        | {
            name?: (string | null) | undefined
          }
        | undefined
      name?: (string | null) | undefined
      location?: {} | undefined
      is_managed?: boolean
    }
    formData: {}
    jsonResponse: {}
  }
  '/events/get': {
    route: '/events/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      event_id?: string | undefined
      event_type?: string | undefined
      device_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      event?:
        | {
            event_id: string
            device_id?: string | undefined
            event_type: string
            workspace_id: string
            created_at: string
            occurred_at: string
          }
        | undefined
      message?: string | undefined
    }
  }
  '/events/list': {
    route: '/events/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      since?: string | undefined
      between?: Array<string | Date> | undefined
      device_id?: string | undefined
      device_ids?: string[] | undefined
      access_code_id?: string | undefined
      access_code_ids?: string[] | undefined
      event_type?:
        | (
            | 'device.connected'
            | 'device.unmanaged.connected'
            | 'device.disconnected'
            | 'device.unmanaged.disconnected'
            | 'device.converted_to_unmanaged'
            | 'device.unmanaged.converted_to_managed'
            | 'device.removed'
            | 'device.tampered'
            | 'device.low_battery'
            | 'device.battery_status_changed'
            | 'device.third_party_integration_detected'
            | 'device.third_party_integration_no_longer_detected'
            | 'device.salto.privacy_mode_activated'
            | 'device.salto.privacy_mode_deactivated'
            | 'device.connection_became_flaky'
            | 'device.connection_stabilized'
            | 'device.error.subscription_required'
            | 'device.error.subscription_required.resolved'
            | 'access_code.created'
            | 'access_code.changed'
            | 'access_code.scheduled_on_device'
            | 'access_code.set_on_device'
            | 'access_code.deleted'
            | 'access_code.removed_from_device'
            | 'access_code.failed_to_set_on_device'
            | 'access_code.delay_in_setting_on_device'
            | 'access_code.failed_to_remove_from_device'
            | 'access_code.delay_in_removing_from_device'
            | 'access_code.deleted_external_to_seam'
            | 'access_code.modified_external_to_seam'
            | 'access_code.unmanaged.converted_to_managed'
            | 'access_code.unmanaged.failed_to_convert_to_managed'
            | 'access_code.unmanaged.created'
            | 'access_code.unmanaged.removed'
            | 'lock.locked'
            | 'lock.unlocked'
            | 'connected_account.connected'
            | 'connected_account.successful_login'
            | 'connected_account.created'
            | 'connected_account.deleted'
            | 'connected_account.disconnected'
            | 'connected_account.completed_first_sync'
            | 'noise_sensor.noise_threshold_triggered'
            | 'access_code.backup_access_code_pulled'
          )
        | undefined
      event_types?:
        | Array<
            | 'device.connected'
            | 'device.unmanaged.connected'
            | 'device.disconnected'
            | 'device.unmanaged.disconnected'
            | 'device.converted_to_unmanaged'
            | 'device.unmanaged.converted_to_managed'
            | 'device.removed'
            | 'device.tampered'
            | 'device.low_battery'
            | 'device.battery_status_changed'
            | 'device.third_party_integration_detected'
            | 'device.third_party_integration_no_longer_detected'
            | 'device.salto.privacy_mode_activated'
            | 'device.salto.privacy_mode_deactivated'
            | 'device.connection_became_flaky'
            | 'device.connection_stabilized'
            | 'device.error.subscription_required'
            | 'device.error.subscription_required.resolved'
            | 'access_code.created'
            | 'access_code.changed'
            | 'access_code.scheduled_on_device'
            | 'access_code.set_on_device'
            | 'access_code.deleted'
            | 'access_code.removed_from_device'
            | 'access_code.failed_to_set_on_device'
            | 'access_code.delay_in_setting_on_device'
            | 'access_code.failed_to_remove_from_device'
            | 'access_code.delay_in_removing_from_device'
            | 'access_code.deleted_external_to_seam'
            | 'access_code.modified_external_to_seam'
            | 'access_code.unmanaged.converted_to_managed'
            | 'access_code.unmanaged.failed_to_convert_to_managed'
            | 'access_code.unmanaged.created'
            | 'access_code.unmanaged.removed'
            | 'lock.locked'
            | 'lock.unlocked'
            | 'connected_account.connected'
            | 'connected_account.successful_login'
            | 'connected_account.created'
            | 'connected_account.deleted'
            | 'connected_account.disconnected'
            | 'connected_account.completed_first_sync'
            | 'noise_sensor.noise_threshold_triggered'
            | 'access_code.backup_access_code_pulled'
          >
        | undefined
      connected_account_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      events?:
        | Array<{
            event_id: string
            device_id?: string | undefined
            event_type: string
            workspace_id: string
            created_at: string
            occurred_at: string
          }>
        | undefined
      message?: string | undefined
    }
  }
  '/health': {
    route: '/health'
    method: 'GET'
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      ok: boolean
      msg: 'I\u2019m one with the Force. The Force is with me.'
      last_service_evaluation_at?: string | undefined
      service_health_statuses: Array<{
        service: string
        status: 'healthy' | 'degraded' | 'down'
        description: string
      }>
    }
  }
  '/health/get_health': {
    route: '/health/get_health'
    method: 'GET'
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      ok: boolean
      msg: 'I\u2019m one with the Force. The Force is with me.'
      last_service_evaluation_at?: string | undefined
      service_health_statuses: Array<{
        service: string
        status: 'healthy' | 'degraded' | 'down'
        description: string
      }>
    }
  }
  '/health/get_service_health': {
    route: '/health/get_service_health'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      service: string
    }
    formData: {}
    jsonResponse: {
      ok: true
      last_service_evaluation_at: string
      service_health: {
        service: string
        status: 'healthy' | 'degraded' | 'down'
        description: string
      }
    }
  }
  '/health/service/[service_name]': {
    route: '/health/service/[service_name]'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      service_name: string
    }
    formData: {}
    jsonResponse: {
      ok: true
      last_service_evaluation_at: string
      service_health: {
        service: string
        status: 'healthy' | 'degraded' | 'down'
        description: string
      }
    }
  }
  '/locks/get': {
    route: '/locks/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id?: string | undefined
      name?: string | undefined
    }
    formData: {}
    jsonResponse: {
      lock: {
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        properties: ({
          online: boolean
          name: string
          model: {
            display_name: string
            manufacturer_display_name: string
            offline_access_codes_supported?: boolean | undefined
            access_codes_supported?: boolean | undefined
            accessory_keypad_supported?: boolean | undefined
          }
          has_direct_power?: boolean | undefined
          battery_level?: number | undefined
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          serial_number?: string | undefined
          /** Currently possible to use online access codes */
          online_access_codes_enabled?: boolean | undefined
          /** Currently possible to use offline access codes */
          offline_access_codes_enabled?: boolean | undefined
          /** Deprecated: use model.offline_access_codes_enabled. */
          supports_accessory_keypad?: boolean | undefined
          /** Deprecated: use model.accessory_keypad_supported. */
          supports_offline_access_codes?: boolean | undefined
        } & {
          august_metadata?:
            | {
                lock_id: string
                lock_name: string
                house_name: string
                has_keypad: boolean
                keypad_battery_level?: string | undefined
                model?: string | undefined
                house_id?: string | undefined
              }
            | undefined
          avigilon_alta_metadata?:
            | {
                entry_name: string
                org_name: string
                zone_id: number
                zone_name: string
                site_id: number
                site_name: string
              }
            | undefined
          schlage_metadata?:
            | {
                device_id: string
                device_name: string
                access_code_length: number
                model?: string | undefined
              }
            | undefined
          smartthings_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
                location_id?: string | undefined
              }
            | undefined
          lockly_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
              }
            | undefined
          nuki_metadata?:
            | {
                device_id: string
                device_name: string
                keypad_battery_critical?: boolean | undefined
              }
            | undefined
          kwikset_metadata?:
            | {
                device_id: string
                device_name: string
                model_number: string
              }
            | undefined
          salto_metadata?:
            | {
                lock_id: string
                customer_reference: string
                lock_type: string
                battery_level: string
                locked_state: string
                model?: string | undefined
              }
            | undefined
          genie_metadata?:
            | {
                device_name: string
                door_name: string
              }
            | undefined
          brivo_metadata?:
            | {
                device_name: string
              }
            | undefined
          igloo_metadata?:
            | {
                device_id: string
                bridge_id: string
                model?: string | undefined
              }
            | undefined
          noiseaware_metadata?:
            | {
                device_model: 'indoor' | 'outdoor'
                noise_level_nrs: number
                noise_level_decibel: number
                device_name: string
                device_id: string
              }
            | undefined
          minut_metadata?:
            | {
                device_id: string
                device_name: string
                latest_sensor_values: {
                  temperature: {
                    time: string
                    value: number
                  }
                  sound: {
                    time: string
                    value: number
                  }
                  humidity: {
                    time: string
                    value: number
                  }
                  pressure: {
                    time: string
                    value: number
                  }
                  accelerometer_z: {
                    time: string
                    value: number
                  }
                }
              }
            | undefined
          four_suites_metadata?:
            | {
                device_id: number
                device_name: string
                reclose_delay_in_seconds: number
              }
            | undefined
          two_n_metadata?:
            | {
                device_id: number
                device_name: string
              }
            | undefined
          controlbyweb_metadata?:
            | {
                device_id: string
                device_name: string
                relay_name: string | null
              }
            | undefined
          ttlock_metadata?:
            | {
                lock_id: number
                lock_alias: string
              }
            | undefined
          seam_bridge_metadata?:
            | {
                unlock_method?: ('bridge' | 'doorking') | undefined
                device_num: number
                name: string
              }
            | undefined
          igloohome_metadata?:
            | {
                device_id: string
                device_name: string
                bridge_id?: string | undefined
                bridge_name?: string | undefined
              }
            | undefined
          nest_metadata?:
            | {
                nest_device_id: string
                device_name: string
                custom_name: string
              }
            | undefined
          ecobee_metadata?:
            | {
                ecobee_device_id: string
                device_name: string
              }
            | undefined
          hubitat_metadata?:
            | {
                device_id: string
                device_name: string
                device_label: string
              }
            | undefined
          dormakaba_oracode_metadata?:
            | {
                door_id: number
                door_name: string
                device_id?: number | undefined
                site_id: number
                site_name: string
              }
            | undefined
          wyze_metadata?:
            | {
                device_id: string
                device_name: string
                product_name: string
                product_type: string
                product_model: string
                device_info_model: string
              }
            | undefined
        }) &
          ({
            code_constraints?:
              | (
                  | Array<
                      | {
                          constraint_type:
                            | 'no_zeros'
                            | 'cannot_start_with_12'
                            | 'no_triple_consecutive_ints'
                            | 'cannot_specify_pin_code'
                            | 'pin_code_matches_existing_set'
                            | 'start_date_in_future'
                        }
                      | {
                          constraint_type: 'name_length'
                          min_length?: number | undefined
                          max_length?: number | undefined
                        }
                    >
                  | undefined
                )
              | undefined
            supported_code_lengths?: (number[] | undefined) | undefined
            max_active_codes_supported?: (number | undefined) | undefined
            supports_backup_access_code_pool?: (boolean | undefined) | undefined
            has_native_entry_events?: (boolean | undefined) | undefined
            locked?: (boolean | undefined) | undefined
            keypad_battery?:
              | (
                  | {
                      level: number
                    }
                  | undefined
                )
              | undefined
            door_open?: (boolean | undefined) | undefined
          } & (
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
                min_heating_cooling_delta_celsius?: number | undefined
                min_heating_cooling_delta_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: false | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: false | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
              }
          ))
        location: {
          location_name?: string | undefined
          timezone?: string | undefined
        } | null
        connected_account_id: string
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: true
      }
      device: {
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        properties: ({
          online: boolean
          name: string
          model: {
            display_name: string
            manufacturer_display_name: string
            offline_access_codes_supported?: boolean | undefined
            access_codes_supported?: boolean | undefined
            accessory_keypad_supported?: boolean | undefined
          }
          has_direct_power?: boolean | undefined
          battery_level?: number | undefined
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          serial_number?: string | undefined
          /** Currently possible to use online access codes */
          online_access_codes_enabled?: boolean | undefined
          /** Currently possible to use offline access codes */
          offline_access_codes_enabled?: boolean | undefined
          /** Deprecated: use model.offline_access_codes_enabled. */
          supports_accessory_keypad?: boolean | undefined
          /** Deprecated: use model.accessory_keypad_supported. */
          supports_offline_access_codes?: boolean | undefined
        } & {
          august_metadata?:
            | {
                lock_id: string
                lock_name: string
                house_name: string
                has_keypad: boolean
                keypad_battery_level?: string | undefined
                model?: string | undefined
                house_id?: string | undefined
              }
            | undefined
          avigilon_alta_metadata?:
            | {
                entry_name: string
                org_name: string
                zone_id: number
                zone_name: string
                site_id: number
                site_name: string
              }
            | undefined
          schlage_metadata?:
            | {
                device_id: string
                device_name: string
                access_code_length: number
                model?: string | undefined
              }
            | undefined
          smartthings_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
                location_id?: string | undefined
              }
            | undefined
          lockly_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
              }
            | undefined
          nuki_metadata?:
            | {
                device_id: string
                device_name: string
                keypad_battery_critical?: boolean | undefined
              }
            | undefined
          kwikset_metadata?:
            | {
                device_id: string
                device_name: string
                model_number: string
              }
            | undefined
          salto_metadata?:
            | {
                lock_id: string
                customer_reference: string
                lock_type: string
                battery_level: string
                locked_state: string
                model?: string | undefined
              }
            | undefined
          genie_metadata?:
            | {
                device_name: string
                door_name: string
              }
            | undefined
          brivo_metadata?:
            | {
                device_name: string
              }
            | undefined
          igloo_metadata?:
            | {
                device_id: string
                bridge_id: string
                model?: string | undefined
              }
            | undefined
          noiseaware_metadata?:
            | {
                device_model: 'indoor' | 'outdoor'
                noise_level_nrs: number
                noise_level_decibel: number
                device_name: string
                device_id: string
              }
            | undefined
          minut_metadata?:
            | {
                device_id: string
                device_name: string
                latest_sensor_values: {
                  temperature: {
                    time: string
                    value: number
                  }
                  sound: {
                    time: string
                    value: number
                  }
                  humidity: {
                    time: string
                    value: number
                  }
                  pressure: {
                    time: string
                    value: number
                  }
                  accelerometer_z: {
                    time: string
                    value: number
                  }
                }
              }
            | undefined
          four_suites_metadata?:
            | {
                device_id: number
                device_name: string
                reclose_delay_in_seconds: number
              }
            | undefined
          two_n_metadata?:
            | {
                device_id: number
                device_name: string
              }
            | undefined
          controlbyweb_metadata?:
            | {
                device_id: string
                device_name: string
                relay_name: string | null
              }
            | undefined
          ttlock_metadata?:
            | {
                lock_id: number
                lock_alias: string
              }
            | undefined
          seam_bridge_metadata?:
            | {
                unlock_method?: ('bridge' | 'doorking') | undefined
                device_num: number
                name: string
              }
            | undefined
          igloohome_metadata?:
            | {
                device_id: string
                device_name: string
                bridge_id?: string | undefined
                bridge_name?: string | undefined
              }
            | undefined
          nest_metadata?:
            | {
                nest_device_id: string
                device_name: string
                custom_name: string
              }
            | undefined
          ecobee_metadata?:
            | {
                ecobee_device_id: string
                device_name: string
              }
            | undefined
          hubitat_metadata?:
            | {
                device_id: string
                device_name: string
                device_label: string
              }
            | undefined
          dormakaba_oracode_metadata?:
            | {
                door_id: number
                door_name: string
                device_id?: number | undefined
                site_id: number
                site_name: string
              }
            | undefined
          wyze_metadata?:
            | {
                device_id: string
                device_name: string
                product_name: string
                product_type: string
                product_model: string
                device_info_model: string
              }
            | undefined
        }) &
          ({
            code_constraints?:
              | (
                  | Array<
                      | {
                          constraint_type:
                            | 'no_zeros'
                            | 'cannot_start_with_12'
                            | 'no_triple_consecutive_ints'
                            | 'cannot_specify_pin_code'
                            | 'pin_code_matches_existing_set'
                            | 'start_date_in_future'
                        }
                      | {
                          constraint_type: 'name_length'
                          min_length?: number | undefined
                          max_length?: number | undefined
                        }
                    >
                  | undefined
                )
              | undefined
            supported_code_lengths?: (number[] | undefined) | undefined
            max_active_codes_supported?: (number | undefined) | undefined
            supports_backup_access_code_pool?: (boolean | undefined) | undefined
            has_native_entry_events?: (boolean | undefined) | undefined
            locked?: (boolean | undefined) | undefined
            keypad_battery?:
              | (
                  | {
                      level: number
                    }
                  | undefined
                )
              | undefined
            door_open?: (boolean | undefined) | undefined
          } & (
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
                min_heating_cooling_delta_celsius?: number | undefined
                min_heating_cooling_delta_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: false | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: false | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
              }
          ))
        location: {
          location_name?: string | undefined
          timezone?: string | undefined
        } | null
        connected_account_id: string
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: true
      }
    }
  }
  '/locks/list': {
    route: '/locks/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      /** List all devices owned by this connected account */
      connected_account_id?: string | undefined
      connected_account_ids?: string[] | undefined
      connect_webview_id?: string | undefined
      device_type?:
        | (
            | (
                | 'akuvox_lock'
                | 'august_lock'
                | 'brivo_access_point'
                | 'butterflymx_panel'
                | 'avigilon_alta_entry'
                | 'doorking_lock'
                | 'genie_door'
                | 'igloo_lock'
                | 'linear_lock'
                | 'lockly_lock'
                | 'kwikset_lock'
                | 'nuki_lock'
                | 'salto_lock'
                | 'schlage_lock'
                | 'seam_relay'
                | 'smartthings_lock'
                | 'wyze_lock'
                | 'yale_lock'
                | 'two_n_intercom'
                | 'controlbyweb_device'
                | 'ttlock_lock'
                | 'igloohome_lock'
                | 'hubitat_lock'
                | 'four_suites_door'
                | 'dormakaba_oracode_door'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | ('ecobee_thermostat' | 'nest_thermostat')
          )
        | undefined
      device_types?:
        | Array<
            | (
                | 'akuvox_lock'
                | 'august_lock'
                | 'brivo_access_point'
                | 'butterflymx_panel'
                | 'avigilon_alta_entry'
                | 'doorking_lock'
                | 'genie_door'
                | 'igloo_lock'
                | 'linear_lock'
                | 'lockly_lock'
                | 'kwikset_lock'
                | 'nuki_lock'
                | 'salto_lock'
                | 'schlage_lock'
                | 'seam_relay'
                | 'smartthings_lock'
                | 'wyze_lock'
                | 'yale_lock'
                | 'two_n_intercom'
                | 'controlbyweb_device'
                | 'ttlock_lock'
                | 'igloohome_lock'
                | 'hubitat_lock'
                | 'four_suites_door'
                | 'dormakaba_oracode_door'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | ('ecobee_thermostat' | 'nest_thermostat')
          >
        | undefined
      manufacturer?:
        | (
            | 'akuvox'
            | 'august'
            | 'avigilon_alta'
            | 'brivo'
            | 'butterflymx'
            | 'doorking'
            | 'four_suites'
            | 'genie'
            | 'igloo'
            | 'keywe'
            | 'kwikset'
            | 'linear'
            | 'lockly'
            | 'nuki'
            | 'philia'
            | 'salto'
            | 'samsung'
            | 'schlage'
            | 'seam'
            | 'unknown'
            | 'wyze'
            | 'yale'
            | 'minut'
            | 'two_n'
            | 'ttlock'
            | 'nest'
            | 'igloohome'
            | 'ecobee'
            | 'hubitat'
            | 'controlbyweb'
            | 'smartthings'
            | 'dormakaba_oracode'
          )
        | undefined
      device_ids?: string[] | undefined
      limit?: number
      created_before?: Date | undefined
      user_identifier_key?: string | undefined
    }
    formData: {}
    jsonResponse: {
      locks: Array<{
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        properties: ({
          online: boolean
          name: string
          model: {
            display_name: string
            manufacturer_display_name: string
            offline_access_codes_supported?: boolean | undefined
            access_codes_supported?: boolean | undefined
            accessory_keypad_supported?: boolean | undefined
          }
          has_direct_power?: boolean | undefined
          battery_level?: number | undefined
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          serial_number?: string | undefined
          /** Currently possible to use online access codes */
          online_access_codes_enabled?: boolean | undefined
          /** Currently possible to use offline access codes */
          offline_access_codes_enabled?: boolean | undefined
          /** Deprecated: use model.offline_access_codes_enabled. */
          supports_accessory_keypad?: boolean | undefined
          /** Deprecated: use model.accessory_keypad_supported. */
          supports_offline_access_codes?: boolean | undefined
        } & {
          august_metadata?:
            | {
                lock_id: string
                lock_name: string
                house_name: string
                has_keypad: boolean
                keypad_battery_level?: string | undefined
                model?: string | undefined
                house_id?: string | undefined
              }
            | undefined
          avigilon_alta_metadata?:
            | {
                entry_name: string
                org_name: string
                zone_id: number
                zone_name: string
                site_id: number
                site_name: string
              }
            | undefined
          schlage_metadata?:
            | {
                device_id: string
                device_name: string
                access_code_length: number
                model?: string | undefined
              }
            | undefined
          smartthings_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
                location_id?: string | undefined
              }
            | undefined
          lockly_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
              }
            | undefined
          nuki_metadata?:
            | {
                device_id: string
                device_name: string
                keypad_battery_critical?: boolean | undefined
              }
            | undefined
          kwikset_metadata?:
            | {
                device_id: string
                device_name: string
                model_number: string
              }
            | undefined
          salto_metadata?:
            | {
                lock_id: string
                customer_reference: string
                lock_type: string
                battery_level: string
                locked_state: string
                model?: string | undefined
              }
            | undefined
          genie_metadata?:
            | {
                device_name: string
                door_name: string
              }
            | undefined
          brivo_metadata?:
            | {
                device_name: string
              }
            | undefined
          igloo_metadata?:
            | {
                device_id: string
                bridge_id: string
                model?: string | undefined
              }
            | undefined
          noiseaware_metadata?:
            | {
                device_model: 'indoor' | 'outdoor'
                noise_level_nrs: number
                noise_level_decibel: number
                device_name: string
                device_id: string
              }
            | undefined
          minut_metadata?:
            | {
                device_id: string
                device_name: string
                latest_sensor_values: {
                  temperature: {
                    time: string
                    value: number
                  }
                  sound: {
                    time: string
                    value: number
                  }
                  humidity: {
                    time: string
                    value: number
                  }
                  pressure: {
                    time: string
                    value: number
                  }
                  accelerometer_z: {
                    time: string
                    value: number
                  }
                }
              }
            | undefined
          four_suites_metadata?:
            | {
                device_id: number
                device_name: string
                reclose_delay_in_seconds: number
              }
            | undefined
          two_n_metadata?:
            | {
                device_id: number
                device_name: string
              }
            | undefined
          controlbyweb_metadata?:
            | {
                device_id: string
                device_name: string
                relay_name: string | null
              }
            | undefined
          ttlock_metadata?:
            | {
                lock_id: number
                lock_alias: string
              }
            | undefined
          seam_bridge_metadata?:
            | {
                unlock_method?: ('bridge' | 'doorking') | undefined
                device_num: number
                name: string
              }
            | undefined
          igloohome_metadata?:
            | {
                device_id: string
                device_name: string
                bridge_id?: string | undefined
                bridge_name?: string | undefined
              }
            | undefined
          nest_metadata?:
            | {
                nest_device_id: string
                device_name: string
                custom_name: string
              }
            | undefined
          ecobee_metadata?:
            | {
                ecobee_device_id: string
                device_name: string
              }
            | undefined
          hubitat_metadata?:
            | {
                device_id: string
                device_name: string
                device_label: string
              }
            | undefined
          dormakaba_oracode_metadata?:
            | {
                door_id: number
                door_name: string
                device_id?: number | undefined
                site_id: number
                site_name: string
              }
            | undefined
          wyze_metadata?:
            | {
                device_id: string
                device_name: string
                product_name: string
                product_type: string
                product_model: string
                device_info_model: string
              }
            | undefined
        }) &
          ({
            code_constraints?:
              | (
                  | Array<
                      | {
                          constraint_type:
                            | 'no_zeros'
                            | 'cannot_start_with_12'
                            | 'no_triple_consecutive_ints'
                            | 'cannot_specify_pin_code'
                            | 'pin_code_matches_existing_set'
                            | 'start_date_in_future'
                        }
                      | {
                          constraint_type: 'name_length'
                          min_length?: number | undefined
                          max_length?: number | undefined
                        }
                    >
                  | undefined
                )
              | undefined
            supported_code_lengths?: (number[] | undefined) | undefined
            max_active_codes_supported?: (number | undefined) | undefined
            supports_backup_access_code_pool?: (boolean | undefined) | undefined
            has_native_entry_events?: (boolean | undefined) | undefined
            locked?: (boolean | undefined) | undefined
            keypad_battery?:
              | (
                  | {
                      level: number
                    }
                  | undefined
                )
              | undefined
            door_open?: (boolean | undefined) | undefined
          } & (
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
                min_heating_cooling_delta_celsius?: number | undefined
                min_heating_cooling_delta_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: false | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: false | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
              }
          ))
        location: {
          location_name?: string | undefined
          timezone?: string | undefined
        } | null
        connected_account_id: string
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: true
      }>
      devices: Array<{
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        properties: ({
          online: boolean
          name: string
          model: {
            display_name: string
            manufacturer_display_name: string
            offline_access_codes_supported?: boolean | undefined
            access_codes_supported?: boolean | undefined
            accessory_keypad_supported?: boolean | undefined
          }
          has_direct_power?: boolean | undefined
          battery_level?: number | undefined
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          serial_number?: string | undefined
          /** Currently possible to use online access codes */
          online_access_codes_enabled?: boolean | undefined
          /** Currently possible to use offline access codes */
          offline_access_codes_enabled?: boolean | undefined
          /** Deprecated: use model.offline_access_codes_enabled. */
          supports_accessory_keypad?: boolean | undefined
          /** Deprecated: use model.accessory_keypad_supported. */
          supports_offline_access_codes?: boolean | undefined
        } & {
          august_metadata?:
            | {
                lock_id: string
                lock_name: string
                house_name: string
                has_keypad: boolean
                keypad_battery_level?: string | undefined
                model?: string | undefined
                house_id?: string | undefined
              }
            | undefined
          avigilon_alta_metadata?:
            | {
                entry_name: string
                org_name: string
                zone_id: number
                zone_name: string
                site_id: number
                site_name: string
              }
            | undefined
          schlage_metadata?:
            | {
                device_id: string
                device_name: string
                access_code_length: number
                model?: string | undefined
              }
            | undefined
          smartthings_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
                location_id?: string | undefined
              }
            | undefined
          lockly_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
              }
            | undefined
          nuki_metadata?:
            | {
                device_id: string
                device_name: string
                keypad_battery_critical?: boolean | undefined
              }
            | undefined
          kwikset_metadata?:
            | {
                device_id: string
                device_name: string
                model_number: string
              }
            | undefined
          salto_metadata?:
            | {
                lock_id: string
                customer_reference: string
                lock_type: string
                battery_level: string
                locked_state: string
                model?: string | undefined
              }
            | undefined
          genie_metadata?:
            | {
                device_name: string
                door_name: string
              }
            | undefined
          brivo_metadata?:
            | {
                device_name: string
              }
            | undefined
          igloo_metadata?:
            | {
                device_id: string
                bridge_id: string
                model?: string | undefined
              }
            | undefined
          noiseaware_metadata?:
            | {
                device_model: 'indoor' | 'outdoor'
                noise_level_nrs: number
                noise_level_decibel: number
                device_name: string
                device_id: string
              }
            | undefined
          minut_metadata?:
            | {
                device_id: string
                device_name: string
                latest_sensor_values: {
                  temperature: {
                    time: string
                    value: number
                  }
                  sound: {
                    time: string
                    value: number
                  }
                  humidity: {
                    time: string
                    value: number
                  }
                  pressure: {
                    time: string
                    value: number
                  }
                  accelerometer_z: {
                    time: string
                    value: number
                  }
                }
              }
            | undefined
          four_suites_metadata?:
            | {
                device_id: number
                device_name: string
                reclose_delay_in_seconds: number
              }
            | undefined
          two_n_metadata?:
            | {
                device_id: number
                device_name: string
              }
            | undefined
          controlbyweb_metadata?:
            | {
                device_id: string
                device_name: string
                relay_name: string | null
              }
            | undefined
          ttlock_metadata?:
            | {
                lock_id: number
                lock_alias: string
              }
            | undefined
          seam_bridge_metadata?:
            | {
                unlock_method?: ('bridge' | 'doorking') | undefined
                device_num: number
                name: string
              }
            | undefined
          igloohome_metadata?:
            | {
                device_id: string
                device_name: string
                bridge_id?: string | undefined
                bridge_name?: string | undefined
              }
            | undefined
          nest_metadata?:
            | {
                nest_device_id: string
                device_name: string
                custom_name: string
              }
            | undefined
          ecobee_metadata?:
            | {
                ecobee_device_id: string
                device_name: string
              }
            | undefined
          hubitat_metadata?:
            | {
                device_id: string
                device_name: string
                device_label: string
              }
            | undefined
          dormakaba_oracode_metadata?:
            | {
                door_id: number
                door_name: string
                device_id?: number | undefined
                site_id: number
                site_name: string
              }
            | undefined
          wyze_metadata?:
            | {
                device_id: string
                device_name: string
                product_name: string
                product_type: string
                product_model: string
                device_info_model: string
              }
            | undefined
        }) &
          ({
            code_constraints?:
              | (
                  | Array<
                      | {
                          constraint_type:
                            | 'no_zeros'
                            | 'cannot_start_with_12'
                            | 'no_triple_consecutive_ints'
                            | 'cannot_specify_pin_code'
                            | 'pin_code_matches_existing_set'
                            | 'start_date_in_future'
                        }
                      | {
                          constraint_type: 'name_length'
                          min_length?: number | undefined
                          max_length?: number | undefined
                        }
                    >
                  | undefined
                )
              | undefined
            supported_code_lengths?: (number[] | undefined) | undefined
            max_active_codes_supported?: (number | undefined) | undefined
            supports_backup_access_code_pool?: (boolean | undefined) | undefined
            has_native_entry_events?: (boolean | undefined) | undefined
            locked?: (boolean | undefined) | undefined
            keypad_battery?:
              | (
                  | {
                      level: number
                    }
                  | undefined
                )
              | undefined
            door_open?: (boolean | undefined) | undefined
          } & (
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
                min_heating_cooling_delta_celsius?: number | undefined
                min_heating_cooling_delta_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: false | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: false | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
              }
          ))
        location: {
          location_name?: string | undefined
          timezone?: string | undefined
        } | null
        connected_account_id: string
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: true
      }>
    }
  }
  '/locks/lock_door': {
    route: '/locks/lock_door'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      sync?: boolean
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      action_attempt:
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
    }
  }
  '/locks/unlock_door': {
    route: '/locks/unlock_door'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      sync?: boolean
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      action_attempt:
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
    }
  }
  '/noise_sensors/noise_thresholds/create': {
    route: '/noise_sensors/noise_thresholds/create'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      sync?: boolean
      name?: string | undefined
      starts_daily_at: string
      ends_daily_at: string
      noise_threshold_decibels?: number | undefined
      noise_threshold_nrs?: number | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      action_attempt:
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
    }
  }
  '/noise_sensors/noise_thresholds/delete': {
    route: '/noise_sensors/noise_thresholds/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {
      noise_threshold_id: string
      device_id: string
      sync?: boolean
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      action_attempt:
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
    }
  }
  '/noise_sensors/noise_thresholds/get': {
    route: '/noise_sensors/noise_thresholds/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      noise_threshold_id: string
    }
    formData: {}
    jsonResponse: {
      noise_threshold: {
        noise_threshold_id: string
        device_id: string
        name: string
        noise_threshold_nrs?: number | undefined
        starts_daily_at: string
        ends_daily_at: string
        noise_threshold_decibels: number
      }
    }
  }
  '/noise_sensors/noise_thresholds/list': {
    route: '/noise_sensors/noise_thresholds/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id: string
    }
    formData: {}
    jsonResponse: {
      noise_thresholds: Array<{
        noise_threshold_id: string
        device_id: string
        name: string
        noise_threshold_nrs?: number | undefined
        starts_daily_at: string
        ends_daily_at: string
        noise_threshold_decibels: number
      }>
    }
  }
  '/noise_sensors/noise_thresholds/update': {
    route: '/noise_sensors/noise_thresholds/update'
    method: 'PATCH' | 'POST' | 'PUT'
    queryParams: {}
    jsonBody: {
      noise_threshold_id: string
      device_id: string
      sync?: boolean
      name?: string | undefined
      starts_daily_at?: string | undefined
      ends_daily_at?: string | undefined
      noise_threshold_decibels?: number | undefined
      noise_threshold_nrs?: number | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      action_attempt:
        | {
            status: 'success'
            action_type: string
            action_attempt_id: string
            result?: any
            error: null
          }
        | {
            status: 'pending'
            action_type: string
            action_attempt_id: string
            result: null
            error: null
          }
        | {
            status: 'error'
            action_type: string
            action_attempt_id: string
            result: null
            error: {
              type: string
              message: string
            }
          }
    }
  }
  '/noise_sensors/simulate/trigger_noise_threshold': {
    route: '/noise_sensors/simulate/trigger_noise_threshold'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/thermostats/climate_setting_schedules/create': {
    route: '/thermostats/climate_setting_schedules/create'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      schedule_type?: 'time_bound'
      device_id: string
      name?: string | undefined
      schedule_starts_at: string
      schedule_ends_at: string
      automatic_heating_enabled?: boolean | undefined
      automatic_cooling_enabled?: boolean | undefined
      hvac_mode_setting?: ('off' | 'heat' | 'cool' | 'heat_cool') | undefined
      cooling_set_point_celsius?: (number | undefined) | undefined
      heating_set_point_celsius?: (number | undefined) | undefined
      cooling_set_point_fahrenheit?: (number | undefined) | undefined
      heating_set_point_fahrenheit?: (number | undefined) | undefined
      manual_override_allowed?: boolean | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      climate_setting_schedule: {
        climate_setting_schedule_id: string
        schedule_type: 'time_bound'
        device_id: string
        name?: string | undefined
        schedule_starts_at: string
        schedule_ends_at: string
        created_at: string
        automatic_heating_enabled?: boolean | undefined
        automatic_cooling_enabled?: boolean | undefined
        hvac_mode_setting?: ('off' | 'heat' | 'cool' | 'heat_cool') | undefined
        cooling_set_point_celsius?: (number | undefined) | undefined
        heating_set_point_celsius?: (number | undefined) | undefined
        cooling_set_point_fahrenheit?: (number | undefined) | undefined
        heating_set_point_fahrenheit?: (number | undefined) | undefined
        manual_override_allowed?: boolean | undefined
      }
    }
  }
  '/thermostats/climate_setting_schedules/delete': {
    route: '/thermostats/climate_setting_schedules/delete'
    method: 'DELETE' | 'POST' | 'PUT'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      climate_setting_schedule_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/thermostats/climate_setting_schedules/get': {
    route: '/thermostats/climate_setting_schedules/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      climate_setting_schedule_id?: string | undefined
      device_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      climate_setting_schedule: {
        climate_setting_schedule_id: string
        schedule_type: 'time_bound'
        device_id: string
        name?: string | undefined
        schedule_starts_at: string
        schedule_ends_at: string
        created_at: string
        automatic_heating_enabled?: boolean | undefined
        automatic_cooling_enabled?: boolean | undefined
        hvac_mode_setting?: ('off' | 'heat' | 'cool' | 'heat_cool') | undefined
        cooling_set_point_celsius?: (number | undefined) | undefined
        heating_set_point_celsius?: (number | undefined) | undefined
        cooling_set_point_fahrenheit?: (number | undefined) | undefined
        heating_set_point_fahrenheit?: (number | undefined) | undefined
        manual_override_allowed?: boolean | undefined
      }
    }
  }
  '/thermostats/climate_setting_schedules/list': {
    route: '/thermostats/climate_setting_schedules/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id: string
      user_identifier_key?: string | undefined
    }
    formData: {}
    jsonResponse: {
      climate_setting_schedules: Array<{
        climate_setting_schedule_id: string
        schedule_type: 'time_bound'
        device_id: string
        name?: string | undefined
        schedule_starts_at: string
        schedule_ends_at: string
        created_at: string
        automatic_heating_enabled?: boolean | undefined
        automatic_cooling_enabled?: boolean | undefined
        hvac_mode_setting?: ('off' | 'heat' | 'cool' | 'heat_cool') | undefined
        cooling_set_point_celsius?: (number | undefined) | undefined
        heating_set_point_celsius?: (number | undefined) | undefined
        cooling_set_point_fahrenheit?: (number | undefined) | undefined
        heating_set_point_fahrenheit?: (number | undefined) | undefined
        manual_override_allowed?: boolean | undefined
      }>
    }
  }
  '/thermostats/climate_setting_schedules/update': {
    route: '/thermostats/climate_setting_schedules/update'
    method: 'PATCH' | 'POST' | 'PUT'
    queryParams: {}
    jsonBody: {
      climate_setting_schedule_id: string
      schedule_type?: 'time_bound'
      name?: string | undefined
      schedule_starts_at?: string | undefined
      schedule_ends_at?: string | undefined
      automatic_heating_enabled?: boolean | undefined
      automatic_cooling_enabled?: boolean | undefined
      hvac_mode_setting?: ('off' | 'heat' | 'cool' | 'heat_cool') | undefined
      cooling_set_point_celsius?: (number | undefined) | undefined
      heating_set_point_celsius?: (number | undefined) | undefined
      cooling_set_point_fahrenheit?: (number | undefined) | undefined
      heating_set_point_fahrenheit?: (number | undefined) | undefined
      manual_override_allowed?: boolean | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      climate_setting_schedule: {
        climate_setting_schedule_id: string
        schedule_type: 'time_bound'
        device_id: string
        name?: string | undefined
        schedule_starts_at: string
        schedule_ends_at: string
        created_at: string
        automatic_heating_enabled?: boolean | undefined
        automatic_cooling_enabled?: boolean | undefined
        hvac_mode_setting?: ('off' | 'heat' | 'cool' | 'heat_cool') | undefined
        cooling_set_point_celsius?: (number | undefined) | undefined
        heating_set_point_celsius?: (number | undefined) | undefined
        cooling_set_point_fahrenheit?: (number | undefined) | undefined
        heating_set_point_fahrenheit?: (number | undefined) | undefined
        manual_override_allowed?: boolean | undefined
      }
    }
  }
  '/thermostats/cool': {
    route: '/thermostats/cool'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      cooling_set_point_celsius?: number | undefined
      cooling_set_point_fahrenheit?: number | undefined
      sync?: boolean
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/thermostats/get': {
    route: '/thermostats/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      device_id?: string | undefined
      name?: string | undefined
    }
    formData: {}
    jsonResponse: {
      thermostat: {
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        properties: ({
          online: boolean
          name: string
          model: {
            display_name: string
            manufacturer_display_name: string
            offline_access_codes_supported?: boolean | undefined
            access_codes_supported?: boolean | undefined
            accessory_keypad_supported?: boolean | undefined
          }
          has_direct_power?: boolean | undefined
          battery_level?: number | undefined
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          serial_number?: string | undefined
          /** Currently possible to use online access codes */
          online_access_codes_enabled?: boolean | undefined
          /** Currently possible to use offline access codes */
          offline_access_codes_enabled?: boolean | undefined
          /** Deprecated: use model.offline_access_codes_enabled. */
          supports_accessory_keypad?: boolean | undefined
          /** Deprecated: use model.accessory_keypad_supported. */
          supports_offline_access_codes?: boolean | undefined
        } & {
          august_metadata?:
            | {
                lock_id: string
                lock_name: string
                house_name: string
                has_keypad: boolean
                keypad_battery_level?: string | undefined
                model?: string | undefined
                house_id?: string | undefined
              }
            | undefined
          avigilon_alta_metadata?:
            | {
                entry_name: string
                org_name: string
                zone_id: number
                zone_name: string
                site_id: number
                site_name: string
              }
            | undefined
          schlage_metadata?:
            | {
                device_id: string
                device_name: string
                access_code_length: number
                model?: string | undefined
              }
            | undefined
          smartthings_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
                location_id?: string | undefined
              }
            | undefined
          lockly_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
              }
            | undefined
          nuki_metadata?:
            | {
                device_id: string
                device_name: string
                keypad_battery_critical?: boolean | undefined
              }
            | undefined
          kwikset_metadata?:
            | {
                device_id: string
                device_name: string
                model_number: string
              }
            | undefined
          salto_metadata?:
            | {
                lock_id: string
                customer_reference: string
                lock_type: string
                battery_level: string
                locked_state: string
                model?: string | undefined
              }
            | undefined
          genie_metadata?:
            | {
                device_name: string
                door_name: string
              }
            | undefined
          brivo_metadata?:
            | {
                device_name: string
              }
            | undefined
          igloo_metadata?:
            | {
                device_id: string
                bridge_id: string
                model?: string | undefined
              }
            | undefined
          noiseaware_metadata?:
            | {
                device_model: 'indoor' | 'outdoor'
                noise_level_nrs: number
                noise_level_decibel: number
                device_name: string
                device_id: string
              }
            | undefined
          minut_metadata?:
            | {
                device_id: string
                device_name: string
                latest_sensor_values: {
                  temperature: {
                    time: string
                    value: number
                  }
                  sound: {
                    time: string
                    value: number
                  }
                  humidity: {
                    time: string
                    value: number
                  }
                  pressure: {
                    time: string
                    value: number
                  }
                  accelerometer_z: {
                    time: string
                    value: number
                  }
                }
              }
            | undefined
          four_suites_metadata?:
            | {
                device_id: number
                device_name: string
                reclose_delay_in_seconds: number
              }
            | undefined
          two_n_metadata?:
            | {
                device_id: number
                device_name: string
              }
            | undefined
          controlbyweb_metadata?:
            | {
                device_id: string
                device_name: string
                relay_name: string | null
              }
            | undefined
          ttlock_metadata?:
            | {
                lock_id: number
                lock_alias: string
              }
            | undefined
          seam_bridge_metadata?:
            | {
                unlock_method?: ('bridge' | 'doorking') | undefined
                device_num: number
                name: string
              }
            | undefined
          igloohome_metadata?:
            | {
                device_id: string
                device_name: string
                bridge_id?: string | undefined
                bridge_name?: string | undefined
              }
            | undefined
          nest_metadata?:
            | {
                nest_device_id: string
                device_name: string
                custom_name: string
              }
            | undefined
          ecobee_metadata?:
            | {
                ecobee_device_id: string
                device_name: string
              }
            | undefined
          hubitat_metadata?:
            | {
                device_id: string
                device_name: string
                device_label: string
              }
            | undefined
          dormakaba_oracode_metadata?:
            | {
                door_id: number
                door_name: string
                device_id?: number | undefined
                site_id: number
                site_name: string
              }
            | undefined
          wyze_metadata?:
            | {
                device_id: string
                device_name: string
                product_name: string
                product_type: string
                product_model: string
                device_info_model: string
              }
            | undefined
        }) &
          ({
            code_constraints?:
              | (
                  | Array<
                      | {
                          constraint_type:
                            | 'no_zeros'
                            | 'cannot_start_with_12'
                            | 'no_triple_consecutive_ints'
                            | 'cannot_specify_pin_code'
                            | 'pin_code_matches_existing_set'
                            | 'start_date_in_future'
                        }
                      | {
                          constraint_type: 'name_length'
                          min_length?: number | undefined
                          max_length?: number | undefined
                        }
                    >
                  | undefined
                )
              | undefined
            supported_code_lengths?: (number[] | undefined) | undefined
            max_active_codes_supported?: (number | undefined) | undefined
            supports_backup_access_code_pool?: (boolean | undefined) | undefined
            has_native_entry_events?: (boolean | undefined) | undefined
            locked?: (boolean | undefined) | undefined
            keypad_battery?:
              | (
                  | {
                      level: number
                    }
                  | undefined
                )
              | undefined
            door_open?: (boolean | undefined) | undefined
          } & (
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
                min_heating_cooling_delta_celsius?: number | undefined
                min_heating_cooling_delta_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: false | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: false | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
              }
          ))
        location: {
          location_name?: string | undefined
          timezone?: string | undefined
        } | null
        connected_account_id: string
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: true
      }
    }
  }
  '/thermostats/heat': {
    route: '/thermostats/heat'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      heating_set_point_celsius?: number | undefined
      heating_set_point_fahrenheit?: number | undefined
      sync?: boolean
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/thermostats/heat_cool': {
    route: '/thermostats/heat_cool'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      heating_set_point_celsius?: number | undefined
      heating_set_point_fahrenheit?: number | undefined
      cooling_set_point_celsius?: number | undefined
      cooling_set_point_fahrenheit?: number | undefined
      sync?: boolean
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/thermostats/list': {
    route: '/thermostats/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      /** List all devices owned by this connected account */
      connected_account_id?: string | undefined
      connected_account_ids?: string[] | undefined
      connect_webview_id?: string | undefined
      device_type?:
        | (
            | (
                | 'akuvox_lock'
                | 'august_lock'
                | 'brivo_access_point'
                | 'butterflymx_panel'
                | 'avigilon_alta_entry'
                | 'doorking_lock'
                | 'genie_door'
                | 'igloo_lock'
                | 'linear_lock'
                | 'lockly_lock'
                | 'kwikset_lock'
                | 'nuki_lock'
                | 'salto_lock'
                | 'schlage_lock'
                | 'seam_relay'
                | 'smartthings_lock'
                | 'wyze_lock'
                | 'yale_lock'
                | 'two_n_intercom'
                | 'controlbyweb_device'
                | 'ttlock_lock'
                | 'igloohome_lock'
                | 'hubitat_lock'
                | 'four_suites_door'
                | 'dormakaba_oracode_door'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | ('ecobee_thermostat' | 'nest_thermostat')
          )
        | undefined
      device_types?:
        | Array<
            | (
                | 'akuvox_lock'
                | 'august_lock'
                | 'brivo_access_point'
                | 'butterflymx_panel'
                | 'avigilon_alta_entry'
                | 'doorking_lock'
                | 'genie_door'
                | 'igloo_lock'
                | 'linear_lock'
                | 'lockly_lock'
                | 'kwikset_lock'
                | 'nuki_lock'
                | 'salto_lock'
                | 'schlage_lock'
                | 'seam_relay'
                | 'smartthings_lock'
                | 'wyze_lock'
                | 'yale_lock'
                | 'two_n_intercom'
                | 'controlbyweb_device'
                | 'ttlock_lock'
                | 'igloohome_lock'
                | 'hubitat_lock'
                | 'four_suites_door'
                | 'dormakaba_oracode_door'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | ('ecobee_thermostat' | 'nest_thermostat')
          >
        | undefined
      manufacturer?:
        | (
            | 'akuvox'
            | 'august'
            | 'avigilon_alta'
            | 'brivo'
            | 'butterflymx'
            | 'doorking'
            | 'four_suites'
            | 'genie'
            | 'igloo'
            | 'keywe'
            | 'kwikset'
            | 'linear'
            | 'lockly'
            | 'nuki'
            | 'philia'
            | 'salto'
            | 'samsung'
            | 'schlage'
            | 'seam'
            | 'unknown'
            | 'wyze'
            | 'yale'
            | 'minut'
            | 'two_n'
            | 'ttlock'
            | 'nest'
            | 'igloohome'
            | 'ecobee'
            | 'hubitat'
            | 'controlbyweb'
            | 'smartthings'
            | 'dormakaba_oracode'
          )
        | undefined
      device_ids?: string[] | undefined
      limit?: number
      created_before?: Date | undefined
      user_identifier_key?: string | undefined
    }
    formData: {}
    jsonResponse: {
      thermostats: Array<{
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        properties: ({
          online: boolean
          name: string
          model: {
            display_name: string
            manufacturer_display_name: string
            offline_access_codes_supported?: boolean | undefined
            access_codes_supported?: boolean | undefined
            accessory_keypad_supported?: boolean | undefined
          }
          has_direct_power?: boolean | undefined
          battery_level?: number | undefined
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          serial_number?: string | undefined
          /** Currently possible to use online access codes */
          online_access_codes_enabled?: boolean | undefined
          /** Currently possible to use offline access codes */
          offline_access_codes_enabled?: boolean | undefined
          /** Deprecated: use model.offline_access_codes_enabled. */
          supports_accessory_keypad?: boolean | undefined
          /** Deprecated: use model.accessory_keypad_supported. */
          supports_offline_access_codes?: boolean | undefined
        } & {
          august_metadata?:
            | {
                lock_id: string
                lock_name: string
                house_name: string
                has_keypad: boolean
                keypad_battery_level?: string | undefined
                model?: string | undefined
                house_id?: string | undefined
              }
            | undefined
          avigilon_alta_metadata?:
            | {
                entry_name: string
                org_name: string
                zone_id: number
                zone_name: string
                site_id: number
                site_name: string
              }
            | undefined
          schlage_metadata?:
            | {
                device_id: string
                device_name: string
                access_code_length: number
                model?: string | undefined
              }
            | undefined
          smartthings_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
                location_id?: string | undefined
              }
            | undefined
          lockly_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
              }
            | undefined
          nuki_metadata?:
            | {
                device_id: string
                device_name: string
                keypad_battery_critical?: boolean | undefined
              }
            | undefined
          kwikset_metadata?:
            | {
                device_id: string
                device_name: string
                model_number: string
              }
            | undefined
          salto_metadata?:
            | {
                lock_id: string
                customer_reference: string
                lock_type: string
                battery_level: string
                locked_state: string
                model?: string | undefined
              }
            | undefined
          genie_metadata?:
            | {
                device_name: string
                door_name: string
              }
            | undefined
          brivo_metadata?:
            | {
                device_name: string
              }
            | undefined
          igloo_metadata?:
            | {
                device_id: string
                bridge_id: string
                model?: string | undefined
              }
            | undefined
          noiseaware_metadata?:
            | {
                device_model: 'indoor' | 'outdoor'
                noise_level_nrs: number
                noise_level_decibel: number
                device_name: string
                device_id: string
              }
            | undefined
          minut_metadata?:
            | {
                device_id: string
                device_name: string
                latest_sensor_values: {
                  temperature: {
                    time: string
                    value: number
                  }
                  sound: {
                    time: string
                    value: number
                  }
                  humidity: {
                    time: string
                    value: number
                  }
                  pressure: {
                    time: string
                    value: number
                  }
                  accelerometer_z: {
                    time: string
                    value: number
                  }
                }
              }
            | undefined
          four_suites_metadata?:
            | {
                device_id: number
                device_name: string
                reclose_delay_in_seconds: number
              }
            | undefined
          two_n_metadata?:
            | {
                device_id: number
                device_name: string
              }
            | undefined
          controlbyweb_metadata?:
            | {
                device_id: string
                device_name: string
                relay_name: string | null
              }
            | undefined
          ttlock_metadata?:
            | {
                lock_id: number
                lock_alias: string
              }
            | undefined
          seam_bridge_metadata?:
            | {
                unlock_method?: ('bridge' | 'doorking') | undefined
                device_num: number
                name: string
              }
            | undefined
          igloohome_metadata?:
            | {
                device_id: string
                device_name: string
                bridge_id?: string | undefined
                bridge_name?: string | undefined
              }
            | undefined
          nest_metadata?:
            | {
                nest_device_id: string
                device_name: string
                custom_name: string
              }
            | undefined
          ecobee_metadata?:
            | {
                ecobee_device_id: string
                device_name: string
              }
            | undefined
          hubitat_metadata?:
            | {
                device_id: string
                device_name: string
                device_label: string
              }
            | undefined
          dormakaba_oracode_metadata?:
            | {
                door_id: number
                door_name: string
                device_id?: number | undefined
                site_id: number
                site_name: string
              }
            | undefined
          wyze_metadata?:
            | {
                device_id: string
                device_name: string
                product_name: string
                product_type: string
                product_model: string
                device_info_model: string
              }
            | undefined
        }) &
          ({
            code_constraints?:
              | (
                  | Array<
                      | {
                          constraint_type:
                            | 'no_zeros'
                            | 'cannot_start_with_12'
                            | 'no_triple_consecutive_ints'
                            | 'cannot_specify_pin_code'
                            | 'pin_code_matches_existing_set'
                            | 'start_date_in_future'
                        }
                      | {
                          constraint_type: 'name_length'
                          min_length?: number | undefined
                          max_length?: number | undefined
                        }
                    >
                  | undefined
                )
              | undefined
            supported_code_lengths?: (number[] | undefined) | undefined
            max_active_codes_supported?: (number | undefined) | undefined
            supports_backup_access_code_pool?: (boolean | undefined) | undefined
            has_native_entry_events?: (boolean | undefined) | undefined
            locked?: (boolean | undefined) | undefined
            keypad_battery?:
              | (
                  | {
                      level: number
                    }
                  | undefined
                )
              | undefined
            door_open?: (boolean | undefined) | undefined
          } & (
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
                min_heating_cooling_delta_celsius?: number | undefined
                min_heating_cooling_delta_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: false | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: false | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
              }
          ))
        location: {
          location_name?: string | undefined
          timezone?: string | undefined
        } | null
        connected_account_id: string
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: true
      }>
    }
  }
  '/thermostats/off': {
    route: '/thermostats/off'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      sync?: boolean
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/thermostats/set_fan_mode': {
    route: '/thermostats/set_fan_mode'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      fan_mode?: ('auto' | 'on') | undefined
      fan_mode_setting?: ('auto' | 'on') | undefined
      sync?: boolean
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/thermostats/update': {
    route: '/thermostats/update'
    method: 'PATCH' | 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
      default_climate_setting: {
        automatic_heating_enabled?: boolean | undefined
        automatic_cooling_enabled?: boolean | undefined
        hvac_mode_setting?: ('off' | 'heat' | 'cool' | 'heat_cool') | undefined
        cooling_set_point_celsius?: (number | undefined) | undefined
        heating_set_point_celsius?: (number | undefined) | undefined
        cooling_set_point_fahrenheit?: (number | undefined) | undefined
        heating_set_point_fahrenheit?: (number | undefined) | undefined
        manual_override_allowed?: boolean | undefined
      }
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/user_identities/add_acs_user': {
    route: '/user_identities/add_acs_user'
    method: 'POST' | 'PUT'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
      acs_user_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/user_identities/create': {
    route: '/user_identities/create'
    method: 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_key?: (string | null) | undefined
      email_address?: (string | null) | undefined
    }
    formData: {}
    jsonResponse: {
      user_identity: {
        user_identity_id: string
        user_identity_key?: (string | null) | undefined
        email_address?: (string | null) | undefined
        created_at: string
        workspace_id: string
      }
    }
  }
  '/user_identities/get': {
    route: '/user_identities/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams:
      | {
          user_identity_id: string
        }
      | {
          user_identity_key: string
        }
    formData: {}
    jsonResponse: {
      user_identity: {
        user_identity_id: string
        user_identity_key?: (string | null) | undefined
        email_address?: (string | null) | undefined
        created_at: string
        workspace_id: string
      }
    }
  }
  '/user_identities/grant_access_to_device': {
    route: '/user_identities/grant_access_to_device'
    method: 'PUT' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
      device_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/user_identities/list_accessible_devices': {
    route: '/user_identities/list_accessible_devices'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
    }
    formData: {}
    jsonResponse: {
      accessible_devices: Array<{
        device_id: string
        device_type:
          | (
              | 'akuvox_lock'
              | 'august_lock'
              | 'brivo_access_point'
              | 'butterflymx_panel'
              | 'avigilon_alta_entry'
              | 'doorking_lock'
              | 'genie_door'
              | 'igloo_lock'
              | 'linear_lock'
              | 'lockly_lock'
              | 'kwikset_lock'
              | 'nuki_lock'
              | 'salto_lock'
              | 'schlage_lock'
              | 'seam_relay'
              | 'smartthings_lock'
              | 'wyze_lock'
              | 'yale_lock'
              | 'two_n_intercom'
              | 'controlbyweb_device'
              | 'ttlock_lock'
              | 'igloohome_lock'
              | 'hubitat_lock'
              | 'four_suites_door'
              | 'dormakaba_oracode_door'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | ('ecobee_thermostat' | 'nest_thermostat')
        capabilities_supported: Array<
          'access_code' | 'lock' | 'noise_detection' | 'thermostat' | 'battery'
        >
        properties: ({
          online: boolean
          name: string
          model: {
            display_name: string
            manufacturer_display_name: string
            offline_access_codes_supported?: boolean | undefined
            access_codes_supported?: boolean | undefined
            accessory_keypad_supported?: boolean | undefined
          }
          has_direct_power?: boolean | undefined
          battery_level?: number | undefined
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          manufacturer?: string | undefined
          image_url?: string | undefined
          image_alt_text?: string | undefined
          serial_number?: string | undefined
          /** Currently possible to use online access codes */
          online_access_codes_enabled?: boolean | undefined
          /** Currently possible to use offline access codes */
          offline_access_codes_enabled?: boolean | undefined
          /** Deprecated: use model.offline_access_codes_enabled. */
          supports_accessory_keypad?: boolean | undefined
          /** Deprecated: use model.accessory_keypad_supported. */
          supports_offline_access_codes?: boolean | undefined
        } & {
          august_metadata?:
            | {
                lock_id: string
                lock_name: string
                house_name: string
                has_keypad: boolean
                keypad_battery_level?: string | undefined
                model?: string | undefined
                house_id?: string | undefined
              }
            | undefined
          avigilon_alta_metadata?:
            | {
                entry_name: string
                org_name: string
                zone_id: number
                zone_name: string
                site_id: number
                site_name: string
              }
            | undefined
          schlage_metadata?:
            | {
                device_id: string
                device_name: string
                access_code_length: number
                model?: string | undefined
              }
            | undefined
          smartthings_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
                location_id?: string | undefined
              }
            | undefined
          lockly_metadata?:
            | {
                device_id: string
                device_name: string
                model?: string | undefined
              }
            | undefined
          nuki_metadata?:
            | {
                device_id: string
                device_name: string
                keypad_battery_critical?: boolean | undefined
              }
            | undefined
          kwikset_metadata?:
            | {
                device_id: string
                device_name: string
                model_number: string
              }
            | undefined
          salto_metadata?:
            | {
                lock_id: string
                customer_reference: string
                lock_type: string
                battery_level: string
                locked_state: string
                model?: string | undefined
              }
            | undefined
          genie_metadata?:
            | {
                device_name: string
                door_name: string
              }
            | undefined
          brivo_metadata?:
            | {
                device_name: string
              }
            | undefined
          igloo_metadata?:
            | {
                device_id: string
                bridge_id: string
                model?: string | undefined
              }
            | undefined
          noiseaware_metadata?:
            | {
                device_model: 'indoor' | 'outdoor'
                noise_level_nrs: number
                noise_level_decibel: number
                device_name: string
                device_id: string
              }
            | undefined
          minut_metadata?:
            | {
                device_id: string
                device_name: string
                latest_sensor_values: {
                  temperature: {
                    time: string
                    value: number
                  }
                  sound: {
                    time: string
                    value: number
                  }
                  humidity: {
                    time: string
                    value: number
                  }
                  pressure: {
                    time: string
                    value: number
                  }
                  accelerometer_z: {
                    time: string
                    value: number
                  }
                }
              }
            | undefined
          four_suites_metadata?:
            | {
                device_id: number
                device_name: string
                reclose_delay_in_seconds: number
              }
            | undefined
          two_n_metadata?:
            | {
                device_id: number
                device_name: string
              }
            | undefined
          controlbyweb_metadata?:
            | {
                device_id: string
                device_name: string
                relay_name: string | null
              }
            | undefined
          ttlock_metadata?:
            | {
                lock_id: number
                lock_alias: string
              }
            | undefined
          seam_bridge_metadata?:
            | {
                unlock_method?: ('bridge' | 'doorking') | undefined
                device_num: number
                name: string
              }
            | undefined
          igloohome_metadata?:
            | {
                device_id: string
                device_name: string
                bridge_id?: string | undefined
                bridge_name?: string | undefined
              }
            | undefined
          nest_metadata?:
            | {
                nest_device_id: string
                device_name: string
                custom_name: string
              }
            | undefined
          ecobee_metadata?:
            | {
                ecobee_device_id: string
                device_name: string
              }
            | undefined
          hubitat_metadata?:
            | {
                device_id: string
                device_name: string
                device_label: string
              }
            | undefined
          dormakaba_oracode_metadata?:
            | {
                door_id: number
                door_name: string
                device_id?: number | undefined
                site_id: number
                site_name: string
              }
            | undefined
          wyze_metadata?:
            | {
                device_id: string
                device_name: string
                product_name: string
                product_type: string
                product_model: string
                device_info_model: string
              }
            | undefined
        }) &
          ({
            code_constraints?:
              | (
                  | Array<
                      | {
                          constraint_type:
                            | 'no_zeros'
                            | 'cannot_start_with_12'
                            | 'no_triple_consecutive_ints'
                            | 'cannot_specify_pin_code'
                            | 'pin_code_matches_existing_set'
                            | 'start_date_in_future'
                        }
                      | {
                          constraint_type: 'name_length'
                          min_length?: number | undefined
                          max_length?: number | undefined
                        }
                    >
                  | undefined
                )
              | undefined
            supported_code_lengths?: (number[] | undefined) | undefined
            max_active_codes_supported?: (number | undefined) | undefined
            supports_backup_access_code_pool?: (boolean | undefined) | undefined
            has_native_entry_events?: (boolean | undefined) | undefined
            locked?: (boolean | undefined) | undefined
            keypad_battery?:
              | (
                  | {
                      level: number
                    }
                  | undefined
                )
              | undefined
            door_open?: (boolean | undefined) | undefined
          } & (
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
                min_heating_cooling_delta_celsius?: number | undefined
                min_heating_cooling_delta_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: true | undefined
                is_cooling_available?: false | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_heating_set_point_celsius?: number | undefined
                min_heating_set_point_fahrenheit?: number | undefined
                max_heating_set_point_celsius?: number | undefined
                max_heating_set_point_fahrenheit?: number | undefined
              }
            | {
                temperature_fahrenheit?: number | undefined
                temperature_celsius?: number | undefined
                relative_humidity?: number | undefined
                can_enable_automatic_heating?: boolean | undefined
                can_enable_automatic_cooling?: boolean | undefined
                available_hvac_mode_settings?:
                  | Array<'off' | 'heat' | 'cool' | 'heat_cool'>
                  | undefined
                is_heating_available?: false | undefined
                is_cooling_available?: true | undefined
                is_heating?: boolean | undefined
                is_cooling?: boolean | undefined
                is_fan_running?: boolean | undefined
                fan_mode_setting?: ('auto' | 'on') | undefined
                is_temporary_manual_override_active?: boolean | undefined
                current_climate_setting?:
                  | {
                      automatic_heating_enabled: boolean
                      automatic_cooling_enabled: boolean
                      hvac_mode_setting: 'off' | 'heat' | 'cool' | 'heat_cool'
                      cooling_set_point_celsius?: number | undefined
                      heating_set_point_celsius?: number | undefined
                      cooling_set_point_fahrenheit?: number | undefined
                      heating_set_point_fahrenheit?: number | undefined
                      manual_override_allowed: boolean
                    }
                  | undefined
                default_climate_setting?:
                  | (
                      | {
                          automatic_heating_enabled: boolean
                          automatic_cooling_enabled: boolean
                          hvac_mode_setting:
                            | 'off'
                            | 'heat'
                            | 'cool'
                            | 'heat_cool'
                          cooling_set_point_celsius?: number | undefined
                          heating_set_point_celsius?: number | undefined
                          cooling_set_point_fahrenheit?: number | undefined
                          heating_set_point_fahrenheit?: number | undefined
                          manual_override_allowed: boolean
                        }
                      | undefined
                    )
                  | undefined
                is_climate_setting_schedule_active?: boolean | undefined
                active_climate_setting_schedule?:
                  | (
                      | {
                          climate_setting_schedule_id: string
                          schedule_type: 'time_bound'
                          device_id: string
                          name?: string | undefined
                          schedule_starts_at: string
                          schedule_ends_at: string
                          created_at: string
                          automatic_heating_enabled?: boolean | undefined
                          automatic_cooling_enabled?: boolean | undefined
                          hvac_mode_setting?:
                            | ('off' | 'heat' | 'cool' | 'heat_cool')
                            | undefined
                          cooling_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_celsius?:
                            | (number | undefined)
                            | undefined
                          cooling_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          heating_set_point_fahrenheit?:
                            | (number | undefined)
                            | undefined
                          manual_override_allowed?: boolean | undefined
                        }
                      | undefined
                    )
                  | undefined
                min_cooling_set_point_celsius?: number | undefined
                min_cooling_set_point_fahrenheit?: number | undefined
                max_cooling_set_point_celsius?: number | undefined
                max_cooling_set_point_fahrenheit?: number | undefined
              }
          ))
        location: {
          location_name?: string | undefined
          timezone?: string | undefined
        } | null
        connected_account_id: string
        workspace_id: string
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        created_at: string
        is_managed: true
      }>
    }
  }
  '/user_identities/list_acs_users': {
    route: '/user_identities/list_acs_users'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
    }
    formData: {}
    jsonResponse: {
      acs_users: Array<{
        acs_user_id: string
        acs_system_id: string
        workspace_id: string
        created_at: string
        display_name: string
        external_type: 'pti_user' | 'brivo_user'
        external_type_display_name: string
        is_suspended: boolean
        full_name?: string | undefined
        /** Deprecated: use email_address. */
        email?: string | undefined
        email_address?: string | undefined
        phone_number?: string | undefined
      }>
    }
  }
  '/user_identities/remove_acs_user': {
    route: '/user_identities/remove_acs_user'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
      acs_user_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/user_identities/revoke_access_to_device': {
    route: '/user_identities/revoke_access_to_device'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
      device_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/webhooks/create': {
    route: '/webhooks/create'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      url: string
      event_types?: string[]
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      webhook: {
        webhook_id: string
        url: string
        event_types?: string[] | undefined
        secret?: string | undefined
      }
    }
  }
  '/webhooks/delete': {
    route: '/webhooks/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      webhook_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/webhooks/get': {
    route: '/webhooks/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      webhook_id: string
    }
    formData: {}
    jsonResponse: {
      webhook: {
        webhook_id: string
        url: string
        event_types?: string[] | undefined
        secret?: string | undefined
      }
    }
  }
  '/webhooks/list': {
    route: '/webhooks/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      webhooks: Array<{
        webhook_id: string
        url: string
        event_types?: string[] | undefined
        secret?: string | undefined
      }>
    }
  }
  '/workspaces/get': {
    route: '/workspaces/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      workspace?:
        | {
            workspace_id: string
            name: string
            is_sandbox: boolean
            connect_partner_name: string | null
          }
        | undefined
    }
  }
  '/workspaces/list': {
    route: '/workspaces/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      workspaces: Array<{
        workspace_id: string
        name: string
        is_sandbox: boolean
        connect_partner_name: string | null
      }>
    }
  }
  '/workspaces/reset_sandbox': {
    route: '/workspaces/reset_sandbox'
    method: 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      message: string
    }
  }
}

export type RouteResponse<Path extends keyof Routes> =
  Routes[Path]['jsonResponse']

export type RouteRequestBody<Path extends keyof Routes> =
  Routes[Path]['jsonBody'] & Routes[Path]['commonParams']

export type RouteRequestParams<Path extends keyof Routes> =
  Routes[Path]['queryParams'] & Routes[Path]['commonParams']
