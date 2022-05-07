import { EactionType } from './../action-type/index';

interface IaddContact {
	type: EactionType.ADD_CONTACT,
	user: Tcontact
}

interface IfillUserData {
	type: EactionType.FILL_USER_DATA,
	data: Tuser
}

interface Ilogin {
	type: EactionType.LOGIN,
	data: { email: string, password: string }
}

interface IfillContacts {
	type: EactionType.FILL_CONTACTS,
	contacts: [Tcontact]
}

interface IfillSearchItems {
	type: EactionType.FILL_SEARCH_ITEMS,
	items: [Tcontact]
}

export type Taction = IaddContact | IfillUserData | Ilogin | IfillContacts | IfillSearchItems