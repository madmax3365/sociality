import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	getCurrentProfile,
	deleteAccount,
	deleteExperience,
	deleteEducation
} from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	deleteExp = id => this.props.deleteExperience(id);

	deleteEdu = id => this.props.deleteEducation(id);

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let content;
		if (profile === null || loading) {
			content = <Spinner />;
		} else {
			if (!isEmpty(profile)) {
				content = (
					<div>
						<p className="lead text-muted">
							Welcome{' '}
							<Link to={`/profile/${profile.handle}`}> {user.name} </Link>
						</p>
						<ProfileActions />
						<Experience
							experience={profile.experience}
							handleDelete={this.deleteExp}
						/>

						<Education
							education={profile.education}
							handleDelete={this.deleteEdu}
						/>
						<div style={{ marginTop: '60px' }} />
						<button
							onClick={() => this.props.deleteAccount()}
							className="btn btn-danger">
							Delete my account
						</button>
					</div>
				);
			} else {
				content = (
					<div>
						<p className="lead text-muted">Welcome {user.name}</p>
						<p>You have not yet setup a profile, please add some info</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">
							Create Profile
						</Link>
					</div>
				);
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
							{content}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

Dashboard.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	deleteExperience: PropTypes.func.isRequired,
	deleteEducation: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount, deleteExperience, deleteEducation }
)(Dashboard);
