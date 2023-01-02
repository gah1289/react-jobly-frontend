import React, { useEffect, useState } from 'react';
import JoblyApi from '../api';
import './Companies.css';
import { Button } from 'reactstrap';

function CompanySearchForm({ filterCompanies }) {
	const INITIAL_STATE = {
		name         : undefined,
		minEmployees : undefined,
		maxEmployees : undefined
	};
	const [
		formData,
		setFormData
	] = useState(INITIAL_STATE);

	const [
		numResultsMsg,
		setNumResultsMsg
	] = useState();

	const handleChange = async (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// filter out companies by search form data.
		const filteredCompanies = await JoblyApi.getCompanies({
			name         : formData.name,
			minEmployees : formData.minEmployees,
			maxEmployees : formData.maxEmployees
		});
		filterCompanies(filteredCompanies);
		setNumResultsMsg(`Found: ${filteredCompanies.length} results`);
		setFormData(INITIAL_STATE);
	};

	return (
		<form className="companies-form" onSubmit={handleSubmit}>
			<h2>Search by:</h2>
			<div>
				<label htmlFor="name">Name: </label>
				<input
					name="name"
					id="name"
					type="text"
					placeholder="Company Name"
					value={formData.name || ''}
					onChange={handleChange}
				/>
			</div>{' '}
			<div>
				<label>Number of Employees: </label>
				<input
					name="minEmployees"
					id="minEmployees"
					type="number"
					placeholder="Minimum"
					value={formData.minEmployees || ''}
					onChange={handleChange}
				/>
				to
				<input
					name="maxEmployees"
					id="maxEmployees"
					type="number"
					placeholder="Maximum"
					value={formData.maxEmployees || ''}
					onChange={handleChange}
				/>
			</div>{' '}
			<Button color="secondary">Search</Button>
			<div className="found-results">{numResultsMsg}</div>
		</form>
	);
}

export default CompanySearchForm;
