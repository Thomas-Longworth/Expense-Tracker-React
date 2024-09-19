import React from 'react'
import { useState } from 'react';

const SearchForm = () => {

	const [searchFor, setSearchFor] = useState("");
	const [results, setResults] = useState([]);

	const onSubmit = async (e, data) => {
		e.preventDefault();
		try {

			const response = await fetch(`http://localhost:5000/search?title=${encodeURIComponent(searchFor)}`, {
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
			<form onSubmit={onSubmit}>
          <input
            value={searchFor}
            type="text"
            onChange={(e) => setSearchFor(e.target.value)}
          />
          <button type="submit">Search</button> {/* Add a submit button */}
        </form>



			</div>
			<div>
			{results.length > 0 ? (
    <ul>
      {results.map((result, index) => (
        <li key={index}>
          Title: {result.title}, Cost: {result.cost}, Date: {result.dates}
          {/* Render the properties of the result object */}
        </li>
      ))}
    </ul>
  ) : (
    <p>No results found.</p>
  )}
      </div>
		</>
	)
}

export default SearchForm