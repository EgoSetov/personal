import React, { useState } from "react";
import { Button, ButtonGroup, Card, Form, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import FormAddContact from "../modules/FormAddContact";
import FormChangeContact from "../modules/FormChangeContact";
import { actionCreators, TstoreState } from "../store";

const PageContacts: React.FC = () => {
	const dispatch = useDispatch();
	const { addContactAsyncAC, removeContactAsyncAC, changeContactAsyncAC } = bindActionCreators(actionCreators, dispatch);
	const contacts = useSelector((state: TstoreState) => state.user.user?.contacts || []);

	const [inputValue, setinputValue] = useState("");
	const [modalAddContact, setmodalAddContact] = useState(false)
	const [modalChangeContact, setmodalChangeContact] = useState({
		visible: false,
		contact: {}
	})

	const addContact = async (user: Tcontact) => {
		await addContactAsyncAC(user);
		setmodalAddContact(false)
	};

	const removeContact = async (id: string) => {
		await removeContactAsyncAC(id);
	};

	const changeContact = async (contact: Tcontact) => {
		await changeContactAsyncAC(contact)
		setmodalChangeContact({
			visible: false,
			contact: {}
		})
	}

	return (
		<>
			<div style={{ marginTop: "50px" }} className="container">
				<Form.Label htmlFor="inputPassword5">Поиск контактов</Form.Label>
				<div className="d-flex">
					<Form.Control
						className="me-2"
						placeholder="Введите контакт"
						onChange={(e) => setinputValue(e.target.value)}
						value={inputValue}
					/>
					<Button variant="success"
						onClick={() => setmodalAddContact(true)}
					>
						Добавить
					</Button>
				</div>
				<hr />
				{!!contacts.length ? (
					<>
						<h2>Мои контакты</h2>
						{contacts.map((contact: Tcontact) => (
							<Card
								style={{ flexDirection: 'row', marginBottom: '10px' }}
								key={contact.id}
								className="d-flex justify-content-between p-2 align-items-center"
							>
								{contact.name} | {contact.email}
								<ButtonGroup>
									<Button
										onClick={() => setmodalChangeContact({ visible: true, contact })}
										variant="warning"
									>
										Изменить
									</Button>
									<Button
										onClick={() => removeContact(contact.id)}
										variant="danger"
									>
										Удалить
									</Button>
								</ButtonGroup>
							</Card>
						))}
					</>
				)
					:
					<span className="text-muted">У вас нет контактов</span>
				}
			</div>
			<Modal show={modalAddContact}>
				<FormAddContact
					close={() => setmodalAddContact(false)}
					addContact={addContact}
				/>
			</Modal>
			<Modal show={modalChangeContact.visible}>
				<FormChangeContact
					close={() => setmodalChangeContact(prev => ({ ...prev, visible: false }))}
					changeContact={changeContact}
					contact={modalChangeContact.contact}
				/>
			</Modal>
		</>
	);
};

export default PageContacts;
