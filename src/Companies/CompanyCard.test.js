import { render, screen } from '@testing-library/react';
import CompanyCard from './CompanyCard';
import ItemContext from '../ItemContext';
import { MemoryRouter } from 'react-router-dom';

describe('Loads Company Card', function() {
	let isLoggedIn = true;

	let isLoading = false;

	let user = {
		username  : 'testUser',
		firstName : 'Test',
		lastName  : 'User',
		email     : 'test@user.com',
		password  : 'password'
	};

	let company = {
		handle       : 'anderson-arias-morrow',
		name         : 'Anderson, Arias and Morrow',
		description  :
			'Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.',
		numEmployees : 245,
		logoUrl      : '/logos/logo3.png'
	};

	let CompanyCardComponent = (
		<MemoryRouter>
			<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
				{' '}
				<CompanyCard company={company} />{' '}
			</ItemContext.Provider>
		</MemoryRouter>
	);

	it('renders without crashing', function() {
		render(CompanyCardComponent);
	});

	it('shows card with company information', function() {
		const { asFragment } = render(CompanyCardComponent);
		expect(asFragment()).toMatchSnapshot();
		const cardTitle = screen.queryByText(/Anderson/i);
		expect(cardTitle).toBeInTheDocument();
	});
});
