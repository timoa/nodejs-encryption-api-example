const fastify = require('fastify')();
const logger = require('./lib/logger');
const config = require('./config/config.json');
const routes = require('./routes');
const db = require('./lib/db');

const port = process.env.NODE_PORT || config.app.port;

// Connect to MongoDB
db.connect();

// Register the Health plugin
fastify.register(require('fastify-healthcheck'), {
  healthcheckUrl: `/${config.healthCheck.path}`,
});

// Import Swagger Options
const swagger = require('./config/swagger');

// Register the Swagger plugin
fastify.register(require('fastify-swagger'), swagger.options);

// Load the routes
routes.forEach((route) => {
  fastify.route(route);
});

// Start the Fastify HTTP server
const start = async () => {
  try {
    await fastify.listen(port)
      .then((address) => {
        fastify.swagger();
        logger.info(`Server listening on ${address}`);
      });
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

start();
