const secretController = require('../controllers/secretController');

const routes = [
  {
    method: 'POST',
    url: '/api/secrets',
    handler: secretController.getSecrets,
  },
  {
    method: 'POST',
    url: '/api/secrets/add',
    handler: secretController.addSecret,
  },
];

module.exports = routes;
