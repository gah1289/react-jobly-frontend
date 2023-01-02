import JobCard from './JobCard';
import { render } from '@testing-library/react';
import ItemContext from '../ItemContext';
import { MemoryRouter } from 'react-router-dom';

describe('Loads Job Card', function() {
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

	let job = {
		id            : 200,
		title         : 'Accommodation manager',
		salary        : 126000,
		equity        : null,
		companyHandle : 'mejia-scott-ryan',
		companyName   : 'Mejia, Scott and Ryan'
	};

	let JobCardComponent = (
		<MemoryRouter>
			<ItemContext.Provider value={{ isLoading, isLoggedIn, user }}>
				{' '}
				<JobCard job={job} />{' '}
			</ItemContext.Provider>
		</MemoryRouter>
	);

	it('renders without crashing', function() {
		render(JobCardComponent);
	});
});
