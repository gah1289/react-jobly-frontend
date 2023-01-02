import React from 'react';
import JoblyApi from '../api';
import './Companies.css';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, CardImg } from 'reactstrap';

import { useNavigate } from 'react-router-dom';

import logo1 from './logos/logo1.png';
import logo2 from './logos/logo2.png';
import logo3 from './logos/logo3.png';
import logo4 from './logos/logo4.png';
import noLogo from './logos/no-logo.png';

function CompanyCard({ company }) {
	const navigate = useNavigate();

	const getLogo = (logoUrl) => {
		let logo;
		let logoNum;
		if (logoUrl) {
			logoNum = logoUrl[11];
			if (logoNum === '1') {
				logo = logo1;
			}
			if (logoNum === '2') {
				logo = logo2;
			}
			if (logoNum === '3') {
				logo = logo3;
			}
			if (logoNum === '4') {
				logo = logo4;
			}
		}
		else logo = noLogo;
		return logo;
	};

	const getCompanyJobs = async (co) => {
		let jobsFromApi = await JoblyApi.getJobs();
		let filteredJobs = jobsFromApi.filter((job) => job.companyHandle == co);

		return navigate('/jobs', { state: { props: filteredJobs } });
	};

	return (
		<Card style={{ minWidth: '30vw' }} className="company-card">
			<CardImg
				style={{ height: '150px', width: '200px', margin: 'auto' }}
				alt={company.name}
				src={getLogo(company.logoUrl)}
				top
				width="100%"
			/>
			<CardBody>
				<CardTitle tag="h5">{company.name}</CardTitle>
				<CardSubtitle className="mb-2 text-muted" tag="h6">
					Size: {company.numEmployees} Employees
				</CardSubtitle>
				<CardText>{company.description}</CardText>

				<Button
					onClick={async () => {
						await getCompanyJobs(company.handle);
					}}
				>
					Jobs
				</Button>
			</CardBody>
		</Card>
	);
}

export default CompanyCard;
