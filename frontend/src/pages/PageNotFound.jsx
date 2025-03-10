import React from 'react'
import mag from '../assets/images/mag.jpg'
import { Link, Outlet } from 'react-router-dom'
import { FaRegMeh } from 'react-icons/fa'
const PageNotFound = () => {
	return (
		<>

			<div className='container-fluid'>
				<div className='row  '>
					<div className='col mt-4'>
						<h1>Page not found  <FaRegMeh /></h1>
						<Link className="return" path="/">Home</Link></div>
					<div className='col'></div>

				</div>






			</div>
		</>

	)
}

export default PageNotFound