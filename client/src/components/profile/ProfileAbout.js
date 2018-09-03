import React from 'react';
import isEmpty from '../../validation/is-empty';

const ProfileAbout = props => {
	const profile = props.profile;
	const skills = isEmpty(profile.skills)
		? null
		: profile.skills.map(item => (
				<div className="p-3" key={item}>
					<i className="fa fa-check" /> {item}
				</div>
		  ));
	return (
		<div className="row">
			<div className="col-md-12">
				<div className="card card-body bg-light mb-3">
					<h3 className="text-center text-info">{`${profile.handle}'s Bio`}</h3>
					<p className="lead">{profile.bio}</p>
					<hr />
					<h3 className="text-center text-info">Skill Set</h3>
					<div className="row">
						<div className="d-flex flex-wrap justify-content-center align-items-center">
							{skills}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileAbout;
