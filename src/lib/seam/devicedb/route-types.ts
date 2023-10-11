export interface Routes {
  '/v1/device_models/get': {
    route: '/v1/device_models/get'
    method: 'GET' | 'OPTIONS'
    queryParams: {
      device_model_id: string
    }
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      device_model: {
        device_model_id: string
        manufacturer: {
          manufacturer_id: string
          display_name: string
          logo?:
            | {
                url: string
                width: number
                height: number
              }
            | undefined
          integration: 'stable' | 'beta' | 'planned' | 'unsupported' | 'inquire'
          is_connect_webview_supported: boolean
          requires_seam_support_to_add_account: boolean
        }
        is_device_supported: boolean
        display_name: string
        description: string
        product_url?: string | undefined
        main_connection_type: 'wifi' | 'zwave' | 'zigbee' | 'unknown'
        aesthetic_variants: Array<{
          slug: string
          display_name: string
          primary_color_hex?: string | undefined
          manufacturer_sku?: string | undefined
          front_image?:
            | {
                url: string
                width: number
                height: number
              }
            | undefined
          back_image?:
            | {
                url: string
                width: number
                height: number
              }
            | undefined
          images: Array<{
            url: string
            width: number
            height: number
          }>
        }>
        power_sources: Array<
          | 'battery'
          | 'hardwired'
          | 'mechanical_harvesting'
          | 'wireless'
          | 'ethernet'
        >
      } & (
        | {
            main_category: 'smartlock'
            physical_properties: {
              lock_type:
                | 'deadbolt'
                | 'lever'
                | 'mortise'
                | 'lockbox'
                | 'cylinder'
                | 'padlock'
                | 'locker'
                | 'unknown'
              has_physical_key: boolean
              has_camera: boolean
            }
            software_features: {
              can_remotely_unlock: boolean
              can_program_access_codes: boolean
              can_program_access_schedules: boolean
              can_program_access_codes_offline: boolean
            }
          }
        | {
            main_category: 'sensor'
            physical_properties: {
              has_noise_sensor: boolean
              has_humidity_sensor: boolean
              has_temperature_sensor: boolean
              has_occupancy_detection: boolean
            }
          }
        | {
            main_category: 'thermostat'
            physical_properties: {
              available_modes: Array<'heat' | 'cool' | 'fan' | 'eco'>
              is_heat_pump_compatible: boolean
              has_occupancy_detection: boolean
              supports_demand_response: boolean
              has_humidity_sensor: boolean
              has_temperature_sensor: boolean
              supports_emergency_heating_mode: boolean
            }
            software_features: {
              can_program_climate_schedules: boolean
            }
          }
        | {
            main_category: 'relay'
          }
        | {
            main_category: 'intercom'
            physical_properties: {
              has_camera: boolean
            }
            software_features: {
              can_remotely_unlock: boolean
              can_program_access_codes: boolean
            }
          }
        | {
            main_category: 'accessory'
          }
      )
    }
  }
  '/v1/device_models/list': {
    route: '/v1/device_models/list'
    method: 'GET' | 'OPTIONS'
    queryParams: {
      main_category?:
        | (
            | 'smartlock'
            | 'sensor'
            | 'thermostat'
            | 'relay'
            | 'intercom'
            | 'accessory'
          )
        | undefined
      manufacturer_id?: string | undefined
      manufacturer_ids?: string[] | undefined
      integration_status?:
        | ('stable' | 'beta' | 'planned' | 'unsupported' | 'inquire')
        | undefined
      text_search?: string | undefined
    }
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      device_models: Array<
        {
          device_model_id: string
          manufacturer: {
            manufacturer_id: string
            display_name: string
            logo?:
              | {
                  url: string
                  width: number
                  height: number
                }
              | undefined
            integration:
              | 'stable'
              | 'beta'
              | 'planned'
              | 'unsupported'
              | 'inquire'
            is_connect_webview_supported: boolean
            requires_seam_support_to_add_account: boolean
          }
          is_device_supported: boolean
          display_name: string
          description: string
          product_url?: string | undefined
          main_connection_type: 'wifi' | 'zwave' | 'zigbee' | 'unknown'
          aesthetic_variants: Array<{
            slug: string
            display_name: string
            primary_color_hex?: string | undefined
            manufacturer_sku?: string | undefined
            front_image?:
              | {
                  url: string
                  width: number
                  height: number
                }
              | undefined
            back_image?:
              | {
                  url: string
                  width: number
                  height: number
                }
              | undefined
            images: Array<{
              url: string
              width: number
              height: number
            }>
          }>
          power_sources: Array<
            | 'battery'
            | 'hardwired'
            | 'mechanical_harvesting'
            | 'wireless'
            | 'ethernet'
          >
        } & (
          | {
              main_category: 'smartlock'
              physical_properties: {
                lock_type:
                  | 'deadbolt'
                  | 'lever'
                  | 'mortise'
                  | 'lockbox'
                  | 'cylinder'
                  | 'padlock'
                  | 'locker'
                  | 'unknown'
                has_physical_key: boolean
                has_camera: boolean
              }
              software_features: {
                can_remotely_unlock: boolean
                can_program_access_codes: boolean
                can_program_access_schedules: boolean
                can_program_access_codes_offline: boolean
              }
            }
          | {
              main_category: 'sensor'
              physical_properties: {
                has_noise_sensor: boolean
                has_humidity_sensor: boolean
                has_temperature_sensor: boolean
                has_occupancy_detection: boolean
              }
            }
          | {
              main_category: 'thermostat'
              physical_properties: {
                available_modes: Array<'heat' | 'cool' | 'fan' | 'eco'>
                is_heat_pump_compatible: boolean
                has_occupancy_detection: boolean
                supports_demand_response: boolean
                has_humidity_sensor: boolean
                has_temperature_sensor: boolean
                supports_emergency_heating_mode: boolean
              }
              software_features: {
                can_program_climate_schedules: boolean
              }
            }
          | {
              main_category: 'relay'
            }
          | {
              main_category: 'intercom'
              physical_properties: {
                has_camera: boolean
              }
              software_features: {
                can_remotely_unlock: boolean
                can_program_access_codes: boolean
              }
            }
          | {
              main_category: 'accessory'
            }
        )
      >
    }
  }
  '/v1/manufacturers/get': {
    route: '/v1/manufacturers/get'
    method: 'GET' | 'OPTIONS'
    queryParams: {
      manufacturer_id: string
    }
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      manufacturer: {
        manufacturer_id: string
        display_name: string
        logo?:
          | {
              url: string
              width: number
              height: number
            }
          | undefined
        integration: 'stable' | 'beta' | 'planned' | 'unsupported' | 'inquire'
        is_connect_webview_supported: boolean
        requires_seam_support_to_add_account: boolean
      }
    }
  }
  '/v1/manufacturers/list': {
    route: '/v1/manufacturers/list'
    method: 'GET' | 'OPTIONS'
    queryParams: {
      integration_status?:
        | ('stable' | 'beta' | 'planned' | 'unsupported' | 'inquire')
        | undefined
    }
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      manufacturers: Array<{
        manufacturer_id: string
        display_name: string
        logo?:
          | {
              url: string
              width: number
              height: number
            }
          | undefined
        integration: 'stable' | 'beta' | 'planned' | 'unsupported' | 'inquire'
        is_connect_webview_supported: boolean
        requires_seam_support_to_add_account: boolean
      }>
    }
  }
}

export type RouteResponse<Path extends keyof Routes> =
  Routes[Path]['jsonResponse']

export type RouteRequestBody<Path extends keyof Routes> =
  Routes[Path]['jsonBody'] & Routes[Path]['commonParams']

export type RouteRequestParams<Path extends keyof Routes> =
  Routes[Path]['queryParams'] & Routes[Path]['commonParams']
