import { applyMiddleware, combineReducers, createStore, EmptyObject } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";

const reducers = combineReducers({
	user: userReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
export type TstoreState = EmptyObject & {
	user: {
		isAuth: boolean,
		user: {
			id?: string,
			email?: string,
			name?: string,
			contacts?: [Tcontact]
		}
	 };
}

