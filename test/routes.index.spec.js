const { expect } = require('chai');
const routes = require('../src/routes');

// Routes
describe('Routes', () => {
  it('expect "routes" to be a array', (done) => {
    expect(routes).to.be.an('array');
    done();
  });
  it('expect the first route URL to be "/api/secrets"', (done) => {
    expect(routes[0].url).to.be.equals('/api/secrets');
    done();
  });
  it('expect the second route URL to be "/api/secrets/add"', (done) => {
    expect(routes[1].url).to.be.equals('/api/secrets/add');
    done();
  });
});
