import React, { useEffect, useRef, useContext } from "react";
import { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { LoadingContext } from "../contexts/LoadingContext";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const ExpenseForm = () => {
	const {isLoading, setIsLoading} = useContext(LoadingContext)

	const schema = yup.object().shape({
		expenseName: yup.string().required(),
		expenseCost: yup.number().positive().min(1).required()
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
		
		<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title className="text-center"><h2>New Expense</h2></Modal.Title>
				</Modal.Header>
				<br></br>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<label htmlFor="expense-title">Name </label>
						<input {...register("expenseName")}

							data-cy="title-input"

							id="expense-title"
							value={title}
							type="text"
							onChange={(e) => setName(e.target.value)}
						/>
						<p>{errors.expenseName?.message}</p>

					</div>
					<br></br>
					<div className="form-group">
						<label htmlFor="expense-cost">Cost</label>
						<input
							{...register("expenseCost")}
							id="expense-cost"
							data-cy="cost-input"
							value={cost}
							type="number"
							onChange={(e) => setCost(e.target.value)}
						/>
						<p>{errors.expenseCost?.message}</p>

					</div>
					
					
					<br></br>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>

					<button data-cy="submit-expense" disabled={isLoading} className="btn btn-info">
						{isLoading ? <div className="spinner-border text-dark" role="status">
									<span className="sr-only"></span>
								</div>: "Submit"}</button>
				</form>

			</Modal>
			{
				isAuthenticated?<Button data-cy="epenses-button" variant="primary" className='btn btn-info btns'  onClick={handleShow}>
				Add Expense 
			</Button> : <Button className="btn btn-info">Login</Button>
			}

		


				
				
				

		</>
	);
};

export default ExpenseForm;
