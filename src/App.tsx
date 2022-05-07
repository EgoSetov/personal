import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import PageLogin from './pages/PageLogin'
import { useSelector } from 'react-redux';
import { TstoreState } from './store'
import PageContacts from './pages/PageContacts';

function App() {

	const isAuth = useSelector((state: TstoreState) => state.user.isAuth)

	return (
		<div className="App">
			<Container>
				<Routes>
					{isAuth ?
						<>
							<Route path='/contacts' element={<PageContacts />} />
							<Route path='*' element={<PageContacts />} />
						</>
						:
						<>
							<Route path='/' element={<PageLogin />} />
							<Route path='*' element={<PageLogin />} />
						</>
					}
				</Routes>
			</Container>
		</div>
	);
}

export default App;
