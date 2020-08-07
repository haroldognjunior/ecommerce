const server = require('express').Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;








server.post('/changepassword');

server.post('/login')

server.get('/logout', function(req, res) {
    res.send('22');
});

server.post('/register');

server.get('/me');

server.put('/promote');

module.exports = server;