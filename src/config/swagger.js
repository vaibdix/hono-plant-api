export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Plants API',
    version: '1.0.0',
    description: 'API for managing plants and users',
  },
  paths: {
    '/plants': {
      get: {
        summary: 'Get all plants',
        responses: {
          '200': {
            description: 'List of plants',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Plant',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new plant',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PlantInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Plant created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Plant',
                },
              },
            },
          },
        },
      },
    },
    '/plants/{id}': {
      get: {
        summary: 'Get a plant by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The ID of the plant to retrieve',
          },
        ],
        responses: {
          '200': {
            description: 'Plant found successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Plant',
                },
              },
            },
          },
          '404': {
            description: 'Plant not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        summary: 'Update a plant',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PlantInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Plant updated successfully',
          },
        },
      },
      delete: {
        summary: 'Delete a plant',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Plant deleted successfully',
          },
        },
      },
    },
    '/users': {
      get: {
        summary: 'Get all users',
        responses: {
          '200': {
            description: 'List of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      put: {
        summary: 'Update a user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated successfully',
          },
        },
      },
      delete: {
        summary: 'Delete a user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'User deleted successfully',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Plant: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          species: {
            type: 'string',
          },
          wateringFrequency: {
            type: 'string',
          },
        },
      },
      PlantInput: {
        type: 'object',
        required: ['name', 'species'],
        properties: {
          name: {
            type: 'string',
          },
          species: {
            type: 'string',
          },
          wateringFrequency: {
            type: 'string',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      UserInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
            minLength: 6,
          },
        },
      },
    },
  },
}
