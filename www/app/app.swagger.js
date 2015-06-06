(function() {
  'use strict';

  module.exports = {
    swagger: '2.0',
    info: {
      title: 'Waybook API',
      description: 'Everyone has genius.',
      version: '1.0.0',
      contact: {
        name: 'My Way Learning Company',
        email: 'way@way.me'
      }
    },
    host: 'api.way.me',
    schemes: ['https'],
    security: [{
      waybookAccessToken: ['full']
    }],
    basePath: '/',
    consumes: ['application/json',
      'application/json-patch+json',
      'application/x-www-form-urlencoded'
    ],
    produces: ['application/json'],
    paths: {
      '/goals': {
        get: {
          operationId: 'listGoals',
          'x-loopback-model': 'Goal',
          description: 'Returns a collection of goals for the authenticated user',
          summary: 'Fetch a list of goals',
          tags: ['goals'],
          produces: ['application/json'],
          responses: {
            '200': {
              description: 'OK',
              schema: {
                '$ref': '#/definitions/Collection'
              }
            },
            default: {
              description: 'Unexpected error',
              schema: {
                '$ref': '#/definitions/UnexpectedError'
              }
            }
          }
        },
        patch: {
          operationId: 'patchGoal',
          description: 'Alter a Goal using JSON-Patch',
          'x-loopback-model': 'Goal',
          'x-loopback-method': 'patch',
          summary: 'Alters a goal',
          tags: ['goals'],
          parameters: [{
            name: 'patch',
            description: 'Patch document describing alterations.',
            'in': 'body',
            required: true,
            schema: {
              '$ref': '#/definitions/PatchDocument'
            }
          }],
          responses: {
            '204': {
              description: 'Successful patch'
            },
            '400': {
              description: 'Malformed patch document'
            },
            '415': {
              description: 'Unsupported patch document'
            }
          }
        },
        post: {
          operationId: 'createNewGoal',
          'x-loopback-model': 'Goal',
          summary: 'Creates a new goal',
          description: 'Creates a new goal',
          tags: ['goals'],
          consumes: ['application/json'],
          parameters: [{
            name: 'goal',
            'in': 'body',
            required: true,
            description: 'A Goal object',
            schema: {
              '$ref': '#/definitions/Goal'
            }
          }],
          responses: {
            '201': {
              description: 'Created',
              schema: {
                '$ref': '#/definitions/Goal'
              }
            }
          }
        }
      },
      '/oauth/token': {
        post: {
          operationId: 'accessTokenRequest',
          'x-loopback-skip': true,
          summary: 'OAuth 2.0 access token request endpoint.',
          description: 'OAuth 2.0 access token request endpoint',
          tags: ['auth'],
          consumes: ['application/x-www-form-urlencoded'],
          produces: ['application/json'],
          parameters: [{
            name: 'grant_type',
            description: '"Required by all access token request types. Supported grant_type values: `authorization_code`, `password`"\n',
            required: true,
            type: 'string',
            'in': 'formData'
          }, {
            name: 'code',
            description: 'Required if `grant_type` is `authorization_code`.\n',
            type: 'string',
            'in': 'formData'
          }, {
            name: 'redirect_uri',
            description: 'Required if the `redirect_uri` parameter was included in the `authorization_code` request.\n',
            type: 'string',
            'in': 'formData'
          }, {
            name: 'client_id',
            description: 'Required if the client is not authenticating with the authorization server.',
            type: 'string',
            'in': 'formData'
          }, {
            name: 'username',
            description: 'Required if `grant_type` is `password`.\n',
            type: 'string',
            'in': 'formData'
          }, {
            name: 'password',
            description: 'Required if `grant_type` is `password`.\n',
            type: 'string',
            'in': 'formData'
          }, {
            name: 'scope',
            description: '"Optional for `password` `grant_type`, invalid for `authorization_code` `grant_type`"\n',
            type: 'string',
            'in': 'formData'
          }],
          responses: {
            '200': {
              description: 'OK',
              examples: {
                'application/json': '{\n  "access_token": "2YotnFZFEjr1zCsicMWpAA",\n  "token_type": "bearer",\n  "expires_in": 900,\n  "refresh_token": "tGzv3JOkF0XG5Qx2TlKWIA",\n  "example_parameter": "example_value"\n}\n'
              },
              schema: {
                '$ref': '#/definitions/AccessToken'
              }
            },
            '400': {
              description: 'Error response',
              schema: {
                '$ref': '#/definitions/OAuthError'
              }
            }
          }
        }
      },
      '/user': {
        get: {
          operationId: 'getAuthenticatedUser',
          'x-loopback-model': 'WaybookUser',
          description: 'Returns information about the authenticated user',
          summary: 'Fetch info about current user',
          tags: ['users'],
          produces: ['application/json'],
          responses: {
            '200': {
              description: 'OK',
              schema: {
                '$ref': '#/definitions/User'
              }
            },
            default: {
              description: 'Unexpected error',
              schema: {
                '$ref': '#/definitions/UnexpectedError'
              }
            }
          }
        },
        post: {
          operationId: 'createNewUserViaPost',
          'x-loopback-model': 'WaybookUser',
          summary: 'Creates a new user via post',
          description: 'Creates a new user via post',
          tags: ['users'],
          consumes: ['application/x-www-form-urlencoded'],
          produces: ['application/json'],
          parameters: [{
            name: 'email',
            required: true,
            'in': 'formData',
            type: 'string'
          }, {
            name: 'password',
            required: true,
            'in': 'formData',
            type: 'string'
          }],
          responses: {
            '201': {
              description: 'Created',
              schema: {
                '$ref': '#/definitions/User'
              }
            },
            '400': {
              description: 'Bad Request. Details provided in payload.',
              schema: {
                '$ref': '#/definitions/Error'
              }
            }
          }
        }
      }
    },
    definitions: {
      AccessToken: {
        'x-loopback-skip': true,
        properties: {
          access_token: {
            type: 'string',
            description: 'The access token issued.'
          },
          token_type: {
            type: 'string',
            description: 'Type of token issued.',
            'enum': ['bearer']
          },
          expires_in: {
            type: 'integer',
            format: 'int32',
            description: 'Lifetime in seconds of the access token.'
          },
          refresh_token: {
            type: 'string',
            description: 'Token which can be used to obtain a new token.'
          },
          scope: {
            type: 'string',
            description: 'Optional if identical to scope requested; otherwise, REQUIRED'
          },
          state: {
            type: 'string',
            description: 'Required IF the client request included `state` parameter.'
          }
        },
        required: ['access_token', 'token_type']
      },
      Collection: {
        description: 'A collection of objects',
        properties: {
          count: {
            type: 'integer',
            description: 'non-negative integer representing total number of items available.'
          },
          members: {
            type: 'array',
            description: 'Array of objects belonging to collection',
            items: {
              type: 'object'
            }
          }
        },
        required: ['count', 'members']
      },
      Error: {
        properties: {
          status: {
            description: 'Reflection of this error response\'s HTTP status code',
            type: 'number'
          },
          '@context': {
            type: 'string',
            description: 'Location of model key definitions',
            'enum': ['/contexts/Error.jsonld']
          },
          '@id': {
            type: 'string',
            description: 'Unique identifier for this instance of the model'
          },
          code: {
            type: 'number',
            description: 'Numeric identifier for this error'
          },
          message: {
            type: 'string',
            description: 'Information about the possible cause of this error'
          },
          stack: {
            type: 'string',
            description: '(non-production environments only) Formatted message and stack trace to the current position.'
          }
        },
        required: ['status', '@context', '@id', 'code', 'message']
      },
      Goal: {
        description: 'A record describing a goal.',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          userId: {
            type: 'integer',
            readOnly: true
          },
          title: {
            type: 'string',
            description: 'Short description of this goal'
          },
          content: {
            type: 'string',
            description: 'primary data associated with this record'
          },
          created: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          },
          lastUpdated: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          }
        },
        required: ['content']
      },
      OAuthError: {
        properties: {
          error: {
            description: 'A single error code from the specified list (invalid_request, invalid_client, invalid_grant, unauthorized_client, unsupported_grant_type, invalid_scope).',
            type: 'string',
            'enum': ['invalid_request',
              'invalid_client',
              'invalid_grant',
              'unauthorized_client',
              'unsupported_grant_type',
              'invalid_scope'
            ]
          },
          error_description: {
            type: 'string',
            description: 'Human-readable ASCII text providing additional information.'
          },
          error_uri: {
            type: 'string',
            description: 'URI identifying a human-readable web page with information about this error.'
          }
        },
        required: ['error']
      },
      PatchDocument: {
        description: 'A JSON Schema describing a JSON Patch',
        type: 'array',
        items: {
          '$ref': '#/definitions/PatchOperation'
        }
      },
      PatchOperation: {
        properties: {
          op: {
            type: 'string',
            'enum': ['test', 'remove', 'add', 'replace', 'move', 'copy']
          },
          path: {
            type: 'string',
            pattern: '^(/[^/~]*(~[01][^/~]*)*)*$'
          },
          value: {
            anyOf: [{
              type: 'array'
            }, {
              type: 'boolean'
            }, {
              type: 'integer'
            }, {
              type: null
            }, {
              type: 'number'
            }, {
              type: 'object'
            }, {
              type: 'string'
            }]
          },
          from: {
            type: 'string',
            pattern: '^(/[^/~]*(~[01][^/~]*)*)*$'
          }
        },
        required: ['op', 'path']
      },
      UnexpectedError: {
        properties: {
          code: {
            type: 'integer',
            format: 'int32'
          },
          message: {
            type: 'string'
          }
        },
        required: ['code', 'message']
      },
      User: {
        description: 'A user object',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          email: {
            type: 'string',
            format: 'email'
          },
          password: {
            type: 'string',
            format: 'password'
          },
          status: {
            type: 'string'
          },
          created: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          },
          lastUpdated: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          }
        },
        required: ['email']
      }
    },
    securityDefinitions: {
      waybookAccessToken: {
        type: 'oauth2',
        flow: 'accessCode',
        authorizationUrl: '/oauth/authorize',
        tokenUrl: '/oauth/token',
        scopes: {
          full: 'comprehensive access for an authenticated user'
        }
      }
    },
    'x-deletable-op-keys': ['x-way', 'x-loopback', 'x-duke']
  };
}());
