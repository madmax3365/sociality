import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
	axios
		.post('/api/users/register', userData)
		.then(() => history.push('/login'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Login - Get User JWT
export const loginUser = userData => dispatch => {
	axios
		.post('api/users/login', userData)
		.then(res => {
			const { token } = res.data;
			localStorage.setItem('jwToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set Current User
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// Log Out User
export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};
