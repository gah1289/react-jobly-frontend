import JoblyApi from '../api';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import Home from '../Home/Home';
import CompaniesList from '../Companies/CompaniesList';
import Company from '../Companies/Company';
import JobsList from '../Jobs/JobsList';

import Login from '../Users/Login';
import Signup from '../Users/Signup';
import Profile from '../Users/Profile';
import NotFound from '../NotFound';
import Logout from '../Users/Logout';

function JoblyRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/companies" element={<CompaniesList />} />
			<Route path="/companies/:id" element={<Company />} />
			<Route path="/jobs" element={<JobsList />} />

			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/logout" element={<Logout />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default JoblyRoutes;
