import React, { useEffect, useState } from 'react';
import JoblyApi from '../api';
import './Jobs.css';
import { useLocation } from 'react-router-dom';
import { CardGroup } from 'reactstrap';
import { v4 as uuid } from 'uuid';

import JobCard from './JobCard';
import JobSearchForm from './JobSearchForm';

function JobsList() {
	const [
		jobs,
		setJobs
	] = useState([]);

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const filterJobs = (j) => {
		setJobs(j);
	};
	const location = useLocation();

	useEffect(() => {
		async function getJobs(data) {
			if (location.state) {
				setJobs(location.state.props);
			}
			else {
				let jobsFromApi = await JoblyApi.getJobs();
				filterJobs(jobs);
				setJobs(jobsFromApi);
			}

			setIsLoading(false);
		}
		getJobs();
	}, []);

	if (isLoading) {
		return;
	}

	return (
		<div>
			<h1>Jobs</h1>
			{!location.state ? <JobSearchForm filterJobs={filterJobs} /> : ''}
			<CardGroup>{jobs.map((job) => <JobCard key={uuid()} job={job} />)}</CardGroup>
		</div>
	);
}

export default JobsList;
