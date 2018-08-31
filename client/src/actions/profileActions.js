import axios from 'axios';
import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER
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
export const clearCurrentProfile = () => ({
	type: CLEAR_CURRENT_PROFILE
});

// Delete Account
export const deleteAccount = () => dispatch => {
	if (
		window.confirm(
			'Are you sure? This will erase all data and can\'t be undone!'
		)
	) {
		axios
			.delete('api/profile')
			.then(() => {
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				});
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				});
			});
	}
};

// Add Experience
export const addExperience = (experienceData, history) => dispatch => {
	axios
		.post('api/profile/experience', experienceData)
		.then(() => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
// Add Experience
export const addEducation = (educationData, history) => dispatch => {
	axios
		.post('api/profile/education', educationData)
		.then(() => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Delete Experience

export const deleteExperience = id => dispatch => {
	axios
		.delete(`api/profile/experience/${id}`)
		.then(res =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
