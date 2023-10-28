import React, { useEffect, useState, useContext } from "react";
import BudgetDisplay from "./BudgetDisplay";
import { motion } from "framer-motion";
import { useAuth0 } from '@auth0/auth0-react'
import { ExpensesContext } from "../contexts/ExpensesContext";
import { FaTrashAlt } from 'react-icons/fa';
import { LoadingContext } from "../contexts/LoadingContext";
import ExpenseForm from "./ExpenseForm";

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
			const deleteExpense = await fetch(
				`http://localhost:5000/expenses/${id}`,
				{
					method: "DELETE",
				}
			);
			setExpenses(expenses.filter((exp) => exp.expense_id !== id));
		} catch (err) {
			console.err(err.message);
		}
	};


	return (
		<>
			<div className="container ">
				<div className="row mt-3">
					<div className="col-4 border-containers"><h5><strong>Expense</strong></h5></div>
					<div className="col-4 border-bottom"><h5> <strong>Cost</strong></h5></div>
					<div className="col-3 border-bottom"><h5> <strong>Date</strong></h5></div>
					<div className="col-1 border-bottom"></div>
				</div>
				<div className="row mt-1 ">
					
					<ExpenseForm />

				
					
						

				

				</div>
			</div>
			



			<div className="container con-1">



				{expenses.map((expense, index) => {
					return (
						<motion.div initial={{ x: 100, scale: 0 }}
							animate={{ x: 0, scale: 1 }}
							exit={{ x: 100 }}
							transition={{ type: "spring", stiffness: 100, duration: 0.5, delay: index * 0.2 }} // Adjust the delay as needed

							key={index}


							className="row">
							<div className="col-4 border-bottom">
								<p>{expense.title}</p>
							</div>

							<div className="col-4 border-bottom">€ {expense.cost}</div>
							<div className="col-3 border-bottom text-secondary"><i>{expense.dates}</i></div>
							<div className="col-1 border-bottom">

								<button

									onClick={() => handleDelete(expense.expense_id)}
									className="  delete-button"
								>
									<FaTrashAlt />
								</button>
							</div>

						</motion.div>
					)
				})}

			</div>

			{isLoading && <h1>loading...</h1>}




		</>
	);
};

export default ExpenseList;
