import { TstoreState } from './../store';
import { Taction } from './../actions/index';
import { EactionType } from '../action-type/index';
import { Dispatch } from 'redux'
import { isError } from 'util';

export const addContactAC = (userId: number) => (dispatch: Dispatch) => dispatch({ type: EactionType.ADD_CONTACT, userId })
export const fillUserDataAC = (data: Tuser) => (dispatch: Dispatch) => dispatch({ type: EactionType.FILL_USER_DATA, data })
export const fillContactsAC = (contacts: [Tcontact]) => (dispatch: Dispatch) => dispatch({ type: EactionType.FILL_CONTACTS, contacts })

export const loginAsyncAC = (dataLogin: { email: string, password: string }) => async (dispatch: Dispatch<Taction>) => {
	try {
		const res = await fetch(`http://localhost:8000/login`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(dataLogin)
		})
			.then(data => data.json())


		if (res?.accessToken) {
			const token: string = res.accessToken
			const data: Tuser = res.user

			localStorage.setItem('token', token)
			dispatch({
				type: EactionType.FILL_USER_DATA,
				data: data
			})
			return true
		} else {
			return false
		}
	} catch (error) {
		return false
	}
}

export const getMyContactsAsyncAC = (id: number) => async (dispatch: Dispatch<Taction>) => {
	try {
		const res = await fetch(`http://localhost:8000/users/${id}`)
			.then(data => data.json())

		if (res.contacts.length) {

			const contacts: [Tcontact] = res.contacts || []

			dispatch({
				type: EactionType.FILL_CONTACTS,
				contacts
			})
		}

	} catch (error) {
		console.log(error);
		return false
	}
}

export const searchAsyncAC = (email: string) => async (dispatch: Dispatch<Taction>) => {
	try {
		const res = await fetch(`http://localhost:8000/users/?email=${email}`)
			.then(data => data.json())

		const items: [Tcontact] = res

		dispatch({
			type: EactionType.FILL_SEARCH_ITEMS,
			items
		})

	} catch (error) {
		console.log(error);
		return false
	}
}

export const addContactAsyncAC = (user: Tcontact) => async (dispatch: Dispatch<Taction>, getState: () => TstoreState) => {
	try {
		if (user.id === getState().user?.user?.id) return
		if(getState().user.contacts.map(el => el.id).includes(user.id)) return
		
		const res = await fetch(`http://localhost:8000/users/${getState().user.user?.id}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				contacts: [...getState().user.contacts, user]
			})
		})
			.then(data => data.json())

		if (res?.contacts) {
			dispatch({
				type: EactionType.FILL_CONTACTS,
				contacts: res.contacts
			})
		}



	} catch (error) {
		console.log(error);
		return false
	}
}

export const removeContactAsyncAC = (id: number) => async (dispatch: Dispatch<Taction>, getState: () => TstoreState) => {
	try {
		const res = await fetch(`http://localhost:8000/users/${getState().user.user?.id}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				contacts: getState().user.contacts.filter(person => person.id !== id)
			})
		})
			.then(data => data.json())

		if (res?.contacts) {
			dispatch({
				type: EactionType.FILL_CONTACTS,
				contacts: res.contacts
			})
		}
	} catch (error) {
		console.log(error);
		return false
	}
}