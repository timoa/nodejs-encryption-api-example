const { expect } = require('chai');
const config = require('../config/config.json');

// Configuration
describe('Config file', () => {
  it('expect "name" to be a string', (done) => {
    expect(config.app.host).to.be.a('string');
    done();
  });
  it('expect "host" to be a string', (done) => {
    expect(config.app.host).to.be.a('string');
    done();
  });
  it('expect "port" to be a number', (done) => {
    expect(config.app.port).to.be.an('number');
    done();
  });
});
