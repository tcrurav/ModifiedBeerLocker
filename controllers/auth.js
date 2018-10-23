var passport = require('passport');

var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('../models/user');

passport.use(new BasicStrategy(
    (username, password, callback) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return callback(err);

            if (!user) return callback(null, false);

            user.verifyPassword(password, (err, isMatch) => {
                if (err) return callback(err);

                if (!isMatch) return callback(null, false);

                return callback(null, user);
            });
        });
    }
));

passport.use('client-basic', new BasicStrategy(
    (username, password, callback) => {
        User.findOne({ id: username }, (err, client) => {
            if (err) return callback(err);

            if (!client || client.secret !== password) return callback(null, false);

            return callback(null, user);
        });
    }
));

passport.use(new BearerStrategy(
    function (accessToken, callback) {
        Token.findOne({ value: accessToken }, function (err, token) {
            if (err) { return callback(err); }

            // No token found
            if (!token) { return callback(null, false); }

            User.findOne({ _id: token.userId }, function (err, user) {
                if (err) { return callback(err); }

                // No user found
                if (!user) { return callback(null, false); }

                // Simple example with no scope
                callback(null, user, { scope: '*' });
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });

exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });

exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });