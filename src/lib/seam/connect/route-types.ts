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
      max_time_rounding?: '1hour' | '1day' | '1h' | '1d'
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
        /** Unique identifier for a group of access codes that share the same code. */
        common_code_key: string | null
        /** Indicates whether the code is set on the device according to a preconfigured schedule. */
        is_scheduled_on_device?: boolean | undefined
        /** Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration. */
        type: 'time_bound' | 'ongoing'
        /** Indicates whether the access code is waiting for a code assignment. */
        is_waiting_for_code_assignment?: boolean | undefined
        /** Unique identifier for the access code. */
        access_code_id: string
        /** Unique identifier for the device associated with the access code. */
        device_id: string
        /** Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes. */
        name: string | null
        /** Code used for access. Typically, a numeric or alphanumeric string. */
        code: string | null
        /** Date and time at which the access code was created. */
        created_at: string
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
        /** Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention. */
        warnings?: any
        /** Indicates whether Seam manages the access code. */
        is_managed: true
        /** Date and time at which the time-bound access code becomes active. */
        starts_at?: (string | null) | undefined
        /** Date and time after which the time-bound access code becomes inactive. */
        ends_at?: (string | null) | undefined
        /**
            Current status of the access code within the operational lifecycle. Values are "setting," a transitional phase that indicates that the code is being configured or activated; "set", which indicates that the code is active and operational; "unset," which indicates a deactivated or unused state, either before activation or after deliberate deactivation; "removing," which indicates a transitional period in which the code is being deleted or made inactive; and "unknown," which indicates an indeterminate state, due to reasons such as system errors or incomplete data, that highlights a potential need for system review or troubleshooting.
           */
        status: 'setting' | 'set' | 'unset' | 'removing' | 'unknown'
        /** Indicates whether a backup access code is available for use if the primary access code is lost or compromised. */
        is_backup_access_code_available: boolean
        /** Indicates whether the access code is a backup code. */
        is_backup?: boolean | undefined
        /** Identifier of the pulled backup access code. Used to associate the pulled backup access code with the original access code. */
        pulled_backup_access_code_id?: (string | null) | undefined
        /** Indicates whether changes to the access code from external sources are permitted. */
        is_external_modification_allowed: boolean
        /** Indicates whether the access code can only be used once. If "true," the code becomes invalid after the first use. */
        is_one_time_use: boolean
        /** Indicates whether the access code is intended for use in offline scenarios. If "true," this code can be created on a device without a network connection. */
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
      preferred_code_length?: number | undefined
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
      max_time_rounding?: '1hour' | '1day' | '1h' | '1d'
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      access_codes: Array<{
        /** Unique identifier for a group of access codes that share the same code. */
        common_code_key: string | null
        /** Indicates whether the code is set on the device according to a preconfigured schedule. */
        is_scheduled_on_device?: boolean | undefined
        /** Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration. */
        type: 'time_bound' | 'ongoing'
        /** Indicates whether the access code is waiting for a code assignment. */
        is_waiting_for_code_assignment?: boolean | undefined
        /** Unique identifier for the access code. */
        access_code_id: string
        /** Unique identifier for the device associated with the access code. */
        device_id: string
        /** Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes. */
        name: string | null
        /** Code used for access. Typically, a numeric or alphanumeric string. */
        code: string | null
        /** Date and time at which the access code was created. */
        created_at: string
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
        /** Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention. */
        warnings?: any
        /** Indicates whether Seam manages the access code. */
        is_managed: true
        /** Date and time at which the time-bound access code becomes active. */
        starts_at?: (string | null) | undefined
        /** Date and time after which the time-bound access code becomes inactive. */
        ends_at?: (string | null) | undefined
        /**
            Current status of the access code within the operational lifecycle. Values are "setting," a transitional phase that indicates that the code is being configured or activated; "set", which indicates that the code is active and operational; "unset," which indicates a deactivated or unused state, either before activation or after deliberate deactivation; "removing," which indicates a transitional period in which the code is being deleted or made inactive; and "unknown," which indicates an indeterminate state, due to reasons such as system errors or incomplete data, that highlights a potential need for system review or troubleshooting.
           */
        status: 'setting' | 'set' | 'unset' | 'removing' | 'unknown'
        /** Indicates whether a backup access code is available for use if the primary access code is lost or compromised. */
        is_backup_access_code_available: boolean
        /** Indicates whether the access code is a backup code. */
        is_backup?: boolean | undefined
        /** Identifier of the pulled backup access code. Used to associate the pulled backup access code with the original access code. */
        pulled_backup_access_code_id?: (string | null) | undefined
        /** Indicates whether changes to the access code from external sources are permitted. */
        is_external_modification_allowed: boolean
        /** Indicates whether the access code can only be used once. If "true," the code becomes invalid after the first use. */
        is_one_time_use: boolean
        /** Indicates whether the access code is intended for use in offline scenarios. If "true," this code can be created on a device without a network connection. */
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
        /** Unique identifier for a group of access codes that share the same code. */
        common_code_key: string | null
        /** Indicates whether the code is set on the device according to a preconfigured schedule. */
        is_scheduled_on_device?: boolean | undefined
        /** Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration. */
        type: 'time_bound' | 'ongoing'
        /** Indicates whether the access code is waiting for a code assignment. */
        is_waiting_for_code_assignment?: boolean | undefined
        /** Unique identifier for the access code. */
        access_code_id: string
        /** Unique identifier for the device associated with the access code. */
        device_id: string
        /** Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes. */
        name: string | null
        /** Code used for access. Typically, a numeric or alphanumeric string. */
        code: string | null
        /** Date and time at which the access code was created. */
        created_at: string
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
        /** Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention. */
        warnings?: any
        /** Indicates whether Seam manages the access code. */
        is_managed: true
        /** Date and time at which the time-bound access code becomes active. */
        starts_at?: (string | null) | undefined
        /** Date and time after which the time-bound access code becomes inactive. */
        ends_at?: (string | null) | undefined
        /**
            Current status of the access code within the operational lifecycle. Values are "setting," a transitional phase that indicates that the code is being configured or activated; "set", which indicates that the code is active and operational; "unset," which indicates a deactivated or unused state, either before activation or after deliberate deactivation; "removing," which indicates a transitional period in which the code is being deleted or made inactive; and "unknown," which indicates an indeterminate state, due to reasons such as system errors or incomplete data, that highlights a potential need for system review or troubleshooting.
           */
        status: 'setting' | 'set' | 'unset' | 'removing' | 'unknown'
        /** Indicates whether a backup access code is available for use if the primary access code is lost or compromised. */
        is_backup_access_code_available: boolean
        /** Indicates whether the access code is a backup code. */
        is_backup?: boolean | undefined
        /** Identifier of the pulled backup access code. Used to associate the pulled backup access code with the original access code. */
        pulled_backup_access_code_id?: (string | null) | undefined
        /** Indicates whether changes to the access code from external sources are permitted. */
        is_external_modification_allowed: boolean
        /** Indicates whether the access code can only be used once. If "true," the code becomes invalid after the first use. */
        is_one_time_use: boolean
        /** Indicates whether the access code is intended for use in offline scenarios. If "true," this code can be created on a device without a network connection. */
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
        /** Unique identifier for a group of access codes that share the same code. */
        common_code_key: string | null
        /** Indicates whether the code is set on the device according to a preconfigured schedule. */
        is_scheduled_on_device?: boolean | undefined
        /** Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration. */
        type: 'time_bound' | 'ongoing'
        /** Indicates whether the access code is waiting for a code assignment. */
        is_waiting_for_code_assignment?: boolean | undefined
        /** Unique identifier for the access code. */
        access_code_id: string
        /** Unique identifier for the device associated with the access code. */
        device_id: string
        /** Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes. */
        name: string | null
        /** Code used for access. Typically, a numeric or alphanumeric string. */
        code: string | null
        /** Date and time at which the access code was created. */
        created_at: string
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
        /** Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention. */
        warnings?: any
        /** Indicates whether Seam manages the access code. */
        is_managed: true
        /** Date and time at which the time-bound access code becomes active. */
        starts_at?: (string | null) | undefined
        /** Date and time after which the time-bound access code becomes inactive. */
        ends_at?: (string | null) | undefined
        /**
            Current status of the access code within the operational lifecycle. Values are "setting," a transitional phase that indicates that the code is being configured or activated; "set", which indicates that the code is active and operational; "unset," which indicates a deactivated or unused state, either before activation or after deliberate deactivation; "removing," which indicates a transitional period in which the code is being deleted or made inactive; and "unknown," which indicates an indeterminate state, due to reasons such as system errors or incomplete data, that highlights a potential need for system review or troubleshooting.
           */
        status: 'setting' | 'set' | 'unset' | 'removing' | 'unknown'
        /** Indicates whether a backup access code is available for use if the primary access code is lost or compromised. */
        is_backup_access_code_available: boolean
        /** Indicates whether the access code is a backup code. */
        is_backup?: boolean | undefined
        /** Identifier of the pulled backup access code. Used to associate the pulled backup access code with the original access code. */
        pulled_backup_access_code_id?: (string | null) | undefined
        /** Indicates whether changes to the access code from external sources are permitted. */
        is_external_modification_allowed: boolean
        /** Indicates whether the access code can only be used once. If "true," the code becomes invalid after the first use. */
        is_one_time_use: boolean
        /** Indicates whether the access code is intended for use in offline scenarios. If "true," this code can be created on a device without a network connection. */
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
        /** Unique identifier for a group of access codes that share the same code. */
        common_code_key: string | null
        /** Indicates whether the code is set on the device according to a preconfigured schedule. */
        is_scheduled_on_device?: boolean | undefined
        /** Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration. */
        type: 'time_bound' | 'ongoing'
        /** Indicates whether the access code is waiting for a code assignment. */
        is_waiting_for_code_assignment?: boolean | undefined
        /** Unique identifier for the access code. */
        access_code_id: string
        /** Unique identifier for the device associated with the access code. */
        device_id: string
        /** Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes. */
        name: string | null
        /** Code used for access. Typically, a numeric or alphanumeric string. */
        code: string | null
        /** Date and time at which the access code was created. */
        created_at: string
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
        /** Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention. */
        warnings?: any
        /** Indicates whether Seam manages the access code. */
        is_managed: true
        /** Date and time at which the time-bound access code becomes active. */
        starts_at?: (string | null) | undefined
        /** Date and time after which the time-bound access code becomes inactive. */
        ends_at?: (string | null) | undefined
        /**
            Current status of the access code within the operational lifecycle. Values are "setting," a transitional phase that indicates that the code is being configured or activated; "set", which indicates that the code is active and operational; "unset," which indicates a deactivated or unused state, either before activation or after deliberate deactivation; "removing," which indicates a transitional period in which the code is being deleted or made inactive; and "unknown," which indicates an indeterminate state, due to reasons such as system errors or incomplete data, that highlights a potential need for system review or troubleshooting.
           */
        status: 'setting' | 'set' | 'unset' | 'removing' | 'unknown'
        /** Indicates whether a backup access code is available for use if the primary access code is lost or compromised. */
        is_backup_access_code_available: boolean
        /** Indicates whether the access code is a backup code. */
        is_backup?: boolean | undefined
        /** Identifier of the pulled backup access code. Used to associate the pulled backup access code with the original access code. */
        pulled_backup_access_code_id?: (string | null) | undefined
        /** Indicates whether changes to the access code from external sources are permitted. */
        is_external_modification_allowed: boolean
        /** Indicates whether the access code can only be used once. If "true," the code becomes invalid after the first use. */
        is_one_time_use: boolean
        /** Indicates whether the access code is intended for use in offline scenarios. If "true," this code can be created on a device without a network connection. */
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
        /** Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration. */
        type: 'time_bound' | 'ongoing'
        /** Unique identifier for the access code. */
        access_code_id: string
        /** Unique identifier for the device associated with the access code. */
        device_id: string
        /** Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes. */
        name: string | null
        /** Code used for access. Typically, a numeric or alphanumeric string. */
        code: string | null
        /** Date and time at which the access code was created. */
        created_at: string
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
        /** Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention. */
        warnings?: any
        is_managed: false
        /** Date and time at which the time-bound access code becomes active. */
        starts_at?: (string | null) | undefined
        /** Date and time after which the time-bound access code becomes inactive. */
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
        /** Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration. */
        type: 'time_bound' | 'ongoing'
        /** Unique identifier for the access code. */
        access_code_id: string
        /** Unique identifier for the device associated with the access code. */
        device_id: string
        /** Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes. */
        name: string | null
        /** Code used for access. Typically, a numeric or alphanumeric string. */
        code: string | null
        /** Date and time at which the access code was created. */
        created_at: string
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
        /** Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention. */
        warnings?: any
        is_managed: false
        /** Date and time at which the time-bound access code becomes active. */
        starts_at?: (string | null) | undefined
        /** Date and time after which the time-bound access code becomes inactive. */
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
        /** Nature of the access code. Values are "ongoing" for access codes that are active continuously until deactivated manually or "time_bound" for access codes that have a specific duration. */
        type: 'time_bound' | 'ongoing'
        /** Unique identifier for the access code. */
        access_code_id: string
        /** Unique identifier for the device associated with the access code. */
        device_id: string
        /** Name of the access code. Enables administrators and users to identify the access code easily, especially when there are numerous access codes. */
        name: string | null
        /** Code used for access. Typically, a numeric or alphanumeric string. */
        code: string | null
        /** Date and time at which the access code was created. */
        created_at: string
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
        /** Collection of warnings associated with the access code, structured in a dictionary format. A unique "warning_code" keys each warning. Each warning entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the warning. "created_at" is a date that indicates when the warning was generated. This structure enables detailed tracking and timely response to potential issues that are not critical but that may require attention. */
        warnings?: any
        is_managed: false
        /** Date and time at which the time-bound access code becomes active. */
        starts_at?: (string | null) | undefined
        /** Date and time after which the time-bound access code becomes inactive. */
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
        /**
            ---
            deprecated: use external_type
            ---
           */
        access_group_type:
          | 'pti_unit'
          | 'pti_access_level'
          | 'salto_access_group'
          | 'brivo_group'
        /**
            ---
            deprecated: use external_type_display_name
            ---
             */
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
        /**
            ---
            deprecated: use external_type
            ---
           */
        access_group_type:
          | 'pti_unit'
          | 'pti_access_level'
          | 'salto_access_group'
          | 'brivo_group'
        /**
            ---
            deprecated: use external_type_display_name
            ---
             */
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
        hid_acs_system_id?: string | undefined
        workspace_id: string
        created_at: string
        display_name: string
        external_type?:
          | (
              | 'pti_user'
              | 'brivo_user'
              | 'hid_credential_manager_user'
              | 'salto_site_user'
            )
          | undefined
        external_type_display_name?: string | undefined
        is_suspended: boolean
        access_schedule?:
          | {
              starts_at: string
              ends_at: string
            }
          | undefined
        user_identity_id?: string | undefined
        user_identity_email_address?: string | undefined
        user_identity_phone_number?: string | undefined
        full_name?: string | undefined
        /**
            ---
            deprecated: use email_address.
            ---
             */
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
  '/acs/credential_pools/list': {
    route: '/acs/credential_pools/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_system_id: string
    }
    formData: {}
    jsonResponse: {
      acs_credential_pools: Array<{
        acs_credential_pool_id: string
        acs_system_id: string
        display_name: string
        external_type: 'hid_part_number'
        external_type_display_name: string
        created_at: string
        workspace_id: string
      }>
    }
  }
  '/acs/credential_provisioning_automations/launch': {
    route: '/acs/credential_provisioning_automations/launch'
    method: 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
      credential_manager_acs_system_id: string
      acs_credential_pool_id?: string | undefined
      create_credential_manager_user?: boolean | undefined
      credential_manager_acs_user_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      acs_credential_provisioning_automation: {
        acs_credential_provisioning_automation_id: string
        credential_manager_acs_system_id: string
        user_identity_id: string
        created_at: string
        workspace_id: string
      }
    }
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
    jsonResponse: {
      acs_credential: {
        acs_credential_id: string
        acs_user_id?: string | undefined
        acs_credential_pool_id?: string | undefined
        acs_system_id: string
        parent_acs_credential_id?: string | undefined
        display_name: string
        code?: (string | undefined) | null
        access_method: 'code' | 'card' | 'mobile_key'
        external_type?:
          | (
              | 'pti_card'
              | 'brivo_credential'
              | 'hid_credential'
              | 'visionline_card'
            )
          | undefined
        external_type_display_name?: string | undefined
        created_at: string
        workspace_id: string
        starts_at?: string | undefined
        ends_at?: string | undefined
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        is_multi_phone_sync_credential?: boolean | undefined
        visionline_metadata?:
          | {
              joiner_acs_credential_ids?: string[] | undefined
              guest_acs_entrance_ids?: string[] | undefined
              common_acs_entrance_ids?: string[] | undefined
            }
          | undefined
      }
    }
  }
  '/acs/credentials/create': {
    route: '/acs/credentials/create'
    method: 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      credential_manager_acs_system_id?: string | undefined
      acs_user_id: string
      access_method: 'code' | 'card' | 'mobile_key'
      code?: string | undefined
      is_multi_phone_sync_credential?: boolean
      allowed_acs_entrance_ids?: string[]
      visionline_metadata?:
        | {
            assa_abloy_credential_service_mobile_endpoint_id?:
              | string
              | undefined
            card_format?: ('TLCode' | 'rfid48') | undefined
            is_override_key?: boolean | undefined
            joiner_acs_credential_ids?: string[] | undefined
          }
        | undefined
      starts_at?: string | undefined
      ends_at?: string | undefined
    }
    formData: {}
    jsonResponse: {
      acs_credential: {
        acs_credential_id: string
        acs_user_id?: string | undefined
        acs_credential_pool_id?: string | undefined
        acs_system_id: string
        parent_acs_credential_id?: string | undefined
        display_name: string
        code?: (string | undefined) | null
        access_method: 'code' | 'card' | 'mobile_key'
        external_type?:
          | (
              | 'pti_card'
              | 'brivo_credential'
              | 'hid_credential'
              | 'visionline_card'
            )
          | undefined
        external_type_display_name?: string | undefined
        created_at: string
        workspace_id: string
        starts_at?: string | undefined
        ends_at?: string | undefined
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        is_multi_phone_sync_credential?: boolean | undefined
        visionline_metadata?:
          | {
              joiner_acs_credential_ids?: string[] | undefined
              guest_acs_entrance_ids?: string[] | undefined
              common_acs_entrance_ids?: string[] | undefined
            }
          | undefined
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
        acs_credential_pool_id?: string | undefined
        acs_system_id: string
        parent_acs_credential_id?: string | undefined
        display_name: string
        code?: (string | undefined) | null
        access_method: 'code' | 'card' | 'mobile_key'
        external_type?:
          | (
              | 'pti_card'
              | 'brivo_credential'
              | 'hid_credential'
              | 'visionline_card'
            )
          | undefined
        external_type_display_name?: string | undefined
        created_at: string
        workspace_id: string
        starts_at?: string | undefined
        ends_at?: string | undefined
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        is_multi_phone_sync_credential?: boolean | undefined
        visionline_metadata?:
          | {
              joiner_acs_credential_ids?: string[] | undefined
              guest_acs_entrance_ids?: string[] | undefined
              common_acs_entrance_ids?: string[] | undefined
            }
          | undefined
      }
    }
  }
  '/acs/credentials/list': {
    route: '/acs/credentials/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: (
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
      | {
          user_identity_id: string
        }
    ) & {
      is_multi_phone_sync_credential?: boolean | undefined
    }
    formData: {}
    jsonResponse: {
      acs_credentials: Array<{
        acs_credential_id: string
        acs_user_id?: string | undefined
        acs_credential_pool_id?: string | undefined
        acs_system_id: string
        parent_acs_credential_id?: string | undefined
        display_name: string
        code?: (string | undefined) | null
        access_method: 'code' | 'card' | 'mobile_key'
        external_type?:
          | (
              | 'pti_card'
              | 'brivo_credential'
              | 'hid_credential'
              | 'visionline_card'
            )
          | undefined
        external_type_display_name?: string | undefined
        created_at: string
        workspace_id: string
        starts_at?: string | undefined
        ends_at?: string | undefined
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        is_multi_phone_sync_credential?: boolean | undefined
        visionline_metadata?:
          | {
              joiner_acs_credential_ids?: string[] | undefined
              guest_acs_entrance_ids?: string[] | undefined
              common_acs_entrance_ids?: string[] | undefined
            }
          | undefined
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
        acs_credential_pool_id?: string | undefined
        acs_system_id: string
        parent_acs_credential_id?: string | undefined
        display_name: string
        code?: (string | undefined) | null
        access_method: 'code' | 'card' | 'mobile_key'
        external_type?:
          | (
              | 'pti_card'
              | 'brivo_credential'
              | 'hid_credential'
              | 'visionline_card'
            )
          | undefined
        external_type_display_name?: string | undefined
        created_at: string
        workspace_id: string
        starts_at?: string | undefined
        ends_at?: string | undefined
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        is_multi_phone_sync_credential?: boolean | undefined
        visionline_metadata?:
          | {
              joiner_acs_credential_ids?: string[] | undefined
              guest_acs_entrance_ids?: string[] | undefined
              common_acs_entrance_ids?: string[] | undefined
            }
          | undefined
      }
    }
  }
  '/acs/credentials/update': {
    route: '/acs/credentials/update'
    method: 'PATCH' | 'POST'
    queryParams: {}
    jsonBody: {
      acs_credential_id: string
      code: string
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      acs_credential: {
        acs_credential_id: string
        acs_user_id?: string | undefined
        acs_credential_pool_id?: string | undefined
        acs_system_id: string
        parent_acs_credential_id?: string | undefined
        display_name: string
        code?: (string | undefined) | null
        access_method: 'code' | 'card' | 'mobile_key'
        external_type?:
          | (
              | 'pti_card'
              | 'brivo_credential'
              | 'hid_credential'
              | 'visionline_card'
            )
          | undefined
        external_type_display_name?: string | undefined
        created_at: string
        workspace_id: string
        starts_at?: string | undefined
        ends_at?: string | undefined
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        is_multi_phone_sync_credential?: boolean | undefined
        visionline_metadata?:
          | {
              joiner_acs_credential_ids?: string[] | undefined
              guest_acs_entrance_ids?: string[] | undefined
              common_acs_entrance_ids?: string[] | undefined
            }
          | undefined
      }
    }
  }
  '/acs/entrances/get': {
    route: '/acs/entrances/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_entrance_id: string
    }
    formData: {}
    jsonResponse: {
      acs_entrance: {
        acs_entrance_id: string
        display_name: string
        acs_system_id: string
        created_at: string
        latch_metadata: {
          accessibility_type: string
          name: string
          type: string
          is_connected: boolean
        } | null
        visionline_metadata: {
          door_name: string
          door_category:
            | 'entrance'
            | 'guest'
            | 'elevator reader'
            | 'common'
            | 'common (PMS)'
          profiles?:
            | Array<{
                visionline_door_profile_id: string
                visionline_door_profile_type: 'BLE' | 'commonDoor' | 'touch'
              }>
            | undefined
        } | null
      }
    }
  }
  '/acs/entrances/grant_access': {
    route: '/acs/entrances/grant_access'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      acs_entrance_id: string
      acs_user_id: string
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/acs/entrances/list': {
    route: '/acs/entrances/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_system_id?: string | undefined
      acs_credential_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      acs_entrances: Array<{
        acs_entrance_id: string
        display_name: string
        acs_system_id: string
        created_at: string
        latch_metadata: {
          accessibility_type: string
          name: string
          type: string
          is_connected: boolean
        } | null
        visionline_metadata: {
          door_name: string
          door_category:
            | 'entrance'
            | 'guest'
            | 'elevator reader'
            | 'common'
            | 'common (PMS)'
          profiles?:
            | Array<{
                visionline_door_profile_id: string
                visionline_door_profile_type: 'BLE' | 'commonDoor' | 'touch'
              }>
            | undefined
        } | null
      }>
    }
  }
  '/acs/entrances/list_credentials_with_access': {
    route: '/acs/entrances/list_credentials_with_access'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_entrance_id: string
      include_if?: Array<'visionline_metadata.is_valid'> | undefined
    }
    formData: {}
    jsonResponse: {
      acs_credentials: Array<{
        acs_credential_id: string
        acs_user_id?: string | undefined
        acs_credential_pool_id?: string | undefined
        acs_system_id: string
        parent_acs_credential_id?: string | undefined
        display_name: string
        code?: (string | undefined) | null
        access_method: 'code' | 'card' | 'mobile_key'
        external_type?:
          | (
              | 'pti_card'
              | 'brivo_credential'
              | 'hid_credential'
              | 'visionline_card'
            )
          | undefined
        external_type_display_name?: string | undefined
        created_at: string
        workspace_id: string
        starts_at?: string | undefined
        ends_at?: string | undefined
        errors: Array<{
          error_code: string
          message: string
        }>
        warnings: Array<{
          warning_code: string
          message: string
        }>
        is_multi_phone_sync_credential?: boolean | undefined
        visionline_metadata?:
          | {
              joiner_acs_credential_ids?: string[] | undefined
              guest_acs_entrance_ids?: string[] | undefined
              common_acs_entrance_ids?: string[] | undefined
            }
          | undefined
      }>
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
        external_type:
          | 'pti_site'
          | 'alta_org'
          | 'salto_site'
          | 'brivo_account'
          | 'hid_credential_manager_organization'
          | 'visionline_system'
          | 'assa_abloy_credential_service'
          | 'latch_building'
        external_type_display_name: string
        /**
              ---
              deprecated: use external_type
              ---
               */
        system_type:
          | 'pti_site'
          | 'alta_org'
          | 'salto_site'
          | 'brivo_account'
          | 'hid_credential_manager_organization'
          | 'visionline_system'
          | 'assa_abloy_credential_service'
          | 'latch_building'
        /**
              ---
              deprecated: use external_type_display_name
              ---
               */
        system_type_display_name: string
        name: string
        created_at: string
        workspace_id: string
        connected_account_ids: string[]
        image_url: string
        image_alt_text: string
        can_automate_enrollment?: boolean | undefined
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
        external_type:
          | 'pti_site'
          | 'alta_org'
          | 'salto_site'
          | 'brivo_account'
          | 'hid_credential_manager_organization'
          | 'visionline_system'
          | 'assa_abloy_credential_service'
          | 'latch_building'
        external_type_display_name: string
        /**
              ---
              deprecated: use external_type
              ---
               */
        system_type:
          | 'pti_site'
          | 'alta_org'
          | 'salto_site'
          | 'brivo_account'
          | 'hid_credential_manager_organization'
          | 'visionline_system'
          | 'assa_abloy_credential_service'
          | 'latch_building'
        /**
              ---
              deprecated: use external_type_display_name
              ---
               */
        system_type_display_name: string
        name: string
        created_at: string
        workspace_id: string
        connected_account_ids: string[]
        image_url: string
        image_alt_text: string
        can_automate_enrollment?: boolean | undefined
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
      user_identity_id?: string | undefined
      access_schedule?:
        | {
            starts_at: string
            ends_at: string
          }
        | undefined
      full_name?: string | undefined
      /**
        ---
        deprecated: use email_address.
        ---
         */
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
        hid_acs_system_id?: string | undefined
        workspace_id: string
        created_at: string
        display_name: string
        external_type?:
          | (
              | 'pti_user'
              | 'brivo_user'
              | 'hid_credential_manager_user'
              | 'salto_site_user'
            )
          | undefined
        external_type_display_name?: string | undefined
        is_suspended: boolean
        access_schedule?:
          | {
              starts_at: string
              ends_at: string
            }
          | undefined
        user_identity_id?: string | undefined
        user_identity_email_address?: string | undefined
        user_identity_phone_number?: string | undefined
        full_name?: string | undefined
        /**
            ---
            deprecated: use email_address.
            ---
             */
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
        hid_acs_system_id?: string | undefined
        workspace_id: string
        created_at: string
        display_name: string
        external_type?:
          | (
              | 'pti_user'
              | 'brivo_user'
              | 'hid_credential_manager_user'
              | 'salto_site_user'
            )
          | undefined
        external_type_display_name?: string | undefined
        is_suspended: boolean
        access_schedule?:
          | {
              starts_at: string
              ends_at: string
            }
          | undefined
        user_identity_id?: string | undefined
        user_identity_email_address?: string | undefined
        user_identity_phone_number?: string | undefined
        full_name?: string | undefined
        /**
            ---
            deprecated: use email_address.
            ---
             */
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
      user_identity_id?: string | undefined
      user_identity_phone_number?: string | undefined
      user_identity_email_address?: string | undefined
      acs_system_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      acs_users: Array<{
        acs_user_id: string
        acs_system_id: string
        hid_acs_system_id?: string | undefined
        workspace_id: string
        created_at: string
        display_name: string
        external_type?:
          | (
              | 'pti_user'
              | 'brivo_user'
              | 'hid_credential_manager_user'
              | 'salto_site_user'
            )
          | undefined
        external_type_display_name?: string | undefined
        is_suspended: boolean
        access_schedule?:
          | {
              starts_at: string
              ends_at: string
            }
          | undefined
        user_identity_id?: string | undefined
        user_identity_email_address?: string | undefined
        user_identity_phone_number?: string | undefined
        full_name?: string | undefined
        /**
            ---
            deprecated: use email_address.
            ---
             */
        email?: string | undefined
        email_address?: string | undefined
        phone_number?: string | undefined
      }>
    }
  }
  '/acs/users/list_accessible_entrances': {
    route: '/acs/users/list_accessible_entrances'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      acs_user_id: string
    }
    formData: {}
    jsonResponse: {
      acs_entrances: Array<{
        acs_entrance_id: string
        display_name: string
        acs_system_id: string
        created_at: string
        latch_metadata: {
          accessibility_type: string
          name: string
          type: string
          is_connected: boolean
        } | null
        visionline_metadata: {
          door_name: string
          door_category:
            | 'entrance'
            | 'guest'
            | 'elevator reader'
            | 'common'
            | 'common (PMS)'
          profiles?:
            | Array<{
                visionline_door_profile_id: string
                visionline_door_profile_type: 'BLE' | 'commonDoor' | 'touch'
              }>
            | undefined
        } | null
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
  '/acs/users/revoke_access_to_all_entrances': {
    route: '/acs/users/revoke_access_to_all_entrances'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      acs_user_id: string
    }
    commonParams: {}
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
      access_schedule?:
        | {
            starts_at: string
            ends_at: string
          }
        | undefined
      acs_user_id: string
      full_name?: string | undefined
      /**
        ---
        deprecated: use email_address.
        ---
         */
      email?: string | undefined
      phone_number?: string | undefined
      email_address?: string | undefined
      hid_acs_system_id?: string | undefined
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
        device_count: number
        connected_account_ids: string[]
        connect_webview_ids: string[]
        user_identity_ids: string[]
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
        device_count: number
        connected_account_ids: string[]
        connect_webview_ids: string[]
        user_identity_ids: string[]
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
      user_identity_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      client_sessions: Array<{
        client_session_id: string
        user_identifier_key: string | null
        created_at: string
        token: string
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
            | 'visionline'
            | 'assa_abloy_credential_service'
            | 'seam_bridge'
            | 'tedee'
            | 'honeywell_resideo'
            | 'latch'
            | 'yale_access'
            | 'hid_cm'
            | 'google_nest'
          >
        | undefined
      provider_category?:
        | (
            | 'stable'
            | 'consumer_smartlocks'
            | 'thermostats'
            | 'noise_sensors'
            | 'access_control_systems'
            | 'internal_beta'
          )
        | undefined
      custom_metadata?: Record<string, string | boolean | null> | undefined
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
        custom_metadata: Record<string, string | boolean>
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
        custom_metadata: Record<string, string | boolean>
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
      /** Returns devices where the webview's custom_metadata contains all of the provided key/value pairs. */
      custom_metadata_has?: Record<string, string | boolean> | undefined
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
        custom_metadata: Record<string, string | boolean>
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
        custom_metadata: Record<string, string | boolean>
        automatically_manage_new_devices: boolean
      }
    }
  }
  '/connected_accounts/list': {
    route: '/connected_accounts/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      /** Returns devices where the account's custom_metadata contains all of the provided key/value pairs. */
      custom_metadata_has?: Record<string, string | boolean> | undefined
    }
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
        custom_metadata: Record<string, string | boolean>
        automatically_manage_new_devices: boolean
      }>
    }
  }
  '/connected_accounts/update': {
    route: '/connected_accounts/update'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      connected_account_id: string
      automatically_manage_new_devices?: boolean | undefined
      custom_metadata?: Record<string, string | boolean | null> | undefined
    }
    commonParams: {}
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
        custom_metadata: Record<string, string | boolean>
        automatically_manage_new_devices: boolean
      }
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
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Properties of the device. */
        properties: (({
          /** Indicates whether the device is online. */
          online: boolean
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          appearance: {
            /** Name of the device as seen from the provider API and application, not settable through Seam. */
            name: string
          }
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
          /** Indicates whether the device has direct power. */
          has_direct_power?: boolean | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Serial number of the device. */
          serial_number?: string | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          /**
                  ---
                  deprecated: use model.accessory_keypad_supported
                  ---
                   */
          supports_accessory_keypad?: boolean | undefined
          /**
                  ---
                  deprecated: use offline_access_codes_enabled
                  ---
                   */
          supports_offline_access_codes?: boolean | undefined
        } & {
          assa_abloy_credential_service_metadata?:
            | (
                | {
                    has_active_endpoint: boolean
                    endpoints: Array<{
                      endpoint_id: string
                      is_active: boolean
                    }>
                  }
                | undefined
              )
            | undefined
        }) & {
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
                access_code_length: number | null
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
                keypad_paired?: boolean | undefined
                keypad_2_paired?: boolean | undefined
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
          honeywell_resideo_metadata?:
            | {
                honeywell_resideo_device_id: string
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
                iana_timezone?: string | undefined
                predefined_time_slots?:
                  | Array<{
                      name: string
                      prefix: number
                      check_in_time: string
                      check_out_time: string
                      is_24_hour: boolean
                      is_biweekly_mode: boolean
                      is_one_shot: boolean
                      is_master: boolean
                      ext_dormakaba_oracode_user_level_prefix: number
                      dormakaba_oracode_user_level_id: string
                    }>
                  | undefined
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
          tedee_metadata?:
            | {
                device_id: number
                serial_number: string
                device_name: string
                device_model: string
                bridge_id: number
                bridge_name: string
                keypad_id?: number | undefined
              }
            | undefined
        }) &
          ({
            _experimental_supported_code_from_access_codes_lengths?:
              | (number[] | undefined)
              | undefined
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
                            | 'no_ascending_or_descending_sequence'
                            | 'at_least_three_unique_digits'
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
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
                | 'tedee_lock'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | (
                | 'ecobee_thermostat'
                | 'nest_thermostat'
                | 'honeywell_resideo_thermostat'
              )
            | ('ios_phone' | 'android_phone')
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
                | 'tedee_lock'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | (
                | 'ecobee_thermostat'
                | 'nest_thermostat'
                | 'honeywell_resideo_thermostat'
              )
            | ('ios_phone' | 'android_phone')
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
            | 'tedee'
            | 'honeywell_resideo'
          )
        | undefined
      device_ids?: string[] | undefined
      limit?: number
      created_before?: Date | undefined
      user_identifier_key?: string | undefined
      custom_metadata_has?: Record<string, string | boolean> | undefined
      include_if?:
        | Array<
            | 'can_remotely_unlock'
            | 'can_remotely_lock'
            | 'can_program_online_access_codes'
            | 'can_simulate_removal'
          >
        | undefined
      exclude_if?:
        | Array<
            | 'can_remotely_unlock'
            | 'can_remotely_lock'
            | 'can_program_online_access_codes'
            | 'can_simulate_removal'
          >
        | undefined
    }
    formData: {}
    jsonResponse: {
      devices: Array<{
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Properties of the device. */
        properties: (({
          /** Indicates whether the device is online. */
          online: boolean
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          appearance: {
            /** Name of the device as seen from the provider API and application, not settable through Seam. */
            name: string
          }
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
          /** Indicates whether the device has direct power. */
          has_direct_power?: boolean | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Serial number of the device. */
          serial_number?: string | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          /**
                  ---
                  deprecated: use model.accessory_keypad_supported
                  ---
                   */
          supports_accessory_keypad?: boolean | undefined
          /**
                  ---
                  deprecated: use offline_access_codes_enabled
                  ---
                   */
          supports_offline_access_codes?: boolean | undefined
        } & {
          assa_abloy_credential_service_metadata?:
            | (
                | {
                    has_active_endpoint: boolean
                    endpoints: Array<{
                      endpoint_id: string
                      is_active: boolean
                    }>
                  }
                | undefined
              )
            | undefined
        }) & {
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
                access_code_length: number | null
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
                keypad_paired?: boolean | undefined
                keypad_2_paired?: boolean | undefined
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
          honeywell_resideo_metadata?:
            | {
                honeywell_resideo_device_id: string
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
                iana_timezone?: string | undefined
                predefined_time_slots?:
                  | Array<{
                      name: string
                      prefix: number
                      check_in_time: string
                      check_out_time: string
                      is_24_hour: boolean
                      is_biweekly_mode: boolean
                      is_one_shot: boolean
                      is_master: boolean
                      ext_dormakaba_oracode_user_level_prefix: number
                      dormakaba_oracode_user_level_id: string
                    }>
                  | undefined
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
          tedee_metadata?:
            | {
                device_id: number
                serial_number: string
                device_name: string
                device_model: string
                bridge_id: number
                bridge_name: string
                keypad_id?: number | undefined
              }
            | undefined
        }) &
          ({
            _experimental_supported_code_from_access_codes_lengths?:
              | (number[] | undefined)
              | undefined
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
                            | 'no_ascending_or_descending_sequence'
                            | 'at_least_three_unique_digits'
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
      }>
    }
  }
  '/devices/list_device_providers': {
    route: '/devices/list_device_providers'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      provider_category?:
        | (
            | 'stable'
            | 'consumer_smartlocks'
            | 'thermostats'
            | 'noise_sensors'
            | 'access_control_systems'
          )
        | undefined
    }
    formData: {}
    jsonResponse: {
      device_providers: Array<{
        device_provider_name:
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
          | 'visionline'
          | 'assa_abloy_credential_service'
          | 'seam_bridge'
          | 'tedee'
          | 'honeywell_resideo'
          | 'latch'
        display_name: string
        image_url: string
        provider_categories: Array<
          | 'stable'
          | 'consumer_smartlocks'
          | 'thermostats'
          | 'noise_sensors'
          | 'access_control_systems'
        >
      }>
    }
  }
  '/devices/simulate/remove': {
    route: '/devices/simulate/remove'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
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
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        is_managed: false
        properties: {
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Indicates whether the device is online. */
          online: boolean
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
        }
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
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
                | 'tedee_lock'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | (
                | 'ecobee_thermostat'
                | 'nest_thermostat'
                | 'honeywell_resideo_thermostat'
              )
            | ('ios_phone' | 'android_phone')
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
                | 'tedee_lock'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | (
                | 'ecobee_thermostat'
                | 'nest_thermostat'
                | 'honeywell_resideo_thermostat'
              )
            | ('ios_phone' | 'android_phone')
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
            | 'tedee'
            | 'honeywell_resideo'
          )
        | undefined
      device_ids?: string[] | undefined
      limit?: number
      created_before?: Date | undefined
      user_identifier_key?: string | undefined
      custom_metadata_has?: Record<string, string | boolean> | undefined
      include_if?:
        | Array<
            | 'can_remotely_unlock'
            | 'can_remotely_lock'
            | 'can_program_online_access_codes'
            | 'can_simulate_removal'
          >
        | undefined
      exclude_if?:
        | Array<
            | 'can_remotely_unlock'
            | 'can_remotely_lock'
            | 'can_program_online_access_codes'
            | 'can_simulate_removal'
          >
        | undefined
    }
    formData: {}
    jsonResponse: {
      devices: Array<{
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        is_managed: false
        properties: {
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Indicates whether the device is online. */
          online: boolean
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
        }
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
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
      is_managed?: boolean
      custom_metadata?: Record<string, string | boolean | null> | undefined
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
            | 'device.deleted'
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
            | 'phone.deactivated'
            | 'connected_account.connected'
            | 'connected_account.successful_login'
            | 'connected_account.created'
            | 'connected_account.deleted'
            | 'connected_account.disconnected'
            | 'connected_account.completed_first_sync'
            | 'connected_account.completed_first_sync_after_reconnection'
            | 'noise_sensor.noise_threshold_triggered'
            | 'access_code.backup_access_code_pulled'
            | 'acs_user.deleted'
            | 'acs_credential.deleted'
            | 'enrollment_automation.deleted'
            | 'client_session.deleted'
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
            | 'device.deleted'
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
            | 'phone.deactivated'
            | 'connected_account.connected'
            | 'connected_account.successful_login'
            | 'connected_account.created'
            | 'connected_account.deleted'
            | 'connected_account.disconnected'
            | 'connected_account.completed_first_sync'
            | 'connected_account.completed_first_sync_after_reconnection'
            | 'noise_sensor.noise_threshold_triggered'
            | 'access_code.backup_access_code_pulled'
            | 'acs_user.deleted'
            | 'acs_credential.deleted'
            | 'enrollment_automation.deleted'
            | 'client_session.deleted'
          >
        | undefined
      connected_account_id?: string | undefined
      limit?: number
    }
    formData: {}
    jsonResponse: {
      events: Array<{
        event_id: string
        device_id?: string | undefined
        event_type: string
        workspace_id: string
        created_at: string
        occurred_at: string
      }>
    }
  }
  '/health': {
    route: '/health'
    method: 'GET' | 'POST'
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
    method: 'GET' | 'POST'
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
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Properties of the device. */
        properties: (({
          /** Indicates whether the device is online. */
          online: boolean
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          appearance: {
            /** Name of the device as seen from the provider API and application, not settable through Seam. */
            name: string
          }
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
          /** Indicates whether the device has direct power. */
          has_direct_power?: boolean | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Serial number of the device. */
          serial_number?: string | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          /**
                  ---
                  deprecated: use model.accessory_keypad_supported
                  ---
                   */
          supports_accessory_keypad?: boolean | undefined
          /**
                  ---
                  deprecated: use offline_access_codes_enabled
                  ---
                   */
          supports_offline_access_codes?: boolean | undefined
        } & {
          assa_abloy_credential_service_metadata?:
            | (
                | {
                    has_active_endpoint: boolean
                    endpoints: Array<{
                      endpoint_id: string
                      is_active: boolean
                    }>
                  }
                | undefined
              )
            | undefined
        }) & {
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
                access_code_length: number | null
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
                keypad_paired?: boolean | undefined
                keypad_2_paired?: boolean | undefined
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
          honeywell_resideo_metadata?:
            | {
                honeywell_resideo_device_id: string
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
                iana_timezone?: string | undefined
                predefined_time_slots?:
                  | Array<{
                      name: string
                      prefix: number
                      check_in_time: string
                      check_out_time: string
                      is_24_hour: boolean
                      is_biweekly_mode: boolean
                      is_one_shot: boolean
                      is_master: boolean
                      ext_dormakaba_oracode_user_level_prefix: number
                      dormakaba_oracode_user_level_id: string
                    }>
                  | undefined
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
          tedee_metadata?:
            | {
                device_id: number
                serial_number: string
                device_name: string
                device_model: string
                bridge_id: number
                bridge_name: string
                keypad_id?: number | undefined
              }
            | undefined
        }) &
          ({
            _experimental_supported_code_from_access_codes_lengths?:
              | (number[] | undefined)
              | undefined
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
                            | 'no_ascending_or_descending_sequence'
                            | 'at_least_three_unique_digits'
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
      }
      device: {
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Properties of the device. */
        properties: (({
          /** Indicates whether the device is online. */
          online: boolean
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          appearance: {
            /** Name of the device as seen from the provider API and application, not settable through Seam. */
            name: string
          }
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
          /** Indicates whether the device has direct power. */
          has_direct_power?: boolean | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Serial number of the device. */
          serial_number?: string | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          /**
                  ---
                  deprecated: use model.accessory_keypad_supported
                  ---
                   */
          supports_accessory_keypad?: boolean | undefined
          /**
                  ---
                  deprecated: use offline_access_codes_enabled
                  ---
                   */
          supports_offline_access_codes?: boolean | undefined
        } & {
          assa_abloy_credential_service_metadata?:
            | (
                | {
                    has_active_endpoint: boolean
                    endpoints: Array<{
                      endpoint_id: string
                      is_active: boolean
                    }>
                  }
                | undefined
              )
            | undefined
        }) & {
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
                access_code_length: number | null
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
                keypad_paired?: boolean | undefined
                keypad_2_paired?: boolean | undefined
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
          honeywell_resideo_metadata?:
            | {
                honeywell_resideo_device_id: string
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
                iana_timezone?: string | undefined
                predefined_time_slots?:
                  | Array<{
                      name: string
                      prefix: number
                      check_in_time: string
                      check_out_time: string
                      is_24_hour: boolean
                      is_biweekly_mode: boolean
                      is_one_shot: boolean
                      is_master: boolean
                      ext_dormakaba_oracode_user_level_prefix: number
                      dormakaba_oracode_user_level_id: string
                    }>
                  | undefined
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
          tedee_metadata?:
            | {
                device_id: number
                serial_number: string
                device_name: string
                device_model: string
                bridge_id: number
                bridge_name: string
                keypad_id?: number | undefined
              }
            | undefined
        }) &
          ({
            _experimental_supported_code_from_access_codes_lengths?:
              | (number[] | undefined)
              | undefined
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
                            | 'no_ascending_or_descending_sequence'
                            | 'at_least_three_unique_digits'
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
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
                | 'tedee_lock'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | (
                | 'ecobee_thermostat'
                | 'nest_thermostat'
                | 'honeywell_resideo_thermostat'
              )
            | ('ios_phone' | 'android_phone')
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
                | 'tedee_lock'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | (
                | 'ecobee_thermostat'
                | 'nest_thermostat'
                | 'honeywell_resideo_thermostat'
              )
            | ('ios_phone' | 'android_phone')
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
            | 'tedee'
            | 'honeywell_resideo'
          )
        | undefined
      device_ids?: string[] | undefined
      limit?: number
      created_before?: Date | undefined
      user_identifier_key?: string | undefined
      custom_metadata_has?: Record<string, string | boolean> | undefined
      include_if?:
        | Array<
            | 'can_remotely_unlock'
            | 'can_remotely_lock'
            | 'can_program_online_access_codes'
            | 'can_simulate_removal'
          >
        | undefined
      exclude_if?:
        | Array<
            | 'can_remotely_unlock'
            | 'can_remotely_lock'
            | 'can_program_online_access_codes'
            | 'can_simulate_removal'
          >
        | undefined
    }
    formData: {}
    jsonResponse: {
      locks: Array<{
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Properties of the device. */
        properties: (({
          /** Indicates whether the device is online. */
          online: boolean
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          appearance: {
            /** Name of the device as seen from the provider API and application, not settable through Seam. */
            name: string
          }
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
          /** Indicates whether the device has direct power. */
          has_direct_power?: boolean | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Serial number of the device. */
          serial_number?: string | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          /**
                  ---
                  deprecated: use model.accessory_keypad_supported
                  ---
                   */
          supports_accessory_keypad?: boolean | undefined
          /**
                  ---
                  deprecated: use offline_access_codes_enabled
                  ---
                   */
          supports_offline_access_codes?: boolean | undefined
        } & {
          assa_abloy_credential_service_metadata?:
            | (
                | {
                    has_active_endpoint: boolean
                    endpoints: Array<{
                      endpoint_id: string
                      is_active: boolean
                    }>
                  }
                | undefined
              )
            | undefined
        }) & {
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
                access_code_length: number | null
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
                keypad_paired?: boolean | undefined
                keypad_2_paired?: boolean | undefined
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
          honeywell_resideo_metadata?:
            | {
                honeywell_resideo_device_id: string
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
                iana_timezone?: string | undefined
                predefined_time_slots?:
                  | Array<{
                      name: string
                      prefix: number
                      check_in_time: string
                      check_out_time: string
                      is_24_hour: boolean
                      is_biweekly_mode: boolean
                      is_one_shot: boolean
                      is_master: boolean
                      ext_dormakaba_oracode_user_level_prefix: number
                      dormakaba_oracode_user_level_id: string
                    }>
                  | undefined
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
          tedee_metadata?:
            | {
                device_id: number
                serial_number: string
                device_name: string
                device_model: string
                bridge_id: number
                bridge_name: string
                keypad_id?: number | undefined
              }
            | undefined
        }) &
          ({
            _experimental_supported_code_from_access_codes_lengths?:
              | (number[] | undefined)
              | undefined
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
                            | 'no_ascending_or_descending_sequence'
                            | 'at_least_three_unique_digits'
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
      }>
      devices: Array<{
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Properties of the device. */
        properties: (({
          /** Indicates whether the device is online. */
          online: boolean
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          appearance: {
            /** Name of the device as seen from the provider API and application, not settable through Seam. */
            name: string
          }
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
          /** Indicates whether the device has direct power. */
          has_direct_power?: boolean | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Serial number of the device. */
          serial_number?: string | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          /**
                  ---
                  deprecated: use model.accessory_keypad_supported
                  ---
                   */
          supports_accessory_keypad?: boolean | undefined
          /**
                  ---
                  deprecated: use offline_access_codes_enabled
                  ---
                   */
          supports_offline_access_codes?: boolean | undefined
        } & {
          assa_abloy_credential_service_metadata?:
            | (
                | {
                    has_active_endpoint: boolean
                    endpoints: Array<{
                      endpoint_id: string
                      is_active: boolean
                    }>
                  }
                | undefined
              )
            | undefined
        }) & {
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
                access_code_length: number | null
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
                keypad_paired?: boolean | undefined
                keypad_2_paired?: boolean | undefined
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
          honeywell_resideo_metadata?:
            | {
                honeywell_resideo_device_id: string
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
                iana_timezone?: string | undefined
                predefined_time_slots?:
                  | Array<{
                      name: string
                      prefix: number
                      check_in_time: string
                      check_out_time: string
                      is_24_hour: boolean
                      is_biweekly_mode: boolean
                      is_one_shot: boolean
                      is_master: boolean
                      ext_dormakaba_oracode_user_level_prefix: number
                      dormakaba_oracode_user_level_id: string
                    }>
                  | undefined
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
          tedee_metadata?:
            | {
                device_id: number
                serial_number: string
                device_name: string
                device_model: string
                bridge_id: number
                bridge_name: string
                keypad_id?: number | undefined
              }
            | undefined
        }) &
          ({
            _experimental_supported_code_from_access_codes_lengths?:
              | (number[] | undefined)
              | undefined
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
                            | 'no_ascending_or_descending_sequence'
                            | 'at_least_three_unique_digits'
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
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
  '/networks/get': {
    route: '/networks/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      network_id: string
    }
    formData: {}
    jsonResponse: {
      network: {
        network_id: string
        workspace_id: string
        display_name: string
        created_at: string
      }
    }
  }
  '/networks/list': {
    route: '/networks/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      networks: Array<{
        network_id: string
        workspace_id: string
        display_name: string
        created_at: string
      }>
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
      is_programmed?: boolean | undefined
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
  '/phones/deactivate': {
    route: '/phones/deactivate'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {
      device_id: string
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/phones/list': {
    route: '/phones/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      owner_user_identity_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      phones: Array<{
        /** Unique identifier for the device. */
        device_id: string
        device_type: 'android_phone' | 'ios_phone'
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        properties: {
          assa_abloy_credential_service_metadata?:
            | {
                has_active_endpoint: boolean
                endpoints: Array<{
                  endpoint_id: string
                  is_active: boolean
                }>
              }
            | undefined
        }
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
      }>
    }
  }
  '/phones/simulate/create_sandbox_phone': {
    route: '/phones/simulate/create_sandbox_phone'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {
      custom_sdk_installation_id?: string | undefined
      user_identity_id: string
      phone_metadata?: {
        operating_system?: 'android' | 'ios'
        os_version?: string
        device_manufacturer?: string
        device_model?: string
      }
      assa_abloy_metadata?: {
        ble_capability?: boolean
        hce_capability?: boolean
        nfc_capability?: boolean
        application_version?: string
        seos_applet_version?: string
        seos_tsm_endpoint_id?: number
      }
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      phone: {
        /** Unique identifier for the device. */
        device_id: string
        device_type: 'android_phone' | 'ios_phone'
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        properties: {
          assa_abloy_credential_service_metadata?:
            | {
                has_active_endpoint: boolean
                endpoints: Array<{
                  endpoint_id: string
                  is_active: boolean
                }>
              }
            | undefined
        }
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
      }
    }
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
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
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
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
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
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
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
        /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
        errors?: any
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
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Properties of the device. */
        properties: (({
          /** Indicates whether the device is online. */
          online: boolean
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          appearance: {
            /** Name of the device as seen from the provider API and application, not settable through Seam. */
            name: string
          }
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
          /** Indicates whether the device has direct power. */
          has_direct_power?: boolean | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Serial number of the device. */
          serial_number?: string | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          /**
                  ---
                  deprecated: use model.accessory_keypad_supported
                  ---
                   */
          supports_accessory_keypad?: boolean | undefined
          /**
                  ---
                  deprecated: use offline_access_codes_enabled
                  ---
                   */
          supports_offline_access_codes?: boolean | undefined
        } & {
          assa_abloy_credential_service_metadata?:
            | (
                | {
                    has_active_endpoint: boolean
                    endpoints: Array<{
                      endpoint_id: string
                      is_active: boolean
                    }>
                  }
                | undefined
              )
            | undefined
        }) & {
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
                access_code_length: number | null
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
                keypad_paired?: boolean | undefined
                keypad_2_paired?: boolean | undefined
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
          honeywell_resideo_metadata?:
            | {
                honeywell_resideo_device_id: string
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
                iana_timezone?: string | undefined
                predefined_time_slots?:
                  | Array<{
                      name: string
                      prefix: number
                      check_in_time: string
                      check_out_time: string
                      is_24_hour: boolean
                      is_biweekly_mode: boolean
                      is_one_shot: boolean
                      is_master: boolean
                      ext_dormakaba_oracode_user_level_prefix: number
                      dormakaba_oracode_user_level_id: string
                    }>
                  | undefined
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
          tedee_metadata?:
            | {
                device_id: number
                serial_number: string
                device_name: string
                device_model: string
                bridge_id: number
                bridge_name: string
                keypad_id?: number | undefined
              }
            | undefined
        }) &
          ({
            _experimental_supported_code_from_access_codes_lengths?:
              | (number[] | undefined)
              | undefined
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
                            | 'no_ascending_or_descending_sequence'
                            | 'at_least_three_unique_digits'
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
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
                | 'tedee_lock'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | (
                | 'ecobee_thermostat'
                | 'nest_thermostat'
                | 'honeywell_resideo_thermostat'
              )
            | ('ios_phone' | 'android_phone')
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
                | 'tedee_lock'
              )
            | ('noiseaware_activity_zone' | 'minut_sensor')
            | (
                | 'ecobee_thermostat'
                | 'nest_thermostat'
                | 'honeywell_resideo_thermostat'
              )
            | ('ios_phone' | 'android_phone')
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
            | 'tedee'
            | 'honeywell_resideo'
          )
        | undefined
      device_ids?: string[] | undefined
      limit?: number
      created_before?: Date | undefined
      user_identifier_key?: string | undefined
      custom_metadata_has?: Record<string, string | boolean> | undefined
      include_if?:
        | Array<
            | 'can_remotely_unlock'
            | 'can_remotely_lock'
            | 'can_program_online_access_codes'
            | 'can_simulate_removal'
          >
        | undefined
      exclude_if?:
        | Array<
            | 'can_remotely_unlock'
            | 'can_remotely_lock'
            | 'can_program_online_access_codes'
            | 'can_simulate_removal'
          >
        | undefined
    }
    formData: {}
    jsonResponse: {
      thermostats: Array<{
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Properties of the device. */
        properties: (({
          /** Indicates whether the device is online. */
          online: boolean
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          appearance: {
            /** Name of the device as seen from the provider API and application, not settable through Seam. */
            name: string
          }
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
          /** Indicates whether the device has direct power. */
          has_direct_power?: boolean | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Serial number of the device. */
          serial_number?: string | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          /**
                  ---
                  deprecated: use model.accessory_keypad_supported
                  ---
                   */
          supports_accessory_keypad?: boolean | undefined
          /**
                  ---
                  deprecated: use offline_access_codes_enabled
                  ---
                   */
          supports_offline_access_codes?: boolean | undefined
        } & {
          assa_abloy_credential_service_metadata?:
            | (
                | {
                    has_active_endpoint: boolean
                    endpoints: Array<{
                      endpoint_id: string
                      is_active: boolean
                    }>
                  }
                | undefined
              )
            | undefined
        }) & {
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
                access_code_length: number | null
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
                keypad_paired?: boolean | undefined
                keypad_2_paired?: boolean | undefined
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
          honeywell_resideo_metadata?:
            | {
                honeywell_resideo_device_id: string
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
                iana_timezone?: string | undefined
                predefined_time_slots?:
                  | Array<{
                      name: string
                      prefix: number
                      check_in_time: string
                      check_out_time: string
                      is_24_hour: boolean
                      is_biweekly_mode: boolean
                      is_one_shot: boolean
                      is_master: boolean
                      ext_dormakaba_oracode_user_level_prefix: number
                      dormakaba_oracode_user_level_id: string
                    }>
                  | undefined
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
          tedee_metadata?:
            | {
                device_id: number
                serial_number: string
                device_name: string
                device_model: string
                bridge_id: number
                bridge_name: string
                keypad_id?: number | undefined
              }
            | undefined
        }) &
          ({
            _experimental_supported_code_from_access_codes_lengths?:
              | (number[] | undefined)
              | undefined
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
                            | 'no_ascending_or_descending_sequence'
                            | 'at_least_three_unique_digits'
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
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
      phone_number?: (string | null) | undefined
      full_name?: (string | null) | undefined
    }
    formData: {}
    jsonResponse: {
      user_identity: {
        user_identity_id: string
        user_identity_key: string | null
        email_address: string | null
        phone_number: string | null
        display_name: string
        full_name: string | null
        created_at: string
        workspace_id: string
      }
    }
  }
  '/user_identities/delete': {
    route: '/user_identities/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/user_identities/enrollment_automations/delete': {
    route: '/user_identities/enrollment_automations/delete'
    method: 'DELETE' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      enrollment_automation_id: string
    }
    formData: {}
    jsonResponse: {}
  }
  '/user_identities/enrollment_automations/get': {
    route: '/user_identities/enrollment_automations/get'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      enrollment_automation_id: string
    }
    formData: {}
    jsonResponse: {
      enrollment_automation: {
        credential_manager_acs_system_id: string
        user_identity_id: string
        created_at: string
        workspace_id: string
        enrollment_automation_id: string
      }
    }
  }
  '/user_identities/enrollment_automations/launch': {
    route: '/user_identities/enrollment_automations/launch'
    method: 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
      credential_manager_acs_system_id: string
      acs_credential_pool_id?: string | undefined
      create_credential_manager_user?: boolean | undefined
      credential_manager_acs_user_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      enrollment_automation: {
        acs_credential_provisioning_automation_id: string
        credential_manager_acs_system_id: string
        user_identity_id: string
        created_at: string
        workspace_id: string
        enrollment_automation_id: string
      }
    }
  }
  '/user_identities/enrollment_automations/list': {
    route: '/user_identities/enrollment_automations/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
    }
    formData: {}
    jsonResponse: {
      enrollment_automations: Array<{
        credential_manager_acs_system_id: string
        user_identity_id: string
        created_at: string
        workspace_id: string
        enrollment_automation_id: string
      }>
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
        user_identity_key: string | null
        email_address: string | null
        phone_number: string | null
        display_name: string
        full_name: string | null
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
  '/user_identities/list': {
    route: '/user_identities/list'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      credential_manager_acs_system_id?: string | undefined
    }
    formData: {}
    jsonResponse: {
      user_identities: Array<{
        user_identity_id: string
        user_identity_key: string | null
        email_address: string | null
        phone_number: string | null
        display_name: string
        full_name: string | null
        created_at: string
        workspace_id: string
      }>
    }
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
        /** Unique identifier for the device. */
        device_id: string
        /** Type of the device. */
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
              | 'tedee_lock'
            )
          | ('noiseaware_activity_zone' | 'minut_sensor')
          | (
              | 'ecobee_thermostat'
              | 'nest_thermostat'
              | 'honeywell_resideo_thermostat'
            )
          | ('ios_phone' | 'android_phone')
        /** Optional nickname to describe the device, settable through Seam */
        nickname?: string | undefined
        /** Display name of the device, defaults to nickname (if it is set) or properties.appearance.name otherwise. Enables administrators and users to identify the device easily, especially when there are numerous devices. */
        display_name: string
        /** Collection of capabilities that the device supports when connected to Seam. Values are "access_code," which indicates that the device can manage and utilize digital PIN codes for secure access; "lock," which indicates that the device controls a door locking mechanism, enabling the remote opening and closing of doors and other entry points; "noise_detection," which indicates that the device supports monitoring and responding to ambient noise levels; "thermostat," which indicates that the device can regulate and adjust indoor temperatures; and "battery," which indicates that the device can manage battery life and health. */
        capabilities_supported: Array<
          | 'access_code'
          | 'lock'
          | 'noise_detection'
          | 'thermostat'
          | 'battery'
          | 'phone'
        >
        /** Properties of the device. */
        properties: (({
          /** Indicates whether the device is online. */
          online: boolean
          /**
                  ---
                  deprecated: use device.display_name instead
                  ---
                  Name of the device.
                   */
          name: string
          /** Represents the accessory keypad state. */
          accessory_keypad?:
            | {
                /** Indicates if the accessory_keypad is connected to the device. */
                is_connected: boolean
                /** Indicates if the keypad battery properties. */
                battery?:
                  | {
                      level: number
                    }
                  | undefined
              }
            | undefined
          appearance: {
            /** Name of the device as seen from the provider API and application, not settable through Seam. */
            name: string
          }
          model: {
            /** Indicates whether the device can connect a accessory keypad. */
            can_connect_accessory_keypad?: boolean | undefined
            /** Display name of the device model. */
            display_name: string
            /** Display name that corresponds to the manufacturer-specific terminology for the device. */
            manufacturer_display_name: string
            /** Indicates whether the device has a built in accessory keypad. */
            has_built_in_keypad?: boolean | undefined
            /** Indicates whether the device supports offline access codes. */
            offline_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports online access codes. */
            online_access_codes_supported?: boolean | undefined
            /** Indicates whether the device supports an accessory keypad. */
            accessory_keypad_supported?: boolean | undefined
          }
          /** Indicates whether the device has direct power. */
          has_direct_power?: boolean | undefined
          /** Indicates the battery level of the device as a decimal value between 0 and 1, inclusive. */
          battery_level?: number | undefined
          /** Represents the current status of the battery charge level. Values are "critical," which indicates an extremely low level, suggesting imminent shutdown or an urgent need for charging; "low," which signifies that the battery is under the preferred threshold and should be charged soon; "good," which denotes a satisfactory charge level, adequate for normal use without the immediate need for recharging; and "full," which represents a battery that is fully charged, providing the maximum duration of usage. */
          battery?:
            | {
                level: number
                status: 'critical' | 'low' | 'good' | 'full'
              }
            | undefined
          /** Manufacturer of the device. */
          manufacturer?: string | undefined
          /** Image URL for the device. */
          image_url?: string | undefined
          /** Alt text for the device image. */
          image_alt_text?: string | undefined
          /** Serial number of the device. */
          serial_number?: string | undefined
          /** Indicates whether it is currently possible to use online access codes for the device. */
          online_access_codes_enabled?: boolean | undefined
          /** Indicates whether it is currently possible to use offline access codes for the device. */
          offline_access_codes_enabled?: boolean | undefined
          /**
                  ---
                  deprecated: use model.accessory_keypad_supported
                  ---
                   */
          supports_accessory_keypad?: boolean | undefined
          /**
                  ---
                  deprecated: use offline_access_codes_enabled
                  ---
                   */
          supports_offline_access_codes?: boolean | undefined
        } & {
          assa_abloy_credential_service_metadata?:
            | (
                | {
                    has_active_endpoint: boolean
                    endpoints: Array<{
                      endpoint_id: string
                      is_active: boolean
                    }>
                  }
                | undefined
              )
            | undefined
        }) & {
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
                access_code_length: number | null
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
                keypad_paired?: boolean | undefined
                keypad_2_paired?: boolean | undefined
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
          honeywell_resideo_metadata?:
            | {
                honeywell_resideo_device_id: string
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
                iana_timezone?: string | undefined
                predefined_time_slots?:
                  | Array<{
                      name: string
                      prefix: number
                      check_in_time: string
                      check_out_time: string
                      is_24_hour: boolean
                      is_biweekly_mode: boolean
                      is_one_shot: boolean
                      is_master: boolean
                      ext_dormakaba_oracode_user_level_prefix: number
                      dormakaba_oracode_user_level_id: string
                    }>
                  | undefined
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
          tedee_metadata?:
            | {
                device_id: number
                serial_number: string
                device_name: string
                device_model: string
                bridge_id: number
                bridge_name: string
                keypad_id?: number | undefined
              }
            | undefined
        }) &
          ({
            _experimental_supported_code_from_access_codes_lengths?:
              | (number[] | undefined)
              | undefined
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
                            | 'no_ascending_or_descending_sequence'
                            | 'at_least_three_unique_digits'
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
                          /** Collection of errors associated with the access code, structured in a dictionary format. A unique "error_code" keys each error. Each error entry is an object containing two fields: "message" and "created_at." "message" is a string that describes the error. "created_at" is a date that indicates when the error was generated. This structure enables detailed tracking and timely response to critical issues. */
                          errors?: any
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
        /** Location information for the device. */
        location: {
          /** Name of the device location. */
          location_name?: string | undefined
          /** Time zone of the device location. */
          timezone?: string | undefined
        } | null
        /** Unique identifier for the account associated with the device. */
        connected_account_id: string
        /** Unique identifier for the Seam workspace associated with the device. */
        workspace_id: string
        /** Array of errors associated with the device. Each error object within the array contains two fields: "error_code" and "message." "error_code" is a string that uniquely identifies the type of error, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the error, offering insights into the issue and potentially how to rectify it. */
        errors: Array<{
          error_code: string
          message: string
        }>
        /** Array of warnings associated with the device. Each warning object within the array contains two fields: "warning_code" and "message." "warning_code" is a string that uniquely identifies the type of warning, enabling quick recognition and categorization of the issue. "message" provides a more detailed description of the warning, offering insights into the issue and potentially how to rectify it. */
        warnings: Array<{
          warning_code: string
          message: string
        }>
        /** Date and time at which the device object was created. */
        created_at: string
        /** Indicates whether Seam manages the device. */
        is_managed: true
        custom_metadata: Record<string, string | boolean>
        can_remotely_unlock?: boolean | undefined
        can_remotely_lock?: boolean | undefined
        can_program_online_access_codes?: boolean | undefined
        can_simulate_removal?: boolean | undefined
      }>
    }
  }
  '/user_identities/list_acs_systems': {
    route: '/user_identities/list_acs_systems'
    method: 'GET' | 'POST'
    queryParams: {}
    jsonBody: {}
    commonParams: {
      user_identity_id: string
    }
    formData: {}
    jsonResponse: {
      acs_systems: Array<{
        acs_system_id: string
        external_type:
          | 'pti_site'
          | 'alta_org'
          | 'salto_site'
          | 'brivo_account'
          | 'hid_credential_manager_organization'
          | 'visionline_system'
          | 'assa_abloy_credential_service'
          | 'latch_building'
        external_type_display_name: string
        /**
              ---
              deprecated: use external_type
              ---
               */
        system_type:
          | 'pti_site'
          | 'alta_org'
          | 'salto_site'
          | 'brivo_account'
          | 'hid_credential_manager_organization'
          | 'visionline_system'
          | 'assa_abloy_credential_service'
          | 'latch_building'
        /**
              ---
              deprecated: use external_type_display_name
              ---
               */
        system_type_display_name: string
        name: string
        created_at: string
        workspace_id: string
        connected_account_ids: string[]
        image_url: string
        image_alt_text: string
        can_automate_enrollment?: boolean | undefined
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
        hid_acs_system_id?: string | undefined
        workspace_id: string
        created_at: string
        display_name: string
        external_type?:
          | (
              | 'pti_user'
              | 'brivo_user'
              | 'hid_credential_manager_user'
              | 'salto_site_user'
            )
          | undefined
        external_type_display_name?: string | undefined
        is_suspended: boolean
        access_schedule?:
          | {
              starts_at: string
              ends_at: string
            }
          | undefined
        user_identity_id?: string | undefined
        user_identity_email_address?: string | undefined
        user_identity_phone_number?: string | undefined
        full_name?: string | undefined
        /**
            ---
            deprecated: use email_address.
            ---
             */
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
  '/user_identities/update': {
    route: '/user_identities/update'
    method: 'PATCH' | 'POST'
    queryParams: {}
    jsonBody: {
      user_identity_id: string
      user_identity_key?: (string | null) | undefined
      email_address?: (string | null) | undefined
      phone_number?: (string | null) | undefined
      full_name?: (string | null) | undefined
    }
    commonParams: {}
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
  '/webhooks/update': {
    route: '/webhooks/update'
    method: 'PUT' | 'POST'
    queryParams: {}
    jsonBody: {
      webhook_id: string
      event_types: string[]
    }
    commonParams: {}
    formData: {}
    jsonResponse: {}
  }
  '/workspaces/create': {
    route: '/workspaces/create'
    method: 'POST'
    queryParams: {}
    jsonBody: {
      name: string
      /** The name shown inside the connect webview */
      connect_partner_name: string
      is_sandbox?: boolean
      webview_primary_button_color?: string | undefined
      webview_logo_shape?: ('circle' | 'square') | undefined
    }
    commonParams: {}
    formData: {}
    jsonResponse: {
      workspace: {
        workspace_id: string
        name: string
        connect_partner_name: string | null
        is_sandbox: boolean
      }
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
}

export type RouteResponse<Path extends keyof Routes> =
  Routes[Path]['jsonResponse']

export type RouteRequestBody<Path extends keyof Routes> =
  Routes[Path]['jsonBody'] & Routes[Path]['commonParams']

export type RouteRequestParams<Path extends keyof Routes> =
  Routes[Path]['queryParams'] & Routes[Path]['commonParams']
