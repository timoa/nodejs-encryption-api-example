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
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Decrypt a secret
 * @param {String} data           Encrypted data
 * @param {String} encryptionKey  Encryption key used to encrypt the data
 *
 * @returns {String}
 */
function decrypt(data, encryptionKey) {
  // Retrieve the IV from the beginning of the encrypted data
  const dataTmp = data.split(':');
  const iv = Buffer.from(dataTmp.shift(), 'hex');

  // Retrieve the data
  const encryptedData = Buffer.from(dataTmp.join(':'), 'hex');

  // Decipher
  const decipher = crypto.createDecipheriv(encryptionType, Buffer.from(encryptionKey), iv);

  // Decrypt the data
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = { encrypt, decrypt };
