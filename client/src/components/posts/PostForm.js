import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profileActions';
import TextAreaGroup from '../common/TextAreaGroup';

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			error: ''
		};
	}
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	handleChange = e => this.setState({ message: e.target.value });

	handleSubmit = e => {
		e.preventDefault();
		const { user, profile } = this.props;
		this.props.handleSubmit({
			text: this.state.message,
			name: user.name,
			avatar: user.avatar,
			handle: profile.handle
		});
	};

	static getDerivedStateFromProps(props, state) {
		if (props.error) {
			state.error = props.error;
		}
		return state;
	}

	render() {
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Somthing...</div>
					<div className="card-body">
						<form>
							<TextAreaGroup
								placeholder="Create a post"
								name="post"
								value={this.state.message}
								onChange={this.handleChange}
								error={this.state.error}
							/>

							<button
								type="button"
								onClick={e => this.handleSubmit(e)}
								className="btn btn-dark">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile.profile
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(PostForm);
