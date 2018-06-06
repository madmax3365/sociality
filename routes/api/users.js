const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/User');
const keys = require('../../config/keys');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/test', (req, res) =>
	res.json({
		msg: 'Users works!'
	})
);

// Route method for Register
router.post('/register', (req, res) => {
	const {
		errors,
		isValid
	} = validateRegisterInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({
		email: req.body.email
	}).then(user => {
		if (user) {
			errors.email = 'User already exists';
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200', // Size
				r: 'pg', // Rating
				d: 'mm' // Default
			});
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				avatar
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => res.status(400).json(err));
				});
			});
		}
	});
});

// Route method for Login
router.post('/login', (req, res) => {
	const {
		errors,
		isValid
	} = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const {
		email,
		password
	} = req.body;

	User.findOne({
		email
	}).then(user => {
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}
		bcrypt.compare(password, user.password).then(match => {
			if (match) {
				// JWT payload
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				};

				// JWT sign
				jwt.sign(
					payload,
					keys.secret, {
						expiresIn: 3600
					},
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				errors.password = 'Incorrect password';
				return res.status(400).json(errors);
			}
		});
	});
});

// Passport protected route
router.get(
	'/current',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		res.json(req.user);
	}
);

module.exports = router;