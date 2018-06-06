const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateLogininput(data) {
	let errors = {};
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (Validator.isEmpty(data.email)) {
		errors.email = 'Login field required';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field required';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};