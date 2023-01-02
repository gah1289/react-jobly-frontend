import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';

import CompanyCard from './CompanyCard';
function Company() {
	const { id } = useParams();
	const [
		company,
		setCompany
	] = useState();

	useEffect(() => {
		async function getCompany() {
			let res = await JoblyApi.getCompany(id);
			setCompany(res);
		}
		getCompany();
	}, []);

	if (company) {
		return (
			<div>
				<CompanyCard company={company} />
			</div>
		);
	}
}

export default Company;
