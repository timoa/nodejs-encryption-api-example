const fastify = require('fastify')();
const fastifyHelmet = require('@fastify/helmet');
const fastifyHealthcheck = require('fastify-healthcheck');
const fastifySwagger = require('@fastify/swagger');

const logger = require('./lib/logger');
const config = require('./config/config.json');
const routes = require('./routes');
const db = require('./lib/db');

const host = process.env.NODE_HOST || 'localhost';
const port = process.env.NODE_PORT || config.app.port;

// Connect to MongoDB
db.connect();

// Register Helmet
fastify.register(fastifyHelmet, {
  global: true,
});

// Register the Health plugin
fastify.register(fastifyHealthcheck, {
  healthcheckUrl: `/${config.healthCheck.path}`,
});

// Import Swagger Options
const swagger = require('./swagger/options');

// Register the Swagger plugin
fastify.register(fastifySwagger, swagger.options);

// Load the routes
routes.forEach((route) => {
  fastify.route(route);
});

// Start the Fastify HTTP server
const start = async () => {
  try {
    await fastify.listen(port, host)
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
