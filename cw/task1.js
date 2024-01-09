const username = 'serediuk';
const password = '0222';

const base64Credentials = btoa(username + ':' + password);
const authorizationHeader = 'Basic ' + base64Credentials;

console.log('Base64 credentials: ' + base64Credentials)
console.log('Header: ' + authorizationHeader)

const url = 'http://localhost:3000';

fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': authorizationHeader
    }
})
    .then(response => response.json())
    .then(data => {
        console.log('Get data', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
