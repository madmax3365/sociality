const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

router.get('/test', (req, res) => res.json({
	msg: 'Profile works!'
}));

// Get user's profile

router.get('/', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	const errors = {};

	Profile.findOne({
			user: req.user.id
		}).populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		});
});

// Route method for profile creating  or editing
router.post(
	'/',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		const {
			errors,
			isValid
		} = validateProfileInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		// Get fields
		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.handle) profileFields.handle = req.body.handle;
		if (req.body.company) profileFields.company = req.body.company;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.location) profileFields.location = req.body.location;
		if (req.body.bio) profileFields.bio = req.body.bio;
		if (req.body.status) profileFields.status = req.body.status;
		if (req.body.githubusername)
			profileFields.githubusername = req.body.githubusername;
		// Skills - Spilt into array
		if (typeof req.body.skills !== 'undefined') {
			profileFields.skills = req.body.skills.split(',');
		}

		// Social
		profileFields.social = {};
		if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
		if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
		if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
		if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

		Profile.findOne({
			user: req.user.id
		}).then(profile => {
			if (profile) {
				// Update
				Profile.findOneAndUpdate({
					user: req.user.id
				}, {
					$set: profileFields
				}, {
					new: true
				}).then(profile => res.json(profile));
			} else {
				// Create

				// Check if handle exists
				Profile.findOne({
					handle: profileFields.handle
				}).then(profile => {
					if (profile) {
						errors.handle = 'That handle already exists';
						res.status(400).json(errors);
					}

					// Save Profile
					new Profile(profileFields).save().then(profile => res.json(profile));
				});
			}
		});
	}
);


// Get profile by handle
router.get('/handle/:handle', (req, res) => {
	Profile.findOne({
			handle: req.params.handle
		})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			const errors = {};
			if (!profile) {
				errors.noprofile = 'There is no profile for that user';
				return res.status(404).json(errors);
			}
			return res.json(profile);
		}).catch(err => res.status(404).json(err));
});
// Get profile by id
router.get('/user/:userId', (req, res) => {
	Profile.findOne({
			user: req.params.userId
		})
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			const errors = {};
			if (!profile) {
				errors.noprofile = 'There is no profile for that user';
				return res.status(404).json(errors);
			}
			return res.json(profile);
		}).catch(err => {
			err.noprofile = 'There is no profile for that user';
			res.status(404).json(err);
		});
});

// Get all profiles
router.get('/all', (req, res) => {
	Profile.find()
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			const errors = {};
			if (!profiles) {
				errors.noprofile = 'There are no profiles';
				return res.status(404).json(errors);
			}
			return res.json(profiles);
		}).catch(err => {
			err.noprofile = 'There are no profiles';
			return res.status(404).json(err);
		});
});

// Add experience
router.post('/experience', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	const {
		errors,
		isValid
	} = validateExperienceInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	Profile.findOne({
		user: req.user.id
	}).then(profile => {
		const newExp = {
			title: req.body.title,
			company: req.body.company,
			location: req.body.location,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description,
		};
		profile.experience.unshift(newExp);
		profile.save().then(profile => res.json(profile));
	});
});
// Add education
router.post('/education', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	const {
		errors,
		isValid
	} = validateEducationInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	Profile.findOne({
		user: req.user.id
	}).then(profile => {
		const newEdu = {
			school: req.body.school,
			degree: req.body.degree,
			fieldofstudy: req.body.fieldofstudy,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description,
		};
		profile.education.unshift(newEdu);
		profile.save().then(profile => res.json(profile));
	});
});


module.exports = router;