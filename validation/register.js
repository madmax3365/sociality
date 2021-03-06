const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterinput(data) {
	let errors = {};
	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	if (
		!Validator.isLength(data.name, {
			min: 2,
			max: 30
		})
	) {
		errors.name = 'Name must be between 2 and 30 characters!';
	}
	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name field required';
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field required';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field required';
	}
	if (Validator.isEmpty(data.password2)) {
		errors.password = 'Password confirmation field required';
	}
	if (!Validator.isEmail(data.email)) {
		errors.email = 'Invalid email address';
	}
	if (
		!Validator.isLength(data.password, {
			min: 6,
			max: 12
		})
	) {
		errors.password = 'Password length must be at least 6 characters';
	}
	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords do not match';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
