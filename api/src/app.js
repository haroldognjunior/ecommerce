const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const morgan = require('morgan');
const cors = require('cors')
const { User } = require('./models');
const passport = require('passport');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;


require('./models');

const server = express();

server.name = 'API';
// server.use(cors())
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(session({
    name: "Conectado",
    secret: 'mi ultra secreto',
    resave: false,
    saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());


passport.use(new PassportLocal({
        usernameField: 'nombreUser',
        passwordField: 'contraUser'
    },
    function(username, password, done) {
        User.findOne({
                where: {
                    nombreUser: username,
                }
            })
            .then((user) => {
                if (user === null) {
                    return done(null, false, { message: "El usuario no existe" })
                }
                if (user.contraUser !== password) {
                    return done(null, false, { message: "Contraseña incorrecta" })
                }
                return done(null, user);
            })
            .catch(err => {
                done(err);
            })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.idUser);
});

passport.deserializeUser(function(id, done) {
    User.findByPk(id)
        .then(user => {
            done(null, user)

        })
        .catch(err => {
            done(err);
        })

});


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;