import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {

	const {user, isAuthenticated}= useAuth0();
	if(isAuthenticated){
		console.log(user.sub)

	}

	return (
		<>
		isAuthenticated && (
			<div className='container'>
			<div className='row'>
			<h1>{user?.name}</h1>
				
			</div>
			<div className='row'>
			<h4>{user?.user_id}</h4>
				
			</div>
			<div className='row'>
			<h4>{user?.sub}</h4>
				
			</div>

		</div>
			
			
			
			


	
		)
		

		</>
	)
}

export default Profile