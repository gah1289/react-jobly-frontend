import React, { useEffect, useState } from 'react';
import JoblyApi from '../api';
import './Companies.css';
import { CardGroup } from 'reactstrap';
import { useLocation } from 'react-router-dom';

import CompanySearchForm from './CompanySearchForm';
import CompanyCard from './CompanyCard';

function CompaniesList() {
	const [
		companies,
		setCompanies
	] = useState([]);

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const location = useLocation();

	const filterCompanies = (co) => {
		setCompanies(co);
	};

	useEffect(() => {
		async function getCompanies(data) {
			if (location.state) {
				setCompanies(location.state.props);
			}
			else {
				let companiesFromApi = await JoblyApi.getCompanies();
				filterCompanies(companiesFromApi);
			}

			setIsLoading(false);
		}

		getCompanies();
	}, []);

	if (isLoading) {
		return <p> loading...</p>;
	}

	return (
		<div>
			<h1>Companies</h1>
			<CompanySearchForm filterCompanies={filterCompanies} />

			<CardGroup>{companies.map((company) => <CompanyCard key={company.handle} company={company} />)}</CardGroup>
		</div>
	);
}

export default CompaniesList;
