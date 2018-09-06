const express = require('express');
const router = express.Router();
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) =>
	res.json({
		msg: 'Posts works!'
	})
);

// Get posts
router.get('/', (req, res) => {
	Post.find()
		.sort({
			date: -1
		})
		.then(posts => res.json(posts))
		.catch(err => {
			err.notfound = 'No posts found';
			res.status(404).json(err);
		});
});

// Get post by id
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(err => {
			err.notfound = 'No post found for that id';
			res.status(404).json(err);
		});
});

// Create post
router.post(
	'/',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id,
			handle: req.body.handle
		});
		newPost.save().then(post => res.json(post));
	}
);

// Delete post
router.delete(
	'/:id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		Profile.findOne({
			user: req.user.id
		}).then(profile => {
			Post.findById(req.params.id).then(post => {
				if (post.user.toString() !== req.user.id) {
					return res.status(401).json({
						notauthorized: 'Permission denied'
					});
				}
				post
					.remove()
					.then(() =>
						res.json({
							success: true
						})
					)
					.catch(err => {
						err.notfound = 'Post not found';
						res.status(404).json(err);
					});
			});
		});
	}
);

// Like post
router.post(
	'/like/:id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		Profile.findOne({
			user: req.user.id
		}).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length > 0
					) {
						return res.status(400).json({
							alreadyliked: 'User already liked the post'
						});
					}
					post.likes.unshift({
						user: req.user.id
					});
					post.save().then(post => res.json(post));
				})
				.catch(err => {
					err.notfound = 'Post not found';
					res.status(404).json(err);
				});
		});
	}
);

// Dislike post
router.post(
	'/unlike/:id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		Profile.findOne({
			user: req.user.id
		}).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (
						post.likes.filter(like => like.user.toString() === req.user.id)
							.length === 0
					) {
						return res.status(400).json({
							notlikedyet: 'User not liked the post yet'
						});
					}
					const deleteIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);
					post.likes.splice(deleteIndex, 1);
					post.save().then(post => res.json(post));
				})
				.catch(err => {
					err.notfound = 'Post not found';
					res.status(404).json(err);
				});
		});
	}
);

// Add comment
router.post(
	'/comment/:id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}
		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};
				post.comments.unshift(newComment);
				post.save().then(post => res.json(post));
			})
			.catch(err => {
				err.notfound = 'Post not found';
				return res.status(404).json(err);
			});
	}
);

// Delete comment
router.delete(
	'/comment/:id/:comment_id',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				if (
					post.comments.filter(
						comment => comment._id.toString() === req.params.comment_id
					).length === 0
				) {
					return res.status(404).json({
						commentnotexists: 'Comment does not exist'
					});
				}

				const removeIndex = post.comments
					.map(item => item._id.toString())
					.indexOf(req.params.comment_id);

				post.comments.splice(removeIndex, 1);

				post.save().then(post => res.json(post));
			})
			.catch(err =>
				res.status(404).json({
					postnotfound: 'No post found'
				})
			);
	}
);
module.exports = router;
