import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
	}
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	static getDerivedStateFromProps(props, state) {
		props.errors ? (state.errors = props.errors) : {};
		return state;
	}
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = e => {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		this.props.registerUser(newUser, this.props.history);
	};

	render() {
		const { errors } = this.state;
		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">Create your Sociality account</p>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										className={
											errors.name
												? 'form-control form-control-lg is-invalid'
												: 'form-control form-control-lg'
										}
										placeholder="Name"
										name="name"
										onChange={this.handleChange}
										value={this.state.name}
									/>
									{errors.name && (
										<div className="invalid-feedback">{errors.name}</div>
									)}
								</div>
								<TextFieldGroup
									type="email"
									placeholder="Email Address"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
									error={errors.email}
									info="This site uses Gravatar so if you want a profile image, use
									a Gravatar email"
								/>
								<TextFieldGroup
									type="password"
									placeholder="Password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
									error={errors.password}
								/>
								<TextFieldGroup
									type="password"
									placeholder="Confirm Password"
									name="password2"
									onChange={this.handleChange}
									value={this.state.password2}
									error={errors.password2}
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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
