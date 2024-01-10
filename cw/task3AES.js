const cryptojs = require('crypto-js')

let data = '0222, valentyn serediuk, serediukit@gmail.com'
const privateKey = 'PRIVATE_KEY_SEREDIUK_VALENTYN'

const encryptedData = cryptojs.AES.encrypt(data, privateKey).toString();
console.log('Encrypted:', encryptedData);

const decryptedData = cryptojs.AES.decrypt(encryptedData, privateKey).toString(cryptojs.enc.Utf8);
console.log('Decrypted:', decryptedData);