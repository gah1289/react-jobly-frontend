import React, { useContext, useState, useEffect } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Spinner, FormFeedback, Alert, Link, Card } from 'reactstrap';
import ItemContext from '../ItemContext';
import { Navigate } from 'react-router-dom';
import JoblyApi from '../api';
import './Profile.css';
import JobCard from '../Jobs/JobCard';

function Profile() {
	const { user, isLoading } = useContext(ItemContext);

	const INITIAL_STATE = {
		firstName : '',
		lastName  : '',
		password  : '',
		email     : ''
	};

	const [
		formData,
		setFormData
	] = useState(INITIAL_STATE);

	const [
		invalid,
		setInvalid
	] = useState(false);

	const [
		success,
		setSuccess
	] = useState();

	function setDefaultValues() {
		if (!formData.firstName) {
			formData.firstName = user.current.firstName;
		}
		if (!formData.lastName) {
			formData.lastName = user.current.lastName;
		}
		if (!formData.email) {
			formData.email = user.current.email;
		}
		if (!formData.password) {
			formData.password = user.current.password;
		}
	}

	// to do: add ability to change password
	// const checkPw = (e) => {
	// 	const { name, value } = e.target;
	// 	if (value !== formData.password) {
	// 		setInvalid(true);
	// 		setError(`Passwords don't match`);
	// 	}
	// 	else {
	// 		setInvalid(false);
	// 		setFormData({ password: formData.password });
	// 	}
	// };
	const handleChange = async (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setDefaultValues();

		try {
			let res = await JoblyApi.updateUser({ username: user.current.username, ...formData });
			setSuccess(true);
		} catch (e) {
			setInvalid(true);
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (user.current.username) {
		return (
			<div>
				<Form>
					<h1>{user.current.firstName}'s Profile</h1>
					<h2>Change Profile:</h2>
					<FormGroup row>
						<Label for="firstName" sm={2}>
							First Name
						</Label>
						<Col sm={5}>
							<Input
								type="text"
								name="firstName"
								id="firstName"
								placeholder={user.current.firstName}
								onChange={handleChange}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="lastName" sm={2}>
							Last Name
						</Label>
						<Col sm={5}>
							<Input
								type="text"
								name="lastName"
								id="lastName"
								placeholder={user.current.lastName}
								onChange={handleChange}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="email" sm={2}>
							Email
						</Label>
						<Col sm={5}>
							<Input
								type="text"
								name="email"
								id="email"
								placeholder={user.current.email}
								onChange={handleChange}
							/>
						</Col>
					</FormGroup>

					{/* 
                <Button sm={5} onClick={() => setChangePw(false)}>
					Change Password?
				</Button><FormGroup className={changePw ? '' : 'hidden'} row>
					<Label for="password" sm={2}>
						Password
					</Label>
					<Col sm={5}>
						<Input
							type="password"
							name="password"
							id="password"
							invalid={formData.password.length < 5}
							onChange={handleChange}
						/>
						<FormFeedback>Password must be at least 5 characters</FormFeedback>
					</Col>
				</FormGroup>
				<FormGroup className={changePw ? '' : 'hidden'} row>
					<Label for="password" sm={2}>
						Re-enter Password to Confirm
					</Label>
					<Col sm={5}>
						<Input
							type="password"
							name="reEnterPassword"
							id="reEnterPassword"
							invalid={invalid}
							onChange={handleChange && checkPw}
						/>
						<FormFeedback>{error}</FormFeedback>
					</Col>
				</FormGroup> */}
					<FormGroup check row>
						{success ? (
							<Alert color="success">
								Successfully updated {formData.firstName} {formData.lastName}'s Profile!
							</Alert>
						) : null}
						<Col sm={{ size: 5, offset: 2 }}>
							<Button onClick={handleSubmit}>Submit</Button>
						</Col>
					</FormGroup>
				</Form>
			</div>
		);
	}
	else {
		// redirect to login if user is not logged in
		return <Navigate to="/login" />;
	}
}

export default Profile;
