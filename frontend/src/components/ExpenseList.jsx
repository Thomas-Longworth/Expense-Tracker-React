import React, { useEffect, useState, useContext } from "react";
import { motion, } from "framer-motion";
import { useAuth0 } from '@auth0/auth0-react'
import { ExpensesContext } from "../contexts/ExpensesContext";
import { FaTrashAlt } from 'react-icons/fa';
import { LoadingContext } from "../contexts/LoadingContext";
import ExpenseForm from "./ExpenseForm";
import SearchForm from "./SearchForm";


const ExpenseList = () => {
	const { isLoading, setIsLoading } = useContext(LoadingContext)
	const { user, isAuthenticated } = useAuth0();
	const { expenses, setExpenses } = useContext(ExpensesContext)
	const getExpenses = async () => {
		try {
			const response = await fetch(`http://localhost:5000/expenses/${user.sub}`);
			const jsonData = await response.json();
			console.log(jsonData)
			setExpenses(jsonData);
		} catch (err) {
			console.log(err.message);
		}
	};
	
	useEffect(() => {
		if (isAuthenticated) {
			getExpenses()
		}

	}, [isLoading, user])
	const handleDelete = async (id) => {
		try {
			setIsLoading(true)
			const deleteExpense = await fetch(
				`https://spend-wise-1-a80913de5bc1.herokuapp.com/expenses/${id}`,
				{
					method: "DELETE",
				}
			);
			setExpenses(expenses.filter((exp) => exp.expense_id !== id));
		} catch (err) {
			console.err(err.message);
		}
		setIsLoading(false)
	};
	return (
		<>
				{!isAuthenticated && <SearchForm />}

			<div className="container ">
				<div className="row">
					<div className='col text-center'>
						<h2 className="h1-cols" data-testid="expense-heading">Expenses</h2>

					</div>
				</div>
				<div className="row">
					
					<div className='col text-center'>
						<ExpenseForm />

					</div>
				</div>
				<div className="row">
					
					<div className='col text-center'>
						<SearchForm />

					</div>
				</div>

				<div className="row mt-3">
					<div className="col-4 bottom-border border-containers"><h5><strong>Expense</strong></h5></div>
					<div className="col-4 bottom-border"><h5> <strong>Cost</strong></h5></div>
					<div className="col-4 bottom-border "><h5> <strong>Date</strong></h5></div>
				</div>
				{!isAuthenticated&&<>
				<div className="row bottom-border"></div>
				<div className="row bottom-border"></div>
				<div className="row bottom-border"></div>
				<div className="row bottom-border"></div>
				<div className="row bottom-border"></div>
				</>
				}	
			</div>

			<div className="container con-1">
				{expenses.map((expense, index) => {
					return (
						<motion.div
							animate={{ x: 0, scale: 1 }}
							initial={{ x: 100, scale: 0 }}
							exit={{ x: 100 }}
							transition={{ type: "spring", stiffness: 100, duration: 0.5, delay: index * 0.2 }} // Adjust the delay as needed
							key={index}
							className="row ">
							<div className="col-4 bottom-border mt-2 ">
								<p data-cy="expense-title" className="expense-title">{expense.title}</p>
							</div>
							<div className="col-3 bottom-border mt-2" ><p data-cy="expense-cost">€ {expense.cost}</p></div>
							<div className="col-4 bottom-border mt-2 text-secondary"><p data-cy="expense-date" className="expense-date"><i>{expense.dates}</i></p></div>
							<div className="col-1 bottom-border mt-2">
								<button

									onClick={() => handleDelete(expense.expense_id)}
									className="  delete-button"
								>
									{isLoading ? <div className="spinner-border text-dark" role="status">
										<span className="sr-only"></span>
									</div> : <FaTrashAlt />}


								</button>
							</div>
						</motion.div>
					)
				})}
			</div>
		</>
	);
};

export default ExpenseList;
