const uuid = require('uuid');
const express = require('express');
const onFinished = require('on-finished');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const fs = require('fs');
const jsonWebToken = require('jsonwebtoken')

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

app.post('/api/login', (req, res) => {
    const { login, password } = req.body;

    const user = users.find((user) => {
        return user.login === login && user.password === password;
    });

    if (user) {
        const token = jsonWebToken.sign(
            {
                username: user.username,
                login: user.login
            },
            'secret'
        )
        res.json({ token });
    } else
        res.status(401).send();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
