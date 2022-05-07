import { EactionType } from '../action-type';
import { Taction } from './../actions/index';

const initialState: TitemsSearch = {
	items: []
}

const searchReducer = (state = initialState, action: Taction) => {
	switch (action.type) {
		case EactionType.FILL_SEARCH_ITEMS: {
			return{
				...state,
				items: action.items
			}
		}
		default: {
			return state
		}
	}
}

export default searchReducer