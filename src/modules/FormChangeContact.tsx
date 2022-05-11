import React, { useState, ChangeEvent } from 'react'
import { Form, FormControl, ModalHeader, ModalBody, Button, ModalFooter } from 'react-bootstrap'

type Props = {
	changeContact: Function,
	close: Function,
	contact: {
		id?: string,
		name?: string,
		email?: string
	}
}

const FormChangeContact = (props: Props) => {

	const [inputValue, setinputValue] = useState({
		name: props.contact?.name ?? '',
		email: props.contact?.email ?? ''
	});

	const changeIV = (e: ChangeEvent<HTMLInputElement>) => {
		setinputValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const changeContact = () => {
		if (props.contact.name === inputValue.name && props.contact.email === inputValue.email) return props.close()
		props.changeContact({
			id: props.contact.id,
			email: inputValue.email,
			name: inputValue.name
		})
	}

	return (
		<Form>
			<ModalHeader>
				<Button onClick={() => props.close()} variant="close"></Button>
			</ModalHeader>
			<ModalBody>
				<div className="mb-3">
					<label className="form-label">Имя</label>
					<FormControl
						value={inputValue.name}
						onChange={changeIV}
						name="name"
						placeholder="Имя"
					></FormControl>
				</div>
				<div className="mb-3">
					<label className="form-label">Электронная почта</label>
					<FormControl
						value={inputValue.email}
						onChange={changeIV}
						name="email"
						type="email"
						placeholder="email@mail.ru"
					></FormControl>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button onClick={changeContact} variant="success">Изменить</Button>
			</ModalFooter>
		</Form>
	)
}

export default FormChangeContact