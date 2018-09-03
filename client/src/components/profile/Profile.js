import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getProfileByHandle } from '../../actions/profileActions';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGit from './ProfileGit';
import isEmpty from '../../validation/is-empty';

class Profile extends Component {
	componentDidMount() {
		this.props.getProfileByHandle(this.props.match.params.handle);
	}
	render() {
		const empty = isEmpty(this.props.profile.profile);
		const notFound =
			isEmpty(this.props.profile.profile) &&
			this.props.profile.profile !== null;

		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="row">
								<div className="col-6">
									<Link
										to="/profiles"
										className="btn btn-light mb-3 float-left">
										Back To Profiles
									</Link>
								</div>
								<div className="col-6" />
							</div>
							{notFound && <h3>Profile not found</h3>}
							{!empty && <ProfileHeader profile={this.props.profile.profile} />}

							{!empty && <ProfileAbout profile={this.props.profile.profile} />}

							{!empty && <ProfileCreds profile={this.props.profile.profile} />}

							{!empty &&
								this.props.profile.profile.githubusername && (
									<ProfileGit
										username={this.props.profile.profile.githubusername}
									/>
								)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Profile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getProfileByHandle }
)(Profile);
