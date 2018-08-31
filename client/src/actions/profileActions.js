import axios from 'axios';
import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS
} from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get('api/profile/')
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(() =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};
// Set profile loading to true
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

// Create profile
export const createProfile = (profileData, history) => dispatch => {
	axios
		.post('api/profile', profileData)
		.then(() => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Clear current profile from state
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};