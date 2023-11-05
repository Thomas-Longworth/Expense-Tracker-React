import React, { useEffect, useRef, useContext } from "react";
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react'
import Button from "react-bootstrap/Button";
import LoginButton from "./LoginButton";
import Modal from "react-bootstrap/Modal";
import { LoadingContext } from "../contexts/LoadingContext";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const ExpenseForm = () => {
	const {isLoading, setIsLoading} = useContext(LoadingContext)

	const schema = yup.object().shape({
		expenseName: yup.string()
		.required('Name of Expense is required')
		.min(3, 'Name must be at least 3 characters')
		.max(9, 'Name must be less than 9 characters'),
			
		expenseCost: yup.number()
		.required('Cost of expense is required')
		.positive('Cost must be a postive number')
		.integer('Cost must be a whole number')
		.min(1, 'Minimum cost is € 1')
		.max(500000,'Maximim cost is € 500,000')
		
	})
	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	})


	const [title, setName] = useState("");
	const [cost, setCost] = useState(0);
	const { user, isAuthenticated } = useAuth0();
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);


	const currentDate = new Date().toISOString().split('T')[0];
	console.log(currentDate)

	const onSubmit = async (e, data) => {
       
		try {
		
			let userID = user.sub
			setIsLoading(true)
			const body = { title, cost, userID, currentDate };
			const response = await fetch("http://localhost:5000/expenses", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
		
			

			setIsLoading(false)


		} catch (err) {
			console.error(err.message);
		}
		setShow(false);
	};
	
	
	

	return (
		<>
		
		<Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton className="bg-light">
        <Modal.Title className="text-center font-weight-bold">New Expense</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="expense-title" className="font-weight-bold">Name</label>
                <input 
                    className='app-inputs form-control'
                    {...register("expenseName")}
                    data-cy="title-input"
                    id="expense-title"
                    value={title}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />
                <small className="text-danger">{errors.expenseName?.message}</small>
            </div>

            <div className="form-group mt-4">
                <label htmlFor="expense-cost" className="font-weight-bold">Cost</label>
                <input
                    className='app-inputs form-control'
                    {...register("expenseCost")}
                    id="expense-cost"
                    data-cy="cost-input"
                    value={cost}
                    type="number"
                    onChange={(e) => setCost(e.target.value)}
					
                />
                <small className="text-danger">{errors.expenseCost?.message}</small>
            </div>

            <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" onClick={handleClose}>
                    Close
                </Button>

                <button data-cy="submit-expense" disabled={isLoading} className="btn btn-primary">
                    {isLoading ? 
                        <div className="spinner-border spin" role="status">
                            <span className="sr-only"></span>
                        </div>
                    : "Submit"}
                </button>
            </div>
        </form>
    </Modal.Body>
</Modal>

{
    isAuthenticated 
    ? <Button data-cy="epenses-button" variant="primary" className='btn btn-info btns'  onClick={handleShow}>Add Expense</Button>
    : <div></div>
}

		


				
				
				

		</>
	);
};

export default ExpenseForm;
