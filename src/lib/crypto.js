const crypto = require('crypto');

function generateIv() {
  return crypto.randomBytes(32);
}

const algorithm = 'AES-256-GCM';

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
  const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);

  // Encrypt the data
  const encryptedData = Buffer.concat([
    cipher.update(Buffer.from(data, 'utf-8')),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  // Embedded IV with the encrypted secret
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encryptedData.toString('hex')}`;
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
  const authTag = Buffer.from(encryptedData.shift(), 'hex');

  // Retrieve the secret
  const encryptedSecret = Buffer.from(encryptedData.join(':'), 'hex');

  // Decipher
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
  decipher.setAuthTag(authTag);

  // Decrypt the data
  const decrypted = Buffer.concat([
    decipher.update(encryptedSecret),
    decipher.final(),
  ]);

  return decrypted.toString('utf-8');
}

module.exports = { encrypt, decrypt };
