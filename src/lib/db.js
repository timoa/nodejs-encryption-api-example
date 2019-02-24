const mongoose = require('mongoose');
const logger = require('../lib/logger');
const config = require('../config/config.json');

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;

/**
 * MongoDB connection
 */
function connect() {
  mongoose.connect(`mongodb://${host}:${port}/${config.app.name}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error(err));
}

function close() {
  mongoose.connection.close();
}

module.exports = { connect, close };
