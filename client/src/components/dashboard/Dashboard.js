import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;
		let content;
		if (profile === null || loading) {
			content = <Spinner />;
		} else {
			if (!isEmpty(profile)) {
				content = <h4>Display profile</h4>;
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
	history: PropTypes.object.isRequired
};

export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(Dashboard);
