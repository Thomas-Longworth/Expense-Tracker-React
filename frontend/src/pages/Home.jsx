import React from 'react'
import ExpenseForm from '../components/ExpenseForm'

import { useState } from 'react';
import Footer from '../components/layout/Footer';
import ReminderForm from '../components/ReminderForm';
import ExpenseList from '../components/ExpenseList';
import BudgetDisplay from '../components/BudgetDisplay';
import BudgetForm from '../components/BudgetForm';
import RemindersList from '../components/RemindersList';
import { LoadingContext } from '../contexts/LoadingContext';
import { ExpensesContext } from '../contexts/ExpensesContext';
const Home = () => {
	const [expenses, setExpenses] = useState([]);
	const [isLoading, setIsLoading] = useState(false)
  return (
    <>
	<LoadingContext.Provider value={{isLoading, setIsLoading}}>
	<ExpensesContext.Provider value={{expenses, setExpenses}} >
		<div className='container '>
			<div className='row mt-2 border   '>
				<div className='col'>
					
						<ExpenseList />
				</div>
				<div className='col'>
						<BudgetForm />
						<BudgetDisplay />
				</div>
			</div>
		</div>
		<Footer/>
	</ExpensesContext.Provider>
	</LoadingContext.Provider>
   
    </ >
  )
}

export default Home