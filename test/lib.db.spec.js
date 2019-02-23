const { expect } = require('chai');
const db = require('../src/lib/db');

// DB
describe('DB library', () => {
  it('expect "connect" to be a function', (done) => {
    expect(typeof (db.connect)).to.be.equals('function');
    done();
  });
});
