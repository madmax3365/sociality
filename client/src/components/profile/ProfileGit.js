import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileGit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientId: '4a92021aec0cb80981cc',
			clientSecret: '76e9ee979ba2f078fdf1dad880e2f365878af332',
			count: 5,
			repos: []
		};
	}
	componentDidMount() {
		const { username } = this.props;
		const { clientId, clientSecret, count } = this.state;
		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=updated&order=desc&client_id=${clientId}&client_secret=${clientSecret}`
		)
			.then(res => res.json())
			.then(data => this.setState({ repos: data }))
			.catch(err => console.log(err));
	}
	render() {
		const { repos } = this.state;
		const content = isEmpty(repos) ? (
			<h3>Loading ...</h3>
		) : (
			repos.map(repo => (
				<div key={repo.id} className="card card-body mb-2">
					<div className="row">
						<div className="col-md-6">
							<h4>
								<a
									href={repo.html_url}
									className="text-info"
									rel="noopener noreferrer"
									target="_blank">
									{repo.name}
								</a>
							</h4>
							<p>{repo.description}</p>
						</div>
						<div className="col-md-6">
							<span className="badge badge-info mr-1">
								Stars: {repo.stargazers_count}
							</span>
							<span className="badge badge-secondary mr-1">
								Watchers: {repo.watchers}
							</span>
							<span className="badge badge-success">Forks: {repo.forks}</span>
						</div>
					</div>
				</div>
			))
		);

		return (
			<div>
				<hr />
				<h3 className="mb-4">Latest Github Repos</h3>
				{content}
			</div>
		);
	}
}
ProfileGit.propTypes = {
	username: PropTypes.string
};

export default ProfileGit;
