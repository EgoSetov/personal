
type Tuser = {
	id: number,
	login: string
}

type Tcontact = {
	id: number,
	email: string
}

type Tstate = {
	isAuth: boolean,
	user: Tuser | null,
	contacts: [Tcontact] | []
}

type TitemsSearch = {
	items: [Tcontact] | []
}