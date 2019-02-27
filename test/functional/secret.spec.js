const request = require('request');
const { expect } = require('chai');
const config = require('../../src/config/config.json');
const testData = require('../testData.json');

// Add Secret
describe('Add Secret endpoint response', () => {
  it('should return 200', (done) => {
    const options = {
      method: 'POST',
      url: `http://localhost:${config.app.port}/api/secrets/add`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        id: testData.id,
        encryption_key: testData.encryptionKey,
        value: testData.secret,
      },
      json: true,
    };

    request(options, (err, res) => {
      if (err) throw err;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

// Get Secret
describe('Get Secret(s) endpoint response', () => {
  it('should return 200', (done) => {
    const options = {
      method: 'POST',
      url: `http://localhost:${config.app.port}/api/secrets`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        id: testData.id,
        encryption_key: testData.encryptionKey,
      },
      json: true,
    };

    request(options, (err, res) => {
      if (err) throw err;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
