const config = require('../config/config.json');

exports.options = {
  routePrefix: '/swagger',
  exposeRoute: true,
  staticCSP: true,
  transformStaticCSP: (header) => header,
  swagger: {
    info: {
      title: 'Encryption API with Node.js',
      description: 'REST API with encryption/decryption endpoints using Node.js, MongoDB, Fastify and Swagger',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: `localhost:${config.app.port}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
};
