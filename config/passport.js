const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const mongoose = require('mongoose');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
	passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
		User.findById(jwtPayload.id)
			.then(user => {
				return user ? done(null, user) : done(null, false);
			});
	}));
};