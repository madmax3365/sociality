import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
	componentDidMount() {
		if (!this.props.auth.isAuthenticated) {
			this.props.history.push('/login');
		}
		this.props.getCurrentProfile();
	}
	render() {
		return (
			<div>
				<h1>Dashboard</h1>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		profile: state.profile,
		auth: state.auth
	};
};

Dashboard.propTypes = {
	profile: PropTypes.object,
	getCurrentProfile: PropTypes.func,
	history: PropTypes.object
};

export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(Dashboard);
