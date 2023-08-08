export default {
  openapi: '3.0.0',
  info: { title: 'Seam Connect', version: '1.0.0' },
  servers: [{ url: 'https://connect.getseam.com' }],
  tags: [
    { name: '/access_codes', description: 'access_codes' },
    { name: '/action_attempts', description: 'action_attempts' },
    { name: '/client_sessions', description: 'client_sessions' },
    { name: '/connected_accounts', description: 'connected_accounts' },
    { name: '/connect_webviews', description: 'connect_webviews' },
    { name: '/devices', description: 'devices' },
    { name: '/events', description: 'events' },
    { name: '/health', description: 'health' },
    { name: '/locks', description: 'locks' },
    { name: '/noise_sensors', description: 'noise_sensors' },
    { name: '/webhooks', description: 'webhooks' },
    { name: '/workspaces', description: 'workspaces' },
  ],
  paths: {
    '/action_attempts/get': {
      post: {
        'x-fern-sdk-group-name': ['action_attempts'],
        'x-fern-sdk-method-name': 'get',
        summary: '/action_attempts/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  action_attempt_id: { type: 'string', format: 'uuid' },
                },
                required: ['action_attempt_id'],
              },
            },
          },
        },
        tags: ['/action_attempts'],
        operationId: 'actionAttemptsGetPost',
      },
    },
    '/action_attempts/list': {
      post: {
        'x-fern-sdk-group-name': ['action_attempts'],
        'x-fern-sdk-method-name': 'list',
        summary: '/action_attempts/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempts: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/action_attempt' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempts', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  action_attempt_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                  },
                },
                required: ['action_attempt_ids'],
              },
            },
          },
        },
        tags: ['/action_attempts'],
        operationId: 'actionAttemptsListPost',
      },
    },
    '/access_codes/create': {
      post: {
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'create',
        summary: '/access_codes/create',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    access_code: { $ref: '#/components/schemas/access_code' },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'access_code', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  starts_at: { type: 'string' },
                  ends_at: { type: 'string' },
                  code: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 8,
                    pattern: '^\\d+$',
                  },
                  sync: { default: false, type: 'boolean' },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  common_code_key: { type: 'string' },
                  prefer_native_scheduling: { type: 'boolean' },
                  use_backup_access_code_pool: { type: 'boolean' },
                },
                required: ['device_id'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesCreatePost',
      },
    },
    '/access_codes/create_multiple': {
      put: {
        'x-fern-ignore': true,
        summary: '/access_codes/create_multiple',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    access_codes: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/access_code' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_codes', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                  },
                  behavior_when_code_cannot_be_shared: {
                    default: 'throw',
                    type: 'string',
                    enum: ['throw', 'create_random_code'],
                  },
                  name: { type: 'string' },
                  starts_at: { type: 'string' },
                  ends_at: { type: 'string' },
                  code: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 8,
                    pattern: '^\\d+$',
                  },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  prefer_native_scheduling: { type: 'boolean' },
                  use_backup_access_code_pool: { type: 'boolean' },
                },
                required: ['device_ids'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesCreateMultiplePut',
      },
      post: {
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'create_multiple',
        summary: '/access_codes/create_multiple',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    access_codes: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/access_code' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_codes', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                  },
                  behavior_when_code_cannot_be_shared: {
                    default: 'throw',
                    type: 'string',
                    enum: ['throw', 'create_random_code'],
                  },
                  name: { type: 'string' },
                  starts_at: { type: 'string' },
                  ends_at: { type: 'string' },
                  code: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 8,
                    pattern: '^\\d+$',
                  },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  prefer_native_scheduling: { type: 'boolean' },
                  use_backup_access_code_pool: { type: 'boolean' },
                },
                required: ['device_ids'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesCreateMultiplePost',
      },
    },
    '/access_codes/delete': {
      post: {
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'delete',
        summary: '/access_codes/delete',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  access_code_id: { type: 'string', format: 'uuid' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['access_code_id'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesDeletePost',
      },
    },
    '/access_codes/get': {
      post: {
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'get',
        summary: '/access_codes/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    access_code: { $ref: '#/components/schemas/access_code' },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_code', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  access_code_id: { type: 'string', format: 'uuid' },
                  code: { type: 'string' },
                },
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesGetPost',
      },
    },
    '/access_codes/list': {
      post: {
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'list',
        summary: '/access_codes/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    access_codes: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/access_code' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_codes', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  access_code_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                  },
                },
                required: ['device_id'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesListPost',
      },
    },
    '/access_codes/pull_backup_access_code': {
      post: {
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'pull_backup_access_code',
        summary: '/access_codes/pull_backup_access_code',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    backup_access_code: {
                      $ref: '#/components/schemas/access_code',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['backup_access_code', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  access_code_id: { type: 'string', format: 'uuid' },
                },
                required: ['access_code_id'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesPullBackupAccessCodePost',
      },
    },
    '/access_codes/update': {
      put: {
        'x-fern-ignore': true,
        summary: '/access_codes/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  starts_at: { type: 'string' },
                  ends_at: { type: 'string' },
                  code: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 8,
                    pattern: '^\\d+$',
                  },
                  sync: { default: false, type: 'boolean' },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  prefer_native_scheduling: { type: 'boolean' },
                  use_backup_access_code_pool: { type: 'boolean' },
                  access_code_id: { type: 'string', format: 'uuid' },
                  device_id: { type: 'string', format: 'uuid' },
                  type: { type: 'string', enum: ['ongoing', 'time_bound'] },
                },
                required: ['access_code_id'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesUpdatePut',
      },
      post: {
        'x-fern-sdk-group-name': ['access_codes'],
        'x-fern-sdk-method-name': 'update',
        summary: '/access_codes/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  starts_at: { type: 'string' },
                  ends_at: { type: 'string' },
                  code: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 8,
                    pattern: '^\\d+$',
                  },
                  sync: { default: false, type: 'boolean' },
                  attempt_for_offline_device: {
                    default: true,
                    type: 'boolean',
                  },
                  prefer_native_scheduling: { type: 'boolean' },
                  use_backup_access_code_pool: { type: 'boolean' },
                  access_code_id: { type: 'string', format: 'uuid' },
                  device_id: { type: 'string', format: 'uuid' },
                  type: { type: 'string', enum: ['ongoing', 'time_bound'] },
                },
                required: ['access_code_id'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesUpdatePost',
      },
    },
    '/connected_accounts/delete': {
      post: {
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'delete',
        summary: '/connected_accounts/delete',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  connected_account_id: { type: 'string', format: 'uuid' },
                },
                required: ['connected_account_id'],
              },
            },
          },
        },
        tags: ['/connected_accounts'],
        operationId: 'connectedAccountsDeletePost',
      },
    },
    '/connected_accounts/get': {
      post: {
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'get',
        summary: '/connected_accounts/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    connected_account: {
                      $ref: '#/components/schemas/connected_account',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connected_account', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    type: 'object',
                    properties: {
                      connected_account_id: { type: 'string', format: 'uuid' },
                    },
                    required: ['connected_account_id'],
                  },
                  {
                    type: 'object',
                    properties: { email: { type: 'string', format: 'email' } },
                    required: ['email'],
                  },
                ],
              },
            },
          },
        },
        tags: ['/connected_accounts'],
        operationId: 'connectedAccountsGetPost',
      },
    },
    '/connected_accounts/list': {
      post: {
        'x-fern-sdk-group-name': ['connected_accounts'],
        'x-fern-sdk-method-name': 'list',
        summary: '/connected_accounts/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    connected_accounts: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/connected_account' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connected_accounts', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ['/connected_accounts'],
        operationId: 'connectedAccountsListPost',
      },
      get: {
        'x-fern-ignore': true,
        summary: '/connected_accounts/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    connected_accounts: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/connected_account' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connected_accounts', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ['/connected_accounts'],
        operationId: 'connectedAccountsListGet',
      },
    },
    '/devices/delete': {
      post: {
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'delete',
        summary: '/devices/delete',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { device_id: { type: 'string', format: 'uuid' } },
                required: ['device_id'],
              },
            },
          },
        },
        tags: ['/devices'],
        operationId: 'devicesDeletePost',
      },
    },
    '/devices/get': {
      post: {
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'get',
        summary: '/devices/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    device: { $ref: '#/components/schemas/device' },
                    ok: { type: 'boolean' },
                  },
                  required: ['device', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        tags: ['/devices'],
        operationId: 'devicesGetPost',
      },
    },
    '/devices/list': {
      post: {
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'list',
        summary: '/devices/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    devices: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/device' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['devices', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  connected_account_id: { type: 'string', format: 'uuid' },
                  connected_account_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                    minItems: 1,
                  },
                  connect_webview_id: { type: 'string', format: 'uuid' },
                  device_type: {
                    oneOf: [
                      {
                        type: 'string',
                        enum: [
                          'akuvox_lock',
                          'august_lock',
                          'brivo_access_point',
                          'butterflymx_panel',
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
                          'yale_lock',
                          'two_n_intercom',
                          'controlbyweb_device',
                          'ttlock_lock',
                          'igloohome_lock',
                          'hubitat_lock',
                        ],
                      },
                      {
                        type: 'string',
                        enum: ['noiseaware_activity_zone', 'minut_sensor'],
                      },
                      {
                        type: 'string',
                        enum: ['ecobee_thermostat', 'nest_thermostat'],
                      },
                    ],
                  },
                  device_types: {
                    type: 'array',
                    items: {
                      oneOf: [
                        {
                          type: 'string',
                          enum: [
                            'akuvox_lock',
                            'august_lock',
                            'brivo_access_point',
                            'butterflymx_panel',
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
                            'yale_lock',
                            'two_n_intercom',
                            'controlbyweb_device',
                            'ttlock_lock',
                            'igloohome_lock',
                            'hubitat_lock',
                          ],
                        },
                        {
                          type: 'string',
                          enum: ['noiseaware_activity_zone', 'minut_sensor'],
                        },
                        {
                          type: 'string',
                          enum: ['ecobee_thermostat', 'nest_thermostat'],
                        },
                      ],
                    },
                  },
                  manufacturer: {
                    type: 'string',
                    enum: [
                      'akuvox',
                      'august',
                      'brivo',
                      'butterflymx',
                      'doorking',
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
                    ],
                  },
                  device_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                  },
                  limit: { default: 500, type: 'number', nullable: true },
                  created_before: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
        tags: ['/devices'],
        operationId: 'devicesListPost',
      },
    },
    '/devices/list_device_providers': {
      post: {
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'list_device_providers',
        summary: '/devices/list_device_providers',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    device_providers: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          device_provider_name: { type: 'string' },
                          display_name: { type: 'string' },
                          image_url: { type: 'string' },
                          provider_categories: {
                            type: 'array',
                            items: {
                              type: 'string',
                              enum: ['stable', 'consumer_smartlocks'],
                            },
                          },
                        },
                        required: [
                          'device_provider_name',
                          'display_name',
                          'image_url',
                          'provider_categories',
                        ],
                      },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['device_providers', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  provider_category: {
                    type: 'string',
                    enum: ['stable', 'consumer_smartlocks'],
                  },
                },
              },
            },
          },
        },
        tags: ['/devices'],
        operationId: 'devicesListDeviceProvidersPost',
      },
    },
    '/devices/update': {
      patch: {
        'x-fern-ignore': true,
        summary: '/devices/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  properties: {
                    type: 'object',
                    properties: { name: { type: 'string', nullable: true } },
                  },
                  name: { type: 'string', nullable: true },
                  location: { type: 'object', properties: {} },
                  is_managed: { default: true, type: 'boolean' },
                },
                required: ['device_id'],
              },
            },
          },
        },
        tags: ['/devices'],
        operationId: 'devicesUpdatePatch',
      },
      post: {
        'x-fern-sdk-group-name': ['devices'],
        'x-fern-sdk-method-name': 'update',
        summary: '/devices/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  properties: {
                    type: 'object',
                    properties: { name: { type: 'string', nullable: true } },
                  },
                  name: { type: 'string', nullable: true },
                  location: { type: 'object', properties: {} },
                  is_managed: { default: true, type: 'boolean' },
                },
                required: ['device_id'],
              },
            },
          },
        },
        tags: ['/devices'],
        operationId: 'devicesUpdatePost',
      },
    },
    '/client_sessions/create': {
      put: {
        'x-fern-ignore': true,
        summary: '/client_sessions/create',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    client_session: {
                      $ref: '#/components/schemas/client_session',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_session', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user_identifier_key: { type: 'string', minLength: 1 },
                  connect_webview_ids: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  connected_account_ids: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        tags: ['/client_sessions'],
        operationId: 'clientSessionsCreatePut',
      },
      post: {
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'create',
        summary: '/client_sessions/create',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    client_session: {
                      $ref: '#/components/schemas/client_session',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_session', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user_identifier_key: { type: 'string', minLength: 1 },
                  connect_webview_ids: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  connected_account_ids: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
              },
            },
          },
        },
        tags: ['/client_sessions'],
        operationId: 'clientSessionsCreatePost',
      },
    },
    '/client_sessions/delete': {
      post: {
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'delete',
        summary: '/client_sessions/delete',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  client_session_id: { type: 'string', format: 'uuid' },
                },
                required: ['client_session_id'],
              },
            },
          },
        },
        tags: ['/client_sessions'],
        operationId: 'clientSessionsDeletePost',
      },
    },
    '/client_sessions/get': {
      post: {
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'get',
        summary: '/client_sessions/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    client_session: {
                      $ref: '#/components/schemas/client_session',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_session', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  client_session_id: { type: 'string' },
                  user_identifier_key: { type: 'string' },
                },
              },
            },
          },
        },
        tags: ['/client_sessions'],
        operationId: 'clientSessionsGetPost',
      },
    },
    '/client_sessions/list': {
      post: {
        'x-fern-sdk-group-name': ['client_sessions'],
        'x-fern-sdk-method-name': 'list',
        summary: '/client_sessions/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    client_sessions: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/client_session' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['client_sessions', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  client_session_id: { type: 'string' },
                  user_identifier_key: { type: 'string' },
                  connect_webview_id: { type: 'string' },
                  without_user_identifier_key: { type: 'boolean' },
                },
              },
            },
          },
        },
        tags: ['/client_sessions'],
        operationId: 'clientSessionsListPost',
      },
    },
    '/events/get': {
      post: {
        'x-fern-sdk-group-name': ['events'],
        'x-fern-sdk-method-name': 'get',
        summary: '/events/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    event: { $ref: '#/components/schemas/event' },
                    message: { type: 'string' },
                    ok: { type: 'boolean' },
                  },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  event_id: { type: 'string', format: 'uuid' },
                  event_type: { type: 'string' },
                  device_id: { type: 'string', format: 'uuid' },
                },
              },
            },
          },
        },
        tags: ['/events'],
        operationId: 'eventsGetPost',
      },
    },
    '/events/list': {
      post: {
        'x-fern-sdk-group-name': ['events'],
        'x-fern-sdk-method-name': 'list',
        summary: '/events/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    events: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/event' },
                    },
                    message: { type: 'string' },
                    ok: { type: 'boolean' },
                  },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  since: { type: 'string' },
                  between: {
                    type: 'array',
                    items: {
                      oneOf: [
                        { type: 'string' },
                        { type: 'string', format: 'date-time' },
                      ],
                    },
                    minItems: 2,
                    maxItems: 2,
                  },
                  device_id: { type: 'string', format: 'uuid' },
                  device_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                  },
                  access_code_id: { type: 'string', format: 'uuid' },
                  access_code_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                  },
                  event_type: {
                    type: 'string',
                    enum: [
                      'device.connected',
                      'device.unmanaged.connected',
                      'device.disconnected',
                      'device.unmanaged.disconnected',
                      'device.converted_to_unmanaged',
                      'device.unmanaged.converted_to_managed',
                      'device.removed',
                      'device.tampered',
                      'device.low_battery',
                      'device.battery_status_changed',
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
                      'access_code.unmanaged.converted_to_managed',
                      'access_code.unmanaged.failed_to_convert_to_managed',
                      'access_code.unmanaged.created',
                      'access_code.unmanaged.removed',
                      'lock.locked',
                      'lock.unlocked',
                      'connected_account.connected',
                      'connected_account.created',
                      'connected_account.disconnected',
                      'connected_account.completed_first_sync',
                      'noise_sensor.noise_threshold_triggered',
                      'access_code.backup_access_code_pulled',
                    ],
                  },
                  event_types: {
                    type: 'array',
                    items: {
                      type: 'string',
                      enum: [
                        'device.connected',
                        'device.unmanaged.connected',
                        'device.disconnected',
                        'device.unmanaged.disconnected',
                        'device.converted_to_unmanaged',
                        'device.unmanaged.converted_to_managed',
                        'device.removed',
                        'device.tampered',
                        'device.low_battery',
                        'device.battery_status_changed',
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
                        'access_code.unmanaged.converted_to_managed',
                        'access_code.unmanaged.failed_to_convert_to_managed',
                        'access_code.unmanaged.created',
                        'access_code.unmanaged.removed',
                        'lock.locked',
                        'lock.unlocked',
                        'connected_account.connected',
                        'connected_account.created',
                        'connected_account.disconnected',
                        'connected_account.completed_first_sync',
                        'noise_sensor.noise_threshold_triggered',
                        'access_code.backup_access_code_pulled',
                      ],
                    },
                  },
                  connected_account_id: { type: 'string', format: 'uuid' },
                },
              },
            },
          },
        },
        tags: ['/events'],
        operationId: 'eventsListPost',
      },
    },
    '/connect_webviews/create': {
      post: {
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'create',
        summary: '/connect_webviews/create',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    connect_webview: {
                      $ref: '#/components/schemas/connect_webview',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connect_webview', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_selection_mode: {
                    type: 'string',
                    enum: ['none', 'single', 'multiple'],
                  },
                  custom_redirect_url: { type: 'string' },
                  custom_redirect_failure_url: { type: 'string' },
                  accepted_providers: {
                    type: 'array',
                    items: {
                      type: 'string',
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
                        'yale_access',
                      ],
                    },
                  },
                  provider_category: {
                    type: 'string',
                    enum: ['stable', 'consumer_smartlocks', 'internal_beta'],
                  },
                  custom_metadata: {
                    type: 'object',
                    additionalProperties: {
                      oneOf: [
                        { type: 'string', maxLength: 500 },
                        { type: 'number' },
                        { type: 'string', format: 'null', nullable: true },
                        { type: 'boolean' },
                      ],
                      nullable: true,
                    },
                  },
                  automatically_manage_new_devices: { type: 'boolean' },
                },
              },
            },
          },
        },
        tags: ['/connect_webviews'],
        operationId: 'connectWebviewsCreatePost',
      },
    },
    '/connect_webviews/delete': {
      post: {
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'delete',
        summary: '/connect_webviews/delete',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  connect_webview_id: { type: 'string', format: 'uuid' },
                },
                required: ['connect_webview_id'],
              },
            },
          },
        },
        tags: ['/connect_webviews'],
        operationId: 'connectWebviewsDeletePost',
      },
    },
    '/connect_webviews/get': {
      post: {
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'get',
        summary: '/connect_webviews/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    connect_webview: {
                      $ref: '#/components/schemas/connect_webview',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connect_webview', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  connect_webview_id: { type: 'string', format: 'uuid' },
                },
                required: ['connect_webview_id'],
              },
            },
          },
        },
        tags: ['/connect_webviews'],
        operationId: 'connectWebviewsGetPost',
      },
    },
    '/connect_webviews/list': {
      post: {
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'list',
        summary: '/connect_webviews/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    connect_webviews: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/connect_webview' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connect_webviews', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ['/connect_webviews'],
        operationId: 'connectWebviewsListPost',
      },
      get: {
        'x-fern-ignore': true,
        summary: '/connect_webviews/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    connect_webviews: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/connect_webview' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['connect_webviews', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ['/connect_webviews'],
        operationId: 'connectWebviewsListGet',
      },
    },
    '/connect_webviews/view': {
      get: {
        'x-fern-sdk-group-name': ['connect_webviews'],
        'x-fern-sdk-method-name': 'view',
        summary: '/connect_webviews/view',
        responses: {
          200: { description: 'OK' },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        parameters: [
          {
            name: 'connect_webview_id',
            in: 'query',
            schema: { type: 'string', format: 'uuid' },
            required: true,
          },
          {
            name: 'auth_token',
            in: 'query',
            schema: { type: 'string' },
            required: true,
          },
          {
            name: 'automatically_manage_new_devices',
            in: 'query',
            schema: { type: 'boolean' },
            required: false,
          },
        ],
        tags: ['/connect_webviews'],
        operationId: 'connectWebviewsViewGet',
      },
    },
    '/health/get_health': {
      get: {
        'x-fern-sdk-group-name': ['health'],
        'x-fern-sdk-method-name': 'get_health',
        summary: '/health/get_health',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ok: { type: 'boolean' },
                    msg: {
                      type: 'string',
                      enum: ['I’m one with the Force. The Force is with me.'],
                    },
                    last_service_evaluation_at: { type: 'string' },
                    service_health_statuses: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/service_health' },
                    },
                  },
                  required: ['ok', 'msg', 'service_health_statuses'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        tags: ['/health'],
        operationId: 'healthGetHealthGet',
      },
    },
    '/health/get_service_health': {
      post: {
        'x-fern-sdk-group-name': ['health'],
        'x-fern-sdk-method-name': 'get_service_health',
        summary: '/health/get_service_health',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ok: { type: 'boolean' },
                    last_service_evaluation_at: { type: 'string' },
                    service_health: {
                      $ref: '#/components/schemas/service_health',
                    },
                  },
                  required: [
                    'ok',
                    'last_service_evaluation_at',
                    'service_health',
                  ],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { service: { type: 'string' } },
                required: ['service'],
              },
            },
          },
        },
        tags: ['/health'],
        operationId: 'healthGetServiceHealthPost',
      },
    },
    '/health': {
      get: {
        'x-fern-ignore': true,
        summary: '/health',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ok: { type: 'boolean' },
                    msg: {
                      type: 'string',
                      enum: ['I’m one with the Force. The Force is with me.'],
                    },
                    last_service_evaluation_at: { type: 'string' },
                    service_health_statuses: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/service_health' },
                    },
                  },
                  required: ['ok', 'msg', 'service_health_statuses'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        tags: ['/health'],
        operationId: 'healthGet',
      },
    },
    '/locks/get': {
      post: {
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'get',
        summary: '/locks/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    lock: { nullable: true },
                    device: { nullable: true },
                    ok: { type: 'boolean' },
                  },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        tags: ['/locks'],
        operationId: 'locksGetPost',
      },
    },
    '/locks/list': {
      post: {
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'list',
        summary: '/locks/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    locks: { nullable: true },
                    devices: { nullable: true },
                    ok: { type: 'boolean' },
                  },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  connected_account_id: { type: 'string', format: 'uuid' },
                  connected_account_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                    minItems: 1,
                  },
                  connect_webview_id: { type: 'string', format: 'uuid' },
                  device_type: {
                    oneOf: [
                      {
                        type: 'string',
                        enum: [
                          'akuvox_lock',
                          'august_lock',
                          'brivo_access_point',
                          'butterflymx_panel',
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
                          'yale_lock',
                          'two_n_intercom',
                          'controlbyweb_device',
                          'ttlock_lock',
                          'igloohome_lock',
                          'hubitat_lock',
                        ],
                      },
                      {
                        type: 'string',
                        enum: ['noiseaware_activity_zone', 'minut_sensor'],
                      },
                      {
                        type: 'string',
                        enum: ['ecobee_thermostat', 'nest_thermostat'],
                      },
                    ],
                  },
                  device_types: {
                    type: 'array',
                    items: {
                      oneOf: [
                        {
                          type: 'string',
                          enum: [
                            'akuvox_lock',
                            'august_lock',
                            'brivo_access_point',
                            'butterflymx_panel',
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
                            'yale_lock',
                            'two_n_intercom',
                            'controlbyweb_device',
                            'ttlock_lock',
                            'igloohome_lock',
                            'hubitat_lock',
                          ],
                        },
                        {
                          type: 'string',
                          enum: ['noiseaware_activity_zone', 'minut_sensor'],
                        },
                        {
                          type: 'string',
                          enum: ['ecobee_thermostat', 'nest_thermostat'],
                        },
                      ],
                    },
                  },
                  manufacturer: {
                    type: 'string',
                    enum: [
                      'akuvox',
                      'august',
                      'brivo',
                      'butterflymx',
                      'doorking',
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
                    ],
                  },
                  device_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                  },
                  limit: { default: 500, type: 'number', nullable: true },
                  created_before: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
        tags: ['/locks'],
        operationId: 'locksListPost',
      },
    },
    '/locks/lock_door': {
      post: {
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'lock_door',
        summary: '/locks/lock_door',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
              },
            },
          },
        },
        tags: ['/locks'],
        operationId: 'locksLockDoorPost',
      },
    },
    '/locks/unlock_door': {
      post: {
        'x-fern-sdk-group-name': ['locks'],
        'x-fern-sdk-method-name': 'unlock_door',
        summary: '/locks/unlock_door',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
              },
            },
          },
        },
        tags: ['/locks'],
        operationId: 'locksUnlockDoorPost',
      },
    },
    '/thermostats/cool': {
      post: {
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'cool',
        summary: '/thermostats/cool',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  cooling_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsCoolPost',
      },
    },
    '/thermostats/get': {
      post: {
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'get',
        summary: '/thermostats/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    thermostat: { $ref: '#/components/schemas/device' },
                    ok: { type: 'boolean' },
                  },
                  required: ['thermostat', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsGetPost',
      },
    },
    '/thermostats/heat': {
      post: {
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'heat',
        summary: '/thermostats/heat',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  heating_set_point_celsius: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsHeatPost',
      },
    },
    '/thermostats/heat_cool': {
      post: {
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'heat_cool',
        summary: '/thermostats/heat_cool',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  heating_set_point_celsius: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  cooling_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsHeatCoolPost',
      },
    },
    '/thermostats/list': {
      post: {
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'list',
        summary: '/thermostats/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    thermostats: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/device' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['thermostats', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  connected_account_id: { type: 'string', format: 'uuid' },
                  connected_account_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                    minItems: 1,
                  },
                  connect_webview_id: { type: 'string', format: 'uuid' },
                  device_type: {
                    oneOf: [
                      {
                        type: 'string',
                        enum: [
                          'akuvox_lock',
                          'august_lock',
                          'brivo_access_point',
                          'butterflymx_panel',
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
                          'yale_lock',
                          'two_n_intercom',
                          'controlbyweb_device',
                          'ttlock_lock',
                          'igloohome_lock',
                          'hubitat_lock',
                        ],
                      },
                      {
                        type: 'string',
                        enum: ['noiseaware_activity_zone', 'minut_sensor'],
                      },
                      {
                        type: 'string',
                        enum: ['ecobee_thermostat', 'nest_thermostat'],
                      },
                    ],
                  },
                  device_types: {
                    type: 'array',
                    items: {
                      oneOf: [
                        {
                          type: 'string',
                          enum: [
                            'akuvox_lock',
                            'august_lock',
                            'brivo_access_point',
                            'butterflymx_panel',
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
                            'yale_lock',
                            'two_n_intercom',
                            'controlbyweb_device',
                            'ttlock_lock',
                            'igloohome_lock',
                            'hubitat_lock',
                          ],
                        },
                        {
                          type: 'string',
                          enum: ['noiseaware_activity_zone', 'minut_sensor'],
                        },
                        {
                          type: 'string',
                          enum: ['ecobee_thermostat', 'nest_thermostat'],
                        },
                      ],
                    },
                  },
                  manufacturer: {
                    type: 'string',
                    enum: [
                      'akuvox',
                      'august',
                      'brivo',
                      'butterflymx',
                      'doorking',
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
                    ],
                  },
                  device_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                  },
                  limit: { default: 500, type: 'number', nullable: true },
                  created_before: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsListPost',
      },
    },
    '/thermostats/off': {
      post: {
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'off',
        summary: '/thermostats/off',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsOffPost',
      },
    },
    '/thermostats/set_fan_mode': {
      post: {
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'set_fan_mode',
        summary: '/thermostats/set_fan_mode',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  fan_mode: { type: 'string', enum: ['auto', 'on'] },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['device_id', 'fan_mode'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsSetFanModePost',
      },
    },
    '/thermostats/update': {
      post: {
        'x-fern-sdk-group-name': ['thermostats'],
        'x-fern-sdk-method-name': 'update',
        summary: '/thermostats/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  default_climate_setting: {
                    type: 'object',
                    properties: {
                      automatic_heating_enabled: { type: 'boolean' },
                      automatic_cooling_enabled: { type: 'boolean' },
                      hvac_mode_setting: {
                        type: 'string',
                        enum: ['off', 'heat', 'cool', 'heatcool'],
                      },
                      cooling_set_point_celsius: { type: 'number' },
                      heating_set_point_celsius: { type: 'number' },
                      cooling_set_point_fahrenheit: { type: 'number' },
                      heating_set_point_fahrenheit: { type: 'number' },
                      manual_override_allowed: { type: 'boolean' },
                    },
                  },
                },
                required: ['device_id', 'default_climate_setting'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsUpdatePost',
      },
    },
    '/webhooks/create': {
      post: {
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'create',
        summary: '/webhooks/create',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    webhook: { $ref: '#/components/schemas/webhook' },
                    ok: { type: 'boolean' },
                  },
                  required: ['webhook', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  url: { type: 'string', format: 'uri' },
                  event_types: {
                    default: ['*'],
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
                required: ['url'],
              },
            },
          },
        },
        tags: ['/webhooks'],
        operationId: 'webhooksCreatePost',
      },
    },
    '/webhooks/delete': {
      post: {
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'delete',
        summary: '/webhooks/delete',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { webhook_id: { type: 'string' } },
                required: ['webhook_id'],
              },
            },
          },
        },
        tags: ['/webhooks'],
        operationId: 'webhooksDeletePost',
      },
    },
    '/webhooks/get': {
      post: {
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'get',
        summary: '/webhooks/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    webhook: { $ref: '#/components/schemas/webhook' },
                    ok: { type: 'boolean' },
                  },
                  required: ['webhook', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { webhook_id: { type: 'string' } },
                required: ['webhook_id'],
              },
            },
          },
        },
        tags: ['/webhooks'],
        operationId: 'webhooksGetPost',
      },
    },
    '/webhooks/list': {
      get: {
        'x-fern-sdk-group-name': ['webhooks'],
        'x-fern-sdk-method-name': 'list',
        summary: '/webhooks/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    webhooks: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/webhook' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['webhooks', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ['/webhooks'],
        operationId: 'webhooksListGet',
      },
    },
    '/workspaces/get': {
      get: {
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'get',
        summary: '/workspaces/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    workspace: { $ref: '#/components/schemas/workspace' },
                    ok: { type: 'boolean' },
                  },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ['/workspaces'],
        operationId: 'workspacesGetGet',
      },
    },
    '/workspaces/list': {
      get: {
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'list',
        summary: '/workspaces/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    workspaces: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/workspace' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['workspaces', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ['/workspaces'],
        operationId: 'workspacesListGet',
      },
    },
    '/workspaces/reset_sandbox': {
      post: {
        'x-fern-sdk-group-name': ['workspaces'],
        'x-fern-sdk-method-name': 'reset_sandbox',
        summary: '/workspaces/reset_sandbox',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    ok: { type: 'boolean' },
                  },
                  required: ['message', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ['/workspaces'],
        operationId: 'workspacesResetSandboxPost',
      },
    },
    '/access_codes/simulate/create_unmanaged_access_code': {
      post: {
        'x-fern-sdk-group-name': ['access_codes', 'simulate'],
        'x-fern-sdk-method-name': 'create_unmanaged_access_code',
        summary: '/access_codes/simulate/create_unmanaged_access_code',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    access_code: {
                      oneOf: [
                        {
                          type: 'object',
                          properties: {
                            access_code_id: { type: 'string', format: 'uuid' },
                            code: { type: 'string', nullable: true },
                            status: { type: 'string', enum: ['set'] },
                            created_at: {
                              oneOf: [
                                { type: 'string' },
                                { type: 'string', format: 'date-time' },
                              ],
                            },
                            is_managed: { type: 'boolean', enum: [false] },
                            type: { type: 'string', enum: ['ongoing'] },
                            starts_at: {
                              type: 'string',
                              format: 'null',
                              nullable: true,
                            },
                            ends_at: {
                              type: 'string',
                              format: 'null',
                              nullable: true,
                            },
                          },
                          required: [
                            'access_code_id',
                            'code',
                            'status',
                            'created_at',
                            'is_managed',
                            'type',
                            'starts_at',
                            'ends_at',
                          ],
                        },
                        {
                          type: 'object',
                          properties: {
                            access_code_id: { type: 'string', format: 'uuid' },
                            code: { type: 'string', nullable: true },
                            status: { type: 'string', enum: ['set'] },
                            created_at: {
                              oneOf: [
                                { type: 'string' },
                                { type: 'string', format: 'date-time' },
                              ],
                            },
                            is_managed: { type: 'boolean', enum: [false] },
                            type: { type: 'string', enum: ['time_bound'] },
                            starts_at: { type: 'string', nullable: true },
                            ends_at: { type: 'string', nullable: true },
                          },
                          required: [
                            'access_code_id',
                            'code',
                            'status',
                            'created_at',
                            'is_managed',
                            'type',
                            'starts_at',
                            'ends_at',
                          ],
                        },
                      ],
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_code', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  name: { type: 'string' },
                  code: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 8,
                    pattern: '^\\d+$',
                  },
                },
                required: ['device_id', 'name', 'code'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesSimulateCreateUnmanagedAccessCodePost',
      },
    },
    '/access_codes/unmanaged/convert_to_managed': {
      patch: {
        'x-fern-ignore': true,
        summary: '/access_codes/unmanaged/convert_to_managed',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  access_code_id: { type: 'string', format: 'uuid' },
                  force: { type: 'boolean' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['access_code_id'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesUnmanagedConvertToManagedPatch',
      },
      post: {
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'convert_to_managed',
        summary: '/access_codes/unmanaged/convert_to_managed',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  access_code_id: { type: 'string', format: 'uuid' },
                  force: { type: 'boolean' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['access_code_id'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesUnmanagedConvertToManagedPost',
      },
    },
    '/access_codes/unmanaged/delete': {
      post: {
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'delete',
        summary: '/access_codes/unmanaged/delete',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  access_code_id: { type: 'string', format: 'uuid' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['access_code_id'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesUnmanagedDeletePost',
      },
    },
    '/access_codes/unmanaged/get': {
      post: {
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'get',
        summary: '/access_codes/unmanaged/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    access_code: {
                      type: 'object',
                      properties: {
                        type: {
                          type: 'string',
                          enum: ['time_bound', 'ongoing'],
                        },
                        access_code_id: { type: 'string', format: 'uuid' },
                        device_id: { type: 'string', format: 'uuid' },
                        name: { type: 'string', nullable: true },
                        code: { type: 'string', nullable: true },
                        created_at: { type: 'string', format: 'date-time' },
                        errors: { nullable: true },
                        warnings: { nullable: true },
                        is_managed: { type: 'boolean', enum: [false] },
                        starts_at: {
                          type: 'string',
                          format: 'date-time',
                          nullable: true,
                        },
                        ends_at: {
                          type: 'string',
                          format: 'date-time',
                          nullable: true,
                        },
                        status: { type: 'string', enum: ['set'] },
                      },
                      required: [
                        'type',
                        'access_code_id',
                        'device_id',
                        'name',
                        'code',
                        'created_at',
                        'is_managed',
                        'starts_at',
                        'ends_at',
                        'status',
                      ],
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_code', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  access_code_id: { type: 'string', format: 'uuid' },
                  code: { type: 'string' },
                },
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesUnmanagedGetPost',
      },
    },
    '/access_codes/unmanaged/list': {
      post: {
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'list',
        summary: '/access_codes/unmanaged/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    access_codes: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          type: {
                            type: 'string',
                            enum: ['time_bound', 'ongoing'],
                          },
                          access_code_id: { type: 'string', format: 'uuid' },
                          device_id: { type: 'string', format: 'uuid' },
                          name: { type: 'string', nullable: true },
                          code: { type: 'string', nullable: true },
                          created_at: { type: 'string', format: 'date-time' },
                          errors: { nullable: true },
                          warnings: { nullable: true },
                          is_managed: { type: 'boolean', enum: [false] },
                          starts_at: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true,
                          },
                          ends_at: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true,
                          },
                          status: { type: 'string', enum: ['set'] },
                        },
                        required: [
                          'type',
                          'access_code_id',
                          'device_id',
                          'name',
                          'code',
                          'created_at',
                          'is_managed',
                          'starts_at',
                          'ends_at',
                          'status',
                        ],
                      },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['access_codes', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { device_id: { type: 'string', format: 'uuid' } },
                required: ['device_id'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesUnmanagedListPost',
      },
    },
    '/access_codes/unmanaged/update': {
      patch: {
        'x-fern-ignore': true,
        summary: '/access_codes/unmanaged/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  access_code_id: { type: 'string', format: 'uuid' },
                  is_managed: { type: 'boolean' },
                  force: { type: 'boolean' },
                },
                required: ['access_code_id', 'is_managed'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesUnmanagedUpdatePatch',
      },
      post: {
        'x-fern-sdk-group-name': ['access_codes', 'unmanaged'],
        'x-fern-sdk-method-name': 'update',
        summary: '/access_codes/unmanaged/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  access_code_id: { type: 'string', format: 'uuid' },
                  is_managed: { type: 'boolean' },
                  force: { type: 'boolean' },
                },
                required: ['access_code_id', 'is_managed'],
              },
            },
          },
        },
        tags: ['/access_codes'],
        operationId: 'accessCodesUnmanagedUpdatePost',
      },
    },
    '/devices/unmanaged/list': {
      post: {
        'x-fern-sdk-group-name': ['devices', 'unmanaged'],
        'x-fern-sdk-method-name': 'list',
        summary: '/devices/unmanaged/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    devices: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/unmanaged_device' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['devices', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  connected_account_id: { type: 'string', format: 'uuid' },
                  connected_account_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                    minItems: 1,
                  },
                  connect_webview_id: { type: 'string', format: 'uuid' },
                  device_type: {
                    oneOf: [
                      {
                        type: 'string',
                        enum: [
                          'akuvox_lock',
                          'august_lock',
                          'brivo_access_point',
                          'butterflymx_panel',
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
                          'yale_lock',
                          'two_n_intercom',
                          'controlbyweb_device',
                          'ttlock_lock',
                          'igloohome_lock',
                          'hubitat_lock',
                        ],
                      },
                      {
                        type: 'string',
                        enum: ['noiseaware_activity_zone', 'minut_sensor'],
                      },
                      {
                        type: 'string',
                        enum: ['ecobee_thermostat', 'nest_thermostat'],
                      },
                    ],
                  },
                  device_types: {
                    type: 'array',
                    items: {
                      oneOf: [
                        {
                          type: 'string',
                          enum: [
                            'akuvox_lock',
                            'august_lock',
                            'brivo_access_point',
                            'butterflymx_panel',
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
                            'yale_lock',
                            'two_n_intercom',
                            'controlbyweb_device',
                            'ttlock_lock',
                            'igloohome_lock',
                            'hubitat_lock',
                          ],
                        },
                        {
                          type: 'string',
                          enum: ['noiseaware_activity_zone', 'minut_sensor'],
                        },
                        {
                          type: 'string',
                          enum: ['ecobee_thermostat', 'nest_thermostat'],
                        },
                      ],
                    },
                  },
                  manufacturer: {
                    type: 'string',
                    enum: [
                      'akuvox',
                      'august',
                      'brivo',
                      'butterflymx',
                      'doorking',
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
                    ],
                  },
                  device_ids: {
                    type: 'array',
                    items: { type: 'string', format: 'uuid' },
                  },
                  limit: { default: 500, type: 'number', nullable: true },
                  created_before: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
        tags: ['/devices'],
        operationId: 'devicesUnmanagedListPost',
      },
    },
    '/devices/unmanaged/update': {
      patch: {
        'x-fern-ignore': true,
        summary: '/devices/unmanaged/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  is_managed: { type: 'boolean', enum: [true] },
                },
                required: ['device_id', 'is_managed'],
              },
            },
          },
        },
        tags: ['/devices'],
        operationId: 'devicesUnmanagedUpdatePatch',
      },
      post: {
        'x-fern-sdk-group-name': ['devices', 'unmanaged'],
        'x-fern-sdk-method-name': 'update',
        summary: '/devices/unmanaged/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  is_managed: { type: 'boolean', enum: [true] },
                },
                required: ['device_id', 'is_managed'],
              },
            },
          },
        },
        tags: ['/devices'],
        operationId: 'devicesUnmanagedUpdatePost',
      },
    },
    '/health/service/[service_name]': {
      post: {
        'x-fern-sdk-group-name': ['health', 'service'],
        'x-fern-sdk-method-name': 'by_service_name',
        summary: '/health/service/[service_name]',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ok: { type: 'boolean' },
                    last_service_evaluation_at: { type: 'string' },
                    service_health: {
                      $ref: '#/components/schemas/service_health',
                    },
                  },
                  required: [
                    'ok',
                    'last_service_evaluation_at',
                    'service_health',
                  ],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { service_name: { type: 'string' } },
                required: ['service_name'],
              },
            },
          },
        },
        tags: ['/health'],
        operationId: 'healthServiceByServiceNamePost',
      },
    },
    '/noise_sensors/noise_thresholds/create': {
      post: {
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'create',
        summary: '/noise_sensors/noise_thresholds/create',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  device_id: { type: 'string', format: 'uuid' },
                  sync: { default: false, type: 'boolean' },
                  name: { type: 'string' },
                  starts_daily_at: { type: 'string' },
                  ends_daily_at: { type: 'string' },
                  noise_threshold_decibels: { type: 'number' },
                  noise_threshold_nrs: { type: 'number' },
                },
                required: ['device_id', 'starts_daily_at', 'ends_daily_at'],
              },
            },
          },
        },
        tags: ['/noise_sensors'],
        operationId: 'noiseSensorsNoiseThresholdsCreatePost',
      },
    },
    '/noise_sensors/noise_thresholds/delete': {
      post: {
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'delete',
        summary: '/noise_sensors/noise_thresholds/delete',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  noise_threshold_id: { type: 'string', format: 'uuid' },
                  device_id: { type: 'string', format: 'uuid' },
                  sync: { default: false, type: 'boolean' },
                },
                required: ['noise_threshold_id', 'device_id'],
              },
            },
          },
        },
        tags: ['/noise_sensors'],
        operationId: 'noiseSensorsNoiseThresholdsDeletePost',
      },
    },
    '/noise_sensors/noise_thresholds/get': {
      post: {
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'get',
        summary: '/noise_sensors/noise_thresholds/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    noise_threshold: {
                      $ref: '#/components/schemas/noise_threshold',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['noise_threshold', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  noise_threshold_id: { type: 'string', format: 'uuid' },
                },
                required: ['noise_threshold_id'],
              },
            },
          },
        },
        tags: ['/noise_sensors'],
        operationId: 'noiseSensorsNoiseThresholdsGetPost',
      },
    },
    '/noise_sensors/noise_thresholds/list': {
      post: {
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'list',
        summary: '/noise_sensors/noise_thresholds/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    noise_thresholds: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/noise_threshold' },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['noise_thresholds', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { device_id: { type: 'string', format: 'uuid' } },
                required: ['device_id'],
              },
            },
          },
        },
        tags: ['/noise_sensors'],
        operationId: 'noiseSensorsNoiseThresholdsListPost',
      },
    },
    '/noise_sensors/noise_thresholds/update': {
      post: {
        'x-fern-sdk-group-name': ['noise_sensors', 'noise_thresholds'],
        'x-fern-sdk-method-name': 'update',
        summary: '/noise_sensors/noise_thresholds/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  noise_threshold_id: { type: 'string', format: 'uuid' },
                  device_id: { type: 'string', format: 'uuid' },
                  sync: { default: false, type: 'boolean' },
                  name: { type: 'string' },
                  starts_daily_at: { type: 'string' },
                  ends_daily_at: { type: 'string' },
                  noise_threshold_decibels: { type: 'number' },
                  noise_threshold_nrs: { type: 'number' },
                },
                required: ['noise_threshold_id', 'device_id'],
              },
            },
          },
        },
        tags: ['/noise_sensors'],
        operationId: 'noiseSensorsNoiseThresholdsUpdatePost',
      },
      put: {
        'x-fern-ignore': true,
        summary: '/noise_sensors/noise_thresholds/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    action_attempt: {
                      $ref: '#/components/schemas/action_attempt',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['action_attempt', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  noise_threshold_id: { type: 'string', format: 'uuid' },
                  device_id: { type: 'string', format: 'uuid' },
                  sync: { default: false, type: 'boolean' },
                  name: { type: 'string' },
                  starts_daily_at: { type: 'string' },
                  ends_daily_at: { type: 'string' },
                  noise_threshold_decibels: { type: 'number' },
                  noise_threshold_nrs: { type: 'number' },
                },
                required: ['noise_threshold_id', 'device_id'],
              },
            },
          },
        },
        tags: ['/noise_sensors'],
        operationId: 'noiseSensorsNoiseThresholdsUpdatePut',
      },
    },
    '/noise_sensors/simulate/trigger_noise_threshold': {
      post: {
        'x-fern-sdk-group-name': ['noise_sensors', 'simulate'],
        'x-fern-sdk-method-name': 'trigger_noise_threshold',
        summary: '/noise_sensors/simulate/trigger_noise_threshold',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { device_id: { type: 'string', format: 'uuid' } },
                required: ['device_id'],
              },
            },
          },
        },
        tags: ['/noise_sensors'],
        operationId: 'noiseSensorsSimulateTriggerNoiseThresholdPost',
      },
    },
    '/thermostats/climate_setting_schedules/create': {
      post: {
        'x-fern-sdk-group-name': ['thermostats', 'climate_setting_schedules'],
        'x-fern-sdk-method-name': 'create',
        summary: '/thermostats/climate_setting_schedules/create',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    climate_setting_schedule: {
                      $ref: '#/components/schemas/climate_setting_schedule',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedule', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  schedule_type: {
                    default: 'time_bound',
                    type: 'string',
                    enum: ['time_bound'],
                  },
                  device_id: { type: 'string' },
                  name: { type: 'string' },
                  schedule_starts_at: { type: 'string' },
                  schedule_ends_at: { type: 'string' },
                  automatic_heating_enabled: { type: 'boolean' },
                  automatic_cooling_enabled: { type: 'boolean' },
                  hvac_mode_setting: {
                    type: 'string',
                    enum: ['off', 'heat', 'cool', 'heatcool'],
                  },
                  cooling_set_point_celsius: { type: 'number' },
                  heating_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  manual_override_allowed: { type: 'boolean' },
                },
                required: [
                  'device_id',
                  'schedule_starts_at',
                  'schedule_ends_at',
                ],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsClimateSettingSchedulesCreatePost',
      },
    },
    '/thermostats/climate_setting_schedules/delete': {
      post: {
        'x-fern-sdk-group-name': ['thermostats', 'climate_setting_schedules'],
        'x-fern-sdk-method-name': 'delete',
        summary: '/thermostats/climate_setting_schedules/delete',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  climate_setting_schedule_id: {
                    type: 'string',
                    format: 'uuid',
                  },
                },
                required: ['climate_setting_schedule_id'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsClimateSettingSchedulesDeletePost',
      },
      put: {
        'x-fern-ignore': true,
        summary: '/thermostats/climate_setting_schedules/delete',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { ok: { type: 'boolean' } },
                  required: ['ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  climate_setting_schedule_id: {
                    type: 'string',
                    format: 'uuid',
                  },
                },
                required: ['climate_setting_schedule_id'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsClimateSettingSchedulesDeletePut',
      },
    },
    '/thermostats/climate_setting_schedules/get': {
      post: {
        'x-fern-sdk-group-name': ['thermostats', 'climate_setting_schedules'],
        'x-fern-sdk-method-name': 'get',
        summary: '/thermostats/climate_setting_schedules/get',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    climate_setting_schedule: {
                      $ref: '#/components/schemas/climate_setting_schedule',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedule', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  climate_setting_schedule_id: {
                    type: 'string',
                    format: 'uuid',
                  },
                  device_id: { type: 'string', format: 'uuid' },
                },
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsClimateSettingSchedulesGetPost',
      },
    },
    '/thermostats/climate_setting_schedules/list': {
      post: {
        'x-fern-sdk-group-name': ['thermostats', 'climate_setting_schedules'],
        'x-fern-sdk-method-name': 'list',
        summary: '/thermostats/climate_setting_schedules/list',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    climate_setting_schedules: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/climate_setting_schedule',
                      },
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedules', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { device_id: { type: 'string', format: 'uuid' } },
                required: ['device_id'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsClimateSettingSchedulesListPost',
      },
    },
    '/thermostats/climate_setting_schedules/update': {
      post: {
        'x-fern-sdk-group-name': ['thermostats', 'climate_setting_schedules'],
        'x-fern-sdk-method-name': 'update',
        summary: '/thermostats/climate_setting_schedules/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    climate_setting_schedule: {
                      $ref: '#/components/schemas/climate_setting_schedule',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedule', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  climate_setting_schedule_id: {
                    type: 'string',
                    format: 'uuid',
                  },
                  schedule_type: {
                    default: 'time_bound',
                    type: 'string',
                    enum: ['time_bound'],
                  },
                  name: { type: 'string' },
                  schedule_starts_at: { type: 'string' },
                  schedule_ends_at: { type: 'string' },
                  automatic_heating_enabled: { type: 'boolean' },
                  automatic_cooling_enabled: { type: 'boolean' },
                  hvac_mode_setting: {
                    type: 'string',
                    enum: ['off', 'heat', 'cool', 'heatcool'],
                  },
                  cooling_set_point_celsius: { type: 'number' },
                  heating_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  manual_override_allowed: { type: 'boolean' },
                },
                required: ['climate_setting_schedule_id'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsClimateSettingSchedulesUpdatePost',
      },
      put: {
        'x-fern-ignore': true,
        summary: '/thermostats/climate_setting_schedules/update',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    climate_setting_schedule: {
                      $ref: '#/components/schemas/climate_setting_schedule',
                    },
                    ok: { type: 'boolean' },
                  },
                  required: ['climate_setting_schedule', 'ok'],
                },
              },
            },
          },
          400: { description: 'Bad Request' },
          401: { description: 'Unauthorized' },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  climate_setting_schedule_id: {
                    type: 'string',
                    format: 'uuid',
                  },
                  schedule_type: {
                    default: 'time_bound',
                    type: 'string',
                    enum: ['time_bound'],
                  },
                  name: { type: 'string' },
                  schedule_starts_at: { type: 'string' },
                  schedule_ends_at: { type: 'string' },
                  automatic_heating_enabled: { type: 'boolean' },
                  automatic_cooling_enabled: { type: 'boolean' },
                  hvac_mode_setting: {
                    type: 'string',
                    enum: ['off', 'heat', 'cool', 'heatcool'],
                  },
                  cooling_set_point_celsius: { type: 'number' },
                  heating_set_point_celsius: { type: 'number' },
                  cooling_set_point_fahrenheit: { type: 'number' },
                  heating_set_point_fahrenheit: { type: 'number' },
                  manual_override_allowed: { type: 'boolean' },
                },
                required: ['climate_setting_schedule_id'],
              },
            },
          },
        },
        tags: [],
        operationId: 'thermostatsClimateSettingSchedulesUpdatePut',
      },
    },
  },
  components: {
    securitySchemes: {
      seam_workspace: { type: 'apiKey', in: 'header', name: 'seam-workspace' },
      seam_client_session_token: {
        type: 'apiKey',
        in: 'header',
        name: 'seam-client-session-token',
      },
      client_session_token: {
        type: 'apiKey',
        in: 'header',
        name: 'client-session-token',
      },
      access_token: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'API Token',
      },
    },
    schemas: {
      access_code: {
        type: 'object',
        properties: {
          common_code_key: { type: 'string', nullable: true },
          is_scheduled_on_device: { type: 'boolean' },
          type: { type: 'string', enum: ['time_bound', 'ongoing'] },
          is_waiting_for_code_assignment: { type: 'boolean' },
          access_code_id: { type: 'string', format: 'uuid' },
          device_id: { type: 'string', format: 'uuid' },
          name: { type: 'string', nullable: true },
          code: { type: 'string', nullable: true },
          created_at: { type: 'string', format: 'date-time' },
          errors: { nullable: true },
          warnings: { nullable: true },
          is_managed: { type: 'boolean', enum: [true] },
          starts_at: { type: 'string', format: 'date-time' },
          ends_at: { type: 'string', format: 'date-time' },
          status: {
            type: 'string',
            enum: ['setting', 'set', 'unset', 'removing', 'unknown'],
          },
          is_backup_access_code_available: { type: 'boolean' },
          is_backup: { type: 'boolean' },
          pulled_backup_access_code_id: {
            type: 'string',
            format: 'uuid',
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
        ],
      },
      action_attempt: {
        discriminator: { propertyName: 'status' },
        oneOf: [
          {
            type: 'object',
            properties: {
              status: { type: 'string', enum: ['success'] },
              action_type: { type: 'string' },
              action_attempt_id: { type: 'string', format: 'uuid' },
              result: { nullable: true },
              error: { type: 'string', format: 'null', nullable: true },
            },
            required: ['status', 'action_type', 'action_attempt_id', 'error'],
          },
          {
            type: 'object',
            properties: {
              status: { type: 'string', enum: ['pending'] },
              action_type: { type: 'string' },
              action_attempt_id: { type: 'string', format: 'uuid' },
              result: { type: 'string', format: 'null', nullable: true },
              error: { type: 'string', format: 'null', nullable: true },
            },
            required: [
              'status',
              'action_type',
              'action_attempt_id',
              'result',
              'error',
            ],
          },
          {
            type: 'object',
            properties: {
              status: { type: 'string', enum: ['error'] },
              action_type: { type: 'string' },
              action_attempt_id: { type: 'string', format: 'uuid' },
              result: { type: 'string', format: 'null', nullable: true },
              error: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  message: { type: 'string' },
                },
                required: ['type', 'message'],
              },
            },
            required: [
              'status',
              'action_type',
              'action_attempt_id',
              'result',
              'error',
            ],
          },
        ],
      },
      client_session: {
        type: 'object',
        properties: {
          client_session_id: { type: 'string', format: 'uuid' },
          user_identifier_key: { type: 'string', nullable: true },
          created_at: { type: 'string', format: 'date-time' },
          token: { type: 'string' },
          device_count: { type: 'number' },
          connected_account_ids: {
            type: 'array',
            items: { type: 'string', format: 'uuid' },
          },
          connect_webview_ids: {
            type: 'array',
            items: { type: 'string', format: 'uuid' },
          },
          workspace_id: { type: 'string', format: 'uuid' },
        },
        required: [
          'client_session_id',
          'user_identifier_key',
          'created_at',
          'token',
          'device_count',
          'connected_account_ids',
          'connect_webview_ids',
          'workspace_id',
        ],
      },
      climate_setting_schedule: {
        type: 'object',
        properties: {
          climate_setting_schedule_id: { type: 'string', format: 'uuid' },
          schedule_type: { type: 'string', enum: ['time_bound'] },
          device_id: { type: 'string' },
          name: { type: 'string' },
          schedule_starts_at: { type: 'string' },
          schedule_ends_at: { type: 'string' },
          created_at: { type: 'string', format: 'date-time' },
          automatic_heating_enabled: { type: 'boolean' },
          automatic_cooling_enabled: { type: 'boolean' },
          hvac_mode_setting: {
            type: 'string',
            enum: ['off', 'heat', 'cool', 'heatcool'],
          },
          cooling_set_point_celsius: { type: 'number' },
          heating_set_point_celsius: { type: 'number' },
          cooling_set_point_fahrenheit: { type: 'number' },
          heating_set_point_fahrenheit: { type: 'number' },
          manual_override_allowed: { type: 'boolean' },
        },
        required: [
          'climate_setting_schedule_id',
          'schedule_type',
          'device_id',
          'schedule_starts_at',
          'schedule_ends_at',
          'created_at',
        ],
      },
      connect_webview: {
        type: 'object',
        properties: {
          connect_webview_id: { type: 'string', format: 'uuid' },
          connected_account_id: { type: 'string', format: 'uuid' },
          url: { type: 'string', format: 'uri' },
          workspace_id: { type: 'string', format: 'uuid' },
          device_selection_mode: {
            type: 'string',
            enum: ['none', 'single', 'multiple'],
          },
          accepted_providers: { type: 'array', items: { type: 'string' } },
          accepted_devices: { type: 'array', items: { type: 'string' } },
          any_provider_allowed: { type: 'boolean' },
          any_device_allowed: { type: 'boolean' },
          created_at: { type: 'string', format: 'date-time' },
          login_successful: { type: 'boolean' },
          status: { type: 'string', enum: ['pending', 'failed', 'authorized'] },
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
        ],
      },
      connected_account: {
        type: 'object',
        properties: {
          connected_account_id: { type: 'string', format: 'uuid' },
          created_at: { type: 'string', format: 'date-time' },
          user_identifier: {
            type: 'object',
            properties: {
              username: { type: 'string' },
              api_url: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              exclusive: { type: 'boolean' },
            },
          },
          account_type: { type: 'string' },
          errors: { nullable: true },
          warnings: { nullable: true },
          custom_metadata: {
            type: 'object',
            additionalProperties: {
              oneOf: [
                { type: 'string' },
                { type: 'number' },
                { type: 'boolean' },
                { type: 'string', format: 'null', nullable: true },
              ],
              nullable: true,
            },
          },
        },
      },
      device: {
        type: 'object',
        properties: {
          device_id: { type: 'string', format: 'uuid' },
          device_type: {
            oneOf: [
              {
                type: 'string',
                enum: [
                  'akuvox_lock',
                  'august_lock',
                  'brivo_access_point',
                  'butterflymx_panel',
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
                  'yale_lock',
                  'two_n_intercom',
                  'controlbyweb_device',
                  'ttlock_lock',
                  'igloohome_lock',
                  'hubitat_lock',
                ],
              },
              {
                type: 'string',
                enum: ['noiseaware_activity_zone', 'minut_sensor'],
              },
              {
                type: 'string',
                enum: ['ecobee_thermostat', 'nest_thermostat'],
              },
            ],
          },
          capabilities_supported: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'access_code',
                'lock',
                'noise_detection',
                'thermostat',
                'battery',
              ],
            },
          },
          properties: {
            allOf: [
              {
                allOf: [
                  {
                    type: 'object',
                    properties: {
                      online: { type: 'boolean' },
                      name: { type: 'string' },
                      model: {
                        type: 'object',
                        properties: { display_name: { type: 'string' } },
                        required: ['display_name'],
                      },
                      has_direct_power: { type: 'boolean' },
                      battery_level: { type: 'number', minimum: 0, maximum: 1 },
                      battery: {
                        type: 'object',
                        properties: {
                          level: { type: 'number', minimum: 0, maximum: 1 },
                          status: {
                            type: 'string',
                            enum: ['critical', 'low', 'good', 'full'],
                          },
                        },
                        required: ['level', 'status'],
                      },
                      manufacturer: { type: 'string' },
                      image_url: { type: 'string', format: 'uri' },
                      image_alt_text: { type: 'string' },
                      serial_number: { type: 'string' },
                    },
                    required: ['online', 'name', 'model'],
                  },
                  {
                    type: 'object',
                    properties: {
                      august_metadata: {
                        type: 'object',
                        properties: {
                          lock_id: { type: 'string' },
                          lock_name: { type: 'string' },
                          house_name: { type: 'string' },
                          has_keypad: { type: 'boolean' },
                          keypad_battery_level: { type: 'string' },
                          model: { type: 'string' },
                          house_id: { type: 'string' },
                        },
                        required: [
                          'lock_id',
                          'lock_name',
                          'house_name',
                          'has_keypad',
                        ],
                      },
                      schlage_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          access_code_length: { type: 'number' },
                          model: { type: 'string' },
                        },
                        required: [
                          'device_id',
                          'device_name',
                          'access_code_length',
                        ],
                      },
                      smartthings_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          model: { type: 'string' },
                          location_id: { type: 'string' },
                        },
                        required: ['device_id', 'device_name'],
                      },
                      lockly_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          model: { type: 'string' },
                        },
                        required: ['device_id', 'device_name'],
                      },
                      nuki_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          keypad_battery_critical: { type: 'boolean' },
                        },
                        required: ['device_id', 'device_name'],
                      },
                      kwikset_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          model_number: { type: 'string' },
                        },
                        required: ['device_id', 'device_name', 'model_number'],
                      },
                      salto_metadata: {
                        type: 'object',
                        properties: {
                          lock_id: { type: 'string' },
                          customer_reference: { type: 'string' },
                          lock_type: { type: 'string' },
                          battery_level: { type: 'string' },
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
                      },
                      genie_metadata: {
                        type: 'object',
                        properties: {
                          device_name: { type: 'string' },
                          door_name: { type: 'string' },
                        },
                        required: ['device_name', 'door_name'],
                      },
                      brivo_metadata: {
                        type: 'object',
                        properties: { device_name: { type: 'string' } },
                        required: ['device_name'],
                      },
                      igloo_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'string' },
                          bridge_id: { type: 'string' },
                          model: { type: 'string' },
                        },
                        required: ['device_id', 'bridge_id'],
                      },
                      noiseaware_metadata: {
                        type: 'object',
                        properties: {
                          device_model: {
                            type: 'string',
                            enum: ['indoor', 'outdoor'],
                          },
                          noise_level_nrs: { type: 'number' },
                          noise_level_decibel: { type: 'number' },
                          device_name: { type: 'string' },
                          device_id: { type: 'string' },
                        },
                        required: [
                          'device_model',
                          'noise_level_nrs',
                          'noise_level_decibel',
                          'device_name',
                          'device_id',
                        ],
                      },
                      minut_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          latest_sensor_values: {
                            type: 'object',
                            properties: {
                              temperature: {
                                type: 'object',
                                properties: {
                                  time: { type: 'string' },
                                  value: { type: 'number' },
                                },
                                required: ['time', 'value'],
                              },
                              sound: {
                                type: 'object',
                                properties: {
                                  time: { type: 'string' },
                                  value: { type: 'number' },
                                },
                                required: ['time', 'value'],
                              },
                              humidity: {
                                type: 'object',
                                properties: {
                                  time: { type: 'string' },
                                  value: { type: 'number' },
                                },
                                required: ['time', 'value'],
                              },
                              pressure: {
                                type: 'object',
                                properties: {
                                  time: { type: 'string' },
                                  value: { type: 'number' },
                                },
                                required: ['time', 'value'],
                              },
                              accelerometer_z: {
                                type: 'object',
                                properties: {
                                  time: { type: 'string' },
                                  value: { type: 'number' },
                                },
                                required: ['time', 'value'],
                              },
                            },
                            required: [
                              'temperature',
                              'sound',
                              'humidity',
                              'pressure',
                              'accelerometer_z',
                            ],
                          },
                        },
                        required: [
                          'device_id',
                          'device_name',
                          'latest_sensor_values',
                        ],
                      },
                      two_n_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'number' },
                          device_name: { type: 'string' },
                        },
                        required: ['device_id', 'device_name'],
                      },
                      controlbyweb_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          relay_name: { type: 'string', nullable: true },
                        },
                        required: ['device_id', 'device_name', 'relay_name'],
                      },
                      ttlock_metadata: {
                        type: 'object',
                        properties: {
                          lock_id: { type: 'number' },
                          lock_alias: { type: 'string' },
                        },
                        required: ['lock_id', 'lock_alias'],
                      },
                      seam_bridge_metadata: {
                        type: 'object',
                        properties: {
                          unlock_method: {
                            type: 'string',
                            enum: ['bridge', 'doorking'],
                          },
                          device_num: { type: 'number' },
                          name: { type: 'string' },
                        },
                        required: ['device_num', 'name'],
                      },
                      igloohome_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'string' },
                          bridge_id: { type: 'string' },
                          device_name: { type: 'string' },
                          bridge_name: { type: 'string' },
                        },
                        required: [
                          'device_id',
                          'bridge_id',
                          'device_name',
                          'bridge_name',
                        ],
                      },
                      nest_metadata: {
                        type: 'object',
                        properties: {
                          nest_device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          custom_name: { type: 'string' },
                        },
                        required: [
                          'nest_device_id',
                          'device_name',
                          'custom_name',
                        ],
                      },
                      ecobee_metadata: {
                        type: 'object',
                        properties: {
                          ecobee_device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          min_heating_set_point_fahrenheit: { type: 'number' },
                          max_heating_set_point_fahrenheit: { type: 'number' },
                          min_cooling_set_point_fahrenheit: { type: 'number' },
                          max_cooling_set_point_fahrenheit: { type: 'number' },
                          min_heating_set_point_celsius: { type: 'number' },
                          max_heating_set_point_celsius: { type: 'number' },
                          min_cooling_set_point_celsius: { type: 'number' },
                          max_cooling_set_point_celsius: { type: 'number' },
                          min_delta_heat_cool_set_points_fahrenheit: {
                            type: 'number',
                          },
                          min_delta_heat_cool_set_points_celsius: {
                            type: 'number',
                          },
                        },
                        required: ['ecobee_device_id', 'device_name'],
                      },
                      hubitat_metadata: {
                        type: 'object',
                        properties: {
                          device_id: { type: 'string' },
                          device_name: { type: 'string' },
                          device_label: { type: 'string' },
                        },
                        required: ['device_id', 'device_name', 'device_label'],
                      },
                    },
                  },
                ],
              },
              {
                type: 'object',
                properties: {
                  code_constraints: {
                    type: 'array',
                    items: {
                      oneOf: [
                        {
                          type: 'object',
                          properties: {
                            constraint_type: {
                              type: 'string',
                              enum: [
                                'no_zeros',
                                'cannot_start_with_12',
                                'no_triple_consecutive_ints',
                                'cannot_specify_pin_code',
                                'pin_code_matches_existing_set',
                                'start_date_in_future',
                              ],
                            },
                          },
                          required: ['constraint_type'],
                        },
                        {
                          type: 'object',
                          properties: {
                            constraint_type: {
                              type: 'string',
                              enum: ['name_length'],
                            },
                            min_length: { type: 'number' },
                            max_length: { type: 'number' },
                          },
                          required: ['constraint_type'],
                        },
                      ],
                    },
                  },
                  supported_code_lengths: {
                    type: 'array',
                    items: { type: 'number' },
                  },
                  max_active_codes_supported: { type: 'number' },
                  supports_backup_access_code_pool: { type: 'boolean' },
                  has_native_entry_events: { type: 'boolean' },
                  locked: { type: 'boolean' },
                  keypad_battery: {
                    type: 'object',
                    properties: { level: { type: 'number' } },
                    required: ['level'],
                  },
                  door_open: { type: 'boolean' },
                  temperature_fahrenheit: { type: 'number' },
                  temperature_celsius: { type: 'number' },
                  relative_humidity: { type: 'number', minimum: 0, maximum: 1 },
                  can_enable_automatic_heating: { type: 'boolean' },
                  can_enable_automatic_cooling: { type: 'boolean' },
                  available_hvac_mode_settings: {
                    type: 'array',
                    items: {
                      type: 'string',
                      enum: ['off', 'heat', 'cool', 'heatcool'],
                    },
                  },
                  is_heating: { type: 'boolean' },
                  is_cooling: { type: 'boolean' },
                  is_fan_running: { type: 'boolean' },
                  is_temporary_manual_override_active: { type: 'boolean' },
                  current_climate_setting: {
                    type: 'object',
                    properties: {
                      automatic_heating_enabled: { type: 'boolean' },
                      automatic_cooling_enabled: { type: 'boolean' },
                      hvac_mode_setting: {
                        type: 'string',
                        enum: ['off', 'heat', 'cool', 'heatcool'],
                      },
                      cooling_set_point_celsius: { type: 'number' },
                      heating_set_point_celsius: { type: 'number' },
                      cooling_set_point_fahrenheit: { type: 'number' },
                      heating_set_point_fahrenheit: { type: 'number' },
                      manual_override_allowed: { type: 'boolean' },
                    },
                    required: [
                      'automatic_heating_enabled',
                      'automatic_cooling_enabled',
                      'hvac_mode_setting',
                      'manual_override_allowed',
                    ],
                  },
                  default_climate_setting: {
                    type: 'object',
                    properties: {
                      automatic_heating_enabled: { type: 'boolean' },
                      automatic_cooling_enabled: { type: 'boolean' },
                      hvac_mode_setting: {
                        type: 'string',
                        enum: ['off', 'heat', 'cool', 'heatcool'],
                      },
                      cooling_set_point_celsius: { type: 'number' },
                      heating_set_point_celsius: { type: 'number' },
                      cooling_set_point_fahrenheit: { type: 'number' },
                      heating_set_point_fahrenheit: { type: 'number' },
                      manual_override_allowed: { type: 'boolean' },
                    },
                    required: [
                      'automatic_heating_enabled',
                      'automatic_cooling_enabled',
                      'hvac_mode_setting',
                      'manual_override_allowed',
                    ],
                  },
                  is_climate_setting_schedule_active: { type: 'boolean' },
                  active_climate_setting_schedule: {
                    type: 'object',
                    properties: {
                      climate_setting_schedule_id: {
                        type: 'string',
                        format: 'uuid',
                      },
                      schedule_type: { type: 'string', enum: ['time_bound'] },
                      device_id: { type: 'string' },
                      name: { type: 'string' },
                      schedule_starts_at: { type: 'string' },
                      schedule_ends_at: { type: 'string' },
                      created_at: { type: 'string', format: 'date-time' },
                      automatic_heating_enabled: { type: 'boolean' },
                      automatic_cooling_enabled: { type: 'boolean' },
                      hvac_mode_setting: {
                        type: 'string',
                        enum: ['off', 'heat', 'cool', 'heatcool'],
                      },
                      cooling_set_point_celsius: { type: 'number' },
                      heating_set_point_celsius: { type: 'number' },
                      cooling_set_point_fahrenheit: { type: 'number' },
                      heating_set_point_fahrenheit: { type: 'number' },
                      manual_override_allowed: { type: 'boolean' },
                    },
                    required: [
                      'climate_setting_schedule_id',
                      'schedule_type',
                      'device_id',
                      'schedule_starts_at',
                      'schedule_ends_at',
                      'created_at',
                    ],
                  },
                },
              },
            ],
          },
          location: {
            type: 'object',
            properties: {
              location_name: { type: 'string' },
              timezone: { type: 'string' },
            },
            nullable: true,
          },
          connected_account_id: { type: 'string', format: 'uuid' },
          workspace_id: { type: 'string', format: 'uuid' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                error_code: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['error_code', 'message'],
            },
          },
          warnings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                warning_code: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['warning_code', 'message'],
            },
          },
          created_at: { type: 'string', format: 'date-time' },
          is_managed: { type: 'boolean', enum: [true] },
        },
        required: [
          'device_id',
          'device_type',
          'capabilities_supported',
          'properties',
          'location',
          'connected_account_id',
          'workspace_id',
          'errors',
          'warnings',
          'created_at',
          'is_managed',
        ],
      },
      event: {
        type: 'object',
        properties: {
          event_id: { type: 'string', format: 'uuid' },
          device_id: { type: 'string', format: 'uuid' },
          event_type: { type: 'string' },
          workspace_id: { type: 'string', format: 'uuid' },
          created_at: { type: 'string', format: 'date-time' },
          occurred_at: { type: 'string', format: 'date-time' },
        },
        required: [
          'event_id',
          'event_type',
          'workspace_id',
          'created_at',
          'occurred_at',
        ],
      },
      noise_threshold: {
        type: 'object',
        properties: {
          noise_threshold_id: { type: 'string', format: 'uuid' },
          device_id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          noise_threshold_nrs: { type: 'number' },
          starts_daily_at: { type: 'string' },
          ends_daily_at: { type: 'string' },
          noise_threshold_decibels: { type: 'number' },
        },
        required: [
          'noise_threshold_id',
          'device_id',
          'name',
          'starts_daily_at',
          'ends_daily_at',
          'noise_threshold_decibels',
        ],
      },
      service_health: {
        type: 'object',
        properties: {
          service: { type: 'string' },
          status: { type: 'string', enum: ['healthy', 'degraded', 'down'] },
          description: { type: 'string' },
        },
        required: ['service', 'status', 'description'],
      },
      unmanaged_device: {
        type: 'object',
        properties: {
          device_id: { type: 'string', format: 'uuid' },
          device_type: {
            oneOf: [
              {
                type: 'string',
                enum: [
                  'akuvox_lock',
                  'august_lock',
                  'brivo_access_point',
                  'butterflymx_panel',
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
                  'yale_lock',
                  'two_n_intercom',
                  'controlbyweb_device',
                  'ttlock_lock',
                  'igloohome_lock',
                  'hubitat_lock',
                ],
              },
              {
                type: 'string',
                enum: ['noiseaware_activity_zone', 'minut_sensor'],
              },
              {
                type: 'string',
                enum: ['ecobee_thermostat', 'nest_thermostat'],
              },
            ],
          },
          connected_account_id: { type: 'string', format: 'uuid' },
          capabilities_supported: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'access_code',
                'lock',
                'noise_detection',
                'thermostat',
                'battery',
              ],
            },
          },
          workspace_id: { type: 'string', format: 'uuid' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                error_code: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['error_code', 'message'],
            },
          },
          warnings: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                warning_code: { type: 'string' },
                message: { type: 'string' },
              },
              required: ['warning_code', 'message'],
            },
          },
          created_at: { type: 'string', format: 'date-time' },
          is_managed: { type: 'boolean', enum: [false] },
          properties: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              online: { type: 'boolean' },
              manufacturer: { type: 'string' },
              image_url: { type: 'string' },
              image_alt_text: { type: 'string' },
              model: {
                type: 'object',
                properties: { display_name: { type: 'string' } },
                required: ['display_name'],
              },
            },
            required: ['name', 'online', 'model'],
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
      },
      webhook: {
        type: 'object',
        properties: {
          webhook_id: { type: 'string' },
          url: { type: 'string' },
          event_types: { type: 'array', items: { type: 'string' } },
          secret: { type: 'string' },
        },
        required: ['webhook_id', 'url'],
      },
      workspace: {
        type: 'object',
        properties: {
          workspace_id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          is_sandbox: { type: 'boolean' },
          connect_partner_name: { type: 'string', nullable: true },
        },
        required: [
          'workspace_id',
          'name',
          'is_sandbox',
          'connect_partner_name',
        ],
      },
    },
  },
}
