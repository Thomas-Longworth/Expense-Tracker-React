import React, { useContext } from 'react'
import { useState} from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAuth0 } from '@auth0/auth0-react';
import { LoadingContext } from '../contexts/LoadingContext';

const BudgetForm = () => {
    const {isLoading,setIsLoading}=useContext(LoadingContext)
    const [total_budget, settotal_budget]= useState(0)
    const [showForm, setShowForm] = useState(false);
	const handleCloseForm = () => setShowForm(false);
	const handleShowForm = () => setShowForm(true);
    const {user, isAuthenticated}= useAuth0();

    
    const handleBudget = async (e)=> {
        e.preventDefault()
        try {
            setIsLoading(true)
            let userID = user.sub
            const budgetBody = { total_budget, userID }
            const budgetResponse = await fetch("http://localhost:5000/budget", {
                method:"POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(budgetBody)
            })

            setIsLoading(false)
          

        }
        catch (err){
            console.error(err.message)
        }
        setShowForm(false);
    }
  
  
    return (
        <>
    

            <Button variant="primary" className='btn btn-info btns' onClick={handleShowForm}>
				Update budget
			</Button>

			<Modal show={showForm} onHide={handleCloseForm}>
				<Modal.Header closeButton>
					<Modal.Title className= "text-center"><h2>New Budget</h2></Modal.Title>
				</Modal.Header>
                <br></br>
				<form   onSubmit={handleBudget}>
                    <div className="form-group">
                    <label htmlFor="">Amount </label>
					<input
                    
                    value={total_budget}
                    type ="number"
                    onChange={(e)=> settotal_budget(e.target.value)}
					/>

                    </div>
                   
                 
				
                    <br></br>
                    <Button  className='btn btn-info' onClick={handleCloseForm}>
						Close
					</Button>
                    
					<button className="btn btn-info">Submit</button>
				</form>
				
			</Modal>
    
        </>

  )
}

export default BudgetForm