import React, { useContext, useState, useEffect } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import ItemContext from '../ItemContext';
import JoblyApi from '../api';

function NavBar() {
	// The navbar list the Jobly logo as a link for the home page. It will also list NavLinks for companies,
	// const { token, isLoggedIn } = useContext(ItemContext);

	const { isLoggedIn } = useContext(ItemContext);

	return (
		<div>
			<Navbar className="my-2 " color="dark" dark>
				<NavbarBrand href="/">Jobly</NavbarBrand>
				<Nav className="Nav">
					<NavItem>
						<NavLink to="/companies">Companies</NavLink>
					</NavItem>
					<NavItem>
						<NavLink to="/jobs">Jobs</NavLink>
					</NavItem>

					{isLoggedIn && (
						<NavItem>
							<NavLink to="/profile">Profile</NavLink>
						</NavItem>
					)}
					{isLoggedIn && (
						<NavItem>
							<NavLink to="/logout">Log Out</NavLink>
						</NavItem>
					)}
				</Nav>
			</Navbar>
		</div>
	);
}

export default NavBar;
