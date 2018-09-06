import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPosts, addPost } from '../../actions/postActions';
import isEmpty from '../../validation/is-empty';

import PostForm from './PostForm';

import Spinner from '../common/Spinner';
import PostFeed from './PostFeed';

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ''
		};
	}

	componentDidMount() {
		this.props.getPosts();
	}

	static getDerivedStateFromProps(props, state) {
		if (props.errors) {
			state.error = props.errors.text;
		}

		return state;
	}

	render() {
		const { posts, user, addPost, loading, profile } = this.props;
		const content = loading ? (
			<Spinner />
		) : (
			<div className="col-md-12">
				{!isEmpty(profile) && (
					<PostForm
						handleSubmit={data => addPost(data)}
						user={user}
						error={this.state.error}
					/>
				)}
				{!isEmpty(posts) && <PostFeed posts={posts} />}
			</div>
		);
		return (
			<div className="feed">
				<div className="container">
					<div className="row">{content}</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	posts: PropTypes.array,
	post: PropTypes.object,
	loading: PropTypes.bool,
	errors: PropTypes.object,
	user: PropTypes.object,
	getPosts: PropTypes.func,
	addPost: PropTypes.func,

	profile: PropTypes.object
};

const mapStateToProps = state => ({
	posts: state.post.posts,
	post: state.post.post,
	loading: state.post.loading,
	errors: state.errors,
	user: state.auth.user,
	profile: state.profile.profile
});

export default connect(
	mapStateToProps,
	{ getPosts, addPost }
)(Posts);
