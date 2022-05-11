import React, { useState, ChangeEvent } from 'react'
import { Form, FormControl, ModalHeader, ModalBody, Button, ModalFooter } from 'react-bootstrap'

type Props = {
	close: Function
	addContact: Function
}

const FormAddContact = (props: Props) => {

	const [inputValue, setinputValue] = useState({
		name: '',
		email: ''
	});

	const changeIV = (e: ChangeEvent<HTMLInputElement>) => {
		setinputValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const addContact = () => {
		props.addContact({
			id: Date(),
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
				<Button onClick={addContact} variant="success">Добавить</Button>
			</ModalFooter>
		</Form>
	)
}

export default FormAddContact