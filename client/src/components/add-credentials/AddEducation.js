import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { addEducation } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			degree: '',
			fieldofstudy: '',
			from: '',
			to: '',
			current: false,
			disabled: false,
			description: '',
			errors: {}
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.errors) {
			state.errors = props.errors;
		}
		return state;
	}

	handleSubmit = e => {
		e.preventDefault();
		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};
		this.props.addEducation(eduData, this.props.history);
	};

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	handleCheck = () =>
		this.setState({
			current: !this.state.current,
			disabled: !this.state.disabled
		});

	render() {
		const {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			disabled,
			description,
			errors
		} = this.state;
		return (
			<div className="add-education">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Add Your Education</h1>
							<p className="lead text-center">
								Add any school, bootcamp, etc that you have attended
							</p>
							<small className="d-block pb-3">* = required field</small>
							<form onSubmit={this.handleSubmit}>
								<TextFieldGroup
									placeholder="* School Or Bootcamp"
									name="school"
									value={school}
									onChange={this.handleChange}
									error={errors.school}
								/>
								<TextFieldGroup
									placeholder="* Degree Or Certificate"
									name="degree"
									value={degree}
									onChange={this.handleChange}
									error={errors.degree}
								/>
								<TextFieldGroup
									placeholder="Field Of Study"
									name="fieldofstudy"
									value={fieldofstudy}
									onChange={this.handleChange}
									error={errors.fieldofstudy}
								/>

								<h6>From Date</h6>
								<TextFieldGroup
									name="from"
									type="date"
									value={from}
									onChange={this.handleChange}
									error={errors.from}
								/>
								<h6>To Date</h6>
								<TextFieldGroup
									name="to"
									type="date"
									value={to}
									onChange={this.handleChange}
									disabled={disabled ? 'disabled' : ''}
									error={errors.to}
								/>
								<div className="form-check mb-4">
									<input
										className="form-check-input"
										type="checkbox"
										name="current"
										value={current}
										checked={current}
										onChange={this.handleCheck}
										id="current"
									/>
									<label className="form-check-label" htmlFor="current">
										Current Job
									</label>
								</div>
								<TextAreaGroup
									placeholder="Program Description"
									name="description"
									value={description}
									onChange={this.handleChange}
									info="Tell us about your experience and what you learned"
								/>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ addEducation }
)(withRouter(AddEducation));
