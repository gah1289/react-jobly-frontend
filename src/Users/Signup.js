import React, { useState } from 'react';
import JoblyApi from '../api';
import { Button, Form, FormGroup, Label, Input, Col, FormFeedback, Modal, ModalBody } from 'reactstrap';

function Signup() {
	const INITIAL_STATE = {
		username  : '',
		password  : '',
		firstName : '',
		lastName  : '',
		email     : ''
	};

	const testUser = {
		username  : 'gah1289',
		password  : '000000',
		firstName : 'Gabby',
		lastName  : 'McCarthy',
		email     : 'gah@gmail.com'
	};

	const [
		modal,
		setModal
	] = useState(false);

	const [
		error,
		setError
	] = useState();
	const [
		pwError,
		setPwError
	] = useState(false);

	const [
		usernameError,
		setUsernameError
	] = useState(false);

	const [
		formData,
		setFormData
	] = useState(INITIAL_STATE);

	const handleChange = async (e) => {
		const { name, value } = e.target;
		setPwError(false);
		setError();
		setUsernameError(false);
		setFormData((formData) => ({ ...formData, [name]: value }));
	};
	const handleSubmit = async (e) => {
		let { username, password } = formData;
		e.preventDefault();

		// filter out companies by search form data.

		try {
			let res = await JoblyApi.register(formData);
			setModal(true);
		} catch (e) {
			if (e[0].includes('Duplicate')) {
				setUsernameError(true);
				setError('Username already taken');
			}
			if (e[0].includes('password')) {
				setPwError(true);
				setError('Password must be at least 5 characters');
			}
			if (e[0].includes('email')) {
				setPwError(true);
				setError('Please enter a valid email');
			}
		}

		// setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<Modal isOpen={modal}>
				{' '}
				<ModalBody>
					Successfully created profile for {formData.username}! Log in <a href="/login">Here</a>
				</ModalBody>
			</Modal>
			<h1>Register</h1>
			<Form onSubmit={handleSubmit}>
				<FormFeedback>{error}</FormFeedback>
				<FormGroup row>
					<Label sm={2} for="username">
						Username:{' '}
					</Label>
					<Col sm={5}>
						<Input
							name="username"
							invalid={usernameError}
							required
							id="username"
							type="text"
							value={formData.username || ''}
							onChange={handleChange}
						/>
						<FormFeedback>{error}</FormFeedback>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2} for="firstName">
						First Name:{' '}
					</Label>
					<Col sm={5}>
						<Input
							name="firstName"
							required
							id="firstName"
							type="text"
							value={formData.firstName || ''}
							onChange={handleChange}
						/>
						<FormFeedback>First Name Required.</FormFeedback>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2} for="lastName">
						Last Name:{' '}
					</Label>
					<Col sm={5}>
						<Input
							name="lastName"
							required
							id="lastName"
							type="text"
							value={formData.lastName || ''}
							onChange={handleChange}
						/>
						<FormFeedback>Last Name Required.</FormFeedback>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label sm={2} for="email">
						Email:{' '}
					</Label>
					<Col sm={5}>
						<Input
							name="email"
							required
							id="email"
							type="email"
							value={formData.email || ''}
							onChange={handleChange}
						/>
						<FormFeedback>Email Required.</FormFeedback>
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
						<FormFeedback>{error}</FormFeedback>
					</Col>
				</FormGroup>
				<Button>Sign Up</Button>
			</Form>
		</div>
	);
}

export default Signup;
