import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';

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

// Clear current profile from state
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};
