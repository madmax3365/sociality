import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = props => {
	return (
		<div className="form-group">
			<input
				type={props.type}
				className={
					props.error
						? 'form-control form-control-lg is-invalid'
						: 'form-control form-control-lg'
				}
				placeholder={props.placeholder}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
			/>
			{props.info && (
				<small className="form-text text-muted">{props.info}</small>
			)}
			{props.error && <div className="invalid-feedback">{props.error}</div>}
		</div>
	);
};

TextFieldGroup.propTypes = {
	type: PropTypes.string.isRequired,
	error: PropTypes.string,
	placeholder: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	info: PropTypes.string
};

TextFieldGroup.defaultProps = {
	type: 'text'
};

export default TextFieldGroup;
