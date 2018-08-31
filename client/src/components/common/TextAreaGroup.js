import React from 'react';
import PropTypes from 'prop-types';

const TextAreaGroup = props => {
	return (
		<div className="form-group">
			<textarea
				className={
					props.error
						? 'form-control form-control-lg is-invalid'
						: 'form-control form-control-lg'
				}
				placeholder={props.placeholder}
				name={props.name}
				onChange={props.onChange}
				value={props.value}
			/>
			{props.info && (
				<small className="form-text text-muted">{props.info}</small>
			)}
			{props.error && <div className="invalid-feedback">{props.error}</div>}
		</div>
	);
};

TextAreaGroup.propTypes = {
	error: PropTypes.string,
	placeholder: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	info: PropTypes.string
};

export default TextAreaGroup;
