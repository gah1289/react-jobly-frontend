import './App.css';
import JoblyApi from './api';
import JoblyRoutes from './Routes/Routes';
import NavBar from './NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect, useRef } from 'react';
import ItemContext from './ItemContext';

function App() {
	const INITIAL_STATE = { username: '', password: '', firstName: '', lastName: '', email: '' };

	const [
		isLoggedIn,
		setIsLoggedIn
	] = useState(false);

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const user = useRef(INITIAL_STATE);

	JoblyApi.token = window.localStorage.getItem('token') || null;
	const token = JoblyApi.token;

	const username = localStorage.getItem('username') || null;

	async function setUser() {
		// if user is successfully logged in, take username from local storage and get user info from api
		if (username) {
			let userRes = await JoblyApi.getUser(username);
			user.current = userRes;
			setIsLoading(false);
		}
	}
	setUser();

	useEffect(() => {
		token ? setIsLoggedIn(true) : setIsLoggedIn(false);
	}, []);
	return (
		<div className="App">
			<ItemContext.Provider value={{ token, isLoggedIn, setIsLoggedIn, user, isLoading }}>
				<NavBar />
				<JoblyRoutes />
			</ItemContext.Provider>
		</div>
	);
}

export default App;
