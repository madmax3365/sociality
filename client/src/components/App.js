import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
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
import PrivateRoute from './common/PrivateRoute';
import CreateProfile from './create-profile/CreateProfile';

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
				<Router>
					<div>
						<Navbar history={history} />
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute
								exact
								path="/create-profile"
								component={CreateProfile}
							/>
						</Switch>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}
