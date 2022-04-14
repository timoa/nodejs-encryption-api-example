const crypto = require('crypto');

const encryptionType = 'aes-256-cbc';

function generateIv() {
  return crypto.randomBytes(16);
}

/**
 * Encrypt a secret
 * @param {String} data           Data to encrypt
 * @param {String} encryptionKey  Encryption key to uses to encrypt the secret
 *
 * @returns {String}              Encrypted data
 */
function encrypt(data, encryptionKey) {
  // Generate an Initialization Vector for each encryption
  const iv = generateIv();

  // Cipher
  const cipher = crypto.createCipheriv(encryptionType, Buffer.from(encryptionKey), iv);

  // Encrypt the data
  let encryptedSecret = cipher.update(data);
  encryptedSecret = Buffer.concat([encryptedSecret, cipher.final()]);

  // Embedded IV with the encrypted secret
  return `${iv.toString('hex')}:${encryptedSecret.toString('hex')}`;
}

/**
 * Decrypt a secret
 * @param {String} data           Encrypted data
 * @param {String} encryptionKey  Encryption key used to encrypt the data
 *
 * @returns {String}
 */
function decrypt(data, encryptionKey) {
  // Retrieve the IV from the encrypted data
  const encryptedData = data.split(':');
  const iv = Buffer.from(encryptedData.shift(), 'hex');

  // Retrieve the secret
  const encryptedSecret = Buffer.from(encryptedData.join(':'), 'hex');

  // Decipher
  const decipher = crypto.createDecipheriv(encryptionType, Buffer.from(encryptionKey), iv);

  // Decrypt the data
  let secret = decipher.update(encryptedSecret);
  secret = Buffer.concat([secret, decipher.final()]);

  return secret;
}

module.exports = { encrypt, decrypt };
