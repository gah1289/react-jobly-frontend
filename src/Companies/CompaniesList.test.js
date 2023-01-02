import { render } from '@testing-library/react';
import CompaniesList from './CompaniesList';
import ItemContext from '../ItemContext';
import { MemoryRouter } from 'react-router-dom';

describe('Loads Company Card', function() {
	let isLoggedIn = false;

	let isLoading = false;

	let user = null;

	let companies = [
		{
			handle       : 'anderson-arias-morrow',
			name         : 'Anderson, Arias and Morrow',
			description  :
				'Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.',
			numEmployees : 245,
			logoUrl      : '/logos/logo3.png'
		},
		{
			handle       : 'arnold-berger-townsend',
			name         : 'Arnold, Berger and Townsend',
			description  :
				'Kind crime at perhaps beat. Enjoy deal purpose serve begin or thought. Congress everything miss tend.',
			numEmployees : 795,
			logoUrl      : null
		}
	];

	let List = (
		<MemoryRouter>
			<ItemContext.Provider value={{ companies, isLoading, isLoggedIn, user }}>
				{' '}
				<CompaniesList />{' '}
			</ItemContext.Provider>
		</MemoryRouter>
	);

	it('renders without crashing', function() {
		render(List);
	});
});
