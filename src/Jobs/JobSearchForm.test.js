import JobsList from './JobsList';
import JobSearchForm from './JobSearchForm';
import { render, screen } from '@testing-library/react';
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

	let jobs = [
		{
			id            : 200,
			title         : 'Accommodation manager',
			salary        : 126000,
			equity        : null,
			companyHandle : 'mejia-scott-ryan',
			companyName   : 'Mejia, Scott and Ryan'
		},
		{
			id            : 400,
			title         : 'Accommodation manager',
			salary        : 126000,
			equity        : null,
			companyHandle : 'mejia-scott-ryan',
			companyName   : 'Mejia, Scott and Ryan'
		},
		{
			id            : 161,
			title         : 'Accountant, chartered certified',
			salary        : 86000,
			equity        : '0.070',
			companyHandle : 'boyd-evans',
			companyName   : 'Boyd-Evans'
		}
	];

	let JobsListComponent = (
		<MemoryRouter>
			<ItemContext.Provider value={{ jobs, isLoading, isLoggedIn, user }}>
				{' '}
				<JobsList>
					<JobSearchForm />
				</JobsList>{' '}
				/>{' '}
			</ItemContext.Provider>
		</MemoryRouter>
	);

	it('renders without crashing', function() {
		render(JobsListComponent);
	});

	it('matches snapshot with no jobs', function() {
		const { asFragment } = render(JobsListComponent);
		expect(asFragment()).toMatchSnapshot();
	});
});
