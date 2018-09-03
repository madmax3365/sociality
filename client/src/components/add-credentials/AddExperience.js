import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addExperience } from '../../actions/profileActions';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaGroup from '../common/TextAreaGroup';

class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			company: '',
			location: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {},
			disabled: false
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
		const expData = {
			title: this.state.title,
			company: this.state.company,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};
		this.props.addExperience(expData, this.props.history);
	};

	handleChange = e => this.setState({ [e.target.name]: e.target.value });
	handleCheck = () =>
		this.setState({
			current: !this.state.current,
			disabled: !this.state.disabled
		});
	render() {
		const {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
			disabled,
			errors
		} = this.state;
		return (
			<div className="section add-experience">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
							</Link>

							<h1 className="display-4 text-center">Add Your Experience</h1>
							<p className="lead text-center">
								Add any developer/programming positions that you have had in the
								past
							</p>
							<small className="d-block pb-3">* = required field</small>
							<form onSubmit={this.handleSubmit}>
								<TextFieldGroup
									onChange={this.handleChange}
									value={title}
									placeholder="* Job Title"
									name="title"
									error={errors.title}
								/>
								<TextFieldGroup
									onChange={this.handleChange}
									value={company}
									placeholder="* Company"
									name="company"
									error={errors.company}
								/>
								<TextFieldGroup
									onChange={this.handleChange}
									value={location}
									placeholder="Location"
									name="location"
									error={errors.location}
								/>

								<h6>From Date</h6>
								<TextFieldGroup
									type="date"
									onChange={this.handleChange}
									value={from}
									name="from"
									error={errors.from}
								/>

								<h6>To Date</h6>
								<TextFieldGroup
									type="date"
									onChange={this.handleChange}
									value={to}
									name="to"
									error={errors.to}
									disabled={disabled ? 'disabled' : ''}
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
									placeholder="Job Description"
									name="description"
									onChange={this.handleChange}
									value={description}
									error={errors.description}
									info="Some of your responsabilities, etc"
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
AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ addExperience }
)(withRouter(AddExperience));
