import React from 'react'
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import { FaSearch } from 'react-icons/fa';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';


const SearchForm = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [searchFor, setSearchFor] = useState("");
	const [results, setResults] = useState([]);
	const { user, isAuthenticated } = useAuth0();
	const onSubmit = async (e, data) => {
		e.preventDefault();
		try {
			let userID = user.sub
			const response = await fetch(`http://localhost:5000/search/${user.sub}?title=${encodeURIComponent(searchFor)}`, {
				method: 'GET',
			});
			const data = await response.json();
			setResults(data);

		} catch (err) {
			console.error(err.message);
		}
	};
	return (
		<>
			<div>
				<form onSubmit={onSubmit}  >
					<input
						value={searchFor}
						placeholder='Search Expenses'
						type="text"
						onChange={(e) => setSearchFor(e.target.value)}
					/>
					<button type="submit" onClick = {handleShow}><FaSearch /></button>
				</form>

			</div>
			


			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Search results for "{searchFor}"</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				{results.length > 0 ? (
					<ul>
						{results.map((result, index) => (
							<li key={index}>
								<b>Expense:</b> {result.title}, <b>Cost:</b> € {result.cost}, <b>Date:</b> {result.dates}
							</li>
						))}
					</ul>
				) : (
					<p>No results found.</p>
				)}
					
					
					</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>




		</>
	)
}

export default SearchForm