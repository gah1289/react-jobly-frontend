import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
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
					<NavBar />
				</ItemContext.Provider>
			</MemoryRouter>
		);
	});

	it('matches snapshot', function() {
		const { asFragment } = render(
			<MemoryRouter>
				<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
					<NavBar />
				</ItemContext.Provider>
			</MemoryRouter>
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it('shows links if user logged in', function() {
		render(
			<MemoryRouter>
				<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
					<NavBar />
				</ItemContext.Provider>
			</MemoryRouter>
		);
		const profileLink = screen.queryByText(/Profile/i);
		expect(profileLink).toBeInTheDocument();
		const logoutLink = screen.queryByText(/Log out/i);
		expect(logoutLink).toBeInTheDocument();
	});
	it('Only shows Company and Job links if user logged out', function() {
		user.current = null;
		isLoggedIn = false;
		render(
			<MemoryRouter>
				<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
					<NavBar />
				</ItemContext.Provider>
			</MemoryRouter>
		);
		const companiesLink = screen.queryByText(/Companies/i);
		expect(companiesLink).toBeInTheDocument();
		const jobsLink = screen.queryByText(/Jobs/i);
		expect(jobsLink).toBeInTheDocument();
		const profileLink = screen.queryByText(/Profile/i);
		expect(profileLink).not.toBeInTheDocument();
		const logoutLink = screen.queryByText(/Log out/i);
		expect(logoutLink).not.toBeInTheDocument();
	});
});
