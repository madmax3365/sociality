import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

const Experience = props => {
	const experience = !isEmpty(props.experience) ? (
		props.experience.map(exp => (
			<tr key={exp._id}>
				<td>{exp.company}</td>
				<td>{exp.title}</td>
				<td>
					<Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
					{exp.to === null ? (
						'Now'
					) : (
						<Moment format="YYYY/MM/DD">{exp.to}</Moment>
					)}
				</td>
				<td>
					<button
						type="button"
						onClick={() => props.handleDelete(exp._id)}
						className="btn btn-danger">
						Delete
					</button>
				</td>
			</tr>
		))
	) : (
		<tr>
			<td>
				<h5>
					You haven
					{'\''}t added experience yet
				</h5>
			</td>
		</tr>
	);
	return (
		<div>
			<h4 className="mb-2">Experience Credentials</h4>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th>Title</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experience}</tbody>
			</table>
		</div>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	handleDelete: PropTypes.func.isRequired
};

export default Experience;
