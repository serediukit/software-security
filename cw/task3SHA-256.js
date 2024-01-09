const crypto = require('crypto')

const data = '0222, valentyn serediuk, serediukit@gmail.com'

const sha256Hash = crypto.createHash('sha256')
sha256Hash.update(data)
const hashedData = sha256Hash.digest('hex')
console.log('SHA-256 data:', hashedData)