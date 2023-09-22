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
          integration: 'stable' | 'beta' | 'planned' | 'unsupported'
          is_connect_webview_supported: boolean
          requires_seam_support_to_add_account: boolean
        }
        is_device_supported: boolean
        display_name: string
        description: string
        product_url: string
        main_connection_type: 'wifi' | 'zwave' | 'zigbee' | 'unknown'
        main_category: 'smartlock' | 'thermostat' | 'noise_sensor'
        aesthetic_variants: Array<{
          slug: string
          display_name: string
          primary_color_hex?: string | undefined
          manufacturer_sku: string
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
        }>
      }
    }
  }
  '/v1/device_models/list': {
    route: '/v1/device_models/list'
    method: 'GET' | 'OPTIONS'
    queryParams: {
      main_category?: string | undefined
      manufacturer_id?: string | undefined
      integration_status?:
        | ('stable' | 'beta' | 'planned' | 'unsupported')
        | undefined
      text_search?: string | undefined
    }
    jsonBody: {}
    commonParams: {}
    formData: {}
    jsonResponse: {
      device_models: Array<{
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
          integration: 'stable' | 'beta' | 'planned' | 'unsupported'
          is_connect_webview_supported: boolean
          requires_seam_support_to_add_account: boolean
        }
        is_device_supported: boolean
        display_name: string
        description: string
        product_url: string
        main_connection_type: 'wifi' | 'zwave' | 'zigbee' | 'unknown'
        main_category: 'smartlock' | 'thermostat' | 'noise_sensor'
        aesthetic_variants: Array<{
          slug: string
          display_name: string
          primary_color_hex?: string | undefined
          manufacturer_sku: string
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
        }>
      }>
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
        integration: 'stable' | 'beta' | 'planned' | 'unsupported'
        is_connect_webview_supported: boolean
        requires_seam_support_to_add_account: boolean
      }
    }
  }
  '/v1/manufacturers/list': {
    route: '/v1/manufacturers/list'
    method: 'GET' | 'OPTIONS'
    queryParams: {}
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
        integration: 'stable' | 'beta' | 'planned' | 'unsupported'
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
