import actionTypes from '../actionTypes';

export const buttonClicked = () => {
	return (dispatch) => {
		dispatch({ type: actionTypes.BUTTON_CLICKED });
	}
};
