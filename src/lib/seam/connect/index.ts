export const loadSchemas = () => import('./schemas.js')

export type * from './model-types.js'
export { default as openapi } from './openapi.js'
export type * from './route-types.js'

export const routes = {}
