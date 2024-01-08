const uuid = require('uuid');
const express = require('express');
const onFinished = require('on-finished');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const fs = require('fs');
const jsonWebToken = require('jsonwebtoken')
const axios = require('axios')

const CLIENT_ID = 'MaMofmHMvlLkgmcAPiuYoKVANd5G1rPw'
const CLIENT_SECRET = '7cYPsb7oiXjY27GopxjjEozjwKbxeJFhG3SPXKYzwrkQLSPIijEAshQueWbel53z'
const URL = 'https://dev-o64lwhkf.us.auth0.com/'
const AUDIENCE = 'https://dev-o64lwhkf.us.auth0.com/api/v2/'
const GRANT_TYPE = 'http://auth0.com/oauth/grant-type/password-realm'
const SESSION_KEY = 'Authorization'

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', verifyJsonWebToken, (req, res) => {
    res.json({
        username: req.user.username,
        logout: 'http://localhost:3000/logout'
    });
})

app.get('/logout', (req, res) => {
    res.redirect('/')
});

function verifyJsonWebToken(req, res, next) {
    const token = req.header('Authorization')
    if (!token)
        return res.sendFile(path.join(__dirname + '/index.html'))
    jsonWebToken.verify(
        token,
        'secret',
        (err, decoded) => {
            if (err)
                return res.sendFile(path.join(__dirname + '/index.html'))
            req.user = decoded
            next()
        }
    )
}

app.get('/create-user', (req, res) => {
    return res.sendFile(path.join(__dirname + '/create-user.html'));
});

const users = [
    {
        login: 'Login',
        password: 'Password',
        username: 'Username',
    },
    {
        login: 'Login1',
        password: 'Password1',
        username: 'Username1',
    }
]

app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;

    try {
        const resp = await axios.post('$oauth/token', {
            audience: AUDIENCE,
            grant_type: GRANT_TYPE,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            scope: 'offline_access',
            realm: 'Username-Password-Authentication',
            username: login,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        res.status(201).json({
            access_token: resp.data.access_token,
            refresh_token: resp.data.refresh_token,
            username: login
        })
    } catch (err) {
        res.status(401).json({
            error: err.response.data
        })
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
