/* eslint-disable max-len */
const { expect } = require('chai');
const crypto = require('../src/lib/crypto');
const testData = require('./testData.json');

// Crypto
describe('Crypto library', () => {
  it('expect the "encrypt" function to return a string', (done) => {
    expect(crypto.encrypt(JSON.stringify(testData.secret), testData.encryptionKey)).to.be.a('string');
    done();
  });
  it('expect the "decrypt" function to return an object', (done) => {
    expect(JSON.parse(crypto.decrypt(testData.encryptedSecret, testData.encryptionKey))).to.be.an('object');
    done();
  });
  it('expect the "decrypt" function to return the same object as original data', (done) => {
    expect(JSON.parse(crypto.decrypt(testData.encryptedSecret, testData.encryptionKey))).to.deep.equals(testData.secret);
    done();
  });
});
