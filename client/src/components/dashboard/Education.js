import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';

const Education = props => {
	const content = !isEmpty(props.education) ? (
		props.education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
					{edu.to === null ? (
						'Now'
					) : (
						<Moment format="YYYY/MM/DD">{edu.to}</Moment>
					)}
				</td>
				<td>
					<button
						className="btn btn-danger"
						type="button"
						onClick={() => props.handleDelete(edu._id)}>
						Delete
					</button>
				</td>
			</tr>
		))
	) : (
		<h5>
			You haven
			{'\''}t added education information yet
		</h5>
	);
	return (
		<div>
			<h4 className="mb-2">Education Credentials</h4>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th>Degree</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{content}</tbody>
			</table>
		</div>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	handleDelete: PropTypes.func.isRequired
};

export default Education;
