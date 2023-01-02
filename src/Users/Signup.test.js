import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from './Signup';
import { MemoryRouter } from 'react-router-dom';
import ItemContext from '../ItemContext';

describe('Renders Profile', function() {
	let isLoggedIn = false;

	let isLoading = false;

	let user = null;

	it('matches snapshot', function() {
		const { asFragment } = render(
			<MemoryRouter>
				<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
					<Signup />
				</ItemContext.Provider>
			</MemoryRouter>
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it('shows Signup Form', function() {
		render(
			<MemoryRouter>
				<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
					<Signup />
				</ItemContext.Provider>
			</MemoryRouter>
		);

		const firstNameInput = screen.queryByText(/First Name:/i);
		expect(firstNameInput).toBeInTheDocument();
		expect(firstNameInput.tagName).toBe('LABEL');
		const signupBtn = screen.queryByText(/Sign up/i);
		expect(signupBtn).toBeInTheDocument();
	});
});
