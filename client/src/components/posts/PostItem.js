import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	deletePost,
	addLike,
	removeLike,
	addLikeFromPost,
	removeLikeFromPost
} from '../../actions/postActions';

class PostItem extends Component {
	onLikeClick = id => {
		this.props.showActions
			? this.props.addLike(id)
			: this.props.addLikeFromPost(id);
	};

	onUnlikeClick = id => {
		this.props.showActions
			? this.props.removeLike(id)
			: this.props.removeLikeFromPost(id);
	};

	findUserLike(likes) {
		const { user } = this.props;
		if (likes.filter(like => like.user === user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	}
	render() {
		const { post, showActions, user, deletePost } = this.props;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<Link to={`/profile/${post.handle}`}>
							<img
								className="rounded-circle d-none d-md-block"
								src={post.avatar}
								alt=""
							/>
						</Link>
						<br />
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>

						<button
							type="button"
							className="btn btn-light mr-1"
							onClick={() => this.onLikeClick(post._id)}>
							<i
								className={`fas fa-thumbs-up ${this.findUserLike(post.likes) &&
									'text-info'}`}
							/>
							<span className="badge badge-light">{post.likes.length}</span>
						</button>
						<button
							type="button"
							className="btn btn-light mr-1"
							onClick={() => this.onUnlikeClick(post._id)}>
							<i className="text-secondary fas fa-thumbs-down" />
						</button>
						{showActions && (
							<span>
								<Link to={`/feed/${post._id}`} className="btn btn-info mr-1">
									Comments
								</Link>

								{post.user === user._id && (
									<button
										type="button"
										className="btn btn-danger mr-1"
										onClick={() => deletePost(post._id)}>
										<i className="fas fa-times" />
									</button>
								)}
							</span>
						)}
					</div>
				</div>
			</div>
		);
	}
}
PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	showActions: PropTypes.bool,

	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	addLikeFromPost: PropTypes.func,
	removeLikeFromPost: PropTypes.func
};

PostItem.defaultProps = {
	showActions: true
};

const mapStateToProps = state => ({
	user: state.auth.user
});

export default connect(
	mapStateToProps,
	{ deletePost, addLike, removeLike, addLikeFromPost, removeLikeFromPost }
)(PostItem);
