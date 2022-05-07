import React, { ChangeEvent, Dispatch, FormEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store'

const PageLogin = () => {

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { loginAsyncAC } = bindActionCreators(actionCreators, dispatch)

	const [inputValue, setinputValue] = useState({
		login: '',
		password: ''
	})
	const [warning, setWarning] = useState(false)

	const changeIV = (e: ChangeEvent<HTMLInputElement>) => {
		setinputValue(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const login = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await loginAsyncAC({
			email: inputValue.login,
			password: inputValue.password
		})

		navigate('/contacts')
		setWarning(true)

	}

	return (
		<div className='pageLogin'>
			<Form onSubmit={login}>
				<Form.Group className="mb-3 d-flex flex-column align-items-start" controlId="formBasicEmail">
					<Form.Label>Login</Form.Label>
					<Form.Control required onChange={changeIV} name="login" value={inputValue.login} type="text" placeholder="Login" />
				</Form.Group>

				<Form.Group className="mb-3 d-flex flex-column align-items-start" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control required onChange={changeIV} name="password" value={inputValue.password} type="password" placeholder="Password" />
					{!warning || <span className='text-danger'>Неверный логин или пароль</span>}
				</Form.Group>
				<Button variant="primary" type="submit">
					Войти
				</Button>
			</Form>
		</div>
	)
}

export default PageLogin;