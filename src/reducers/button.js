import actionTypes from '../actionTypes';

const initialState = {
	totalClick: 0
}

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.BUTTON_CLICKED:
			return { ...state, totalClick: state.totalClick + 1 }
		default: return state;
	}
}
