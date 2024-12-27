export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Plants API',
    version: '1.0.0',
    description: 'API for managing plants',
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
    },
  },
}