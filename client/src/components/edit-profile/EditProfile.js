import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { createProfile, getCurrentProfile } from '../../actions/profileActions';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			githubusername: '',
			bio: '',
			skills: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			instagram: '',
			errors: {}
		};
	}
	componentDidMount() {
		this.props.getCurrentProfile();
		const profile = this.props.profile.profile;
		if (profile) {
			profile.handle = !isEmpty(profile.handle) ? profile.handle : '';
			profile.company = !isEmpty(profile.company) ? profile.company : '';
			profile.website = !isEmpty(profile.website) ? profile.website : '';
			profile.location = !isEmpty(profile.location) ? profile.location : '';
			profile.status = !isEmpty(profile.status) ? profile.status : '';
			profile.githubusername = !isEmpty(profile.githubusername)
				? profile.githubusername
				: '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
			profile.skills = !isEmpty(profile.skills) ? profile.skills.join(',') : '';
			profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : '';
			profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : '';
			profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : '';
			profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : '';
			profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : '';
			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				githubusername: profile.githubusername,
				bio: profile.bio,
				skills: profile.skills,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				youtube: profile.youtube,
				instagram: profile.instagram
			});
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (props.errors) {
			state.errors = props.errors;
		}

		return state;
	}

	handleSubmit = e => {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			skills: this.state.skills,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};
		this.props.createProfile(profileData, this.props.history);
	};

	toggleSocial = e => {
		e.preventDefault();
		this.setState({ displaySocialInputs: !this.state.displaySocialInputs });
	};
	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	render() {
		const { errors, displaySocialInputs } = this.state;
		const options = [
			{ label: '* Select Professional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' }
		];
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Edit Profile</h1>
							<p className="lead text-center">
								{'Let\'s'} get some information to make your profile stand out
							</p>
							<small className="d-block pb-3">* = required field</small>
							<form onSubmit={this.handleSubmit}>
								<TextFieldGroup
									placeholder="* Profile handle"
									name="handle"
									value={this.state.handle}
									onChange={this.handleChange}
									error={errors.handle}
									info={
										'A unique handle for your profile URL. Your full name,	company name, nickname, etc (This CAN\'T be changed	later)'
									}
								/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.handleChange}
									options={options}
									error={errors.status}
									info="Give us an idea of where you are at in your career"
								/>

								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.handleChange}
									error={errors.company}
									info="Could be your own company or one you work for"
								/>
								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.handleChange}
									error={errors.website}
									info="Could be your own or a company website"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.handleChange}
									error={errors.location}
									info="City & state suggested (eg. Yerevan, YE)"
								/>
								<TextFieldGroup
									placeholder="Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.handleChange}
									error={errors.skills}
									info="Please use comma separated values (eg.
										HTML,CSS,JavaScript,PHP)"
								/>
								<TextFieldGroup
									placeholder="Github Username"
									name="githubusername"
									value={this.state.githubusername}
									onChange={this.handleChange}
									error={errors.githubusername}
									info="If you want your latest repos and a Github link, include
									your username"
								/>
								<TextAreaGroup
									placeholder="A short bio of yourself"
									name="bio"
									value={this.state.bio}
									onChange={this.handleChange}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>
								<div className="mb-3">
									<button
										type="button"
										className="btn btn-light"
										onClick={this.toggleSocial}>
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>

								{displaySocialInputs && (
									<div>
										<InputGroup
											placeholder="Twitter Profile URL"
											name="twitter"
											icon="fab fa-twitter"
											value={this.state.twitter}
											onChange={this.handleChange}
											error={errors.twitter}
										/>

										<InputGroup
											placeholder="Facebook Page URL"
											name="facebook"
											icon="fab fa-facebook"
											value={this.state.facebook}
											onChange={this.handleChange}
											error={errors.facebook}
										/>

										<InputGroup
											placeholder="Linkedin Profile URL"
											name="linkedin"
											icon="fab fa-linkedin"
											value={this.state.linkedin}
											onChange={this.handleChange}
											error={errors.linkedin}
										/>

										<InputGroup
											placeholder="YouTube Channel URL"
											name="youtube"
											icon="fab fa-youtube"
											value={this.state.youtube}
											onChange={this.handleChange}
											error={errors.youtube}
										/>

										<InputGroup
											placeholder="Instagram Page URL"
											name="instagram"
											icon="fab fa-instagram"
											value={this.state.instagram}
											onChange={this.handleChange}
											error={errors.instagram}
										/>
									</div>
								)}
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
	errors: state.errors
});

CreateProfile.propTypes = {
	profile: PropTypes.object,
	history: PropTypes.object,
	auth: PropTypes.object,
	errors: PropTypes.object,
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps,
	{ createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
