import React from 'react';
import isEmpty from '../../validation/is-empty';

const ProfileHeader = props => {
	const profile = props.profile;
	const user = profile.user;
	const experience = profile.experience;
	const currentJob = !isEmpty(experience)
		? experience.filter(item => item.current)
		: null;
	const social = [];
	for (const title in profile.social) {
		const item = (
			<a className="text-white p-2" href={profile.social[title]} key={title}>
				<i className={`fab fa-${title} fa-2x`} />
			</a>
		);
		social.push(item);
	}

	return (
		<div className="row">
			<div className="col-md-12">
				<div className="card card-body bg-info text-white mb-3">
					<div className="row">
						<div className="col-4 col-md-3 m-auto">
							<img className="rounded-circle" src={user.avatar} alt="" />
						</div>
					</div>
					<div className="text-center">
						<h1 className="display-4 text-center">{user.name}</h1>
						<p className="lead text-center">
							{!isEmpty(currentJob)
								? `${currentJob[0].title} at ${currentJob[0].company}`
								: `${profile.status} ${profile.company &&
										`at ${profile.company}`}`}
						</p>
						<p>
							{!isEmpty(currentJob) ? currentJob[0].location : profile.location}
						</p>
						<p>
							{profile.website && (
								<a className="text-white p-2" href={profile.website}>
									<i className="fas fa-globe fa-2x" />
								</a>
							)}

							{social}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeader;
