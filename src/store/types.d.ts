
type Tuser = {
	id: number,
	login: string,
	contacts: [Tcontact]
}

type Tcontact = {
	id: string,
	email: string
	name: string
}

type Tstate = {
	isAuth: boolean,
	user: Tuser | null,
}