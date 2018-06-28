import React, { Component } from 'react';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

export default class App extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<h2>React App Boilerplate</h2>
				<Footer />
			</div>
		);
	}
}
