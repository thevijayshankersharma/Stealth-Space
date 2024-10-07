const CryptoJS = require('crypto-js');

const secretKey = process.env.ENCRYPTION_KEY || 'default-secret-key';

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };