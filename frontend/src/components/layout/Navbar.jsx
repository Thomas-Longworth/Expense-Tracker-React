import React from "react";

import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import { useAuth0 } from '@auth0/auth0-react'

import { Link, Outlet } from 'react-router-dom'
const Navbar = () => {
	const { user, isAuthenticated } = useAuth0();
	return (
		<>
			<div className="container-fluid layout-container">
				<nav class="navbar navbar-expand-lg navbar-dark ">
					<div class="container-fluid">
						<a class="navbar-brand" href="#">	ExpenseTracker</a>
						<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
						<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div class="navbar-nav">
								<Link class="nav-link" to="/expense-full-stack">Home</Link>
								<Link class="nav-link " to="/expense-full-stack/profile">Profile</Link>

								{isAuthenticated ? <LogoutButton /> : <LoginButton />}
							</div>
						</div>
					</div>
				</nav>
			</div>



			<Outlet />



		</>

	);
};

export default Navbar;
