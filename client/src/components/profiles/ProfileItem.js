import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import isEmpty from '../../validation/is-empty';

const ProfileItem = props => {
	const content = !isEmpty(props.profiles) ? (
		props.profiles.map(profile => {
			const user = profile.user;
			const experience = profile.experience;
			const currentJob = !isEmpty(experience)
				? experience.filter(item => item.current)
				: null;
			const skills = profile.skills.map(skill => (
				<li className="list-group-item" key={skill}>
					<i className="fa fa-check pr-1" />
					{skill}
				</li>
			));
			return (
				<div className="card card-body bg-light mb-3" key={profile._id}>
					<div className="row">
						<div className="col-2">
							<img className="rounded-circle" src={user.avatar} alt="" />
						</div>
						<div className="col-lg-6 col-md-4 col-8">
							<h3>{user.name}</h3>
							<p>
								{!isEmpty(currentJob)
									? `${currentJob[0].title} at ${currentJob[0].company}`
									: `${profile.status} ${profile.company &&
											`at ${profile.company}`}`}
							</p>
							<p>
								{!isEmpty(currentJob)
									? currentJob[0].location
									: profile.location}
							</p>
							<Link to={`/profile/${profile.handle}`} className="btn btn-info">
								View Profile
							</Link>
						</div>
						<div className="col-md-4 d-none d-lg-block">
							<h4>Skill Set</h4>
							<ul className="list-group">{skills}</ul>
						</div>
					</div>
				</div>
			);
		})
	) : (
		<h3>No profiles found</h3>
	);
	return content;
};

ProfileItem.propTypes = {
	profiles: PropTypes.array
};

export default ProfileItem;
