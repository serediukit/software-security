const crypto = require('crypto')

const data = '0222, valentyn serediuk, serediukit@gmail.com'

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
});

console.log('PUBLIC KEY: ', publicKey);
console.log('PRIVATE KEY: ', privateKey);

const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data)).toString('base64')
console.log('Encrypted:', encryptedData);

const decryptedData = crypto.privateDecrypt(privateKey, Buffer.from(encryptedData, 'base64')).toString()
console.log('Decrypted:', decryptedData);