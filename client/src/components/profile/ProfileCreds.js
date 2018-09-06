import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import isEmpty from '../../validation/is-empty';

const ProfileCreds = props => {
	const profile = props.profile;
	const experience = isEmpty(profile.experience) ? null : (
		<div className="col-md-6">
			<h3 className="text-center text-info">Experience</h3>
			<ul className="list-group">
				{' '}
				{profile.experience.map(item => (
					<li className="list-group-item" key={item._id}>
						<h4>{item.company}</h4>
						<p>
							<Moment format="YYYY/MM/DD">{item.from}</Moment> -{' '}
							{item.to === null ? (
								'Current'
							) : (
								<Moment format="YYYY/MM/DD">{item.to}</Moment>
							)}
						</p>
						<p>
							<strong>Position:</strong> {item.title}
						</p>
						{item.description && (
							<p>
								<strong>Description:</strong> {item.description}
							</p>
						)}
					</li>
				))}{' '}
			</ul>
		</div>
	);
	const education = isEmpty(profile.education) ? null : (
		<div className="col-md-6">
			<h3 className="text-center text-info">Education</h3>

			<ul className="list-group">
				{profile.education.map(item => (
					<li className="list-group-item" key={item._id}>
						<h4>{item.school}</h4>
						<p>
							<Moment format="YYYY/MM/DD">{item.from}</Moment> -{' '}
							{item.to === null ? (
								'Current'
							) : (
								<Moment format="YYYY/MM/DD">{item.to}</Moment>
							)}
						</p>

						{item.degree && (
							<p>
								<strong>Degree: </strong>
								{item.degree}
							</p>
						)}
						{item.fieldofstudy && (
							<p>
								<strong>Field Of Study: </strong>
								{item.fieldofstudy}
							</p>
						)}

						{item.description && (
							<p>
								<strong>Description:</strong> {item.description}
							</p>
						)}
					</li>
				))}
			</ul>
		</div>
	);
	return (
		<div className="row">
			{experience}

			{education}
		</div>
	);
};
ProfileCreds.propTypes = {
	profile: PropTypes.object
};

export default ProfileCreds;
