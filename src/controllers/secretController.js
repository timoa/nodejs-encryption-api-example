const boom = require('boom');
const _ = require('lodash');
const Secret = require('../models/secret');
const crypto = require('../lib/crypto');

// Get secrets by ID
exports.getSecrets = async (req) => {
  try {
    const encryptedSecrets = await Secret.find({ id: req.body.id });
    const secrets = [];

    _.forEach(encryptedSecrets, (secret) => {
      secrets.push({
        id: secret.id,
        value: JSON.parse(crypto.decrypt(secret.value, req.body.encryption_key)),
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
    // Cipher data must be a string or a buffer
    const unencryptedSecret = JSON.stringify(req.body.value);

    // Encrypt secret with the encryption key passed by POST
    const encryptedSecret = crypto.encrypt(unencryptedSecret, req.body.encryption_key);

    // Save the encrypted Secret under MongoDB
    const data = {
      id: req.body.id,
      value: encryptedSecret,
    };

    // Save data
    return Secret.findOneAndUpdate(
      {
        id: req.body.id,
      },
      data,
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );
  } catch (err) {
    throw boom.boomify(err);
  }
};
