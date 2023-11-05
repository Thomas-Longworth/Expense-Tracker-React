import React, { useContext } from 'react'
import { useState} from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { LoadingContext } from '../contexts/LoadingContext';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const BudgetForm = () => {
    const {isLoading,setIsLoading}=useContext(LoadingContext)
    const [total_budget, settotal_budget]= useState(0)
    const [showForm, setShowForm] = useState(false);
	const handleCloseForm = () => setShowForm(false);
	const handleShowForm = () => setShowForm(true);
    const {user, isAuthenticated}= useAuth0();
    
    const schema = yup.object().shape({
		
		budgetAmount: yup.number()
        .required('Budget is required!')
		.positive('Budget must be a postive number')
		.integer('Budgetmust be a whole number')
		.min(100, 'Minimum Budget is € 100')
		.max(500000,'Maximim Budget is € 500,000')


	})
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})


    
    const onSubmit = async (e)=> {
       
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

{
    isAuthenticated 
    ? <Button variant="primary" className='btn btn-info btns'  onClick={handleShowForm}>Update Budget</Button>
    : <div></div>
}

<Modal show={showForm} onHide={handleCloseForm} centered>
    <Modal.Header closeButton className="bg-light">
        <Modal.Title className="text-center font-weight-bold">New Budget</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="budget-amount" className="font-weight-bold">Amount</label>
                <input
                    id="budget-amount"
                    className='app-inputs form-control'
                    {...register("budgetAmount")}
                    value={total_budget}
                    type="number"
                    onChange={(e) => settotal_budget(e.target.value)}
                />
                <small className="text-danger">{errors.budgetAmount?.message}</small>
            </div>

            <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-info" onClick={handleCloseForm}>
                    Close
                </Button>
                <button type="submit" disabled={isLoading} className="btn btn-primary">  {isLoading ? 
                        <div className="spinner-border spin" role="status">
                            <span className="sr-only"></span>
                        </div>
                    : "Submit"}
                </button>
            </div>
        </form>
    </Modal.Body>
</Modal>
    
        </>

  )
}

export default BudgetForm