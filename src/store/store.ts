import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import searchReducer from "./reducers/searchReducer";
import userReducer from "./reducers/userReducer";

const reducers = combineReducers({
	user: userReducer,
	search: searchReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
export type TstoreState = ReturnType<typeof reducers>