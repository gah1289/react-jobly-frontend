import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import JoblyApi from '../api';
import ItemContext from '../ItemContext';

function Logout() {
	const INITIAL_STATE = { username: '', password: '', firstName: '', lastName: '', email: '' };
	const { setIsLoggedIn, user } = useContext(ItemContext);

	try {
		localStorage.clear();

		useEffect(() => {
			user.current = INITIAL_STATE;
			setIsLoggedIn(false);
		}, []);

		return <Navigate to="/" />;
	} catch (e) {
		throw e;
	}
}

export default Logout;
