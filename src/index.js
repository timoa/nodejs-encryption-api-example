const fastify = require('fastify')();
const logger = require('./lib/logger');
const config = require('./config/config.json');
const routes = require('./routes');
const db = require('./lib/db');

// Connect to MongoDB
db.connect();

// Import Swagger Options
const swagger = require('./config/swagger');

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);

// Load the routes
routes.forEach((route) => {
  fastify.route(route);
});

// Start the Fastify HTTP server
const start = async () => {
  try {
    await fastify.listen(config.app.port);
    fastify.swagger();
    logger.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

start();
