const secretController = require('../controllers/secretController');

const routes = [
  {
    method: 'POST',
    url: '/api/secrets/:id',
    handler: secretController.getSecrets,
  },
  {
    method: 'POST',
    url: '/api/secrets',
    handler: secretController.addSecret,
  },
];

module.exports = routes;
