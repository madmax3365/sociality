import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAllProfiles } from '../../actions/profileActions';

import ProfileItem from './ProfileItem';
import Spinner from '../common/Spinner';

class Profiles extends Component {
	componentDidMount() {
		this.props.getAllProfiles();
	}
	render() {
		return this.props.profile.loading ? (
			<Spinner />
		) : (
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4 text-center">Developer Profiles</h1>
							<p className="lead text-center">
								Browse and connect with developers
							</p>

							<ProfileItem profiles={this.props.profile.profiles} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	getAllProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getAllProfiles }
)(Profiles);
