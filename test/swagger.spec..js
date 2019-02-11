const request = require('request');
const { expect } = require('chai');
const config = require('../src/config/config.json');

// Server
describe('Swagger endpoint response', () => {
  it('should return 200', (done) => {
    request.get(`http://${config.app.host}:${config.app.port}/swagger/index.html`, (err, res) => {
      if (err) throw err;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
