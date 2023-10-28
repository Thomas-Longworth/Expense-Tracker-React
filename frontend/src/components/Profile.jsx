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
			<article>
				<h1>{user?.name}</h1>
				<h4>{user?.user_id}</h4>
				<h4>{user?.sub}</h4>


			</article>
		)
		<div>
			<div>
				<div>
					
				</div>
			</div>

		</div>

		</>
	)
}

export default Profile