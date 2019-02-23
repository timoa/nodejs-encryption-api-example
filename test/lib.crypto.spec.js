const { expect } = require('chai');
const crypto = require('../src/lib/crypto');

// Configuration
const encryptionKey = 'p2s5v8y/B?E(H+MbQeShVmYq3t6w9z$C';
const unencrypted = {
  first_name: 'firstname',
  last_name: 'lastname',
  email: 'email@email.com',
  password: 'app123',
  password_confirmation: 'app123',
};
const encrypted = '0f80f3912cb30fc0e69c90f6cbf5b79f:906e26046549891c947ff2bac234a24a0a5bbbae448104f8e5ffca710e00629aad1af5dcc03bb09a022441e2f1508609e38b693f574f4229e4d5a6af06a1c816edf06f524b5822fe3f4ed8ccb6b36ad9d73780aeaa885dfad0f9e51a690b986acf7e0219cff6918a0822516a390e803a19a0c3a909f1a55d4d5ef251539e75bed40ddbb4f8a9fb627b3a5c176de96011';

// Crypto
describe('Crypto', () => {
  it('expect the "encrypt" function to return a string', (done) => {
    expect(crypto.encrypt(JSON.stringify(unencrypted), encryptionKey)).to.be.a('string');
    done();
  });
  it('expect the "decrypt" function to return an object', (done) => {
    expect(JSON.parse(crypto.decrypt(encrypted, encryptionKey))).to.be.an('object');
    done();
  });
  it('expect the "decrypt" function to return the same object as original data', (done) => {
    expect(JSON.parse(crypto.decrypt(encrypted, encryptionKey))).to.deep.equals(unencrypted);
    done();
  });
});
