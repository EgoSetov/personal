import { TstoreState } from './../store';
import { Taction } from './../actions/index';
import { EactionType } from '../action-type/index';
import { Dispatch } from 'redux'

export const addContactAC = (userId: number) => (dispatch: Dispatch) => dispatch({ type: EactionType.ADD_CONTACT, userId })
export const fillUserDataAC = (data: Tuser) => (dispatch: Dispatch) => dispatch({ type: EactionType.FILL_USER_DATA, data })

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

		} else {
			return {
				detail: 'user not found'
			}
		}
	} catch (error) {
		console.log(error);
		
	}
}

export const addContactAsyncAC = (contact: Tcontact) => async (dispatch: Dispatch<Taction>, getState: () => TstoreState) => {
	try {
		if(getState().user.user?.contacts?.map((person: Tcontact) => person.id).includes(contact.id)) return
		
		const res = await fetch(`http://localhost:8000/users/${getState().user.user?.id}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				contacts: [...getState().user.user?.contacts ?? [], contact]
			})
		})
			.then(data => data.json())

		if (res?.contacts) {
			dispatch({
				type: EactionType.FILL_USER_DATA,
				data: res
			})
		}

	} catch (error) {
		console.log(error);
	}
}

export const removeContactAsyncAC = (id: string) => async (dispatch: Dispatch<Taction>, getState: () => TstoreState) => {
	try {
		const res = await fetch(`http://localhost:8000/users/${getState().user.user?.id}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				contacts: getState().user.user?.contacts?.filter((person: Tcontact) => person.id !== id)
			})
		})
			.then(data => data.json())

		if (res?.contacts) {
			dispatch({
				type: EactionType.FILL_USER_DATA,
				data: res,
			})
		}
	} catch (error) {
		console.log(error);
	}
}

export const changeContactAsyncAC = (contact: {id?:string, email?:string, name?:string}) => async (dispatch: Dispatch<Taction>, getState: () => TstoreState) => {
	try {
		const modifiedContacts = getState().user.user?.contacts?.map((person: Tcontact) => {
			if (person.id === contact.id) {
				return {
					id: contact.id,
					name: contact.name,
					email: contact.email
				}
			}
			return person
		})
		const res = await fetch(`http://localhost:8000/users/${getState().user.user?.id}`, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				contacts: modifiedContacts
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
		
	}
}