import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileGit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientId: '4a92021aec0cb80981cc',
			clientSecret: '76e9ee979ba2f078fdf1dad880e2f365878af332',
			sort: 'created:desc',
			count: 5,
			repos: []
		};
	}
	componentDidMount() {
		const { username } = this.props;
		const { clientId, clientSecret, count, sort } = this.state;
		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
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
								<Link to={repo.html_url} className="text-info" target="_blank">
									{repo.name}
								</Link>
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
		console.log(repos);
		return (
			<div>
				<hr />
				<h3 className="mb-4">Latest Github Repos</h3>
				{content}
			</div>
		);
	}
}

export default ProfileGit;
