const express = require('express');
const logger = require('./lib/logger');
const config = require('./config/config.json');

const app = express();

app.get('/', (req, res) => {
  logger.debug('Call root endpoint');
  res.status(200).send('Root endpoint\n');
});

app.listen(config.app.port, () => {
  logger.info(`App listening at http://${config.app.host}:${config.app.port}`);
});
