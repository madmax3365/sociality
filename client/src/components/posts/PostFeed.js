import React from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';

const PostFeed = props => {
	const { posts } = props;
	const content = posts.map(post => <PostItem post={post} key={post._id} />);
	return <div className="posts">{content}</div>;
};

PostFeed.propTypes = {
	posts: PropTypes.array.isRequired,

	showActions: PropTypes.bool
};

export default PostFeed;
