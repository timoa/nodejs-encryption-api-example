exports.schema = {
  getSecrets: {
    description: 'Get one or more secrets stored on MongoDB and decrypt them, using a provided encryption key',
    tags: ['Secrets'],
    body: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Secret ID. You can also provide a wildcard "*" at the end of the secret ID',
          example: 'test-01',
        },
        encryptionKey: {
          type: 'string',
          description: 'Encryption Key used to encrypt the secret before saving it to MongoDB',
          example: 'p2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C',
        },
      },
    },
    responses: {
      200: {
        description: 'Default Response',
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'MongoDB ID',
          },
          id: {
            type: 'string',
            description: 'Secret ID',
          },
          __v: {
            type: 'string',
            description: 'MongoDB document version',
          },
          value: {
            type: 'string',
            description: 'Encrypted secret',
          },
        },
      },
    },
  },
  addSecret: {
    description: 'Encrypt a secret (any JSON types) and save it to MongoDB using an Encryption Key',
    tags: ['Secrets'],
    body: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Secret ID',
          example: 'test-01',
        },
        encryptionKey: {
          type: 'string',
          description: 'Encryption Key used to encrypt the secret before saving it to MongoDB',
          example: 'p2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C',
        },
        value: {
          type: 'object',
          description: 'Object or any other JSON types to encrypt',
          example: {
            first_name: 'firstname',
            last_name: 'lastname',
            email: 'email@email.com',
            password: 'app123',
            password_confirmation: 'app123',
          },
        },
      },
    },
  },
};
