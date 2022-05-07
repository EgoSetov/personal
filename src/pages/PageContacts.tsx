import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, TstoreState } from '../store'

const PageContacts = () => {

	const dispatch = useDispatch()
	const { getMyContactsAsyncAC, searchAsyncAC, addContactAsyncAC, removeContactAsyncAC } = bindActionCreators(actionCreators, dispatch)
	const contacts = useSelector((state: TstoreState) => state.user.contacts)
	const userId = useSelector((state: TstoreState) => state.user.user?.id || 0)
	const searchList = useSelector((state: TstoreState) => state.search.items)

	const [inputValue, setinputValue] = useState('')

	useEffect(() => {
		(async () => {
			await getMyContactsAsyncAC(userId)
		})()
	}, [])

	const search = async () => {
		await searchAsyncAC(inputValue)
	}

	const addContact = async (user: Tcontact) => {
		await addContactAsyncAC(user)
	}

	const removeContact = async (id: number) => {
		await removeContactAsyncAC(id)
	}

	return (
		<div style={{ marginTop: '50px' }} className='container'>
			<Form.Label htmlFor="inputPassword5">Поиск контактов</Form.Label>
			<div className='d-flex'>
				<Form.Control
					className='me-2'
					placeholder='Введите Email контакта'
					onChange={(e) => setinputValue(e.target.value)}
				/>
				<Button onClick={search}>Поиск</Button>
			</div>
			<hr />
			{!!contacts.length &&
				<>
					<h2>Мои контакты</h2>
					<ListGroup className=''>
						{contacts.map(person => (
							<ListGroup.Item key={person.id} className='d-flex justify-content-between align-items-center'>
								{person.email}
								<Button onClick={() => removeContact(person.id)} className='btn-danger'>Удалить</Button>
							</ListGroup.Item>
						))}
					</ListGroup>
					<hr />
				</>
			}
			{!!searchList.length &&
				<ListGroup>
					<h2>Результат поиска</h2>
					{searchList.map(person => (
						<>
							{person.id === userId ? null :
								<ListGroup.Item key={person.id} className='d-flex justify-content-between align-items-center'>
									{person.email}
									<Button onClick={() => addContact(person)} className='btn-success'>Добавить</Button>
								</ListGroup.Item>
							}
						</>
					))}
				</ListGroup>
			}
		</div>
	)
}

export default PageContacts