let data = '0222, valentyn serediuk, serediukit@gmail.com'

const encodedData = btoa(data);
console.log("Encoded: ", encodedData);

const decodedData = atob(encodedData);
console.log("Decoded: ", decodedData);