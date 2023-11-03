import React from 'react'
import { useState } from 'react';
import Footer from '../layout/Footer';
import ExpenseList from '../components/ExpenseList';
import BudgetDisplay from '../components/BudgetDisplay';
import UseReducer from '../components/UseReducer';
import { LoadingContext } from '../contexts/LoadingContext';
import { ExpensesContext } from '../contexts/ExpensesContext';
const Home = () => {
	const [expenses, setExpenses] = useState([]);
	const [isLoading, setIsLoading] = useState(false)
  return (
    <>

	<LoadingContext.Provider value={{isLoading, setIsLoading}}>
	<ExpensesContext.Provider value={{expenses, setExpenses}} >
		
		<div className='container main-container border'>
			
			<div className='row mt-2 border   '>
				<div className='col-12 mt-2 col-md-6 main-col-1 '>
					
						<ExpenseList />
				</div>
				<div className='col-12 mt-2 col-md-6 main-col-2 '>
					
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