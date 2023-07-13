export default {
  openapi: "3.0.0",
  info: { title: "Seam Connect", version: "1.0.0" },
  servers: [{ url: "https://connect.getseam.com" }],
  tags: [
    { name: "/access_codes", description: "access_codes" },
    { name: "/action_attempts", description: "action_attempts" },
    { name: "/client_sessions", description: "client_sessions" },
    { name: "/connected_accounts", description: "connected_accounts" },
    { name: "/connect_webviews", description: "connect_webviews" },
    { name: "/devices", description: "devices" },
    { name: "/events", description: "events" },
    { name: "/health", description: "health" },
    { name: "/locks", description: "locks" },
    { name: "/noise_sensors", description: "noise_sensors" },
    { name: "/webhooks", description: "webhooks" },
    { name: "/workspaces", description: "workspaces" },
  ],
  paths: {
    "/access_codes/create": {
      post: {
        summary: "/access_codes/create",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    access_code: {
                      type: "object",
                      properties: {
                        common_code_key: { type: "string", nullable: true },
                        is_scheduled_on_device: { type: "boolean" },
                        type: {
                          type: "string",
                          enum: ["time_bound", "ongoing"],
                        },
                        is_waiting_for_code_assignment: { type: "boolean" },
                        access_code_id: { type: "string", format: "uuid" },
                        device_id: { type: "string", format: "uuid" },
                        name: { type: "string", nullable: true },
                        code: { type: "string", nullable: true },
                        created_at: { type: "string" },
                        errors: { nullable: true },
                        warnings: { nullable: true },
                        is_managed: { type: "boolean", enum: [true] },
                        starts_at: { type: "string" },
                        ends_at: { type: "string" },
                        status: {
                          type: "string",
                          enum: [
                            "setting",
                            "set",
                            "unset",
                            "removing",
                            "unknown",
                          ],
                        },
                        is_backup_access_code_available: { type: "boolean" },
                        is_backup: { type: "boolean" },
                        pulled_backup_access_code_id: {
                          type: "string",
                          format: "uuid",
                          nullable: true,
                        },
                      },
                      required: [
                        "common_code_key",
                        "type",
                        "access_code_id",
                        "device_id",
                        "name",
                        "code",
                        "created_at",
                        "is_managed",
                        "status",
                        "is_backup_access_code_available",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "access_code", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  name: { type: "string" },
                  starts_at: { type: "string" },
                  ends_at: { type: "string" },
                  code: {
                    type: "string",
                    minLength: 4,
                    maxLength: 8,
                    pattern: "^\\d+$",
                  },
                  sync: { default: false, type: "boolean" },
                  attempt_for_offline_device: {
                    default: true,
                    type: "boolean",
                  },
                  common_code_key: { type: "string" },
                  prefer_native_scheduling: { type: "boolean" },
                  use_backup_access_code_pool: { type: "boolean" },
                },
                required: ["device_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "starts_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "ends_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "code",
            in: "query",
            schema: {
              type: "string",
              minLength: 4,
              maxLength: 8,
              pattern: "^\\d+$",
            },
            required: false,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
          {
            name: "attempt_for_offline_device",
            in: "query",
            schema: { default: true, type: "boolean" },
            required: false,
          },
          {
            name: "common_code_key",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "prefer_native_scheduling",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "use_backup_access_code_pool",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
        ],
        tags: ["/access_codes"],
        operationId: "accessCodesCreatePost",
      },
    },
    "/access_codes/create_multiple": {
      put: {
        summary: "/access_codes/create_multiple",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    access_codes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          common_code_key: { type: "string", nullable: true },
                          is_scheduled_on_device: { type: "boolean" },
                          type: {
                            type: "string",
                            enum: ["time_bound", "ongoing"],
                          },
                          is_waiting_for_code_assignment: { type: "boolean" },
                          access_code_id: { type: "string", format: "uuid" },
                          device_id: { type: "string", format: "uuid" },
                          name: { type: "string", nullable: true },
                          code: { type: "string", nullable: true },
                          created_at: { type: "string" },
                          errors: { nullable: true },
                          warnings: { nullable: true },
                          is_managed: { type: "boolean", enum: [true] },
                          starts_at: { type: "string" },
                          ends_at: { type: "string" },
                          status: {
                            type: "string",
                            enum: [
                              "setting",
                              "set",
                              "unset",
                              "removing",
                              "unknown",
                            ],
                          },
                          is_backup_access_code_available: { type: "boolean" },
                          is_backup: { type: "boolean" },
                          pulled_backup_access_code_id: {
                            type: "string",
                            format: "uuid",
                            nullable: true,
                          },
                        },
                        required: [
                          "common_code_key",
                          "type",
                          "access_code_id",
                          "device_id",
                          "name",
                          "code",
                          "created_at",
                          "is_managed",
                          "status",
                          "is_backup_access_code_available",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["access_codes", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                  behavior_when_code_cannot_be_shared: {
                    default: "throw",
                    type: "string",
                    enum: ["throw", "create_random_code"],
                  },
                  name: { type: "string" },
                  starts_at: { type: "string" },
                  ends_at: { type: "string" },
                  code: {
                    type: "string",
                    minLength: 4,
                    maxLength: 8,
                    pattern: "^\\d+$",
                  },
                  attempt_for_offline_device: {
                    default: true,
                    type: "boolean",
                  },
                  prefer_native_scheduling: { type: "boolean" },
                  use_backup_access_code_pool: { type: "boolean" },
                },
                required: ["device_ids"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_ids",
            in: "query",
            schema: {
              type: "array",
              items: { type: "string", format: "uuid" },
            },
            required: true,
          },
          {
            name: "behavior_when_code_cannot_be_shared",
            in: "query",
            schema: {
              default: "throw",
              type: "string",
              enum: ["throw", "create_random_code"],
            },
            required: false,
          },
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "starts_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "ends_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "code",
            in: "query",
            schema: {
              type: "string",
              minLength: 4,
              maxLength: 8,
              pattern: "^\\d+$",
            },
            required: false,
          },
          {
            name: "attempt_for_offline_device",
            in: "query",
            schema: { default: true, type: "boolean" },
            required: false,
          },
          {
            name: "prefer_native_scheduling",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "use_backup_access_code_pool",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
        ],
        tags: ["/access_codes"],
        operationId: "accessCodesCreateMultiplePut",
      },
      post: {
        summary: "/access_codes/create_multiple",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    access_codes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          common_code_key: { type: "string", nullable: true },
                          is_scheduled_on_device: { type: "boolean" },
                          type: {
                            type: "string",
                            enum: ["time_bound", "ongoing"],
                          },
                          is_waiting_for_code_assignment: { type: "boolean" },
                          access_code_id: { type: "string", format: "uuid" },
                          device_id: { type: "string", format: "uuid" },
                          name: { type: "string", nullable: true },
                          code: { type: "string", nullable: true },
                          created_at: { type: "string" },
                          errors: { nullable: true },
                          warnings: { nullable: true },
                          is_managed: { type: "boolean", enum: [true] },
                          starts_at: { type: "string" },
                          ends_at: { type: "string" },
                          status: {
                            type: "string",
                            enum: [
                              "setting",
                              "set",
                              "unset",
                              "removing",
                              "unknown",
                            ],
                          },
                          is_backup_access_code_available: { type: "boolean" },
                          is_backup: { type: "boolean" },
                          pulled_backup_access_code_id: {
                            type: "string",
                            format: "uuid",
                            nullable: true,
                          },
                        },
                        required: [
                          "common_code_key",
                          "type",
                          "access_code_id",
                          "device_id",
                          "name",
                          "code",
                          "created_at",
                          "is_managed",
                          "status",
                          "is_backup_access_code_available",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["access_codes", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                  behavior_when_code_cannot_be_shared: {
                    default: "throw",
                    type: "string",
                    enum: ["throw", "create_random_code"],
                  },
                  name: { type: "string" },
                  starts_at: { type: "string" },
                  ends_at: { type: "string" },
                  code: {
                    type: "string",
                    minLength: 4,
                    maxLength: 8,
                    pattern: "^\\d+$",
                  },
                  attempt_for_offline_device: {
                    default: true,
                    type: "boolean",
                  },
                  prefer_native_scheduling: { type: "boolean" },
                  use_backup_access_code_pool: { type: "boolean" },
                },
                required: ["device_ids"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_ids",
            in: "query",
            schema: {
              type: "array",
              items: { type: "string", format: "uuid" },
            },
            required: true,
          },
          {
            name: "behavior_when_code_cannot_be_shared",
            in: "query",
            schema: {
              default: "throw",
              type: "string",
              enum: ["throw", "create_random_code"],
            },
            required: false,
          },
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "starts_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "ends_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "code",
            in: "query",
            schema: {
              type: "string",
              minLength: 4,
              maxLength: 8,
              pattern: "^\\d+$",
            },
            required: false,
          },
          {
            name: "attempt_for_offline_device",
            in: "query",
            schema: { default: true, type: "boolean" },
            required: false,
          },
          {
            name: "prefer_native_scheduling",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "use_backup_access_code_pool",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
        ],
        tags: ["/access_codes"],
        operationId: "accessCodesCreateMultiplePost",
      },
    },
    "/access_codes/delete": {
      post: {
        summary: "/access_codes/delete",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  access_code_id: { type: "string", format: "uuid" },
                  sync: { default: false, type: "boolean" },
                },
                required: ["access_code_id"],
              },
            },
          },
        },
        tags: ["/access_codes"],
        operationId: "accessCodesDeletePost",
      },
    },
    "/access_codes/get": {
      post: {
        summary: "/access_codes/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    access_code: {
                      type: "object",
                      properties: {
                        common_code_key: { type: "string", nullable: true },
                        is_scheduled_on_device: { type: "boolean" },
                        type: {
                          type: "string",
                          enum: ["time_bound", "ongoing"],
                        },
                        is_waiting_for_code_assignment: { type: "boolean" },
                        access_code_id: { type: "string", format: "uuid" },
                        device_id: { type: "string", format: "uuid" },
                        name: { type: "string", nullable: true },
                        code: { type: "string", nullable: true },
                        created_at: { type: "string" },
                        errors: { nullable: true },
                        warnings: { nullable: true },
                        is_managed: { type: "boolean", enum: [true] },
                        starts_at: { type: "string" },
                        ends_at: { type: "string" },
                        status: {
                          type: "string",
                          enum: [
                            "setting",
                            "set",
                            "unset",
                            "removing",
                            "unknown",
                          ],
                        },
                        is_backup_access_code_available: { type: "boolean" },
                        is_backup: { type: "boolean" },
                        pulled_backup_access_code_id: {
                          type: "string",
                          format: "uuid",
                          nullable: true,
                        },
                      },
                      required: [
                        "common_code_key",
                        "type",
                        "access_code_id",
                        "device_id",
                        "name",
                        "code",
                        "created_at",
                        "is_managed",
                        "status",
                        "is_backup_access_code_available",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["access_code", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  access_code_id: { type: "string", format: "uuid" },
                  code: { type: "string" },
                },
              },
            },
          },
        },
        tags: ["/access_codes"],
        operationId: "accessCodesGetPost",
      },
    },
    "/access_codes/list": {
      post: {
        summary: "/access_codes/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    access_codes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          common_code_key: { type: "string", nullable: true },
                          is_scheduled_on_device: { type: "boolean" },
                          type: {
                            type: "string",
                            enum: ["time_bound", "ongoing"],
                          },
                          is_waiting_for_code_assignment: { type: "boolean" },
                          access_code_id: { type: "string", format: "uuid" },
                          device_id: { type: "string", format: "uuid" },
                          name: { type: "string", nullable: true },
                          code: { type: "string", nullable: true },
                          created_at: { type: "string" },
                          errors: { nullable: true },
                          warnings: { nullable: true },
                          is_managed: { type: "boolean", enum: [true] },
                          starts_at: { type: "string" },
                          ends_at: { type: "string" },
                          status: {
                            type: "string",
                            enum: [
                              "setting",
                              "set",
                              "unset",
                              "removing",
                              "unknown",
                            ],
                          },
                          is_backup_access_code_available: { type: "boolean" },
                          is_backup: { type: "boolean" },
                          pulled_backup_access_code_id: {
                            type: "string",
                            format: "uuid",
                            nullable: true,
                          },
                        },
                        required: [
                          "common_code_key",
                          "type",
                          "access_code_id",
                          "device_id",
                          "name",
                          "code",
                          "created_at",
                          "is_managed",
                          "status",
                          "is_backup_access_code_available",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["access_codes", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  access_code_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                },
                required: ["device_id"],
              },
            },
          },
        },
        tags: ["/access_codes"],
        operationId: "accessCodesListPost",
      },
    },
    "/access_codes/pull_backup_access_code": {
      post: {
        summary: "/access_codes/pull_backup_access_code",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    backup_access_code: {
                      type: "object",
                      properties: {
                        common_code_key: { type: "string", nullable: true },
                        is_scheduled_on_device: { type: "boolean" },
                        type: {
                          type: "string",
                          enum: ["time_bound", "ongoing"],
                        },
                        is_waiting_for_code_assignment: { type: "boolean" },
                        access_code_id: { type: "string", format: "uuid" },
                        device_id: { type: "string", format: "uuid" },
                        name: { type: "string", nullable: true },
                        code: { type: "string", nullable: true },
                        created_at: { type: "string" },
                        errors: { nullable: true },
                        warnings: { nullable: true },
                        is_managed: { type: "boolean", enum: [true] },
                        starts_at: { type: "string" },
                        ends_at: { type: "string" },
                        status: {
                          type: "string",
                          enum: [
                            "setting",
                            "set",
                            "unset",
                            "removing",
                            "unknown",
                          ],
                        },
                        is_backup_access_code_available: { type: "boolean" },
                        is_backup: { type: "boolean" },
                        pulled_backup_access_code_id: {
                          type: "string",
                          format: "uuid",
                          nullable: true,
                        },
                      },
                      required: [
                        "common_code_key",
                        "type",
                        "access_code_id",
                        "device_id",
                        "name",
                        "code",
                        "created_at",
                        "is_managed",
                        "status",
                        "is_backup_access_code_available",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["backup_access_code", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  access_code_id: { type: "string", format: "uuid" },
                },
                required: ["access_code_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "access_code_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
        ],
        tags: ["/access_codes"],
        operationId: "accessCodesPullBackupAccessCodePost",
      },
    },
    "/access_codes/update": {
      put: {
        summary: "/access_codes/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  starts_at: { type: "string" },
                  ends_at: { type: "string" },
                  code: {
                    type: "string",
                    minLength: 4,
                    maxLength: 8,
                    pattern: "^\\d+$",
                  },
                  sync: { default: false, type: "boolean" },
                  attempt_for_offline_device: {
                    default: true,
                    type: "boolean",
                  },
                  prefer_native_scheduling: { type: "boolean" },
                  use_backup_access_code_pool: { type: "boolean" },
                  access_code_id: { type: "string", format: "uuid" },
                  device_id: { type: "string", format: "uuid" },
                  type: { type: "string", enum: ["ongoing", "time_bound"] },
                },
                required: ["access_code_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "starts_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "ends_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "code",
            in: "query",
            schema: {
              type: "string",
              minLength: 4,
              maxLength: 8,
              pattern: "^\\d+$",
            },
            required: false,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
          {
            name: "attempt_for_offline_device",
            in: "query",
            schema: { default: true, type: "boolean" },
            required: false,
          },
          {
            name: "prefer_native_scheduling",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "use_backup_access_code_pool",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "access_code_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: false,
          },
          {
            name: "type",
            in: "query",
            schema: { type: "string", enum: ["ongoing", "time_bound"] },
            required: false,
          },
        ],
        tags: ["/access_codes"],
        operationId: "accessCodesUpdatePut",
      },
      post: {
        summary: "/access_codes/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  starts_at: { type: "string" },
                  ends_at: { type: "string" },
                  code: {
                    type: "string",
                    minLength: 4,
                    maxLength: 8,
                    pattern: "^\\d+$",
                  },
                  sync: { default: false, type: "boolean" },
                  attempt_for_offline_device: {
                    default: true,
                    type: "boolean",
                  },
                  prefer_native_scheduling: { type: "boolean" },
                  use_backup_access_code_pool: { type: "boolean" },
                  access_code_id: { type: "string", format: "uuid" },
                  device_id: { type: "string", format: "uuid" },
                  type: { type: "string", enum: ["ongoing", "time_bound"] },
                },
                required: ["access_code_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "starts_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "ends_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "code",
            in: "query",
            schema: {
              type: "string",
              minLength: 4,
              maxLength: 8,
              pattern: "^\\d+$",
            },
            required: false,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
          {
            name: "attempt_for_offline_device",
            in: "query",
            schema: { default: true, type: "boolean" },
            required: false,
          },
          {
            name: "prefer_native_scheduling",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "use_backup_access_code_pool",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "access_code_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: false,
          },
          {
            name: "type",
            in: "query",
            schema: { type: "string", enum: ["ongoing", "time_bound"] },
            required: false,
          },
        ],
        tags: ["/access_codes"],
        operationId: "accessCodesUpdatePost",
      },
    },
    "/action_attempts/get": {
      post: {
        summary: "/action_attempts/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  action_attempt_id: { type: "string", format: "uuid" },
                },
                required: ["action_attempt_id"],
              },
            },
          },
        },
        tags: ["/action_attempts"],
        operationId: "actionAttemptsGetPost",
      },
    },
    "/action_attempts/list": {
      post: {
        summary: "/action_attempts/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempts: {
                      type: "array",
                      items: {
                        discriminator: { propertyName: "status" },
                        oneOf: [
                          {
                            type: "object",
                            properties: {
                              status: { type: "string", enum: ["success"] },
                              action_type: { type: "string" },
                              action_attempt_id: {
                                type: "string",
                                format: "uuid",
                              },
                              result: { nullable: true },
                              error: {
                                type: "string",
                                format: "null",
                                nullable: true,
                              },
                            },
                            required: [
                              "status",
                              "action_type",
                              "action_attempt_id",
                              "error",
                            ],
                          },
                          {
                            type: "object",
                            properties: {
                              status: { type: "string", enum: ["pending"] },
                              action_type: { type: "string" },
                              action_attempt_id: {
                                type: "string",
                                format: "uuid",
                              },
                              result: {
                                type: "string",
                                format: "null",
                                nullable: true,
                              },
                              error: {
                                type: "string",
                                format: "null",
                                nullable: true,
                              },
                            },
                            required: [
                              "status",
                              "action_type",
                              "action_attempt_id",
                              "result",
                              "error",
                            ],
                          },
                          {
                            type: "object",
                            properties: {
                              status: { type: "string", enum: ["error"] },
                              action_type: { type: "string" },
                              action_attempt_id: {
                                type: "string",
                                format: "uuid",
                              },
                              result: {
                                type: "string",
                                format: "null",
                                nullable: true,
                              },
                              error: {
                                type: "object",
                                properties: {
                                  type: { type: "string" },
                                  message: { type: "string" },
                                },
                                required: ["type", "message"],
                              },
                            },
                            required: [
                              "status",
                              "action_type",
                              "action_attempt_id",
                              "result",
                              "error",
                            ],
                          },
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempts", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  action_attempt_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                },
                required: ["action_attempt_ids"],
              },
            },
          },
        },
        tags: ["/action_attempts"],
        operationId: "actionAttemptsListPost",
      },
    },
    "/client_sessions/create": {
      put: {
        summary: "/client_sessions/create",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    client_session: {
                      type: "object",
                      properties: {
                        token: { type: "string" },
                        client_session_id: { type: "string" },
                        created_at: { type: "string" },
                      },
                      required: ["token", "client_session_id", "created_at"],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["client_session", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  { nullable: true },
                  {
                    type: "object",
                    properties: {
                      user_identifier_key: { type: "string" },
                      connect_webview_ids: {
                        type: "array",
                        items: { type: "string" },
                      },
                      connected_account_ids: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                    required: ["user_identifier_key"],
                  },
                ],
                nullable: true,
              },
            },
          },
        },
        tags: ["/client_sessions"],
        operationId: "clientSessionsCreatePut",
      },
      post: {
        summary: "/client_sessions/create",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    client_session: {
                      type: "object",
                      properties: {
                        token: { type: "string" },
                        client_session_id: { type: "string" },
                        created_at: { type: "string" },
                      },
                      required: ["token", "client_session_id", "created_at"],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["client_session", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        requestBody: {
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  { nullable: true },
                  {
                    type: "object",
                    properties: {
                      user_identifier_key: { type: "string" },
                      connect_webview_ids: {
                        type: "array",
                        items: { type: "string" },
                      },
                      connected_account_ids: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                    required: ["user_identifier_key"],
                  },
                ],
                nullable: true,
              },
            },
          },
        },
        tags: ["/client_sessions"],
        operationId: "clientSessionsCreatePost",
      },
    },
    "/client_sessions/delete": {
      post: {
        summary: "/client_sessions/delete",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  client_session_id: { type: "string", format: "uuid" },
                },
                required: ["client_session_id"],
              },
            },
          },
        },
        tags: ["/client_sessions"],
        operationId: "clientSessionsDeletePost",
      },
    },
    "/client_sessions/list": {
      post: {
        summary: "/client_sessions/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    client_sessions: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          user_identifier_key: {
                            type: "string",
                            nullable: true,
                          },
                          client_session_id: { type: "string" },
                          created_at: { type: "string" },
                          device_count: { type: "number" },
                          token: { type: "string" },
                          workspace_id: { type: "string" },
                        },
                        required: [
                          "user_identifier_key",
                          "client_session_id",
                          "created_at",
                          "device_count",
                          "token",
                          "workspace_id",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["client_sessions", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": { schema: { type: "object", properties: {} } },
          },
        },
        tags: ["/client_sessions"],
        operationId: "clientSessionsListPost",
      },
    },
    "/connected_accounts/delete": {
      post: {
        summary: "/connected_accounts/delete",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  connected_account_id: { type: "string", format: "uuid" },
                },
                required: ["connected_account_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "connected_account_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
        ],
        tags: ["/connected_accounts"],
        operationId: "connectedAccountsDeletePost",
      },
    },
    "/connected_accounts/get": {
      get: {
        summary: "/connected_accounts/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    connected_account: {
                      type: "object",
                      properties: {
                        connected_account_id: {
                          type: "string",
                          format: "uuid",
                        },
                        created_at: { type: "string" },
                        user_identifier: {
                          type: "object",
                          properties: {
                            username: { type: "string" },
                            api_url: { type: "string" },
                            email: { type: "string" },
                            phone: { type: "string" },
                            exclusive: { type: "boolean" },
                          },
                        },
                        account_type: { type: "string" },
                        errors: { nullable: true },
                        warnings: { nullable: true },
                        custom_metadata: {
                          type: "object",
                          additionalProperties: {
                            oneOf: [
                              { type: "string" },
                              { type: "number" },
                              { type: "boolean" },
                              {
                                type: "string",
                                format: "null",
                                nullable: true,
                              },
                            ],
                            nullable: true,
                          },
                        },
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["connected_account", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ["/connected_accounts"],
        operationId: "connectedAccountsGetGet",
      },
    },
    "/connected_accounts/list": {
      get: {
        summary: "/connected_accounts/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    connected_accounts: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          connected_account_id: {
                            type: "string",
                            format: "uuid",
                          },
                          created_at: { type: "string" },
                          user_identifier: {
                            type: "object",
                            properties: {
                              username: { type: "string" },
                              api_url: { type: "string" },
                              email: { type: "string" },
                              phone: { type: "string" },
                              exclusive: { type: "boolean" },
                            },
                          },
                          account_type: { type: "string" },
                          errors: { nullable: true },
                          warnings: { nullable: true },
                          custom_metadata: {
                            type: "object",
                            additionalProperties: {
                              oneOf: [
                                { type: "string" },
                                { type: "number" },
                                { type: "boolean" },
                                {
                                  type: "string",
                                  format: "null",
                                  nullable: true,
                                },
                              ],
                              nullable: true,
                            },
                          },
                        },
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["connected_accounts", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ["/connected_accounts"],
        operationId: "connectedAccountsListGet",
      },
    },
    "/connect_webviews/create": {
      post: {
        summary: "/connect_webviews/create",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    connect_webview: {
                      type: "object",
                      properties: {
                        connect_webview_id: { type: "string", format: "uuid" },
                        connected_account_id: {
                          type: "string",
                          format: "uuid",
                        },
                        url: { type: "string", format: "uri" },
                        workspace_id: { type: "string", format: "uuid" },
                        device_selection_mode: {
                          type: "string",
                          enum: ["none", "single", "multiple"],
                        },
                        accepted_providers: {
                          type: "array",
                          items: { type: "string" },
                        },
                        accepted_devices: {
                          type: "array",
                          items: { type: "string" },
                        },
                        any_provider_allowed: { type: "boolean" },
                        any_device_allowed: { type: "boolean" },
                        created_at: { type: "string" },
                        login_successful: { type: "boolean" },
                        status: {
                          type: "string",
                          enum: ["pending", "failed", "authorized"],
                        },
                      },
                      required: [
                        "connect_webview_id",
                        "url",
                        "workspace_id",
                        "device_selection_mode",
                        "accepted_providers",
                        "accepted_devices",
                        "any_provider_allowed",
                        "any_device_allowed",
                        "created_at",
                        "login_successful",
                        "status",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["connect_webview", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_selection_mode: {
                    type: "string",
                    enum: ["none", "single", "multiple"],
                  },
                  custom_redirect_url: { type: "string" },
                  custom_redirect_failure_url: { type: "string" },
                  accepted_providers: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: [
                        "akuvox",
                        "august",
                        "avigilon_alta",
                        "brivo",
                        "butterflymx",
                        "schlage",
                        "smartthings",
                        "yale",
                        "genie",
                        "doorking",
                        "salto",
                        "lockly",
                        "ttlock",
                        "linear",
                        "noiseaware",
                        "nuki",
                        "seam_relay_admin",
                        "igloo",
                        "kwikset",
                        "minut",
                        "my_2n",
                        "controlbyweb",
                        "nest",
                        "igloohome",
                        "ecobee",
                        "hubitat",
                        "yale_access",
                      ],
                    },
                  },
                  provider_category: {
                    type: "string",
                    enum: ["stable", "internal_beta"],
                  },
                  custom_metadata: {
                    type: "object",
                    additionalProperties: {
                      oneOf: [
                        { type: "string", maxLength: 500 },
                        { type: "number" },
                        { type: "string", format: "null", nullable: true },
                        { type: "boolean" },
                      ],
                      nullable: true,
                    },
                  },
                },
              },
            },
          },
        },
        parameters: [
          {
            name: "device_selection_mode",
            in: "query",
            schema: { type: "string", enum: ["none", "single", "multiple"] },
          },
          {
            name: "custom_redirect_url",
            in: "query",
            schema: { type: "string" },
          },
          {
            name: "custom_redirect_failure_url",
            in: "query",
            schema: { type: "string" },
          },
          {
            name: "accepted_providers",
            in: "query",
            schema: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "akuvox",
                  "august",
                  "avigilon_alta",
                  "brivo",
                  "butterflymx",
                  "schlage",
                  "smartthings",
                  "yale",
                  "genie",
                  "doorking",
                  "salto",
                  "lockly",
                  "ttlock",
                  "linear",
                  "noiseaware",
                  "nuki",
                  "seam_relay_admin",
                  "igloo",
                  "kwikset",
                  "minut",
                  "my_2n",
                  "controlbyweb",
                  "nest",
                  "igloohome",
                  "ecobee",
                  "hubitat",
                  "yale_access",
                ],
              },
            },
          },
          {
            name: "provider_category",
            in: "query",
            schema: { type: "string", enum: ["stable", "internal_beta"] },
          },
          {
            name: "custom_metadata",
            in: "query",
            schema: {
              type: "object",
              additionalProperties: {
                oneOf: [
                  { type: "string", maxLength: 500 },
                  { type: "number" },
                  { type: "string", format: "null", nullable: true },
                  { type: "boolean" },
                ],
                nullable: true,
              },
            },
          },
        ],
        tags: ["/connect_webviews"],
        operationId: "connectWebviewsCreatePost",
      },
    },
    "/connect_webviews/delete": {
      post: {
        summary: "/connect_webviews/delete",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  connect_webview_id: { type: "string", format: "uuid" },
                },
                required: ["connect_webview_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "connect_webview_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
        ],
        tags: ["/connect_webviews"],
        operationId: "connectWebviewsDeletePost",
      },
    },
    "/connect_webviews/get": {
      post: {
        summary: "/connect_webviews/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    connect_webview: {
                      type: "object",
                      properties: {
                        connect_webview_id: { type: "string", format: "uuid" },
                        connected_account_id: {
                          type: "string",
                          format: "uuid",
                        },
                        url: { type: "string", format: "uri" },
                        workspace_id: { type: "string", format: "uuid" },
                        device_selection_mode: {
                          type: "string",
                          enum: ["none", "single", "multiple"],
                        },
                        accepted_providers: {
                          type: "array",
                          items: { type: "string" },
                        },
                        accepted_devices: {
                          type: "array",
                          items: { type: "string" },
                        },
                        any_provider_allowed: { type: "boolean" },
                        any_device_allowed: { type: "boolean" },
                        created_at: { type: "string" },
                        login_successful: { type: "boolean" },
                        status: {
                          type: "string",
                          enum: ["pending", "failed", "authorized"],
                        },
                      },
                      required: [
                        "connect_webview_id",
                        "url",
                        "workspace_id",
                        "device_selection_mode",
                        "accepted_providers",
                        "accepted_devices",
                        "any_provider_allowed",
                        "any_device_allowed",
                        "created_at",
                        "login_successful",
                        "status",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["connect_webview", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  connect_webview_id: { type: "string", format: "uuid" },
                },
                required: ["connect_webview_id"],
              },
            },
          },
        },
        tags: ["/connect_webviews"],
        operationId: "connectWebviewsGetPost",
      },
    },
    "/connect_webviews/list": {
      post: {
        summary: "/connect_webviews/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    connect_webviews: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          connect_webview_id: {
                            type: "string",
                            format: "uuid",
                          },
                          connected_account_id: {
                            type: "string",
                            format: "uuid",
                          },
                          url: { type: "string", format: "uri" },
                          workspace_id: { type: "string", format: "uuid" },
                          device_selection_mode: {
                            type: "string",
                            enum: ["none", "single", "multiple"],
                          },
                          accepted_providers: {
                            type: "array",
                            items: { type: "string" },
                          },
                          accepted_devices: {
                            type: "array",
                            items: { type: "string" },
                          },
                          any_provider_allowed: { type: "boolean" },
                          any_device_allowed: { type: "boolean" },
                          created_at: { type: "string" },
                          login_successful: { type: "boolean" },
                          status: {
                            type: "string",
                            enum: ["pending", "failed", "authorized"],
                          },
                        },
                        required: [
                          "connect_webview_id",
                          "url",
                          "workspace_id",
                          "device_selection_mode",
                          "accepted_providers",
                          "accepted_devices",
                          "any_provider_allowed",
                          "any_device_allowed",
                          "created_at",
                          "login_successful",
                          "status",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["connect_webviews", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ["/connect_webviews"],
        operationId: "connectWebviewsListPost",
      },
      get: {
        summary: "/connect_webviews/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    connect_webviews: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          connect_webview_id: {
                            type: "string",
                            format: "uuid",
                          },
                          connected_account_id: {
                            type: "string",
                            format: "uuid",
                          },
                          url: { type: "string", format: "uri" },
                          workspace_id: { type: "string", format: "uuid" },
                          device_selection_mode: {
                            type: "string",
                            enum: ["none", "single", "multiple"],
                          },
                          accepted_providers: {
                            type: "array",
                            items: { type: "string" },
                          },
                          accepted_devices: {
                            type: "array",
                            items: { type: "string" },
                          },
                          any_provider_allowed: { type: "boolean" },
                          any_device_allowed: { type: "boolean" },
                          created_at: { type: "string" },
                          login_successful: { type: "boolean" },
                          status: {
                            type: "string",
                            enum: ["pending", "failed", "authorized"],
                          },
                        },
                        required: [
                          "connect_webview_id",
                          "url",
                          "workspace_id",
                          "device_selection_mode",
                          "accepted_providers",
                          "accepted_devices",
                          "any_provider_allowed",
                          "any_device_allowed",
                          "created_at",
                          "login_successful",
                          "status",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["connect_webviews", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ["/connect_webviews"],
        operationId: "connectWebviewsListGet",
      },
    },
    "/connect_webviews/view": {
      get: {
        summary: "/connect_webviews/view",
        responses: {
          200: { description: "OK" },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        parameters: [
          {
            name: "connect_webview_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "auth_token",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
        ],
        tags: ["/connect_webviews"],
        operationId: "connectWebviewsViewGet",
      },
    },
    "/devices/delete": {
      post: {
        summary: "/devices/delete",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { device_id: { type: "string", format: "uuid" } },
                required: ["device_id"],
              },
            },
          },
        },
        tags: ["/devices"],
        operationId: "devicesDeletePost",
      },
    },
    "/devices/get": {
      get: {
        summary: "/devices/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    device: {
                      type: "object",
                      properties: {
                        device_id: { type: "string" },
                        device_type: {
                          type: "string",
                          enum: [
                            "akuvox_lock",
                            "august_lock",
                            "brivo_access_point",
                            "butterflymx_panel",
                            "doorking_lock",
                            "genie_door",
                            "igloo_lock",
                            "linear_lock",
                            "lockly_lock",
                            "kwikset_lock",
                            "nuki_lock",
                            "salto_lock",
                            "schlage_lock",
                            "seam_relay",
                            "smartthings_lock",
                            "yale_lock",
                            "two_n_intercom",
                            "controlbyweb_device",
                            "ttlock_lock",
                            "igloohome_lock",
                            "hubitat_lock",
                            "noiseaware_activity_zone",
                            "minut_sensor",
                            "ecobee_thermostat",
                            "nest_thermostat",
                          ],
                        },
                        capabilities_supported: {
                          type: "array",
                          items: { type: "string" },
                        },
                        properties: {
                          allOf: [
                            {
                              type: "object",
                              properties: {
                                online: { type: "boolean" },
                                name: { type: "string" },
                                model: {
                                  type: "object",
                                  properties: {
                                    display_name: { type: "string" },
                                  },
                                  required: ["display_name"],
                                },
                              },
                              required: ["online", "name", "model"],
                            },
                            {
                              type: "object",
                              additionalProperties: { nullable: true },
                            },
                          ],
                        },
                        location: { nullable: true },
                        connected_account_id: { type: "string" },
                        workspace_id: { type: "string" },
                        errors: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              error_code: { type: "string" },
                              message: { type: "string" },
                            },
                            required: ["error_code", "message"],
                          },
                        },
                        warnings: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              warning_code: { type: "string" },
                              message: { type: "string" },
                            },
                            required: ["warning_code", "message"],
                          },
                        },
                        created_at: { type: "string" },
                        is_managed: { type: "boolean", enum: [true] },
                      },
                      required: [
                        "device_id",
                        "device_type",
                        "capabilities_supported",
                        "properties",
                        "connected_account_id",
                        "workspace_id",
                        "errors",
                        "warnings",
                        "created_at",
                        "is_managed",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["device", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        parameters: [
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
          },
          { name: "name", in: "query", schema: { type: "string" } },
        ],
        tags: ["/devices"],
        operationId: "devicesGetGet",
      },
    },
    "/devices/list": {
      post: {
        summary: "/devices/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    devices: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          device_id: { type: "string" },
                          device_type: {
                            type: "string",
                            enum: [
                              "akuvox_lock",
                              "august_lock",
                              "brivo_access_point",
                              "butterflymx_panel",
                              "doorking_lock",
                              "genie_door",
                              "igloo_lock",
                              "linear_lock",
                              "lockly_lock",
                              "kwikset_lock",
                              "nuki_lock",
                              "salto_lock",
                              "schlage_lock",
                              "seam_relay",
                              "smartthings_lock",
                              "yale_lock",
                              "two_n_intercom",
                              "controlbyweb_device",
                              "ttlock_lock",
                              "igloohome_lock",
                              "hubitat_lock",
                              "noiseaware_activity_zone",
                              "minut_sensor",
                              "ecobee_thermostat",
                              "nest_thermostat",
                            ],
                          },
                          capabilities_supported: {
                            type: "array",
                            items: { type: "string" },
                          },
                          properties: {
                            allOf: [
                              {
                                type: "object",
                                properties: {
                                  online: { type: "boolean" },
                                  name: { type: "string" },
                                  model: {
                                    type: "object",
                                    properties: {
                                      display_name: { type: "string" },
                                    },
                                    required: ["display_name"],
                                  },
                                },
                                required: ["online", "name", "model"],
                              },
                              {
                                type: "object",
                                additionalProperties: { nullable: true },
                              },
                            ],
                          },
                          location: { nullable: true },
                          connected_account_id: { type: "string" },
                          workspace_id: { type: "string" },
                          errors: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                error_code: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["error_code", "message"],
                            },
                          },
                          warnings: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                warning_code: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["warning_code", "message"],
                            },
                          },
                          created_at: { type: "string" },
                          is_managed: { type: "boolean", enum: [true] },
                        },
                        required: [
                          "device_id",
                          "device_type",
                          "capabilities_supported",
                          "properties",
                          "connected_account_id",
                          "workspace_id",
                          "errors",
                          "warnings",
                          "created_at",
                          "is_managed",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["devices", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  connected_account_id: { type: "string", format: "uuid" },
                  connected_account_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                    minItems: 1,
                  },
                  connect_webview_id: { type: "string", format: "uuid" },
                  device_type: {
                    type: "string",
                    enum: [
                      "akuvox_lock",
                      "august_lock",
                      "brivo_access_point",
                      "butterflymx_panel",
                      "doorking_lock",
                      "genie_door",
                      "igloo_lock",
                      "linear_lock",
                      "lockly_lock",
                      "kwikset_lock",
                      "nuki_lock",
                      "salto_lock",
                      "schlage_lock",
                      "seam_relay",
                      "smartthings_lock",
                      "yale_lock",
                      "two_n_intercom",
                      "controlbyweb_device",
                      "ttlock_lock",
                      "igloohome_lock",
                      "hubitat_lock",
                      "noiseaware_activity_zone",
                      "minut_sensor",
                      "ecobee_thermostat",
                      "nest_thermostat",
                    ],
                  },
                  device_types: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: [
                        "akuvox_lock",
                        "august_lock",
                        "brivo_access_point",
                        "butterflymx_panel",
                        "doorking_lock",
                        "genie_door",
                        "igloo_lock",
                        "linear_lock",
                        "lockly_lock",
                        "kwikset_lock",
                        "nuki_lock",
                        "salto_lock",
                        "schlage_lock",
                        "seam_relay",
                        "smartthings_lock",
                        "yale_lock",
                        "two_n_intercom",
                        "controlbyweb_device",
                        "ttlock_lock",
                        "igloohome_lock",
                        "hubitat_lock",
                        "noiseaware_activity_zone",
                        "minut_sensor",
                        "ecobee_thermostat",
                        "nest_thermostat",
                      ],
                    },
                  },
                  manufacturer: {
                    type: "string",
                    enum: [
                      "akuvox",
                      "august",
                      "brivo",
                      "butterflymx",
                      "doorking",
                      "genie",
                      "igloo",
                      "keywe",
                      "kwikset",
                      "linear",
                      "lockly",
                      "nuki",
                      "philia",
                      "salto",
                      "samsung",
                      "schlage",
                      "seam",
                      "unknown",
                      "yale",
                      "minut",
                      "two_n",
                      "ttlock",
                      "nest",
                      "igloohome",
                      "ecobee",
                      "hubitat",
                    ],
                  },
                  device_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                },
              },
            },
          },
        },
        tags: ["/devices"],
        operationId: "devicesListPost",
      },
    },
    "/devices/list_device_providers": {
      get: {
        summary: "/devices/list_device_providers",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    device_providers: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          device_provider_name: { type: "string" },
                          display_name: { type: "string" },
                          image_url: { type: "string" },
                          provider_categories: {
                            type: "array",
                            items: { type: "string", enum: ["stable"] },
                          },
                        },
                        required: [
                          "device_provider_name",
                          "display_name",
                          "image_url",
                          "provider_categories",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["device_providers", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        parameters: [
          {
            name: "provider_category",
            in: "query",
            schema: { type: "string", enum: ["stable"] },
          },
        ],
        tags: ["/devices"],
        operationId: "devicesListDeviceProvidersGet",
      },
    },
    "/devices/update": {
      patch: {
        summary: "/devices/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  properties: {
                    type: "object",
                    properties: { name: { type: "string", nullable: true } },
                  },
                  name: { type: "string", nullable: true },
                  location: { type: "object", properties: {} },
                  is_managed: { default: true, type: "boolean" },
                },
                required: ["device_id"],
              },
            },
          },
        },
        tags: ["/devices"],
        operationId: "devicesUpdatePatch",
      },
      post: {
        summary: "/devices/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  properties: {
                    type: "object",
                    properties: { name: { type: "string", nullable: true } },
                  },
                  name: { type: "string", nullable: true },
                  location: { type: "object", properties: {} },
                  is_managed: { default: true, type: "boolean" },
                },
                required: ["device_id"],
              },
            },
          },
        },
        tags: ["/devices"],
        operationId: "devicesUpdatePost",
      },
    },
    "/health/get_health": {
      get: {
        summary: "/health/get_health",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    msg: {
                      type: "string",
                      enum: ["I’m one with the Force. The Force is with me."],
                    },
                    last_service_evaluation_at: { type: "string" },
                    service_health_statuses: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          service: { type: "string" },
                          status: {
                            oneOf: [
                              { type: "string", enum: ["healthy"] },
                              { type: "string", enum: ["degraded"] },
                              { type: "string", enum: ["down"] },
                            ],
                          },
                          description: { type: "string" },
                        },
                        required: ["service", "status", "description"],
                      },
                    },
                  },
                  required: [
                    "ok",
                    "msg",
                    "last_service_evaluation_at",
                    "service_health_statuses",
                  ],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        tags: ["/health"],
        operationId: "healthGetHealthGet",
      },
    },
    "/health/get_service_health": {
      get: {
        summary: "/health/get_service_health",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    last_service_evaluation_at: { type: "string" },
                    service_health: {
                      type: "object",
                      properties: {
                        service: { type: "string" },
                        status: {
                          oneOf: [
                            { type: "string", enum: ["healthy"] },
                            { type: "string", enum: ["degraded"] },
                            { type: "string", enum: ["down"] },
                          ],
                        },
                        description: { type: "string" },
                      },
                      required: ["service", "status", "description"],
                    },
                  },
                  required: [
                    "ok",
                    "last_service_evaluation_at",
                    "service_health",
                  ],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        parameters: [
          {
            name: "service",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
        ],
        tags: ["/health"],
        operationId: "healthGetServiceHealthGet",
      },
    },
    "/health": {
      get: {
        summary: "/health",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    msg: {
                      type: "string",
                      enum: ["I’m one with the Force. The Force is with me."],
                    },
                    last_service_evaluation_at: { type: "string" },
                    service_health_statuses: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          service: { type: "string" },
                          status: {
                            oneOf: [
                              { type: "string", enum: ["healthy"] },
                              { type: "string", enum: ["degraded"] },
                              { type: "string", enum: ["down"] },
                            ],
                          },
                          description: { type: "string" },
                        },
                        required: ["service", "status", "description"],
                      },
                    },
                  },
                  required: [
                    "ok",
                    "msg",
                    "last_service_evaluation_at",
                    "service_health_statuses",
                  ],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        tags: ["/health"],
        operationId: "healthGet",
      },
    },
    "/events/get": {
      get: {
        summary: "/events/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    event: {
                      type: "object",
                      properties: {
                        event_id: { type: "string", format: "uuid" },
                        device_id: { type: "string", format: "uuid" },
                        event_type: { type: "string" },
                        workspace_id: { type: "string", format: "uuid" },
                        created_at: { type: "string", format: "date-time" },
                        occurred_at: { type: "string", format: "date-time" },
                      },
                      required: [
                        "event_id",
                        "event_type",
                        "workspace_id",
                        "created_at",
                        "occurred_at",
                      ],
                    },
                    message: { type: "string" },
                    ok: { type: "boolean" },
                  },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        parameters: [
          {
            name: "event_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
          },
          { name: "event_type", in: "query", schema: { type: "string" } },
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
          },
        ],
        tags: ["/events"],
        operationId: "eventsGetGet",
      },
    },
    "/events/list": {
      post: {
        summary: "/events/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    events: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          event_id: { type: "string", format: "uuid" },
                          device_id: { type: "string", format: "uuid" },
                          event_type: { type: "string" },
                          workspace_id: { type: "string", format: "uuid" },
                          created_at: { type: "string", format: "date-time" },
                          occurred_at: { type: "string", format: "date-time" },
                        },
                        required: [
                          "event_id",
                          "event_type",
                          "workspace_id",
                          "created_at",
                          "occurred_at",
                        ],
                      },
                    },
                    message: { type: "string" },
                    ok: { type: "boolean" },
                  },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  since: { type: "string" },
                  between: {
                    type: "array",
                    items: {
                      oneOf: [
                        { type: "string" },
                        { type: "string", format: "date-time" },
                      ],
                    },
                    minItems: 2,
                    maxItems: 2,
                  },
                  device_id: { type: "string", format: "uuid" },
                  device_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                  access_code_id: { type: "string", format: "uuid" },
                  access_code_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                  event_type: {
                    type: "string",
                    enum: [
                      "device.connected",
                      "device.unmanaged.connected",
                      "device.disconnected",
                      "device.unmanaged.disconnected",
                      "device.converted_to_unmanaged",
                      "device.unmanaged.converted_to_managed",
                      "device.removed",
                      "device.tampered",
                      "device.low_battery",
                      "device.battery_status_changed",
                      "access_code.created",
                      "access_code.changed",
                      "access_code.scheduled_on_device",
                      "access_code.set_on_device",
                      "access_code.removed_from_device",
                      "access_code.failed_to_set_on_device",
                      "access_code.delay_in_setting_on_device",
                      "access_code.failed_to_remove_from_device",
                      "access_code.delay_in_removing_from_device",
                      "access_code.unmanaged.converted_to_managed",
                      "access_code.unmanaged.failed_to_convert_to_managed",
                      "access_code.unmanaged.created",
                      "access_code.unmanaged.removed",
                      "lock.locked",
                      "lock.unlocked",
                      "connected_account.connected",
                      "connected_account.created",
                      "connected_account.disconnected",
                      "connected_account.completed_first_sync",
                      "noise_sensor.noise_threshold_triggered",
                      "access_code.backup_access_code_pulled",
                    ],
                  },
                  event_types: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: [
                        "device.connected",
                        "device.unmanaged.connected",
                        "device.disconnected",
                        "device.unmanaged.disconnected",
                        "device.converted_to_unmanaged",
                        "device.unmanaged.converted_to_managed",
                        "device.removed",
                        "device.tampered",
                        "device.low_battery",
                        "device.battery_status_changed",
                        "access_code.created",
                        "access_code.changed",
                        "access_code.scheduled_on_device",
                        "access_code.set_on_device",
                        "access_code.removed_from_device",
                        "access_code.failed_to_set_on_device",
                        "access_code.delay_in_setting_on_device",
                        "access_code.failed_to_remove_from_device",
                        "access_code.delay_in_removing_from_device",
                        "access_code.unmanaged.converted_to_managed",
                        "access_code.unmanaged.failed_to_convert_to_managed",
                        "access_code.unmanaged.created",
                        "access_code.unmanaged.removed",
                        "lock.locked",
                        "lock.unlocked",
                        "connected_account.connected",
                        "connected_account.created",
                        "connected_account.disconnected",
                        "connected_account.completed_first_sync",
                        "noise_sensor.noise_threshold_triggered",
                        "access_code.backup_access_code_pulled",
                      ],
                    },
                  },
                  connected_account_id: { type: "string", format: "uuid" },
                },
              },
            },
          },
        },
        tags: ["/events"],
        operationId: "eventsListPost",
      },
    },
    "/locks/get": {
      post: {
        summary: "/locks/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    lock: { nullable: true },
                    device: { nullable: true },
                    ok: { type: "boolean" },
                  },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  name: { type: "string" },
                },
              },
            },
          },
        },
        tags: ["/locks"],
        operationId: "locksGetPost",
      },
    },
    "/locks/list": {
      post: {
        summary: "/locks/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    locks: { nullable: true },
                    devices: { nullable: true },
                    ok: { type: "boolean" },
                  },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  connected_account_id: { type: "string", format: "uuid" },
                  connected_account_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                    minItems: 1,
                  },
                  connect_webview_id: { type: "string", format: "uuid" },
                  device_type: {
                    type: "string",
                    enum: [
                      "akuvox_lock",
                      "august_lock",
                      "brivo_access_point",
                      "butterflymx_panel",
                      "doorking_lock",
                      "genie_door",
                      "igloo_lock",
                      "linear_lock",
                      "lockly_lock",
                      "kwikset_lock",
                      "nuki_lock",
                      "salto_lock",
                      "schlage_lock",
                      "seam_relay",
                      "smartthings_lock",
                      "yale_lock",
                      "two_n_intercom",
                      "controlbyweb_device",
                      "ttlock_lock",
                      "igloohome_lock",
                      "hubitat_lock",
                      "noiseaware_activity_zone",
                      "minut_sensor",
                      "ecobee_thermostat",
                      "nest_thermostat",
                    ],
                  },
                  device_types: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: [
                        "akuvox_lock",
                        "august_lock",
                        "brivo_access_point",
                        "butterflymx_panel",
                        "doorking_lock",
                        "genie_door",
                        "igloo_lock",
                        "linear_lock",
                        "lockly_lock",
                        "kwikset_lock",
                        "nuki_lock",
                        "salto_lock",
                        "schlage_lock",
                        "seam_relay",
                        "smartthings_lock",
                        "yale_lock",
                        "two_n_intercom",
                        "controlbyweb_device",
                        "ttlock_lock",
                        "igloohome_lock",
                        "hubitat_lock",
                        "noiseaware_activity_zone",
                        "minut_sensor",
                        "ecobee_thermostat",
                        "nest_thermostat",
                      ],
                    },
                  },
                  manufacturer: {
                    type: "string",
                    enum: [
                      "akuvox",
                      "august",
                      "brivo",
                      "butterflymx",
                      "doorking",
                      "genie",
                      "igloo",
                      "keywe",
                      "kwikset",
                      "linear",
                      "lockly",
                      "nuki",
                      "philia",
                      "salto",
                      "samsung",
                      "schlage",
                      "seam",
                      "unknown",
                      "yale",
                      "minut",
                      "two_n",
                      "ttlock",
                      "nest",
                      "igloohome",
                      "ecobee",
                      "hubitat",
                    ],
                  },
                  device_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                },
              },
            },
          },
        },
        tags: ["/locks"],
        operationId: "locksListPost",
      },
    },
    "/locks/lock_door": {
      post: {
        summary: "/locks/lock_door",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  sync: { default: false, type: "boolean" },
                },
                required: ["device_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
        ],
        tags: ["/locks"],
        operationId: "locksLockDoorPost",
      },
    },
    "/locks/unlock_door": {
      post: {
        summary: "/locks/unlock_door",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  sync: { default: false, type: "boolean" },
                },
                required: ["device_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
        ],
        tags: ["/locks"],
        operationId: "locksUnlockDoorPost",
      },
    },
    "/thermostats/get": {
      post: {
        summary: "/thermostats/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    thermostat: {
                      type: "object",
                      properties: {
                        device_id: { type: "string" },
                        device_type: {
                          type: "string",
                          enum: [
                            "akuvox_lock",
                            "august_lock",
                            "brivo_access_point",
                            "butterflymx_panel",
                            "doorking_lock",
                            "genie_door",
                            "igloo_lock",
                            "linear_lock",
                            "lockly_lock",
                            "kwikset_lock",
                            "nuki_lock",
                            "salto_lock",
                            "schlage_lock",
                            "seam_relay",
                            "smartthings_lock",
                            "yale_lock",
                            "two_n_intercom",
                            "controlbyweb_device",
                            "ttlock_lock",
                            "igloohome_lock",
                            "hubitat_lock",
                            "noiseaware_activity_zone",
                            "minut_sensor",
                            "ecobee_thermostat",
                            "nest_thermostat",
                          ],
                        },
                        capabilities_supported: {
                          type: "array",
                          items: { type: "string" },
                        },
                        properties: {
                          allOf: [
                            {
                              type: "object",
                              properties: {
                                online: { type: "boolean" },
                                name: { type: "string" },
                                model: {
                                  type: "object",
                                  properties: {
                                    display_name: { type: "string" },
                                  },
                                  required: ["display_name"],
                                },
                              },
                              required: ["online", "name", "model"],
                            },
                            {
                              type: "object",
                              additionalProperties: { nullable: true },
                            },
                          ],
                        },
                        location: { nullable: true },
                        connected_account_id: { type: "string" },
                        workspace_id: { type: "string" },
                        errors: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              error_code: { type: "string" },
                              message: { type: "string" },
                            },
                            required: ["error_code", "message"],
                          },
                        },
                        warnings: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              warning_code: { type: "string" },
                              message: { type: "string" },
                            },
                            required: ["warning_code", "message"],
                          },
                        },
                        created_at: { type: "string" },
                        is_managed: { type: "boolean", enum: [true] },
                      },
                      required: [
                        "device_id",
                        "device_type",
                        "capabilities_supported",
                        "properties",
                        "connected_account_id",
                        "workspace_id",
                        "errors",
                        "warnings",
                        "created_at",
                        "is_managed",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["thermostat", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  name: { type: "string" },
                },
              },
            },
          },
        },
        tags: [],
        operationId: "thermostatsGetPost",
      },
    },
    "/thermostats/list": {
      post: {
        summary: "/thermostats/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    thermostats: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          device_id: { type: "string" },
                          device_type: {
                            type: "string",
                            enum: [
                              "akuvox_lock",
                              "august_lock",
                              "brivo_access_point",
                              "butterflymx_panel",
                              "doorking_lock",
                              "genie_door",
                              "igloo_lock",
                              "linear_lock",
                              "lockly_lock",
                              "kwikset_lock",
                              "nuki_lock",
                              "salto_lock",
                              "schlage_lock",
                              "seam_relay",
                              "smartthings_lock",
                              "yale_lock",
                              "two_n_intercom",
                              "controlbyweb_device",
                              "ttlock_lock",
                              "igloohome_lock",
                              "hubitat_lock",
                              "noiseaware_activity_zone",
                              "minut_sensor",
                              "ecobee_thermostat",
                              "nest_thermostat",
                            ],
                          },
                          capabilities_supported: {
                            type: "array",
                            items: { type: "string" },
                          },
                          properties: {
                            allOf: [
                              {
                                type: "object",
                                properties: {
                                  online: { type: "boolean" },
                                  name: { type: "string" },
                                  model: {
                                    type: "object",
                                    properties: {
                                      display_name: { type: "string" },
                                    },
                                    required: ["display_name"],
                                  },
                                },
                                required: ["online", "name", "model"],
                              },
                              {
                                type: "object",
                                additionalProperties: { nullable: true },
                              },
                            ],
                          },
                          location: { nullable: true },
                          connected_account_id: { type: "string" },
                          workspace_id: { type: "string" },
                          errors: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                error_code: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["error_code", "message"],
                            },
                          },
                          warnings: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                warning_code: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["warning_code", "message"],
                            },
                          },
                          created_at: { type: "string" },
                          is_managed: { type: "boolean", enum: [true] },
                        },
                        required: [
                          "device_id",
                          "device_type",
                          "capabilities_supported",
                          "properties",
                          "connected_account_id",
                          "workspace_id",
                          "errors",
                          "warnings",
                          "created_at",
                          "is_managed",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["thermostats", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  connected_account_id: { type: "string", format: "uuid" },
                  connected_account_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                    minItems: 1,
                  },
                  connect_webview_id: { type: "string", format: "uuid" },
                  device_type: {
                    type: "string",
                    enum: [
                      "akuvox_lock",
                      "august_lock",
                      "brivo_access_point",
                      "butterflymx_panel",
                      "doorking_lock",
                      "genie_door",
                      "igloo_lock",
                      "linear_lock",
                      "lockly_lock",
                      "kwikset_lock",
                      "nuki_lock",
                      "salto_lock",
                      "schlage_lock",
                      "seam_relay",
                      "smartthings_lock",
                      "yale_lock",
                      "two_n_intercom",
                      "controlbyweb_device",
                      "ttlock_lock",
                      "igloohome_lock",
                      "hubitat_lock",
                      "noiseaware_activity_zone",
                      "minut_sensor",
                      "ecobee_thermostat",
                      "nest_thermostat",
                    ],
                  },
                  device_types: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: [
                        "akuvox_lock",
                        "august_lock",
                        "brivo_access_point",
                        "butterflymx_panel",
                        "doorking_lock",
                        "genie_door",
                        "igloo_lock",
                        "linear_lock",
                        "lockly_lock",
                        "kwikset_lock",
                        "nuki_lock",
                        "salto_lock",
                        "schlage_lock",
                        "seam_relay",
                        "smartthings_lock",
                        "yale_lock",
                        "two_n_intercom",
                        "controlbyweb_device",
                        "ttlock_lock",
                        "igloohome_lock",
                        "hubitat_lock",
                        "noiseaware_activity_zone",
                        "minut_sensor",
                        "ecobee_thermostat",
                        "nest_thermostat",
                      ],
                    },
                  },
                  manufacturer: {
                    type: "string",
                    enum: [
                      "akuvox",
                      "august",
                      "brivo",
                      "butterflymx",
                      "doorking",
                      "genie",
                      "igloo",
                      "keywe",
                      "kwikset",
                      "linear",
                      "lockly",
                      "nuki",
                      "philia",
                      "salto",
                      "samsung",
                      "schlage",
                      "seam",
                      "unknown",
                      "yale",
                      "minut",
                      "two_n",
                      "ttlock",
                      "nest",
                      "igloohome",
                      "ecobee",
                      "hubitat",
                    ],
                  },
                  device_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                },
              },
            },
          },
        },
        tags: [],
        operationId: "thermostatsListPost",
      },
    },
    "/thermostats/set_cooling_set_point": {
      post: {
        summary: "/thermostats/set_cooling_set_point",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  cooling_set_point_celsius: { type: "number" },
                  cooling_set_point_fahrenheit: { type: "number" },
                  sync: { default: false, type: "boolean" },
                },
                required: ["device_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "cooling_set_point_celsius",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "cooling_set_point_fahrenheit",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
        ],
        tags: [],
        operationId: "thermostatsSetCoolingSetPointPost",
      },
    },
    "/thermostats/set_mode": {
      post: {
        summary: "/thermostats/set_mode",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  automatic_heating_enabled: { type: "boolean" },
                  automatic_cooling_enabled: { type: "boolean" },
                  hvac_mode_setting: {
                    type: "string",
                    enum: ["off", "heat", "cool", "heatcool"],
                  },
                  sync: { default: false, type: "boolean" },
                },
                required: ["device_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "automatic_heating_enabled",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "automatic_cooling_enabled",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "hvac_mode_setting",
            in: "query",
            schema: {
              type: "string",
              enum: ["off", "heat", "cool", "heatcool"],
            },
            required: false,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
        ],
        tags: [],
        operationId: "thermostatsSetModePost",
      },
    },
    "/thermostats/update": {
      post: {
        summary: "/thermostats/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  default_climate_setting: {
                    type: "object",
                    properties: {
                      automatic_heating_enabled: { type: "boolean" },
                      automatic_cooling_enabled: { type: "boolean" },
                      hvac_mode_setting: {
                        type: "string",
                        enum: ["off", "heat", "cool", "heatcool"],
                      },
                      cooling_set_point_celsius: { type: "number" },
                      heating_set_point_celsius: { type: "number" },
                      cooling_set_point_fahrenheit: { type: "number" },
                      heating_set_point_fahrenheit: { type: "number" },
                      manual_override_allowed: { type: "boolean" },
                    },
                  },
                },
                required: ["device_id", "default_climate_setting"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "default_climate_setting",
            in: "query",
            schema: {
              type: "object",
              properties: {
                automatic_heating_enabled: { type: "boolean" },
                automatic_cooling_enabled: { type: "boolean" },
                hvac_mode_setting: {
                  type: "string",
                  enum: ["off", "heat", "cool", "heatcool"],
                },
                cooling_set_point_celsius: { type: "number" },
                heating_set_point_celsius: { type: "number" },
                cooling_set_point_fahrenheit: { type: "number" },
                heating_set_point_fahrenheit: { type: "number" },
                manual_override_allowed: { type: "boolean" },
              },
            },
            required: true,
          },
        ],
        tags: [],
        operationId: "thermostatsUpdatePost",
      },
    },
    "/webhooks/create": {
      post: {
        summary: "/webhooks/create",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    webhook: {
                      type: "object",
                      properties: {
                        webhook_id: { type: "string" },
                        url: { type: "string" },
                        event_types: {
                          type: "array",
                          items: { type: "string" },
                        },
                        secret: { type: "string" },
                      },
                      required: ["webhook_id", "url"],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["webhook", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  url: { type: "string", format: "uri" },
                  event_types: {
                    default: ["*"],
                    type: "array",
                    items: { type: "string" },
                  },
                },
                required: ["url"],
              },
            },
          },
        },
        parameters: [
          {
            name: "url",
            in: "query",
            schema: { type: "string", format: "uri" },
            required: true,
          },
          {
            name: "event_types",
            in: "query",
            schema: {
              default: ["*"],
              type: "array",
              items: { type: "string" },
            },
            required: false,
          },
        ],
        tags: ["/webhooks"],
        operationId: "webhooksCreatePost",
      },
    },
    "/webhooks/delete": {
      post: {
        summary: "/webhooks/delete",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { webhook_id: { type: "string" } },
                required: ["webhook_id"],
              },
            },
          },
        },
        tags: ["/webhooks"],
        operationId: "webhooksDeletePost",
      },
    },
    "/webhooks/get": {
      get: {
        summary: "/webhooks/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    webhook: {
                      type: "object",
                      properties: {
                        webhook_id: { type: "string" },
                        url: { type: "string" },
                        event_types: {
                          type: "array",
                          items: { type: "string" },
                        },
                        secret: { type: "string" },
                      },
                      required: ["webhook_id", "url"],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["webhook", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        parameters: [
          {
            name: "webhook_id",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
        ],
        tags: ["/webhooks"],
        operationId: "webhooksGetGet",
      },
    },
    "/webhooks/list": {
      get: {
        summary: "/webhooks/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    webhooks: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          webhook_id: { type: "string" },
                          url: { type: "string" },
                          event_types: {
                            type: "array",
                            items: { type: "string" },
                          },
                          secret: { type: "string" },
                        },
                        required: ["webhook_id", "url"],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["webhooks", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ["/webhooks"],
        operationId: "webhooksListGet",
      },
    },
    "/workspaces/get": {
      get: {
        summary: "/workspaces/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    workspace: {
                      type: "object",
                      properties: {
                        workspace_id: { type: "string", format: "uuid" },
                        name: { type: "string" },
                        is_sandbox: { type: "boolean" },
                        connect_partner_name: {
                          type: "string",
                          nullable: true,
                        },
                      },
                      required: [
                        "workspace_id",
                        "name",
                        "is_sandbox",
                        "connect_partner_name",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ["/workspaces"],
        operationId: "workspacesGetGet",
      },
    },
    "/workspaces/list": {
      get: {
        summary: "/workspaces/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    workspaces: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          workspace_id: { type: "string", format: "uuid" },
                          name: { type: "string" },
                          is_sandbox: { type: "boolean" },
                        },
                        required: ["workspace_id", "name", "is_sandbox"],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["workspaces", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ["/workspaces"],
        operationId: "workspacesListGet",
      },
    },
    "/workspaces/reset_sandbox": {
      post: {
        summary: "/workspaces/reset_sandbox",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    ok: { type: "boolean" },
                  },
                  required: ["message", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        tags: ["/workspaces"],
        operationId: "workspacesResetSandboxPost",
      },
    },
    "/access_codes/simulate/create_unmanaged_access_code": {
      post: {
        summary: "/access_codes/simulate/create_unmanaged_access_code",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    access_code: {
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            access_code_id: { type: "string", format: "uuid" },
                            code: { type: "string", nullable: true },
                            status: { type: "string", enum: ["set"] },
                            created_at: {
                              oneOf: [
                                { type: "string" },
                                { type: "string", format: "date-time" },
                              ],
                            },
                            is_managed: { type: "boolean", enum: [false] },
                            type: { type: "string", enum: ["ongoing"] },
                            starts_at: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            ends_at: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "access_code_id",
                            "code",
                            "status",
                            "created_at",
                            "is_managed",
                            "type",
                            "starts_at",
                            "ends_at",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            access_code_id: { type: "string", format: "uuid" },
                            code: { type: "string", nullable: true },
                            status: { type: "string", enum: ["set"] },
                            created_at: {
                              oneOf: [
                                { type: "string" },
                                { type: "string", format: "date-time" },
                              ],
                            },
                            is_managed: { type: "boolean", enum: [false] },
                            type: { type: "string", enum: ["time_bound"] },
                            starts_at: { type: "string", nullable: true },
                            ends_at: { type: "string", nullable: true },
                          },
                          required: [
                            "access_code_id",
                            "code",
                            "status",
                            "created_at",
                            "is_managed",
                            "type",
                            "starts_at",
                            "ends_at",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["access_code", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  name: { type: "string" },
                  code: {
                    type: "string",
                    minLength: 4,
                    maxLength: 8,
                    pattern: "^\\d+$",
                  },
                },
                required: ["device_id", "name", "code"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
          {
            name: "code",
            in: "query",
            schema: {
              type: "string",
              minLength: 4,
              maxLength: 8,
              pattern: "^\\d+$",
            },
            required: true,
          },
        ],
        tags: ["/access_codes"],
        operationId: "accessCodesSimulateCreateUnmanagedAccessCodePost",
      },
    },
    "/access_codes/unmanaged/convert_to_managed": {
      patch: {
        summary: "/access_codes/unmanaged/convert_to_managed",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  access_code_id: { type: "string", format: "uuid" },
                  force: { type: "boolean" },
                  sync: { default: false, type: "boolean" },
                },
                required: ["access_code_id"],
              },
            },
          },
        },
        tags: ["/access_codes"],
        operationId: "accessCodesUnmanagedConvertToManagedPatch",
      },
      post: {
        summary: "/access_codes/unmanaged/convert_to_managed",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  access_code_id: { type: "string", format: "uuid" },
                  force: { type: "boolean" },
                  sync: { default: false, type: "boolean" },
                },
                required: ["access_code_id"],
              },
            },
          },
        },
        tags: ["/access_codes"],
        operationId: "accessCodesUnmanagedConvertToManagedPost",
      },
    },
    "/access_codes/unmanaged/delete": {
      post: {
        summary: "/access_codes/unmanaged/delete",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  access_code_id: { type: "string", format: "uuid" },
                  sync: { default: false, type: "boolean" },
                },
                required: ["access_code_id"],
              },
            },
          },
        },
        tags: ["/access_codes"],
        operationId: "accessCodesUnmanagedDeletePost",
      },
    },
    "/access_codes/unmanaged/get": {
      post: {
        summary: "/access_codes/unmanaged/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    access_code: {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                          enum: ["time_bound", "ongoing"],
                        },
                        access_code_id: { type: "string", format: "uuid" },
                        device_id: { type: "string", format: "uuid" },
                        name: { type: "string", nullable: true },
                        code: { type: "string", nullable: true },
                        created_at: { type: "string" },
                        errors: { nullable: true },
                        warnings: { nullable: true },
                        is_managed: { type: "boolean", enum: [false] },
                        starts_at: { type: "string", nullable: true },
                        ends_at: { type: "string", nullable: true },
                        status: { type: "string", enum: ["set"] },
                      },
                      required: [
                        "type",
                        "access_code_id",
                        "device_id",
                        "name",
                        "code",
                        "created_at",
                        "is_managed",
                        "starts_at",
                        "ends_at",
                        "status",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["access_code", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  access_code_id: { type: "string", format: "uuid" },
                  code: { type: "string" },
                },
              },
            },
          },
        },
        tags: ["/access_codes"],
        operationId: "accessCodesUnmanagedGetPost",
      },
    },
    "/access_codes/unmanaged/list": {
      post: {
        summary: "/access_codes/unmanaged/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    access_codes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          type: {
                            type: "string",
                            enum: ["time_bound", "ongoing"],
                          },
                          access_code_id: { type: "string", format: "uuid" },
                          device_id: { type: "string", format: "uuid" },
                          name: { type: "string", nullable: true },
                          code: { type: "string", nullable: true },
                          created_at: { type: "string" },
                          errors: { nullable: true },
                          warnings: { nullable: true },
                          is_managed: { type: "boolean", enum: [false] },
                          starts_at: { type: "string", nullable: true },
                          ends_at: { type: "string", nullable: true },
                          status: { type: "string", enum: ["set"] },
                        },
                        required: [
                          "type",
                          "access_code_id",
                          "device_id",
                          "name",
                          "code",
                          "created_at",
                          "is_managed",
                          "starts_at",
                          "ends_at",
                          "status",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["access_codes", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { device_id: { type: "string", format: "uuid" } },
                required: ["device_id"],
              },
            },
          },
        },
        tags: ["/access_codes"],
        operationId: "accessCodesUnmanagedListPost",
      },
    },
    "/access_codes/unmanaged/update": {
      patch: {
        summary: "/access_codes/unmanaged/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  access_code_id: { type: "string", format: "uuid" },
                  is_managed: { type: "boolean" },
                  force: { type: "boolean" },
                },
                required: ["access_code_id", "is_managed"],
              },
            },
          },
        },
        tags: ["/access_codes"],
        operationId: "accessCodesUnmanagedUpdatePatch",
      },
      post: {
        summary: "/access_codes/unmanaged/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  access_code_id: { type: "string", format: "uuid" },
                  is_managed: { type: "boolean" },
                  force: { type: "boolean" },
                },
                required: ["access_code_id", "is_managed"],
              },
            },
          },
        },
        tags: ["/access_codes"],
        operationId: "accessCodesUnmanagedUpdatePost",
      },
    },
    "/devices/unmanaged/list": {
      post: {
        summary: "/devices/unmanaged/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    devices: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          device_id: { type: "string" },
                          device_type: {
                            type: "string",
                            enum: [
                              "akuvox_lock",
                              "august_lock",
                              "brivo_access_point",
                              "butterflymx_panel",
                              "doorking_lock",
                              "genie_door",
                              "igloo_lock",
                              "linear_lock",
                              "lockly_lock",
                              "kwikset_lock",
                              "nuki_lock",
                              "salto_lock",
                              "schlage_lock",
                              "seam_relay",
                              "smartthings_lock",
                              "yale_lock",
                              "two_n_intercom",
                              "controlbyweb_device",
                              "ttlock_lock",
                              "igloohome_lock",
                              "hubitat_lock",
                              "noiseaware_activity_zone",
                              "minut_sensor",
                              "ecobee_thermostat",
                              "nest_thermostat",
                            ],
                          },
                          connected_account_id: { type: "string" },
                          capabilities_supported: {
                            type: "array",
                            items: { type: "string" },
                          },
                          workspace_id: { type: "string" },
                          errors: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                error_code: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["error_code", "message"],
                            },
                          },
                          warnings: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                warning_code: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["warning_code", "message"],
                            },
                          },
                          created_at: { type: "string" },
                          is_managed: { type: "boolean", enum: [false] },
                          properties: {
                            type: "object",
                            properties: {
                              name: { type: "string" },
                              online: { type: "boolean" },
                              manufacturer: { type: "string" },
                              image_url: { type: "string" },
                              image_alt_text: { type: "string" },
                              model: {
                                type: "object",
                                properties: {
                                  display_name: { type: "string" },
                                },
                                required: ["display_name"],
                              },
                            },
                            required: ["name", "online", "model"],
                          },
                        },
                        required: [
                          "device_id",
                          "device_type",
                          "connected_account_id",
                          "capabilities_supported",
                          "workspace_id",
                          "errors",
                          "warnings",
                          "created_at",
                          "is_managed",
                          "properties",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["devices", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  connected_account_id: { type: "string", format: "uuid" },
                  connected_account_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                    minItems: 1,
                  },
                  connect_webview_id: { type: "string", format: "uuid" },
                  device_type: {
                    type: "string",
                    enum: [
                      "akuvox_lock",
                      "august_lock",
                      "brivo_access_point",
                      "butterflymx_panel",
                      "doorking_lock",
                      "genie_door",
                      "igloo_lock",
                      "linear_lock",
                      "lockly_lock",
                      "kwikset_lock",
                      "nuki_lock",
                      "salto_lock",
                      "schlage_lock",
                      "seam_relay",
                      "smartthings_lock",
                      "yale_lock",
                      "two_n_intercom",
                      "controlbyweb_device",
                      "ttlock_lock",
                      "igloohome_lock",
                      "hubitat_lock",
                      "noiseaware_activity_zone",
                      "minut_sensor",
                      "ecobee_thermostat",
                      "nest_thermostat",
                    ],
                  },
                  device_types: {
                    type: "array",
                    items: {
                      type: "string",
                      enum: [
                        "akuvox_lock",
                        "august_lock",
                        "brivo_access_point",
                        "butterflymx_panel",
                        "doorking_lock",
                        "genie_door",
                        "igloo_lock",
                        "linear_lock",
                        "lockly_lock",
                        "kwikset_lock",
                        "nuki_lock",
                        "salto_lock",
                        "schlage_lock",
                        "seam_relay",
                        "smartthings_lock",
                        "yale_lock",
                        "two_n_intercom",
                        "controlbyweb_device",
                        "ttlock_lock",
                        "igloohome_lock",
                        "hubitat_lock",
                        "noiseaware_activity_zone",
                        "minut_sensor",
                        "ecobee_thermostat",
                        "nest_thermostat",
                      ],
                    },
                  },
                  manufacturer: {
                    type: "string",
                    enum: [
                      "akuvox",
                      "august",
                      "brivo",
                      "butterflymx",
                      "doorking",
                      "genie",
                      "igloo",
                      "keywe",
                      "kwikset",
                      "linear",
                      "lockly",
                      "nuki",
                      "philia",
                      "salto",
                      "samsung",
                      "schlage",
                      "seam",
                      "unknown",
                      "yale",
                      "minut",
                      "two_n",
                      "ttlock",
                      "nest",
                      "igloohome",
                      "ecobee",
                      "hubitat",
                    ],
                  },
                  device_ids: {
                    type: "array",
                    items: { type: "string", format: "uuid" },
                  },
                },
              },
            },
          },
        },
        tags: ["/devices"],
        operationId: "devicesUnmanagedListPost",
      },
    },
    "/devices/unmanaged/update": {
      patch: {
        summary: "/devices/unmanaged/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  is_managed: { type: "boolean", enum: [true] },
                },
                required: ["device_id", "is_managed"],
              },
            },
          },
        },
        tags: ["/devices"],
        operationId: "devicesUnmanagedUpdatePatch",
      },
      post: {
        summary: "/devices/unmanaged/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  is_managed: { type: "boolean", enum: [true] },
                },
                required: ["device_id", "is_managed"],
              },
            },
          },
        },
        tags: ["/devices"],
        operationId: "devicesUnmanagedUpdatePost",
      },
    },
    "/health/service/[service_name]": {
      get: {
        summary: "/health/service/[service_name]",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    last_service_evaluation_at: { type: "string" },
                    service_health: {
                      type: "object",
                      properties: {
                        service: { type: "string" },
                        status: {
                          oneOf: [
                            { type: "string", enum: ["healthy"] },
                            { type: "string", enum: ["degraded"] },
                            { type: "string", enum: ["down"] },
                          ],
                        },
                        description: { type: "string" },
                      },
                      required: ["service", "status", "description"],
                    },
                  },
                  required: [
                    "ok",
                    "last_service_evaluation_at",
                    "service_health",
                  ],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        parameters: [
          {
            name: "service_name",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
        ],
        tags: ["/health"],
        operationId: "healthServiceByServiceNameGet",
      },
    },
    "/noise_sensors/noise_thresholds/create": {
      post: {
        summary: "/noise_sensors/noise_thresholds/create",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  device_id: { type: "string", format: "uuid" },
                  sync: { default: false, type: "boolean" },
                  name: { type: "string" },
                  starts_daily_at: { type: "string" },
                  ends_daily_at: { type: "string" },
                  noise_threshold_decibels: { type: "number" },
                  noise_threshold_nrs: { type: "number" },
                },
                required: ["device_id", "starts_daily_at", "ends_daily_at"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "starts_daily_at",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
          {
            name: "ends_daily_at",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
          {
            name: "noise_threshold_decibels",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "noise_threshold_nrs",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
        ],
        tags: ["/noise_sensors"],
        operationId: "noiseSensorsNoiseThresholdsCreatePost",
      },
    },
    "/noise_sensors/noise_thresholds/delete": {
      post: {
        summary: "/noise_sensors/noise_thresholds/delete",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  noise_threshold_id: { type: "string", format: "uuid" },
                  device_id: { type: "string", format: "uuid" },
                  sync: { default: false, type: "boolean" },
                },
                required: ["noise_threshold_id", "device_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "noise_threshold_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
        ],
        tags: ["/noise_sensors"],
        operationId: "noiseSensorsNoiseThresholdsDeletePost",
      },
    },
    "/noise_sensors/noise_thresholds/get": {
      post: {
        summary: "/noise_sensors/noise_thresholds/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    noise_threshold: {
                      type: "object",
                      properties: {
                        noise_threshold_id: { type: "string", format: "uuid" },
                        device_id: { type: "string", format: "uuid" },
                        name: { type: "string" },
                        noise_threshold_nrs: { type: "number" },
                        starts_daily_at: { type: "string" },
                        ends_daily_at: { type: "string" },
                        noise_threshold_decibels: { type: "number" },
                      },
                      required: [
                        "noise_threshold_id",
                        "device_id",
                        "name",
                        "starts_daily_at",
                        "ends_daily_at",
                        "noise_threshold_decibels",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["noise_threshold", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  noise_threshold_id: { type: "string", format: "uuid" },
                },
                required: ["noise_threshold_id"],
              },
            },
          },
        },
        tags: ["/noise_sensors"],
        operationId: "noiseSensorsNoiseThresholdsGetPost",
      },
    },
    "/noise_sensors/noise_thresholds/list": {
      post: {
        summary: "/noise_sensors/noise_thresholds/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    noise_thresholds: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          noise_threshold_id: {
                            type: "string",
                            format: "uuid",
                          },
                          device_id: { type: "string", format: "uuid" },
                          name: { type: "string" },
                          noise_threshold_nrs: { type: "number" },
                          starts_daily_at: { type: "string" },
                          ends_daily_at: { type: "string" },
                          noise_threshold_decibels: { type: "number" },
                        },
                        required: [
                          "noise_threshold_id",
                          "device_id",
                          "name",
                          "starts_daily_at",
                          "ends_daily_at",
                          "noise_threshold_decibels",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["noise_thresholds", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { device_id: { type: "string", format: "uuid" } },
                required: ["device_id"],
              },
            },
          },
        },
        tags: ["/noise_sensors"],
        operationId: "noiseSensorsNoiseThresholdsListPost",
      },
    },
    "/noise_sensors/noise_thresholds/update": {
      post: {
        summary: "/noise_sensors/noise_thresholds/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  noise_threshold_id: { type: "string", format: "uuid" },
                  device_id: { type: "string", format: "uuid" },
                  sync: { default: false, type: "boolean" },
                  name: { type: "string" },
                  starts_daily_at: { type: "string" },
                  ends_daily_at: { type: "string" },
                  noise_threshold_decibels: { type: "number" },
                  noise_threshold_nrs: { type: "number" },
                },
                required: ["noise_threshold_id", "device_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "noise_threshold_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "starts_daily_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "ends_daily_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "noise_threshold_decibels",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "noise_threshold_nrs",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
        ],
        tags: ["/noise_sensors"],
        operationId: "noiseSensorsNoiseThresholdsUpdatePost",
      },
      put: {
        summary: "/noise_sensors/noise_thresholds/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    action_attempt: {
                      discriminator: { propertyName: "status" },
                      oneOf: [
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["success"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: { nullable: true },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["pending"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                        {
                          type: "object",
                          properties: {
                            status: { type: "string", enum: ["error"] },
                            action_type: { type: "string" },
                            action_attempt_id: {
                              type: "string",
                              format: "uuid",
                            },
                            result: {
                              type: "string",
                              format: "null",
                              nullable: true,
                            },
                            error: {
                              type: "object",
                              properties: {
                                type: { type: "string" },
                                message: { type: "string" },
                              },
                              required: ["type", "message"],
                            },
                          },
                          required: [
                            "status",
                            "action_type",
                            "action_attempt_id",
                            "result",
                            "error",
                          ],
                        },
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["action_attempt", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  noise_threshold_id: { type: "string", format: "uuid" },
                  device_id: { type: "string", format: "uuid" },
                  sync: { default: false, type: "boolean" },
                  name: { type: "string" },
                  starts_daily_at: { type: "string" },
                  ends_daily_at: { type: "string" },
                  noise_threshold_decibels: { type: "number" },
                  noise_threshold_nrs: { type: "number" },
                },
                required: ["noise_threshold_id", "device_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "noise_threshold_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "sync",
            in: "query",
            schema: { default: false, type: "boolean" },
            required: false,
          },
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "starts_daily_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "ends_daily_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "noise_threshold_decibels",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "noise_threshold_nrs",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
        ],
        tags: ["/noise_sensors"],
        operationId: "noiseSensorsNoiseThresholdsUpdatePut",
      },
    },
    "/noise_sensors/simulate/trigger_noise_threshold": {
      post: {
        summary: "/noise_sensors/simulate/trigger_noise_threshold",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { device_id: { type: "string", format: "uuid" } },
                required: ["device_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "device_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
        ],
        tags: ["/noise_sensors"],
        operationId: "noiseSensorsSimulateTriggerNoiseThresholdPost",
      },
    },
    "/thermostats/climate_setting_schedules/create": {
      post: {
        summary: "/thermostats/climate_setting_schedules/create",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    climate_setting_schedule: {
                      type: "object",
                      properties: {
                        climate_setting_schedule_id: { type: "string" },
                        schedule_type: { type: "string", enum: ["time_bound"] },
                        device_id: { type: "string" },
                        name: { type: "string" },
                        schedule_starts_at: { type: "string" },
                        schedule_ends_at: { type: "string" },
                        created_at: { type: "string" },
                        automatic_heating_enabled: { type: "boolean" },
                        automatic_cooling_enabled: { type: "boolean" },
                        hvac_mode_setting: {
                          type: "string",
                          enum: ["off", "heat", "cool", "heatcool"],
                        },
                        cooling_set_point_celsius: { type: "number" },
                        heating_set_point_celsius: { type: "number" },
                        cooling_set_point_fahrenheit: { type: "number" },
                        heating_set_point_fahrenheit: { type: "number" },
                        manual_override_allowed: { type: "boolean" },
                      },
                      required: [
                        "climate_setting_schedule_id",
                        "schedule_type",
                        "device_id",
                        "schedule_starts_at",
                        "schedule_ends_at",
                        "created_at",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["climate_setting_schedule", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  schedule_type: {
                    default: "time_bound",
                    type: "string",
                    enum: ["time_bound"],
                  },
                  device_id: { type: "string" },
                  name: { type: "string" },
                  schedule_starts_at: { type: "string" },
                  schedule_ends_at: { type: "string" },
                  automatic_heating_enabled: { type: "boolean" },
                  automatic_cooling_enabled: { type: "boolean" },
                  hvac_mode_setting: {
                    type: "string",
                    enum: ["off", "heat", "cool", "heatcool"],
                  },
                  cooling_set_point_celsius: { type: "number" },
                  heating_set_point_celsius: { type: "number" },
                  cooling_set_point_fahrenheit: { type: "number" },
                  heating_set_point_fahrenheit: { type: "number" },
                  manual_override_allowed: { type: "boolean" },
                },
                required: [
                  "device_id",
                  "schedule_starts_at",
                  "schedule_ends_at",
                ],
              },
            },
          },
        },
        parameters: [
          {
            name: "schedule_type",
            in: "query",
            schema: {
              default: "time_bound",
              type: "string",
              enum: ["time_bound"],
            },
            required: false,
          },
          {
            name: "device_id",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "schedule_starts_at",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
          {
            name: "schedule_ends_at",
            in: "query",
            schema: { type: "string" },
            required: true,
          },
          {
            name: "automatic_heating_enabled",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "automatic_cooling_enabled",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "hvac_mode_setting",
            in: "query",
            schema: {
              type: "string",
              enum: ["off", "heat", "cool", "heatcool"],
            },
            required: false,
          },
          {
            name: "cooling_set_point_celsius",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "heating_set_point_celsius",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "cooling_set_point_fahrenheit",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "heating_set_point_fahrenheit",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "manual_override_allowed",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
        ],
        tags: [],
        operationId: "thermostatsClimateSettingSchedulesCreatePost",
      },
    },
    "/thermostats/climate_setting_schedules/delete": {
      post: {
        summary: "/thermostats/climate_setting_schedules/delete",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  climate_setting_schedule_id: {
                    type: "string",
                    format: "uuid",
                  },
                },
                required: ["climate_setting_schedule_id"],
              },
            },
          },
        },
        tags: [],
        operationId: "thermostatsClimateSettingSchedulesDeletePost",
      },
      put: {
        summary: "/thermostats/climate_setting_schedules/delete",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { ok: { type: "boolean" } },
                  required: ["ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  climate_setting_schedule_id: {
                    type: "string",
                    format: "uuid",
                  },
                },
                required: ["climate_setting_schedule_id"],
              },
            },
          },
        },
        tags: [],
        operationId: "thermostatsClimateSettingSchedulesDeletePut",
      },
    },
    "/thermostats/climate_setting_schedules/get": {
      post: {
        summary: "/thermostats/climate_setting_schedules/get",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    climate_setting_schedule: {
                      type: "object",
                      properties: {
                        climate_setting_schedule_id: { type: "string" },
                        schedule_type: { type: "string", enum: ["time_bound"] },
                        device_id: { type: "string" },
                        name: { type: "string" },
                        schedule_starts_at: { type: "string" },
                        schedule_ends_at: { type: "string" },
                        created_at: { type: "string" },
                        automatic_heating_enabled: { type: "boolean" },
                        automatic_cooling_enabled: { type: "boolean" },
                        hvac_mode_setting: {
                          type: "string",
                          enum: ["off", "heat", "cool", "heatcool"],
                        },
                        cooling_set_point_celsius: { type: "number" },
                        heating_set_point_celsius: { type: "number" },
                        cooling_set_point_fahrenheit: { type: "number" },
                        heating_set_point_fahrenheit: { type: "number" },
                        manual_override_allowed: { type: "boolean" },
                      },
                      required: [
                        "climate_setting_schedule_id",
                        "schedule_type",
                        "device_id",
                        "schedule_starts_at",
                        "schedule_ends_at",
                        "created_at",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["climate_setting_schedule", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  climate_setting_schedule_id: {
                    type: "string",
                    format: "uuid",
                  },
                  device_id: { type: "string", format: "uuid" },
                },
              },
            },
          },
        },
        tags: [],
        operationId: "thermostatsClimateSettingSchedulesGetPost",
      },
    },
    "/thermostats/climate_setting_schedules/list": {
      post: {
        summary: "/thermostats/climate_setting_schedules/list",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    climate_setting_schedules: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          climate_setting_schedule_id: { type: "string" },
                          schedule_type: {
                            type: "string",
                            enum: ["time_bound"],
                          },
                          device_id: { type: "string" },
                          name: { type: "string" },
                          schedule_starts_at: { type: "string" },
                          schedule_ends_at: { type: "string" },
                          created_at: { type: "string" },
                          automatic_heating_enabled: { type: "boolean" },
                          automatic_cooling_enabled: { type: "boolean" },
                          hvac_mode_setting: {
                            type: "string",
                            enum: ["off", "heat", "cool", "heatcool"],
                          },
                          cooling_set_point_celsius: { type: "number" },
                          heating_set_point_celsius: { type: "number" },
                          cooling_set_point_fahrenheit: { type: "number" },
                          heating_set_point_fahrenheit: { type: "number" },
                          manual_override_allowed: { type: "boolean" },
                        },
                        required: [
                          "climate_setting_schedule_id",
                          "schedule_type",
                          "device_id",
                          "schedule_starts_at",
                          "schedule_ends_at",
                          "created_at",
                        ],
                      },
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["climate_setting_schedules", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: { device_id: { type: "string", format: "uuid" } },
                required: ["device_id"],
              },
            },
          },
        },
        tags: [],
        operationId: "thermostatsClimateSettingSchedulesListPost",
      },
    },
    "/thermostats/climate_setting_schedules/update": {
      post: {
        summary: "/thermostats/climate_setting_schedules/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    climate_setting_schedule: {
                      type: "object",
                      properties: {
                        climate_setting_schedule_id: { type: "string" },
                        schedule_type: { type: "string", enum: ["time_bound"] },
                        device_id: { type: "string" },
                        name: { type: "string" },
                        schedule_starts_at: { type: "string" },
                        schedule_ends_at: { type: "string" },
                        created_at: { type: "string" },
                        automatic_heating_enabled: { type: "boolean" },
                        automatic_cooling_enabled: { type: "boolean" },
                        hvac_mode_setting: {
                          type: "string",
                          enum: ["off", "heat", "cool", "heatcool"],
                        },
                        cooling_set_point_celsius: { type: "number" },
                        heating_set_point_celsius: { type: "number" },
                        cooling_set_point_fahrenheit: { type: "number" },
                        heating_set_point_fahrenheit: { type: "number" },
                        manual_override_allowed: { type: "boolean" },
                      },
                      required: [
                        "climate_setting_schedule_id",
                        "schedule_type",
                        "device_id",
                        "schedule_starts_at",
                        "schedule_ends_at",
                        "created_at",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["climate_setting_schedule", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  climate_setting_schedule_id: {
                    type: "string",
                    format: "uuid",
                  },
                  schedule_type: {
                    default: "time_bound",
                    type: "string",
                    enum: ["time_bound"],
                  },
                  name: { type: "string" },
                  schedule_starts_at: { type: "string" },
                  schedule_ends_at: { type: "string" },
                  automatic_heating_enabled: { type: "boolean" },
                  automatic_cooling_enabled: { type: "boolean" },
                  hvac_mode_setting: {
                    type: "string",
                    enum: ["off", "heat", "cool", "heatcool"],
                  },
                  cooling_set_point_celsius: { type: "number" },
                  heating_set_point_celsius: { type: "number" },
                  cooling_set_point_fahrenheit: { type: "number" },
                  heating_set_point_fahrenheit: { type: "number" },
                  manual_override_allowed: { type: "boolean" },
                },
                required: ["climate_setting_schedule_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "climate_setting_schedule_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "schedule_type",
            in: "query",
            schema: {
              default: "time_bound",
              type: "string",
              enum: ["time_bound"],
            },
            required: false,
          },
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "schedule_starts_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "schedule_ends_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "automatic_heating_enabled",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "automatic_cooling_enabled",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "hvac_mode_setting",
            in: "query",
            schema: {
              type: "string",
              enum: ["off", "heat", "cool", "heatcool"],
            },
            required: false,
          },
          {
            name: "cooling_set_point_celsius",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "heating_set_point_celsius",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "cooling_set_point_fahrenheit",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "heating_set_point_fahrenheit",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "manual_override_allowed",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
        ],
        tags: [],
        operationId: "thermostatsClimateSettingSchedulesUpdatePost",
      },
      put: {
        summary: "/thermostats/climate_setting_schedules/update",
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    climate_setting_schedule: {
                      type: "object",
                      properties: {
                        climate_setting_schedule_id: { type: "string" },
                        schedule_type: { type: "string", enum: ["time_bound"] },
                        device_id: { type: "string" },
                        name: { type: "string" },
                        schedule_starts_at: { type: "string" },
                        schedule_ends_at: { type: "string" },
                        created_at: { type: "string" },
                        automatic_heating_enabled: { type: "boolean" },
                        automatic_cooling_enabled: { type: "boolean" },
                        hvac_mode_setting: {
                          type: "string",
                          enum: ["off", "heat", "cool", "heatcool"],
                        },
                        cooling_set_point_celsius: { type: "number" },
                        heating_set_point_celsius: { type: "number" },
                        cooling_set_point_fahrenheit: { type: "number" },
                        heating_set_point_fahrenheit: { type: "number" },
                        manual_override_allowed: { type: "boolean" },
                      },
                      required: [
                        "climate_setting_schedule_id",
                        "schedule_type",
                        "device_id",
                        "schedule_starts_at",
                        "schedule_ends_at",
                        "created_at",
                      ],
                    },
                    ok: { type: "boolean" },
                  },
                  required: ["climate_setting_schedule", "ok"],
                },
              },
            },
          },
          400: { description: "Bad Request" },
          401: { description: "Unauthorized" },
        },
        security: [
          { seam_workspace: [], access_token: [] },
          { seam_client_session_token: [] },
          { client_session_token: [] },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  climate_setting_schedule_id: {
                    type: "string",
                    format: "uuid",
                  },
                  schedule_type: {
                    default: "time_bound",
                    type: "string",
                    enum: ["time_bound"],
                  },
                  name: { type: "string" },
                  schedule_starts_at: { type: "string" },
                  schedule_ends_at: { type: "string" },
                  automatic_heating_enabled: { type: "boolean" },
                  automatic_cooling_enabled: { type: "boolean" },
                  hvac_mode_setting: {
                    type: "string",
                    enum: ["off", "heat", "cool", "heatcool"],
                  },
                  cooling_set_point_celsius: { type: "number" },
                  heating_set_point_celsius: { type: "number" },
                  cooling_set_point_fahrenheit: { type: "number" },
                  heating_set_point_fahrenheit: { type: "number" },
                  manual_override_allowed: { type: "boolean" },
                },
                required: ["climate_setting_schedule_id"],
              },
            },
          },
        },
        parameters: [
          {
            name: "climate_setting_schedule_id",
            in: "query",
            schema: { type: "string", format: "uuid" },
            required: true,
          },
          {
            name: "schedule_type",
            in: "query",
            schema: {
              default: "time_bound",
              type: "string",
              enum: ["time_bound"],
            },
            required: false,
          },
          {
            name: "name",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "schedule_starts_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "schedule_ends_at",
            in: "query",
            schema: { type: "string" },
            required: false,
          },
          {
            name: "automatic_heating_enabled",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "automatic_cooling_enabled",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
          {
            name: "hvac_mode_setting",
            in: "query",
            schema: {
              type: "string",
              enum: ["off", "heat", "cool", "heatcool"],
            },
            required: false,
          },
          {
            name: "cooling_set_point_celsius",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "heating_set_point_celsius",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "cooling_set_point_fahrenheit",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "heating_set_point_fahrenheit",
            in: "query",
            schema: { type: "number" },
            required: false,
          },
          {
            name: "manual_override_allowed",
            in: "query",
            schema: { type: "boolean" },
            required: false,
          },
        ],
        tags: [],
        operationId: "thermostatsClimateSettingSchedulesUpdatePut",
      },
    },
  },
  components: {
    securitySchemes: {
      seam_workspace: { type: "apiKey", in: "header", name: "seam-workspace" },
      seam_client_session_token: {
        type: "apiKey",
        in: "header",
        name: "seam-client-session-token",
      },
      client_session_token: {
        type: "apiKey",
        in: "header",
        name: "client-session-token",
      },
      access_token: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "API Token",
      },
    },
  },
}
