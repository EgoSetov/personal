import { EactionType } from '../action-type';
import { Taction } from './../actions/index';

const initialState: Tstate = {
	isAuth: false,
	user: null,
	contacts: []
}

const userReducer = (state = initialState, action: Taction) => {
	switch (action.type) {
		case EactionType.FILL_USER_DATA: {
			return {
				...state,
				isAuth: true,
				user: action.data
			}
		}
		case EactionType.FILL_CONTACTS: {
			return {
				...state,
				contacts: action.contacts
			}
		}
		default: {
			return state
		}
	}
}

export default userReducer