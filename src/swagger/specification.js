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
        },
        encryptionKey: {
          type: 'string',
          description: 'Encryption Key used to encrypt the secret before saving it to MongoDB',
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
        },
        encryptionKey: {
          type: 'string',
          description: 'Encryption Key used to encrypt the secret before saving it to MongoDB',
        },
        value: {
          type: 'object',
          description: 'Object or any other JSON types to encrypt',
        },
      },
    },
  },
};
