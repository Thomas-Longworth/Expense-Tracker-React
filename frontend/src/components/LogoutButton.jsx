import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
    const LogoutButton = () => {
        const {logout, isAuthenticated} = useAuth0()
        
    return (
        isAuthenticated && (
            <button  className="btn btn-info reg-btns" onClick={()=> logout()}>
                Logout
            </button>

        )
        
    )
    }

export default LogoutButton