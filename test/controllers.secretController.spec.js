/* eslint-disable max-len */
const { expect } = require('chai');
const secretController = require('../src/controllers/secretController');
// const testData = require('./testData.json');

// const addSecretRequest = {
//   body: {
//     id: testData.id,
//     encryption_key: testData.encryptionKey,
//     value: testData.secret,
//   },
// };

// async function addSecret(req) {
//   return Promise.resolve(secretController.addSecret(req));
// }

// Add Secret
describe('Add Secret', () => {
  it('expect the "addSecret" to exists and be a function', (done) => {
    expect(typeof (secretController.addSecret)).to.be.equals('function');
    done();
  });
  // it('expect the "addSecret" function to return an object', async () => {
  //   const addSecretResponse = await addSecret(addSecretRequest);
  //   expect(addSecretResponse).to.be.a('object');
  // });
});


describe('Get Secrets', () => {
  it('expect the "getSecrets" to exists and be a function', (done) => {
    expect(typeof (secretController.getSecrets)).to.be.equals('function');
    done();
  });
});
