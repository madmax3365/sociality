import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './history';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';

import store from '../store';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Landing from './layout/Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import '../App.css';
import Dashboard from './dashboard/Dashboard';
import { clearCurrentProfile } from '../actions/profileActions';

if (localStorage.jwToken) {
	setAuthToken(localStorage.jwToken);
	const decoded = jwt_decode(localStorage.jwToken);
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentDate = Date.now() / 1000;
	if (decoded.exp < currentDate) {
		store.dispatch(logoutUser());
		store.dispatch(clearCurrentProfile());
		window.location.href('/login');
	}
}

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<div>
						<Navbar history={history} />
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}
