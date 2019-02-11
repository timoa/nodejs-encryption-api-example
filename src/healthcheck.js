const http = require('http');
const logger = require('./lib/logger');

const options = {
  host: '0.0.0.0',
  port: '9999',
  path: '/_health',
  method: 'HEAD',
  timeout: 2000,
};

const request = http.get(options, (res) => {
  logger.debug(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 204) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', (err) => {
  logger.debug(`ERROR: ${err.message}`);
  process.exit(1);
});

request.end();
