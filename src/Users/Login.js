import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import JoblyApi from '../api';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import ItemContext from '../ItemContext';

function Login() {
	const { setIsLoggedIn, user } = useContext(ItemContext);
	const INITIAL_STATE = {
		username : '',
		password : ''
	};

	const [
		pwError,
		setPwError
	] = useState(false);
	const [
		errors,
		setErrors
	] = useState();

	const [
		usernameError,
		setUsernameError
	] = useState(false);

	const [
		formData,
		setFormData
	] = useState(INITIAL_STATE);

	const navigate = useNavigate();

	const handleChange = async (e) => {
		const { name, value } = e.target;
		setPwError(false);
		setUsernameError(false);
		setFormData((formData) => ({ ...formData, [name]: value }));
	};
	const handleSubmit = async (e) => {
		let { username, password } = formData;
		e.preventDefault();

		// filter out companies by search form data.

		if (!formData.username) {
			setUsernameError(true);
		}
		if (!formData.password) {
			setPwError(true);
			setErrors([
				'Password required'
			]);
		}

		try {
			await JoblyApi.login(formData);
			setIsLoggedIn(true);
			let userRes = await JoblyApi.getUser(formData.username);
			user.current = userRes;
			navigate('/');
		} catch (e) {
			setPwError(true);
			setErrors(e[0]);
		}

		// setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<h1>Log In</h1>
			<Form onSubmit={handleSubmit}>
				<FormGroup row>
					<Label sm={2} for="username">
						Username:{' '}
					</Label>
					<Col sm={5}>
						<Input
							name="username"
							invalid={usernameError}
							id="username"
							type="text"
							value={formData.username || ''}
							onChange={handleChange}
						/>
						<FormFeedback>Username Required.</FormFeedback>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2} for="password">
						Password:{' '}
					</Label>
					<Col sm={5}>
						<Input
							invalid={pwError}
							name="password"
							id="password"
							type="password"
							value={formData.password || ''}
							onChange={handleChange}
						/>
						<FormFeedback>{errors}</FormFeedback>
					</Col>
				</FormGroup>
				<Button>Log In</Button>
			</Form>
		</div>
	);
}

export default Login;
