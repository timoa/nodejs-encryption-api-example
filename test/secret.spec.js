const request = require('request');
const { expect } = require('chai');
const config = require('../src/config/config.json');

// Configuration
const id = 'test-01';
const encryptionKey = 'p2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C';
const secret = {
  first_name: 'firstname',
  last_name: 'lastname',
  email: 'email@email.com',
  password: 'app123',
  password_confirmation: 'app123',
};


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
        id,
        encryption_key: encryptionKey,
        value: secret,
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
        id,
        encryption_key: encryptionKey,
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
