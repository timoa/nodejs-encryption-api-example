const boom = require('boom');
const _ = require('lodash');
const Secret = require('../models/secret');
const crypto = require('../lib/crypto');
const logger = require('../lib/logger');

// Get single secret by ID
exports.getSingleSecret = async (req) => {
  try {
    const encryptedSecrets = await Secret.find({ id: req.params.id });
    const secrets = [];

    _.forEach(encryptedSecrets, (secret) => {
      secrets.push({
        id: secret.id,
        value: crypto.decrypt(secret.value, req.body.encryption_key),
      });
    });

    return secrets;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new secret
exports.addSecret = async (req) => {
  try {
    const encryptedData = crypto.encrypt(JSON.stringify(req.body.value), req.body.encryption_key);
    const secret = new Secret({
      id: req.body.id,
      value: encryptedData,
    });
    logger.info(secret);
    return secret.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing secret
exports.updateSecret = async (req) => {
  try {
    const { id } = req.params.id;
    const secret = req.body;
    const { ...updateData } = secret;
    const update = await Secret.findByIdAndUpdate(id, updateData, { new: true });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};
