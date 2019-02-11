const secretController = require('../controllers/secretController');

const routes = [
  {
    method: 'POST',
    url: '/api/secrets/:id',
    handler: secretController.getSingleSecret,
  },
  {
    method: 'POST',
    url: '/api/secrets',
    handler: secretController.addSecret,
  },
  {
    method: 'PUT',
    url: '/api/secrets/:id',
    handler: secretController.updateSecret,
  },
];

module.exports = routes;
