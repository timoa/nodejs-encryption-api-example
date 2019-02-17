const secretController = require('../controllers/secretController');
const specification = require('../swagger/specification');

const routes = [
  {
    method: 'POST',
    url: '/api/secrets',
    schema: specification.schema.getSecrets,
    handler: secretController.getSecrets,
  },
  {
    method: 'POST',
    url: '/api/secrets/add',
    schema: specification.schema.addSecret,
    handler: secretController.addSecret,
  },
];

module.exports = routes;
