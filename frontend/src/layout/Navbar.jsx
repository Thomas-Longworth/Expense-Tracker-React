import React from "react";

import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from '@auth0/auth0-react'
import { FaCoins } from 'react-icons/fa';

import { Link, Outlet } from 'react-router-dom'
const Navbar = () => {
	const { user, isAuthenticated } = useAuth0();
	return (
		<>
			<div className="container-fluid layout-container">
				<nav class="navbar navbar-expand-lg navbar-dark ">
					<div class="container-fluid">
					
						<Link path="/" class="navbar-brand green main-heading" data-testid="nav-heading">	ExpenseTracker <FaCoins /></Link>
						<span class="navbar-text nav-para">
							{isAuthenticated ? <LogoutButton /> : <LoginButton />}
						</span>


					</div>
				</nav>
			</div>



			<Outlet />



		</>

	);
};

export default Navbar;
