import React, { useContext, useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { ExpensesContext } from "../contexts/ExpensesContext";
import { useAuth0 } from '@auth0/auth0-react';
import Chart from "./Chart";
import { LoadingContext } from "../contexts/LoadingContext";
import BudgetForm from "./BudgetForm";
import SearchForm from "./SearchForm";

const BudgetDisplay = () => {
	const { isLoading, setIsLoading } = useContext(LoadingContext)
	const [maxBudget, setMaxBudget] = useState([]);
	const { expenses } = useContext(ExpensesContext)
	const { user, isAuthenticated } = useAuth0();
	const getBudget = async () => {

		try {
			const response = await fetch(`https://spend-wise-1-a80913de5bc1.herokuapp.com/budget/${user.sub}`);
			const jsonData = await response.json();
			console.log(jsonData)
			setMaxBudget(jsonData);
		} catch (err) {
			console.log(err.message);
		}
	};

	const total = expenses.reduce(
		(accumulator, currentValue) => accumulator + currentValue.cost,
		0
	);

	useEffect(() => {
		getBudget()
	}, [user, isLoading])

	return (
		<>
		{!isAuthenticated && <SearchForm />}
		<SearchForm/>
			<div className="container">
				<div className="row">
					<div className='col text-center'>
						<h2 className="h1-cols">Budget</h2>

					</div>
				</div>
				<div className="row">	
					<div className='col text-center'>
						<BudgetForm/>

					</div>
				</div>


				<div className="row mt-3">
					<motion.div
						animate={{ y: 0, scale: 1 }}
						transition={{ delay: .5 }}
						initial={{ y: 60, scale: 0.2 }}
						className="col-4">
						<div className="box-1" >
							<h4 className="display-text">Budget</h4>
					
							{!maxBudget.total_budget?<span>€ 0</span>:<span>€ {maxBudget.total_budget}</span>}
						
						
						</div>
					</motion.div>
					<motion.div
						animate={{ y: 0, scale: 1 }}
						transition={{ delay: 0.75 }}

						initial={{ y: -60, scale: 0.2 }}
						className="col-4">
						<div className="box-2" >
							<h4 className="display-text">Expenses</h4>
						
							{!total?<span>€ 0</span>:<span>€ {total}</span>}
						</div>
					</motion.div>


					<motion.div
						animate={{ y: 0, scale: 1 }}
						transition={{ delay: 1 }}
						initial={{ y: 60, scale: 0.2 }}
						className="col-4"



					>
						<div className="box-3">
							<h4 className="display-text">Available</h4>

						
							{!maxBudget.total_budget?<span>€ 0</span>:<span>€ {maxBudget.total_budget - total}</span>}
						</div>
					</motion.div>

				</div>
				
			</div>


			<Chart maxBudget={maxBudget} total={total} />

		</>
	);
};

export default BudgetDisplay;
