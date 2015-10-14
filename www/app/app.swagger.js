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
      '/categories': {
        get: {
          operationId: 'indexCategory',
          'x-loopback-model': 'Category',
          description: 'Returns a collection of categories',
          summary: 'Fetch a list of categories',
          tags: ['categories'],
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
        }
      },
      '/comments': {
        post: {
          operationId: 'createComment',
          'x-loopback-model': 'Comment',
          summary: 'Creates a new comment via post',
          description: 'Creates a new comment via post',
          tags: ['comments'],
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [{
            name: 'comment',
            required: true,
            'in': 'body',
            schema: {
              '$ref': '#/definitions/Comment'
            }
          }],
          responses: {
            '201': {
              description: 'Created',
              schema: {
                '$ref': '#/definitions/Comment'
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
      },
      '/comments/{id}': {
        delete: {
          operationId: 'deleteComment',
          'x-loopback-model': 'Comment',
          summary: 'Removes a comment',
          description: 'Removes a comment',
          tags: ['comments'],
          consumes: ['application/json'],
          parameters: [{
            name: 'id',
            'in': 'path',
            required: true,
            description: 'ID required to delete a comment',
            type: 'string'
          }],
          responses: {
            '200': {
              description: 'Deleted',
              schema: {
                '$ref': '#/definitions/Comment'
              }
            }
          }
        },
        put: {
          operationId: 'updateComment',
          description: 'Alter a Comment',
          'x-loopback-model': 'Comment',
          'x-loopback-method': 'put',
          summary: 'Alters a comment',
          tags: ['comments'],
          parameters: [{
            name: 'id',
            'in': 'path',
            required: true,
            description: 'ID required to delete a post',
            type: 'string'
          }, {
            name: 'comment',
            description: 'Patch document describing alterations.',
            'in': 'body',
            required: true,
            schema: {
              '$ref': '#/definitions/PatchDocument'
            }
          }],
          responses: {
            '204': {
              description: 'Successful update',
              schema: {
                '$ref': '#/definitions/Comment'
              }
            },
            '400': {
              description: 'Malformed update document'
            },
            '415': {
              description: 'Unsupported update document'
            }
          }
        }
      },
      '/contacts': {
        get: {
          operationId: 'contactsIndex',
          'x-loopback-model': 'Contact',
          description: 'Returns a collection of contacts for the authenticated user',
          summary: 'Fetch a list of contacts based on userId',
          tags: ['contacts'],
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
        post: {
          operationId: 'createContact',
          'x-loopback-model': 'Contact',
          summary: 'Creates a new contact',
          description: 'Creates a new contact',
          tags: ['contacts'],
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [{
            name: 'contact',
            required: true,
            'in': 'body',
            schema: {
              '$ref': '#/definitions/Contact'
            }
          }],
          responses: {
            '201': {
              description: 'Created',
              schema: {
                '$ref': '#/definitions/Contact'
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
      },
      '/contacts/{id}': {
        delete: {
          operationId: 'deleteContact',
          'x-loopback-model': 'Contact',
          summary: 'Removes a contact',
          description: 'Removes a contact',
          tags: ['contacts'],
          consumes: ['application/json'],
          parameters: [{
            name: 'id',
            'in': 'path',
            required: true,
            description: 'ID required to delete a contact',
            type: 'string'
          }],
          responses: {
            '200': {
              description: 'Deleted',
              schema: {
                '$ref': '#/definitions/Contact'
              }
            }
          }
        },
        get: {
          operationId: 'getContact',
          'x-loopback-model': 'Contact',
          description: 'Returns a contact based on provided id',
          summary: 'Get a single contact',
          tags: ['contacts'],
          produces: ['application/json'],
          parameters: [{
            name: 'id',
            'in': 'path',
            required: true,
            description: 'ID required to fetch a contact',
            type: 'string'
          }],
          responses: {
            '200': {
              description: 'OK',
              schema: {
                '$ref': '#/definitions/Contact'
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
        put: {
          operationId: 'updateContact',
          description: 'Alter a Contact using JSON-Patch',
          'x-loopback-model': 'Contact',
          'x-loopback-method': 'put',
          summary: 'Alters a contact',
          tags: ['contacts'],
          parameters: [{
            name: 'id',
            'in': 'path',
            required: true,
            description: 'ID required to update a contact',
            type: 'string'
          }, {
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
              description: 'Successful patch',
              schema: {
                '$ref': '#/definitions/Contact'
              }
            },
            '400': {
              description: 'Malformed patch document'
            },
            '415': {
              description: 'Unsupported patch document'
            }
          }
        }
      },
      '/explorations': {
        get: {
          operationId: 'indexExploration',
          'x-loopback-model': 'Exploration',
          description: 'Returns a collection of Explorations',
          summary: 'Fetch a list of Explorations',
          tags: ['explorations'],
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
        }
      },
      '/explorations/{id}': {
        get: {
          operationId: 'getExploration',
          'x-loopback-model': 'Exploration',
          description: 'Returns a Exploration based on provided slug',
          summary: 'Get a single Exploration',
          tags: ['explorations'],
          produces: ['application/json'],
          parameters: [{
            name: 'id',
            'in': 'path',
            required: true,
            description: 'slug required to fetch a Exploration',
            type: 'string'
          }],
          responses: {
            '200': {
              description: 'OK',
              schema: {
                '$ref': '#/definitions/Exploration'
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
        put: {
          operationId: 'updateExploration',
          description: 'Alter a Exploration using JSON-Patch',
          'x-loopback-model': 'Exploration',
          'x-loopback-method': 'put',
          summary: 'Alters a exploration',
          tags: ['explorations'],
          parameters: [{
            name: 'id',
            'in': 'path',
            required: true,
            description: 'ID required to update a record',
            type: 'string'
          }, {
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
              description: 'Successful patch',
              schema: {
                '$ref': '#/definitions/Exploration'
              }
            },
            '400': {
              description: 'Malformed patch document'
            },
            '415': {
              description: 'Unsupported patch document'
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
                'application/json': '{\n  "access_token": "2YotnFZFEjr1zCsicMWpAA",\n  "token_type": "bearer",\n  "expires_in": 9,\n  "refresh_token": "tGzv3JOkF0XG5Qx2TlKWIA",\n  "example_parameter": "example_value"\n}\n'
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
      '/posts': {
        get: {
          operationId: 'indexPost',
          'x-loopback-model': 'Post',
          description: 'Returns a collection of xposts for the authenticated user',
          summary: 'Fetch a list of posts',
          tags: ['posts'],
          parameters: [{
            name: 'postType',
            'in': 'query',
            description: 'Type of post to query',
            required: false,
            type: 'string'
          }],
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
        post: {
          operationId: 'createPost',
          'x-loopback-model': 'Post',
          summary: 'Creates a new Post',
          description: 'Creates a new Post',
          tags: ['posts'],
          consumes: ['application/json'],
          parameters: [{
            name: 'post',
            'in': 'body',
            required: true,
            description: 'A Post object',
            schema: {
              '$ref': '#/definitions/Post'
            }
          }],
          responses: {
            '201': {
              description: 'Created',
              schema: {
                '$ref': '#/definitions/Post'
              }
            }
          }
        }
      },
      '/posts/{id}': {
        delete: {
          operationId: 'deletePost',
          'x-loopback-model': 'Post',
          summary: 'Removes a post',
          description: 'Removes a post',
          tags: ['posts'],
          consumes: ['application/json'],
          parameters: [{
            name: 'id',
            'in': 'path',
            required: true,
            description: 'ID required to delete a post',
            type: 'string'
          }],
          responses: {
            '200': {
              description: 'Deleted',
              schema: {
                '$ref': '#/definitions/Post'
              }
            }
          }
        },
        get: {
          operationId: 'getPost',
          'x-loopback-model': 'Post',
          description: 'Returns a xpost based on provided id',
          summary: 'Get a single xpost',
          tags: ['posts'],
          produces: ['application/json'],
          parameters: [{
            name: 'id',
            'in': 'path',
            required: true,
            description: 'ID required to fetch a xpost',
            type: 'string'
          }, {
            name: 'shared',
            'in': 'query',
            required: false,
            type: 'string',
            description: 'return all contacts where xpost has been shared with'
          }],
          responses: {
            '200': {
              description: 'OK',
              schema: {
                '$ref': '#/definitions/Post'
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
        put: {
          operationId: 'updatePost',
          description: 'Alter a Post using JSON-Patch',
          'x-loopback-model': 'Post',
          'x-loopback-method': 'put',
          summary: 'Alters a post',
          tags: ['posts'],
          parameters: [{
            name: 'id',
            'in': 'path',
            required: true,
            description: 'ID required to delete a post',
            type: 'string'
          }, {
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
              description: 'Successful patch',
              schema: {
                '$ref': '#/definitions/Post'
              }
            },
            '400': {
              description: 'Malformed patch document'
            },
            '415': {
              description: 'Unsupported patch document'
            }
          }
        }
      },
      '/tags': {
        get: {
          operationId: 'tagsIndex',
          'x-loopback-model': 'Tag',
          description: 'Returns a collection of tags for the authenticated user',
          summary: 'Fetch a list of goals based on text provided',
          tags: ['tags'],
          parameters: [{
            name: 'search',
            'in': 'query',
            description: 'Text to search tags that starts with',
            required: true,
            type: 'string'
          }],
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
        put: {
          operationId: 'updateUser',
          description: 'Update user',
          'x-loopback-model': 'WaybookUser',
          'x-loopback-method': 'put',
          summary: 'Alters an user',
          tags: ['users'],
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
              description: 'Successful patch',
              schema: {
                '$ref': '#/definitions/User'
              }
            },
            '400': {
              description: 'Malformed patch document'
            },
            '415': {
              description: 'Unsupported patch document'
            }
          }
        }
      },
      '/users': {
        get: {
          operationId: 'usersIndex',
          'x-loopback-model': 'WaybookUser',
          summary: 'Return users public information to be used on share action',
          description: 'Return an object with public filtered user information',
          tags: ['users'],
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [{
            name: 'search',
            'in': 'query',
            description: 'Text to search users that starts with input criteria',
            required: false,
            type: 'string'
          }],
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
        post: {
          operationId: 'createUser',
          'x-loopback-model': 'WaybookUser',
          summary: 'Creates a new user via post',
          description: 'Creates a new user via post',
          tags: ['users'],
          consumes: ['application/json'],
          produces: ['application/json'],
          parameters: [{
            name: 'user',
            required: true,
            'in': 'body',
            schema: {
              '$ref': '#/definitions/User'
            }
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
      Category: {
        description: 'A category object',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          category: {
            type: 'string'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          }
        }
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
      Comment: {
        description: 'A comment object',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          comment: {
            type: 'string'
          },
          userId: {
            type: 'integer'
          },
          postId: {
            type: 'integer'
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
        required: ['comment', 'userId']
      },
      Contact: {
        description: 'A contact object',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
          },
          email: {
            type: 'string',
            format: 'email'
          },
          userId: {
            type: 'integer'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          }
        },
        required: ['email', 'userId']
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
      Exploration: {
        description: 'A comment object',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            readOnly: true
          },
          name: {
            type: 'string'
          },
          slug: {
            type: 'string'
          },
          pattern: {
            type: 'string'
          },
          imgage: {
            type: 'string'
          },
          version: {
            type: 'string'
          },
          description: {
            type: 'string'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            readOnly: true
          }
        }
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
          from: {
            type: 'string',
            pattern: '^(/[^/~]*(~[01][^/~]*)*)*$'
          }
        },
        required: ['op', 'path']
      },
      Post: {
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
          link: {
            type: 'string',
            description: 'store link when user shares a link on a post'
          },
          linkTitle: {
            type: 'string',
            description: 'Short description of posted link'
          },
          linkDescription: {
            type: 'string',
            description: 'Long description of shared link'
          },
          title: {
            type: 'string',
            description: 'Short description of this goal'
          },
          content: {
            type: 'string',
            description: 'primary data associated with this record'
          },
          gAchievedDate: {
            type: 'string',
            format: 'date-time'
          },
          gAbandonedDate: {
            type: 'string',
            format: 'date-time'
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
          firstName: {
            type: 'string'
          },
          lastName: {
            type: 'string'
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
