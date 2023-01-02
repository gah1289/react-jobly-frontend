import React from 'react';
import { render } from '@testing-library/react';
import Routes from './Routes';
import { MemoryRouter } from 'react-router';
import ItemContext from '../ItemContext';

describe('Renders Routes', function() {
	let isLoggedIn = true;

	let isLoading = false;

	let user = {
		username     : 'testUser',
		firstName    : 'Test',
		lastName     : 'User',
		email        : 'test@user.com',
		password     : 'password',
		isAdmin      : false,
		applications : []
	};

	user.current = user;
	it('renders without crashing', function() {
		render(
			<MemoryRouter>
				<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
					<Routes />
				</ItemContext.Provider>
			</MemoryRouter>
		);
	});

	it('matches snapshot', function() {
		const { asFragment } = render(
			<MemoryRouter>
				<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
					<Routes />
				</ItemContext.Provider>
			</MemoryRouter>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
